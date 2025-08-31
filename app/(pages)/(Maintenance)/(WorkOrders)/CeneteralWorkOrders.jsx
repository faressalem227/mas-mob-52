import { useState } from 'react';
import { View } from 'react-native';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import { MainLayout, CheckBox, Dropdown } from '../../../../components';
import { useDropDown } from '../../../../hooks/useDropDownData';
import WorkOrdersLang from '../../../../constants/Lang/Maintenance/WorkOrders/WorkOrdersLang'; // Import the language file
import ReportBugsLang from '../../../../constants/Lang/Maintenance/ReportBugs';

import DraftGrid from '../../../../components/grid/DraftGrid';

const CeneteralWorkOrders = () => {
  const { user, DepartmentID, Lang, company, Rtl } = useGlobalContext();
  const [TradeID, setTradeID] = useState(null);
  const [WorkOrderCancel, setWorkOrderCancel] = useState(false);
  const [WorkOrderClose, setWorkOrderClose] = useState(false);
  const [WorkOrderOpen, setWorkOrderOpen] = useState(true);
  const [YearID, setYearID] = useState(null);
  const [WorkOrderWaiting, setWorkOrderWaiting] = useState(false);
  const [WaitWorkshop, setWaitWorkshop] = useState(false);

  const { data: TradeList } = useDropDown(
    'ms_Trade_List_pm',
    { DepartmentID: DepartmentID },
    'TradeID',
    'TradeName'
  );

  const { data: YearList } = useDropDown(
    'api_ms_Years_List',
    { DepartmentID },
    'YearID',
    'YearName'
  );

  const { data: employeeData } = useDropDown(
    'api_ms_Employees_ListForWo',
    { DepartmentID },
    'StaffID',
    'StaffName'
  );

  const { data: WorkTypeList } = useDropDown(
    'api_ms_WorkOrders_Types_List0',
    { DepartmentID: DepartmentID, TradeID: TradeID, LangID: Lang },
    'WorkorderTypeID',
    'WorkorderTypeName'
  );

  const { data: PriorityList } = useDropDown(
    'api_ms_Priority_List',
    { DepartmentID: DepartmentID, CompanyID: company, LangID: Lang },
    'PriorityID',
    'PriorityName'
  );

  const { data: CustomSchedule } = useDropDown(
    'ms_schedules_Custom_List',
    {
      DepartmentID,
      UserName: user.username,
      LangID: Lang,
      TradeID,
    },
    'ScheduleID',
    'ScheduleName'
  );

  const { data: ContractorsList } = useDropDown(
    'api_ms_Contractors_List',
    { CompanyID: company },
    'ContractorID',
    'ContractorName'
  );

  const { data: WorkshopWorkodersList } = useDropDown(
    'api_ms_Workorders_Workshop_list',
    { CompanyID: company },
    'WorkorderID',
    'WorkorderName'
  );

  return (
    <MainLayout title={WorkOrdersLang.CenteralWorkOrders[Lang]}>
      <View className="justify-center gap-6 p-4">
        <Dropdown
          value={TradeID}
          placeholder={WorkOrdersLang.TradeName[Lang]}
          label={WorkOrdersLang.TradeName[Lang]}
          data={TradeList}
          initailOption={TradeList[0]?.key}
          onChange={(e) => {
            setTradeID(e); // Update the TradeID state
          }}
        />

        <Dropdown
          value={YearID}
          placeholder={ReportBugsLang.YearChoose[Lang]}
          label={ReportBugsLang.Year[Lang]}
          data={YearList}
          initailOption={YearList[5]?.key}
          onChange={(e) => {
            setYearID(e);
          }}
        />

        <View
          className={`${Rtl ? 'flex-row-reverse' : 'flex-row'} flex-wrap justify-around text-center`}>
          <CheckBox
            labelName={WorkOrdersLang.Opened[Lang]}
            isEditable={true}
            value={WorkOrderOpen}
            onChange={(e) => {
              setWorkOrderOpen(e);
            }}
          />

          <CheckBox
            labelName={WorkOrdersLang.Waiting[Lang]}
            isEditable={true}
            value={WorkOrderWaiting}
            onChange={(e) => {
              setWorkOrderWaiting(e);
            }}
          />

          <CheckBox
            labelName={WorkOrdersLang.WaitingWorkShop[Lang]}
            isEditable={true}
            value={WaitWorkshop}
            onChange={(e) => {
              setWaitWorkshop(e);
            }}
          />

          <CheckBox
            labelName={WorkOrdersLang.Closed[Lang]}
            isEditable={true}
            value={WorkOrderClose}
            onChange={(e) => {
              setWorkOrderClose(e);
            }}
          />

          <CheckBox
            labelName={WorkOrdersLang.Canceled[Lang]}
            isEditable={true}
            value={WorkOrderCancel}
            onChange={(e) => {
              setWorkOrderCancel(e);
            }}
          />
        </View>
      </View>
      <View className="flex-1">
        <DraftGrid
          isNested
          StaticWidth
          pk={'WorkorderID'}
          parentKey={'WorkorderParentID'}
          spTrx={'api_ms_WorkOrders_List_Central'}
          spIns={'api_ms_WorkOrders_Ins'}
          spUpd={'api_ms_Workorders_Upd'}
          spDel={'api_ms_WorkOrders_Del'}
          TrxParam={[
            { name: 'DepartmentID', value: DepartmentID },
            { name: 'CompanyID', value: company },
            { name: 'UserName', value: user.username },
            { name: 'LangID', value: Lang },
            { name: 'YearID', value: YearID },
            { name: 'TradeID', value: TradeID },
            { name: 'Closed', value: WorkOrderClose ? 1 : 0 },
            { name: 'Canceled', value: WorkOrderCancel ? 1 : 0 },
            { name: 'Opened', value: WorkOrderOpen ? 1 : 0 },
            { name: 'Wait', value: WorkOrderWaiting ? 1 : 0 },
            { name: 'IsSm', value: 1 },
          ]}
          DelParam={[
            {
              rowData: true,
              name: 'WorkorderID',
              value: 'WorkorderID',
            },
            { name: 'DepartmentID', value: DepartmentID },
          ]}
          UpdBody={{ DepartmentID, TradeID }}
          InsBody={{
            DepartmentID,
            WorkorderStatusID: 1,
            TradeID,
            Opened: WorkOrderOpen,
            Closed: WorkOrderClose,
            Wait: WorkOrderWaiting,
            Canceled: WorkOrderCancel,
            IsSm: 1,
          }}
          TrxDependency={[
            TradeID,
            WorkOrderClose,
            WorkOrderCancel,
            WorkOrderWaiting,
            WorkOrderOpen,
            YearID,
          ]}
          highlight={{
            col: 'WorkorderTypeName',
            bgcolor: '#fff5f5f5',
            value: 'Corrective Maintenance',
          }}
          tableHead={[
            {
              key: 'WorkorderID',
            },
            {
              key: 'WorkorderParentID',
            },
            {
              key: 'WorkorderStatusID',
            },
            {
              key: 'FailureDescription',
            },
            {
              key: 'WorkorderCode',
              label: WorkOrdersLang.WorkorderCode[Lang],
              visible: true,
              width: 150,
            },
            {
              key: 'WorkorderName',
              label: WorkOrdersLang.WorkorderName[Lang],
              input: true,
              visible: true,
              width: 300,
            },
            {
              key: 'WorkorderTypeID',
              label: WorkOrdersLang.WorkorderTypeID[Lang],
              options: WorkTypeList,
              type: 'dropdown',
              input: true,
            },
            {
              key: 'WorkorderTypeName',
              label: WorkOrdersLang.WorkorderTypeName[Lang],
              visible: true,
              width: 150,
            },
            {
              key: 'PriorityID',
              label: WorkOrdersLang.PriorityID[Lang],
              options: PriorityList,
              type: 'dropdown',
              input: 'true',
              width: 150,
            },
            {
              key: 'PriorityName',
              label: WorkOrdersLang.PriorityID[Lang],
              visible: true,
              width: 150,
            },
            {
              key: 'ScheduleID',
              label: WorkOrdersLang.ScheduleName[Lang],
              type: 'dropDown',
              options: CustomSchedule,
            },
            {
              key: 'ScheduleName',
              label: WorkOrdersLang.ScheduleName[Lang],
              visible: true,
              width: 300,
            },
            {
              key: 'WorkorderStatusName',
              label: WorkOrdersLang.WorkorderStatusName[Lang],
              visible: true,
              width: 150,
            },
            {
              key: 'MainWorkorderID',
              label: WorkOrdersLang.mainWorkorder[Lang],
              type: 'dropDown',
              options: WorkshopWorkodersList,
              width: 120,
            },
            {
              key: 'MainWorkorderName',
              label: WorkOrdersLang.mainWorkorder[Lang],
              visible: true,
              width: 120,
            },
            {
              key: 'EmployeeID',
              label: WorkOrdersLang.EmployeeID[Lang],
              options: employeeData,
              type: 'dropdown',
              input: true,
            },
            {
              key: 'AssignedEmployeeName',
              label: WorkOrdersLang.EmployeeID[Lang],
              visible: true,
              width: 150,
            },
            {
              key: 'ContractorID',
              label: WorkOrdersLang.ContractorID[Lang],
              options: ContractorsList,
              type: 'dropdown',
            },
            {
              key: 'ContractorName',
              label: WorkOrdersLang.ContractorID[Lang],
              visible: true,
              width: 150,
            },
            {
              key: 'RequiredExecuteDate',
              label: WorkOrdersLang.RequiredExecuteDate[Lang],
              type: 'date',
              input: true,
              visible: 'true',
              width: 200,
            },
            {
              key: 'TargetTypeName',
              label: WorkOrdersLang.Tareget[Lang],
              type: 'text',
              visible: true,
              width: 170,
            },
            {
              key: 'WorksDone',
              label: WorkOrdersLang.worksDone[Lang],
              visible: true,
              width: 450,
            },
            {
              key: 'FailureName',
              label: WorkOrdersLang.Failure[Lang],
              visible: true,
              width: 210,
            },
            {
              key: 'FailureCauseName',
              label: WorkOrdersLang.FailureReason[Lang],
              visible: true,
              width: 210,
            },
            {
              key: 'PlannedStartDate',
              label: WorkOrdersLang.PlannedStartDate[Lang],
              type: 'date',
              input: true,
              visible: true,
              width: 200,
            },
            {
              key: 'PlannedEndDate',
              label: WorkOrdersLang.PlannedEndDate[Lang],
              type: 'date',
              visible: 'true',
              width: 200,
            },
            {
              key: 'ScheduleCode',
              label: WorkOrdersLang.ScheduleCode[Lang],
              type: 'number',
              visible: true,
              width: 120,
            },
            // {
            //   key: "ScheduleName",
            //   arCaption: "اسم الجدولة",
            //   enCaption: "Schedule Name",
            //   type: "text",
            //   Input: false,
            //   isRequired: false,
            //   width: 220,
            // },
            {
              key: 'WorkorderCounter',
            },
            {
              key: 'ActualStartDate',
              label: WorkOrdersLang.ActualStartDate[Lang],
              type: 'date',
              visible: true,
              width: 120,
            },
            {
              key: 'ActualEndDate',
              label: WorkOrdersLang.ActualEndDate[Lang],
              type: 'date',
              visible: true,
              width: 120,
            },
            {
              key: 'WorkorderStatusID',
            },
            {
              key: 'PlannedTotalCost',
              label: WorkOrdersLang.PlannedTotalCost[Lang],
              type: 'number',
              visible: true,
              width: 110,
            },
            {
              key: 'ActualTotalCost',
              label: WorkOrdersLang.ActualTotalCost[Lang],
              type: 'number',
              visible: true,
              width: 110,
            },
            {
              key: 'WorkorderEvaluationName',
              label: WorkOrdersLang.Evaluation[Lang],
              visible: true,
              width: 120,
            },
            {
              key: 'ClosedDate',
              label: WorkOrdersLang.ClosedDate[Lang],
              type: 'date',
              visible: true,
              width: 120,
            },
            {
              key: 'CancelledDate',
              label: WorkOrdersLang.CancelledDate[Lang],
              type: 'date',
              visible: true,
              width: 120,
            },
            {
              key: 'CancelReason',
              label: WorkOrdersLang.CancelledDate[Lang],
              visible: true,
              width: 190,
            },
            {
              key: 'CountDocuments',
              label: WorkOrdersLang.Documents[Lang],
              visible: true,
              width: 120,
            },
          ]}
          routeTo={{
            path: './WorkOrderDetails',
            hasParams: true,
            params: {
              DepartmentID: DepartmentID,
              TradeID: TradeID,
            },
          }}
        />
      </View>
    </MainLayout>
  );
};

export default CeneteralWorkOrders;
