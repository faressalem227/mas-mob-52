import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { MainLayout, MainButton } from '../../../components';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AssetMaintenanceGrid from '../../../components/grid/AssetMaintenanceGrid';
import MainGrid from '../../../components/grid/MainGrid';
import AssetHomeLang from '../../../constants/Lang/AssetManagment/AssetHomeLang';
import { useGlobalContext } from '../../../context/GlobalProvider';
import InfoDetailes from '../../../components/UI/InfoDetailes';
const AssetImportance = ({ route }) => {
  const {
    AssetID,
    SubLocationID,
    LocationID,
    AssetCode,
    AssetName,
    AssetClassName,
    AssetStatusName,
  } = useLocalSearchParams();
  const router = useRouter();
  const { Lang, Rtl,company } = useGlobalContext();
  const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);
  const [width, setWidth] = useState();
  useEffect(() => {
    if (windowWidth < 800) {
      setWidth('w-48'); // Set width to 250 px
    } else {
      setWidth('w-[80%]'); // Set width to 80%
    }
  }, [windowWidth]);

  //console.log("windowWidth", windowWidth);
  //console.log("computed width", width);
  const detailsData = [
    { label: AssetHomeLang.AssetCode[Lang],  value: AssetCode },
    { label: AssetHomeLang.AssetName[Lang], value: AssetName },
   // { label: AssetHomeLang.SiteName[Lang], value: '' },
    { label: AssetHomeLang.Classification[Lang], value: AssetClassName },
  ];
  return (
    <MainLayout title={AssetHomeLang.AssetImportance[Lang]} className="">
      <View className="mb-6 flex h-[100vh] flex-col bg-white">
        <View className="mb-4">
          <InfoDetailes details={detailsData} valueWidthClass="w-[60%]" />
        </View>

        <MainGrid
          tableHead={[
            {
              key: 'LevelOfService',
              label: AssetHomeLang.ServiceLevel[Lang],
              type: 'text',
              input: 'true',
              visible: 'true',
            },
            {
              key: 'NormWt',
              label: AssetHomeLang.Weight[Lang],
              type: 'number',
              input: 'true',
              visible: 'true',
            },
            {
              key: 'QuestionToAsk',
              label: AssetHomeLang.Question[Lang],
              type: 'text',
              input: 'true',
              visible: 'true',
            },
          ]}
          spTrx={'api_ms_consequence_leveltype_Trx'}
          TrxParam={[
            { name: 'CompanyID', value: company },
            { name: 'AssetID', value: AssetID },
          ]}
          hasCrud={false}
        />
      </View>
    </MainLayout>
  );
};

export default AssetImportance;
