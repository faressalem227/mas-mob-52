import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { MainLayout } from "../../../../components";
import { useLocalSearchParams } from "expo-router";
import { CheckBox } from "../../../../components/index";
import ServicesDetailsLang from "../../../../constants/Lang/Maintenance/WorkOrders/ServicesDetailsLang";
import { useGlobalContext } from "../../../../context/GlobalProvider";
import InfoDetailes from "../../../../components/UI/InfoDetailes";
const ServicesDetails = () => {
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
    IsRequired,
    AssetName,
    ...restParams
  } = useLocalSearchParams();

  const { Lang ,Rtl} = useGlobalContext(); // Get the current language from global context
  const [windowWidth, setWindowWidth] = useState(Dimensions.get("window").width);
  const [width, setWidth] = useState();

  useEffect(() => {
    if (windowWidth < 800) {
      setWidth("w-48"); // Set width to 250 px
    } else {
      setWidth("w-[80%]"); // Set width to 80%
    }
  }, [windowWidth]);
    const dataDetailes1=[
      { label:EmploymentDetailsLang.WorkOrderDetails.WorkOrderCode[Lang], value: WorkorderCode },
      { label:EmploymentDetailsLang.WorkOrderDetails.WorkOrderDescription[Lang], value: WorkorderName },
      { label:EmploymentDetailsLang.WorkOrderDetails.WorkOrderType[Lang], value: WorkorderTypeName },
      { label:EmploymentDetailsLang.WorkOrderDetails.WorkOrderStatus[Lang], value: WorkorderStatusName },
    ]
    const detailsData = [
      { label:EmploymentDetailsLang.EmploymentDetails.EmployeeName[Lang], value: EmployeeName },
      { label:EmploymentDetailsLang.EmploymentDetails.HourRate[Lang], value: HourRate },
      { label:EmploymentDetailsLang.EmploymentDetails.OverTime1[Lang], value: OverTime1 },
      { label:EmploymentDetailsLang.EmploymentDetails.OverTime2[Lang], value: OverTime2 },
      { label:EmploymentDetailsLang.EmploymentDetails.StartDate[Lang], value: StartDate?.split("T")[0] },
      { label:EmploymentDetailsLang.EmploymentDetails.EndDate[Lang], value: EndDate?.split("T")[0] },
      { label:EmploymentDetailsLang.EmploymentDetails.TotalHours[Lang], value: TotalHours },
      { label:EmploymentDetailsLang.EmploymentDetails.TotalCost[Lang], value: TotalCost },
      { label:EmploymentDetailsLang.EmploymentDetails.AssetName[Lang], value: AssetName },
    ];
  return (
    <MainLayout title={ServicesDetailsLang.PageTitle[Lang]} className="">
      <View className="bg-white h-[100vh] flex flex-col">
      {/* <InfoDetailes
					details={dataDetailes1}
					valueWidthClass="w-[60%]"
				/> */}
	  <View className={`flex flex-col ${Rtl ? "rtl" : "ltr"} bg-[#F6F6F6] rounded-sm p-4 m-4`}>
	  <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
	  <Text className="w-[122px] text-base font-tmedium">
              {ServicesDetailsLang.WorkOrderDetails.WorkOrderCode[Lang]}
            </Text>
            <Text className={`${width} text-base font-tmedium`}>
              {WorkorderCode}
            </Text>
          </View>
		  <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
		  <Text className="w-[122px] text-base font-tmedium">
              {ServicesDetailsLang.WorkOrderDetails.WorkOrderDescription[Lang]}
            </Text>
            <Text className={`${width} text-base font-tmedium`}>
              {WorkorderName}
            </Text>
          </View>
		  <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
		  <Text className="w-[122px] text-base font-tmedium">
              {ServicesDetailsLang.WorkOrderDetails.WorkOrderType[Lang]}
            </Text>
            <Text className={`${width} text-base font-tmedium`}>
              {WorkorderTypeName}
            </Text>
          </View>
		  <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
		  <Text className="w-[122px] text-base pt-1 font-tmedium">
              {ServicesDetailsLang.WorkOrderDetails.WorkOrderStatus[Lang]}
            </Text>
            <Text className={`${width} text-base font-tmedium`}>
              {WorkorderStatusName}
            </Text>
          </View>
        </View>
		<View className={`flex flex-col ${Rtl ? "rtl" : "ltr"} bg-[#F6F6F6] rounded-sm p-4 m-4`}>
		<View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
		<Text className="w-[122px] text-base font-tmedium">
              {ServicesDetailsLang.ServiceDetails.MaterialClass[Lang]}
            </Text>
            <Text className={`${width} text-base font-tmedium`}>
              {MaterialClassName}
            </Text>
          </View>
		  <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
		  <Text className="w-[122px] text-base font-tmedium">
              {ServicesDetailsLang.ServiceDetails.MaterialCode[Lang]}
            </Text>
            <Text className={`${width} text-base font-tmedium`}>
              {MaterialCode}
            </Text>
          </View>
		  <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
		  <Text className="w-[122px] text-base font-tmedium">
              {ServicesDetailsLang.ServiceDetails.MaterialName[Lang]}
            </Text>
            <Text className={`${width} text-base font-tmedium`}>
              {MaterialName}
            </Text>
          </View>
		  <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
		  <Text className="w-[122px] text-base font-tmedium">
              {ServicesDetailsLang.ServiceDetails.Quantity[Lang]}
            </Text>
            <Text className={`${width} text-base font-tmedium`}>
              {Quantity}
            </Text>
          </View>
		  <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
		  <Text className="w-[122px] text-base font-tmedium">
              {ServicesDetailsLang.ServiceDetails.Unit[Lang]}
            </Text>
            <Text className={`${width} text-base font-tmedium`}>{Unit}</Text>
          </View>
		  <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
		  <Text className="w-[122px] text-base font-tmedium">
              {ServicesDetailsLang.ServiceDetails.IssueDate[Lang]}
            </Text>
            <Text className={`${width} text-base font-tmedium`}>
              {IssueDate}
            </Text>
          </View>
		  <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
		  <Text className="w-[122px] text-base font-tmedium">
              {ServicesDetailsLang.ServiceDetails.IsRequired[Lang]}
            </Text>
            <CheckBox value={IsRequired} />
          </View>
		  <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
		  <Text className="w-[122px] text-base font-tmedium">
              {ServicesDetailsLang.ServiceDetails.AssetName[Lang]}
            </Text>
            <Text className={`${width} text-base font-tmedium`}>
              {AssetName}
            </Text>
          </View>
        </View>
      </View>
    </MainLayout>
  );
};

export default ServicesDetails;