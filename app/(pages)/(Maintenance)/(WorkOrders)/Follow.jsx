import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { MainLayout, MainButton, DatePickerInput } from '../../../../components';
import { useRouter, useLocalSearchParams } from 'expo-router';
import MainGrid from '../../../../components/grid/MainGrid';
import WorkOrders from '../../../../constants/Lang/Maintenance/WorkOrders/WorkOrders';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import { useDropDown } from '../../../../hooks/useDropDownData';
import { lang } from '../../../../constants/Lang/components/CustomMenu';

const Follow = () => {
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

  const { Lang, Rtl, company } = useGlobalContext();
  const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);
  const [width, setWidth] = useState();

  const { data: FollowupType } = useDropDown(
    'api_ms_FollowupType_list',
    {
      UserName: 'host',
      LangID: Lang,
      CompanyID: company,
    },
    'FollowupTypeID',
    'FollowupTypeName'
  );
  const { data: FollowUpState } = useDropDown(
    'ms_FollowUpState_List',
    {
      UserName: 'host',
      LangID: Lang,
      CompanyID: company,
    },
    'StateID',
    'StateName'
  );
  useEffect(() => {
    if (windowWidth < 800) {
      setWidth('w-48');
    } else {
      setWidth('w-[80%]');
    }
  }, [windowWidth]);

  return (
    <MainLayout title={WorkOrders.WorkorderFollow[Lang]} className="">
      <View className="flex h-[100vh] flex-col bg-white">
        <View className={`flex flex-col ${Rtl ? 'rtl' : 'ltr'} m-4 rounded-sm bg-[#F6F6F6] p-4`}>
          <View
            className={`flex flex-row ${
              Rtl ? 'flex-row-reverse' : ''
            } items-center  justify-between  border-b-[1px] border-[#E4E7EC] py-1`}>
            <Text className="w-[122px] font-tmedium text-base">
              {WorkOrders.WorkorderCode[Lang]}
            </Text>
            <Text className={`${width} font-tmedium text-base`}>{WorkorderCode}</Text>
          </View>
          <View
            className={`flex flex-row ${
              Rtl ? 'flex-row-reverse' : ''
            } items-center  justify-between  border-b-[1px] border-[#E4E7EC] py-1`}>
            <Text className="w-[122px] font-tmedium text-base">
              {WorkOrders.WorkOrderDescription[Lang]}
            </Text>
            <Text className={`${width} font-tmedium text-base`}>{WorkorderName}</Text>
          </View>
          <View
            className={`flex flex-row ${
              Rtl ? 'flex-row-reverse' : ''
            } items-center  justify-between  border-b-[1px] border-[#E4E7EC] py-1`}>
            <Text className="w-[122px] font-tmedium text-base">
              {WorkOrders.WorkorderTypeName[Lang]}
            </Text>
            <Text className={`${width} font-tmedium text-base`}>{WorkorderTypeName}</Text>
          </View>
          <View
            className={`flex flex-row ${
              Rtl ? 'flex-row-reverse' : ''
            } items-center  justify-between  border-b-[1px] border-[#E4E7EC] py-1`}>
            <Text className="w-[122px] pt-1 font-tmedium text-base">
              {WorkOrders.WorkorderStatusName[Lang]}
            </Text>
            <Text className={`${width} font-tmedium text-base`}>{WorkorderStatusName}</Text>
          </View>
        </View>
        <MainGrid
          tableHead={[
            {
              key: 'FollowupDate',
              label: WorkOrders.FollowUP[Lang],
              type: 'date',
              input: 'true',
              visible: 'true',
              width: 120,
            },
            {
              key: 'FollowupTypeName',
              label: WorkOrders.FollowupType[Lang],
              type: 'text',
              input: 'false',
              visible: 'true',
              width: 120,
            },
            {
              key: 'FollowupTypeID',
              label: WorkOrders.FollowupType[Lang],
              type: 'dropdown',
              options: FollowupType,
              input: 'true',
              visible: 'false',
              width: 100,
            },
            {
              key: 'StateID',
              label: WorkOrders.StateID[Lang],
              type: 'dropdown',
              options: FollowUpState,
              input: 'true',
              visible: 'false',
              width: 100,
            },
            {
              key: 'FollowupSubject',
              label: WorkOrders.FollowupSubject[Lang],
              type: 'text',
              input: 'true',
              visible: 'true',
              width: 200,
            },
            {
              key: 'FollowupResult',
              label: WorkOrders.FollowupResult[Lang],
              type: 'text',
              input: 'true',
              visible: 'true',
              width: 150,
            },
            {
              key: 'StateName',
              label: WorkOrders.StateID[Lang],
              type: 'number',
              input: 'false',
              visible: 'true',
              width: 120,
            },
            {
              key: 'CompletePercent',
              label: WorkOrders.CompletePercent[Lang],
              type: 'number',
              input: 'true',
              visible: 'true',
              width: 150,
            },
            {
              key: 'Personincharge',
              label: WorkOrders.Personincharge[Lang],
              type: 'text',
              input: 'true',
              visible: 'true',
              width: 200,
            },
            {
              key: 'IsPlanned',
              label: WorkOrders.IsPlanned[Lang],
              type: 'checkbox',
              input: 'true',
              visible: 'true',
              required: false,
              width: 120,
            },
          ]}
          pk={'FollowupID'}
          spTrx={'api_ms_Workorders_Followups_Trx'}
          spIns={'api_ms_Workorders_Followups_Ins'}
          spDel={'api_ms_Workorders_Followups_Del'}
          spUpd={'api_ms_Workorders_Followups_Upd'}
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
              name: 'FollowupID',
              value: 'FollowupID',
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

export default Follow;
