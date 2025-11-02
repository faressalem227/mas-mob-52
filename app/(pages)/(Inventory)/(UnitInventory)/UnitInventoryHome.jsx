import { View, ScrollView } from 'react-native';
import { MainLayout, SmallButton } from '../../../../components';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import { useRouter } from 'expo-router';

const UnitInventoryHomeLang = {
  Inventory: {
    1: 'المخازن',
    2: 'Stores',
  },

  StockItems: {
    1: 'بيانات الاصناف',
    2: 'Stock Items',
  },

  InventoryTransaction: {
    1: 'حركه المخزن',
    2: 'Inventory Transaction',
  },
};

const UnitInventoryHome = () => {
  const { Lang, Rtl } = useGlobalContext();

  const router = useRouter();
  return (
    <MainLayout title={UnitInventoryHomeLang.Inventory[Lang]}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className={`m-auto ${Rtl ? 'flex-row-reverse' : 'flex-row'} flex-wrap gap-3`}>
          <SmallButton
            title={UnitInventoryHomeLang.StockItems[Lang]}
            handlePress={() => router.navigate('UnitStockItems')}
          />

          <SmallButton
            title={UnitInventoryHomeLang.InventoryTransaction[Lang]}
            handlePress={() => router.navigate('StoreTransactions')}
          />
        </View>
      </ScrollView>
    </MainLayout>
  );
};

export default UnitInventoryHome;
