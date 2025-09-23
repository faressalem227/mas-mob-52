import { TouchableOpacity, View, Text, ScrollView } from 'react-native';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import { useLocalSearchParams } from 'expo-router';
import PreventiveMaintenanceTasksLang from '../../../../constants/Lang/Maintenance/PreventiveMaintenanceHome/PreventiveMaintenance/PreventiveMaintenanceTasksLang';
import PreventiveMaintenanceDetailsLang from '../../../../constants/Lang/Maintenance/PreventiveMaintenanceHome/PreventiveMaintenanceDetails';
import { MainGrid, MainLayout, InfoDetailes, Dropdown } from '../../../../components';
import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import api from '../../../../utilities/api';
import { useDropDown } from '../../../../hooks/useDropDownData';

const PreventiveMaintenanceTasks = () => {
  const { Lang, DepartmentID, Rtl, company, user } = useGlobalContext();
  const {
    ProcedureID,
    ProcedureCode,
    ProcedureName,
    PeriodID,
    PeriodName,
    EstimatedLaborHours,
    TradeID,
    TradeName,
    PriorityName,
    ProcedureTypeName,
  } = useLocalSearchParams();

  const detailsData = [
    { label: PreventiveMaintenanceDetailsLang.ProcedureCode[Lang], value: ProcedureCode },
    { label: PreventiveMaintenanceDetailsLang.ProcedureName[Lang], value: ProcedureName },
    { label: PreventiveMaintenanceDetailsLang.Trade[Lang], value: TradeName },
    { label: PreventiveMaintenanceDetailsLang.PriorityName[Lang], value: PriorityName },
    { label: PreventiveMaintenanceDetailsLang.Period[Lang], value: PeriodName },
    {
      label: PreventiveMaintenanceDetailsLang.EstimatedLaborHours[Lang],
      value: EstimatedLaborHours,
    },
    { label: PreventiveMaintenanceDetailsLang.ProcedureType[Lang], value: ProcedureTypeName },
  ];
  console.log(TradeID, 'TradeID');
  console.log(PeriodID, 'PeriodID');
  console.log(company, 'company');

  const { data: sds_SMPList } = useDropDown(
    'api_ms_SMPList',
    {
      UserName: user.username,
      LangID: Lang,
      PeriodID: PeriodID,
      TradeID: TradeID,
      CompanyID: company,
    },
    'ProcedureID',
    'ProcedureName'
  );
  const [isLoading, setIsLoading] = useState(false);
  const [SMPID, setSMPID] = useState(false);
  const [IsSMPTasks, setIsSMPTasks] = useState(false);
  const [counter, setCounter] = useState(false);

  const CopySMTask = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(
        `/table?sp=api_ms_Procedures_Tasks_Copy&SMPID=${SMPID}&ProcedureID=${ProcedureID}`
      );
      setCounter((prev) => prev + 1);
      Toast.show({
        type: 'success',
        text1: PreventiveMaintenanceTasksLang.CopyConfirm[Lang],
      });
    } catch (error) {
      console.error(error.response?.data || error.message);
      Toast.show({
        type: 'error',
        text1: PreventiveMaintenanceTasksLang.CopyFailed[Lang],
      });
    } finally {
      setIsLoading(false);
    }
  };

  console.log(SMPID, 'SMPID');

  return (
    <MainLayout title={PreventiveMaintenanceTasksLang.PageTitle[Lang]} className="">
      <ScrollView className="flex flex-col bg-white py-4">
        <InfoDetailes details={detailsData} />

        <View className="my-4 gap-4 px-4">
          <Dropdown
            placeholder={PreventiveMaintenanceTasksLang.SMP[Lang]}
            title={PreventiveMaintenanceTasksLang.SMP[Lang]}
            data={sds_SMPList}
            initailOption={sds_SMPList[0]?.key}
            onChange={(val) => {
              console.log('Dropdown selected:', val);
              setSMPID(val);
            }}
            value={SMPID}
          />

          {/* Button */}
          <View>
            <TouchableOpacity
              className="rounded-lg bg-green-600 p-3 text-center"
              onPress={() => {
                if (!SMPID) {
                  Toast.show({
                    type: 'error',
                    text1: PreventiveMaintenanceTasksLang.SelectSMP[Lang],
                  });
                } else {
                  setIsSMPTasks(true);
                  CopySMTask();
                }
              }}>
              <Text className="text-center text-white">
                {`${PreventiveMaintenanceTasksLang.CopySMPTasks[Lang]}${isLoading ? '...' : ''}`}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-1">
          <MainGrid
            tableHead={[
              {
                key: 'ProcedureTasksID',
              },
              {
                key: 'ProcedureTasksCode',
                label: PreventiveMaintenanceTasksLang.TableHeaders.Code[Lang],
                type: 'number',
                visible: 'true',
              },
              {
                key: 'ProcedureTasksName',
                label: PreventiveMaintenanceTasksLang.TableHeaders.RequiredTasks[Lang],
                type: 'text',
                input: 'true',
                visible: 'true',
              },
              {
                key: 'EstimatedTasksHours',
                label: PreventiveMaintenanceTasksLang.TableHeaders.EstimatedHours[Lang],
                type: 'number',
                input: 'true',
                visible: 'true',
              },
            ]}
            pk={'ProcedureTasksID'}
            spTrx={'api_ms_Procedures_Tasks_Trx'}
            spIns={'api_ms_Procedures_Tasks_Ins'}
            spUpd={'api_ms_Procedures_Tasks_Upd'}
            spDel={'api_ms_Procedures_Tasks_Del'}
            dynamicCode={{
              tbName: 'ms_Procedure_Task',
              codeCol: 'ProcedureTasksCode',
            }}
            TrxParam={[
              { name: 'DepartmentID', value: DepartmentID },
              { name: 'ProcedureID', value: ProcedureID },
              { name: 'SMPID', value: SMPID },
            ]}
            DelParam={[
              {
                rowData: true,
                name: 'ProcedureTasksID',
                value: 'ProcedureTasksID',
              },
            ]}
            UpdBody={{ DepartmentID: DepartmentID, ProcedureID: ProcedureID }}
            InsBody={{ DepartmentID: DepartmentID, ProcedureID: ProcedureID }}
            TrxDependency={[ProcedureID, counter, , JSON.stringify(SMPID)]}
          />
        </View>
      </ScrollView>
    </MainLayout>
  );
};

export default PreventiveMaintenanceTasks;
