import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import { MainLayout, MainButton } from "../../../components";
import { useRouter, useLocalSearchParams } from "expo-router";
import MainGrid from "../../../components/grid/MainGrid";
import AssetHomeLang from "../../../constants/Lang/AssetManagment/AssetHomeLang";
import { useGlobalContext } from "../../../context/GlobalProvider";
import {
	HandleDropdownFormat,
	useDropDown,
} from "../../../hooks/useDropDownData";

const AssetCategories = ({ route }) => {
	const {
		AssetID,
		SubLocationID,
		DepartmentID,
		AssetCode,
		AssetName,
		AssetClassName,
		AssetStatusName,
		...restParams
	} = useLocalSearchParams();
	const router = useRouter();
	const {Lang, company}=useGlobalContext();
	const [windowWidth, setWindowWidth] = useState(
		Dimensions.get("window").width
	);
	const [width, setWidth] = useState();
	const screenHeight = Dimensions.get("window").height; // Get screen height dynamically
	const [selectedSubLoaction, setSelectedSubLocation] = useState(null);

	useEffect(() => {
		if (windowWidth < 800) {
			setWidth("w-48"); // Set width to 250 px
		} else {
			setWidth("w-[80%]"); // Set width to 80%
		}
	}, [windowWidth]);

	const { data: SubLocationList, loading: SubLocationListloader } = useDropDown(
		"api_ms_sublocation_List",
		{ LocationID: DepartmentID },
		"value",
		"label"
	);
	const { data: AssetList, loading: AssetLoader } = useDropDown(
		"api_ms_assets_List",
		{ LocationID: DepartmentID, SubLocationID: selectedSubLoaction },
		"AssetID",
		"AssetName"
	);
	return (
		<MainLayout
			title={AssetHomeLang.AssetClasses[Lang]}
			className="">
			<View className="bg-white h-[100vh] flex flex-col">
				<View style={[styles.assetsGrid, { height: screenHeight }]}>
					<MainGrid
						handleDropDownChange={(e, v) => {
							if (e === "SubLocationID") {
								setSelectedSubLocation(v);
							}
						}}
						tableHead={[
							{
								key: "SubLocationName",
								label: AssetHomeLang.Location[Lang],
								input: "false",
								visible: "true",
							},
							{
								key: "SubLocationID",
								label: AssetHomeLang.Location[Lang],
								type: "dropdown",
								options: SubLocationList,
								input: "true",
								visible: "false",
							},
							{
								key: "AssetID",
								label: AssetHomeLang.AssetName[Lang],
								type: "dropdown",
								options: AssetList,
								input: "true",
								visible: "false",
							},

							{
								key: "AssetCode",
								label: AssetHomeLang.AssetCode[Lang],
								type: "number",
								input: "false",
								visible: "true",
							},
							{
								key: "AssetName",
								label: AssetHomeLang.AssetName[Lang],
								input: "false",
								visible: "true",
							},
						]}
						pk={"AssetID"}
						spTrx={"api_asset_has_items_Trx"}
						spIns={"api_asset_has_items_Ins"}
						spDel={"api_asset_has_items_Del"}
						hasUpd={false}
						TrxParam={[{ name: "LocationID", value: DepartmentID },{ name: "CompanyID", value: company }]}
						DelParam={[{ rowData: true, name: "AssetID", value: "AssetID" }]}
						UpdBody={{ LocationID: DepartmentID }}
						InsBody={{ LocationID: DepartmentID }}
						TrxDependency={[]}
						routeTo={{
							path: "/AssetCategoriesDetails",
							hasParams: true,
							params: {
								LocationID: DepartmentID,
							},
						}}
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

export default AssetCategories;
