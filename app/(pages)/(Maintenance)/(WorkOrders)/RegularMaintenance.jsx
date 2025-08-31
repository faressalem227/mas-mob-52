import { View, ScrollView } from 'react-native';
import SmallButton from '../../../../components/UI/SmallButton';

import { MainLayout } from '../../../../components';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import RegularMaintenanceLang from '../../../../constants/Lang/Maintenance/WorkOrders/RegularMaintenanceLang';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import InfoDetailes from '../../../../components/UI/InfoDetailes';

const RegularMaintenance = () => {
  const params = useLocalSearchParams() || {};
  const {
    TradeID,
    LocationID,
    WorkorderID,
    FailureDescription,
    WorkorderCode,
    WorkorderName,
    WorkorderTypeID,
    WorkorderTypeName,
    WorkorderStatusName,
    WorkorderStatusID,
    PlannedStartDate,
    PlannedEndDate,
    ScheduleID,
    Safety,
    WorksDone,
    ...restParams
  } = params;

  const { Lang } = useGlobalContext(); // Get the current language from global context
  const router = useRouter();

  const detailsData = [
    { label: RegularMaintenanceLang.WorkOrderDetails.WorkOrderCode[Lang], value: WorkorderCode },
    { label: RegularMaintenanceLang.WorkOrderDetails.WorkOrderName[Lang], value: WorkorderName },
    {
      label: RegularMaintenanceLang.WorkOrderDetails.WorkOrderType[Lang],
      value: WorkorderTypeName,
    },
    {
      label: RegularMaintenanceLang.WorkOrderDetails.WorkOrderStatus[Lang],
      value: WorkorderStatusName,
    },
  ];

  console.log(WorkorderStatusID);

  return (
    <MainLayout title={RegularMaintenanceLang.PageTitle[Lang]} className="">
      <View className="flex h-[100vh] flex-col bg-white">
        <InfoDetailes details={detailsData} />
        <ScrollView className="mb-14">
          <View className="m-auto flex flex-row-reverse flex-wrap items-center justify-center gap-4">
            <SmallButton
              title={RegularMaintenanceLang.InputFields.TechnicalReport[Lang]}
              handlePress={() => {
                router.navigate({
                  pathname: './TechnicalReport',
                  params: {
                    TradeID: TradeID,
                    LocationID: LocationID,
                    WorkorderID: WorkorderID,
                    FailureDescription: FailureDescription,
                    WorkorderCode: WorkorderCode,
                    WorkorderName: WorkorderName,
                    WorkorderTypeID: WorkorderTypeID,
                    WorkorderTypeName: WorkorderTypeName,
                    WorkorderStatusName: WorkorderStatusName,
                    PlannedStartDate,
                    PlannedEndDate,
                    ScheduleID,
                    WorkorderStatusID,
                    WorksDone,
                    ...restParams,
                  },
                });
              }}
            />

            <SmallButton
              title={RegularMaintenanceLang.WorkOrderSafty[Lang]}
              handlePress={() => {
                router.navigate({
                  pathname: './WorkOrderSafty',
                  params: {
                    TradeID: TradeID,
                    LocationID: LocationID,
                    WorkorderID: WorkorderID,
                    FailureDescription: FailureDescription,
                    WorkorderCode: WorkorderCode,
                    WorkorderName: WorkorderName,
                    WorkorderTypeID: WorkorderTypeID,
                    WorkorderTypeName: WorkorderTypeName,
                    WorkorderStatusName: WorkorderStatusName,
                    ...restParams,
                    Safety: Safety,
                  },
                });
              }}
            />

            <SmallButton
              title={RegularMaintenanceLang.WorkOrderTasks[Lang]}
              handlePress={() => {
                router.navigate({
                  pathname: './WorkOrderTasks',
                  params: {
                    TradeID: TradeID,
                    LocationID: LocationID,
                    WorkorderID: WorkorderID,
                    FailureDescription: FailureDescription,
                    WorkorderCode: WorkorderCode,
                    WorkorderName: WorkorderName,
                    WorkorderTypeID: WorkorderTypeID,
                    WorkorderTypeName: WorkorderTypeName,
                    WorkorderStatusName: WorkorderStatusName,
                    ...restParams,
                    Safety: Safety,
                    WorkorderStatusID,
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

export default RegularMaintenance;
