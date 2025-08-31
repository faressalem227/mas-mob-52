import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import { MainLayout, MainButton } from "../../../components";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";
import SmallButton from "../../../components/UI/SmallButton";
import { useGlobalContext } from "../../../context/GlobalProvider";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import InfoDetailes from "../../../components/UI/InfoDetailes";
import MainDataLang from "../../../constants/Lang/Invintory/MainDataLang";
const StockItemsDetailes = ({ route }) => {
	const {
		TradeID,
		LocationID,
		WorkorderID,
		FailureDescription,
		WorkorderCode,
		WorkorderName,
		WorkorderTypeID,
		WorkorderTypeName,
		WorkorderStatusName,
		...restParams
	} = useLocalSearchParams();
	const row = useLocalSearchParams();
	const { Lang, Rtl } = useGlobalContext();
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
	const detailsData = [
		{ label: MainDataLang.ItemCode[Lang], value: row.ItemCode },
		{ label: MainDataLang.ItemName[Lang], value: row.ItemName },
		{ label: MainDataLang.Unit[Lang], value: row.UnitName },
	];
	//console.log("windowWidth", windowWidth);
	//console.log("computed width", width);

	return (
		<MainLayout title={MainDataLang.ItemDetailes[Lang]}>
			<View className="bg-white h-[100vh] flex flex-col">
				<InfoDetailes
					details={detailsData}
					valueWidthClass="w-[60%]"
				/>
				<ScrollView className="flex flex-col py-[16px] mb-14">
					<View className="flex flex-row-reverse flex-wrap  justify-center items-center "
						style={{ gap: hp("1.5%") }}>
						<SmallButton
							title={MainDataLang.WarehouseStandards[Lang]}
							handlePress={() => {
								router.navigate({
									pathname: "InvintoryStandards",
									params: {
										...row,
									},
								});
							}}
						/>
						<SmallButton
							title={MainDataLang.Units[Lang]}
							handlePress={() => {
								router.navigate({
									pathname: "Units",
									params: {
										...row,
									},
								});
							}}
						/>
						{WorkorderTypeName == "Corrective Maintenance" ? (
							<SmallButton
								title={MainDataLang.WarehouseStandards[Lang]}
								handlePress={() => {
									router.navigate({
										pathname: "InvintoryStandards",
										params: {
											...row,
										},
									});
								}}
							/>
						) : (
							<SmallButton
								title={MainDataLang.Prices[Lang]}
								handlePress={() => {
									router.navigate({
										pathname: "Prices",
										params: {
											...row,
										},
									});
								}}
							/>
						)}
						<SmallButton
							title={MainDataLang.Collection[Lang]}
							handlePress={() => {
								router.navigate({
									pathname: "Assembly",
									params: {
										...row,
									},
								});
							}}
						/>
						<SmallButton
							title={MainDataLang.ImagesScreen[Lang]}
							handlePress={() => {
								router.navigate({
									pathname: "ItemImage",
									params: {
										...row,
									},
								});
							}}
						/>
						<SmallButton
							title={MainDataLang.TechnicalSpecifications[Lang]}
							handlePress={() => {
								router.navigate({
									pathname: "TechnicalSpecifications",
									params: {
										...row,
									},
								});
							}}
						/>
					</View>
				</ScrollView>
			</View>
		</MainLayout>
	);
};

export default StockItemsDetailes;
