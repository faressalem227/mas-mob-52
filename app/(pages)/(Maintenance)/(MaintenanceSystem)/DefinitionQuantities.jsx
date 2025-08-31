import React, { useState, useCallback, useEffect } from "react";
import { View, Dimensions, Text, StyleSheet } from "react-native";
import { useGlobalContext } from "../../../../context/GlobalProvider";
import MainLayout from "../../../../components/layout/MainLayout";
import { useLocalSearchParams } from "expo-router";
import MainGrid from "../../../../components/grid/MainGrid";
import { Dropdown } from "../../../../components";
import { useDropDown } from "../../../../hooks/useDropDownData";
import DefinitionQuantitiesLang from "../../../../constants/Lang/Maintenance/MaintenanceSystem/DefinitionQuantities";
const DefinitionQuantities = () => {
	const { user, DepartmentID ,Lang ,company} = useGlobalContext();
	const screenHeight = Dimensions.get("window").height; // Get screen height dynamically
	const [storesData, setStoresData] = useState([]);
	const [TradeValue, setTradeValue] = useState(null);

	const { data: TradeList, loading: TradeListLoader } = useDropDown(
		"api_ms_Trade_List",
		{ LocationID: DepartmentID },
		"value",
		"label"
	);

	return (
		<MainLayout title={DefinitionQuantitiesLang.pageTitle[Lang]}>
			<View className="mx-2 my-4">
				<Dropdown
					placeholder={DefinitionQuantitiesLang.TradeClassification[Lang]}
					title={DefinitionQuantitiesLang.TradeClassification[Lang]}
					data={TradeList}
					value={TradeValue}
					initailOption={TradeList[0]?.key}
					onChange={(v) => setTradeValue(v)}
				/>
			</View>
			<View className="bg-white py-4 h-[100vh] flex flex-col">
				<View
					style={[styles.DefinitionQuantitiesGrid, { height: screenHeight }]}>
					<MainGrid
						tableHead={[
							{
								key: "TaskID",
								label: `${DefinitionQuantitiesLang.TaskCode[Lang]}`,
								type: "number",
								input: "false",
								visible: "false ",
							},
							{
								key: "TaskCode",
								label: `${DefinitionQuantitiesLang.TaskCode[Lang]}`,
								type: "number",
								input: "true",
								visible: "true",
								width: 120,
							},
							{
								key: "TaskName",
								label: `${DefinitionQuantitiesLang.TaskName[Lang]}`,
								type: "",
								input: "true",
								visible: "true",
							},
							{
								key: "Unit",
								label: `${DefinitionQuantitiesLang.Unit[Lang]}`,
								type: "",
								input: "true",
								visible: "true",
							},
							{
								key: "Quantity",
								label: `${DefinitionQuantitiesLang.Quantity[Lang]}`,
								type: "number",
								input: "true",
								visible: "true",
							},
							{
								key: "Price",
								label: `${DefinitionQuantitiesLang.Price[Lang]}`,
								type: "number",
								input: "true",
								visible: "true",
							},
						]}
						pk={"TaskID"}
						spTrx={"api_def_WOTask_Trx"}
						spIns={"api_def_WOTask_Ins"}
						spUpd={"api_def_WOTask_Upd"}
						spDel={"api_def_WOTask_Del"}
						dynamicCode={{
							tbName: "def_Quantitytbl",
							codeCol: "TaskCode",
						}}
						TrxParam={[
							{ name: "TradeID", value: TradeValue },
							{ name: "LocationID", value: DepartmentID },
							{ name: "CompanyID", value: company },
						]}
						DelParam={[
							{ rowData: true, name: "TaskID", value: "TaskID" },
							{ name: "LocationID", value: DepartmentID },
						]}
						UpdBody={{ LocationID: DepartmentID }}
						InsBody={{ LocationID: DepartmentID, TradeID: TradeValue ,CompanyID:company }}
						TrxDependency={[TradeValue]}
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
	DefinitionQuantitiesGrid: {
		marginVertical: 8,
	},
});

export default DefinitionQuantities;
