import { StyleSheet, View, Dimensions, Alert } from "react-native";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
// import { colors, roles } from "../../../constants";
// import icons from "../../../constants";
import { useGlobalContext } from "../../../context/GlobalProvider";
import StoresPageLang from "../../../constants/Lang/Invintory/StoresPageLang";
import Icon from "react-native-vector-icons/MaterialIcons";
import React, { useState, useEffect, useCallback } from "react";
import api from "../../../utilities/api";
import MainGrid from "../../../components/grid/MainGrid";
import FirstTermBalanceGrid from "../../../components/grid/FirstTermBalanceGrid";
import { CustomButton, Dropdown, MainLayout } from "../../../components";
import add_outline from "../../../assets/images/add_outline.png";
import {
	HandleDropdownFormat,
	useDropDown,
} from "../../../hooks/useDropDownData";
import { priceFormatter } from "../../../utilities/dateFormater";
import Toast from "react-native-toast-message";
const screenHeight = Dimensions.get("window").height;
const FirstTermBalance = ({
	title,
	hasLeftComponent = false,
	onDrawerPress,
}) => {
	const { DepartmentID, Lang, company , Rtl } = useGlobalContext();
	const { user } = useGlobalContext();
	const { SectionID, LocationID, processTypeID, OrderID, Delete } =
		useLocalSearchParams();
	const [processOption, setPorcessOption] = useState({});
	const [loading, setLoading] = useState(false);
	const [refetch, setRefetch] = useState(0);
	const [scProcess, setSCProcess] = useState({});
	const [assetClassList, setAssetClassList] = useState(false);
	const [assetList, setAssetList] = useState(false);
	const [contractorList, setContractorList] = useState(false);
	const [processValue, setProcessValue] = useState(false);
	const [employeeList, setEmployeeList] = useState(false);
	const [ParityList, setParityList] = useState(false);
	const [DepartmentList, setDepartmentList] = useState(false);
	const [SupplierList, setSupplierList] = useState(false);
	const [WorkorderList, setWorkorderList] = useState(false);

	const [toast, setToast] = useState({
		text1: "",
		text2: "",
		counter: 0,
		type: "",
	});
	const titles = {
		1: StoresPageLang.BeginningBalance[Lang],
		2:  StoresPageLang.Add[Lang],
		3:  StoresPageLang.Disburse[Lang],
		4:  StoresPageLang.Transfer[Lang],
		5:  StoresPageLang.Inventory[Lang],
	};
	const pageTitle = titles[processTypeID] || "عنوان افتراضي";

	const { data: processList, loading: processListLoader } = useDropDown(
		"api_Sc_Process_List2",
		{ ProcessTypeID: processTypeID },
		"ProcessID",
		"ProcessName"
	);

	const getSCProcess = async () => {
		if (processValue) {
			const res = await api.get(
				`/table?sp=api_sc_process_optoins_List&LangID=${Lang}&ProcessID=${processValue}`
			);
			console.log("testttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt");
			console.log(res.data.data[0].value);

			setSCProcess(res.data.data[0]);
		}
	};
	const getProcessList = async () => {
		if (scProcess) {
			//console.log(scProcess.value);
			// if (scProcess.UseAssetClassID) {
			// 	try {
			// 		setLoading(true);
			// 		const response = await api.get(`/table?sp=am_AssetClass_List`);
			// 		//("API Response:", response.data); // Log the entire response for inspection

			// 		// Assuming response.data.data contains the array of sub-locations
			// 		const subLocationList = response.data.data || [];

			// 		if (Array.isArray(subLocationList)) {
			// 			const list = HandleDropdownFormat(
			// 				subLocationList,
			// 				"AssetClassID",
			// 				"AssetClassNameEn"
			// 			);
			// 			//("5555", list);
			// 			setAssetClassList(list);
			// 		} else {
			// 			console.error(
			// 				"Expected subLocationList to be an array, but got:",
			// 				subLocationList
			// 			);
			// 		}
			// 	} catch (err) {
			// 		console.error("Error fetching dropdown data:", err);
			// 	} finally {
			// 		setLoading(false);
			// 	}
			// }
			if (scProcess.value==14) {
				try {
					setLoading(true);
					const response = await api.get(`/table?sp=api_Sc_Asset_List2&CompanyID=${company}`);
					const subLocationList = response.data.data || [];

					if (Array.isArray(subLocationList)) {
						const list = HandleDropdownFormat(
							subLocationList,
							"AssetID",
							"AssetName"
						);
						setAssetList(list);
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
			}
			if (scProcess.value==4) {
				try {
					setLoading(true);
					const response = await api.get(`/table?sp=Sc_Contractor_List&CompanyID=${company}`);
					//   console.log("API Response:", response.data); // Log the entire response for inspection

					// Assuming response.data.data contains the array of sub-locations
					const subLocationList = response.data.data || [];

					if (Array.isArray(subLocationList)) {
						const list = HandleDropdownFormat(
							subLocationList,
							"ContractorID",
							"ContractorName"
						);
						// console.log(list, 5555555555555555555555);

						// console.log("5555", list);
						setContractorList(list);
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
			}
			if (scProcess.value==5) {
				try {
					setLoading(true);
					const response = await api.get(`/table?sp=Sc_Employee_List&CompanyID=${company}`);
					//   console.log("API Response:", response.data); // Log the entire response for inspection

					// Assuming response.data.data contains the array of sub-locations
					const subLocationList = response.data.data || [];

					if (Array.isArray(subLocationList)) {
						const list = HandleDropdownFormat(
							subLocationList,
							"EmployeeID",
							"EmployeeName"
						);
						// console.log(list, 5555555555555555555555);

						// console.log("5555", list);
						setEmployeeList(list);
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
			}
			if (scProcess.value==8) {
				try {
					setLoading(true);
					const response = await api.get(`/table?sp=Sc_Parity_List&CompanyID=${company}`);
					//   console.log("API Response:", response.data); // Log the entire response for inspection

					// Assuming response.data.data contains the array of sub-locations
					const subLocationList = response.data.data || [];

					if (Array.isArray(subLocationList)) {
						const list = HandleDropdownFormat(
							subLocationList,
							"ParityID",
							"ParityName"
						);
						// console.log(list, 5555555555555555555555);

						// console.log("5555", list);
						setParityList(list);
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
			}
			if (scProcess.value==13) {
				try {
					setLoading(true);
					const response = await api.get(`/table?sp=Sc_Department_List&CompanyID=${company}`);
					//   console.log("API Response:", response.data); // Log the entire response for inspection

					// Assuming response.data.data contains the array of sub-locations
					const subLocationList = response.data.data || [];

					if (Array.isArray(subLocationList)) {
						const list = HandleDropdownFormat(
							subLocationList,
							"DepartmentID",
							"DepartmentName"
						);
						// console.log(list, 5555555555555555555555);

						// console.log("5555", list);
						setDepartmentList(list);
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
			}
			if (scProcess.value==2) {
				try {
					setLoading(true);
					const response = await api.get(`/table?sp=Sc_Suppliers_List&CompanyID=${company}`);
					//   console.log("API Response:", response.data); // Log the entire response for inspection

					// Assuming response.data.data contains the array of sub-locations
					const subLocationList = response.data.data || [];

					if (Array.isArray(subLocationList)) {
						const list = HandleDropdownFormat(
							subLocationList,
							"SupplierID",
							"SupplierName"
						);
						// console.log(list, 5555555555555555555555);

						// console.log("5555", list);
						setSupplierList(list);
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
			}
			if (scProcess.value==6) {
				try {
					setLoading(true);
					const response = await api.get(`/table?sp=api_Sc_Workorder_List&LocationID=${DepartmentID}&CompanyID=${company}`);
					//   console.log("API Response:", response.data); // Log the entire response for inspection

					// Assuming response.data.data contains the array of sub-locations
					const subLocationList = response.data.data || [];

					if (Array.isArray(subLocationList)) {
						const list = HandleDropdownFormat(
							subLocationList,
							"WorkorderID",
							"WorkorderName"
						);
						// console.log(list, 5555555555555555555555);

						// console.log("5555", list);
						setWorkorderList(list);
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
			}
		}
	};


	useFocusEffect(
		useCallback(() => {
			setRefetch((prevRefetch) => prevRefetch + 1);
		}, [])
	);

	useEffect(() => {
		if (processList) {
			setProcessValue(processList[0]?.key);
			setPorcessOption(processList[0]);
		}
	}, [processList]);

	useEffect(() => {
		if (processValue) {
			getSCProcess();
		}
	}, [processValue]);

	useEffect(() => {
		if (scProcess) {
			getProcessList();
		}
	}, [scProcess]);

	return (
		<MainLayout
			// loading={loading}
			toast={toast}
			title={StoresPageLang.PageTitle[Lang]}>
			<View className="mx-2 my-4">
				<Dropdown
					placeholder={StoresPageLang.SelectTransactionType[Lang]}
					title={StoresPageLang.TransactionType[Lang]}
					data={processList}
					value={processValue}
					initailOption={processValue}
					onChange={(v) => {
						setProcessValue(v);
						setPorcessOption(processList.find((i) => i.key == v));
					}}
				/>
			</View>
			<View style={[styles.assetsGrid, { height: screenHeight-120 }]}>
				<View className={`flex-row ${Rtl ? "flex-row-reverse" : ""}`}>
					<CustomButton
						Icon={add_outline}
						title={StoresPageLang.NewAddition[Lang]}
						// width={115}
						onPress={() => {
							if (processOption?.key) {
								router.navigate({
									pathname: "AddNewPermissionPage",
									params: {
										type: 1,
										processTypeID: processTypeID,
										SectionID: SectionID,
										processID: processOption?.key,
										processLabel: processOption?.value,
									},
								});
							} else {
								// Alert.alert(
								// 	"حدث خطأ", // Title
								// 	"من فضلك ادخل نوع العملية", // Message
								// 	[{ text: "حسنا", style: "cancel" }] // Button
								// );
								Toast.show({
									type: "error",
									text1: StoresPageLang.ErrorTitle[Lang],
									text2: StoresPageLang.SelectTransactionTypeError[Lang],
									autoHide: true,
									visibilityTime: 3000,
									text1Style: {
										textAlign: "right",
									},
									text2Style: {
										textAlign: "right",
									},
								});
							}
						}}
					/>
				</View>
				<MainGrid
					tableHead={[
						{
							key: "ProcessID",
							label: StoresPageLang.PermissionNumber[Lang],
							type: "number",
							input: "false",
							visible: "false",
							width: 100,
						},
						{
							key: "trx_statusID",
							label: "حالة الاذن",
							type: "number",
							width: 100,
						},
						{
							key: "OrderNo",
							label: StoresPageLang.PermissionNumber[Lang],
							type: "number",
							input: "false",
							visible: "true",
							width: 100,
						},
						{
							key: "ProcessName",
							label: StoresPageLang.ProcessName[Lang],
							type: "text",
							input: "true",
							visible: "false",
							width: 100,
						},
						{
							key: "OrderDate",
							label: StoresPageLang.PermissionDate[Lang],
							type: "date",
							input: "true",
							visible: "true",
							width: 100,
						},
						{
							key: "AssetID",
							label: StoresPageLang.Asset[Lang],
							type: "dropdown",
							options: assetList && scProcess.value==14 ? assetList : [],
							input: assetList ? "true" : "false",
							visible: "false",
							width: 100,
						},
						{
							key: "AssetName",
							label: StoresPageLang.Asset[Lang],
							type: "text",
							input: "false",
							visible: assetList && scProcess.value==14 ? "true" : "false",
							width: 100,
						},
						{
							key: "AssetClassID",
							label: StoresPageLang.AssetClassification[Lang],
							type: "dropdown",
							options:
								assetClassList && scProcess.UseAssetClassID
									? assetClassList
									: [],
							input: assetClassList ? "true" : "false",
							visible: "false",
							width: 100,
						},
						{
							key: "AssetClassName",
							label:StoresPageLang.AssetClassification[Lang],
							type: "text",
							input: "false",
							visible:
								assetClassList && scProcess.UseAssetClassID ? "true" : "false",
							width: 100,
						},
						{
							key: "ContractorID",
							label: StoresPageLang.Contractor[Lang],
							type: "dropdown",
							options:
								contractorList && scProcess.value==4
									? contractorList
									: [],
							input:
								contractorList && scProcess.value==4 ? "true" : "false",
							visible: "false",
							width: 100,
						},
						{
							key: "ContractorName",
							label: StoresPageLang.Contractor[Lang],
							type: "text",
							input: "false",
							visible:
								contractorList && scProcess.value==4 ? "true" : "false",
							width: 100,
						},
						{
							key: "EmployeeID",
							label: StoresPageLang.Employee[Lang],
							type: "dropdown",
							options:
								employeeList && scProcess.value==5 ? employeeList : [],
							input: employeeList && scProcess.value==5 ? "true" : "false",
							visible: "false",
							width: 100,
						},
						{
							key: "EmployeeName",
							label: StoresPageLang.Employee[Lang],
							type: "text",
							input: "false",
							visible:
								employeeList && scProcess.value==5 ? "true" : "false",
							width: 100,
						},
						{
							key: "ParityID",							
							label: StoresPageLang.Parity[Lang],
							type: "dropdown",
							options: ParityList && scProcess.value==8 ? ParityList : [],
							input: ParityList && scProcess.value==8 ? "true" : "false",
							visible: "false",
							width: 100,
						},
						{
							key: "ParityName",
							label: StoresPageLang.Parity[Lang],
							type: "text",
							input: "false",
							visible: ParityList && scProcess.value==8 ? "true" : "false",
							width: 100,
						},
						{
							key: "DepartmentID",
							label:StoresPageLang.Department[Lang],
							type: "dropdown",
							options:
								DepartmentList && scProcess.value==13
									? DepartmentList
									: [],
							input:
								DepartmentList && scProcess.value==13 ? "true" : "false",
							visible: "false",
							width: 100,
						},
						{
							key: "DepartmentName",
							label:StoresPageLang.Department[Lang],
							type: "text",
							input: "false",
							visible:
								DepartmentList && scProcess.value==13 ? "true" : "false",
							width: 100,
						},
						{
							key: "SupplierID",
							label:StoresPageLang.Supplier[Lang],
							type: "dropdown",
							options:
								SupplierList && scProcess.value==2 ? SupplierList : [],
							input: SupplierList && scProcess.value==2 ? "true" : "false",
							visible: "false",
							width: 100,
						},
						{
							key: "SupplierName",
							label:StoresPageLang.Supplier[Lang],
							type: "text",
							input: "false",
							visible:
								SupplierList && scProcess.value==2 ? "true" : "false",
							width: 120,
						},
						{
							key: "WorkorderID",
							label: StoresPageLang.Workorder[Lang],
							type: "dropdown",
							options:
								WorkorderList && scProcess.value==6 ? WorkorderList : [],
							input:
								WorkorderList && scProcess.value==6 ? "true" : "false",
							visible: "false",
							width: 100,
						},
						{
							key: "WorkorderName",
							label: StoresPageLang.Workorder[Lang],
							type: "text",
							input: "false",
							visible:
								WorkorderList && scProcess.value==6 ? "true" : "false",
							width: 100,
						},
						{
							key: "OrderDescription",
							label: StoresPageLang.Description[Lang],
							type: "text",
							input: "true",
							visible: "true",
							width: 100,
						},
						{
							key: "Total",
							label: StoresPageLang.Total[Lang],
							type: "price",
							input: "true",
							visible: "true",
							width: 100,
						},
					]}
					highlight={{ col: "trx_statusID", bgcolor: "#9be19b", value: 6 }}
					pk={"OrderID"}
					spTrx={"api_Sc_Orders_Trx"}
					spIns={"api_Sc_Item_Section_Ins"}
					spUpd={"api_Sc_Item_Section_Upd"}
					spDel={"api_Sc_Item_Section_Del"}
					hasCrud={false}
					TrxParam={[
						{ name: "LocationID", value: DepartmentID },
						{ name: "CompanyID", value: 1 },
						{ name: "ProcessID", value: processValue },
						{ name: "SectionID", value: SectionID },
					]}
					StaticWidth={true}
					DelParam={[{ rowData: true, name: "AssetID", value: "AssetID" }]}
					UpdBody={{ CompanyID: DepartmentID }}
					InsBody={{ CompanyID: DepartmentID }}
					TrxDependency={[OrderID, Delete, refetch, processValue]}
					routeTo={{
						path: "/PermissionDetails",
						replace: true,
						hasParams: true,
						params: {
							processTypeID: processTypeID,
							SectionID: SectionID,
							Changed: OrderID,
						},
					}}
				/>
			</View>
		</MainLayout>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	dropdownContainer: {
		marginHorizontal: 16,
		marginVertical: 24,
	},
	assetsGrid: {
		marginVertical: 8,
	},
});
export default FirstTermBalance;
