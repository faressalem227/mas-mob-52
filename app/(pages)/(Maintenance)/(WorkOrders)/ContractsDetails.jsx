import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { MainLayout } from "../../../../components";
import { useLocalSearchParams } from "expo-router";
import ContractsDetailsLang from "../../../../constants/Lang/Maintenance/WorkOrders/ContractsDetailsLang";
import { useGlobalContext } from "../../../../context/GlobalProvider";
import InfoDetailes from "../../../../components/UI/InfoDetailes";
const ContractsDetails = () => {
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
		{ label:ContractsDetailsLang.Details.Contractor[Lang], value: ContractorCode },
		{ label:ContractsDetailsLang.Details.WorkDone[Lang], value: ContractorName },
		{ label:ContractsDetailsLang.Details.Date[Lang], value: ContactPerson },
		{ label:ContractsDetailsLang.Details.AbstractNumber[Lang], value: ContactInformation },
		{ label:ContractsDetailsLang.Details.AbstractDate[Lang], value: Country },
		{ label:ContractsDetailsLang.Details.MechanicalCost[Lang], value: City },
    { label:ContractsDetailsLang.Details.ElectricalCost[Lang], value: Address },
    { label:ContractsDetailsLang.Details.CivilCost[Lang], value: PhoneNumber },
    { label:ContractsDetailsLang.Details.SuppliesCost[Lang], value: FaxNumber },
    { label:ContractsDetailsLang.Details.TotalCost[Lang], value: Services },
    { label:ContractsDetailsLang.Details.CompletionPercentage[Lang], value: email },
    { label:ContractsDetailsLang.Details.Final[Lang], value: email },
    { label:ContractsDetailsLang.Details.Notes[Lang], value: email },
	];
  return (
    <MainLayout title={ContractsDetailsLang.PageTitle[Lang]} className="">
      <View className="bg-white h-[100vh] flex flex-col">
      <InfoDetailes
					details={detailsData}
					valueWidthClass="w-[60%]"
				/>
	  <View className={`flex flex-col ${Rtl ? "rtl" : "ltr"} bg-[#F6F6F6] rounded-sm p-4 m-4`}>
	  <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
	  <Text className="w-[122px] text-base font-tmedium">
              {ContractsDetailsLang.Details.Contractor[Lang]}
            </Text>
            <Text className={`${width} text-base font-tmedium`}>
              {ContractorCode}
            </Text>
          </View>
		  <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
		  <Text className="w-[122px] text-base font-tmedium">
              {ContractsDetailsLang.Details.WorkDone[Lang]}
            </Text>
            <Text className={`${width} text-base font-tmedium`}>
              {ContractorName}
            </Text>
          </View>
		  <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
		  <Text className="w-[122px] text-base font-tmedium">
              {ContractsDetailsLang.Details.Date[Lang]}
            </Text>
            <Text className={`${width} text-base font-tmedium`}>
              {ContactPerson}
            </Text>
          </View>
		  <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
		  <Text className="w-[122px] text-base font-tmedium">
              {ContractsDetailsLang.Details.AbstractNumber[Lang]}
            </Text>
            <Text className="max-w-[100vw-122px] text-ellipsis text-base font-tmedium">
              {ContactInformation}
            </Text>
          </View>
		  <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
		  <Text className="w-[122px] text-base font-tmedium">
              {ContractsDetailsLang.Details.AbstractDate[Lang]}
            </Text>
            <Text className={`${width} text-base font-tmedium`}>{Country}</Text>
          </View>
		  <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
		  <Text className="w-[122px] text-base font-tmedium">
              {ContractsDetailsLang.Details.MechanicalCost[Lang]}
            </Text>
            <Text className={`${width} text-base font-tmedium`}>{City}</Text>
          </View>
		  <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
		  <Text className="w-[122px] text-base font-tmedium">
              {ContractsDetailsLang.Details.ElectricalCost[Lang]}
            </Text>
            <Text className={`${width} text-base font-tmedium`}>{Address}</Text>
          </View>
		  <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
		  <Text className="w-[122px] text-base font-tmedium">
              {ContractsDetailsLang.Details.CivilCost[Lang]}
            </Text>
            <Text className={`${width} text-base font-tmedium`}>
              {PhoneNumber}
            </Text>
          </View>
		  <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
		  <Text className="w-[122px] text-base font-tmedium">
              {ContractsDetailsLang.Details.SuppliesCost[Lang]}
            </Text>
            <Text className={`${width} text-base font-tmedium`}>
              {FaxNumber}
            </Text>
          </View>
		  <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
		  <Text className="w-[122px] text-base font-tmedium">
              {ContractsDetailsLang.Details.TotalCost[Lang]}
            </Text>
            <Text className={`${width} text-base font-tmedium`}>{Services}</Text>
          </View>
		  <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
		  <Text className="w-[122px] text-base font-tmedium">
              {ContractsDetailsLang.Details.CompletionPercentage[Lang]}
            </Text>
            <Text className={`${width} text-base font-tmedium`}>{email}</Text>
          </View>
		  <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
		  <Text className="w-[122px] text-base font-tmedium">
              {ContractsDetailsLang.Details.Final[Lang]}
            </Text>
            <Text className={`${width} text-base font-tmedium`}>{email}</Text>
          </View>
		  <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
		  <Text className="w-[122px] text-base font-tmedium">
              {ContractsDetailsLang.Details.Notes[Lang]}
            </Text>
            <Text className={`${width} text-base font-tmedium`}>{email}</Text>
          </View>
        </View>
      </View>
    </MainLayout>
  );
};

export default ContractsDetails;