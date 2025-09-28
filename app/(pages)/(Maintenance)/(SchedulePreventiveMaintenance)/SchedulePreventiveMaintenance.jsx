import { useState } from 'react';
import { View } from 'react-native';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import MainLayout from '../../../../components/layout/MainLayout';
import MainGrid from '../../../../components/grid/MainGrid';
import { useDropDown } from '../../../../hooks/useDropDownData';
import { Dropdown } from '../../../../components';
import SchedulePreventiveMaintenanceLang from '../../../../constants/Lang/Maintenance/PreventiveMaintenanceHome/SchedulePreventiveMaintenance';
const SchedulePreventiveMaintenance = () => {
  const { DepartmentID, Lang, company } = useGlobalContext();
  const [TradeID, setTradeID] = useState(null);
  const [ProcedureTypeID, setProcedureTypeID] = useState(null);

  const { data: PriorityList } = useDropDown(
    'api_ms_Priority_List',
    { DepartmentID: DepartmentID, CompanyID: company, LangID: Lang },
    'PriorityID',
    'PriorityName'
  );

  const { data: PeriodList } = useDropDown(
    'api_ms_Periods_List',
    { LocationID: DepartmentID, LangID: Lang },
    'PeriodID',
    'PeriodName'
  );
  const { data: employeeData } = useDropDown(
    'api_ms_Employees_ListForWo',
    { DepartmentID: DepartmentID },
    'StaffID',
    'StaffName'
  );
  const { data: Trade } = useDropDown(
    'api_ms_Trade_List_pm',
    { DepartmentID: DepartmentID, LangID: Lang },
    'TradeID',
    'TradeName'
  );

  const { data: ProcedureType } = useDropDown(
    'api_ms_Procedures_Types_List',
 { DepartmentID: DepartmentID, CompanyID: company , LangID: Lang  },
    'ProcedureTypeID',
    'ProcedureTypeName'
  );

  return (
    <MainLayout title={SchedulePreventiveMaintenanceLang.pageTitle[Lang]} className="">
      <View className="my-3 gap-4 px-3">
        <Dropdown
          placeholder={SchedulePreventiveMaintenanceLang.TradeChoose[Lang]}
          title={SchedulePreventiveMaintenanceLang.Trade[Lang]}
          data={Trade}
          initailOption={Trade[0]?.key}
          value={TradeID}
          onChange={(e) => {
            setTradeID(e);
            setTradeID(e);
          }}
        />

        <Dropdown
          placeholder={SchedulePreventiveMaintenanceLang.ProcedureTypeChoose[Lang]}
          title={SchedulePreventiveMaintenanceLang.Procedure[Lang]}
          data={ProcedureType}
          initailOption={ProcedureType[0]?.key}
          value={ProcedureTypeID}
          onChange={(e) => {
            setProcedureTypeID(e);
            setProcedureTypeID(e);
          }}
        />
      </View>

      <View className="flex-1">
        <MainGrid
          pk={'ScheduleID'}
          spTrx={'api_ms_Schedule_Trx'}
          spIns={'api_ms_Schedule_Ins'}
          spUpd={'api_ms_Schedule_Upd'}
          spDel={'api_ms_Schedule_Del'}
          TrxParam={[
            { name: 'DepartmentID', value: DepartmentID },
            { name: 'TradeID', value: TradeID },
            { name: 'ProcedureTypeID', value: ProcedureTypeID },
            { name: 'IsSm', value: 0 },
            { name: 'LangID', value: Lang },
          ]}
          StaticWidth
          InsBody={{
            DepartmentID,
            TradeID,
            TargetTypeID: 3,
            IsSm: 0,
            ProcedureTypeID,
            LangID: Lang,
          }}
          UpdBody={{ DepartmentID, TargetTypeID: 3, IsSm: 0, ProcedureTypeID }}
          DelParam={[
            { rowData: true, name: 'ScheduleID', value: 'ScheduleID' },
            { name: 'DepartmentID', value: DepartmentID },
          ]}
          TrxDependency={[TradeID, ProcedureTypeID]}
          routeTo={{
            path: 'SchedulePreventiveMaintenanceDetails',
            hasParams: true,
            params: {
              DepartmentID: DepartmentID,
              TradeID: TradeID,
            },
          }}
          tableHead={[
            {
              key: 'ScheduleID',
            },
            {
              key: 'ScheduleCode',
              label: `${SchedulePreventiveMaintenanceLang.ScheduleCode[Lang]}`,
              input: 'true',
              visible: 'true',
              width: 100,
            },
            {
              key: 'ScheduleName',
              label: `${SchedulePreventiveMaintenanceLang.ScheduleName[Lang]}`,
              input: 'true',
              visible: 'true',
              width: 200,
            },
            {
              key: 'TargetTypeID',
            },
            {
              key: 'PriorityID',
              label: `${SchedulePreventiveMaintenanceLang.PriorityName[Lang]}`,
              type: 'dropdown',
              options: PriorityList,
              input: 'true',
              visible: 'false',
              width: 100,
            },
            {
              key: 'PriorityName',
              label: `${SchedulePreventiveMaintenanceLang.PriorityName[Lang]}`,
              type: 'dropdown',
              input: 'false',
              visible: 'true',
              width: 100,
            },
            {
              key: 'IsActive',
              label: `${SchedulePreventiveMaintenanceLang.IsActive[Lang]}`,
              type: 'checkbox',
              input: 'true',
              visible: 'true',
              width: 100,
            },
            {
              key: 'StartIssueWODate',
              label: `${SchedulePreventiveMaintenanceLang.StartIssueWODate[Lang]}`,
              type: 'date',
              input: 'true',
              visible: 'true',
              width: 100,
            },
            {
              key: 'PeriodName',
              label: `${SchedulePreventiveMaintenanceLang.Period[Lang]}`,
              type: 'dropdown',
              input: 'false',
              visible: 'true',
              width: 100,
            },
            {
              key: 'PeriodID',
              label: `${SchedulePreventiveMaintenanceLang.Period[Lang]}`,
              type: 'dropdown',
              options: PeriodList,
              input: 'true',
              visible: 'false',
              width: 100,
            },
            {
              key: 'PeriodDays',
              label: `${SchedulePreventiveMaintenanceLang.PeriodDays[Lang]}`,
              type: 'number',
              input: 'false',
              visible: 'true',
              width: 100,
            },
            {
              key: 'WorkingDays',
              label: `${SchedulePreventiveMaintenanceLang.WorkingDays[Lang]}`,
              type: 'number',
              input: 'true',
              visible: 'true',
              width: 100,
              required: true,
            },
            {
              key: 'AdjustDays',
              label: `${SchedulePreventiveMaintenanceLang.AdjustDays[Lang]}`,
              type: 'checkbox',
              input: 'true',
              visible: 'true',
              width: 100,
            },
            {
              key: 'ExecludeHolidays',
              label: `${SchedulePreventiveMaintenanceLang.ExecludeHolidays[Lang]}`,
              type: 'checkbox',
              input: 'true',
              visible: 'true',
              width: 100,
            },
            {
              key: 'ShiftWoDates',
              label: `${SchedulePreventiveMaintenanceLang.ShiftWoDates[Lang]}`,
              type: 'checkbox',
              input: 'true',
              visible: 'true',
              width: 100,
            },
            {
              key: 'AssignedEmployeeID',
              label: `${SchedulePreventiveMaintenanceLang.AssignedEmployee[Lang]}`,
              type: 'dropdown',
              options: employeeData,
              input: 'true',
              visible: 'false',
              width: 100,
            },
            {
              key: 'AssignedEmployeeName',
              label: `${SchedulePreventiveMaintenanceLang.AssignedEmployee[Lang]}`,
              type: 'dropdown',
              input: 'false',
              visible: 'true',
              width: 300,
            },
            {
              key: 'NoOfYears',
              label: '',
              type: '',
              input: 'false',
              visible: 'false',
              width: 100,
            },
          ]}
        />
      </View>
    </MainLayout>
  );
};

export default SchedulePreventiveMaintenance;
