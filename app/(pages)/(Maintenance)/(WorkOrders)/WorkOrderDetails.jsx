/* eslint-disable eqeqeq */
import { View, ScrollView } from 'react-native';
import { MainLayout, SmallButton } from '../../../../components';
import { useRouter, useLocalSearchParams } from 'expo-router';
import WorkOrderDetailsLang from '../../../../constants/Lang/Maintenance/WorkOrders/WorkOrderDetails';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import InfoDetailes from '../../../../components/UI/InfoDetailes';

const WorkOrderDetails = () => {
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
    Safety,
    ProcdureID,
    IsNetwork,
    MainWorkorderID,
    PlannedStartDate,
    PlannedEndDate,
    ScheduleID,
    WorksDone,
    IsSm,
    ...restParams
  } = useLocalSearchParams();
  const { Lang, Rtl } = useGlobalContext();
  const router = useRouter();

  const detailsData = [
    { label: WorkOrderDetailsLang.WorkorderCode[Lang], value: WorkorderCode },
    { label: WorkOrderDetailsLang.WorkorderName[Lang], value: WorkorderName },
    { label: WorkOrderDetailsLang.WorkorderTypeName[Lang], value: WorkorderTypeName },
    { label: WorkOrderDetailsLang.WorkorderStatusName[Lang], value: WorkorderStatusName },
  ];

  console.log(PlannedStartDate);

  const preventCrud = !(WorkorderStatusID === 4 || WorkorderStatusID === 3);
  return (
    <MainLayout title={WorkOrderDetailsLang.pageTitle[Lang]} className="">
      <View className="flex-1">
        <InfoDetailes details={detailsData} />
        <ScrollView className="pb-14">
          <View
            className={`m-auto ${Rtl ? 'flex-row-reverse' : 'flex-row'} flex-wrap items-center justify-center gap-4`}>
            {/* <SmallButton
              title={WorkOrderDetailsLang.pageTitle[Lang]}
              handlePress={() => {
                router.navigate({
                  pathname: './WorkOrderDetails2',
                  params: {
                    TradeID,
                    LocationID,
                    WorkorderID,
                    FailureDescription,
                    WorkorderCode,
                    WorkorderName,
                    WorkorderTypeID,
                    WorkorderTypeName,
                    WorkorderStatusName,
                    preventCrud,
                    ...restParams,
                  },
                });
              }}
            /> */}

            {WorkorderTypeID != 1 && (
              <SmallButton
                title={WorkOrderDetailsLang.Safety[Lang]}
                handlePress={() => {
                  router.navigate({
                    pathname: './Safety',
                    params: {
                      TradeID,
                      LocationID,
                      WorkorderID,
                      FailureDescription,
                      WorkorderCode,
                      WorkorderName,
                      WorkorderTypeID,
                      WorkorderTypeName,
                      WorkorderStatusName,
                      preventCrud,
                      ProcdureID,
                      ...restParams,
                    },
                  });
                }}
              />
            )}

            {(WorkorderTypeID == 1 || WorkorderTypeID == 4) && IsNetwork == 'false' && (
              <SmallButton
                title={WorkOrderDetailsLang.WorkOrderAssets[Lang]}
                handlePress={() => {
                  router.navigate({
                    pathname: './WorkOrderAssets',
                    params: {
                      TradeID,
                      LocationID,
                      WorkorderID,
                      FailureDescription,
                      WorkorderCode,
                      WorkorderName,
                      WorkorderTypeID,
                      WorkorderTypeName,
                      WorkorderStatusID,
                      WorkorderStatusName,
                      preventCrud,
                      MainWorkorderID,
                      ...restParams,
                    },
                  });
                }}
              />
            )}

            {(WorkorderTypeID == 3 ||
              (WorkorderTypeID == 4 && WorkorderTypeID == 1 && IsNetwork == 'true')) && (
              <SmallButton
                title={WorkOrderDetailsLang.contractorAssets[Lang]}
                handlePress={() => {
                  router.navigate({
                    pathname: './ContractorAssets',
                    params: {
                      TradeID,
                      LocationID,
                      WorkorderID,
                      FailureDescription,
                      WorkorderCode,
                      WorkorderName,
                      WorkorderTypeID,
                      WorkorderTypeName,
                      WorkorderStatusID,
                      WorkorderStatusName,
                      preventCrud,
                      ...restParams,
                    },
                  });
                }}
              />
            )}

            {WorkorderTypeID == 1 && IsNetwork == 'true' && (
              <SmallButton
                title={WorkOrderDetailsLang.NetworkAssets[Lang]}
                handlePress={() => {
                  router.navigate({
                    pathname: './NetworkAssets',
                    params: {
                      TradeID,
                      LocationID,
                      WorkorderID,
                      FailureDescription,
                      WorkorderCode,
                      WorkorderName,
                      WorkorderTypeID,
                      WorkorderTypeName,
                      WorkorderStatusID,
                      WorkorderStatusName,
                      preventCrud,
                      ...restParams,
                    },
                  });
                }}
              />
            )}

            {/* Labor, spare parts and contracting plan */}
            {WorkorderTypeID != 3 && (
              <SmallButton
                title={WorkOrderDetailsLang.contracting[Lang]}
                handlePress={() => {
                  router.navigate({
                    pathname: './Contracting',
                    params: {
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
                      preventCrud,
                      ...restParams,
                    },
                  });
                }}
              />
            )}

            {WorkorderTypeName === 'Corrective Maintenance' && (
              <SmallButton
                title={WorkOrderDetailsLang.CorrectiveMaintenance[Lang]}
                handlePress={() => {
                  router.navigate({
                    pathname: './CorrectiveMaintenance',
                    params: {
                      TradeID,
                      LocationID,
                      WorkorderID,
                      FailureDescription,
                      WorkorderCode,
                      WorkorderName,
                      WorkorderTypeID,
                      WorkorderTypeName,
                      WorkorderStatusName,
                      PlannedStartDate,
                      PlannedEndDate,
                      ScheduleID,
                      preventCrud,
                      ...restParams,
                    },
                  });
                }}
              />
            )}

            {WorkorderTypeID == 1 && (
              <SmallButton
                title={WorkOrderDetailsLang.RegularMaintenance[Lang]}
                handlePress={() => {
                  router.navigate({
                    pathname: './RegularMaintenance',
                    params: {
                      TradeID,
                      LocationID,
                      WorkorderID,
                      FailureDescription,
                      WorkorderCode,
                      WorkorderName,
                      WorkorderTypeID,
                      WorkorderTypeName,
                      WorkorderStatusName,
                      PlannedStartDate,
                      PlannedEndDate,
                      ScheduleID,
                      preventCrud,
                      WorksDone,
                      WorkorderStatusID,
                      ...restParams,
                    },
                  });
                }}
              />
            )}

            <SmallButton
              title={WorkOrderDetailsLang.Employment[Lang]}
              handlePress={() => {
                router.navigate({
                  pathname: './Employment',
                  params: {
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
                    preventCrud,
                    ...restParams,
                  },
                });
              }}
            />

            <SmallButton
              title={WorkOrderDetailsLang.StockItems[Lang]}
              handlePress={() => {
                router.navigate({
                  pathname: './StockItems',
                  params: {
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
                    ...restParams,
                  },
                });
              }}
            />

            <SmallButton
              title={WorkOrderDetailsLang.Services[Lang]}
              handlePress={() => {
                router.navigate({
                  pathname: 'Services',
                  params: {
                    TradeID,
                    LocationID,
                    WorkorderID,
                    FailureDescription,
                    WorkorderCode,
                    WorkorderName,
                    WorkorderTypeID,
                    WorkorderTypeName,
                    WorkorderStatusName,
                    preventCrud,
                    ...restParams,
                  },
                });
              }}
            />

            {/* Contractors / Extracts */}
            <SmallButton
              title={WorkOrderDetailsLang.Extracts[Lang]}
              handlePress={() => {
                router.navigate({
                  pathname: 'Contracts',
                  params: {
                    TradeID,
                    LocationID,
                    WorkorderID,
                    FailureDescription,
                    WorkorderCode,
                    WorkorderName,
                    WorkorderTypeID,
                    WorkorderTypeName,
                    WorkorderStatusName,
                    preventCrud,
                    ...restParams,
                  },
                });
              }}
            />

            {/* Assays */}
            <SmallButton
              title={WorkOrderDetailsLang.Assays[Lang]}
              handlePress={() => {
                router.navigate({
                  pathname: 'Assays',
                  params: {
                    TradeID,
                    LocationID,
                    WorkorderID,
                    FailureDescription,
                    WorkorderCode,
                    WorkorderName,
                    WorkorderTypeID,
                    WorkorderTypeName,
                    WorkorderStatusName,
                    preventCrud,
                    ...restParams,
                  },
                });
              }}
            />

            {/* Work order works  */}
            <SmallButton
              title={WorkOrderDetailsLang.works[Lang]}
              handlePress={() => {
                router.navigate({
                  pathname: 'Works',
                  params: {
                    TradeID,
                    LocationID,
                    WorkorderID,
                    FailureDescription,
                    WorkorderCode,
                    WorkorderName,
                    WorkorderTypeID,
                    WorkorderTypeName,
                    WorkorderStatusName,
                    preventCrud,
                    ...restParams,
                  },
                });
              }}
            />

            {/* Work order follow  */}
            <SmallButton
              title={WorkOrderDetailsLang.follow[Lang]}
              handlePress={() => {
                router.navigate({
                  pathname: 'Follow',
                  params: {
                    TradeID,
                    LocationID,
                    WorkorderID,
                    FailureDescription,
                    WorkorderCode,
                    WorkorderName,
                    WorkorderTypeID,
                    WorkorderTypeName,
                    WorkorderStatusName,
                    preventCrud,
                    ...restParams,
                  },
                });
              }}
            />

            {/* Work order permits */}
            <SmallButton
              title={WorkOrderDetailsLang.permits[Lang]}
              handlePress={() => {
                router.navigate({
                  pathname: 'Permits',
                  params: {
                    TradeID,
                    LocationID,
                    WorkorderID,
                    FailureDescription,
                    WorkorderCode,
                    WorkorderName,
                    WorkorderTypeID,
                    WorkorderTypeName,
                    WorkorderStatusName,
                    preventCrud,
                    ...restParams,
                  },
                });
              }}
            />

            {/* Work order expenses  */}
            <SmallButton
              title={WorkOrderDetailsLang.expenses[Lang]}
              handlePress={() => {
                router.navigate({
                  pathname: './Expenses',
                  params: {
                    TradeID,
                    LocationID,
                    WorkorderID,
                    FailureDescription,
                    WorkorderCode,
                    WorkorderName,
                    WorkorderTypeID,
                    WorkorderTypeName,
                    WorkorderStatusName,
                    preventCrud,
                    ...restParams,
                  },
                });
              }}
            />
            {/* Work order Quality  */}
            <SmallButton
              title={WorkOrderDetailsLang.Quality[Lang]}
              handlePress={() => {
                router.navigate({
                  pathname: './Quality',
                  params: {
                    TradeID,
                    LocationID,
                    WorkorderID,
                    FailureDescription,
                    WorkorderCode,
                    WorkorderName,
                    WorkorderTypeID,
                    WorkorderTypeName,
                    WorkorderStatusName,
                    preventCrud,
                    ...restParams,
                  },
                });
              }}
            />
            <SmallButton
              title={WorkOrderDetailsLang.cost[Lang]}
              handlePress={() => {
                router.navigate({
                  pathname: './Cost',
                  params: {
                    TradeID,
                    LocationID,
                    WorkorderID,
                    FailureDescription,
                    WorkorderCode,
                    WorkorderName,
                    WorkorderTypeID,
                    WorkorderTypeName,
                    WorkorderStatusName,
                    preventCrud,
                    ...restParams,
                  },
                });
              }}
            />

            {WorkorderStatusID != 3 && (
              <SmallButton
                title={WorkOrderDetailsLang.WorkOrderCancel[Lang]}
                handlePress={() => {
                  router.navigate({
                    pathname: './WorkOrderCancel',
                    params: {
                      TradeID,
                      LocationID,
                      WorkorderID,
                      FailureDescription,
                      WorkorderCode,
                      WorkorderName,
                      WorkorderTypeID,
                      WorkorderTypeName,
                      WorkorderStatusName,
                      preventCrud,
                      IsSm,
                      ...restParams,
                    },
                  });
                }}
              />
            )}

            {WorkorderStatusID !== 4 && (
              <SmallButton
                title={WorkOrderDetailsLang.WorkOrderClose[Lang]}
                handlePress={() => {
                  router.navigate({
                    pathname: './WorkOrderClose',
                    params: {
                      TradeID,
                      LocationID,
                      preventCrud: preventCrud,
                      WorkorderID,
                      FailureDescription,
                      WorkorderCode,
                      WorkorderName,
                      WorkorderTypeID,
                      WorkorderTypeName,
                      WorkorderStatusName,
                      WorkorderStatusID,
                      ...restParams,
                    },
                  });
                }}
              />
            )}
          </View>
        </ScrollView>
      </View>
    </MainLayout>
  );
};

export default WorkOrderDetails;
