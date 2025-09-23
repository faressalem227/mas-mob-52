import { View, Text } from 'react-native';
import { MainLayout, MainGrid } from '../../../../components';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import { useLocalSearchParams } from 'expo-router';

const MonthlyAssetMaintenanceLang = {
  MonthlyAssetMaintenance: {
    1: 'بيانات الصيانه الشهريه',
    2: 'Monthly Maintenance Data',
  },
};

const MonthlyAssetMaintenance = () => {
  const { Lang } = useGlobalContext();
  return (
    <MainLayout title={MonthlyAssetMaintenanceLang.MonthlyAssetMaintenance[Lang]}>
      <Text>MonthlyAssetMaintenance</Text>
    </MainLayout>
  );
};

export default MonthlyAssetMaintenance;
