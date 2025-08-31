import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { MainLayout } from "../../../../components";
import { useLocalSearchParams } from "expo-router";
import BusinessItemsDetailsLang from "../../../../constants/Lang/Maintenance/WorkOrders/BusinessItemsDetailsLang";
import { useGlobalContext } from "../../../../context/GlobalProvider";
import InfoDetailes from "../../../../components/UI/InfoDetailes";
const BusinessItemsDetails = () => {
  const {
    LocationID,
    ContractorID,
    ContractorCode,
    ContractorName,
    ContactPerson,
    ContactInformation,
    Country,
    City,
    Address,
    PhoneNumber,
    FaxNumber,
    Services,
    email,
  } = useLocalSearchParams();

  const { Lang , Rtl} = useGlobalContext(); // Get the current language from global context
  const [windowWidth, setWindowWidth] = useState(Dimensions.get("window").width);
  const [width, setWidth] = useState();

  useEffect(() => {
    if (windowWidth < 800) {
      setWidth("w-48"); // Set width to 250 px
    } else {
      setWidth("w-[80%]"); // Set width to 80%
    }
  }, [windowWidth]);
  const detailsData = [
		{ label:BusinessItemsDetailsLang.Details.TaskCode[Lang], value: ContractorCode },
		{ label:BusinessItemsDetailsLang.Details.TaskName[Lang], value: ContractorName },
		{ label:BusinessItemsDetailsLang.Details.Unit[Lang], value: ContactPerson },
		{ label:BusinessItemsDetailsLang.Details.Quantity[Lang], value: ContactInformation },
		{ label:BusinessItemsDetailsLang.Details.Cost[Lang], value: Country },
		{ label:BusinessItemsDetailsLang.Details.PlannedStartDate[Lang], value: City },
    { label:BusinessItemsDetailsLang.Details.PlannedEndDate[Lang], value: Address },
    { label:BusinessItemsDetailsLang.Details.ActualStartDate[Lang], value: PhoneNumber },
    { label:BusinessItemsDetailsLang.Details.ActualEndDate[Lang], value: FaxNumber },
    { label:BusinessItemsDetailsLang.Details.Total[Lang], value: email },
	];
  return (
    <MainLayout title={BusinessItemsDetailsLang.PageTitle[Lang]} className="">
      <View className="bg-white h-[100vh] flex flex-col">
      <InfoDetailes
					details={detailsData}
					valueWidthClass="w-[60%]"
				/>
      </View>
    </MainLayout>
  );
};

export default BusinessItemsDetails;