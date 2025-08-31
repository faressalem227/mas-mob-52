import { View, Text } from 'react-native';
import { MainLayout, MainGrid, InfoDetailes } from '../../../../components';
import MaintenanceSystem from '../../../../constants/Lang/Maintenance/MaintenanceSystem/MaintenanceSystem';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import { useLocalSearchParams } from 'expo-router';

const AssignedTasks = () => {
  const { Lang, DepartmentID, company, user } = useGlobalContext();

  const { ProcedureID, ProcedureCode, ProcedureName, PeriodName, TradeName, TradeID, SafetyID } =
    useLocalSearchParams();

  const detailsData = [
    { label: MaintenanceSystem.procedureCode[Lang], value: ProcedureCode },
    { label: MaintenanceSystem.procedureName[Lang], value: ProcedureName },
    { label: MaintenanceSystem.trade[Lang], value: TradeName },
    { label: MaintenanceSystem.periodName[Lang], value: PeriodName },
  ];

  return (
    <MainLayout title={MaintenanceSystem.AssignedTasks[Lang]}>
      <InfoDetailes details={detailsData} />
      <MainGrid
        pk={'ProcedureTasksID'}
        spTrx={'api_ms_Procedures_Tasks_Trx'}
        spIns={'api_ms_Procedures_Tasks_Ins'}
        spUpd={'api_ms_Procedures_Tasks_Upd'}
        spDel={'api_ms_Procedures_Tasks_Del'}
        TrxParam={[{ name: 'ProcedureID', value: ProcedureID }]}
        InsBody={{
          DepartmentID,
          ProcedureID,
        }}
        UpdBody={{}}
        DelParam={[{ rowData: true, name: 'ProcedureTasksID', value: 'ProcedureTasksID' }]}
        TrxDependency={[]}
        tableHead={[
          {
            key: 'DepartmentID',
          },
          {
            key: 'ProcedureTasksID',
          },
          {
            key: 'ProcedureID',
          },
          {
            key: 'ProcedureTasksCode',
            label: MaintenanceSystem.ProcedureTasksCode[Lang],
            type: 'number',
            input: true,
            visible: true,
            width: 120,
          },
          {
            key: 'ProcedureTasksName',
            label: MaintenanceSystem.ProcedureTasksName[Lang],
            input: true,
            visible: true,
            width: 300,
          },
          {
            key: 'EstimatedTasksHours',
            label: MaintenanceSystem.EstimatedTasksHours[Lang],
            type: 'number',
            input: true,
            visible: true,
            width: 160,
          },
        ]}
      />
    </MainLayout>
  );
};

export default AssignedTasks;
