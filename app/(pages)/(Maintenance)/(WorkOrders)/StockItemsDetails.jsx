import React, { useState, useEffect } from "react";
import { View, Text, Dimensions } from "react-native";
import { MainLayout } from "../../../../components";
import { useLocalSearchParams } from "expo-router";
import { CheckBox } from "../../../../components/index";
import StockItemsDetailsLang from "../../../../constants/Lang/Maintenance/WorkOrders/StockItemsDetailsLang";
import { useGlobalContext } from "../../../../context/GlobalProvider";

const StockItemsDetails = ({ route }) => {
  const { Lang , Rtl } = useGlobalContext();
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
    MaterialClassName,
    MaterialCode,
    MaterialName,
    Quantity,
    Unit,
    IssueDate,
    ItemName,
    IsRequired,
    ItemCode,
    AssetName,
    UnitName,
    GroupName,
    ...restParams
  } = useLocalSearchParams();


  const formatDate = (date) => {
	if (!date) return "N/A";
	const options = { year: "numeric", month: "short", day: "numeric" };
	return new Date(date).toLocaleDateString(undefined, options);
};

  const [windowWidth, setWindowWidth] = useState(Dimensions.get("window").width);
  const [width, setWidth] = useState();

  useEffect(() => {
    if (windowWidth < 800) {
      setWidth("w-48"); // Set width to 250 px
    } else {
      setWidth("w-[80%]"); // Set width to 80%
    }
  }, [windowWidth]);

  return (
    <MainLayout title={StockItemsDetailsLang.PageTitle[Lang]} className="">
      <View className="bg-white h-[100vh] flex flex-col ">
	  <View className={`flex flex-col ${Rtl ? "rtl" : "ltr"} bg-[#F6F6F6] rounded-sm p-4 m-4`}>
	  <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
	  <Text className="w-[122px] text-base font-tmedium">
              {StockItemsDetailsLang.WorkorderCode[Lang]}
            </Text>
            <Text className={`w-${width} text-basefont-tmedium`}>{WorkorderCode}</Text>
          </View>
		  <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
		  <Text className="w-[122px] text-base font-tmedium">
              {StockItemsDetailsLang.WorkorderName[Lang]}
            </Text>
            <Text className={`${width} text-basefont-tmedium`}>{WorkorderName}</Text>
          </View>
		  <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
		  <Text className="w-[122px] text-base font-tmedium">
              {StockItemsDetailsLang.WorkorderTypeName[Lang]}
            </Text>
            <Text className={`w-${width} text-basefont-tmedium`}>{WorkorderTypeName}</Text>
          </View>
		  <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
		  <Text className="w-[122px] text-base pt-1 font-tmedium">
              {StockItemsDetailsLang.WorkorderStatusName[Lang]}
            </Text>
            <Text className={`w-${width} text-basefont-tmedium`}>{WorkorderStatusName}</Text>
          </View>
        </View>
		<View className={`flex flex-col ${Rtl ? "rtl" : "ltr"} bg-[#F6F6F6] rounded-sm p-4 m-4`}>
		<View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
		<Text className="w-[122px] text-base font-tmedium">
              {StockItemsDetailsLang.GroupName[Lang]}
            </Text>
            <Text className={`w-${width} text-basefont-tmedium`}>{GroupName}</Text>
          </View>
		  <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
		  <Text className="w-[122px] text-base font-tmedium">
              {StockItemsDetailsLang.ItemCode[Lang]}
            </Text>
            <Text className={`w-${width} text-basefont-tmedium`}>{ItemCode}</Text>
          </View>
		  <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
		  <Text className="w-[122px] text-base font-tmedium">
              {StockItemsDetailsLang.ItemName[Lang]}
            </Text>
            <Text className={`w-${width} text-basefont-tmedium`}>{ItemName}</Text>
          </View>
		  <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
		  <Text className="w-[122px] text-base font-tmedium">
              {StockItemsDetailsLang.Quantity[Lang]}
            </Text>
            <Text className={`w-${width} text-basefont-tmedium`}>{Quantity}</Text>
          </View>
		  <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
		  <Text className="w-[122px] text-base font-tmedium">
              {StockItemsDetailsLang.UnitName[Lang]}
            </Text>
            <Text className={`w-${width} text-basefont-tmedium`}>{UnitName}</Text>
          </View>
		  <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
		  <Text className="w-[122px] text-base font-tmedium">
              {StockItemsDetailsLang.IssueDate[Lang]}
            </Text>
            <Text className={`w-${width} text-basefont-tmedium`}>{IssueDate?.split("T")[0]}</Text>
          </View>
		  <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
		  <Text className="w-[122px] text-base font-tmedium">
              {StockItemsDetailsLang.IsRequired[Lang]}
            </Text>
            <CheckBox value={IsRequired} />
          </View>
		  <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
		  <Text className="w-[122px] text-base font-tmedium">
              {StockItemsDetailsLang.AssetName[Lang]}
            </Text>
            <Text className={`w-${width} text-basefont-tmedium`}>{AssetName}</Text>
          </View>
        </View>
      </View>
    </MainLayout>
  );
};

export default StockItemsDetails;