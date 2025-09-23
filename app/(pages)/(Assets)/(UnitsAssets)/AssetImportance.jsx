import { View } from 'react-native';
import { MainLayout, MainGrid } from '../../../../components';
import { useLocalSearchParams } from 'expo-router';
import AssetHomeLang from '../../../../constants/Lang/AssetManagment/AssetHomeLang';
import { useGlobalContext } from '../../../../context/GlobalProvider';

const AssetImportanceLang = {
  AssetImportance: {
    1: 'اهميه الاصل',
    2: 'Asset Importance',
  },
};

const AssetImportance = () => {
  const { AssetID } = useLocalSearchParams();
  const { Lang, company, user } = useGlobalContext();

  return (
    <MainLayout title={AssetImportanceLang.AssetImportance[Lang]}>
      <View className="flex-1">
        <MainGrid
          pk={'ConsequenceLevelTypeID'}
          spTrx={'api_ms_consequence_leveltype_Trx'}
          TrxParam={[
            { name: 'CompanyID', value: company },
            { name: 'AssetID', value: AssetID },
            { name: 'UserName', value: user.username },
            { name: 'LangID', value: Lang },
          ]}
          hasCrud={false}
          mixedWidth
          tableHead={[
            {
              key: 'LevelOfService',
              label: AssetHomeLang.ServiceLevel[Lang],
              type: 'text',
              input: 'true',
              visible: 'true',
              width: 200,
            },
            {
              key: 'NormWt',
              label: AssetHomeLang.Weight[Lang],
              type: 'number',
              input: 'true',
              visible: 'true',
              width: 200,
            },
            {
              key: 'QuestionToAsk',
              label: AssetHomeLang.Question[Lang],
              type: 'text',
              input: 'true',
              visible: 'true',
              width: 300,
            },
          ]}
          routeTo={{
            path: 'AssetImportanceAnswer',
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

export default AssetImportance;
