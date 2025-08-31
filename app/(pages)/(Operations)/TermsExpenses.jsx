import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import { MainLayout, MainButton } from "../../../components";
import { useRouter, useLocalSearchParams } from "expo-router";
import MainGrid from "../../../components/grid/MainGrid";
import OperatingSystemLang from "../../../constants/Lang/OperatingSystem/OperatingSystemLang";
import {
	HandleDropdownFormat,
	useDropDown,
} from "../../../hooks/useDropDownData";
import { useGlobalContext } from "../../../context/GlobalProvider";

const TermsDefinition = ({ route }) => {
	const { DepartmentID,Lang} = useGlobalContext();
	const router = useRouter();
	const [windowWidth, setWindowWidth] = useState(
		Dimensions.get("window").width
	);
	const [width, setWidth] = useState();
	const screenHeight = Dimensions.get("window").height; // Get screen height dynamically

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
			title={OperatingSystemLang.ExpenseItems[Lang]}
			className="">
			<View className="bg-white h-[100vh] flex flex-col">
				<View style={[styles.assetsGrid, { height: screenHeight }]}>
					<MainGrid
						tableHead={[
							{
								key: "ItemID",
								label: OperatingSystemLang.Code[Lang],
								input: "false",
								visible: "false",
								width: 80,
							},

							{
								key: "ItemCode",
								label: OperatingSystemLang.Code[Lang],
								type: "number",
								input: "true",
								visible: "true",
								width: 80,
							},
							{
								key: "ItemName",
								label: OperatingSystemLang.Item[Lang],
								input: "true",
								visible: "true",
								width: 100,
							},
							{
								key: "IsSystem",
								label: OperatingSystemLang.Automatic[Lang],
								input: "true",
								type: "checkbox",
								visible: "true",
								required:"false",
								width: 120,
							},
						]}
						dynamicCode={{
							tbName: "ex_Items",
							codeCol: "ItemCode",
						}}
						pk={"ItemID"}
						spTrx={"api_ex_Items_Trx"}
						spIns={"api_ex_Items_Ins"}
						spUpd={"api_ex_Items_Upd"}
						spDel={"api_ex_Items_Del"}
						TrxParam={[{ name: "LocationID", value: DepartmentID }]}
						DelParam={[
							{ rowData: true, name: "ItemID", value: "ItemID" },
							{ name: "LocationID", value: DepartmentID },
						]}
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

export default TermsDefinition;
