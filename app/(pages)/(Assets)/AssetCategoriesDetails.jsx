import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import { MainLayout, MainButton } from "../../../components";
import { useRouter, useLocalSearchParams } from "expo-router";
import MainGrid from "../../../components/grid/MainGrid";
import AssetHomeLang from "../../../constants/Lang/AssetManagment/AssetHomeLang";
import InfoDetailes from "../../../components/UI/InfoDetailes";
import {
	HandleDropdownFormat,
	useDropDown,
} from "../../../hooks/useDropDownData";
import { useGlobalContext } from "../../../context/GlobalProvider";

const AssetCategoriesDetails = ({ route }) => {
	const {
		AssetID,
		LocationID,
		SubLocationID,
		SubLocationName,
		AssetCode,
		AssetName,
		AssetClassName,
		AssetStatusName,
		...restParams
	} = useLocalSearchParams();

	const router = useRouter();
	const { DepartmentID, Lang, company, Rtl } = useGlobalContext();
	const [windowWidth, setWindowWidth] = useState(
		Dimensions.get("window").width
	);
	const [width, setWidth] = useState();
	const screenHeight = Dimensions.get("window").height; // Get screen height dynamically
	const [selectedScetionID, setselectedScetionID] = useState();
	const [selectdGroupID, setSelectdGroupID] = useState();
	const [ItemID, setItemID] = useState();
	const { data: Section } = useDropDown(
		"api_Sc_Item_Section_List",
		{ LocationID: DepartmentID },
		"SectionID",
		"SectionName"
	);
	const { data: Group } = useDropDown(
		"api_Sc_Item_Group_List2",
		{ SectionID: selectedScetionID },
		"GroupID",
		"GroupName"
	);
	const { data: YearList } = useDropDown(
		"admin_Years_List",
		{ UserName: "", LangID: 1 },
		"YearID",
		"YearName"
	);

	const { data: Items } = useDropDown(
		"api_Sc_Items__List2",
		{
			GroupID: selectdGroupID,
			SectionID: selectedScetionID,
		},
		"ItemID",
		"ItemName"
	);

	const { data: UnitList } = useDropDown(
		"api_sc_Items_Units_List",
		{ ItemID: ItemID },
		"value",
		"label"
	);

	useEffect(() => {
		if (windowWidth < 800) {
			setWidth("w-40"); // Set width to 250 px
		} else {
			setWidth("w-[80%]"); // Set width to 80%
		}
	}, [windowWidth]);
	console.log(DepartmentID);

	const detailsData = [
		{ label: AssetHomeLang.Location[Lang], value: SubLocationName },
		{ label: AssetHomeLang.AssetCode[Lang], value: AssetCode },
		{ label: AssetHomeLang.AssetName[Lang], value: AssetName },
	];
	return (
		<MainLayout title={AssetHomeLang.AssetClassesDetailes[Lang]}>
			<View className="bg-white flex-1 flex flex-col">
				<InfoDetailes
					details={detailsData}
					valueWidthClass="w-[60%]"
				/>
				<View style={[styles.assetsGrid, { height: screenHeight }]}>
					<MainGrid
						handleDropDownChange={(e, v) => {
							if (e == "SectionID") {
								console.log("SectionID", v);

								setselectedScetionID(v);
							}
							if (e == "GroupID") {
								console.log("GroupID", v);

								setSelectdGroupID(v);
							}
							if (e == "ItemID") {
								console.log("ItemID", v);
								setItemID(v);
							}
						}}
						tableHead={[
							{
								key: "AssetMaterialID",
								visible: "false",
								input: "false",
							},
							{
								key: "OrderNo",
								type: "number",
								label: AssetHomeLang.PermissionNumber[Lang],
								input: "true",
								visible: "true",
								width: 150,
							},
							{
								key: "OrderDate",
								type: "date",
								label: AssetHomeLang.PermissionDate[Lang],
								input: "true",
								visible: "true",
								width: 110,
							},
							{
								key: "SectionName",
								label: AssetHomeLang.Classification[Lang],
								type: "text",
								input: "false",
								visible: "true",
								width: 150,
							},
							{
								key: "GroupName",
								label: "التصنيف",
								type: "text",
								input: "false",
								visible: "true",
								width: 150,
							},
							{
								key: "ItemCode",
								label: AssetHomeLang.ItemCode[Lang],
								type: "text",
								input: "false",
								visible: "true",
								width: 120,
							},
							{
								key: "ItemName",
								label: AssetHomeLang.Item[Lang],
								input: "false",
								visible: "true",
								width: 120,
							},
							{
								key: "UnitName",
								label: AssetHomeLang.Unit[Lang],
								type: "text",
								input: "false",
								visible: "true",
								width: 100,
							},
							{
								key: "Qty",
								label: AssetHomeLang.Quantity[Lang],
								type: "number",
								input: "true",
								visible: "true",
								width: 100,
							},
							{
								key: "SectionID",
								label: AssetHomeLang.Classification[Lang],
								type: "dropdown",
								options: Section,
								input: "true",
								visible: "false",
								width: 100,
							},
							// {
							// 	key: "GroupID",
							// 	label: AssetHomeLang.Group[Lang],
							// 	type: "dropdown",
							// 	options: Group,
							// 	input: "true",
							// 	visible: "false",
							// 	width: 100,
							// },
							// {
							// 	key: "ItemID",
							// 	label: AssetHomeLang.Item[Lang],
							// 	type: "dropdown",
							// 	options: Items,
							// 	input: "true",
							// 	visible: "false",
							// 	width: 100,
							// },
							
							// {
							// 	key: "UnitID",
							// 	label: AssetHomeLang.Unit[Lang],
							// 	type: "dropdown",
							// 	options: UnitList,
							// 	input: "true",
							// 	visible: "false",
							// 	width: 100,
							// },
							{
								key: "UnitCost",
								label: AssetHomeLang.UnitCost[Lang],
								type: "number",
								input: "true",
								visible: "true",
								width: 150,
							},
							{
								key: "TotalCost",
								label: AssetHomeLang.TotalCost[Lang],
								type: "number",
								input: "false",
								visible: "true",
								width: 100,
							},
							// {
							// 	key: "YearID",
							// 	type: "dropdown",
							// 	label: AssetHomeLang.Year[Lang],
							// 	options: YearList,
							// 	input: "true",
							// 	visible: "true",
							// 	width: 100,
							// },
							// {
							// 	key: "Remarks",
							// 	label: AssetHomeLang.Notes[Lang],
							// 	type: "text",
							// 	input: "true",
							// 	required: "false",
							// 	visible: "true",
							// 	width: 150,
							// },
						]}
						//pk={"AssetMaterialID"}
						spTrx={"api_ms_Assets_Materials_Trx"}
						// spIns={"api_ms_Assets_Materials_Ins"}
						// spUpd={"api_ms_Assets_Materials_Upd"}
						// spDel={"api_ms_Assets_Materials_Del"}
						TrxParam={[
							{ name: "DepartmentID", value: DepartmentID },
							{ name: "AssetID", value: AssetID },
						//	{ name: "CompanyID", value: company },
						]}
						// DelParam={[
						// 	{
						// 		rowData: true,
						// 		name: "AssetMaterialID",
						// 		value: "AssetMaterialID",
						// 	},
						// ]}
						// UpdBody={{ LocationID: DepartmentID }}
						// InsBody={{ LocationID: DepartmentID, AssetID: AssetID }}
						mixedWidth={true}
						hasCrud={false}
						StaticWidth
						// routeTo={{
						// 	path: "/ItemsDetails",
						// 	hasParams: true,
						// 	params: {
						// 		LocationID: DepartmentID,
						// 		SubLocationName: SubLocationName,
						// 		AssetCode: AssetCode,
						// 		AssetName: AssetName,
						// 	},
						// }}
					/>
				</View>
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
		marginVertical: 16,
	},
});

export default AssetCategoriesDetails;
