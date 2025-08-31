import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import { MainLayout, MainButton } from "../../../../components";
import { useRouter, useLocalSearchParams } from "expo-router";
import MainGrid from "../../../../components/grid/MainGrid";
import { useGlobalContext } from "../../../../context/GlobalProvider";
import AssetHomeLang from "../../../../constants/Lang/AssetManagment/AssetHomeLang";
const OperationStatus = ({ route }) => {
	const {DepartmentID,Lang, company} = useGlobalContext();
	const router = useRouter();
	const screenHeight = Dimensions.get("window").height; // Get screen height dynamically

	return (
		<MainLayout
			title={AssetHomeLang.OperatingCondition[Lang]}
			className="">
			<View className="bg-white h-[100vh] flex flex-col">
				<View style={[styles.assetsGrid, { height: screenHeight }]}>
					<MainGrid
						tableHead={[
							{
								key: "StatusID",
								label:AssetHomeLang.Code[Lang],
								input: "false",
								visible: "false",
							},

							{
								key: "StatusCode",
								label:  AssetHomeLang.Code[Lang],
								type: "number",
								input: "true",
								visible: "true",
								width: 80
							},
							{
								key: "StatusName",
								label:  AssetHomeLang.OperatingCondition[Lang],
								type: "",
								input: "true",
								visible: "true",
							},
						]}
						pk={"StatusID"}
						spTrx={"api_am_Status_List"}
						spIns={"api_am_Status_Ins"}
						spUpd={"api_am_Status_Upd"}
						spDel={"api_am_Status_Del"}
						mixedWidth
						dynamicCode={
							{
							  tbName:'am_Status',
							  codeCol:'StatusCode'
							}
						  }
						TrxParam={[{ name: "LocationID", value: DepartmentID }]}
						DelParam={[{ rowData: true, name: "StatusID", value: "StatusID" }, { name: "LocationID", value: DepartmentID }, {name:"CompanyID", value:company}]}
						UpdBody={{ LocationID: DepartmentID }}
						InsBody={{ LocationID: DepartmentID }}
						TrxDependency={[]}
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

export default OperationStatus;
