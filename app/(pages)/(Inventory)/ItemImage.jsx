import { StyleSheet, View, Dimensions, Text } from "react-native";
import { router, useLocalSearchParams, useRouter } from "expo-router";
// import { colors, roles } from "../../../constants";
import icons from "../../../constants";
import { useGlobalContext } from "../../../context/GlobalProvider";
import ImageGrid from "../../../components/grid/ImageGrid";
import { MainLayout } from "../../../components";
import { useDropDown } from "../../../hooks/useDropDownData";
import { useEffect, useState } from "react";
import MainDataLang from "../../../constants/Lang/Invintory/MainDataLang";
const ItemImage = ({ title, hasLeftComponent = false, onDrawerPress }) => {
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
	const { DepartmentID,Lang,Rtl} = useGlobalContext();
	const { ItemID } = useLocalSearchParams();
	const { data: ImageSize, loading: ImageSizeLoader } = useDropDown(
		"api_Sc_Item_Image_Size_list",
		{ ItemID: ItemID },
		"ImageSizeID",
		"ImageSizeName"
	);

	return (
	<View style={styles.container}>
			<MainLayout title={MainDataLang.ItemImage[Lang]}>
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
					<ImageGrid
						const
						tableHead={[
							{
								key: "ImageID",
								label:MainDataLang.Code[Lang],
								type: "number",
								input: "true",
								visible: "false",
								width: 50,
							},
							{
								key: "ImageSizeID",
								label:MainDataLang.ImageSize[Lang],
								type: "dropdown",
								options: ImageSize,
								input: "true",
								visible: "true",
							},
							{},
							{
								key: "ImageSrc",
								label: MainDataLang.Image[Lang],
								type: "image",
								input: "true",
								visible: "true",
							},
						]}
						mixedWidth={true}
						pk={"ImageID"}
						spTrx={"api_Sc_Item_Image_trx"}
						spIns={"api_Sc_item_image_Ins"}
						spUpd={"api_Sc_item_image_Upd"}
						spDel={"api_Sc_item_image_Del"}
						TrxParam={[{ name: "ItemID", value: ItemID }]}
						DelParam={[{ rowData: true, name: "ImageID", value: "ImageID" }]}
						UpdBody={{ ItemID: ItemID }}
						InsBody={{ ItemID: ItemID }}
						InsRoute={"/store"}
						TrxDependency={[]}
						// routeTo={
						//     {
						//       path:'/EmployeesDetailes',
						//       hasParams:true,
						//       params:{
						//         LocationID: DepartmentID,
						//       }
						//     }
						//   }
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

export default ItemImage;
