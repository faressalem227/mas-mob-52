import { StyleSheet, View, Dimensions, Text } from "react-native";
import { router, useLocalSearchParams, useRouter } from "expo-router";
// import { colors, roles } from "../../../constants";
import icons from "../../../constants";
import { useGlobalContext } from "../../../context/GlobalProvider";
import MainGrid from "../../../components/grid/MainGrid";
import { MainLayout } from "../../../components";
import { useDropDown } from "../../../hooks/useDropDownData";
import { useEffect, useState } from "react";
import MainDataLang from "../../../constants/Lang/Invintory/MainDataLang";
const Prices = ({ title, hasLeftComponent = false, onDrawerPress }) => {
	const screenHeight = Dimensions.get("window").height;
	const { ItemID } = useLocalSearchParams();
	console.log(ItemID, "mmmmmmmm");
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
		const { DepartmentID,Lang , Rtl} = useGlobalContext()
	const { data: Price, loading: PriceLoader } = useDropDown(
		"api_Sc_Item_Unit_List",
		{ DepartmentID:DepartmentID },
		"UnitID",
		"UnitName"
	);
	return (
	<View style={styles.container}>
			<MainLayout title={MainDataLang.Prices[Lang]}>
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
				<View style={[styles.assetsGrid, { height: screenHeight -155 }]}>
					<MainGrid
						const
						tableHead={[
							{
								key: "ItemPriceID",
								label: "الكود ",
								type: "number",
								input: "false",
								visible: "false",
							},
							{
								key: "PriceDate",
								label: MainDataLang.Date[Lang],
								type: "date",
								input: "true",
								visible: "true",
							},
							{
								key: "UnitID",
								label: MainDataLang.Unit[Lang],
								type: "dropdown",
								options: Price,
								input: "true",
								visible: "false",
							},
							{
								key: "UnitName",
								label: MainDataLang.Unit[Lang],
								input: "false",
								visible: "true",
							},
							{
								key: "Price",
								label: MainDataLang.Price[Lang],
								type: "number",
								input: "true",
								visible: "true",
							},
						]}
						mixedWidth={true}
						pk={"ItemPriceID"}
						spTrx={"api_Sc_Items_Prices_Trx"}
						spIns={"api_Sc_items_Prices_Ins"}
						spUpd={"api_Sc_items_Prices_Upd"}
						spDel={"api_Sc_items_Prices_Del"}
						TrxParam={[{ name: "ItemID", value: ItemID }]}
						DelParam={[
							{ rowData: true, name: "ItemPriceID", value: "ItemPriceID" },
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

export default Prices;
