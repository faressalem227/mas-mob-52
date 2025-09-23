import { View } from 'react-native';
import { MainLayout, MainGrid } from '../../../../components';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import { useLocalSearchParams } from 'expo-router';
import { useDropDown } from '../../../../hooks/useDropDownData';

const UnitAssetEvalAnswerLang = {
  UnitAnswer: {
    1: 'اجابه التقييم الفني',
    2: 'Unit AssetEval Answer',
  },
  AnswerNo: {
    1: 'م',
    2: 'No',
  },
  Answer: {
    1: 'الاجابة',
    2: 'Answer',
  },
  AnswerValue: {
    1: 'القيمة',
    2: 'Value',
  },
  Selected: {
    1: 'اختيار',
    2: 'Selected',
  },
};

const UnitAssetEvalAnswer = () => {
  const { AssetConditionID, ConditionQuestionID } = useLocalSearchParams();
  const { Lang, company, user } = useGlobalContext();
  return (
    <MainLayout title={UnitAssetEvalAnswerLang.UnitAnswer[Lang]}>
      <MainGrid
        hasIns={false}
        hasDel={false}
        pk={'ConditionAnswerID'}
        spTrx={'api_am_asset_conditions_items_Trx'}
        spUpd={'api_am_asset_conditions_items_Upd'}
        TrxParam={[
          { name: 'AssetConditionID', value: AssetConditionID },
          { name: 'ConditionQuestionID', value: ConditionQuestionID },
        ]}
        UpdBody={{
          AssetConditionID,
          ConditionQuestionID,
        }}
        tableHead={[
          {
            key: 'AnswerNo',
            type: 'number',
            required: true,
            visible: true,
            input: false,
            width: 70,
            label: UnitAssetEvalAnswerLang.AnswerNo[Lang],
          },
          {
            key: 'Answer',
            type: 'text',
            required: false,
            visible: true,
            input: false,
            width: 150,
            label: UnitAssetEvalAnswerLang.Answer[Lang],
          },
          {
            key: 'AnswerValue',
            type: 'number',
            input: false,
            required: true,
            visible: true,
            width: 70,
            label: UnitAssetEvalAnswerLang.AnswerValue[Lang],
          },
          {
            key: 'Selected',
            type: 'checkbox',
            input: true,
            required: true,
            visible: true,
            width: 70,
            label: UnitAssetEvalAnswerLang.Selected[Lang],
          },
        ]}
      />
    </MainLayout>
  );
};

export default UnitAssetEvalAnswer;
