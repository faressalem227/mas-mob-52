import { View, Text } from 'react-native';
import { MainLayout, MainGrid } from '../../../../components';

import { useGlobalContext } from '../../../../context/GlobalProvider';

const AssetAdditionalDataLang = {
  AdditionalData: {
    1: 'البيانات الاضافيه',
    2: 'Additional Data',
  },
};

const AssetAdditionalData = () => {
  const { Lang } = useGlobalContext();
  return (
    <MainLayout title={AssetAdditionalDataLang.AdditionalData[Lang]}>
      <MainLayout />
    </MainLayout>
  );
};

export default AssetAdditionalData;
