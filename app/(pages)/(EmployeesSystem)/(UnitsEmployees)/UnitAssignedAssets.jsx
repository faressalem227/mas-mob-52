import { View } from 'react-native';
import { MainLayout, MainGrid } from '../../../../components';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import { useLocalSearchParams } from 'expo-router';

const UnitAssignedAssetsLang = {
  AssignedAssets: {
    1: 'الأصول المخصصة للموظف',
    2: 'Assigned Assets',
  },

  AssetID: {
    1: 'AssetID',
    2: 'AssetID',
  },

  SubLocationID: {
    1: 'SubLocationID',
    2: 'SubLocationID',
  },

  AssetCode: {
    1: 'كود الأصل',
    2: 'Asset Code',
  },

  AssetName: {
    1: 'اسم الأصل',
    2: 'Asset Name',
  },

  SubLocationCode: {
    1: 'كود الموقع',
    2: 'Location Code',
  },

  SubLocationName: {
    1: 'اسم الموقع',
    2: 'Location Name',
  },

  AssetClassName: {
    1: 'التصنيف',
    2: 'Asset Class',
  },

  AssetStatusName: {
    1: 'حالة الأصل',
    2: 'Asset Status',
  },

  ModelName: {
    1: 'الموديل',
    2: 'Model',
  },

  OriginalCost: {
    1: 'التكلفة الأساسية',
    2: 'Original Cost',
  },

  OperationDate: {
    1: 'تاريخ التشغيل',
    2: 'Operation Date',
  },
};

const UnitAssignedAssets = () => {
  const { user, Lang, DepartmentID } = useGlobalContext();

  const { StaffID } = useLocalSearchParams();

  return (
    <MainLayout title={UnitAssignedAssetsLang.AssignedAssets[Lang]}>
      <View className="flex-1">
        <MainGrid
          pk={'AssetID'}
          hasIns={false}
          hasUpd={false}
          hasDel={false}
          spTrx={'api_ms_Employees_Sheet_Assets1'}
          TrxParam={[
            { name: 'DepartmentID', value: DepartmentID },
            { name: 'StaffID', value: StaffID },
            { name: 'LangID', value: Lang },
            { name: 'UserName', value: user.username },
          ]}
          tableHead={[
            {
              key: 'AssetID',
              type: 'number',
              input: false,
              visible: false,
              required: false,
              width: null,
              label: UnitAssignedAssetsLang.AssetID[Lang],
            },
            {
              key: 'SubLocationID',
              type: 'number',
              input: false,
              visible: false,
              required: false,
              width: null,
              label: UnitAssignedAssetsLang.SubLocationID[Lang],
            },
            {
              key: 'AssetCode',
              type: 'text',
              input: true,
              visible: true,
              required: true,
              width: 100,
              label: UnitAssignedAssetsLang.AssetCode[Lang],
            },
            {
              key: 'AssetName',
              type: 'text',
              input: true,
              visible: true,
              required: true,
              width: 250,
              label: UnitAssignedAssetsLang.AssetName[Lang],
            },
            {
              key: 'SubLocationCode',
              type: 'text',
              input: true,
              visible: true,
              required: false,
              width: 100,
              label: UnitAssignedAssetsLang.SubLocationCode[Lang],
            },
            {
              key: 'SubLocationName',
              type: 'text',
              input: true,
              visible: true,
              required: false,
              width: 250,
              label: UnitAssignedAssetsLang.SubLocationName[Lang],
            },
            {
              key: 'AssetClassName',
              type: 'text',
              input: true,
              visible: true,
              required: false,
              width: 150,
              label: UnitAssignedAssetsLang.AssetClassName[Lang],
            },
            {
              key: 'AssetStatusName',
              type: 'text',
              input: true,
              visible: true,
              required: false,
              width: 120,
              label: UnitAssignedAssetsLang.AssetStatusName[Lang],
            },
            {
              key: 'ModelName',
              type: 'text',
              input: true,
              visible: true,
              required: false,
              width: 140,
              label: UnitAssignedAssetsLang.ModelName[Lang],
            },
            {
              key: 'OriginalCost',
              type: 'number',
              input: true,
              visible: true,
              required: false,
              width: 110,
              label: UnitAssignedAssetsLang.OriginalCost[Lang],
            },
            {
              key: 'OperationDate',
              type: 'date',
              input: true,
              visible: true,
              required: false,
              width: 150,
              label: UnitAssignedAssetsLang.OperationDate[Lang],
            },
          ]}
          mixedWidth
        />
      </View>
    </MainLayout>
  );
};

export default UnitAssignedAssets;
