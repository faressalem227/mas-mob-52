import { View, StyleSheet, Dimensions } from 'react-native';
import { MainLayout } from '../../../../components';
import { useLocalSearchParams } from 'expo-router';
import MainGrid from '../../../../components/grid/MainGrid';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import TechnicalEvaluationDetailsLang from '../../../../constants/Lang/AssetManagment/TechnicalEvaluationDetailsLang'; // Import the language file
import InfoDetailes from '../../../../components/UI/InfoDetailes';
const TechnicalEvaluationQuestions = ({ route }) => {
  const { DepartmentID, company, Lang } = useGlobalContext(); // Get the current language from context
  const screenHeight = Dimensions.get('window').height; // Get screen height dynamically
  const { AssetClassID } = useLocalSearchParams();
  console.log(AssetClassID, 'assetclass');

  // const detailsData = [
  //   { label: TechnicalEvaluationDetailsLang.QuestionNo[Lang], value: QuestionNo },
  //   { label: TechnicalEvaluationDetailsLang.Question[Lang], value: Question },
  //   { label: TechnicalEvaluationDetailsLang.Weight[Lang], value: Weight },
  // ];
  return (
    <MainLayout title={TechnicalEvaluationDetailsLang.PageTitle[Lang]} className="">
      <View className="flex  flex-col bg-white p-3">
        {/* <InfoDetailes details={detailsData} /> */}
        <View style={[styles.assetsGrid, { height: screenHeight }]}>
          <MainGrid
            pk={'ConditionQuestionID'}
            spTrx={'api_am_condition_questions_Trx'}
            spIns={'api_am_condition_questions_Ins'}
            spUpd={'api_am_condition_questions_Upd'}
            spDel={'api_am_condition_questions_Del'}
            // dynamicCode={{
            //   tbName: 'am_Condition_Answers',
            //   codeCol: 'AnswerNo',
            // }}
            TrxParam={[
              { name: 'AssetClassID', value: AssetClassID },
              { name: 'CompanyID', value: company },
            ]}
            DelParam={[
              {
                rowData: true,
                name: 'ConditionQuestionID',
                value: 'ConditionQuestionID',
              },
              { name: 'LocationID', value: DepartmentID },
            ]}
            UpdBody={{ LocationID: DepartmentID }}
            InsBody={{ CompanyID: company, AssetClassID: AssetClassID }}
            TrxDependency={[AssetClassID]}
            tableHead={[
              {
                key: 'ConditionAnswerID',
              },
              {
                key: 'QuestionNo',
                label: TechnicalEvaluationDetailsLang.QuestionNo[Lang],
                input: 'true',
                type: 'number',
                visible: 'true',
                width: 80,
              },
              {
                key: 'Question',
                label: TechnicalEvaluationDetailsLang.Question[Lang],
                type: ' ',
                input: 'true',
                visible: 'true',
                width: 250,
              },
              {
                key: 'Weight',
                label: TechnicalEvaluationDetailsLang.Weight[Lang],
                type: 'number',
                input: 'true',
                visible: 'true',
                width: 100,
              },
            ]}
            routeTo={{
              path: '/TechnicalEvaluationAnswers',
              hasParams: true,
            }}
          />
        </View>
      </View>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dropdownContainer: {
    marginHorizontal: 16,
    marginVertical: 24,
  },
  assetsGrid: {
    marginVertical: 16,
  },
});

export default TechnicalEvaluationQuestions;
