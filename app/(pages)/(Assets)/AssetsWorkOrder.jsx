import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import { MainLayout, MainButton ,Dropdown} from "../../../components";
import { useRouter, useLocalSearchParams } from "expo-router";
import AssetsWorkOrderGrid from "../../../components/grid/AssetsWorkOrderGrid";
import MainGrid from "../../../components/grid/MainGrid";
import AssetHomeLang from "../../../constants/Lang/AssetManagment/AssetHomeLang";
import { useGlobalContext } from "../../../context/GlobalProvider";
import { useDropDown } from "../../../hooks/useDropDownData";
import ReportBugsLang from '../../../constants/Lang/Maintenance/ReportBugs';

const AssetsWorkOrder = ({ route }) => {
	const {
		AssetID,
		SubLocationID,
		LocationID,
		AssetCode,
		AssetName,
		AssetClassName,
		AssetStatusName,
		...restParams
	} = useLocalSearchParams();
	const router = useRouter();
	const [windowWidth, setWindowWidth] = useState(
		Dimensions.get("window").width
	);
	const [width, setWidth] = useState();
	const {Lang,Rtl,DepartmentID}=useGlobalContext();
	useEffect(() => {
		if (windowWidth < 800) {
			setWidth("w-48"); // Set width to 250 px
		} else {
			setWidth("w-[80%]"); // Set width to 80%
		}
	}, [windowWidth]);
	const [YearID, setYearID] = useState(null);
	
		const { data: YearList, loading: YearLoader } = useDropDown(
			'api_ms_Years_List',
			{ DepartmentID: DepartmentID },
			'YearID',
			'YearName'
		  );

	//console.log("windowWidth", windowWidth);
	//console.log("computed width", width);
	return (
		<MainLayout
			title={AssetHomeLang.WorkOrders[Lang]}
			className="">
			<View className="bg-white h-[100vh] flex flex-col">
			<View className={`flex flex-col ${Rtl ? "rtl" : "ltr"} bg-[#F6F6F6] rounded-sm p-4 m-4 mb-6`}>
			<View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
			<Text className="w-[109px] text-base  font-tmedium">{AssetHomeLang.AssetCode[Lang]}</Text>
						<Text className={`${width} text-basefont-tmedium`}>
							{AssetCode}
						</Text>
					</View>
					<View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
						<Text className="w-[109px] text-base  font-tmedium">
							{" "}
							{AssetHomeLang.AssetName[Lang]}
						</Text>
						<Text className={`${width} text-basefont-tmedium`}>
							{AssetName}
						</Text>
					</View>
					<View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
						<Text className="w-[109px] text-bas e font-tmedium"> {AssetHomeLang.Description[Lang]}</Text>
						<Text className={`${width} text-basefont-tmedium`}>
							{AssetClassName}
						</Text>
					</View>
					{/* <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
						<Text className="w-[109px] text-base pt-1 font-tmedium">
						{AssetHomeLang.WorkOrderStatus[Lang]}
						</Text>
						<Text className={`${width} text-basefont-tmedium`}>
							{AssetStatusName}
						</Text>
					</View> */}
				</View>
				<Dropdown
                placeholder={ReportBugsLang.YearChoose[Lang]}
                label={ReportBugsLang.Year[Lang]}
                data={YearList}
                initailOption={YearList[5]?.key}
                onChange={(e) => {
                  setYearID(e);
                }}
              />
				<MainGrid
					tableHead={[
						{
							key: "WorkorderCode",
							label: AssetHomeLang.WorkOrderNumber[Lang],
							type: "number",
							input: "true",
							visible: "true",
width:200
						},
						{
							key: "WorkorderName",
							label: AssetHomeLang.WorkOrderDescription[Lang],
							input: "true",
							visible: "true",
width:200
						},
						{
							key: "WorkorderTypeName",
							label: AssetHomeLang.WorkOrderType[Lang],
							input: "true",
							visible: "true",
width:200
						},
						{
							key: "WorkorderStatusName",
							label: AssetHomeLang.WorkOrderStatus[Lang],
							type: "",
							input: "true",
							visible: "true",
width:200
						},
						{
							key: "TradeName",//
							label: "تصنيف الاعمال",
							type: "",
							input: "true",
							visible: "true",
width:200
						},
						{
							key: "PriorityName",
							label: "الاولوية",
							type: "",
							input: "true",
							visible: "true",
width:200
						},
						{
							key: "StaffCode",
							label: "كود الموظف",
							type: "",
							input: "true",
							visible: "true",
width:200
						},
						{
							key: "StaffName",
							label: "اسم الموظف المسئول",
							type: "",
							input: "true",
							visible: "true",
width:200
						},
						{
							key: "RequiredExecuteDate",
							label: "تاريخ التنفيذ المطلوب",
							type: "",
							input: "true",
							visible: "true",
width:200
						},
						{
							key: "Safety",
							label: "مهمات الوقاية والامان",
							type: "",
							input: "true",
							visible: "true",
width:200
						},
						{
							key: "FailureCauseName",
							label: "سبب العطل",
							type: "",
							input: "true",
							visible: "true",
width:200
						},
						{
							key: "PlannedStartDate",
							label: "تاريخ بدء مخطط",
							type: "",
							input: "true",
							visible: "true",
width:200
						},
						{
							key: "PlannedEndDate",
							label: "تاريخ نهو مخطط",
							type: "",
							input: "true",
							visible: "true",
width:200
						},
						{
							key: "ActualStartDate",
							label: "تاريخ بدا فعلي",
							type: "",
							input: "true",
							visible: "true",
width:200
						},
						{
							key: "ActualEndDate",
							label: "تاريخ نهو فعلي",
							type: "",
							input: "true",
							visible: "true",
width:200
						},
						{
							key: "ClosedDate",
							label: "تاريخ الاغلاق ",
							type: "",
							input: "true",
							visible: "true",
width:200
						},
						{
							key: "CancelledDate",
							label: "تاريخ الالغاء ",
							type: "",
							input: "true",
							visible: "true",
width:200
						},
						{
							key: "ScheduleCode",
							label: "كود الجدولة ",
							type: "",
							input: "true",
							visible: "true",
width:200
						},
						{
							key: "ScheduleName",
							label: "اسم الجدولة ",
							type: "",
							input: "true",
							visible: "true",
width:200
						},
						
					]}
					//pk={"WorkorderAssetID"}
					spTrx={"api_ms_Asset_WorkOrders"}
					TrxParam={[
						{ name: "DepartmentID", value: DepartmentID },
						{ name: "AssetID", value: AssetID },
						{ name: "YearID", value: YearID },
					]}
					TrxDependency={[YearID]}
					hasCrud={false}
					            StaticWidth={true}

					routeTo={{
						path: "/WorkOrderDetails",
						hasParams: true,
						params: {
							LocationID: LocationID,
							SubLocationID: SubLocationID,
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
    marginVertical: 8,
  },
  assetsGrid: {
    marginVertical: 8,
  },
});

export default AssetsWorkOrder;
