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
import { HandleDropdownFormat, useDropDown } from "../../hooks/useDropDownData";

// import { Picker } from "react-native-web";
const StockItemsGrid = ({
	LocationID,
	WorkorderID,
	WorkorderStatusName,
	WorkorderTypeName,
	WorkorderName,
	WorkorderCode,
}) => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState([]);
	const router = useRouter();
	const [modelLoader, setModelLoader] = useState(false);
	const [refetch, setRefetch] = useState(0);
	const [Asset, setAsset] = useState([]);
	const [SectionList, setSectionList] = useState([]);
	const [SelectedSectionList, setSelectedSectionList] = useState([]);
	const [Groups, setGroups] = useState([]);
	const [SelectedGroups, setSelectedGroups] = useState([]);
	const [Items, setItems] = useState([]);
	//   const { data:  , loading: SectionLoader } = useDropDown(
	//     "api_Sc_Item_Section_List",
	//     {CompanyID:1},
	//     "SectionID",
	//     "SectionName"
	// );
	useEffect(() => {
		if (LocationID && WorkorderID) {
			const fetchData = async () => {
				setLoading(true);
				try {
					const response = await api.get(
						`/table?sp=api_ms_WorkOrders_Materials_Trx2&WorkorderID=${WorkorderID}&LocationID=${LocationID}`
					);
					setData(response.data.data);
					//console.log("materialssssssssssss:", response.data.data);
				} catch (err) {
					setError(err.message || "Failed to fetch data");
				} finally {
					setTimeout(() => {
						setLoading(false);
					}, 200);
				}
			};
			fetchData();
		}
	}, [LocationID, WorkorderID, refetch]);
	const fetchSectionDropdownData = useCallback(async () => {
		try {
			setLoading(true);
			const response = await api.get(
				`/table?sp=api_Sc_Item_Section_List&CompanyID=1`
			);
			//console.log("API Response:", response.data.data);

			const List = response.data.data || [];

			if (Array.isArray(List)) {
				setSectionList(HandleDropdownFormat(List, "SectionID", "SectionName"));
			} else {
				console.error("Expected List to be an array, but got:", List);
			}
		} catch (err) {
			console.error("Error fetching dropdown data:", err);
		} finally {
			setLoading(false);
		}
	}, []);

	const fetchItems = useCallback(async () => {
		if (SelectedGroups) {
			try {
				setLoading(true);
				const response = await api.get(
					`/table?sp=api_Sc_Items__list2&GroupID=${SelectedGroups}&CompanyID=1`
				);
				//console.log("Fetched Items:", response.data.data);

				const List = response.data.data || [];
				if (Array.isArray(List)) {
					setItems(HandleDropdownFormat(List, "ItemID", "ItemName"));
				} else {
					console.error("Expected List to be an array, but got:", List);
				}
			} catch (err) {
				console.error("Error fetching material data:", err);
			} finally {
				setLoading(false);
			}
		}
	}, [SelectedGroups]);
	const fetchGroups = useCallback(async () => {
		if (SelectedSectionList) {
			try {
				setLoading(true);
				const response = await api.get(
					`/table?sp=api_ms_Item_Group_List2&SectionID=${SelectedSectionList}&CompanyID=1`
				);
				//console.log("Fetched Groups:", response.data.data);

				const List = response.data.data || [];
				if (Array.isArray(List)) {
					setGroups(HandleDropdownFormat(List, "GroupID", "GroupName"));
				} else {
					console.error("Expected List to be an array, but got:", List);
				}
			} catch (err) {
				console.error("Error fetching material data:", err);
			} finally {
				setLoading(false);
			}
		}
	}, [SelectedSectionList]);

	const fetchAssetDropdownData = useCallback(async () => {
		try {
			setLoading(true);
			const response = await api.get(
				`/table?sp=api_ms_Workorder_Assets_Trx&LocationID=${LocationID}&WorkorderID=${WorkorderID}`
			);
			//console.log("Fetched Materials:", response.data.data);

			const List = response.data.data || [];
			if (Array.isArray(List)) {
				setAsset(HandleDropdownFormat(List, "AssetID", "AssetName"));
			} else {
				console.error("Expected List to be an array, but got:", List);
			}
		} catch (err) {
			console.error("Error fetching material data:", err);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchSectionDropdownData();
		fetchAssetDropdownData();
	}, []);

	useEffect(() => {
		if (SelectedSectionList) {
			fetchGroups();
		}
	}, [SelectedSectionList]);
	useEffect(() => {
		if (SelectedGroups) {
			fetchItems();
		}
	}, [SelectedGroups]);

	const tableHead = [
		{
			key: "WorkorderMaterialID",
			label: "",
			type: "dropdown",
			input: "false",
			visible: "false",
			width: 100,
		},
		{
			key: "SectionID",
			label: "الفئه",
			type: "dropdown",
			options: SectionList,
			input: "true",
			visible: "false",
			width: 100,
		},
		{
			key: "WorkorderID",
			label: "",
			type: "",
			input: "false",
			visible: "false",
			width: 100,
		},
		{
			key: "GroupID",
			label: "التصنيف",
			type: "dropdown",
			options: Groups,
			input: "true",
			visible: "false",
			width: 100,
		},

		{
			key: "SectionName",
			label: "الفئه",
			type: "",
			input: "false",
			visible: "true",
			width: 100,
		},
		{
			key: "GroupName",
			label: "التصنيف",
			type: "",
			input: "false",
			visible: "true",
			width: 100,
		},
		{
			key: "ItemName",
			label: "الصنف",
			type: "",
			input: "false",
			visible: "true",
			width: 200,
		},
		{
			key: "ItemID",
			label: " الصنف ",
			type: "dropdown",
			options: Items,
			input: "true",
			visible: "false",
			width: 100,
		},
		{
			key: "ItemCode",
			label: "كود الصنف ",
			type: "number",
			input: "false",
			visible: "true",
			width: 100,
		},

		{
			key: "Quantity",
			label: " الكمية",
			type: "number",
			input: "true",
			visible: "true",
			width: 100,
		},
		{
			key: "UnitName",
			label: " وحده التخزين",
			type: "",
			input: "false",
			visible: "true",
			width: 100,
		},
		{
			key: "UnitID",
			label: "الوحده",
			type: "",
			input: "true",
			visible: "false",
			width: 100,
		},
		{
			key: "Unit",
			label: "قياس الوحده",
			type: "",
			input: "false",
			visible: "true",
			width: 100,
		},
		{
			key: "UnitCost",
			label: "  تكلفه الوحده",
			type: "",
			input: "true",
			visible: "true",
			width: 100,
		},
		{
			key: "TotalCost",
			label: " التكلفه الكليه ",
			type: "",
			input: "false",
			visible: "true",
			width: 100,
		},
		{
			key: "IsRequired",
			label: "غير موجود بالمخزن ",
			type: "checkbox",
			input: "true",
			visible: "true",
			width: 100,
		},
		{
			key: "IssueDate",
			label: "تاريخ الصرف والتركيب ",
			type: "date",
			input: "true",
			visible: "true",
			width: 150,
		},

		{
			key: "AssetID",
			label: " الاصل",
			type: "dropdown",
			options: Asset,
			input: "true",
			visible: "false",
			width: 100,
		},
		{
			key: "AssetCode",
			label: "  كود الاصل",
			type: "",
			input: "false",
			visible: "true",
			width: 100,
		},
		{
			key: "AssetName",
			label: "اسم الاصل",
			type: "",
			input: "false",
			visible: "true",
			width: 200,
		},
		{
			key: "AssetStop",
			label: "توقف الاصل",
			type: "checkbox",
			input: "true",
			visible: "true",
			width: 100,
		},
		{
			key: "Repeated",
			label: "تكرار",
			type: "checkbox",
			input: "true",
			visible: "true",
			width: 100,
		},
	];
	// Filter the table headers based on the 'visible' property
	const filteredTableHead = tableHead.filter(
		(header) => header.visible === "true"
	);

	// Create state with only visible headers
	const state = {
		tableHead: filteredTableHead.map((col) => col.label), // Map visible headers to their labels
	};

	const scrollViewRef = useRef(null);

	useEffect(() => {
		const timeout = setTimeout(() => {
			//console.log("ScrollView Ref:", scrollViewRef.current); // Debugging
			if (scrollViewRef.current) {
				scrollViewRef.current?.scrollToEnd({ animated: false });
			}
		}, 50); // Delay by 100ms to allow rendering
		setLoading(false);
		return () => clearTimeout(timeout); // Cleanup timeout
	}, [scrollViewRef, data]);

	// Create static WidthArr from the 'width' property
	const staticWidthArr = filteredTableHead.map((col) => col.width);
	const [error, setError] = useState(null);
	const [selectedRow, setSelectedRow] = useState(null);
	const [lastClickTime, setLastClickTime] = useState(0);

	// Modal states
	const [modalVisible, setModalVisible] = useState(false);
	const [modalType, setModalType] = useState(""); // "add", "edit", or "delete"
	const [rowData, setRowData] = useState(
		Object.fromEntries(tableHead.map((col) => [col.key, ""]))
	);

	const handleDoubleClick = (row) => {
		router.navigate({
			pathname: "/StockItemsDetails",
			params: {
				...row, // Contains properties like EmployeeName, WorkHours, etc.
				LocationID,
				WorkorderID,
				WorkorderStatusName,
				WorkorderTypeName,
				WorkorderName,
				WorkorderCode,
			},
		});
	};

	const handleRowPress = (row, index) => {
		const currentTime = new Date().getTime();

		const timeDifference = currentTime - lastClickTime;
		//console.log(timeDifference);

		if (timeDifference < 2000) {
			// If the time difference is less than 300ms, treat it as a double-click
			setLastClickTime(0); // Reset last click time
			handleDoubleClick(row);
		} else {
			// Single click logic
			setSelectedRow(row);

			// Set timeout for single-click logic
			setLastClickTime(currentTime);
		}
	};

	const handleAdd = () => {
		setRowData(Object.fromEntries(tableHead.map((col) => [col.key, ""])));
		setModalType("add");
		setModalVisible(true);
	};

	const handleEdit = () => {
		if (selectedRow !== null) {
			setRowData(selectedRow);
			setModalType("edit");
			setModalVisible(true);
		} else {
			Alert.alert("Please select a row to edit.");
		}
	};

	const handleDelete = () => {
		if (selectedRow !== null) {
			setRowData(selectedRow);
			setModalType("delete");
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
					"/table?sp=api_ms_WorkOrders_Materials_Ins",
					{ ...rowData, LocationID: LocationID, WorkorderID: WorkorderID }
				);
				setModelLoader(false);
				setRefetch((prev) => prev + 1);
			} else if (modalType === "edit") {
				setModelLoader(true);
				const response = await api.put(
					`/table?sp=api_ms_WorkOrders_Materials_Upd`,
					{ ...rowData, LocationID: LocationID, WorkorderID: WorkorderID }
				);
				setModelLoader(false);
				setRefetch((prev) => prev + 1);
				setSelectedRow(null);
			} else if (modalType === "delete") {
				setModelLoader(true);
				//console.log(rowData, "DELETE");

				await api.delete(
					`/table?sp=api_ms_WorkOrders_Materials_Del&WorkorderMaterialID=${rowData?.WorkorderMaterialID}&WorkorderID1=${WorkorderID}&LocationID1=${LocationID}`
				);
				setModelLoader(false);
				setRefetch((prev) => prev + 1);
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
				if (key === "SectionID") {
					return (
						<Dropdown
							onChange={(selectedValue) => {
								handleInputChange(key, selectedValue);
								setSelectedSectionList(selectedValue); // Update state for MaterialClassID
								fetchGroups(selectedValue); // Fetch materials based on selected class
							}}
							data={SectionList} // Assuming materialClasses is populated
							placeholder="Select SectionList "
							initailOption={value} // Set initial option if needed
							value={value} // Controlled value for the dropdown
							inputName="SectionID" // Use the key as input name
						/>
					);
				} else if (key === "GroupID") {
					return (
						<Dropdown
							onChange={(selectedValue) => {
								handleInputChange(key, selectedValue);
								setSelectedGroups(selectedValue); // Update state for MaterialClassID
								fetchGroups(selectedValue);
							}} // Fetch materials based on selected class                   }}
							data={Groups} // Assuming Materials is populated
							placeholder="Select Group"
							initailOption={null} // Set initial option if needed
							defaultOption={null} // Set a default option if needed
							value={value} // Controlled value for the dropdown
							inputName="GroupID" // Use the key as input name
						/>
					);
				}
				// Default case for other dropdowns
				return (
					<Dropdown
						onChange={(selectedValue) => handleInputChange(key, selectedValue)}
						data={options} // Pass any other options
						placeholder="Select an option"
						initailOption={value} // Set initial option if needed
						value={value} // Controlled value for the dropdown
						inputName={key} // Unique identifier
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
			<View
				className="flex flex-col"
				dir="rtl">
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
			</View>

			{loading && refetch == 0 ? (
				<ActivityIndicator
					size="large"
					color="#0000ff"
				/>
			) : error ? (
				<Text style={{ textAlign: "center", color: "red" }}>{error}</Text>
			) : (
				<ScrollView
					horizontal={true}
					ref={scrollViewRef}>
					<View className="mb-16">
						<Table>
							<Row
								className="flex flex-row-reverse text-base font-tbold font-bold"
								data={state.tableHead} // Visible headers
								widthArr={staticWidthArr} // Dynamic widths
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
												selectedRow?.WorkorderMaterialID ===
													dataRow?.WorkorderMaterialID && {
													backgroundColor: "#E4EDF2",
												},
											]}
											textStyle={styles.text}
											widthArr={staticWidthArr} // Dynamic widths
											data={filteredTableHead.map((col, idx) => {
												const item = dataRow[col.key]; // Get the corresponding column data
												if (col?.type === "checkbox") {
													// Return JSX inside a wrapper for checkbox columns
													return (
														<View
															key={idx}
															style={{
																width: staticWidthArr[idx], // Set width for each column
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
																	width: staticWidthArr[idx],
																	textAlign: "center",
																},
															]}>
															{col.type === "date" ? item?.split("T")[0] : item}
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
											isLoading={modelLoader}
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

export default StockItemsGrid;
