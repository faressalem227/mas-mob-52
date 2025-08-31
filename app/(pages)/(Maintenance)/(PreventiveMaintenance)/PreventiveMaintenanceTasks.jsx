import { View } from 'react-native';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import { useLocalSearchParams } from 'expo-router';
import PreventiveMaintenanceTasksLang from '../../../../constants/Lang/Maintenance/PreventiveMaintenanceHome/PreventiveMaintenance/PreventiveMaintenanceTasksLang';
import PreventiveMaintenanceDetailsLang from '../../../../constants/Lang/Maintenance/PreventiveMaintenanceHome/PreventiveMaintenanceDetails';
import { MainGrid, MainLayout, InfoDetailes } from '../../../../components';

const PreventiveMaintenanceTasks = () => {
  const { Lang, DepartmentID } = useGlobalContext();
  const {
    ProcedureID,
    ProcedureCode,
    ProcedureName,
    PeriodName,
    EstimatedLaborHours,
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

  return (
    <MainLayout title={PreventiveMaintenanceTasksLang.PageTitle[Lang]} className="">
      <View className="flex h-[100vh] flex-col bg-white py-4">
        <InfoDetailes details={detailsData} />
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
            TrxDependency={[ProcedureID, DepartmentID]}
          />
        </View>
      </View>
    </MainLayout>
  );
};

export default PreventiveMaintenanceTasks;
