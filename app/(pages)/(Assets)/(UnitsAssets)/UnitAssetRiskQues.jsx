import { View } from 'react-native';
import { MainLayout, MainGrid } from '../../../../components';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import { useLocalSearchParams } from 'expo-router';

const UnitAssetRiskQuesLang = {
  UnitAssetRiskQues: {
    1: 'اساله حساب المخاظره',
    2: 'AssetRisk Questions',
  },
  Category: {
    1: 'المجموعة',
    2: 'Group',
  },
  NormWt: {
    1: 'الوزن',
    2: 'Weight',
  },
  QuestionToAsk: {
    1: 'السؤال',
    2: 'Question',
  },
};

const UnitAssetRiskQues = () => {
  const { Lang, company, user, DepartmentID } = useGlobalContext();
  const { RiskID } = useLocalSearchParams();
  return (
    <MainLayout title={UnitAssetRiskQuesLang.UnitAssetRiskQues[Lang]}>
      <View className="flex-1">
        <MainGrid
          pk="LikelihoodLevelTypeID"
          spTrx={'api_am_likelihood_leveltype_Trx'}
          hasCrud={false}
          TrxParam={[{ name: 'CompanyID', value: company }]}
          mixedWidth
          tableHead={[
            {
              type: 'number',
              input: false,
              required: false,
              visible: false,
              key: 'LikelihoodLevelTypeID',
            },
            {
              key: 'Category',
              type: 'text',
              input: true,
              required: true,
              visible: true,
              width: 300,
              label: UnitAssetRiskQuesLang.Category[Lang],
            },
            {
              key: 'NormWt',
              type: 'number',
              input: true,
              required: true,
              placeholder: true,
              visible: true,
              width: 200,
              label: UnitAssetRiskQuesLang.NormWt[Lang],
            },
            {
              key: 'QuestionToAsk',
              type: 'text',
              input: true,
              required: true,
              visible: true,
              width: 350,
              label: UnitAssetRiskQuesLang.QuestionToAsk[Lang],
            },
          ]}
          routeTo={{
            path: 'UnitAssetRiskAns',
            hasParams: true,
            params: {
              RiskID,
            },
          }}
        />
      </View>
    </MainLayout>
  );
};

export default UnitAssetRiskQues;
