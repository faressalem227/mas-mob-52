import { useState } from 'react';
import { View } from 'react-native';
import { MainLayout, DatePickerInput, Dropdown, SmallButton } from '../../../components';
import { useRouter, useLocalSearchParams } from 'expo-router';
import MainGrid from '../../../components/grid/MainGrid';
import { useGlobalContext } from '../../../context/GlobalProvider';
import OperatingSystemLang from '../../../constants/Lang/OperatingSystem/OperatingSystemLang';

import { useDropDown } from '../../../hooks/useDropDownData';

const OperatingData = () => {
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
  const { Lang, user } = useGlobalContext();
  const [date, setDate] = useState(false);
  const [subLocationID, setSubLocationID] = useState();
  const [TradeID, setTradeID] = useState();
  const [currentView, setCurrentView] = useState(1);

  
  const { data: TradeList } = useDropDown(
    'api_ms_Trade_List_pm',
    { DepartmentID, CompanyID: company, LangID: Lang },
    'TradeID',
    'TradeName'
  );

  const { data: SubLocation } = useDropDown(
    'api_ms_SubLocation_List',
    { DepartmentID: DepartmentID, LangID: Lang },
    'SubLocationID',
    'SubLocationName'
  );

  return (
    <MainLayout title={OperatingSystemLang.OperatingData[Lang]}>
      <View className="flex-1">
        <View className="my-16 gap-4 px-4">
          <DatePickerInput
            title={OperatingSystemLang.Date[Lang]}
            setDate={(selectedDate) => setDate(selectedDate)}
          />

          <Dropdown
            data={TradeList}
            initailOption={TradeList[0]?.key}
            title={OperatingSystemLang.Classification[Lang]}
            placeholder={OperatingSystemLang.select[Lang]}
            onChange={(v) => setTradeID(v)}
          />

          <Dropdown
            data={SubLocation}
            initailOption={SubLocationID || SubLocation[0]?.key}
            title={OperatingSystemLang.Location[Lang]}
            placeholder={OperatingSystemLang.select[Lang]}
            onChange={(v) => setSubLocationID(v)}
          />
        </View>

        <View
          className={`flex-1 ${Lang === 1 ? 'flex-row-reverse' : 'flex-row'} flex-wrap items-center justify-center gap-4`}>
          <SmallButton
            title={OperatingSystemLang.hourlyOperation[Lang]}
            handlePress={() => {
              router.navigate({
                pathname: 'HourlyOperation',
                params: {
                  TradeID,
                  subLocationID,
                  date,
                },
              });
            }}
          />

          <SmallButton
            title={OperatingSystemLang.dailyOpertaion[Lang]}
            handlePress={() => {
              router.navigate({
                pathname: 'OperationDailyData',
                params: {
                  TradeID,
                  subLocationID,
                  date,
                },
              });
            }}
          />

          <SmallButton
            title={OperatingSystemLang.operationHours[Lang]}
            handlePress={() => {
              router.navigate({
                pathname: 'OperationHours',
                params: {
                  TradeID,
                  subLocationID,
                  date,
                },
              });
            }}
          />
        </View>

        {/* {currentView === 1 && (
            <View>
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
          )} */}
      </View>
    </MainLayout>
  );
};

export default OperatingData;
