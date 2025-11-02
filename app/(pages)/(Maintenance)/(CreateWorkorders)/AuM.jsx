import { MainLayout, MainGrid, InfoDetailes } from '../../../../components';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import { useLocalSearchParams } from 'expo-router';
import CreateWorkOrdersLang from '../../../../constants/Lang/Maintenance/PreventiveMaintenanceHome/CreateWorkOrders';
import { View } from 'react-native';

const Pm = () => {
  const { user, DepartmentID, Lang, company } = useGlobalContext();
  const { DateTo, DateFrom, TradeID, ProcedureTypeID, TradeName, IsSm } = useLocalSearchParams();

  const detailsData = [
    {
      label: CreateWorkOrdersLang.StartDate[Lang],
      value: DateFrom,
    },
    {
      label: CreateWorkOrdersLang.EndDate[Lang],
      value: DateTo,
    },
    {
      label: CreateWorkOrdersLang.Trade[Lang],
      value: TradeName,
    },
  ];

  return (
    <MainLayout title={CreateWorkOrdersLang.automaticMs[Lang]}>
      <View className="flex-1">
        <InfoDetailes details={detailsData} />

        <MainGrid
          hasCrud={false}
          pk={'ScheduleDetailsID'}
          spTrx={'api_ms_Schedule_Details_auto_Trx'}
          TrxParam={[
            { name: 'CompanyID', value: company },
            { name: 'DepartmentID', value: DepartmentID },
            { name: 'TradeID', value: TradeID },
            { name: 'ProcedureTypeID', value: ProcedureTypeID },
            { name: 'DateFrom', value: DateFrom },
            { name: 'DateTo', value: DateTo },
            { name: 'UserName', value: user.username },
            { name: 'LangID', value: Lang },
            { name: 'IsSm', value: IsSm },
          ]}
          TrxDependency={[TradeID, ProcedureTypeID, DateFrom, DateTo]}
          StaticWidth
          tableHead={[
            {
              key: 'ScheduleDetailsID',
            },
            {
              key: 'ScheduleID',
            },
            {
              key: 'ScheduleName',
              label: CreateWorkOrdersLang.ScheduleName[Lang],
              width: 260,
              visible: true,
            },
            {
              key: 'PlannedStartDate',
              label: CreateWorkOrdersLang.PlannedStartDate[Lang],
              type: 'date',
              visible: true,
              width: 150,
            },
            {
              key: 'PlannedEndDate',
              label: CreateWorkOrdersLang.PlannedEndDate[Lang],
              type: 'date',
              visible: true,
              width: 150,
            },
            {
              key: 'WorkorderCounter',
              label: CreateWorkOrdersLang.Counter[Lang],
              type: 'number',
              visible: true,
              width: 120,
            },
            {
              key: 'LabourCost',
              label: CreateWorkOrdersLang.LaborCost[Lang],
              type: 'number',
              visible: true,
              width: 120,
            },
            {
              key: 'MaterialCost',
              label: CreateWorkOrdersLang.MaterialCost[Lang],
              type: 'number',
              visible: true,
              width: 130,
            },
            // {
            //   key: 'WorkorderCode',
            //   label: CreateWorkOrdersLang.WorkorderCode[Lang],
            //   visible: true,
            //   width: 110,
            // },
            {
              key: 'GenerateWODateStart',
              label: CreateWorkOrdersLang.GenerateWODateStart[Lang],
              type: 'date',
              visible: true,
              width: 150,
            },
            {
              key: 'GenerateWODateEnd',
              label: CreateWorkOrdersLang.GenerateWODateEnd[Lang],
              type: 'date',
              visible: true,
              width: 150,
            },
            {
              key: 'GenerateWOUserName',
              label: CreateWorkOrdersLang.GenerateWOUserName[Lang],
              visible: true,
              width: 150,
            },
            {
              key: 'ServiceCost',
              label: CreateWorkOrdersLang.ServiceCost[Lang],
              type: 'number',
              visible: true,
              width: 150,
            },
            {
              key: 'ContractorsCost',
              label: CreateWorkOrdersLang.ContractorsCost[Lang],
              type: 'number',
              visible: true,
              width: 150,
            },
            {
              key: 'Execluded',
              label: CreateWorkOrdersLang.Execluded[Lang],
              type: 'checkbox',
              input: true,
              visible: true,
              width: 90,
            },
            {
              key: 'ExecludReason',
              label: CreateWorkOrdersLang.ExecludReason[Lang],
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

export default Pm;
