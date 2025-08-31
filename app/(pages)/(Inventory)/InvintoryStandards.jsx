import { StyleSheet, View, Dimensions, Text } from "react-native";
import { router, useLocalSearchParams, useRouter } from "expo-router";
// import { colors, roles } from "../../../constants";
import icons from "../../../constants";
import { useGlobalContext } from "../../../context/GlobalProvider";
import MainGrid from "../../../components/grid/MainGrid";
import { MainLayout } from "../../../components";
import { useDropDown } from "../../../hooks/useDropDownData";
import { Dropdown } from "../../../components";
import { useEffect, useState } from "react";
import MainDataLang from "../../../constants/Lang/Invintory/MainDataLang";
const UnitTypeDefinition = ({
	title,
	hasLeftComponent = false,
	onDrawerPress,
}) => {
	const screenHeight = Dimensions.get("window").height;
	const { ItemID, departmentData } = useLocalSearchParams();
	const row = useLocalSearchParams();
	const router = useRouter();
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
	const { DepartmentID,Lang, company , Rtl} = useGlobalContext();
	const { data: GeoSt, loading: GeoLaoder } = useDropDown(
		"api_admin_department_trx",
		{LocationID: DepartmentID},
		"DepartmentID",
		"DepartmentNameAr"
	);
	return (
	<View style={styles.container}>
			<MainLayout title={MainDataLang.WarehouseStandards[Lang]}>
			<View className={`flex flex-col ${Rtl ? "rtl" : "ltr"} bg-[#F6F6F6] rounded-sm p-4 m-4`}>
			<View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
			<Text className="w-[122px] text-base font-tmedium">{MainDataLang.ItemCode[Lang]}</Text>
						<Text className={`${width} text-basefont-tmedium`}>
							{row.ItemCode}
						</Text>
					</View>
					<View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
						<Text className="w-[122px] text-base font-tmedium">{MainDataLang.ItemName[Lang]}</Text>
						<Text className={`${width} text-basefont-tmedium`}>
							{row.ItemName}
						</Text>
					</View>
					<View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
						<Text className="w-[122px] text-base font-tmedium">{MainDataLang.Unit[Lang]}</Text>
						<Text className={`${width} text-basefont-tmedium text-left`}>
							{row.UnitName}
						</Text>
					</View>
				</View>
				<View style={[styles.assetsGrid, { height: screenHeight - 155 }]}>
					<MainGrid
						const
						tableHead={[
							{
								key: "DepartmentID",
								label: "كود ",
								type: "number",
								input: "false",
								visible: "false",
								width: 80,
							},
							{
								key: "DepartmentID",
								label:MainDataLang.Store[Lang],
								type: "dropdown",
								options: GeoSt,
								input: "true",
								visible: "false",
								width: 90,
							},
							{
								key: "DepartmentNameEn",
								label:MainDataLang.Store[Lang],
								input: "false",
								visible: "true",
								width: 90,
							},
							{
								key: "MinQty",
								label:MainDataLang.Min[Lang],
								input: "true",
								visible: "true",
								type: "number",
								width: 100,
							},
							{
								key: "MaxQty",
								label: MainDataLang.Max[Lang],
								input: "true",
								type: "number",

								visible: "true",
								width: 100,
							},
							{
								key: "OrderQty",
								label: MainDataLang.OrderLimit[Lang],
								type: "number",

								input: "true",
								visible: "true",
								width: 100,
							},
							{
								key: "CriticalQty",
								label: MainDataLang.Recession[Lang],
								input: "true",
								visible: "true",
								type: "number",

								width: 100,
							},
						]}
						StaticWidth={true}
						pk={"ItemDepartmentID"}
						spTrx={"api_Sc_Items_Stores_Trx"}
						spIns={"api_Sc_Items_Stores_Ins"}
						spUpd={"api_Sc_Items_Stores_Upd"}
						spDel={"api_Sc_Items_Stores_Del"}
						TrxParam={[
							{ name: "OrgID", value:company },
							{ name: "ItemID", value: ItemID },
						]}
						DelParam={[
							{
								rowData: true,
								name: "ItemDepartmentID",
								value: "ItemDepartmentID",
							},
						]}
						UpdBody={{ ItemID: ItemID, OrgID: company }}
						InsBody={{ ItemID: ItemID, OrgID: company }}
						TrxDependency={[]}
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
	dropdownContainer: {
		marginHorizontal: 16,
		marginVertical: 24,
	},
	assetsGrid: {
		marginVertical: 8,
	},
});

export default UnitTypeDefinition;
