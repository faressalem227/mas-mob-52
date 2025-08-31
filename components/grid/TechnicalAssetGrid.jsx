import React, { useState, useEffect, useCallback } from "react";
import {
	View,
	ScrollView,
	SafeAreaView,
	Alert,
	Dimensions,
	TouchableOpacity,
	Modal,
	Text,
	Image,
	TouchableWithoutFeedback,
	TextInput,
	ActivityIndicator,
} from "react-native";
import { Table, Row } from "react-native-table-component";
import {
	CustomButton,
	MainButton,
	CheckBox,
	DatePickerInput,
	Dropdown,
} from "../index";
import PencilLine from "../../assets/images/PencilLine.png";
import add_outline from "../../assets/images/add_outline.png";
import trashh from "../../assets/images/trashh.png";
import Warning from "../../assets/images/Warning.png";
import ArrowLineUpRight from "../../assets/images/ArrowLineUpRight.png";
import api from "../../utilities/api";
import { useRouter } from "expo-router";
import { HandleDropdownFormat } from "../../hooks/useDropDownData";

const TechnicalAssetsGrid = ({ DepartmentID, SubLocationID, AssetID }) => {
	const [data, setData] = useState([]);
	const router = useRouter();
	const [assetList, setAssetList] = useState([]);
	const [modelLoader, setModelLoader] = useState(false);
	const [refetch, setRefetch] = useState(0);

	const fetchDropdownData = useCallback(async () => {
		if (AssetID) {
			try {
				setLoading(true);
				const response = await api.get(
					`/table?sp=api_ms_asset_attribute_List&AssetID=${AssetID}`
				);
				//console.log("API Response:", response.data.data);

				const List = response.data.data || [];

				if (Array.isArray(List)) {
					setAssetList(HandleDropdownFormat(List, "key", "value"));
				} else {
					console.error("Expected List to be an array, but got:", List);
				}
			} catch (err) {
				console.error("Error fetching dropdown data:", err);
			} finally {
				setLoading(false);
			}
		}
	}, []);

	useEffect(() => {
		fetchDropdownData();
	}, [fetchDropdownData]);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const response = await api.get(
					`/table?sp=api_ms_asset_attribute_trx&AssetID=${AssetID}`
				);
				setData(response.data.data);
				//console.log(response.data.data,"1111111");
			} catch (err) {
				setError(err.message || "Failed to fetch data");
			} finally {
				setLoading(false);
			}
		};
		fetchData();
		fetchDropdownData();
	}, [refetch]);

	const tableHead = [
		{
			key: "AttributeID",
			label: "المواصفة الفنيه",
			type: "dropdown",
			options: assetList,
			input: "true",
			visible: "false",
		},
		{
			key: "AttributeName",
			label: " المواصفه الفنيه",
			input: "false",
			visible: "true",
		},
		{
			key: "Unit",
			label: "الوحدة",
			input: "false",
			visible: "true",
		},
		{
			key: "AttributeValue",
			label: "القيمه  ",
			input: "true",
			visible: "true",
		},
		{
			key: "AssetAttributesID",
			label: "اسم الاصل",
			input: "false",
			visible: "false",
		},
	];

	const screenWidth = Dimensions.get("window").width;

	// Filter the table headers based on the 'visible' property
	const filteredTableHead = tableHead.filter(
		(header) => header.visible === "true"
	);

	// Create state with only visible headers
	const state = {
		tableHead: filteredTableHead.map((col) => col.label), // Map visible headers to their labels
	};

	// Dynamically calculate widths during rendering
	const dynamicWidthArr = filteredTableHead.map(
		() => screenWidth / filteredTableHead.length
	);

	// Use `state.tableHead` and `dynamicWidthArr` in your table rendering logic
	// //console.log(state, dynamicWidthArr);

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [selectedRow, setSelectedRow] = useState(null);
	const [lastClickTime, setLastClickTime] = useState(0);

	// Modal states
	const [modalVisible, setModalVisible] = useState(false);
	const [modalType, setModalType] = useState(""); // "add", "edit", or "delete"
	const [rowData, setRowData] = useState(
		Object.fromEntries(tableHead.map((col) => [col.key, ""]))
	);

	const handleRowPress = (row, index) => {
		setSelectedRow(index);
	};

	const handleAdd = () => {
		setRowData(Object.fromEntries(tableHead.map((col) => [col.key, ""])));
		setModalType("add");
		setModalVisible(true);
	};

	const handleEdit = () => {
		if (selectedRow !== null) {
			setRowData(data[selectedRow]);
			setModalType("edit");
			setModalVisible(true);
		} else {
			Alert.alert("Please select a row to edit.");
		}
	};

	const handleDelete = () => {
		if (selectedRow !== null) {
			setModalType("delete");
			setRowData(data[selectedRow]);
			setModalVisible(true);
		} else {
			Alert.alert("Please select a row to delete.");
		}
	};

	const confirmAction = async () => {
		try {
			if (modalType === "add") {
				setModelLoader(true);
				const response = await api.post(
					"/table?sp=api_ms_asset_attribute_Ins",
					{ ...rowData, AssetID: AssetID }
				);
				setModelLoader(false);
				setRefetch((prev) => prev + 1);
				setData((prevData) => [...prevData, response.data]);
			} else if (modalType === "edit") {
				setModelLoader(true);
				const response = await api.put(`/table?sp=api_ms_asset_attribute_Upd`, {
					...rowData,
				});
				setModelLoader(false);
				setRefetch((prev) => prev + 1);
				setData((prevData) =>
					prevData.map((row, index) =>
						index === selectedRow ? response.data : row
					)
				);
				setSelectedRow(null);
			} else if (modalType === "delete") {
				setModelLoader(true);
				await api.delete(
					`/table?sp=ms_asset_attribute_del&AssetAttributeID=${rowData.AssetAttributesID}`
				);
				setModelLoader(false);
				setRefetch((prev) => prev + 1);
				setData((prevData) =>
					prevData.filter((_, index) => index !== selectedRow)
				);
				setSelectedRow(null);
			}
			setModalVisible(false);
		} catch (error) {
			console.error(error);
			Alert.alert("Error", "Something went wrong. Please try again.");
		}
	};

	// const confirmAction = async () => {
	//   try {
	//     if (modalType === "add") {
	//       const response = await api.post(
	//         "/table?sp=ms_api_assets_ins",
	//         {...rowData ,SubLocationID:SubLocationID,LocationID:DepartmentID}
	//       );
	//       setData((prevData) => [...prevData, response.data]);
	//     } else if (modalType === "edit") {
	//       const response = await api.put(
	//         `/table?sp=ms_api_assets_upd&AssetID=${data[selectedRow].AssetID}`,
	//         rowData
	//       );
	//       setData((prevData) =>
	//         prevData.map((row, index) =>
	//           index === selectedRow ? response.data : row
	//         )
	//       );
	//       setSelectedRow(null);
	//     } else if (modalType === "delete") {
	//       await api.delete(
	//         `/table?sp=ms_api_assets_del&AssetID=${data[selectedRow].AssetID}`
	//       );
	//       setData((prevData) =>
	//         prevData.filter((_, index) => index !== selectedRow)
	//       );
	//       setSelectedRow(null);
	//     }
	//     setModalVisible(false);
	//   } catch (error) {
	//     console.error(error);
	//     Alert.alert("Error", "Something went wrong. Please try again.");
	//   }
	// };

	const handleInputChange = (key, value) => {
		setRowData((prevData) => ({ ...prevData, [key]: value }));
	};

	const renderInput = (key, type, value, options = []) => {
		switch (type) {
			case "number":
				return (
					<TextInput
						className="w-full text-sm font-tmedium font-medium h-12 border-[.5px] border-[#133E54] rounded p-4 text-right focus:border-[#133e5475] focus:shadow-md"
						keyboardType="numeric"
						value={value}
						onChangeText={(text) => handleInputChange(key, text)}
					/>
				);

			case "text":
				return (
					<TextInput
						className="w-full text-sm font-tmedium font-medium h-12 border-[.5px] border-[#133E54] rounded p-4 text-right focus:border-[#133e5475] focus:shadow-md"
						multiline
						numberOfLines={4}
						value={value}
						onChangeText={(text) => handleInputChange(key, text)}
					/>
				);
			case "dropdown":
				return (
					<Dropdown
						onChange={(Value) => handleInputChange(key, Value)}
						data={options}
						placeholder={""}
					/>
				);
			case "date":
				return (
					<DatePickerInput setDate={(Value) => handleInputChange(key, Value)} />
				);
			case "checkbox":
				return (
					<CheckBox
						value={value}
						isEditable={true}
						onChange={(Value) => handleInputChange(key, Value)}
					/>
				);
			default:
				return (
					<TextInput
						className="w-full text-sm font-tmedium font-medium h-12 border-[.5px] border-[#133E54] rounded p-4 text-right focus:border-[#133e5475] focus:shadow-md"
						value={value}
						onChangeText={(text) => handleInputChange(key, text)}
					/>
				);
		}
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
			<View style={styles.buttonContainer}>
				<CustomButton
					Icon={add_outline}
					title="إضافه"
					onPress={handleAdd}
				/>
				<CustomButton
					Icon={PencilLine}
					title="تعديل"
					onPress={handleEdit}
				/>
				<CustomButton
					Icon={trashh}
					title="حذف"
					onPress={handleDelete}
				/>
			</View>

			{loading ? (
				<ActivityIndicator
					size="large"
					color="#0000ff"
				/>
			) : error ? (
				<Text style={{ textAlign: "center", color: "red" }}>{error}</Text>
			) : (
				<ScrollView horizontal={true}>
					<View className="mb-16">
						<Table>
							<Row
								className="flex flex-row-reverse text-base font-tbold font-bold"
								data={state.tableHead} // Visible headers
								widthArr={dynamicWidthArr} // Dynamic widths
								style={styles.head}
								textStyle={styles.text}
							/>
						</Table>
						<ScrollView>
							<Table>
								{data.map((dataRow, index) => (
									<TouchableOpacity
										key={index}
										onPress={() => {
											handleRowPress(dataRow, index);
										}}>
										<Row
											className="flex flex-row-reverse py-2"
											style={[
												styles.row,
												index % 2 === 0
													? { backgroundColor: "#ffffff" }
													: { backgroundColor: "#f9f9f9" },
												selectedRow == index && { backgroundColor: "#E4EDF2" },
											]}
											textStyle={styles.text}
											widthArr={dynamicWidthArr} // Dynamic widths
											data={filteredTableHead.map((col, idx) => {
												const item = dataRow[col.key]; // Get the corresponding column data
												if (col?.type === "checkbox") {
													// Return JSX inside a wrapper for checkbox columns
													return (
														<View
															key={idx}
															style={{
																width: dynamicWidthArr[idx], // Set width for each column
																justifyContent: "center",
																alignItems: "center",
															}}>
															<CheckBox
																value={item}
																isEditable={false}
																onChange={(newValue) => {}}
															/>
														</View>
													);
												} else {
													// Return plain text for other column types
													return (
														<Text
															key={idx}
															style={[
																styles.text,
																{
																	width: dynamicWidthArr[idx],
																	textAlign: "center",
																},
															]}>
															{item}
														</Text>
													);
												}
											})}
										/>
									</TouchableOpacity>
								))}
							</Table>
						</ScrollView>
					</View>
				</ScrollView>
			)}

			{/* Modal */}
			<Modal
				animationType="fade"
				visible={modalVisible}
				transparent={true}>
				<TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
					<View
						style={styles.modalOverlay}
						dir={"rtl"}>
						<TouchableWithoutFeedback>
							<View style={styles.modalContent}>
								{modalType !== "delete" ? (
									<>
										<ScrollView className="w-[100%] max-h-[60vh] mb-10">
											{tableHead.map((header) => {
												if (header.input === "true") {
													return (
														<View
															key={header.key}
															style={styles.inputContainer}>
															<Text className="text-base font-tmedium font-medium my-2 ">
																{header.label}
															</Text>
															{renderInput(
																header.key,
																header.type,
																rowData[header.key],
																header.options
															)}
														</View>
													);
												}
												return null; // Do not render anything if input is "false"
											})}
										</ScrollView>
										<MainButton
											title={modalType === "add" ? "إضافه" : "حفظ التعديل"}
											icon={ArrowLineUpRight}
											handlePress={confirmAction}
										/>
									</>
								) : (
									<View className="text-center">
										<Image
											source={Warning}
											className="mx-auto w-16 h-16"></Image>
										<Text className="font-tbold text-center">
											هل انت متأكد من حذف هذا الموقع
										</Text>
										<Text className="font-tmedium text-center">
											يرجي العلم انه سوف تفقد كافة البيانات الخاصة بهذا الادخال{" "}
										</Text>
										<View className="flex flex-row justify-center mt-4 ">
											<TouchableOpacity
												className=" rounded-md px-4 py-2 bg-none  border-[.5px] border-[#133E54] mx-2  w-[69px]  flex flex-row justify-center items-center"
												onPress={() => setModalVisible(false)}>
												<Text className="font-tbold text-[#133E54]">إلغاء</Text>
											</TouchableOpacity>
											<TouchableOpacity
												className="mx-2 rounded-md  bg-[#F15555] w-[69px] flex flex-row justify-center items-center"
												onPress={confirmAction}>
												<Text className="font-tbold text-white">حذف</Text>
											</TouchableOpacity>
										</View>
									</View>
								)}
							</View>
						</TouchableWithoutFeedback>
					</View>
				</TouchableWithoutFeedback>
			</Modal>
		</SafeAreaView>
	);
};

const styles = {
	buttonContainer: {
		flexDirection: "row-reverse",
		marginBottom: 16,
	},
	head: {
		height: 50,
		backgroundColor: "#F6F6F6",
	},
	text: {
		textAlign: "center",
		fontFamily: "Tajawal-Medium",
		fontSize: 16,
	},
	row: {
		height: "fit-contant",
		justifyContent: "center",
		alignItems: "center",
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		justifyContent: "center",
		alignItems: "center",
	},
	modalContent: {
		width: "80%",
		padding: 20,
		backgroundColor: "#fff",
		borderRadius: 8,
		alignItems: "center",
	},
	inputContainer: {
		marginBottom: 10,
		width: "100%",
	},
	input: {
		height: 40,
		borderColor: "#ccc",
		borderWidth: 1,
		borderRadius: 4,
		paddingHorizontal: 8,
	},
	warningImage: {
		width: 50,
		height: 50,
		marginBottom: 20,
	},
	warningText: {
		textAlign: "center",
		fontSize: 16,
		marginBottom: 20,
	},
	modalButtons: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
	},
};

export default TechnicalAssetsGrid;
