import { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import { useLocalSearchParams } from 'expo-router';
import { MainGrid, MainLayout, FormField } from '../../../../components';
import ScheduleAndWorkOrdersLang from '../../../../constants/Lang/Maintenance/PreventiveMaintenanceHome/SchedulePreventiveMaintenance/ScheduleAndWorkOrders';
import api from '../../../../utilities/api';

import Toast from 'react-native-toast-message';
const ScheduleAndWorkOrders = () => {
  const { Lang, Rtl, DepartmentID, company, user } = useGlobalContext();
  const { ScheduleID } = useLocalSearchParams();
  const [NoOfYears, setNoOfYears] = useState('1'); // Ensure loading state is defined
  const [isLoading, setIsLoading] = useState(false);
  const [counter, setCounter] = useState(0);

  const generateTimeLine = async () => {
    try {
      setIsLoading(true);

      await api.post('table/', {
        sp: 'ms_sp_pm_GenerateTimeLineOneYear',
        CompanyID: company,
        DepartmentID,
        UserName: user.username,
        LangID: Lang,
        NoOfYears: parseInt(NoOfYears),
        ScheduleID,
      });

      Toast.show({
        type: 'success',
        text1: ScheduleAndWorkOrdersLang.GenerateDateStart[Lang],
        position: 'top',
      });

      setCounter((prev) => prev + 1);
    } catch (error) {
      console.error(error);

      Toast.show({
        type: 'error',
        text1: ScheduleAndWorkOrdersLang.GenerateFailed[Lang],
        text2: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout title={ScheduleAndWorkOrdersLang.pageTitle[Lang]} className="">
      <View className={`my-3 px-3 ${Rtl ? 'flex-row-reverse' : 'flex-row'} items-center gap-3`}>
        <View className="flex-1">
          <FormField
            numeric
            placeholder={ScheduleAndWorkOrdersLang.Years[Lang]}
            handleChangeText={(val) => setNoOfYears(val)}
            value={NoOfYears}
          />
        </View>
        <TouchableOpacity className="rounded-md bg-primary p-3" onPress={generateTimeLine}>
          <Text className="font-tregular text-white">
            {isLoading
              ? ScheduleAndWorkOrdersLang.loading[Lang]
              : ScheduleAndWorkOrdersLang.GenerateTimeLine[Lang]}
          </Text>
        </TouchableOpacity>
      </View>

      <View className="flex-1">
        <MainGrid
          hasIns={false}
          hasUpd={false}
          pk={'ScheduleDetailsID'}
          spTrx={'api_ms_Schedule_Details_Trx2'}
          spDel={'api_ms_Schedule_Details_Del'}
          TrxParam={[
            { name: 'DepartmentID', value: DepartmentID },
            { name: 'NoOfYears', value: NoOfYears },
            { name: 'ScheduleID', value: ScheduleID },
          ]}
          InsBody={{}}
          UpdBody={{}}
          DelParam={[
            { rowData: true, name: 'ScheduleDetailsID', value: 'ScheduleDetailsID' },
            { name: 'DepartmentID', value: DepartmentID },
          ]}
          TrxDependency={[counter]}
          StaticWidth
          tableHead={[
            {
              key: 'ScheduleDetailsID',
            },
            {
              key: 'ScheduleID',
            },
            {
              key: 'PlannedStartDate',
              label: ScheduleAndWorkOrdersLang.PlannedStartDate[Lang],
              type: 'date',
              input: true,
              visible: true,
              width: 150,
            },
            {
              key: 'PlannedEndDate',
              label: ScheduleAndWorkOrdersLang.PlannedEndDate[Lang],
              type: 'date',
              input: true,
              visible: true,
              width: 150,
            },
            {
              key: 'WorkorderCounter',
              label: ScheduleAndWorkOrdersLang.Counter[Lang],
              type: 'number',
              visible: true,
              width: 100,
            },
            {
              key: 'AssetCount',
              label: ScheduleAndWorkOrdersLang.AssetCount[Lang],
              type: 'number',
              hidden: true,
              width: 150,
            },
            {
              key: 'LabourCost',
              label: ScheduleAndWorkOrdersLang.LaborCost[Lang],
              type: 'number',
              visible: true,
              width: 150,
            },
            {
              key: 'MaterialCost',
              label: ScheduleAndWorkOrdersLang.MaterialCost[Lang],
              type: 'number',
              visible: true,
              width: 120,
            },
            {
              key: 'WorkorderCode',
              label: ScheduleAndWorkOrdersLang.WorkorderID[Lang],
              visible: true,
              width: 120,
            },
            {
              key: 'GenerateWODateStart',
              label: ScheduleAndWorkOrdersLang.GenerateDateStart[Lang],
              type: 'date',
              input: true,
              visible: true,
              width: 130,
            },
            {
              key: 'GenerateWODateEnd',
              label: ScheduleAndWorkOrdersLang.GenerateDateEnd[Lang],
              type: 'date',
              input: true,
              visible: true,
              width: 130,
            },
            {
              key: 'GenerateWOUserName',
              label: ScheduleAndWorkOrdersLang.GenerateUser[Lang],
              visible: true,
              width: 120,
            },
            {
              key: 'ServiceCost',
              label: ScheduleAndWorkOrdersLang.ServiceCost[Lang],
              type: 'number',
              visible: true,
              width: 120,
            },
            {
              key: 'ContractorsCost',
              label: ScheduleAndWorkOrdersLang.ContractorCost[Lang],
              type: 'number',
              visible: true,
              width: 120,
            },
            {
              key: 'Execluded',
              label: ScheduleAndWorkOrdersLang.Execluded[Lang],
              type: 'checkbox',
              input: true,
              visible: true,
              width: 100,
            },
            {
              key: 'ExecludReason',
              label: ScheduleAndWorkOrdersLang.ExecludedReason[Lang],
              input: true,
              visible: true,
              width: 120,
            },
          ]}
        />
      </View>
    </MainLayout>
  );
};

export default ScheduleAndWorkOrders;
