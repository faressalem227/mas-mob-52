import { View } from 'react-native';
import { MainLayout, MainGrid } from '../../../../components';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import { useLocalSearchParams } from 'expo-router';
import { useDropDown } from '../../../../hooks/useDropDownData';

const UnitAssetEvalDetailsLang = {
  AssetQues: {
    1: 'تفاصيل الحاله الفنيه',
    2: 'Asset Evaluation Details',
  },
  QuestionNo: {
    1: 'م',
    2: 'No',
  },
  Question: {
    1: 'البند',
    2: 'Item',
  },
  Weight: {
    1: 'الوزن',
    2: 'Weight',
  },
};

const UnitAssetEvalDetails = () => {
  const { AssetConditionID, AssetClassID } = useLocalSearchParams();
  const { Lang, company, user } = useGlobalContext();

  const { data: evaluatorData } = useDropDown(
    'api_am_Evaluator_trx',
    { CompanyID: company },
    'EvaluatorID',
    'Eval_name'
  );

  return (
    <MainLayout title={UnitAssetEvalDetailsLang.AssetQues[Lang]}>
      <View className="flex-1">
        <MainGrid
          hasCrud={false}
          pk={'ConditionQuestionID'}
          spTrx={'am_condition_questions_Trx'}
          TrxParam={[{ name: 'AssetClassID', value: AssetClassID }]}
          mixedWidth
          tableHead={[
            {
              key: 'QuestionNo',
              type: 'number',
              input: true,
              required: true,
              visible: true,
              width: 100,
              label: UnitAssetEvalDetailsLang.QuestionNo[Lang],
            },
            {
              key: 'Question',
              type: 'text',
              input: true,
              required: true,
              visible: true,
              width: 200,
              label: UnitAssetEvalDetailsLang.Question[Lang],
            },
            {
              key: 'Weight',
              type: 'number',
              input: true,
              required: false,
              visible: true,
              width: 100,
              label: UnitAssetEvalDetailsLang.Weight[Lang],
            },
          ]}
          routeTo={{
            path: 'UnitAssetEvalAnswer',
            hasParams: true,
            params: {
              AssetConditionID,
            },
          }}
        />
      </View>
    </MainLayout>
  );
};

export default UnitAssetEvalDetails;
