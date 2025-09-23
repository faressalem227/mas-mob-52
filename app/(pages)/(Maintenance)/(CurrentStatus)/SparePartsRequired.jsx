import { View } from 'react-native';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import MainLayout from '../../../../components/layout/MainLayout';
import MainGrid from '../../../../components/grid/MainGrid';
import HealthAndSafetyLang from '../../../../constants/Lang/Maintenance/HealthAndSafety';

const SparePartsRequired = () => {
  const { user, DepartmentID, Lang, company } = useGlobalContext();

  return (
    <MainLayout title={HealthAndSafetyLang.SparePartsRequired[Lang]}>
      <View className="flex-1">
        <MainGrid
          pk={'ItemID'}
          spTrx={'ms_rpt_dashboard_status3'}
          TrxParam={[
            { name: 'DepartmentID', value: DepartmentID },
            { name: 'CompanyID', value: company },
            { name: 'LangID', value: Lang },
            { name: 'UserName', value: user.username },
          ]}
          hasCrud={false}
          TrxDependency={[DepartmentID]}
          StaticWidth
          tableHead={[
            {
              key: 'ItemCode',
              label: HealthAndSafetyLang.SafetyCode[Lang],
              type: 'number',
              visible: 'true',
              width: 100,
            },
            {
              key: 'ItemName',
              label: HealthAndSafetyLang.ItemName[Lang],
              visible: 'true',
              width: 200,
            },
            {
              key: 'Quantity',
              label: HealthAndSafetyLang.Quantity[Lang],
              type: 'number',
              visible: 'true',
              width: 120,
            },
            {
              key: 'UnitName',
              label: HealthAndSafetyLang.UnitName[Lang],
              visible: 'true',
              width: 120,
            },
            {
              key: 'UnitCost',
              label: HealthAndSafetyLang.UnitCost[Lang],
              type: 'number',
              visible: 'true',
              width: 120,
            },
            {
              key: 'TotalCost',
              label: HealthAndSafetyLang.TotalCost[Lang],
              type: 'number',
              visible: 'true',
              width: 130,
            },
            {
              key: 'WorkorderCode',
              label: HealthAndSafetyLang.WorkorderCode[Lang],
              type: 'number',
              visible: 'true',
              width: 120,
            },
            {
              key: 'WorkorderTypeName',
              label: HealthAndSafetyLang.WorkorderTypeName[Lang],
              visible: 'true',
              width: 200,
            },
          ]}
        />
      </View>
    </MainLayout>
  );
};

export default SparePartsRequired;
