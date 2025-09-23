import { useLocalSearchParams } from 'expo-router';
import { MainLayout, MainGrid, InfoDetailes } from '../../../../components';
import AssetHomeLang from '../../../../constants/Lang/AssetManagment/AssetHomeLang';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import { View } from 'react-native';

const RiskLiklihoodDetails = () => {
  const { Lang } = useGlobalContext();
  const { LikelihoodLevelTypeID, Category, NormWt, QuestionToAsk, company } =
    useLocalSearchParams();
  const detailsData = [
    { label: AssetHomeLang.RiskGroup[Lang], value: Category },
    { label: AssetHomeLang.RiskNormW[Lang], value: NormWt },
    { label: AssetHomeLang.RiskQu[Lang], value: QuestionToAsk },
  ];
  return (
    <MainLayout title={AssetHomeLang.TechnicalEvaluation[Lang]}>
      <View>
        <InfoDetailes details={detailsData} />
      </View>
      <MainGrid
        pk={'AnswerID'}
        spTrx={'am_likelihood_answers_Trx'}
        spIns={'am_likelihood_answers_Ins'}
        spDel={'am_likelihood_answers_Del'}
        spUpd={'am_likelihood_answers_Upd'}
        TrxParam={[
          {
            name: 'CompanyID',
            value: company,
          },
          { name: 'LikelihoodLevelTypeID', value: LikelihoodLevelTypeID },
        ]}
        InsBody={{
          CompanyID: company,
          LikelihoodLevelTypeID:LikelihoodLevelTypeID,
        }}
        UpdBody={{}}
        DelParam={[
          {
            rowData: true,
            name: 'AnswerID',
            value: 'AnswerID',
          },
        ]}
        tableHead={[
          {
            arCaption: '',
            key: 'AnswerId',
            input: false,
            visible: false,
          //  keyName: 'AnswerID',
            width: 100,
          },
          {
            arCaption: '',
            key: 'LikelihoodLevelTypeID',
            input: false,
            visible: false,
          //  keyName: 'AnswerID',
            width: 100,
          },
          {
            arCaption: ' الاجابة',
            enCaption: 'Answer',
            label: AssetHomeLang.Answer[Lang],
            key: 'Answer',
            type: 'text',
            input: true,
            visible: true,
            //keyName: 'Answer',
            width: 150,
          },
          {
            arCaption: 'القيمة',
            enCaption: 'value',
            label: AssetHomeLang.Value[Lang],
            input: true,
            visible: true,
            key: 'AnswerValue',
           // keyName: 'AnswerValue',
            width: 100,
            type: 'number',
          },
          {
            arCaption: 'الوصف',
            enCaption: 'Description',
            label: AssetHomeLang.Description[Lang],
            type: 'text',
            input: true,
            visible: true,
            key: 'ValueDesc',
            width: 150,
          },
        ]}
      />
    </MainLayout>
  );
};

export default RiskLiklihoodDetails;
