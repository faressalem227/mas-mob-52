import { View } from 'react-native';
import { MainLayout } from '../../../../components';
import { useRouter, useLocalSearchParams } from 'expo-router';
import SmallButton from '../../../../components/UI/SmallButton';
import WorkOrderDetailsLang from '../../../../constants/Lang/Maintenance/WorkOrders/WorkOrderDetails';
import { useGlobalContext } from '../../../../context/GlobalProvider';

const Contracting = () => {
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
    ...restParams
  } = useLocalSearchParams();

  const { Lang, Rtl } = useGlobalContext();
  const router = useRouter();

  const preventCrud = !(WorkorderStatusID === 4 || WorkorderStatusID === 3);
  return (
    <MainLayout title={WorkOrderDetailsLang.contracting[Lang]}>
      <View
        className={`mt-20 flex-1 gap-4 ${Rtl ? 'flex-row-reverse' : 'flex-row'} flex-wrap items-center justify-center`}>
        {/* <SmallButton
          title={WorkOrderDetailsLang.settings[Lang]}
          handlePress={() => {
            router.navigate({
              pathname: './Settings',
              params: {
                TradeID,
                LocationID: LocationID,
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

        <SmallButton
          title={WorkOrderDetailsLang.Labors[Lang]}
          handlePress={() => {
            router.navigate({
              pathname: './Labors',
              params: {
                TradeID,
                LocationID: LocationID,
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
          title={WorkOrderDetailsLang.Serviceschart[Lang]}
          handlePress={() => {
            router.navigate({
              pathname: './Serviceschart',
              params: {
                TradeID,
                LocationID: LocationID,
                WorkorderID,
                FailureDescription,
                WorkorderCode,
                WorkorderName,
                WorkorderTypeID,
                WorkorderTypeName,
                WorkorderStatusName,
                preventCrud,
                WorkorderStatusID,
                ...restParams,
              },
            });
          }}
        />

        <SmallButton
          title={WorkOrderDetailsLang.ContractsChart[Lang]}
          handlePress={() => {
            router.navigate({
              pathname: './ContractsChart',
              params: {
                TradeID,
                LocationID: LocationID,
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
      </View>
    </MainLayout>
  );
};

export default Contracting;
