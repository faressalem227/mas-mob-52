import { View } from 'react-native';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import MainLayout from '../../../../components/layout/MainLayout';
import MainGrid from '../../../../components/grid/MainGrid';
import HealthAndSafetyLang from '../../../../constants/Lang/Maintenance/HealthAndSafety';

const SparePartsExceeding = () => {
  const { user, DepartmentID, Lang, company } = useGlobalContext();

  return (
    <MainLayout title={HealthAndSafetyLang.SparePartsExceeding[Lang]}>
      <View className="flex-1">
        <MainGrid
          pk={'MaterialID'}
          spTrx={'ms_rpt_dashboard_status5'}
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
              key: 'MaterialCode',
              label: HealthAndSafetyLang.SafetyCode[Lang],
              type: 'number',
              visible: 'true',
              width: 100,
            },
            {
              key: 'MaterialClassName',
              label: HealthAndSafetyLang.MaterialClassName[Lang],
              visible: 'true',
              width: 200,
            },
            {
              key: 'MaterialName',
              label: HealthAndSafetyLang.MaterialName[Lang],
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

export default SparePartsExceeding;
