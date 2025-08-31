// app/OrderAttributes.jsx
import React, { useMemo } from 'react';
import { View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { useGlobalContext } from '../../../context/GlobalProvider';
import { MainLayout, MainButton } from '../../../components';
import MainGrid from '../../../components/grid/MainGrid';

const OrderAttributes = () => {
  const { OrderID: orderIdParam, ProcessID: processIdParam } = useLocalSearchParams();
  const OrderID = Number(orderIdParam);
  const ProcessID = Number(processIdParam);
  const { Lang, user } = useGlobalContext();

  const additionalHead = useMemo(() => ([
    { key: 'AdditionID', visible: false },
    { key: 'TableDataAdditionID', visible: false },
    { key: 'TableID', visible: false },
    { key: 'DataTypeID', visible: false },
    { key: 'AdditionNo', visible: true, label: Lang === 2 ? 'No' : 'المسلسل', width: 90 },
    { key: 'AdditionName', visible: true, label: Lang === 2 ? 'Statement' : 'البيان', width: 200 },
    { key: 'AdditionValue1', visible: false },
    { key: 'AdditionValue2', visible: false },
    { key: 'AdditionValue3', visible: false },
    { key: 'AdditionValue4', visible: false },
    { key: 'AdditionValue5', visible: false },
    { key: 'AdditionValue6', visible: false },
    { key: 'AdditionValue7', visible: false },
  ]), [Lang]);

  return (
    <MainLayout title={Lang === 2 ? 'Order Attributes' : 'خصائص الإذن'}>
      <View style={{ height: 520, paddingHorizontal: 12 }}>
        <MainGrid
          tableHead={additionalHead}
          pk="TableDataAdditionID"
          spTrx="sc_addition_data__Trx"
          spUpd="sc_addition_data__Upd"
          TrxParam={[
            { name: 'TableDataID', value: OrderID },
            { name: 'ProcessID', value: ProcessID },
            { name: 'UserName', value: user?.username || '' },
            { name: 'LangID', value: Lang },
          ]}
          UpdBody={{ UserName: user?.username || '' }}
        />
      </View>
    </MainLayout>
  );
};

export default OrderAttributes;