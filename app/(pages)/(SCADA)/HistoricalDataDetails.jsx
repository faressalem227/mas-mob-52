import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import { MainLayout } from "../../../components";
import { useLocalSearchParams } from "expo-router";
import SCADALang from "../../../constants/Lang/SCADA/SCADALang";
import { useGlobalContext } from "../../../context/GlobalProvider";
import InfoDetailes from "../../../components/UI/InfoDetailes";
const HistoricalDataDetails = ({ route }) => {
  const {
    SubLocationName,
    AssetCode,
    AssetName,
    TagName,
    TagValue,
    RealTime,
    Address,
    PhoneNumber,
    FaxNumber,
    email,
  } = useLocalSearchParams();
  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get("window").width
  );
  const [width, setWidth] = useState();
  const {Lang,Rtl}=useGlobalContext();
  useEffect(() => {
    if (windowWidth < 800) {
      setWidth("w-48"); // Set width to 250 px
    } else {
      setWidth("w-[80%]"); // Set width to 80%
    }
  }, [windowWidth]);
  const detailsData = [
		{ label:SCADALang.Subsite[Lang], value: SubLocationName },
    { label:SCADALang.AssetCode[Lang], value: AssetCode },
    { label:SCADALang.AssetName[Lang], value: AssetName },
    { label:SCADALang.TageName[Lang], value: TagName },
    { label:SCADALang.TageValue[Lang], value:TagValue },
    { label:SCADALang.MaximumActualTime[Lang], value: RealTime.split("T")[0] },
	];
  console.log("windowWidth", windowWidth);
  console.log("computed width", width);
  return (
    <MainLayout title={SCADALang.Detailes[Lang]} className="">
      <View className="bg-white h-[100vh] flex flex-col ">
      <InfoDetailes
					details={detailsData}
					valueWidthClass="w-[60%]"
				/>
      </View>
    </MainLayout>
  );
};

export default HistoricalDataDetails;
