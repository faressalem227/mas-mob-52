/* eslint-disable eqeqeq */
import { View } from 'react-native';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import { useLocalSearchParams } from 'expo-router';
import { useDropDown } from '../../../../hooks/useDropDownData';
import ContractsLang from '../../../../constants/Lang/Maintenance/WorkOrders/ContractsLang';
import { MainLayout, MainGrid } from '../../../../components';
const ContractsChart = () => {
  const {
    TradeID,
    preventCrud,
    LocationID,
    WorkorderID,
    FailureDescription,
    WorkorderCode,
    WorkorderName,
    WorkorderTypeID,
    WorkorderTypeName,
    WorkorderStatusName,
    WorkorderStatusID,
  } = useLocalSearchParams();

  const { user, Lang, DepartmentID } = useGlobalContext(); // Get the current language from global context

  const { data: Contractors } = useDropDown(
    'api_ms_Contractors_List',
    { LocationID: LocationID },
    'ContractorID',
    'ContractorName'
  );

  return (
    <MainLayout title={ContractsLang.TableHeaders.ContractsChart[Lang]}>
      <View className="flex-1">
        <MainGrid
          pk={'WorkOrderContractorID'}
          hasCrud={parseInt(WorkorderStatusID) < 3 || parseInt(WorkorderStatusID) == 5}
          spTrx={'api_ms_WorkOrders_Planned_Contractors_Trx'}
          spIns={'api_ms_WorkOrders_Planned_Contractors_Ins'}
          spUpd={'api_ms_WorkOrders_Planned_Contractors_Upd'}
          spDel={'api_ms_WorkOrders_Planned_Contractors_Del'}
          TrxParam={[
            { name: 'DepartmentID', value: DepartmentID },
            { name: 'LangID', value: Lang },
            { name: 'UserName', value: user.username },
            { name: 'WorkorderID', value: WorkorderID },
          ]}
          DelParam={[
            {
              rowData: true,
              name: 'WorkOrderContractorID',
              value: 'WorkOrderContractorID',
            },
            { name: 'DepartmentID', value: DepartmentID },
            { name: 'WorkorderID', value: WorkorderID },
            { name: 'LangID', value: Lang },
            { name: 'UserName', value: user.username },
          ]}
          UpdBody={{
            DepartmentID,
            LangID: Lang,
            UserName: user.username,
            WorkorderID,
          }}
          InsBody={{ DepartmentID, LangID: Lang, UserName: user.username, WorkorderID }}
          TrxDependency={[WorkorderID]}
          tableHead={[
            {
              key: 'WorkorderContractorID',
              label: ContractsLang.TableHeaders.WorkorderContractorID[Lang],
              type: '',
              input: 'false',
              visible: 'false',
              width: 100,
            },
            {
              key: 'ContractorID',
              label: ContractsLang.TableHeaders.ContractorID1[Lang],
              type: 'dropdown',
              options: Contractors,
              input: 'true',
              visible: 'false',
              width: 100,
            },
            {
              key: 'ContractorName',
              label: ContractsLang.TableHeaders.ContractorID1[Lang],
              type: '',
              input: 'false',
              visible: 'true',
            },
            {
              key: 'WorkRequired',
              label: ContractsLang.TableHeaders.WorkNeed[Lang],
              input: 'true',
              visible: 'true',
            },
            {
              key: 'WorkCost',
              label: ContractsLang.TableHeaders.WorkCost1[Lang],
              type: 'number',
              input: 'true',
              visible: 'true',
            },
          ]}
          StaticWidth
        />
      </View>
    </MainLayout>
  );
};

export default ContractsChart;
