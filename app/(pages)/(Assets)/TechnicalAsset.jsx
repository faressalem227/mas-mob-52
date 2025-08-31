import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import { MainLayout, MainButton } from "../../../components";
import { useRouter, useLocalSearchParams } from "expo-router";
import TechnicalAssetGrid from "../../../components/grid/TechnicalAssetGrid";
import MainGrid from "../../../components/grid/MainGrid";
import { useDropDown } from "../../../hooks/useDropDownData";
import AssetHomeLang from "../../../constants/Lang/AssetManagment/AssetHomeLang";
import { useGlobalContext } from "../../../context/GlobalProvider";
const TechnicalAssets = ({ route }) => {
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
 const {Lang, company,Rtl,DepartmentID}=useGlobalContext();
	const { data: AssetAttributeList, loading: AssetAttributeLoader } =
		useDropDown(
			"api_asset_attributes_List_ByAsset",
			{ AssetID: AssetID },
			"AttributeID",
			"AttributeFullName"
		);
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

	//console.log("windowWidth", windowWidth);
	//console.log("computed width", width);
	return (
		<MainLayout
			title={AssetHomeLang.TechnicalSpecifications[Lang]}
			className=""
			loading={AssetAttributeLoader}>
			<View className=" flex-1 flex flex-col">
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
					{/* <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
						<Text className="w-[109px] text-base pt-1 font-tmedium">
						{AssetHomeLang.WorkOrderStatus[Lang]}
						</Text>
						<Text className={`${width} text-basefont-tmedium`}>
							{AssetStatusName}
						</Text>
					</View> */}
				</View>
				<MainGrid
					tableHead={[
						{
							key: "AttributeID",
							label: AssetHomeLang.AttributeID[Lang],
							type: "dropdown",
							options: AssetAttributeList,
							input: "true",
							visible: "false",
						},
						{
							key: "AttributeName",
							label: AssetHomeLang.TechnicalSpecifications[Lang],
							input: "false",
							visible: "true",
						},
						{
							key: "Unit",
							label: AssetHomeLang.Unit[Lang],
							input: "true",
							visible: "true",
						},
						{
							key: "AttributeValue",
							label: AssetHomeLang.Value[Lang],
							input: "true",
							visible: "true",
						},
						{
							key: "AssetAttributesID",
							label: "اسم الاصل",
							input: "false",
							visible: "false",
						},
					]}
					pk={"AssetAttributesID"}
					spTrx={"api_ms_AssetAttributes_Trx"}
					spIns={"api_ms_AssetAttributes_Ins"}
					spUpd={"api_ms_AssetAttributes_Upd"}
					spDel={"api_ms_AssetAttributes_Del"}
					TrxParam={[{ name: "AssetID", value: AssetID }, {name:"DepartmentID", value:DepartmentID}]}
					DelParam={[
						{
							rowData: true,
							name: "AssetAttributeID",
							value: "AssetAttributesID",
						},
					]}
					InsBody={{ AssetID: AssetID }}
				/>
			</View>
		</MainLayout>
	);
};

export default TechnicalAssets;
