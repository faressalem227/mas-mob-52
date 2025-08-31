import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import { MainLayout } from "../../../../components";
import { useLocalSearchParams } from "expo-router";
import { CheckBox } from "../../../index";
import ContractorsDetailsLang from "../../../../constants/Lang/Maintenance/MaintenanceSystem/ContractorsDetails";
import { useGlobalContext } from "../../../../context/GlobalProvider";
import InfoDetailes from "../../../../components/UI/InfoDetailes";
const ContractorsDetails = ({ route }) => {
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
  const { Lang, Rtl } = useGlobalContext();
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
    { label: ContractorsDetailsLang.ContractorCode[Lang], value: ContractorCode },
    { label: ContractorsDetailsLang.ContractorName[Lang], value: ContractorName },
    { label: ContractorsDetailsLang.ContactPerson[Lang], value: ContactPerson },
    { label: ContractorsDetailsLang.ContactInformation[Lang], value: ContactInformation },
    { label: ContractorsDetailsLang.Country[Lang], value: Country },
    { label: ContractorsDetailsLang.City[Lang], value: City },
    { label: ContractorsDetailsLang.Address[Lang], value: Address },
    { label: ContractorsDetailsLang.PhoneNumber[Lang], value: PhoneNumber },
    { label: ContractorsDetailsLang.FaxNumber[Lang], value: FaxNumber },
    { label: ContractorsDetailsLang.Services[Lang], value: Services },
    { label: ContractorsDetailsLang.email[Lang], value: email },
  ];
  //console.log("windowWidth", windowWidth);
  //console.log("computed width", width);
  return (
    <MainLayout title={ContractorsDetailsLang.pageTitle[Lang]} className="">
      <View className="bg-white h-[100vh] flex flex-col ">
        <InfoDetailes
          details={detailsData}
          valueWidthClass="w-[60%]"
        />
      </View>
    </MainLayout>
  );
};

export default ContractorsDetails;
