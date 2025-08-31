import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { MainLayout } from '../../../components';
import { useLocalSearchParams } from 'expo-router';
import MainGrid from '../../../components/grid/MainGrid';
import { useGlobalContext } from '../../../context/GlobalProvider';
import AssetHomeLang from '../../../constants/Lang/AssetManagment/AssetHomeLang';
const LocationDetails = () => {
  const { SubLocationID, SubLocationName, SubLocationCode } = useLocalSearchParams();
  const { DepartmentID, Lang, company, Rtl, user } = useGlobalContext();
  const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);
  const [width, setWidth] = useState();
  useEffect(() => {
    if (windowWidth < 800) {
      setWidth('w-[60%]'); // Set width to 250 px
    } else {
      setWidth('w-[80%]'); // Set width to 80%
    }
  }, [windowWidth]);

  return (
    <MainLayout title={AssetHomeLang.SiteDetails[Lang]}>
      <View className="flex h-[100vh] flex-col justify-center bg-white">
        <View className={`flex flex-col ${Rtl ? 'rtl' : 'ltr'} m-4 rounded-sm bg-[#F6F6F6] p-4`}>
          <View
            className={`flex flex-row ${
              Rtl ? 'flex-row-reverse' : ''
            } items-center  justify-between  border-b-[1px] border-[#E4E7EC] py-1`}>
            <Text className="w-[122px] font-tmedium text-base">{AssetHomeLang.SiteCode[Lang]}</Text>
            <Text className={`${width} text-basefont-tmedium`}>{SubLocationCode}</Text>
          </View>
          <View
            className={`flex flex-row ${
              Rtl ? 'flex-row-reverse' : ''
            } items-center  justify-between  border-b-[1px] border-[#E4E7EC] py-1`}>
            <Text className="w-[122px] font-tmedium  text-base ">
              {AssetHomeLang.SiteName[Lang]}
            </Text>
            <Text className={`${width}  text-basefont-tmedium`}>{SubLocationName}</Text>
          </View>
        </View>
        {/* <LocationDetailsGrid row={row} /> */}
        <MainGrid
          tableHead={[
            {
              key: 'AssetID',
              label: AssetHomeLang.Asset[Lang],
              type: 'number',
              input: 'true',
              visible: 'false',
              width: 90,
            },
            {
              key: 'AssetCode',
              label: AssetHomeLang.AssetCode[Lang],
              type: 'number',
              input: 'true',
              visible: 'true',
              width: 90,
            },
            {
              key: 'AssetName',
              label: AssetHomeLang.AssetName[Lang],
              type: 'text',
              input: 'true',
              visible: 'true',
              width: 200,
            },
            {
              key: 'AssetClassName',
              label: AssetHomeLang.Classification[Lang],
              type: 'text',
              input: 'true',
              visible: 'true',
              width: 150,
            },
            {
              key: 'AssetStatusName',
              label: AssetHomeLang.AssetStatusName[Lang],
              type: 'text',
              input: 'true',
              visible: 'true',
              width: 100,
            },
            {
              key: 'EmployeeName',
              label: AssetHomeLang.EmployeeName[Lang],
              type: 'text',
              input: 'true',
              visible: 'true',
              width: 150,
            },
            {
              key: 'JobName',
              label: AssetHomeLang.JobName[Lang],
              type: 'text',
              input: 'true',
              visible: 'true',
              width: 150,
            },
            {
              key: 'ModelName',
              label: AssetHomeLang.ModelName[Lang],
              type: 'text',
              input: 'true',
              visible: 'true',
              width: 90,
            },
            {
              key: 'OperationDate',
              label: AssetHomeLang.OperationDate[Lang],
              type: 'date',
              input: 'true',
              visible: 'true',
              width: 150,
            },
            {
              key: 'OriginalCost',
              label: AssetHomeLang.OriginalCost[Lang],
              type: 'number',
              input: 'true',
              visible: 'true',
              width: 150,
            },
          ]}
          StaticWidth
          mixedWidth
          pk={'AssetID'}
          spTrx={'api_ms_SubLocation_Sheet_Assets'}
          TrxParam={[
            { name: 'DepartmentID', value: DepartmentID },
            { name: 'SubLocationID', value: SubLocationID },
            { name: 'CompanyID', value: company },
            { name: 'UserName', value: user.username },
            { name: 'LangID', value: Lang },
          ]}
          hasCrud={false}
          routeTo={{
            path: '/AssetDetails',
            hasParams: true,
            params: [],
          }}
        />
      </View>
    </MainLayout>
  );
};

export default LocationDetails;
