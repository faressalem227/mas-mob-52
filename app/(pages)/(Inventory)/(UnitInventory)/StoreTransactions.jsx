import { View, Text } from 'react-native';
import { MainLayout, Dropdown, MainButton } from '../../../../components';

import { useGlobalContext } from '../../../../context/GlobalProvider';
import { useDropDown } from '../../../../hooks/useDropDownData';

const StoreTransactionsLang = {
  InventoryTransaction: {
    1: 'حركه المخزن',
    2: 'Inventory Transaction',
  },
};

const StoreTransactions = () => {
  return <MainLayout title={StoreTransactionsLang.InventoryTransaction[Lang]}></MainLayout>;
};

export default StoreTransactions;
