import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import { MainLayout, MainButton,Dropdown } from "../../../components";
import { useLocalSearchParams, useRouter } from "expo-router";
import AssetCountersGrid from "../../../components/grid/AssetCountersGrid";
import MainGrid from "../../../components/grid/MainGrid";
import AssetHomeLang from "../../../constants/Lang/AssetManagment/AssetHomeLang";
import { useGlobalContext } from "../../../context/GlobalProvider";
import ReportBugsLang from '../../../constants/Lang/Maintenance/ReportBugs';
import { useDropDown } from "../../../hooks/useDropDownData";

const AssetCounters = ({ route }) => {
	const router = useRouter();
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
	const [windowWidth, setWindowWidth] = useState(
		Dimensions.get("window").width
	);
	const {Lang,Rtl,DepartmentID}=useGlobalContext();
	const [width, setWidth] = useState();
	const [YearID, setYearID] = useState(null);
	useEffect(() => {
		if (windowWidth < 800) {
			setWidth("w-48"); // Set width to 250 px
		} else {
			setWidth("w-[80%]"); // Set width to 80%
		}
	}, [windowWidth]);

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
			title={AssetHomeLang.Meters[Lang]}
			className="">
			<View className="bg-white h-[100vh] flex flex-col">
			<View className={`flex flex-col ${Rtl ? "rtl" : "ltr"} bg-[#F6F6F6] rounded-sm p-4 m-4`}>
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
					<View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
						{/* <Text className="w-[109px] text-base pt-1 font-tmedium">
						{AssetHomeLang.WorkOrderStatus[Lang]}
						</Text>
						<Text className={`${width} text-basefont-tmedium`}>
							{AssetStatusName}
						</Text> */}
					</View>
				</View>
          <View style={styles.dropdownContainer}>
              <Dropdown
                placeholder={ReportBugsLang.YearChoose[Lang]}
                label={ReportBugsLang.Year[Lang]}
                data={YearList}
                initailOption={YearList[5]?.key}
                onChange={(e) => {
                  setYearID(e);
                }}
              />
        </View>
				<MainGrid
					tableHead={[
						{
							key: "MeterDate",
							label:AssetHomeLang.Date[Lang],
							type: "date",
							input: "true",
							visible: "true",
						},
						{
							key: "AssetMeterID",
							label: AssetHomeLang.MeterNumber[Lang],
							type: "number",
							input: "false",
							visible: "true",
						},
						{
							key: "Remarks",
							label: AssetHomeLang.MeterDescription[Lang],
							type: "",
							required:"false",
							input: "true",
							visible: "true",
						},
						// {
						// 	key: "MeterDate",
						// 	label:AssetHomeLang.MeterDate[Lang]							,
						// 	type: "date",
						// 	input: "false",
						// 	visible: "false",
						// },
						{
							key: "MeterValue",
							label: AssetHomeLang.Value[Lang],
							type: "number",
							input: "true",
							visible: "true",
						},
					]}
					pk={"AssetMeterID"}
					spTrx={"api_ms_AssetsMeters_Trx"}
					spIns={"api_ms_AssetsMeters_Ins"}
					spUpd={"api_ms_AssetsMeters_Upd"}
					spDel={"api_ms_AssetsMeters_Del"}
					hasCrud={true}
					TrxParam={[
						{ name: "DepartmentID", value: DepartmentID },
						{ name: "AssetID", value: AssetID },
						{ name: "YearID", value: YearID },
					]}
					DelParam={[
						{ name: "DepartmentID", value: DepartmentID },
						{ rowData: true, name: "AssetMeterID", value: "AssetMeterID" },
					]}
					UpdBody={{ DepartmentID: DepartmentID }}
					InsBody={{ DepartmentID: DepartmentID, AssetID: AssetID }}
					TrxDependency={[DepartmentID, AssetID,YearID]}
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


export default AssetCounters;
