import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { MainLayout } from '../../../components';
import { useLocalSearchParams } from 'expo-router';
import { useGlobalContext } from '../../../context/GlobalProvider'; // Import the context
import ItemsDetailsLang from '../../../constants/Lang/AssetManagment/ItemsDetailsLang'; // Import the language file
import InfoDetailes from '../../../components/UI/InfoDetailes';
const ItemsDetails = ({ route }) => {
  const { Rtl, Lang } = useGlobalContext(); // Get the current language from context
  const {
    LocationID,
    Remarks,
    ItemName,
    AssetCode,
    AssetName,
    SubLocationName,
    SectionName,
    Quantity,
    TotalCost,
    ItemCode,
    UnitCost,
    YearID,
    OrderNo,
    OrderDate,
    UnitName,
  } = useLocalSearchParams();

  const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);
  const [width, setWidth] = useState();

  useEffect(() => {
    if (windowWidth < 800) {
      setWidth('w-40'); // Set width to 250 px
    } else {
      setWidth('w-[80%]'); // Set width to 80%
    }
  }, [windowWidth]);
  const detailsData = [
    { label: ItemsDetailsLang.SubLocationName[Lang], value: SubLocationName },
    { label: ItemsDetailsLang.AssetCode[Lang], value: AssetCode },
    { label: ItemsDetailsLang.AssetName[Lang], value: AssetName },
  ];
  const detailsData2 = [
    { label: ItemsDetailsLang.SectionName[Lang], value: SectionName },
    { label: ItemsDetailsLang.ItemCode[Lang], value: ItemCode },
    { label: ItemsDetailsLang.ItemName[Lang], value: ItemName },
    { label: ItemsDetailsLang.Quantity[Lang], value: Quantity },
    { label: ItemsDetailsLang.UnitName[Lang], value: UnitName },
    { label: ItemsDetailsLang.UnitCost[Lang], value: UnitCost },
    { label: ItemsDetailsLang.TotalCost[Lang], value: TotalCost },
    { label: ItemsDetailsLang.YearID[Lang], value: YearID },
    { label: ItemsDetailsLang.OrderNo[Lang], value: OrderNo },
    { label: ItemsDetailsLang.OrderDate[Lang], value: OrderDate?.split('T')[0] },
  ];
  return (
    <MainLayout title={ItemsDetailsLang.PageTitle[Lang]} className="">
      <View className="flex h-[100vh] flex-col bg-white">
        <InfoDetailes details={detailsData} valueWidthClass="w-[60%]" />
        <InfoDetailes details={detailsData2} valueWidthClass="w-[60%]" />
      </View>
    </MainLayout>
  );
};

export default ItemsDetails;
