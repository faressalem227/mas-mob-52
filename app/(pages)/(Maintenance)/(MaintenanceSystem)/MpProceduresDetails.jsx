import { View } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MainLayout, MainButton, InfoDetailes } from '../../../../components';
import MaintenanceSystem from '../../../../constants/Lang/Maintenance/MaintenanceSystem/MaintenanceSystem';
import { useGlobalContext } from '../../../../context/GlobalProvider';
const MpProceduresDetails = () => {
  const { Lang } = useGlobalContext();

  const { ProcedureID, ProcedureCode, ProcedureName, PeriodName, TradeName, TradeID, SafetyID } =
    useLocalSearchParams();

  const router = useRouter();

  const detailsData = [
    { label: MaintenanceSystem.procedureCode[Lang], value: ProcedureCode },
    { label: MaintenanceSystem.procedureName[Lang], value: ProcedureName },
    { label: MaintenanceSystem.trade[Lang], value: TradeName },
    { label: MaintenanceSystem.periodName[Lang], value: PeriodName },
  ];

  return (
    <MainLayout title={MaintenanceSystem.mpProcedureDetails[Lang]}>
      <InfoDetailes details={detailsData} />
      <View className="my-11 gap-5 px-5">
        <MainButton
          title={MaintenanceSystem.safety[Lang]}
          handlePress={() =>
            router.navigate({
              pathname: '/Safety',
              params: {
                ProcedureID,
                ProcedureCode,
                ProcedureName,
                PeriodName,
                TradeName,
                TradeID,
                SafetyID,
              },
            })
          }
        />

        <MainButton
          title={MaintenanceSystem.AssignedTasks[Lang]}
          handlePress={() =>
            router.navigate({
              pathname: '/AssignedTasks',
              params: {
                ProcedureID,
                ProcedureCode,
                ProcedureName,
                PeriodName,
                TradeName,
                TradeID,
                SafetyID,
              },
            })
          }
        />
      </View>
    </MainLayout>
  );
};

export default MpProceduresDetails;
