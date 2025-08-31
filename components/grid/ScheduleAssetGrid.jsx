import React, { useState, useEffect, useCallback, useRef } from "react";
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
const ScheduleAssetGrid = ({ LocationID, ScheduleID, NoOfYears }) => {
	// const [ContractorsData, setContractorsData] = useState([]);
	const [error, setError] = useState(null);
	const [refetch, setRefetch] = useState(0);
	const [selectedRow, setSelectedRow] = useState(null);

	// Modal states
	const [modalVisible, setModalVisible] = useState(false);
	const [modalType, setModalType] = useState(""); // "add", "edit", or "delete"
	const [rowData, setRowData] = useState({});
	const [loading, setLoading] = useState(false);
	const [SchedualAssetList, setSchedualAssetList] = useState([]);
	const [SubLocationData, setSubLocationData] = useState([]);
	const [Asset, setAsset] = useState({});
	const [ProceduresList, setProceduresList] = useState([]);
	const [modelLoader, setModelLoader] = useState(false);
	const lastClickTime = useRef(0);
	const router = useRouter();
	const tableHead = [
		{
			key: "LocationID",
			label: "الموقع",
			type: "dropdown",
			options: SubLocationData,
			input: "true",
			visible: "false",
		},
		{
			key: "SubLocationName",
			label: "  الموقع",
			type: "dropdown",
			options: SubLocationData,
			input: "fales",
			visible: "true",
		},
		{
			key: "ScheduleID",
			label: "  ",
			type: "",
			input: "false",
			visible: "false",
		},
		{
			key: "AssetID",
			label: " الاصل ",
			type: "dropdown",
			input: "true",
			visible: "false",
			options: Asset,
		},
		{
			key: "AssetName",
			label: " الاصل ",
			type: "dropdown",
			input: "false",
			visible: "true",
			options: Asset,
		},
		{
			key: "ProcedureID",
			label: "الاجراء  ",
			type: "dropdown",
			options: ProceduresList,

			input: "true",
			visible: "false",
		},
		{
			key: "ProcedureName",
			label: "الاجراء  ",
			type: "dropdown",
			options: ProceduresList,
			input: "false",
			visible: "true",
		},
		{
			key: "MeterValue",
			label: " قراءة العداد ",
			type: "number",
			input: "true",
			visible: "true",
		},
		{
			key: "ExecludeLowerMaint",
			label: "استبعاد الصيانة الاقل  ",
			type: "checkbox",
			input: "true",
			visible: "true",
		},
		{
			key: "Remarks",
			label: " ملاحظات   ",
			type: "text",
			required:"false",
			input: "true",
			visible: "false",
		},
	];

	const screenWidth = Dimensions.get("window").width;
	const filteredTableHead = tableHead.filter(
		(header) => header.visible === "true"
	);
	const dynamicWidthArr = filteredTableHead.map(
		() => screenWidth / filteredTableHead.length
	);
	const state = {
		tableHead: filteredTableHead.map((col) => col.label), // Map visible headers to their labels
	};

	const fetchDropdownData = useCallback(async () => {
		if (LocationID) {
			try {
				//console.log("Fetching data for LocationID:", LocationID);
				setLoading(true);

				// Fetch API response
				const response = await api.get(
					`/table?sp=api_ms_Schedule_Assets_Trx&LocationID=${LocationID}&ScheduleID=99`
				);

				//console.log("Full API Response:", response);
				const List = response?.data?.data || [];

				// Ensure response is an array
				if (Array.isArray(List)) {
					setSchedualAssetList(List);
				} else {
					console.error("Expected List to be an array, but got:", List);
					setSchedualAssetList([]); // Fallback to empty array
				}
			} catch (err) {
				console.error(
					"Error fetching dropdown data:",
					err.response ? err.response.data : err.message
				);
			} finally {
				setLoading(false);
			}
		} else {
			console.warn("LocationID is undefined or invalid.");
		}
	}, [LocationID]);

	useEffect(() => {
		fetchDropdownData();
	}, [fetchDropdownData]);

	const fetchSublocatioDropdownData = useCallback(async () => {
		if (LocationID) {
			try {
				setLoading(true);

				// Fetch data from the API
				const response = await api.get(
					`/table/filter?sp=api_ms_SubLocation_List&LocationID=${LocationID}`
				);

				// Log the response for debugging
				//console.log("API Response Data:", response.data.data);

				// Extract and validate the list
				const List = response.data.data || [];
				if (Array.isArray(List)) {
					setSubLocationData(HandleDropdownFormat(List, "value", "label"));
				} else {
					console.error("Expected List to be an array, but got:", List);
				}
			} catch (err) {
				console.error(
					"Error fetching sub-location dropdown data:",
					err.message || err
				);
			} finally {
				setLoading(false);
			}
		} else {
			console.warn("LocationID is missing or invalid.");
		}
	}, [LocationID]);

	const fetchAssetDropdownData = useCallback(async () => {
		try {
			setLoading(true);

			const response = await api.get(`/table?sp=api_ms_assetclass_trx`);
			//console.log("Fetched Assets:", response.data.data);

			const List = response.data.data || [];
			if (Array.isArray(List)) {
				setAsset(HandleDropdownFormat(List, "AssetClassID", "AssetClassName"));
			} else {
				console.error("Expected List to be an array, but got:", List);
			}
		} catch (err) {
			console.error("Error fetching asset dropdown data:", err);
		} finally {
			setLoading(false);
		}
	}, []);

	const fetchProceduresDropdownData = useCallback(async () => {
		try {
			setLoading(true);

			const response = await api.get(
				`/table?sp=api_ms_Procedures_List&LocationID=5&ScheduleID=99`
			);
			//console.log("Fetched Procedures:", response.data.data);

			const List = response?.data?.data || [];
			const formattedList = HandleDropdownFormat(
				List,
				"ProcedureID",
				"FullProcedureName"
			);

			setProceduresList(formattedList);
		} catch (err) {
			console.error(
				"Error fetching procedures dropdown data:",
				err.response?.data || err.message || "Unknown error"
			);
		} finally {
			setLoading(false);
		}
	}, [LocationID, ScheduleID]);

	// Fetch data on mount and when dependencies change
	useEffect(() => {
		fetchSublocatioDropdownData();
		fetchAssetDropdownData();
		fetchProceduresDropdownData();
	}, [
		fetchSublocatioDropdownData,
		fetchAssetDropdownData,
		fetchProceduresDropdownData,
	]);

	const handleDoubleClick = (row) => {
		router.navigate({
			pathname: "/ScheduleAssetDetails",
			params: { ...row, LocationID: LocationID },
		});
	};

	const handleRowPress = (row, index) => {
		const currentTime = new Date().getTime();
		const timeDifference = currentTime - lastClickTime.current;

		if (timeDifference < 2000) {
			lastClickTime.current = 0; // Reset last click time
			handleDoubleClick(row);
		} else {
			setSelectedRow(index);
			setRowData(row);
			lastClickTime.current = currentTime;
		}
	};

	const handleAdd = () => {
		setRowData(Object.fromEntries(tableHead.map((col) => [col.key, ""])));
		setModalType("add");
		setModalVisible(true);
	};

	const handleEdit = () => {
		if (selectedRow !== null) {
			setRowData(SchedualAssetList[selectedRow]);
			setModalType("edit");
			setModalVisible(true);
		} else {
			Alert.alert("Please select a row to edit.");
		}
	};

	const handleDelete = () => {
		if (selectedRow !== null) {
			setModalType("delete");
			setModalVisible(true);
		} else {
			Alert.alert("Please select a row to delete.");
		}
	};

	const confirmAction = async () => {
		try {
			//console.log(rowData);
			if (modalType === "add") {
				setModelLoader(true);
				const response = await api.post(
					"/table?sp=api_ms_Schedule_Assets_Ins",
					{
						...rowData,
						LocationID: LocationID,
						ScheduleID: rowData.ScheduleID,
					}
				);
				setModelLoader(false);
				setRefetch((prev) => prev + 1);
				setSchedualAssetList((prevData) => [...prevData, response.data]);
			} else if (modalType === "edit") {
				setModelLoader(true);
				const response = await api.put(`/table?sp=api_ms_Schedule_Assets_Upd`, {
					...rowData,
					LocationID: LocationID,
					ScheduleID: rowData.ScheduleID,
					ScheduleAssetID: rowData.ScheduleAssetID,
				});
				setModelLoader(false);
				setRefetch((prev) => prev + 1);
				setSchedualAssetList((prevData) =>
					prevData.map((row, index) =>
						index === selectedRow ? response.data : row
					)
				);
				setSelectedRow(null);
			} else if (modalType === "delete") {
				setModelLoader(true);
				//console.log(rowData.ContractorsID);

				await api.delete(
					`/table?sp=api_ms_Schedule_Assets_Del&LocationID=${LocationID}&ScheduleID=${rowData.ScheduleID}&ScheduleAssetID=${rowData.ScheduleAssetID}`
				);
				setModelLoader(false);
				setRefetch((prev) => prev + 1);
				setSchedualAssetList((prevData) =>
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

	const handleInputChange = (key, value) => {
		setRowData((prevData) => ({ ...prevData, [key]: value }));
	};

	const renderInput = (key, type, value, options = []) => {
		switch (type) {
			case "number":
				return (
					<TextInput
						className="w-full text-sm font-tmedium font-medium h-14 border-[.5px] border-[#1C5B7D] rounded-lg p-4 text-right focus:border-[#133e5475]"
						keyboardType="numeric"
						value={value}
						onChangeText={(text) => handleInputChange(key, text)}
					/>
				);

			case "text":
				return (
					<TextInput
						className="w-full text-sm font-tmedium font-medium h-14 border-[.5px] border-[#1C5B7D] rounded-lg p-4 text-right focus:border-[#133e5475] "
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
						initailOption={rowData[key]}
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
						className="w-full text-sm font-tmedium font-medium h-14 border-[.5px] border-[#1C5B7D] rounded-lg p-4 text-right focus:border-[#133e5475]"
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
							{SchedualAssetList.map((dataRow, index) => (
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
												className=" rounded-md px-4 py-2 bg-none border-[.5px] border-[#133E54] mx-2  w-[69px]  flex flex-row justify-center items-center"
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
		height: 90,
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
		backgroundColor: "white",
		padding: 16,
		borderRadius: 8,
	},
	modalButtons: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: 16,
	},
	inputContainer: {
		marginBottom: 8,
	},
	input: {
		borderWidth: 1,
		borderColor: "#CCC",
		borderRadius: 4,
		padding: 8,
	},
};

export default ScheduleAssetGrid;
