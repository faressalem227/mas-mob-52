import React, { useState, useCallback, useEffect } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import { useGlobalContext } from "../../../context/GlobalProvider";
import { Dropdown } from "../../../components";
import { MainLayout } from "../../../components";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useDropDown } from "../../../hooks/useDropDownData";
import MainGrid from "../../../components/grid/MainGrid";
import AssetHomeLang from "../../../constants/Lang/AssetManagment/AssetHomeLang";
const RiskEvaluation = () => {
	const { user,Lang, company } = useGlobalContext();
	const [SubLocationID, setSubLocationID] = useState(null);
	const screenHeight = Dimensions.get("window").height; // Get screen height dynamically
	const { DepartmentID } = useLocalSearchParams();
	const [loading, setLoading] = useState(false); // Ensure loading state is defined
	const [rerender, setRerender] = useState(0);
	useFocusEffect(
		useCallback(() => {
			setRerender((prev) => prev + 1);
			console.log("rerender", rerender);
		}, [])
	);
	const {
		data: assetlist,
		loading: assetLoader,
		error: assetError,
	} = useDropDown(
		"api_ms_Assets_ListBySubLocation",
		{ SubLocationID: SubLocationID, LocationID: DepartmentID },
		"value",
		"label"
	);
	const {
		data: subLocation,
		loading: subLocationloader,
		error: subLocationerr,
	} = useDropDown(
		"api_ms_SubLocation_List",
		{ LocationID: DepartmentID },
		"value",
		"label"
	);
	console.log(rerender, "rerender");

	return (
		<View style={styles.container}>
			<MainLayout
				title={AssetHomeLang.RiskEvaluation[Lang]}
				loading={loading}>
				<View style={[styles.RiskEvaluationGrid, { height: screenHeight }]}>
					<MainGrid
						handleDropDownChange={(key, val) => {
							if (key == "SubLocationID") {
								setSubLocationID(val);
							}
						}}
						tableHead={[
							{
								key: "RiskID",
								label: "رقم التقييم",
								input: "false",
								visible: "false",
							},
							{
								key: "SubLocationID",
								input: "true",
								label: AssetHomeLang.Location[Lang],
								type: "dropdown",
								options: subLocation,
								visible: "false",
							},
							{
								key: "AssetName",
								label: AssetHomeLang.AssetName[Lang],
								input: "false",
								visible: "true",
								width: 200,
							},
							{
								key: "AssetID",
								label: AssetHomeLang.AssetName[Lang],
								options: assetlist,
								type: "dropdown",
								input: "true",
								visible: "false",
								width: 100,
							},
							{
								key: "RiskDate",
								label: AssetHomeLang.RatingDate[Lang],
								type: "date",
								input: "true",
								visible: "true",
								width: 100,
							},

							{
								key: "RiskIndex",
								label: AssetHomeLang.ImportanceRating[Lang],
								type: "number",
								input: "false",
								visible: "true",
								width: 100,
							},
							{
								key: "NextRiskDate",
								label: AssetHomeLang.NextEvaluationDate[Lang],
								type: "date",
								input: "true",
								visible: "true",
								width: 120,
							},
							{
								key: "Remarks",
								label: AssetHomeLang.Notes[Lang],
								type: "text",
								input: "true",
								visible: "true",
								width: 200,
								required:"false",
							},
						]}
						StaticWidth={true}
						pk={"RiskID"}
						spTrx={"api_am_asset_risk_List"}
						spIns={"api_am_asset_risk_Ins"}
						spUpd={"api_am_asset_risk_Upd"}
						spDel={"api_am_asset_risk_Del"}
						TrxParam={[
							{ name: "LocationID", value: DepartmentID },
							// { name: "SubLocationID", value: SubLocationID },
							{ name: "CompanyID", value: company },
						]}
						DelParam={[{ rowData: true, name: "RiskID", value: "RiskID" }]}
						UpdBody={{ LocationID: DepartmentID }}
						InsBody={{ LocationID: DepartmentID, SubLocationID: SubLocationID }}
						TrxDependency={[ rerender]}
						routeTo={{
							path: "/RiskEvaluationDetails",
							hasParams: true,
							params: {
								LocationID: DepartmentID,
								SubLocationID: SubLocationID,
								//RiskID: "RiskID",
							},
						}}
					/>
				</View>
			</MainLayout>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	RiskEvaluationGrid: {
		marginTop: 16,
		marginBottom: 68,
	},
});

export default RiskEvaluation;
