import { View } from 'react-native';
import { MainLayout, MainGrid } from '../../../../components';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import { useLocalSearchParams } from 'expo-router';

const UnitAssetRiskAnsLang = {
  UnitAssetRiskAns: {
    1: 'اجابه حساب المخاطره',
    2: 'Unit AssetRisk Answer',
  },
  Answer: {
    1: 'الاجابة',
    2: 'Answer',
  },
  AnswerValue: {
    1: 'القيمة',
    2: 'Answer Value',
  },
  Selected: {
    1: 'اختيار',
    2: 'Selected',
  },
};

const UnitAssetRiskAns = () => {
  const { Lang, company, user, DepartmentID } = useGlobalContext();
  const { RiskID, LikelihoodLevelTypeID } = useLocalSearchParams();

  console.log(RiskID, LikelihoodLevelTypeID);

  return (
    <MainLayout title={UnitAssetRiskAnsLang.UnitAssetRiskAns[Lang]}>
      <View className="flex-1">
        <MainGrid
          pk={'AnswerID'}
          spTrx={'api_am_asset_Likelihood_items_Trx'}
          spUpd={'api_am_asset_Likelihood_items_Upd'}
          TrxParam={[
            { name: 'RiskID', value: RiskID },
            { name: 'LikehoodLevelTypeID', value: LikelihoodLevelTypeID },
          ]}
          UpdBody={{
            RiskID,
            LikelihoodLevelTypeID,
          }}
          hasDel={false}
          hasIns={false}
          tableHead={[
            {
              required: false,
              input: false,
              visible: false,
              key: 'AnswerID',
              width: 100,
            },
            {
              key: 'Answer',
              type: 'text',
              input: false,
              required: true,
              visible: true,
              width: 250,
              label: UnitAssetRiskAnsLang.Answer[Lang],
            },
            {
              key: 'AnswerValue',
              input: false,
              required: true,
              visible: true,
              width: 250,
              type: 'number',
              label: UnitAssetRiskAnsLang.AnswerValue[Lang],
            },
            {
              type: 'checkbox',
              input: true,
              visible: true,
              key: 'Selected',
              width: 150,
              label: UnitAssetRiskAnsLang.Selected[Lang],
            },
          ]}
        />
      </View>
    </MainLayout>
  );
};

export default UnitAssetRiskAns;
