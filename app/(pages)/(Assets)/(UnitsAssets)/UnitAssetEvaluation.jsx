import { View } from 'react-native';
import { MainLayout, MainGrid } from '../../../../components';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import { useLocalSearchParams } from 'expo-router';
import { useDropDown } from '../../../../hooks/useDropDownData';

const UnitAssetEvaluationLang = {
  AssetEval: {
    1: 'تقييم الحاله الفنيه',
    2: 'Asset Evaluation',
  },
  ConditionDate: {
    1: 'تاريخ التقييم',
    2: 'Evaluation Date',
  },
  EvaluatorID: {
    1: 'جهة التقييم',
    2: 'Evaluation Authority',
  },
  ConditionIndex: {
    1: 'التقييم الفني',
    2: 'Technical Evaluation',
  },
  Remarks: {
    1: 'ملاحظات',
    2: 'Remarks',
  },
};

const UnitAssetEvaluation = () => {
  const { AssetID, AssetClassID } = useLocalSearchParams();
  const { Lang, company, user } = useGlobalContext();

  const { data: evaluatorData } = useDropDown(
    'api_am_Evaluator_trx',
    { CompanyID: company },
    'EvaluatorID',
    'Eval_name'
  );

  return (
    <MainLayout title={UnitAssetEvaluationLang.AssetEval[Lang]}>
      <View className="flex-1">
        <MainGrid
          pk={'AssetConditionID'}
          spTrx={'api_am_asset_conditions_Trx'}
          spIns={'api_am_asset_conditions_Ins'}
          spUpd={'api_am_asset_conditions_Upd'}
          spDel={'api_am_asset_conditions_Del'}
          TrxParam={[{ name: 'AssetID', value: AssetID }]}
          InsBody={{
            AssetID,
          }}
          DelParam={[{ rowData: true, name: 'AssetConditionID', value: 'AssetConditionID' }]}
          mixedWidth
          tableHead={[
            {
              key: 'AssetConditionID',
              required: false,
              visible: false,
              width: 100,
            },
            {
              key: 'AssetID',
              required: false,
              visible: false,
              width: 100,
            },
            {
              key: 'ConditionDate',
              required: true,
              input: true,
              type: 'date',
              visible: true,
              width: 200,
              label: UnitAssetEvaluationLang.ConditionDate[Lang],
            },
            {
              key: 'EvaluatorID',
              type: 'dropdown',
              input: true,
              required: true,
              visible: false,
              width: 200,
              options: evaluatorData,
              label: UnitAssetEvaluationLang.EvaluatorID[Lang],
            },
            {
              key: 'Eval_name',
              type: 'text',
              input: false,
              required: false,
              visible: true,
              width: 200,
              label: UnitAssetEvaluationLang.EvaluatorID[Lang],
            },
            {
              key: 'ConditionIndex',
              type: 'text',
              input: false,
              required: false,
              visible: true,
              width: 200,
              label: UnitAssetEvaluationLang.ConditionIndex[Lang],
            },
            {
              key: 'Remarks',
              type: 'text',
              input: true,
              required: false,
              visible: true,
              width: 300,
              label: UnitAssetEvaluationLang.Remarks[Lang],
            },
          ]}
          routeTo={{
            path: 'UnitAssetEvalDetails',
            hasParams: true,
            params: {
              AssetID,
              AssetClassID,
            },
          }}
        />
      </View>
    </MainLayout>
  );
};

export default UnitAssetEvaluation;
