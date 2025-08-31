import { useLocalSearchParams, useRouter } from 'expo-router';
import { View } from 'react-native';
import { MainLayout } from '../../../../components';
import InfoDetailes from '../../../../components/UI/InfoDetailes';
import SmallButton from '../../../../components/UI/SmallButton';
import SchedulePreventiveMaintenanceDetailsLang from '../../../../constants/Lang/Maintenance/PreventiveMaintenanceHome/SchedulePreventiveMaintenanceDetails';
import { useGlobalContext } from '../../../../context/GlobalProvider';
const SchedulePreventiveMaintenanceDetails = () => {
  const router = useRouter();
  const { Lang, Rtl } = useGlobalContext();
  const {
    TradeID,
    ScheduleCode,
    ScheduleName,
    PriorityName,
    NoOfYears,
    IsActive,
    StartIssueWODate,
    PeriodName,
    WorkingDays,
    PeriodDays,
    AdjustDays,
    ExecludeHolidays,
    AssignedEmployeeName,
    ShiftWoDates,
    ScheduleID,
    TradeName,
  } = useLocalSearchParams();

  const detailsData = [
    { label: SchedulePreventiveMaintenanceDetailsLang.ScheduleCode[Lang], value: ScheduleCode },
    { label: SchedulePreventiveMaintenanceDetailsLang.Trade[Lang], value: TradeName },
    { label: SchedulePreventiveMaintenanceDetailsLang.PriorityName[Lang], value: PriorityName },
    { label: SchedulePreventiveMaintenanceDetailsLang.ScheduleName[Lang], value: ScheduleName },
    { label: SchedulePreventiveMaintenanceDetailsLang.Period[Lang], value: PeriodName },
    { label: SchedulePreventiveMaintenanceDetailsLang.PeriodDays[Lang], value: PeriodDays },
    {
      label: SchedulePreventiveMaintenanceDetailsLang.StartIssueWODate[Lang],
      value: StartIssueWODate?.split('T')[0],
    },
    { label: SchedulePreventiveMaintenanceDetailsLang.WorkingDays[Lang], value: WorkingDays },
    { label: SchedulePreventiveMaintenanceDetailsLang.ShiftWoDates[Lang], value: ShiftWoDates },
    {
      label: SchedulePreventiveMaintenanceDetailsLang.AssignedEmployee[Lang],
      value: AssignedEmployeeName,
    },
    { label: SchedulePreventiveMaintenanceDetailsLang.AdjustDays[Lang], value: AdjustDays },
    { label: SchedulePreventiveMaintenanceDetailsLang.IsActive[Lang], value: IsActive },
    {
      label: SchedulePreventiveMaintenanceDetailsLang.ExecludeHolidays[Lang],
      value: ExecludeHolidays,
    },
  ];

  return (
    <MainLayout title={SchedulePreventiveMaintenanceDetailsLang.pageTitle[Lang]} className="">
      <View className="flex-1">
        <InfoDetailes details={detailsData} />
        <View
          className={`mt-20 ${Rtl ? 'flex-row-reverse' : 'flex-row'} items-center justify-center gap-4`}>
          <SmallButton
            title={SchedulePreventiveMaintenanceDetailsLang.ScheduleAsset[Lang]}
            handlePress={() => {
              router.navigate({
                pathname: 'ScheduleAssets',
                params: {
                  TradeID,
                  ScheduleCode,
                  ScheduleName,
                  PriorityName,
                  NoOfYears,
                  IsActive,
                  StartIssueWODate,
                  PeriodName,
                  WorkingDays,
                  PeriodDays,
                  AdjustDays,
                  ExecludeHolidays,
                  AssignedEmployeeName,
                  ShiftWoDates,
                  ScheduleID,
                  TradeName,
                },
              });
            }}
          />

          <SmallButton
            title={SchedulePreventiveMaintenanceDetailsLang.ScheduleAndWorkOrders[Lang]}
            handlePress={() => {
              router.navigate({
                pathname: 'ScheduleAndWorkOrders',
                params: {
                  TradeID,
                  ScheduleCode,
                  ScheduleName,
                  PriorityName,
                  NoOfYears,
                  IsActive,
                  StartIssueWODate,
                  PeriodName,
                  WorkingDays,
                  PeriodDays,
                  AdjustDays,
                  ExecludeHolidays,
                  AssignedEmployeeName,
                  ShiftWoDates,
                  ScheduleID,
                  TradeName,
                },
              });
            }}
          />
        </View>
      </View>
    </MainLayout>
  );
};

export default SchedulePreventiveMaintenanceDetails;
