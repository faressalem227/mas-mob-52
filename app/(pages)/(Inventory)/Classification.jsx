import { StyleSheet, View, TouchableOpacity, Dimensions } from "react-native";
import { useGlobalContext } from "../../../context/GlobalProvider";
import { MainButton, WelcomeCard, Dropdown } from "../../../components";
import MainGrid from "../../../components/grid/MainGrid";
import React, { useState, useCallback, useEffect } from "react";
import { MainLayout } from "../../../components";
import api from "../../../utilities/api";
import InvintorySystemSettingLang from "../../../constants/Lang/Invintory/InvintorySystemSettingLang";
import { HandleDropdownFormat } from "../../../hooks/useDropDownData";
const Classification = ({ title, hasLeftComponent = false, onDrawerPress }) => {
	const screenHeight = Dimensions.get("window").height;
	const { DepartmentID,Lang,company,user } = useGlobalContext();
	const [storesData, setStoresData] = useState([]);
	const [loadimg, setLoading] = useState(false);
	const [SectionID, setSectionID] = useState(null);
	const [storeValue, setStoreValue] = useState(null);
	//console.log(DepartmentID)

	const fetchDropdownData = useCallback(async () => {
		try {
			setLoading(true);
			const response = await api.get(
				`/table?sp=api_Sc_Item_Section_List&CompanyID=${company}&LangID=${Lang}`
			);
			//console.log("API Response:", response.data); // Log the entire response for inspection

			// Assuming response.data.data contains the array of sub-locations
			const subLocationList = response.data.data || [];

			if (Array.isArray(subLocationList)) {
				const list = HandleDropdownFormat(
					subLocationList,
					"SectionID",
					"SectionName"
				);
				//console.log("5555", list);
				setStoresData(list);
			} else {
				console.error(
					"Expected subLocationList to be an array, but got:",
					subLocationList
				);
			}
		} catch (err) {
			console.error("Error fetching dropdown data:", err);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchDropdownData();
	}, [fetchDropdownData]);
	return (
	<View style={styles.container}>
			<MainLayout title={InvintorySystemSettingLang.ItemsClassifications[Lang]}>
				<View className="mx-2 my-4">
					<Dropdown
						placeholder={InvintorySystemSettingLang.Select[Lang]}
						title={InvintorySystemSettingLang.QualitativeStore[Lang]}
						data={storesData}
						value={storeValue}
						initailOption={storesData[0]?.key}
						onChange={(v) => setStoreValue(v)}
					/>
				</View>
				<View className="h-[100vh] my-4">
					<View style={[styles.assetsGrid, { height: screenHeight-50 }]}>
						<MainGrid
							const
							tableHead={[
								{
									key: "GroupID",
									label: InvintorySystemSettingLang.ItemCode[Lang],
									type: "number",
									input: "false",
									visible: "false",
									width: 120,
								},
								{
									key: "GroupCode",
									label: InvintorySystemSettingLang.ItemCode[Lang],
									type: "number",
									input: "true",
									visible: "true",
									width: 150,
								},
								{
									key: "GroupName",
									label: InvintorySystemSettingLang.ItemName[Lang],
									input: "true",
									visible: "true",
									width: 150,
								},
								{
									key: "GroupNameEn",
									label: "اسم التصنيف بالانجليزي",
									input: "true",
									visible: "true",
									width: 150,
								},
							]}
							dynamicCode={{
								tbName: "Sc_Item_Group",
								codeCol: "GroupCode",
							}}
							mixedWidth={true}
							pk={"GroupID"}
							spTrx={"api_Sc_Item_Group_Trx"}
							spIns={"api_Sc_Item_Group_Ins"}
							spUpd={"api_Sc_Item_Group_Upd"}
							spDel={"api_Sc_Item_Group_Del"}
							TrxParam={[
								{ name: "LangID", value: Lang },
								{ name: "UserName", value: user },
								{ name: "CompanyID", value: company },
								{ name: "SectionID", value: storeValue },
							]}
							DelParam={[
								{ name: "CompanyID", value: company },
								{ rowData: true, name: "GroupID", value: "GroupID" },
							]}
							UpdBody={{ CompanyID: company }}
							InsBody={{ CompanyID: company, SectionID: storeValue }}
							TrxDependency={[storeValue]}
							routeTo={{
							path: "/ClassificationDetails",
							hasParams: true,
						}}
						/>
					</View>
				</View>
			</MainLayout>
		</View>
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
		marginVertical: 8,
	},
});

export default Classification;
