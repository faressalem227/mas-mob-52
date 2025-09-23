import { View, Text } from 'react-native';

import { MainLayout, MainGrid } from '../../../../components';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import { useLocalSearchParams } from 'expo-router';

const AssetImportanceAnswerLang = {
  AssetImportanceAnswer: {
    1: 'تفاصيل اهميه الاصل',
    2: 'Asset Importance Details',
  },
  Answer: {
    1: 'الإجابة',
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

const AssetImportanceAnswer = () => {
  const { Lang, company, user } = useGlobalContext();

  const { AssetID, ConsequenceLevelTypeID } = useLocalSearchParams();

  return (
    <MainLayout title={AssetImportanceAnswerLang.AssetImportanceAnswer[Lang]}>
      <View className="flex-1">
        <MainGrid
          pk={'AnswerID'}
          hasIns={false}
          hasDel={false}
          spTrx={'api_ms_consequence_answers_items_Trx'}
          spUpd={'api_ms_consequence_answers_items_Upd'}
          TrxParam={[
            { name: 'CompanyID', value: company },
            { name: 'AssetID', value: AssetID },
            { name: 'UserName', value: user.username },
            { name: 'LangID', value: Lang },
            { name: 'ConsequenceLevelTypeID', value: ConsequenceLevelTypeID },
          ]}
          UpdBody={{
            AssetID,
            ConsequenceLevelTypeID,
          }}
          mixedWidth
          tableHead={[
            {
              key: 'Answer',
              type: 'text',
              required: false,
              visible: true,
              input: false,
              width: 200,
              label: AssetImportanceAnswerLang.Answer[Lang],
            },
            {
              key: 'AnswerValue',
              input: false,
              required: true,
              visible: true,
              width: 70,
              label: AssetImportanceAnswerLang.AnswerValue[Lang],
            },
            {
              key: 'Selected',
              type: 'checkbox',
              input: true,
              required: true,
              visible: true,
              width: 70,
              label: AssetImportanceAnswerLang.Selected[Lang],
            },
          ]}
        />
      </View>
    </MainLayout>
  );
};

export default AssetImportanceAnswer;
