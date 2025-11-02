import { MainLayout, MainGrid } from '../../../../components';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

const UnitAssignedWorkordersLang = {
  AssigendWorkorders: {
    1: 'أوامر الشغل المخصصة للموظف',
    2: 'Assigned Workorders',
  },
  WorkorderID: {
    1: 'WorkorderID',
    2: 'WorkorderID',
  },
  WorkorderCode: {
    1: 'رقم أمر الشغل',
    2: 'Work Order No.',
  },
  WorkorderName: {
    1: 'وصف أمر الشغل',
    2: 'Work Order Description',
  },
  WorkorderTypeName: {
    1: 'نوع أمر الشغل',
    2: 'Work Order Type',
  },
  WorkorderStatusName: {
    1: 'حالة أمر الشغل',
    2: 'Work Order Status',
  },
  TradeName: {
    1: 'تصنيف الأعمال',
    2: 'Trade',
  },
  PriorityName: {
    1: 'الأولوية',
    2: 'Priority',
  },
  StaffCode: {
    1: 'كود الموظف',
    2: 'Employee Code',
  },
  StaffName: {
    1: 'اسم الموظف المسئول',
    2: "Responsible Employee's Name",
  },
  RequiredExecuteDate: {
    1: 'تاريخ التنفيذ المطلوب',
    2: 'Required Execute Date',
  },
  Safety: {
    1: 'مهمات الوقاية والأمان',
    2: 'Safety',
  },
  FailureName: {
    1: 'العطل',
    2: 'Failure',
  },
  FailureCauseName: {
    1: 'سبب العطل',
    2: 'Failure Cause',
  },
  PlannedStartDate: {
    1: 'تاريخ بدء مخطط',
    2: 'Planned Start Date',
  },
  PlannedEndDate: {
    1: 'تاريخ نهو مخطط',
    2: 'Planned End Date',
  },
  ActualStartDate: {
    1: 'تاريخ بدء فعلي',
    2: 'Actual Start Date',
  },
  ActualEndDate: {
    1: 'تاريخ نهو فعلي',
    2: 'Actual End Date',
  },
  ClosedDate: {
    1: 'تاريخ الإغلاق',
    2: 'Closed Date',
  },
  CancelledDate: {
    1: 'تاريخ الإلغاء',
    2: 'Cancelled Date',
  },
  ScheduleCode: {
    1: 'كود الجدولة',
    2: 'Schedule Code',
  },
  ScheduleName: {
    1: 'اسم الجدولة',
    2: 'Schedule Name',
  },
};

