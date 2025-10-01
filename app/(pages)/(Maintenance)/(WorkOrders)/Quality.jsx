import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { MainLayout, MainButton, DatePickerInput } from '../../../../components';
import { useRouter, useLocalSearchParams } from 'expo-router';
import MainGrid from '../../../../components/grid/MainGrid';
import WorkOrders from '../../../../constants/Lang/Maintenance/WorkOrders/WorkOrders';
import { useGlobalContext } from '../../../../context/GlobalProvider';

const Quality = () => {
  const {
    TradeID,
    DepartmentID,
    WorkorderID,
    FailureDescription,
    WorkorderCode,
    WorkorderName,
    WorkorderTypeID,
    WorkorderTypeName,
    WorkorderStatusName,
    preventCrud,
    ...restParams
  } = useLocalSearchParams();

  const { Lang, Rtl, company } = useGlobalContext(); // Get the current language from global context

  const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);
  const [width, setWidth] = useState();

  useEffect(() => {
    if (windowWidth < 800) {
      setWidth('w-48'); // Set width to 250 px
    } else {
      setWidth('w-[80%]'); // Set width to 80%
    }
  }, [windowWidth]);

  return (
    <MainLayout title={WorkOrders.Quality[Lang]} className="">
      <View className="flex h-[100vh] flex-col bg-white">
        <View className={`flex flex-col ${Rtl ? 'rtl' : 'ltr'} m-4 rounded-sm bg-[#F6F6F6] p-4`}>
          <View
            className={`flex flex-row ${Rtl ? 'flex-row-reverse' : ''} items-center  justify-between  border-b-[1px] border-[#E4E7EC] py-1`}>
            <Text className="w-[122px] font-tmedium text-base">
              {WorkOrders.WorkorderCode[Lang]}
            </Text>
            <Text className={`${width} font-tmedium text-base`}>{WorkorderCode}</Text>
          </View>
          <View
            className={`flex flex-row ${Rtl ? 'flex-row-reverse' : ''} items-center  justify-between  border-b-[1px] border-[#E4E7EC] py-1`}>
            <Text className="w-[122px] font-tmedium text-base">
              {WorkOrders.WorkOrderDescription[Lang]}
            </Text>
            <Text className={`${width} font-tmedium text-base`}>{WorkorderName}</Text>
          </View>
          <View
            className={`flex flex-row ${Rtl ? 'flex-row-reverse' : ''} items-center  justify-between  border-b-[1px] border-[#E4E7EC] py-1`}>
            <Text className="w-[122px] font-tmedium text-base">
              {WorkOrders.WorkorderTypeName[Lang]}
            </Text>
            <Text className={`${width} font-tmedium text-base`}>{WorkorderTypeName}</Text>
          </View>
          <View
            className={`flex flex-row ${Rtl ? 'flex-row-reverse' : ''} items-center  justify-between  border-b-[1px] border-[#E4E7EC] py-1`}>
            <Text className="w-[122px] pt-1 font-tmedium text-base">
              {WorkOrders.WorkorderStatusName[Lang]}
            </Text>
            <Text className={`${width} font-tmedium text-base`}>{WorkorderStatusName}</Text>
          </View>
        </View>
        <MainGrid
          tableHead={[
            {
              key: 'QualityItem',
              label: WorkOrders.QualityItem[Lang],
              type: 'text',
              input: 'true',
              visible: 'true',
              width: 100,
              required: true,
            },
            {
              key: 'EvaluationParty',
              label: WorkOrders.EvaluationParty[Lang],
              input: 'true',
              type: 'text',
              visible: 'true',
              width: 100,
              required: true,
            },

            {
              key: 'MinAllowed',
              label: WorkOrders.MinAllowed[Lang],
              type: 'number',
              input: 'true',
              visible: 'true',
              width: 100,
            },
            {
              key: 'MaxAllowed',
              label: WorkOrders.MaxAllowed[Lang],
              type: 'number',
              input: 'true',
              visible: 'true',
              width: 100,
            },
            {
              key: 'EvaluationResult',
              label: WorkOrders.EvaluationResult[Lang],
              type: 'number',
              input: 'true',
              visible: 'true',
              width: 200,
            },
          ]}
          pk={'QualityID'}
          spTrx={'api_ms_Workorders_Quality_Trx'}
          spIns={'api_ms_Workorders_Quality_Ins'}
          spDel={'api_ms_Workorders_Quality_Del'}
          spUpd={'api_ms_Workorders_Quality_Upd'}
          UpdBody={{
            WorkorderID: WorkorderID,
            DepartmentID: DepartmentID,
          }}
          InsBody={{
            WorkorderID: WorkorderID,
            DepartmentID: DepartmentID,
          }}
          hasCrud={preventCrud}
          TrxParam={[
            { name: 'DepartmentID', value: DepartmentID },
            { name: 'LangID', value: Lang },
            { name: 'UserName', value: 'host' },
            { name: 'WorkorderID', value: WorkorderID },
          ]}
          DelParam={[
            {
              rowData: true,
              name: 'QualityID',
              value: 'QualityID',
            },
            { name: 'DepartmentID', value: DepartmentID },
            { name: 'WorkorderID', value: WorkorderID },
          ]}
          TrxDependency={[WorkorderID]}
          mixedWidth
        />
      </View>
    </MainLayout>
  );
};

export default Quality;
