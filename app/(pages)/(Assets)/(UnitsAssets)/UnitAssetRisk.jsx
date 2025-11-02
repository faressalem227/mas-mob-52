import { View } from 'react-native';
import { MainLayout, MainGrid } from '../../../../components';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import { useLocalSearchParams } from 'expo-router';

const UnitAssetRiskLang = {
  UnitAssetRisk: {
    1: 'حساب المخاطرة',
    2: 'Asset Risk',
  },
  RiskDate: {
    1: 'تاريخ التقييم',
    2: 'Risk Date',
  },
  NextRiskDate: {
    1: 'تاريخ التقييم التالي',
    2: 'Next Risk Date',
  },
  ConditionIndex: {
    1: 'التقييم الفني',
    2: 'Condition Evaluation',
  },
  AssetImportance: {
    1: 'الأهمية',
    2: 'Importance',
  },
  LikelihoodIndex: {
    1: 'الاحتمالية',
    2: 'Likelihood',
  },
  RiskIndex: {
    1: 'المخاطرة',
    2: 'Risk',
  },
  Remarks: {
    1: 'ملاحظات',
    2: 'Remarks',
  },
};

const UnitAssetRisk = () => {
  const { Lang, company, user, DepartmentID } = useGlobalContext();
  const { AssetID } = useLocalSearchParams();

  return (
    <MainLayout title={UnitAssetRiskLang.UnitAssetRisk[Lang]}>
      <View className="flex-1">
        <MainGrid
          pk={'RiskID'}
          spTrx={'api_am_asset_risk_Trx'}
          spIns={'api_am_asset_risk_Ins'}
          spUpd={'api_am_asset_risk_Upd'}
          spDel={'api_am_asset_risk_Del'}
          TrxParam={[{ name: 'AssetID', value: AssetID }]}
          InsBody={{
            AssetID,
          }}
          UpdBody={{
            AssetID,
          }}
          DelParam={[{ rowData: true, name: 'RiskID', value: 'RiskID' }]}
          mixedWidth
          tableHead={[
            {
              required: false,
              visible: false,
              key: 'cmd',
              width: 100,
            },
            {
              required: false,
              visible: false,
              key: 'RiskID',
              width: 100,
            },
            {
              key: 'AssetID',
              required: false,
              visible: false,
              width: 100,
            },
            {
              key: 'RiskDate',
              type: 'date',
              input: true,
              required: true,
              visible: true,
              width: 200,
              label: UnitAssetRiskLang.RiskDate[Lang],
            },
            {
              key: 'NextRiskDate',
              type: 'date',
              input: true,
              required: true,
              visible: true,
              width: 200,
              label: UnitAssetRiskLang.NextRiskDate[Lang],
            },
            {
              key: 'ConditionIndex',
              type: 'number',
              input: false,
              required: false,
              visible: true,
              width: 150,
              label: UnitAssetRiskLang.ConditionIndex[Lang],
            },
            {
              key: 'AssetImportance',
              type: 'number',
              input: false,
              required: false,
              visible: true,
              width: 150,
              label: UnitAssetRiskLang.AssetImportance[Lang],
            },
            {
              key: 'LikelihoodIndex',
              type: 'number',
              visible: true,
              input: false,
              required: false,
              width: 100,
              label: UnitAssetRiskLang.LikelihoodIndex[Lang],
            },
            {
              key: 'RiskIndex',
              type: 'number',
              input: false,
              required: false,
              visible: true,
              width: 100,
              label: UnitAssetRiskLang.RiskIndex[Lang],
            },
            {
              key: 'Remarks',
              type: 'text',
              input: true,
              required: false,
              visible: true,
              width: 200,
              label: UnitAssetRiskLang.Remarks[Lang],
            },
          ]}
          routeTo={{
            path: 'UnitAssetRiskQues',
            hasParams: true,
            params: {
              AssetID,
            },
          }}
        />
      </View>
    </MainLayout>
  );
};

export default UnitAssetRisk;
