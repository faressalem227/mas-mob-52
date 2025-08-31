import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { MainLayout, MainButton, DatePickerInput, Dropdown } from '../../../components';
import { useRouter, useLocalSearchParams } from 'expo-router';
import MainGrid from '../../../components/grid/MainGrid';
import { useGlobalContext } from '../../../context/GlobalProvider';
import OperatingSystemLang from '../../../constants/Lang/OperatingSystem/OperatingSystemLang';
import AssetHomeLang from '../../../constants/Lang/AssetManagment/AssetHomeLang';

import { HandleDropdownFormat, useDropDown } from '../../../hooks/useDropDownData';
import { TouchableOpacity } from 'react-native';

const OperatingData = ({ route }) => {
  const {
    AssetID,
    SubLocationID,
    //DepartmentID,
    AssetCode,
    AssetName,
    AssetClassName,
    AssetStatusName,
    ...restParams
  } = useLocalSearchParams();
  const { DepartmentID, company } = useGlobalContext();
  const router = useRouter();
  const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);
  const { Lang, user } = useGlobalContext();
  const [date, setDate] = useState(false);
  const [width, setWidth] = useState();
  const [subLocationID, setSubLocationID] = useState();
  const [TradeID, setTradeID] = useState();
  const [currentView, setCurrentView] = useState(1);

  const screenHeight = Dimensions.get('window').height; // Get screen height dynamically
  const operationHours = [
    ,
    { value: '0', key: 0 },
    { value: '1', key: 1 },
    { value: '2', key: 2 },
    { value: '3', key: 3 },
    { value: '4', key: 4 },
    { value: '5', key: 5 },
    { value: '6', key: 6 },
    { value: '7', key: 7 },
    { value: '8', key: 8 },
    { value: '9', key: 9 },
    { value: '10', key: 10 },
    { value: '11', key: 11 },
    { value: '12', key: 12 },
    { value: '13', key: 13 },
    { value: '14', key: 14 },
    { value: '15', key: 15 },
    { value: '16', key: 16 },
    { value: '17', key: 17 },
    { value: '18', key: 18 },
    { value: '19', key: 19 },
    { value: '20', key: 20 },
    { value: '21', key: 21 },
    { value: '22', key: 22 },
    { value: '23', key: 23 },
  ];
  useEffect(() => {
    if (windowWidth < 800) {
      setWidth('w-48');
    } else {
      setWidth('w-[80%]');
    }
  }, [windowWidth]);
  const { data: SubLocation, loading: SubLocationLoader } = useDropDown(
    'api_ms_SubLocation_List',
    { DepartmentID:DepartmentID, LangID: Lang },
    'SubLocationID',
    'SubLocationName'
  );
  const { data: TradeList, loading: TradeListLoader } = useDropDown(
    'api_ms_Trade_List_pm',
    { DepartmentID, CompanyID: company, LangID: Lang },
    'TradeID',
    'TradeName'
  );

  return (
    <>
      <MainLayout title={OperatingSystemLang.OperatingData[Lang]} className="">
        <View className="flex h-[100vh] flex-col bg-white">
          <View className="m-4">
            <DatePickerInput
              title={OperatingSystemLang.Date[Lang]}
              setDate={(selectedDate) => setDate(selectedDate)}
            />
            <View className="mt-4">
              <Dropdown
                data={TradeList}
                initailOption={TradeList[0]?.TradeID}
                title={'اختر التصنيف'}
                placeholder={OperatingSystemLang.select[Lang]}
                onChange={(v) => setTradeID(v)}
              />
            </View>
            <View className="mt-4">
              <Dropdown
                data={SubLocation}
                initailOption={SubLocationID || SubLocation[0]?.SubLocationID}
                title={OperatingSystemLang.Location[Lang]}
                placeholder={OperatingSystemLang.select[Lang]}
                onChange={(v) => setSubLocationID(v)}
              />
            </View>
          </View>

          <View className="flex flex-row-reverse justify-between bg-[#E4E7EC] px-8 pt-3">
            <TouchableOpacity onPress={() => setCurrentView(1)}>
              <Text
                className={`pb-2 font-tmedium text-base ${
                  currentView === 1
                    ? 'border-b-2 border-[#133E54] text-[#133E54]'
                    : 'text-slate-400'
                }`}>
                {OperatingSystemLang.ViewAssets[Lang]}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setCurrentView(2)}>
              <Text
                className={`pb-2 font-tmedium text-base ${
                  currentView === 2
                    ? 'border-b-2 border-[#133E54] text-[#133E54]'
                    : 'text-slate-400'
                }`}>
                {OperatingSystemLang.DailyOperation[Lang]}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setCurrentView(3)}>
              <Text
                className={`pb-2 font-tmedium text-base ${
                  currentView === 3
                    ? 'border-b-2 border-[#133E54] text-[#133E54]'
                    : 'text-slate-400'
                }`}>
                {OperatingSystemLang.HoursAssets[Lang]}
              </Text>
            </TouchableOpacity>
          </View>

          {currentView === 1 && (
            <View style={[styles.assetsGrid, { height: screenHeight - 125 }]}>
              <MainGrid
                tableHead={[
                  {
                    key: 'AssetID',
                    label: 'المعده',
                    input: 'false',
                    visible: 'false',
                    width: 100,
                  },
                  {
                    key: 'AssetCode',
                    label: OperatingSystemLang.AssetCode[Lang],
                    type: 'number',
                    input: 'false',
                    visible: 'true',
                    width: 100,
                  },
                  {
                    key: 'AssetName',
                    label: OperatingSystemLang.AssetName[Lang],
                    type: 'number',
                    input: 'false',
                    visible: 'true',
                    width: 130,
                  },
                  {
                    key: 'OperationItemName',
                    label: OperatingSystemLang.OperationItem[Lang],
                    type: 'number',
                    input: 'false',
                    visible: 'true',
                    width: 130,
                  },
                  {
                    key: 'OperationHour',
                    label: OperatingSystemLang.Hour[Lang],
                    type: 'dropdown',
                    options: operationHours,
                    input: 'true',
                    visible: 'false',
                    width: 100,
                  },
                  {
                    key: 'OperationValue',
                    label: OperatingSystemLang.Value[Lang],
                    type: 'number',
                    input: 'true',
                    visible: 'false',
                    width: 100,
                  },
                  {
                    key: 'T00',
                    label: OperatingSystemLang.Hour0[Lang],
                    type: 'number',
                    input: 'false',
                    visible: 'true',
                    width: 80,
                  },
                  {
                    key: 'T01',
                    label: OperatingSystemLang.Hour1[Lang],
                    type: 'number',
                    input: 'false',
                    visible: 'true',
                    width: 80,
                  },
                  {
                    key: 'T02',
                    label: OperatingSystemLang.Hour2[Lang],
                    type: 'number',
                    input: 'false',
                    visible: 'true',
                    width: 80,
                  },
                  {
                    key: 'T03',
                    label: OperatingSystemLang.Hour3[Lang],
                    type: 'number',
                    input: 'false',
                    visible: 'true',
                    width: 80,
                  },
                  {
                    key: 'T04',
                    label: OperatingSystemLang.Hour4[Lang],
                    type: 'number',
                    input: 'false',
                    visible: 'true',
                    width: 80,
                  },
                  {
                    key: 'T05',
                    label: OperatingSystemLang.Hour5[Lang],
                    type: 'number',
                    input: 'false',
                    visible: 'true',
                    width: 80,
                  },
                  {
                    key: 'T06',
                    label: OperatingSystemLang.Hour6[Lang],
                    type: 'number',
                    input: 'false',
                    visible: 'true',
                    width: 80,
                  },
                  {
                    key: 'T07',
                    label: OperatingSystemLang.Hour7[Lang],
                    type: 'number',
                    input: 'false',
                    visible: 'true',
                    width: 80,
                  },
                  {
                    key: 'T08',
                    label: OperatingSystemLang.Hour8[Lang],
                    type: 'number',
                    input: 'false',
                    visible: 'true',
                    width: 80,
                  },
                  {
                    key: 'T09',
                    label: OperatingSystemLang.Hour9[Lang],
                    type: 'number',
                    input: 'false',
                    visible: 'true',
                    width: 80,
                  },
                  {
                    key: 'T10',
                    label: OperatingSystemLang.Hour10[Lang],
                    type: 'number',
                    input: 'false',
                    visible: 'true',
                    width: 80,
                  },
                  {
                    key: 'T11',
                    label: OperatingSystemLang.Hour11[Lang],
                    type: 'number',
                    input: 'false',
                    visible: 'true',
                    width: 80,
                  },
                  {
                    key: 'T12',
                    label: OperatingSystemLang.Hour12[Lang],
                    type: 'number',
                    input: 'false',
                    visible: 'true',
                    width: 80,
                  },
                  {
                    key: 'T13',
                    label: OperatingSystemLang.Hour13[Lang],
                    type: 'number',
                    input: 'false',
                    visible: 'true',
                    width: 80,
                  },
                  {
                    key: 'T14',
                    label: OperatingSystemLang.Hour14[Lang],
                    type: 'number',
                    input: 'false',
                    visible: 'true',
                    width: 80,
                  },
                  {
                    key: 'T15',
                    label: OperatingSystemLang.Hour15[Lang],
                    type: 'number',
                    input: 'false',
                    visible: 'true',
                    width: 80,
                  },
                  {
                    key: 'T16',
                    label: OperatingSystemLang.Hour16[Lang],
                    type: 'number',
                    input: 'false',
                    visible: 'true',
                    width: 80,
                  },
                  {
                    key: 'T17',
                    label: OperatingSystemLang.Hour17[Lang],
                    type: 'number',
                    input: 'false',
                    visible: 'true',
                    width: 80,
                  },
                  {
                    key: 'T18',
                    label: OperatingSystemLang.Hour18[Lang],
                    type: 'number',
                    input: 'false',
                    visible: 'true',
                    width: 80,
                  },
                  {
                    key: 'T19',
                    label: OperatingSystemLang.Hour19[Lang],
                    type: 'number',
                    input: 'false',
                    visible: 'true',
                    width: 80,
                  },
                  {
                    key: 'T20',
                    label: OperatingSystemLang.Hour20[Lang],
                    type: 'number',
                    input: 'false',
                    visible: 'true',
                    width: 80,
                  },
                  {
                    key: 'T21',
                    label: OperatingSystemLang.Hour21[Lang],
                    type: 'number',
                    input: 'false',
                    visible: 'true',
                    width: 80,
                  },
                  {
                    key: 'T22',
                    label: OperatingSystemLang.Hour22[Lang],
                    type: 'number',
                    input: 'false',
                    visible: 'true',
                    width: 80,
                  },
                  {
                    key: 'T23',
                    label: OperatingSystemLang.Hour23[Lang],
                    type: 'number',
                    input: 'false',
                    visible: 'true',
                    width: 80,
                  },
                ]}
                pk={'AssetID1'}
                hasIns={false}
                hasDel={false}
                spTrx={'api_op_AssetsOperation_Trx'}
                spUpd={'api_op_AssetsOperation_Upd'}
                TrxParam={[
                  { name: 'DepartmentID', value: DepartmentID },
                  { name: 'OperationDate', value: date },
                  { name: 'SubLocationID', value: subLocationID },
                  { name: 'TradeID', value: TradeID },
                  { name: 'LangID', value: Lang },
                ]}
                UpdBody={{ LocationID: DepartmentID, OperationDate: date }}
                TrxDependency={[date, subLocationID, TradeID]}
                StaticWidth={true}
              />
            </View>
          )}
          {currentView === 2 && (
            <View style={[styles.assetsGrid, { height: screenHeight - 125 }]}>
              <MainGrid
                tableHead={[
                  {
                    key: 'AssetID',
                    label: 'المعده',
                    input: 'false',
                    visible: 'false',
                    width: 100,
                  },
                  {
                    key: 'DepartmentID',
                    label: '',
                    type: 'number',
                    input: 'false',
                    visible: 'false',
                    width: 80,
                  },

                  // {
                  //   key: 'Serial',
                  //   label: '#',
                  //   type: 'number',
                  //   input: 'false',
                  //   visible: 'true',
                  //   width: 80,
                  // },
                  {
                    key: 'AssetName',
                    label: 'اسم الاصل',
                    input: 'false',
                    visible: 'true',
                    width: 100,
                  },
                  {
                    key: 'OperationItemID',
                    label: OperatingSystemLang.OperationItem[Lang],
                    type: 'number',
                    input: 'false',
                    visible: 'false',
                    width: 100,
                  },
                  {
                    key: 'OperationItemName',
                    label: OperatingSystemLang.OperationItem[Lang],
                    type: 'text',
                    input: 'false',
                    visible: 'true',
                    width: 100,
                  },
                  {
                    key: 'Day',
                    label: OperatingSystemLang.Day[Lang],
                    type: 'number',
                    input: 'true',
                    visible: 'true',
                    width: 100,
                  },
                  {
                    key: 'Shift01',
                    label: OperatingSystemLang.Shift01[Lang],
                    type: 'number',
                    input: 'true',
                    visible: 'true',
                    width: 100,
                  },
                  {
                    key: 'Shift02',
                    label: OperatingSystemLang.Shift02[Lang],
                    type: 'number',
                    input: 'true',
                    visible: 'true',
                    width: 100,
                  },
                  {
                    key: 'Shift03',
                    label: OperatingSystemLang.Shift03[Lang],
                    type: 'number',
                    input: 'true',
                    visible: 'true',
                    width: 100,
                  },
                ]}
                pk={'ID'}
                hasIns={false}
                hasDel={false}
                spTrx={'op_Asset_Daily_Data_Trx'}
                spUpd={'op_Asset_Daily_Data_Upd'}
                TrxParam={[
                  { name: 'DepartmentID', value: DepartmentID },
                  { name: 'OperationDate', value: date },
                  { name: 'SubLocationID', value: subLocationID },
                  { name: 'TradeID', value: TradeID },
                ]}
                UpdBody={{ SubLocationID: subLocationID, OperationDate: date }}
                TrxDependency={[date, subLocationID, DepartmentID]}
                StaticWidth={true}
              />
            </View>
          )}

          {currentView === 3 && (
            <View style={[styles.assetsGrid, { height: screenHeight - 125 }]}>
              <MainGrid
                tableHead={[
                  {
                    key: 'AssetID',
                    label: 'المعده',
                    input: 'false',
                    visible: 'false',
                    width: 100,
                  },
                  {
                    key: 'DepartmentID',
                    label: '',
                    type: 'number',
                    input: 'false',
                    visible: 'false',
                    width: 80,
                  },

                  {
                    key: 'AssetCode',
                    label: 'كود الاصل',
                    type: 'number',
                    input: 'false',
                    visible: 'true',
                    width: 80,
                  },
                  {
                    key: 'AssetName',
                    label: 'اسم الاصل',
                    type: 'text',
                    input: 'false',
                    visible: 'true',
                    width: 100,
                  },
                  {
                    key: 'OperationItemName',
                    label: 'بند التشغيل',
                    type: 'text',
                    input: 'false',
                    visible: 'true',
                    width: 100,
                  },
                  {
                    key: 'OperatingHours',
                    label: 'قيمه اليوم',
                    type: 'number',
                    input: 'true',
                    visible: 'true',
                    width: 100,
                  },
                ]}
                pk={'AssetID'}
                hasIns={false}
                hasDel={false}
                spTrx={'op_OperationData_Trx'}
                spUpd={'op_OperationData_Upd'}
                TrxParam={[
                  { name: 'DepartmentID', value: DepartmentID },
                  { name: 'OperationDate', value: date },
                  { name: 'SubLocationID', value: subLocationID },
                ]}
                UpdBody={{ DepartmentID: DepartmentID, OperationDate: date }}
                TrxDependency={[date, subLocationID]}
                StaticWidth={true}
              />
            </View>
          )}
        </View>
      </MainLayout>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dropdownContainer: {
    marginHorizontal: 16,
    marginVertical: 24,
  },
  assetsGrid: {
    marginVertical: 16,
  },
});

export default OperatingData;
