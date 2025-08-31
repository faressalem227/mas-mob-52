import { StyleSheet, View, Dimensions, Text } from "react-native";
import { router, useLocalSearchParams, useRouter } from "expo-router";
// import { colors, roles } from "../../../constants";
import icons from "../../../constants";
import { useGlobalContext } from "../../../context/GlobalProvider";
import MainGrid from "../../../components/grid/MainGrid";
import { useDropDown } from "../../../hooks/useDropDownData";
import { MainLayout } from "../../../components";
import { useEffect, useState } from "react";
import MainDataLang from "../../../constants/Lang/Invintory/MainDataLang";
const Units = ({ title, hasLeftComponent = false, onDrawerPress }) => {
	const screenHeight = Dimensions.get("window").height;
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
	const { DepartmentID,Lang ,Rtl } = useGlobalContext();
	const { ItemID } = useLocalSearchParams();
	//console.log(ItemID,"mernaaaaaaaaaaaa")
	const { data: Unit, loading: unitLoader } = useDropDown(
		"api_Sc_Item_Unit_List",
		{ LocationID: DepartmentID },
		"UnitID",
		"UnitName"
	);
	const { data: UnitType, loading: unitTypeLoader } = useDropDown(
		"api_Sc_Item_UnitType_List",
		{ LocationID: DepartmentID },
		"value",
		"label"
	);
	return (
	<View style={styles.container}>
			<MainLayout title={MainDataLang.Units[Lang]}>
			<View className={`flex flex-col ${Rtl ? "rtl" : "ltr"} bg-[#F6F6F6] rounded-sm p-4 m-4`}>
			<View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
			<Text className="w-[122px] text-base font-tmedium">{MainDataLang.ItemCode[Lang]} </Text>
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
								key: "UnitID",
								label: MainDataLang.Unit[Lang],
								type: "dropdown",
								options: Unit,
								input: "true",
								visible: "false",
								width: 50,
							},
							{
								key: "UnitName",
								label: MainDataLang.Unit[Lang],
								input: "false",
								visible: "true",
								width: 50,
							},
							{
								key: "ConvertFactor",
								label: MainDataLang.ConversionFactor[Lang],
								type: "number",
								input: "true",
								visible: "true",
								width:100,
							},
							{
								key: "UnitTypeID",
								label:MainDataLang.UnitType[Lang],
								type: "dropdown",
								options: UnitType,
								input: "true",
								visible: "false",
							},
							{
								key: "UnitTypeName",
								label: MainDataLang.UnitType[Lang],
								input: "false",
								visible: "true",
							},
							{
								key: "Barcode",
								label: MainDataLang.Barcode[Lang],
								input: "true",
								visible: "true",
							},
						]}
						mixedWidth={true}
						pk={"UnitID"}
						spTrx={"api_Sc_Items_Units_Trx"}
						spIns={"api_Sc_Items_Units_Ins"}
						spUpd={"api_Sc_Items_Units_Upd"}
						spDel={"api_Sc_Items_Units_Del"}
						TrxParam={[{ name: "ItemID", value: ItemID }]}
						DelParam={[
							{ rowData: true, name: "ItemUnitID", value: "ItemUnitID" },
						]}
						UpdBody={{ ItemID: ItemID }}
						InsBody={{ ItemID: ItemID }}
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

export default Units;
