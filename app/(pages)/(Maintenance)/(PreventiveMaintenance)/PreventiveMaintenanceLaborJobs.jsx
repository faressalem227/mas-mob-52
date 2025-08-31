import { View } from 'react-native';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import { useLocalSearchParams } from 'expo-router';
import MainGrid from '../../../../components/grid/MainGrid';
import { useDropDown } from '../../../../hooks/useDropDownData';
import PreventiveMaintenanceLaborJobsLang from '../../../../constants/Lang/Maintenance/PreventiveMaintenanceHome/PreventiveMaintenance/PreventiveMaintenanceLaborJobsLang';
import PreventiveMaintenanceDetailsLang from '../../../../constants/Lang/Maintenance/PreventiveMaintenanceHome/PreventiveMaintenanceDetails';
import { MainLayout, InfoDetailes } from '../../../../components';

const PreventiveMaintenanceLaborJobs = () => {
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

  const { data: jobsList } = useDropDown(
    'api_ms_Jobs_List',
    { DepartmentID: DepartmentID },
    'JobID',
    'JobName'
  );

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
    <MainLayout title={PreventiveMaintenanceLaborJobsLang.PageTitle[Lang]} className="">
      <View className="flex-1 flex-col bg-white py-4">
        <InfoDetailes details={detailsData} />
        <View className="flex-1">
          <MainGrid
            tableHead={[
              {
                key: 'ProcedureJobID',
              },
              {
                key: 'JobID',
                label: PreventiveMaintenanceLaborJobsLang.TableHeaders.Job[Lang],
                type: 'dropdown',
                input: 'true',
                options: jobsList,
              },
              {
                key: 'JobName',
                label: PreventiveMaintenanceLaborJobsLang.TableHeaders.Job[Lang],
                type: 'dropdown',
                input: 'false',
                visible: 'true',
              },
              {
                key: 'RequiredCount',
                label: PreventiveMaintenanceLaborJobsLang.TableHeaders.RequiredCount[Lang],
                input: 'true',
                type: 'number',
                visible: 'true',
              },
              {
                key: 'EstimatedLaborHours',
                label: PreventiveMaintenanceLaborJobsLang.TableHeaders.EstimatedLaborHours[Lang],
                type: 'number',
                input: 'true',
                visible: 'true',
              },
            ]}
            pk={'ProcedureJobID'}
            spTrx={'api_ms_Procedures_Jobs_Trx'}
            spIns={'api_ms_Procedures_Jobs_Ins'}
            spUpd={'api_ms_Procedures_Jobs_Upd'}
            spDel={'api_ms_Procedures_Jobs_Del'}
            TrxParam={[
              { name: 'DepartmentID', value: DepartmentID },
              { name: 'ProcedureID', value: ProcedureID },
            ]}
            DelParam={[
              {
                rowData: true,
                name: 'ProcedureJobID',
                value: 'ProcedureJobID',
              },
              { name: 'DepartmentID', value: DepartmentID },
              { name: 'ProcedureID', value: ProcedureID },
            ]}
            UpdBody={{ DepartmentID: DepartmentID }}
            InsBody={{ DepartmentID: DepartmentID, ProcedureID: ProcedureID }}
            TrxDependency={[ProcedureID, DepartmentID]}
          />
        </View>
      </View>
    </MainLayout>
  );
};

export default PreventiveMaintenanceLaborJobs;
