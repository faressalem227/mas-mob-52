import { View } from 'react-native';
import { MainGrid, MainLayout } from '../../../components';
import EmployeesText from '../../../constants/Lang/EmployeesSystem/EmployeesLang';
import { useGlobalContext } from '../../../context/GlobalProvider';
import { useLocalSearchParams } from 'expo-router';
const EmployeesWorkorder = () => {
  const { Lang, DepartmentID, user } = useGlobalContext();

  const { StaffID } = useLocalSearchParams();
  return (
    <MainLayout title={EmployeesText.EmployeesWorkorder[Lang]}>
      <View className="mt-3 flex-1">
        <MainGrid
          hasCrud={false}
          pk={'WorkorderCode'}
          spTrx={'api_ms_Asset_WorkOrders_Emp1'}
          TrxParam={[
            { name: 'DepartmentID', value: DepartmentID },
            { name: 'UserName', value: user.username },
            { name: 'LangID', value: Lang },
            { name: 'StaffID', value: StaffID },
          ]}
          TrxDependency={[StaffID]}
          StaticWidth
          tableHead={[
            {
              key: 'WorkorderID',
            },
            {
              key: 'WorkorderCode',
              label: EmployeesText.workOrderCode[Lang],
              input: true,
              visible: true,
              isRequired: false,
              width: 140,
              type: 'number',
            },
            {
              key: 'WorkorderName',
              label: EmployeesText.workOrderName[Lang],
              input: true,
              visible: true,
              width: 200,
            },
            {
              key: 'WorkorderTypeName',
              label: EmployeesText.workOrderType[Lang],
              input: true,
              visible: true,
              width: 200,
            },
            {
              key: 'WorkorderStatusName',
              label: EmployeesText.workOrderStatus[Lang],
              input: true,
              visible: true,
              width: 160,
            },
            {
              key: 'TradeName',
              label: EmployeesText.Trade[Lang],
              input: true,
              visible: true,
              width: 160,
            },
            {
              key: 'PriorityName',
              label: EmployeesText.Priority[Lang],
              input: true,
              visible: true,
              width: 150,
            },
            {
              key: 'StaffCode',
              label: EmployeesText.StaffCode[Lang],
              input: true,
              visible: true,
              width: 160,
            },
            {
              key: 'StaffName',
              label: EmployeesText.StaffName[Lang],
              type: 'text',
              input: true,
              visible: true,
              width: 190,
            },
            {
              key: 'RequiredExecuteDate',
              label: EmployeesText.RequiredExecuteDate[Lang],
              type: 'date',
              input: true,
              visible: true,
              width: 160,
            },
            {
              key: 'Safety',
              label: EmployeesText.Safety[Lang],
              input: true,
              visible: true,
              width: 250,
            },
            {
              key: 'FailureName',
              label: EmployeesText.Failure[Lang],
              input: true,
              visible: true,
              width: 160,
            },
            {
              key: 'FailureCauseName',
              label: EmployeesText.FailureCause[Lang],
              input: true,
              visible: true,
              width: 160,
            },
            {
              key: 'PlannedStartDate',
              label: EmployeesText.PlannedStartDate[Lang],
              type: 'date',
              input: true,
              visible: true,
              width: 120,
            },
            {
              key: 'PlannedEndDate',
              label: EmployeesText.PlannedEndDate[Lang],
              type: 'date',
              input: true,
              visible: true,
              width: 120,
            },
            {
              key: 'ActualStartDate',
              label: EmployeesText.ActualStartDate[Lang],
              type: 'date',
              input: true,
              visible: true,
              width: 120,
            },
            {
              key: 'ActualEndDate',
              label: EmployeesText.ActualEndDate[Lang],
              type: 'date',
              input: true,
              visible: true,
              width: 120,
            },
            {
              key: 'ClosedDate',
              label: EmployeesText.ClosedDate[Lang],
              type: 'date',
              input: true,
              visible: true,
              width: 120,
            },
            {
              key: 'CancelledDate',
              label: EmployeesText.CancelledDate[Lang],
              type: 'date',
              input: true,
              visible: true,
              width: 120,
            },
            {
              key: 'ScheduleCode',
              label: EmployeesText.SchedulledCode[Lang],
              input: true,
              visible: true,
              width: 120,
            },
            {
              key: 'ScheduleName',
              label: EmployeesText.SchedulledName[Lang],
              input: true,
              visible: true,
              width: 250,
            },
          ]}
        />
      </View>
    </MainLayout>
  );
};

export default EmployeesWorkorder;