const UnitAssignedWorkorders = () => {
  const { user, Lang, DepartmentID } = useGlobalContext();

  const { StaffID } = useLocalSearchParams();

  return (
    <MainLayout title={UnitAssignedWorkordersLang.AssigendWorkorders[Lang]}>
      <View className="flex-1">
        <MainGrid
          pk={'WorkorderCode'}
          hasCrud={false}
          spTrx={'api_ms_Asset_WorkOrders_Emp1'}
          TrxParam={[
            { name: 'DepartmentID', value: DepartmentID },
            { name: 'StaffID', value: StaffID },
            { name: 'LangID', value: Lang },
            { name: 'UserName', value: user.username },
          ]}
          mixedWidth
          tableHead={[
            {
              key: 'WorkorderID',
              type: 'comboBox',
              input: false,
              visible: false,
              required: false,
              width: 160,
              editable: false,
              label: UnitAssignedWorkordersLang.WorkorderID[Lang],
            },
            {
              key: 'WorkorderCode',
              type: 'text',
              input: true,
              visible: true,
              required: false,
              width: 140,
              label: UnitAssignedWorkordersLang.WorkorderCode[Lang],
            },
            {
              key: 'WorkorderName',
              type: 'text',
              input: true,
              visible: true,
              required: false,
              width: 200,
              label: UnitAssignedWorkordersLang.WorkorderName[Lang],
            },
            {
              key: 'WorkorderTypeName',
              type: 'text',
              input: true,
              visible: true,
              required: false,
              width: 200,
              label: UnitAssignedWorkordersLang.WorkorderTypeName[Lang],
            },
            {
              key: 'WorkorderStatusName',
              type: 'text',
              input: true,
              visible: true,
              required: false,
              width: 160,
              label: UnitAssignedWorkordersLang.WorkorderStatusName[Lang],
            },
            {
              key: 'TradeName',
              type: 'text',
              input: true,
              visible: true,
              required: false,
              width: 160,
              label: UnitAssignedWorkordersLang.TradeName[Lang],
            },
            {
              key: 'PriorityName',
              type: 'text',
              input: true,
              visible: true,
              required: false,
              width: 150,
              label: UnitAssignedWorkordersLang.PriorityName[Lang],
            },
            {
              key: 'StaffCode',
              type: 'text',
              input: true,
              visible: true,
              required: false,
              width: 160,
              label: UnitAssignedWorkordersLang.StaffCode[Lang],
            },
            {
              key: 'StaffName',
              type: 'text',
              input: true,
              visible: true,
              required: false,
              width: 190,
              label: UnitAssignedWorkordersLang.StaffName[Lang],
            },
            {
              key: 'RequiredExecuteDate',
              type: 'date',
              input: true,
              visible: true,
              required: false,
              width: 160,
              label: UnitAssignedWorkordersLang.RequiredExecuteDate[Lang],
            },
            {
              key: 'Safety',
              type: 'text',
              input: true,
              visible: true,
              required: false,
              width: 250,
              label: UnitAssignedWorkordersLang.Safety[Lang],
            },
            {
              key: 'FailureName',
              type: 'text',
              input: true,
              visible: true,
              required: false,
              width: 160,
              label: UnitAssignedWorkordersLang.FailureName[Lang],
            },
            {
              key: 'FailureCauseName',
              type: 'text',
              input: true,
              visible: true,
              required: false,
              width: 160,
              label: UnitAssignedWorkordersLang.FailureCauseName[Lang],
            },
            {
              key: 'PlannedStartDate',
              type: 'date',
              input: true,
              visible: true,
              required: false,
              width: 160,
              label: UnitAssignedWorkordersLang.PlannedStartDate[Lang],
            },
            {
              key: 'PlannedEndDate',
              type: 'date',
              input: true,
              visible: true,
              required: false,
              width: 160,
              label: UnitAssignedWorkordersLang.PlannedEndDate[Lang],
            },
            {
              key: 'ActualStartDate',
              type: 'date',
              input: true,
              visible: true,
              required: false,
              width: 160,
              label: UnitAssignedWorkordersLang.ActualStartDate[Lang],
            },
            {
              key: 'ActualEndDate',
              type: 'date',
              input: true,
              visible: true,
              required: false,
              width: 160,
              label: UnitAssignedWorkordersLang.ActualEndDate[Lang],
            },
            {
              key: 'ClosedDate',
              type: 'date',
              input: true,
              visible: true,
              required: false,
              width: 160,
              label: UnitAssignedWorkordersLang.ClosedDate[Lang],
            },
            {
              key: 'CancelledDate',
              type: 'date',
              input: true,
              visible: true,
              required: false,
              width: 160,
              label: UnitAssignedWorkordersLang.CancelledDate[Lang],
            },
            {
              key: 'ScheduleCode',
              type: 'text',
              input: true,
              visible: true,
              required: false,
              width: 160,
              label: UnitAssignedWorkordersLang.ScheduleCode[Lang],
            },
            {
              key: 'ScheduleName',
              type: 'text',
              input: true,
              visible: true,
              required: false,
              width: 250,
              label: UnitAssignedWorkordersLang.ScheduleName[Lang],
            },
          ]}
        />
      </View>
    </MainLayout>
  );
};

export default UnitAssignedWorkorders;
