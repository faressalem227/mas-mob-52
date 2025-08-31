import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { MainLayout } from "../../../../components";
import { useLocalSearchParams } from "expo-router";
import EmploymentDetailsLang from "../../../../constants/Lang/Maintenance/WorkOrders/EmploymentDetailsLang";
import { useGlobalContext } from "../../../../context/GlobalProvider";
import InfoDetailes from "../../../../components/UI/InfoDetailes";
const EmploymentDetails = () => {
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
    EmployeeName,
    HourRate,
    OverTime1,
    OverTime2,
    StartDate,
    EndDate,
    TotalHours,
    TotalCost,
    WorkorderLaborID,
    AssetName,
    preventCrud,
    ...restParams
  } = useLocalSearchParams();

  const { Lang , Rtl } = useGlobalContext(); // Get the current language from global context
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
    <MainLayout title={EmploymentDetailsLang.PageTitle[Lang]} className="">
      <View className="bg-white h-[100vh] flex flex-col">
      <InfoDetailes
					details={dataDetailes1}
					valueWidthClass="w-[60%]"
				/>
      <InfoDetailes
					details={detailsData}
					valueWidthClass="w-[60%]"
				/>
      </View>
    </MainLayout>
  );
};

export default EmploymentDetails;