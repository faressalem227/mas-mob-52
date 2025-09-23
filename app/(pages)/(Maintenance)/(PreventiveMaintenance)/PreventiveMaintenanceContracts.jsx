import { View } from 'react-native';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import { MainLayout, MainGrid, InfoDetailes } from '../../../../components';
import { useLocalSearchParams } from 'expo-router';
import { useDropDown } from '../../../../hooks/useDropDownData';
import PreventiveMaintenanceContractsLang from '../../../../constants/Lang/Maintenance/PreventiveMaintenanceHome/PreventiveMaintenance/PreventiveMaintenanceContracts';
import PreventiveMaintenanceDetailsLang from '../../../../constants/Lang/Maintenance/PreventiveMaintenanceHome/PreventiveMaintenanceDetails';

const PreventiveMaintenanceContracts = () => {
  const { Lang, company, DepartmentID } = useGlobalContext();
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

  const { data: Contractors } = useDropDown(
    'api_ms_Contractors_List',
    { CompanyID: company },
    'ContractorID',
    'ContractorName'
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
    <MainLayout title={PreventiveMaintenanceContractsLang.pageTitle[Lang]} className="">
      <View className="flex-1 p-3">
        <InfoDetailes details={detailsData} />
        <MainGrid
          pk={'ProcedureContractorID'}
          spTrx={'api_ms_Procedures_Contractors_Trx'}
          spIns={'api_ms_Procedures_Contractors_Ins'}
          spUpd={'api_ms_Procedures_Contractors_Upd'}
          spDel={'api_ms_Procedures_Contractors_Del'}
          mixedWidth
          TrxParam={[
            { name: 'DepartmentID', value: DepartmentID },
            { name: 'ProcedureID', value: ProcedureID },
          ]}
          DelParam={[
            {
              rowData: true,
              name: 'ProcedureContractorID',
              value: 'ProcedureContractorID',
            },
            { name: 'DepartmentID', value: DepartmentID },
            { name: 'ProcedureID', value: ProcedureID },
          ]}
          UpdBody={{ DepartmentID: DepartmentID }}
          InsBody={{ DepartmentID: DepartmentID, ProcedureID: ProcedureID }}
          TrxDependency={[ProcedureID]}
          tableHead={[
            {
              key: 'ContractorID',
              label: PreventiveMaintenanceContractsLang.Contractor[Lang],
              type: 'dropdown',
              options: Contractors,
              input: true,
            },
            {
              key: 'ContractorName',
              label: PreventiveMaintenanceContractsLang.Contractor[Lang],
              visible: 'true',
              width: 150,
            },
            {
              key: 'WorkCost',
              label: PreventiveMaintenanceContractsLang.WorkCost[Lang],
              type: 'number',
              input: true,
              visible: true,
              width: 100,
            },
            {
              key: 'WorkRequired',
              label: PreventiveMaintenanceContractsLang.WorkRequired[Lang],
              input: true,
              visible: true,
              width: 200,
            },
          ]}
        />
      </View>
    </MainLayout>
  );
};

export default PreventiveMaintenanceContracts;
