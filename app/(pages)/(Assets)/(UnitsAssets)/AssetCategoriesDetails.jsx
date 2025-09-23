import { useState } from 'react';
import { View } from 'react-native';
import { MainLayout, MainGrid } from '../../../../components';
import { useLocalSearchParams } from 'expo-router';
import AssetHomeLang from '../../../../constants/Lang/AssetManagment/AssetHomeLang';
import { useDropDown } from '../../../../hooks/useDropDownData';
import { useGlobalContext } from '../../../../context/GlobalProvider';

const AssetCategoriesDetailsLang = {
  AssignedSpareParts: {
    1: 'قطع الغيار المخصصه',
    2: 'Assigned Spare Parts',
  },
  AssetID: {
    1: 'معرف الأصل',
    2: 'Asset ID',
  },
  OrderDetailsID: {
    1: 'معرف تفاصيل الإذن',
    2: 'Order Details ID',
  },
  OrderNo: {
    1: 'رقم الإذن',
    2: 'Order No',
  },
  OrderDate: {
    1: 'تاريخ الإذن',
    2: 'Order Date',
  },
  SectionName: {
    1: 'المخزن النوعي',
    2: 'Section Name',
  },
  GroupName: {
    1: 'التصنيف',
    2: 'Group Name',
  },
  ItemName: {
    1: 'الصنف',
    2: 'Item Name',
  },
  UnitName: {
    1: 'الوحدة',
    2: 'Unit Name',
  },
  Qty: {
    1: 'الكمية',
    2: 'Qty',
  },
  UnitCost: {
    1: 'تكلفة الوحدة',
    2: 'Unit Cost',
  },
  TotalCost: {
    1: 'إجمالي التكلفة',
    2: 'Total Cost',
  },
};

const AssetCategoriesDetails = () => {
  const { AssetID } = useLocalSearchParams();

  const { DepartmentID, Lang, user } = useGlobalContext();

  return (
    <MainLayout title={AssetCategoriesDetailsLang.AssignedSpareParts[Lang]}>
      <View className="flex-1">
        <MainGrid
          pk={'OrderDetailsID'}
          spTrx={'api_ms_Assets_Materials_Trx'}
          TrxParam={[
            { name: 'DepartmentID', value: DepartmentID },
            { name: 'AssetID', value: AssetID },
            { name: 'LangID', value: Lang },
            { name: 'UserName', value: user.username },
          ]}
          hasCrud={false}
          mixedWidth
          tableHead={[
            {
              key: 'AssetID',
              type: 'number',
              input: false,
              visible: false,
              required: false,
              width: 0,
              label: AssetCategoriesDetailsLang.AssetID[Lang],
            },
            {
              key: 'OrderDetailsID',
              type: 'number',
              input: false,
              visible: false,
              required: false,
              width: 0,
              label: AssetCategoriesDetailsLang.OrderDetailsID[Lang],
            },
            {
              key: 'OrderNo',
              type: 'number',
              input: true,
              visible: true,
              required: true,
              width: 80,
              label: AssetCategoriesDetailsLang.OrderNo[Lang],
            },
            {
              key: 'OrderDate',
              type: 'date',
              input: true,
              visible: true,
              required: true,
              width: 130,
              label: AssetCategoriesDetailsLang.OrderDate[Lang],
            },
            {
              key: 'SectionName',
              type: 'text',
              input: false,
              visible: true,
              required: false,
              width: 130,
              label: AssetCategoriesDetailsLang.SectionName[Lang],
            },
            {
              key: 'GroupName',
              type: 'text',
              input: false,
              visible: true,
              required: false,
              width: 100,
              label: AssetCategoriesDetailsLang.GroupName[Lang],
            },
            {
              key: 'ItemName',
              type: 'text',
              input: false,
              visible: true,
              required: false,
              width: 200,
              label: AssetCategoriesDetailsLang.ItemName[Lang],
            },
            {
              key: 'UnitName',
              type: 'text',
              input: false,
              visible: true,
              required: false,
              width: 100,
              label: AssetCategoriesDetailsLang.UnitName[Lang],
            },
            {
              key: 'Qty',
              type: 'text',
              input: true,
              visible: true,
              required: true,
              width: 100,
              label: AssetCategoriesDetailsLang.Qty[Lang],
            },
            {
              key: 'UnitCost',
              type: 'text',
              input: true,
              visible: true,
              required: false,
              width: 120,
              label: AssetCategoriesDetailsLang.UnitCost[Lang],
            },
            {
              key: 'TotalCost',
              type: 'text',
              input: false,
              visible: true,
              required: false,
              width: 125,
              label: AssetCategoriesDetailsLang.TotalCost[Lang],
            },
          ]}
        />
      </View>
    </MainLayout>
  );
};

export default AssetCategoriesDetails;
