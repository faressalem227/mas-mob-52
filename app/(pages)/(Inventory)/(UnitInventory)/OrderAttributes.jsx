// app/OrderAttributes.jsx
import React, { useMemo } from 'react';
import { View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { useGlobalContext } from '../../../../context/GlobalProvider';
import { MainLayout, MainButton } from '../../../../components';
import MainGrid from '../../../../components/grid/MainGrid';

const OrderAttributes = () => {
  const { OrderID: orderIdParam, ProcessID: processIdParam } = useLocalSearchParams();
  const OrderID = Number(orderIdParam);
  const ProcessID = Number(processIdParam);
  const { Lang, user } = useGlobalContext();

  // console.log(OrderID, ProcessID);

  const additionalHead = useMemo(
    () => [
      { key: 'AdditionID', visible: false },
      { key: 'TableDataAdditionID', visible: false },
      { key: 'TableID', visible: false },
      { key: 'DataTypeID', visible: false },
      { key: 'AdditionNo', visible: true, label: Lang === 2 ? 'No' : 'المسلسل', width: 90 },
      {
        key: 'AdditionName',
        visible: true,
        label: Lang === 2 ? 'Statement' : 'البيان',
        width: 200,
        type: 'text',
      },
      {
        key: (row) => {
          console.log(row);

          return `AdditionValue${row?.DataTypeID}`;
        },
        type: (row) => {
          if (row?.DataTypeID == 1 || row?.DataTypeID == 3) {
            return 'text';
          } else if (row?.DataTypeID == 2) {
            return 'number';
          } else if (row?.DataTypeID == 4) {
            return 'date';
          } else if (row?.DataTypeID == 5) {
            return 'checkbox';
          } else if (row?.DataTypeID > 5) {
            return 'dropdown';
          }
        },
        sp: 'sc_addition_dropDown_trx',
        addParams: (row) => {
          return {
            AdditionID: row?.AdditionID,
            DataTypeID: row?.DataTypeID > 7 ? 7 : row?.DataTypeID,
          };
        },
        visible: false,
        label: Lang === 2 ? 'Value' : 'القيمة',
        width: 200,
        input: true,
      },
      {
        key: (row) => {
          if (row?.SelectName) {
            return 'SelectName';
          } else {
            return `AdditionValue${row?.DataTypeID}`;
          }
        },
        visible: true,
        label: Lang === 2 ? 'Value' : 'القيمة',
        width: 200,
      },

      // { key: 'AdditionValue1', visible: false },
      // { key: 'AdditionValue2', visible: false },
      // { key: 'AdditionValue3', visible: false },
      // { key: 'AdditionValue4', visible: false },
      // { key: 'AdditionValue5', visible: false },
      // { key: 'AdditionValue6', visible: true, label: 'fares' },
      // { key: 'AdditionValue7', visible: false },
    ],
    [Lang]
  );

  return (
    <MainLayout title={Lang === 2 ? 'Order Attributes' : 'خصائص الإذن'}>
      <View style={{ height: 520, paddingHorizontal: 12 }}>
        <MainGrid
          hasDel={false}
          hasIns={false}
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
          UpdBody={{ UserName: user?.username || '', TableDataID: OrderID }}
        />
      </View>
    </MainLayout>
  );
};

export default OrderAttributes;
