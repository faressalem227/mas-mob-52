import { View, ScrollView } from 'react-native';
import { MainLayout, InfoDetailes } from '../../../../components';
import { useLocalSearchParams, useRouter } from 'expo-router';
import SmallButton from '../../../../components/UI/SmallButton';
import PreventiveMaintenanceDetailsLang from '../../../../constants/Lang/Maintenance/PreventiveMaintenanceHome/PreventiveMaintenanceDetails';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const PreventiveMaintenanceDetails = ({ route }) => {
  const router = useRouter();
  const { Lang } = useGlobalContext();

  const {
    ProcedureID,
    ProcedureCode,
    ProcedureName,
    PeriodName,
    TradeID,
    EstimatedLaborHours,
    TradeName,
    PriorityName,
    ProcedureTypeName,
    SafetyID,
    Tasks,
  } = useLocalSearchParams();

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
    <MainLayout title={PreventiveMaintenanceDetailsLang.pageTitle[Lang]} className="">
      <View className="flex-1 flex-col bg-white ">
        <InfoDetailes details={detailsData} />
        <ScrollView>
          <View
            className="m-auto mb-16 flex-1 flex-row-reverse flex-wrap items-center justify-center "
            style={{ gap: hp('1.5%') }}>
            <SmallButton
              title={PreventiveMaintenanceDetailsLang.SafetyInstructions[Lang]}
              handlePress={() => {
                router.navigate({
                  pathname: 'PreventiveSafety',
                  params: {
                    ProcedureID,
                    ProcedureCode,
                    ProcedureName,
                    PeriodName,
                    TradeID,
                    EstimatedLaborHours,
                    TradeName,
                    PriorityName,
                    ProcedureTypeName,
                    SafetyID,
                  },
                });
              }}
            />
            <SmallButton
              title={PreventiveMaintenanceDetailsLang.PreventiveMaintenanceTasks[Lang]}
              handlePress={() => {
                router.navigate({
                  pathname: 'PreventiveMaintenanceTasks',
                  params: {
                    ProcedureID,
                    ProcedureCode,
                    ProcedureName,
                    PeriodName,
                    TradeID,
                    EstimatedLaborHours,
                    TradeName,
                    PriorityName,
                    ProcedureTypeName,
                  },
                });
              }}
            />

            <SmallButton
              title={PreventiveMaintenanceDetailsLang.PreventiveMaintenanceLaborJobs[Lang]}
              handlePress={() => {
                router.navigate({
                  pathname: 'PreventiveMaintenanceLaborJobs',
                  params: {
                    ProcedureID,
                    ProcedureCode,
                    ProcedureName,
                    PeriodName,
                    TradeID,
                    EstimatedLaborHours,
                    TradeName,
                    PriorityName,
                    ProcedureTypeName,
                    SafetyID,
                  },
                });
              }}
            />
            <SmallButton
              title={PreventiveMaintenanceDetailsLang.ProcedurerequiredTasks[Lang]}
              handlePress={() => {
                router.navigate({
                  pathname: 'ProcedureRequiredTasks',
                  params: {
                    ProcedureID,
                    ProcedureCode,
                    ProcedureName,
                    PeriodName,
                    TradeID,
                    EstimatedLaborHours,
                    TradeName,
                    PriorityName,
                    ProcedureTypeName,
                    SafetyID,
                    Tasks,
                  },
                });
              }}
            />

            <SmallButton
              title={PreventiveMaintenanceDetailsLang.PreventiveMaintenanceServices[Lang]}
              handlePress={() => {
                router.navigate({
                  pathname: 'PreventiveMaintenanceServices',
                  params: {
                    ProcedureID,
                    ProcedureCode,
                    ProcedureName,
                    PeriodName,
                    TradeID,
                    EstimatedLaborHours,
                    TradeName,
                    PriorityName,
                    ProcedureTypeName,
                  },
                });
              }}
            />
            <SmallButton
              title={PreventiveMaintenanceDetailsLang.PreventiveMaintenanceStockItems[Lang]}
              handlePress={() => {
                router.navigate({
                  pathname: 'PreventiveMaintenanceStockItems',
                  params: {
                    ProcedureID,
                    ProcedureCode,
                    ProcedureName,
                    PeriodName,
                    TradeID,
                    EstimatedLaborHours,
                    TradeName,
                    PriorityName,
                    ProcedureTypeName,
                  },
                });
              }}
            />
            <SmallButton
              title={PreventiveMaintenanceDetailsLang.PreventiveMaintenanceContracts[Lang]}
              handlePress={() => {
                router.navigate({
                  pathname: 'PreventiveMaintenanceContracts',
                  params: {
                    ProcedureID,
                    ProcedureCode,
                    ProcedureName,
                    PeriodName,
                    TradeID,
                    EstimatedLaborHours,
                    TradeName,
                    PriorityName,
                    ProcedureTypeName,
                  },
                });
              }}
            />
          </View>
        </ScrollView>
      </View>
    </MainLayout>
  );
};

export default PreventiveMaintenanceDetails;
