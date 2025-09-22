import { View, ScrollView } from 'react-native';
import { SmallButton, MainLayout } from '../../../../components';

import { useGlobalContext } from '../../../../context/GlobalProvider';

import { useRouter } from 'expo-router';

const UnitsAssetsHomeLang = {
  Assets: {
    1: 'الاصول',
    2: 'Assets',
  },

  AdditionalLocationData: {
    1: 'تعريف البيانات الاضافيه  للموقع',
    2: 'Location Additional Data Definitions',
  },

  LocationsData: {
    1: 'بيانات المواقع',
    2: 'Locations Data',
  },

  AssetsData: {
    1: 'بيانات الاصول',
    2: 'Assets Data',
  },
};

const UnitsAssetsHome = () => {
  const { Lang } = useGlobalContext();

  const router = useRouter();

  return (
    <MainLayout title={UnitsAssetsHomeLang.Assets[Lang]}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="m-auto flex-row-reverse flex-wrap items-center justify-center gap-6 px-4">
          <SmallButton
            title={UnitsAssetsHomeLang.AdditionalLocationData[Lang]}
            handlePress={() => {
              router.navigate({
                pathname: 'LocationAdditional',
              });
            }}
          />

          <SmallButton
            title={UnitsAssetsHomeLang.LocationsData[Lang]}
            handlePress={() => {
              router.navigate({
                pathname: 'Locations',
              });
            }}
          />

          <SmallButton
            title={UnitsAssetsHomeLang.AssetsData[Lang]}
            handlePress={() => {
              router.navigate({
                pathname: 'Assets',
              });
            }}
          />
        </View>
      </ScrollView>
    </MainLayout>
  );
};

export default UnitsAssetsHome;
