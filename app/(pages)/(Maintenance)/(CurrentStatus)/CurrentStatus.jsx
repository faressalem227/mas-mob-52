import { View } from 'react-native';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import HealthAndSafetyLang from '../../../../constants/Lang/Maintenance/HealthAndSafety';
import { MainLayout, SmallButton } from '../../../../components';
import { useRouter } from 'expo-router';

const CurrentStatus = () => {
  const { DepartmentID, Lang, Rtl } = useGlobalContext();

  const router = useRouter();

  return (
    <MainLayout title={HealthAndSafetyLang.CurrentStatus[Lang]}>
      <View className="flex-1 justify-center">
        <View
          className={`${Rtl ? 'flex-row-reverse' : 'flex-row'} flex-wrap justify-center gap-3 px-4`}>
          <SmallButton
            title={HealthAndSafetyLang.statistics[Lang]}
            handlePress={() => {
              router.navigate({
                pathname: 'Statistics',
              });
            }}
          />

          <SmallButton
            title={HealthAndSafetyLang.SuspendedAssets[Lang]}
            handlePress={() => {
              router.navigate({
                pathname: 'SuspendedAssets',
                params: { DepartmentID },
              });
            }}
          />

          <SmallButton
            title={HealthAndSafetyLang.SparePartsRequired[Lang]}
            handlePress={() => {
              router.navigate({
                pathname: 'SparePartsRequired',
                params: { DepartmentID },
              });
            }}
          />

          <SmallButton
            title={HealthAndSafetyLang.ServicesRequired[Lang]}
            handlePress={() => {
              router.navigate({
                pathname: 'ServicesRequired',
                params: { DepartmentID },
              });
            }}
          />

          <SmallButton
            title={HealthAndSafetyLang.SparePartsExceeding[Lang]}
            handlePress={() => {
              router.navigate({
                pathname: './StatusTabs/SparePartsExceeding',
                params: { DepartmentID },
              });
            }}
          />
        </View>
      </View>
    </MainLayout>
  );
};

export default CurrentStatus;
