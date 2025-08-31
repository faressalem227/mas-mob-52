import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import { MainLayout, MainButton, Dropdown } from "../../../../components";
import { useRouter, useLocalSearchParams } from "expo-router";
import MainGrid from "../../../../components/grid/MainGrid";
import { useGlobalContext } from "../../../../context/GlobalProvider";
import { useDropDown } from "../../../../hooks/useDropDownData";
import AssetHomeLang from "../../../../constants/Lang/AssetManagment/AssetHomeLang";
const DataSettings = ({ route }) => {
	const { DepartmentID, SystemID,Lang, company} = useGlobalContext();
	const router = useRouter();
	const screenHeight = Dimensions.get("window").height; // Get screen height dynamically
	const [AdditionTable, setAdditionTable] = useState();
	const { data: AdditionTableList, loading: AdditionTableLoader } = useDropDown(
		"api_sys_addition_tables_list",
		{ SystemID: 20 },
		"TableID",
		"TableNameAr"
	);
	const { data: DataTypeList, loading: DataTypeLoader } = useDropDown(
		"api_sys_datatypes_list",
		{ SystemID: SystemID },
		"DataTypeID",
		"DataTypeName"
	);
	console.log("SystemID", SystemID);
	return (
		<MainLayout
			title={AssetHomeLang.DataSettings[Lang]}
			className="">
			<View className="bg-white flex-1 flex flex-col">
				<View style={[styles.assetsGrid, { height: screenHeight }]}>
					<View className="mx-4 mb-4">
						<Dropdown
							label={AssetHomeLang.Group[Lang]}
							data={AdditionTableList}
							defaultOption={AdditionTableList[0]}
							initailOption={AdditionTableList[0]}
							value={AdditionTable}
							onChange={(e) => setAdditionTable(e)}
						/>
					</View>
					<MainGrid
						tableHead={[
							{
								key: "AdditionID",
								label: AssetHomeLang.Code[Lang],
								input: "false",
								visible: "false",
							},

							{
								key: "AdditionNo",
								label: AssetHomeLang.Code[Lang],
								type: "number",
								input: "true",
								visible: "true",
								width: 80,
							},
							{
								key: "AdditionName",
								label: AssetHomeLang.AdditionalStatement[Lang],
								input: "true",
								visible: "true",
							},
							{
								key: "DataTypeID",
								label: AssetHomeLang.DataType[Lang],
								type: "dropdown",
								options: DataTypeList,
								input: "true",
								visible: "false",
							},
							{
								key: "DataTypeName",
								label: AssetHomeLang.DataType[Lang],
								type: "dropdown",
								input: "false",
								visible: "true",
							},
						]}
						mixedWidth
						pk={"AdditionID"}
						spTrx={"api_sys_addition__Trx"}
						spIns={"api_sys_addition__Ins"}
						spUpd={"api_sys_addition__Upd"}
						spDel={"api_sys_addition__Del"}
						dynamicCode={{
							tbName: "sys_addition",
							codeCol: "AdditionNo",
						}}
						TrxParam={[
							{ name: "LocationID", value: DepartmentID },
							{ name: "TableID", value: AdditionTable },
							{ name:"CompnayID", value:company}
						]}
						DelParam={[
							{ rowData: true, name: "AdditionID", value: "AdditionID" },
							{ name: "LocationID", value: DepartmentID },
						]}
						UpdBody={{ LocationID: DepartmentID }}
						InsBody={{ LocationID: DepartmentID, TableID: AdditionTable }}
						TrxDependency={[AdditionTable]}
						highlight={{
							col: "DataTypeID",
							bgcolor: "#9be19b",
							value: 6,
						}}
						routeTo={{
							path: "/DataSettingsDetails",
							hasParams: true,
							params: {},
							hasSpecialVal: true,
							specialVal: { col: "DataTypeID", value: 6 },
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

export default DataSettings;
