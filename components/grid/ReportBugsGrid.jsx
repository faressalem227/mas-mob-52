import React, { useState, useEffect, useRef, useCallback } from "react";
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
import { HandleDropdownFormat } from "../../hooks/useDropDownData";
import { useRouter } from "expo-router";
import api from "../../utilities/api";

const ReportBugsGrid = ({ LocationID }) => {
	const router = useRouter();
	const tableHead = [
		{
			key: "FailureReportCode",
			label: "رقم البلاغ",
			type: "number",
			input: "true",
			visible: "true",
			width: 100,
		},
		{
			key: "FailureReportDate",
			label: "تاريخ البلاغ",
			type: "date",
			input: "true",
			visible: "true",
			width: 100,
		},
		{
			key: "ReportedByEmployeeID",
			label: "اسم المبلغ",
			type: "dropdown",
			options: employeeData,
			input: "true",
			visible: "false",
			width: 100,
		},
		{
			key: "EmployeeName",
			label: "اسم المبلغ",
			type: "",
			input: "false",
			visible: "true",
			width: 100,
		},
		{
			key: "FailureDate",
			label: "تاريخ العطل",
			type: "date",
			input: "true",
			visible: "true",
			width: 100,
		},
		{
			key: "ProblemDescription",
			label: "وصف العطل",
			type: "text",
			input: "true",
			visible: "true",
			width: 100,
		},
		{
			key: "ActionBeforeReporting",
			label: "الإجراء المتخذ قبل الإبلاغ",
			type: "text",
			input: "true",
			visible: "true",
			width: 100,
		},
		{
			key: "PriorityID",
			label: "أولويه العمل   ",
			type: "dropdown",
			options: PriorityList,
			input: "true",
			visible: "false",
			width: 100,
		},
		{
			key: "TradeID",
			label: " التصنيف",
			type: "dropdown",
			input: "true",
			options: TradeID,
			visible: "false",
			width: 100,
		},
		{
			key: "SubLocationID",
			label: " الموقع الفرعى ",
			type: "dropdown",
			options: SubLocationData,
			input: "true",
			visible: "true",
			width: 100,
		},
		{
			key: "AssetID",
			label: "الأصل ",
			type: "dropdown",
			options: Asset,
			input: "true",
			visible: "false",
			width: 100,
		},
		{
			key: "AssetID",
			label: "كودالأصل ",
			type: "",
			input: "false",
			visible: "true",
			width: 100,
		},
		{
			key: "AssetName",
			label: "اسم الأصل",
			type: "text",
			input: "false",
			visible: "true",
			width: 100,
		},
		{
			key: "PlantStopped",
			label: "توقف المعدة ",
			type: "checkbox",
			input: "true",
			visible: "true",
			width: 100,
		},
		{
			key: "AssetStopped",
			label: "توقف المحطة ",
			type: "checkbox",
			input: "true",
			visible: "true",
			width: 100,
		},
		{
			key: "FailureReportID",
			label: "كود البلاغ",
			type: "number",
			input: "true",
			visible: "true",
			width: 100,
		},
		{
			key: "FailureReportTypeID",
			label: " نوع البلاغ",
			type: "dropdown",
			input: "true",
			options: FailureReportsList,
			visible: "false",
			width: 100,
		},

		{
			key: "PriorityName",
			label: "أولويه العمل",
			type: "dropdown",
			input: "false",
			visible: "true",
			width: 100,
		},
		{
			key: "SubLocationName",
			label: " اسم الموقع الفرعى",
			type: "text",
			input: "false",
			visible: "true",
			width: 100,
		},
		{
			key: "FailureReportTypeName",
			label: "نوع البلاغ",
			type: "",
			input: "false",
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

	// Create static WidthArr from the 'width' property
	const staticWidthArr = filteredTableHead.map((col) => col.width);

	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [refetch, setRefetch] = useState(0);
	const [selectedRow, setSelectedRow] = useState(null);
	const [lastClickTime, setLastClickTime] = useState(0);
	const [modelLoader, setModelLoader] = useState(false);
	// Modal states
	const [modalVisible, setModalVisible] = useState(false);
	const [modalType, setModalType] = useState(""); // "add", "edit", or "delete"
	const [rowData, setRowData] = useState(
		Object.fromEntries(tableHead.map((col) => [col.key, ""]))
	);
	const [employeeData, setEmployeeData] = useState([]);
	const fetchEmployeeData = useCallback(async () => {
		setLoading(true);
		try {
			const response = await api.get(
				`/table?sp=api_employee_list&LocationID=${LocationID}`
			);
			const employeeList = response.data.data || [];
			setEmployeeData(HandleDropdownFormat(employeeList, "key", "value"));
		} catch (err) {
			console.error("Error fetching employee data:", err);
		} finally {
			setLoading(false);
		}
	}, [LocationID]);
	const [FailureReportsList, setFailureReports] = useState([]);
	const fetchFailureReportsDropdownData = useCallback(async () => {
		try {
			setLoading(true);

			// Fetch API response
			const response = await api.get(
				`/table/filter?sp=api_ms_FailureReports_Types_trx`
			);

			//console.log("Full API Response 1111111111:", response.data.data);
			const List = response?.data?.data || [];

			// Ensure response is an array
			setFailureReports(List);
			setFailureReports(HandleDropdownFormat(List, "value", "label"));
		} catch (err) {
			console.error(
				"Error fetching dropdown data:",
				err.response ? err.response.data : err.message
			);
		} finally {
			setLoading(false);
		}
	}, [LocationID]);
	const [PriorityList, setPriorityList] = useState([]);
	const fetchPriorityDropdownData = useCallback(async () => {
		if (LocationID) {
			try {
				//console.log("Fetching data for LocationID:", LocationID);
				setLoading(true);

				// Fetch API response
				const response = await api.get(
					`/table/filter?sp=api_ms_Priority_List&LocationID=${LocationID}`
				);

				//console.log("Full API Response 1111111111:", response.data.data);
				const List = response?.data?.data || [];

				// Ensure response is an array
				setPriorityList(List);
				setPriorityList(HandleDropdownFormat(List, "value", "label"));
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
	const [Asset, setAsset] = useState({});
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
	const [TradeID, setTradeID] = useState(null);
	const fetchTradeDropdownData = useCallback(async () => {
		if (LocationID) {
			try {
				//console.log("LocationID:", LocationID);

				setLoading(true);
				const response = await api.get(
					`/table?sp=api_ms_Trade_List&LocationID=${LocationID}`
				);
				//console.log("API Response:", response.data.data); // Log the entire response for inspection

				// Assuming response.data.data contains the array of sub-locations
				const TradeList = response.data.data || [];

				if (Array.isArray(TradeList)) {
					setTradeID(HandleDropdownFormat(TradeList, "value", "label"));
				} else {
					console.error(
						"Expected WorkOrdersList to be an array, but got:",
						TradeList
					);
				}
			} catch (err) {
				console.error("Error fetching dropdown data:", err);
			} finally {
				setLoading(false);
			}
		}
	}, [LocationID]); // Include LocationID in the dependency array
	const [SubLocationData, setSubLocationData] = useState([]);
	const fetchSublocatioDropdownData = useCallback(async () => {
		try {
			setLoading(true);
			const response = await api.get(
				`/table/filter?sp=api_ms_SubLocation_List&LocationID=${LocationID}`
			);
			//console.log("API Response:", response.data); // Log the entire response for inspection

			// Assuming response.data.data contains the array of sub-locations
			const subLocationList = response.data.data || [];

			if (Array.isArray(subLocationList)) {
				const list = HandleDropdownFormat(subLocationList, "value", "label");
				//console.log("555555555555555555555555", list);

				setSubLocationID(list[0].key);
				setSubLocationData(list);
			} else {
				console.error(
					"Expected subLocationList to be an array, but got:",
					subLocationList
				);
			}
		} catch (err) {
			console.error("Error fetching dropdown data:", err);
		} finally {
			setLoading(false);
		}
	}, [LocationID]); // Include LocationID in the dependency array
	useEffect(() => {
		fetchEmployeeData();
		fetchPriorityDropdownData();
		fetchFailureReportsDropdownData();
		fetchAssetDropdownData();
		fetchTradeDropdownData();
		fetchSublocatioDropdownData();
	}, [
		fetchEmployeeData,
		fetchPriorityDropdownData,
		fetchSublocatioDropdownData,
		fetchFailureReportsDropdownData,
		fetchTradeDropdownData,
	]);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const response = await api.get(
					`/table?sp=api_ms_FailureReports_Trx&LocationID=${LocationID}`
				);
				//console.log(response);

				setData(response.data.data);
			} catch (err) {
				setError(err.message || "Failed to fetch data");
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [refetch]);

	const handleDoubleClick = (row) => {
		//console.log("Double-clicked row", row);

		router.navigate({
			pathname: "/ReportBugDetails",
			params: row,
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
			//console.log(selectedRow, 111111);

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
				const response = await api.post("/table?sp=api_ms_FailureReports_Ins", {
					...rowData,
					LocationID: DepartmentID,
				});
				setModelLoader(false);
				setRefetch((prev) => prev + 1);
				setData((prevData) => [...prevData, response.data]);
			} else if (modalType === "edit") {
				setModelLoader(true);
				const response = await api.put(`/table?sp=api_ms_FailureReports_Upd`, {
					...rowData,
					LocationID: DepartmentID,
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
					`/table?sp=api_ms_FailureReports_Del&LocationID=${DepartmentID}&FailureReportID=${selectedRow.FailureReportID}`
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

	const handleInputChange = (key, value) => {
		setRowData((prevData) => ({ ...prevData, [key]: value }));
	};

	const scrollViewRef = useRef(null);

	useEffect(() => {
		const timeout = setTimeout(() => {
			//console.log("ScrollView Ref:", scrollViewRef.current); // Debugging
			if (scrollViewRef.current) {
				scrollViewRef.current?.scrollToEnd({ animated: false });
			}
		}, 1000); // Delay by 100ms to allow rendering

		return () => clearTimeout(timeout); // Cleanup timeout
	}, []);

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
				if (key === "FailureReportTypeID") {
					return (
						<Dropdown
							onChange={(selectedValue) => {
								handleInputChange(key, selectedValue);
							}}
							data={FailureReportsList} // Assuming materialClasses is populated
							placeholder="  اختر نوع البلاغ"
							initailOption={null} // Set initial option if needed
							defaultOption={null} // Set a default option if needed
							value={value} // Controlled value for the dropdown
							inputName="FailureReportTypeID" // Use the key as input name
						/>
					);
				} else if (key === "ReportedByEmployeeID") {
					return (
						<Dropdown
							onChange={(selectedValue) => {
								handleInputChange(key, selectedValue);
								// Additional logic for MaterialID if needed
							}}
							data={employeeData} // Assuming Materials is populated
							placeholder="اختر اسم المبلغ"
							initailOption={null} // Set initial option if needed
							defaultOption={null} // Set a default option if needed
							value={value} // Controlled value for the dropdown
							inputName="ReportedByEmployeeID" // Use the key as input name
						/>
					);
				} else if (key === "PriorityID") {
					return (
						<Dropdown
							onChange={(selectedValue) => {
								handleInputChange(key, selectedValue);
							}}
							data={PriorityList} // Assuming materialClasses is populated
							placeholder="اختر أولويه العمل  "
							initailOption={null} // Set initial option if needed
							defaultOption={null} // Set a default option if needed
							value={value} // Controlled value for the dropdown
							inputName="PriorityID" // Use the key as input name
						/>
					);
				} else if (key === "TradeID") {
					return (
						<Dropdown
							onChange={(selectedValue) => {
								handleInputChange(key, selectedValue);
							}}
							data={TradeID} // Assuming materialClasses is populated
							placeholder="اختر  التصنيف  "
							initailOption={null} // Set initial option if needed
							defaultOption={null} // Set a default option if needed
							value={value} // Controlled value for the dropdown
							inputName="TradeID" // Use the key as input name
						/>
					);
				} else if (key === "AssetID") {
					return (
						<Dropdown
							onChange={(selectedValue) => {
								handleInputChange(key, selectedValue);
							}}
							data={Asset} // Assuming materialClasses is populated
							placeholder="اختر الأصل  "
							initailOption={null} // Set initial option if needed
							defaultOption={null} // Set a default option if needed
							value={value} // Controlled value for the dropdown
							inputName="AssetID" // Use the key as input name
						/>
					);
				} else if (key === "SubLocationID") {
					return (
						<Dropdown
							onChange={(selectedValue) => {
								handleInputChange(key, selectedValue);
							}}
							data={SubLocationData} // Assuming materialClasses is populated
							placeholder="اختر الموقع الفرعى   "
							initailOption={null} // Set initial option if needed
							defaultOption={null} // Set a default option if needed
							value={value} // Controlled value for the dropdown
							inputName="SubLocationID" // Use the key as input name
						/>
					);
				}
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
				<View className="w-40 justify-center flex mb-4 ml-auto">
					<CustomButton
						Icon={add_outline}
						title="انشاء امر الشغل"
						onPress={handleAdd}
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
												selectedRow?.FailureReportID ===
													dataRow?.FailureReportID && {
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
															{col.type === "date" ? item.split("T")[0] : item}
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

export default ReportBugsGrid;
