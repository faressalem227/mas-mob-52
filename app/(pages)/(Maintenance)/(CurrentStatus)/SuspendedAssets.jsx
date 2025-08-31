import { View } from 'react-native';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import MainLayout from '../../../../components/layout/MainLayout';
import MainGrid from '../../../../components/grid/MainGrid';
import HealthAndSafetyLang from '../../../../constants/Lang/Maintenance/HealthAndSafety';

const SuspendedAssets = () => {
  const { user, DepartmentID, Lang, company } = useGlobalContext();

  return (
    <MainLayout title={HealthAndSafetyLang.SuspendedAssets[Lang]}>
      <View className="flex-1">
        <MainGrid
          pk={'AssetID'}
          spTrx={'api_ms_rpt_dashboard_status2'}
          TrxParam={[
            { name: 'DepartmentID', value: DepartmentID },
            { name: 'CompanyID', value: company },
            { name: 'LangID', value: Lang },
            { name: 'UserName', value: user.username },
          ]}
          hasCrud={false}
          TrxDependency={[DepartmentID]}
          StaticWidth={true}
          tableHead={[
            {
              key: 'AssetCode',
              label: HealthAndSafetyLang.SafetyCode[Lang],
              type: 'number',
              visible: 'true',
              width: 100,
            },
            {
              key: 'AssetName',
              label: HealthAndSafetyLang.Asset[Lang],
              visible: 'true',
              lines: 2,
              width: 200,
            },
            {
              key: 'SubLocationName',
              label: HealthAndSafetyLang.SubLocationName[Lang],
              input: 'true',
              visible: 'true',
              width: 200,
            },
            {
              key: 'AssetClassName',
              label: HealthAndSafetyLang.AssetClassName[Lang],
              visible: 'true',
              width: 120,
            },
            {
              key: 'WarrantyEndDate',
              label: HealthAndSafetyLang.WarrantyEndDate[Lang],
              type: 'date',
              visible: 'true',
              width: 150,
            },
            {
              key: 'WorkorderCode',
              label: HealthAndSafetyLang.WorkorderCode[Lang],
              type: 'number',
              visible: 'true',
              width: 150,
            },
            {
              key: 'AssetStopReason',
              label: HealthAndSafetyLang.AssetStopReason[Lang],
              type: 'number',
              visible: 'true',
              width: 200,
            },
          ]}
        />
      </View>
    </MainLayout>
  );
};

export default SuspendedAssets;
