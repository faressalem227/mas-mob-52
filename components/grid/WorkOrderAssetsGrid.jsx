import React, { useState, useEffect } from "react";
import {
	View,
	ScrollView,
	SafeAreaView,
	Dimensions,
	TouchableOpacity,
	Text,
	TextInput,
	ActivityIndicator,
} from "react-native";
import { Table, Row } from "react-native-table-component";
import { CheckBox, DatePickerInput, Dropdown } from "../index";
import AssetHomeLang from "../../constants/Lang/AssetManagment/AssetHomeLang";
import api from "../../utilities/api";
import { useRouter } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";

const WorkOrderAssetsGrid = ({ LocationID, WorkorderID }) => {
	const [data, setData] = useState([]);
	const router = useRouter();
	const [assetList, setAssetList] = useState([]);
	const {Lang, company}=useGlobalContext();

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const response = await api.get(
					`/table?sp=api_ms_Workorder_Assets_Trx&LocationID=${LocationID}&WorkorderID=${WorkorderID}`
				);
				setData(response.data.data);
				//console.log(response.data.data);
			} catch (err) {
				setError(err.message || "Failed to fetch data");
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	const tableHead = [
		{
			key: "WorkorderAssetID",
			label: "",
			type: "date",
			input: "false",
			visible: "false",
		},
		{
			key: "AssetID",
			label: "",
			type: "number",
			input: "false",
			visible: "false",
		},
		{
			key: "AssetCode",
			label:AssetHomeLang.AssetCode[Lang],
			type: "number",
			input: "true",
			visible: "true",
		},
		{
			key: "AssetName",
			label:AssetHomeLang.AssetName[Lang],
			type: "date",
			input: "true",
			visible: "true",
		},
		{
			key: "Instructions",
			label: "",
			type: "",
			input: "false",
			visible: "false",
		},
		{
			key: "SubLocationCode",
			label: "",
			type: "text",
			input: "false",
			visible: "false",
		},
		{
			key: "SubLocationName",
			label: "",
			type: "text",
			input: "false",
			visible: "false",
		},
		{
			key: "FullAssetName",
			label: "",
			type: "text",
			input: "false",
			visible: "false",
		},
		{
			key: "MeterValue",
			label:AssetHomeLang.MeterValue[Lang],
			type: "number",
			input: "true",
			visible: "true",
		},
		{
			key: "AssetSubTypeName",
			label: " ",
			type: "",
			input: "false",
			visible: "false",
		},
		{
			key: "AssetStop",
			label:AssetHomeLang.Status[Lang],
			type: "checkbox",
			input: "false",
			visible: "true",
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

	const renderInput = (key, type, value, options = []) => {
		switch (type) {
			case "number":
				return (
					<TextInput
						className="w-full text-sm font-tmedium font-medium h-14 border border-[.5px] border-[#1C5B7D] rounded-lg p-4 text-right focus:border-[#133e5475]"
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
						className="w-full text-sm font-tmedium font-medium h-14 border border-[.5px] border-[#1C5B7D] rounded-lg p-4 text-right focus:border-[#133e5475]"
						value={value}
						onChangeText={(text) => handleInputChange(key, text)}
					/>
				);
		}
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
			{loading ? (
				<ActivityIndicator
					size="large"
					color="#0000ff"
				/>
			) : error ? (
				<Text style={{ textAlign: "center", color: "red" }}>{error}</Text>
			) : (
				<ScrollView horizontal={true}>
					<View>
						<Table>
							<Row
								className="flex flex-row-reverse text-base justify-around font-tbold font-bold"
								data={state.tableHead} // Visible headers
								widthArr={dynamicWidthArr} // Dynamic widths
								style={styles.head}
								textStyle={styles.text}
							/>
						</Table>
						<ScrollView>
							<Table>
								{data.map((dataRow, index) => (
									<TouchableOpacity key={index}>
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

export default WorkOrderAssetsGrid;
