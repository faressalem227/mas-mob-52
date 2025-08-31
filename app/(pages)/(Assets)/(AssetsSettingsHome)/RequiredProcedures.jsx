import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import { MainLayout, MainButton } from "../../../../components";
import { useRouter, useLocalSearchParams } from "expo-router";
import MainGrid from "../../../../components/grid/MainGrid";
import { useGlobalContext } from "../../../../context/GlobalProvider";
import AssetHomeLang from "../../../../constants/Lang/AssetManagment/AssetHomeLang";
const RequiredProcedures = ({ route }) => {
	const {DepartmentID,Lang, company} = useGlobalContext()
	const router = useRouter();
	const screenHeight = Dimensions.get("window").height; // Get screen height dynamically
	return (
		<MainLayout
			title={AssetHomeLang.RequiredActions[Lang]}
			className="">
			<View className="bg-white h-[100vh] flex flex-col">
				<View style={[styles.assetsGrid, { height: screenHeight }]}>
					<MainGrid
						tableHead={[
							{
								key: "ActionRequiredID",
								label: AssetHomeLang.Code[Lang],
								input: "false",
								visible: "false",
							},

							{
								key: "ActionRequiredNo",
								label:  AssetHomeLang.Code[Lang],
								type: "number",
								input: "true",
								visible: "true",
								width: 80
							},
							{
								key: "ActionRequired",
								label:  AssetHomeLang.Procedure[Lang],
								input: "true",
								visible: "true",
							},
						]}
						mixedWidth
						pk={"ActionRequiredID"}
						spTrx={"api_am_Action_Required_List"}
						spIns={"api_am_Action_Required_Ins"}
						spUpd={"api_am_Action_Required_Upd"}
						spDel={"api_am_Action_Required_Del"}
						dynamicCode={
							{
							  tbName:'am_Action_Required',
							  codeCol:'ActionRequiredNo'
							}
						  }
						TrxParam={[{ name: "LocationID", value: DepartmentID }, { name: "CompanyID", value: company }]}
						DelParam={[{ rowData: true, name: "ActionRequiredID", value: "ActionRequiredID" }, { name: "LocationID", value: DepartmentID }]}
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

export default RequiredProcedures;
