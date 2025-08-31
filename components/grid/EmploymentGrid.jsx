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

const EmploymentGrid = ({
	LocationID,
	WorkorderID,
	WorkorderStatusName,
	WorkorderTypeName,
	WorkorderName,
	WorkorderCode,
}) => {
	const [data, setData] = useState([]);
	const router = useRouter();
	const [employeetList, setEmployeeList] = useState([]);
	const [Asset, setAsset] = useState({});

	useEffect(() => {
		if (LocationID && WorkorderID) {
			const fetchData = async () => {
				setLoading(true);
				setError(null);
				try {
					const response = await api.get(
						`/table?sp=api_ms_WorkOrders_Labours_Trx&WorkorderID=5513&LocationID=5`
						// `/table?sp=api_ms_WorkOrders_Labours_Trx&WorkorderID=${WorkorderID}&LocationID=${LocationID}`
					);

					const responseData = response?.data?.data;

					if (Array.isArray(responseData)) {
						if (responseData.length === 0) {
							//console.log(
							// "No data found for the given LocationID and WorkorderID."

							setData([]); // Set data to an empty array
						} else {
							//console.log("Fetched Data:", responseData);
							setData(responseData); // Set the fetched data
						}
					} else {
						throw new Error("Unexpected response format");
					}
				} catch (err) {
					console.error("Error fetching data:", err);
					setError(err.message || "Failed to fetch data");
				} finally {
					setLoading(false);
				}
			};

			fetchData();
		} else {
			console.warn("LocationID or WorkorderID is missing.");
		}
	}, [LocationID, WorkorderID]);
	const scrollViewRef = useRef(null);
	useEffect(() => {
		const timeout = setTimeout(() => {
			//console.log("ScrollView Ref:", scrollViewRef.current); // Debugging
			if (scrollViewRef.current) {
				scrollViewRef.current?.scrollToEnd({ animated: false });
			}
		}, 500); // Delay by 100ms to allow rendering

		return () => clearTimeout(timeout); // Cleanup timeout
	}, []);
	const fetchDropdownData = useCallback(async () => {
		try {
			setLoading(true);
			const response = await api.get(
				`/table?sp=api_employee_list&LocationID=5`
			);
			//console.log("API Response:", response.data.data);

			const List = response.data.data || [];

			if (Array.isArray(List)) {
				setEmployeeList(HandleDropdownFormat(List, "key", "value"));
			} else {
				console.error("Expected List to be an array, but got:", List);
			}
		} catch (err) {
			console.error("Error fetching dropdown data:", err);
		} finally {
			setLoading(false);
		}
	}, []);
	const fetchAssetDropdownData = useCallback(async () => {
		try {
			setLoading(true);
			const response = await api.get(`/table?sp=api_ms_assetclass_trx`);
			//console.log("Fetched Materials:", response.data.data);

			const List = response.data.data || [];
			if (Array.isArray(List)) {
				setAsset(HandleDropdownFormat(List, "AssetClassID", "AssetClassName"));
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
		fetchDropdownData();
		fetchAssetDropdownData();
	}, [fetchDropdownData]);

	const tableHead = [
		{
			key: "EmployeeID",
			label: "الموظف",
			type: "dropdown",
			options: employeetList,
			input: "true",
			visible: "false",
			width: 100, // Static width for this column
		},
		{
			key: "EmployeeName",
			label: "الموظف",
			type: "",
			input: "false",
			visible: "true",
			width: 100, // Static width for this column
		},
		{
			key: "SalaryHours",
			label: "ساعات العمل",
			type: "number",
			input: "true",
			visible: "true",
			width: 100, // Static width for this column
		},

		{
			key: "OverTime1",
			label: "اضافى نهارى",
			type: "number",
			input: "true",
			visible: "true",
			width: 100, // Static width for this column
		},
		{
			key: "OverTime2",
			label: "اضافى ليلى",
			type: "number",
			input: "true",
			visible: "true",
			width: 100, // Static width for this column
		},
		{
			key: "StartDate",
			label: "تاريخ البدء",
			type: "date",
			input: "true",
			visible: "true",
			width: 100, // Static width for this column
		},
		{
			key: "EndDate",
			label: "تاريخ النهو",
			type: "date",
			input: "true",
			visible: "true",
			width: 100, // Static width for this column
		},
		{
			key: "TotalHours",
			label: "اجمالى الساعات",
			type: "number",
			input: "false",
			visible: "true",
			width: 100, // Static width for this column
		},
		{
			key: "TotalCost",
			label: "اجمالى التكلفة",
			type: "number ",
			input: "false",
			visible: "true",
			width: 150, // Static width for this column
		},
		{
			key: "WorkorderID",
			label: "كود أمر الشغل",
			type: "number",
			input: "false",
			visible: "false",
			width: 100, // Static width for this column
		},
		{
			key: "WorkorderLaborID",
			label: "كود العامل ",
			type: "number",
			input: "false",
			visible: "false",
			width: 100, // Static width for this column
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
			key: "AssetName",
			label: "الأصل  ",
			type: "",
			input: "false",
			visible: "true",
			width: 100, // Static width for this column
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

	// Create static WidthArr from the 'width' property
	const staticWidthArr = filteredTableHead.map((col) => col.width);

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

	const handleDoubleClick = (row) => {
		router.navigate({
			pathname: "/EmploymentDetails",
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
			setSelectedRow(index);

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
			setModalVisible(true);
		} else {
			Alert.alert("Please select a row to delete.");
		}
	};

	const confirmAction = async () => {
		try {
			if (modalType === "add") {
				const response = await api.post(
					"/table?sp=api_ms_WorkOrders_Labours_Ins",
					{ ...rowData, LocationID: LocationID, WorkorderID: WorkorderID }
				);
				setData((prevData) => [...prevData, response.data]);
			} else if (modalType === "edit") {
				const response = await api.put(`/table?sp=api_ms_SubLocation_Upd`, {
					...rowData,
					LocationID: LocationID,
					WorkorderID: WorkorderID,
				});
				setData((prevData) =>
					prevData.map((row, index) =>
						index === selectedRow ? response.data : row
					)
				);
				setSelectedRow(null);
			} else if (modalType === "delete") {
				await api.delete(
					`/table?sp=api_ms_SubLocation_Del&SubLocationID=${selectedRow?.SubLocationID}&LocationID=${DepartmentID}`
				);
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
						className="w-full text-sm font-tmedium font-medium h-14 border border-[.5px] border-[#1C5B7D] rounded-lg p-4 text-right focus:border-[#133e5475] "
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

			{loading ? (
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
					<View>
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
										onPress={() => handleRowPress(dataRow, index)}>
										<Row
											className="flex flex-row-reverse"
											style={[
												styles.row,
												index % 2 === 0
													? { backgroundColor: "#ffffff" }
													: { backgroundColor: "#f9f9f9" },
												selectedRow === index && { backgroundColor: "#E4EDF2" },
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
												} else if (col?.type === "date") {
													// Return JSX inside a wrapper for checkbox columns
													return (
														<View
															key={idx}
															style={{
																width: staticWidthArr[idx], // Set width for each column
																justifyContent: "center",
																alignItems: "center",
															}}>
															<Text className="text-base font-tmedium">
																{item ? item.split("T")[0] : ""}
															</Text>
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
												className=" rounded-md px-4 py-2 bg-none border border-[.5px] border-[#133E54] mx-2  w-[69px]  flex flex-row justify-center items-center"
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

export default EmploymentGrid;
