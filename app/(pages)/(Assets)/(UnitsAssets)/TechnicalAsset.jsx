import { useState, useEffect } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { MainLayout } from '../../../../components';
import { useLocalSearchParams } from 'expo-router';
import MainGrid from '../../../../components/grid/MainGrid';
import { useDropDown } from '../../../../hooks/useDropDownData';
import AssetHomeLang from '../../../../constants/Lang/AssetManagment/AssetHomeLang';
import { useGlobalContext } from '../../../../context/GlobalProvider';

const TechnicalAssetsLang = {
  TechnicalAssetsData: {
    1: 'المواصفات الفنية للأصول',
    2: 'Technical Asset Specifications',
  },
  AssetAttributesID: {
    1: 'معرف المواصفة',
    2: 'Attribute ID',
  },
  AttributeID: {
    1: 'المواصفة',
    2: 'Attribute',
  },
  AttributeName: {
    1: 'المواصفة',
    2: 'Attribute',
  },
  AttributeValue: {
    1: 'القيمة',
    2: 'Cost',
  },
  Unit: {
    1: 'الوحدة',
    2: 'Unit',
  },
  Remarks: {
    1: 'ملاحظات',
    2: 'Remarks',
  },
};

const TechnicalAssets = () => {
  const {
    AssetID,
    SubLocationID,
    LocationID,
    AssetCode,
    AssetName,
    AssetClassName,
    AssetStatusName,
    ...restParams
  } = useLocalSearchParams();

  const { Lang, DepartmentID, user } = useGlobalContext();

  const { data: sds_AssetAttributesList } = useDropDown(
    'api_asset_attributes_List_ByAsset',
    { AssetID },
    'AttributeID',
    'AttributeName'
  );

  return (
    <MainLayout title={AssetHomeLang.TechnicalSpecifications[Lang]}>
      <View className="flex-1">
        <MainGrid
          pk={'AssetAttributesID'}
          spTrx={'api_ms_AssetAttributes_Trx'}
          spIns={'api_ms_AssetAttributes_Ins'}
          spUpd={'api_ms_AssetAttributes_Upd'}
          spDel={'api_ms_AssetAttributes_Del'}
          TrxParam={[
            { name: 'AssetID', value: AssetID },
            { name: 'DepartmentID', value: DepartmentID },
          ]}
          InsBody={{ AssetID, DepartmentID, LangID: Lang, UserName: user.username }}
          UpdBody={{ AssetID, DepartmentID, LangID: Lang, UserName: user.username }}
          DelParam={[
            {
              rowData: true,
              name: 'AssetAttributeID',
              value: 'AssetAttributesID',
            },
            { name: 'DepartmentID', value: DepartmentID },
            { name: 'UserName', value: user.username },
            { name: 'LangID', value: Lang },
          ]}
          mixedWidth
          tableHead={[
            {
              key: 'AssetAttributesID',
              visible: false,
              required: false,
              width: 100,
              label: TechnicalAssetsLang.AssetAttributesID[Lang],
            },
            {
              key: 'AttributeID',
              required: true,
              input: true,
              type: 'dropdown',
              visible: false,
              options: sds_AssetAttributesList,
              width: 300,
              label: TechnicalAssetsLang.AttributeID[Lang],
            },
            {
              key: 'AttributeName',
              required: false,
              input: false,
              type: 'text',
              visible: true,
              width: 150,
              label: TechnicalAssetsLang.AttributeName[Lang],
            },
            {
              key: 'AttributeValue',
              type: 'text',
              input: true,
              required: true,
              visible: true,
              width: 150,
              label: TechnicalAssetsLang.AttributeValue[Lang],
            },
            {
              key: 'Unit',
              type: 'unit',
              input: false,
              required: false,
              visible: true,
              width: 100,
              label: TechnicalAssetsLang.Unit[Lang],
            },
            {
              key: 'Remarks',
              type: 'text',
              input: true,
              required: false,
              visible: true,
              width: 150,
              label: TechnicalAssetsLang.Remarks[Lang],
            },
          ]}
        />
      </View>
    </MainLayout>
  );
};

export default TechnicalAssets;
