import { View } from 'react-native';
import { MainGrid, MainLayout } from '../../../components';
import EmployeesText from '../../../constants/Lang/EmployeesSystem/EmployeesLang';
import { useGlobalContext } from '../../../context/GlobalProvider';
import { useLocalSearchParams } from 'expo-router';

const EmployessAssignedAssets = () => {
  const { Lang, DepartmentID, user } = useGlobalContext();

  const { StaffID } = useLocalSearchParams();

  return (
    <MainLayout title={EmployeesText.EmployeeAsset[Lang]}>
      <View className="mt-3 flex-1">
        <MainGrid
          StaticWidth
          hasCrud={false}
          pk={'AssetID'}
          spTrx={'api_ms_Employees_Sheet_Assets1'}
          TrxParam={[
            { name: 'DepartmentID', value: DepartmentID },
            { name: 'UserName', value: user.username },
            { name: 'LangID', value: Lang },
            { name: 'StaffID', value: StaffID },
          ]}
          TrxDependency={[StaffID]}
          tableHead={[
            {
              key: 'AssetID',
            },
            {
              key: 'SubLocationID',
            },
            {
              key: 'AssetCode',
              label: EmployeesText.EmployeeAssetCode[Lang],
              input: true,
              visible: true,
              width: 100,
            },
            {
              key: 'AssetName',
              label: EmployeesText.EmployeeAssetName[Lang],
              input: true,
              visible: true,
              width: 200,
            },
            {
              key: 'SubLocationCode',
              label: EmployeesText.EmployeeSubLocationCode[Lang],
              input: true,
              visible: true,
              width: 100,
            },
            {
              key: 'SubLocationName',
              label: EmployeesText.EmployeeSubLocationName[Lang],
              input: true,
              visible: true,
              width: 250,
            },
            {
              key: 'AssetClassName',
              label: EmployeesText.EmployeeAssetClass[Lang],
              input: true,
              visible: true,
              width: 150,
            },
            {
              key: 'AssetStatusName',
              label: EmployeesText.EmployeeAssetStatus[Lang],
              input: true,
              visible: true,
              width: 120,
            },
            {
              key: 'ModelName',
              label: EmployeesText.EmployeeAssetModel[Lang],
              input: true,
              visible: true,
              width: 140,
            },
            {
              key: 'OriginalCost',
              label: EmployeesText.EmployeeAssetOCost[Lang],
              type: 'number',
              input: true,
              visible: true,
              width: 110,
            },
            {
              key: 'OperationDate',
              label: EmployeesText.EmployeeAssetOperationDate[Lang],
              type: 'date',
              input: true,
              visible: true,
              width: 150,
            },
          ]}
        />
      </View>
    </MainLayout>
  );
};

export default EmployessAssignedAssets;
