import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import { MainLayout, MainButton,Dropdown } from "../../../components";
import { useRouter, useLocalSearchParams } from "expo-router";
import AssetMaintenanceGrid from "../../../components/grid/AssetMaintenanceGrid";
import MainGrid from "../../../components/grid/MainGrid";
import AssetHomeLang from "../../../constants/Lang/AssetManagment/AssetHomeLang";
import { useGlobalContext } from "../../../context/GlobalProvider";
import { useDropDown } from "../../../hooks/useDropDownData";
import ReportBugsLang from '../../../constants/Lang/Maintenance/ReportBugs';
const AssetMaintenance = ({ route }) => {
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
	const {Lang,Rtl,DepartmentID,company}=useGlobalContext();
	const [windowWidth, setWindowWidth] = useState(
		Dimensions.get("window").width
	);
	const [width, setWidth] = useState();
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
			title={AssetHomeLang.MaintenancePlan[Lang]}
			className="">
			<View className="bg-white h-[100vh] flex flex-col">
			<View className={`flex flex-col ${Rtl ? "rtl" : "ltr"} bg-[#F6F6F6] rounded-sm p-4 m-4 mb-6`}>
			<View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
			<Text className="w-[109px] text-base font-tmedium">{AssetHomeLang.AssetCode[Lang]}</Text>
						<Text className={`${width} text-basefont-tmedium`}>
							{AssetCode}
						</Text>
					</View>
					<View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
						<Text className="w-[109px] text-base font-tmedium">{AssetHomeLang.AssetName[Lang]}</Text>
						<Text className={`${width} text-basefont-tmedium`}>
							{AssetName}
						</Text>
					</View>
					<View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
						<Text className="w-[109px] text-base font-tmedium"> {AssetHomeLang.Classification[Lang]}</Text>
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
							key: "ScheduleDetailsID",
							label: AssetHomeLang.ScheduleCode[Lang],
							type: "number",
							input: "true",
							visible: "true",
width:150
						},
						{
							key: "ScheduleName",
							label: AssetHomeLang.ScheduleName[Lang],
							input: "true",
							visible: "true",
width:150
						},
						{
							key: "PlannedStartDate",
							label: AssetHomeLang.ScheduleStartDate[Lang],
							type: "date",
							input: "true",
							visible: "true",
width:150
						},
						{
							key: "PlannedEndDate",
							label: AssetHomeLang.SchemeEndDate[Lang],
							type: "date",
							input: "true",
							visible: "true",
width:150
						},
						{
							key: "LabourCost",
							label: "تكلفه العماله",
							type: "number",
							input: "true",
							visible: "true",
width:150
						},
						{
							key: "MaterialCost",
							label: "تكلفه قطع الغيار",
							type: "number",
							input: "true",
							visible: "true",
width:150
						},
						{
							key: "ServiceCost",
							label: "تكلفه  الخدمات",
							type: "number",
							input: "true",
							visible: "true",
width:150
						},
						{
							key: "ContractorsCost",
							label: "تكلفه  مقاولات",
							type: "number",
							input: "true",
							visible: "true",
width:150
						},
						{
							key: "WorkorderCounter",
							label: "عداد",
							type: "number",
							input: "true",
							visible: "true",
width:150
						},
						{
							key: "WorkorderCode",
							label: "رقم امر الشغل",
							type: "text",
							input: "true",
							visible: "true",
width:150
						},
						{
							key: "WorkorderStatusName",
							label: "حاله امر الشغل",
							type: "text",
							input: "true",
							visible: "true",
width:150
						},						
						
					]}
					spTrx={"api_ms_Assets_plan"}
					StaticWidth={true}
					TrxDependency={[YearID]}
					TrxParam={[
						{ name: "AssetID", value: AssetID },
						{ name: "DepartmentID", value: DepartmentID },
						{ name: "YearID", value: YearID },
					]}
					hasCrud={false}
				/>
				{/* <AssetMaintenanceGrid LocationID={LocationID} AssetID={AssetID} /> */}
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

export default AssetMaintenance;
