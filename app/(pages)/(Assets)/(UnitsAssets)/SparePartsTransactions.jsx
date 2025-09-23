import { View } from 'react-native';
import { MainLayout, MainGrid } from '../../../../components';
import { useLocalSearchParams } from 'expo-router';
import AssetHomeLang from '../../../../constants/Lang/AssetManagment/AssetHomeLang';
import { useGlobalContext } from '../../../../context/GlobalProvider';

const SparePartsMovementLang = {
  SparePartsTransactions: {
    1: 'حركة قطع الغيار',
    2: 'Spare Parts Transactions',
  },
  AssetID: {
    1: 'معرف الأصل',
    2: 'Asset ID',
  },
  WorkorderMaterialID: {
    1: 'معرف مادة أمر العمل',
    2: 'Workorder Material ID',
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
  Quantity: {
    1: 'الكمية',
    2: 'Quantity',
  },
  UnitCost: {
    1: 'تكلفة الوحدة',
    2: 'Unit Cost',
  },
  TotalCost: {
    1: 'إجمالي التكلفة',
    2: 'Total Cost',
  },
  IssueDate: {
    1: 'تاريخ الصرف والتركيب',
    2: 'Issue Date',
  },
};

const SparePartsTransactions = () => {
  const { AssetID } = useLocalSearchParams();

  const { DepartmentID, Lang, user } = useGlobalContext();

  console.log(AssetID, DepartmentID);

  return (
    <MainLayout title={SparePartsMovementLang.SparePartsTransactions[Lang]}>
      <View className="flex-1">
        <MainGrid
          pk={'WorkorderMaterialID'}
          spTrx={'api_ms_Assets_Materials_Trx2'}
          TrxParam={[
            { name: 'DepartmentID', value: DepartmentID },
            { name: 'AssetID', value: AssetID },
            { name: 'LangID', value: Lang },
            { name: 'UserName', value: user.username },
          ]}
          mixedWidth
          hasCrud={false}
          tableHead={[
            {
              key: 'AssetID',
              type: 'number',
              input: false,
              visible: false,
              required: false,
              width: 0,
              label: SparePartsMovementLang.AssetID[Lang],
            },
            {
              key: 'WorkorderMaterialID',
              type: 'number',
              input: false,
              visible: false,
              required: false,
              width: 0,
              label: SparePartsMovementLang.WorkorderMaterialID[Lang],
            },
            {
              key: 'SectionName',
              type: 'text',
              input: false,
              visible: true,
              required: false,
              width: 130,
              label: SparePartsMovementLang.SectionName[Lang],
            },
            {
              key: 'GroupName',
              type: 'text',
              input: false,
              visible: true,
              required: false,
              width: 100,
              label: SparePartsMovementLang.GroupName[Lang],
            },
            {
              key: 'ItemName',
              type: 'text',
              input: false,
              visible: true,
              required: false,
              width: 200,
              label: SparePartsMovementLang.ItemName[Lang],
            },
            {
              key: 'UnitName',
              type: 'text',
              input: false,
              visible: true,
              required: false,
              width: 100,
              label: SparePartsMovementLang.UnitName[Lang],
            },
            {
              key: 'Quantity',
              type: 'text',
              input: true,
              visible: true,
              required: true,
              width: 100,
              label: SparePartsMovementLang.Quantity[Lang],
            },
            {
              key: 'UnitCost',
              type: 'text',
              input: true,
              visible: true,
              required: false,
              width: 120,
              label: SparePartsMovementLang.UnitCost[Lang],
            },
            {
              key: 'TotalCost',
              type: 'text',
              input: false,
              visible: true,
              required: false,
              width: 125,
              label: SparePartsMovementLang.TotalCost[Lang],
            },
            {
              key: 'IssueDate',
              type: 'date',
              input: false,
              visible: true,
              required: false,
              width: 125,
              label: SparePartsMovementLang.IssueDate[Lang],
            },
          ]}
        />
      </View>
    </MainLayout>
  );
};

export default SparePartsTransactions;
