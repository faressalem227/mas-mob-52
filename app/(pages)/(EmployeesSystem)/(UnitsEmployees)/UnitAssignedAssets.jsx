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
  const { company, user, Lang, DepartmentID, DepartmentTypeID } = useGlobalContext();

  const { StaffID } = useLocalSearchParams();

  return (
    <MainLayout title={UnitAssignedAssetsLang.AssignedAssets[Lang]}>
      <View className="flex-1">
        <MainGrid
          hasIns={false}
          hasUpd={false}
          hasDel={false}
          spTrx={'ms_Employees_Sheet_Assets1'}
          TrxParam={[
            { name: 'DepartmentID', value: DepartmentID },
            { name: 'StaffID', value: StaffID },
            { name: 'LangID', value: Lang },
            { name: 'UserName', value: user.username },
          ]}
          tableHead={[
            {
              keyName: 'AssetID',
              type: 'number',
              Input: false,
              hidden: true,
              isRequired: false,
              width: null,
              label: UnitAssignedAssetsLang.AssetID[Lang],
            },
            {
              keyName: 'SubLocationID',
              type: 'number',
              Input: false,
              hidden: true,
              isRequired: false,
              width: null,
              label: UnitAssignedAssetsLang.SubLocationID[Lang],
            },
            {
              keyName: 'AssetCode',
              type: 'text',
              Input: true,
              hidden: false,
              isRequired: true,
              width: 100,
              label: UnitAssignedAssetsLang.AssetCode[Lang],
            },
            {
              keyName: 'AssetName',
              type: 'text',
              Input: true,
              hidden: false,
              isRequired: true,
              width: 250,
              label: UnitAssignedAssetsLang.AssetName[Lang],
            },
            {
              keyName: 'SubLocationCode',
              type: 'text',
              Input: true,
              hidden: false,
              isRequired: false,
              width: 100,
              label: UnitAssignedAssetsLang.SubLocationCode[Lang],
            },
            {
              keyName: 'SubLocationName',
              type: 'text',
              Input: true,
              hidden: false,
              isRequired: false,
              width: 250,
              label: UnitAssignedAssetsLang.SubLocationName[Lang],
            },
            {
              keyName: 'AssetClassName',
              type: 'text',
              Input: true,
              hidden: false,
              isRequired: false,
              width: 150,
              label: UnitAssignedAssetsLang.AssetClassName[Lang],
            },
            {
              keyName: 'AssetStatusName',
              type: 'text',
              Input: true,
              hidden: false,
              isRequired: false,
              width: 120,
              label: UnitAssignedAssetsLang.AssetStatusName[Lang],
            },
            {
              keyName: 'ModelName',
              type: 'text',
              Input: true,
              hidden: false,
              isRequired: false,
              width: 140,
              label: UnitAssignedAssetsLang.ModelName[Lang],
            },
            {
              keyName: 'OriginalCost',
              type: 'number',
              Input: true,
              hidden: false,
              isRequired: false,
              width: 110,
              label: UnitAssignedAssetsLang.OriginalCost[Lang],
            },
            {
              keyName: 'OperationDate',
              type: 'date',
              Input: true,
              hidden: false,
              isRequired: false,
              width: 150,
              format: handleDateFormat,
              label: UnitAssignedAssetsLang.OperationDate[Lang],
            },
          ]}
        />
      </View>
    </MainLayout>
  );
};

export default UnitAssignedAssets;
