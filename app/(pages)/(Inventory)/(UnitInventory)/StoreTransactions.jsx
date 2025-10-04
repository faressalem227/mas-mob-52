import { View, ScrollView } from 'react-native';
import { MainLayout, Dropdown, MainButton } from '../../../../components';

import { useGlobalContext } from '../../../../context/GlobalProvider';
import { useDropDown } from '../../../../hooks/useDropDownData';
import { useState } from 'react';
import { icons } from '../../../../constants';

import { useRouter } from 'expo-router';

const StoreTransactionsLang = {
  InventoryTransaction: {
    1: 'حركه المخزن',
    2: 'Inventory Transaction',
  },

  ItemsSection: {
    1: 'المخزن النوعي',
    2: 'Section',
  },

  OrderType: {
    1: 'نوع الاذن',
    2: 'Order Type',
  },

  Years: {
    1: 'السنه',
    2: 'Year',
  },

  Month: {
    1: 'الشهر',
    2: 'Month',
  },

  Next: {
    1: 'التالي',
    2: 'Next',
  },
};

const getFinancialYearId = (date = new Date()) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  return month < 7 ? year : year + 1;
};

const StoreTransactions = () => {
  const { Lang, company, user, dynamicStore, handleSetDynamicStore } = useGlobalContext();

  const [SectionID, setSectionID] = useState(dynamicStore?.Sc_SectionID || null);
  const [ProcessID, setProcessID] = useState(dynamicStore?.Sc_ProcessID || null);
  const [YearID, setYearID] = useState(dynamicStore?.Sc_YearID || null || getFinancialYearId());
  const [MonthID, setMonthID] = useState(dynamicStore?.Sc_MonthID || null);

  const router = useRouter();

  const { data: SectionData } = useDropDown(
    'Sc_Item_Section_List',
    {
      CompanyID: company,
      UserName: user.username,
      LangID: Lang,
    },
    'SectionID',
    'SectionName'
  );

  const { data: processData } = useDropDown(
    'sc_Process_List_MS',
    {
      CompanyID: company,
      UserName: user.username,
      LangID: Lang,
      IsPo: 0,
      SectionID,
    },
    'ProcessID',
    'ProcessName',
    [SectionID]
  );

  const { data: yearList } = useDropDown(
    'admin_Years_List',
    {
      CompanyID: company,
      UserName: user.username,
      LangID: Lang,
    },
    'YearID',
    'YearName'
  );

  const { data: MonthList } = useDropDown(
    'ms_Months_List_all',
    { CompanyID: company, UserName: user.username, LangID: Lang },
    'MonthID',
    'MonthName'
  );

  console.log('dynamicStore', dynamicStore);

  return (
    <MainLayout title={StoreTransactionsLang.InventoryTransaction[Lang]}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="my-5 gap-4 px-4">
          <Dropdown
            data={SectionData}
            title={StoreTransactionsLang.ItemsSection[Lang]}
            placeholder={StoreTransactionsLang.ItemsSection[Lang]}
            value={SectionID}
            initailOption={dynamicStore?.Sc_SectionID || SectionData?.[0]?.key}
            onChange={(value) => {
              handleSetDynamicStore('Sc_SectionID', value);
              setSectionID(value);
            }}
          />

          <Dropdown
            data={processData}
            title={StoreTransactionsLang.OrderType[Lang]}
            placeHolder={StoreTransactionsLang.OrderType[Lang]}
            value={ProcessID}
            onChange={(value) => {
              handleSetDynamicStore('Sc_ProcessID', value);
              setProcessID(value);
            }}
            initailOption={dynamicStore?.Sc_ProcessID || processData?.[0]?.key}
          />

          <Dropdown
            data={yearList}
            title={StoreTransactionsLang.Years[Lang]}
            placeHolder={StoreTransactionsLang.Years[Lang]}
            value={YearID}
            onChange={(value) => {
              handleSetDynamicStore('Sc_YearID', value);
              setYearID(value);
            }}
            initailOption={dynamicStore?.Sc_YearID || YearID}
          />

          <Dropdown
            data={MonthList}
            title={StoreTransactionsLang.Month[Lang]}
            placeHolder={StoreTransactionsLang.Month[Lang]}
            value={MonthID}
            onChange={(value) => {
              handleSetDynamicStore('Sc_MonthID', value);
              setMonthID(value);
            }}
            initailOption={dynamicStore?.Sc_MonthID || MonthList?.[0]?.key || 0}
          />
        </View>

        <View className="flex-1 flex-row items-center justify-center px-4">
          <MainButton
            title={StoreTransactionsLang.Next[Lang]}
            handlePress={() => {
              router.navigate({
                pathname: 'StoresMovement',
                params: { SectionID, ProcessID, YearID, MonthID },
              });
            }}
            icon={icons.ArrowCircleLeft}
            iconStyles={'w-8 h-8'}
            textStyles={'w-52 p-2'}
          />
        </View>
      </ScrollView>
    </MainLayout>
  );
};

export default StoreTransactions;
