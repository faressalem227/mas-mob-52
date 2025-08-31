import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { MainLayout, InfoDetailes } from '../../../../components';
import { useRouter, useLocalSearchParams } from 'expo-router';
import MainGrid from '../../../../components/grid/MainGrid';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import AssetHomeLang from '../../../../constants/Lang/AssetManagment/AssetHomeLang';
const StationImportanceDetails = ({ route }) => {
  const { DepartmentID, Lang, company, user } = useGlobalContext();
  const router = useRouter();
  const screenHeight = Dimensions.get('window').height; // Get screen height dynamically
  const { ConsequenceLevelTypeID, LevelOfService, NormWt, QuestionToAsk, ...restParams } =
    useLocalSearchParams();

  const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);

  const [width, setWidth] = useState();
  useEffect(() => {
    if (windowWidth < 800) {
      setWidth('w-48'); // Set width to 250 px
    } else {
      setWidth('w-[80%]'); // Set width to 80%
    }
  }, [windowWidth]);

  const detailsData = [
    { label: AssetHomeLang.ServiceLevel[Lang], value: LevelOfService },
    { label: AssetHomeLang.Weight[Lang], value: NormWt },
    { label: AssetHomeLang.Question[Lang], value: QuestionToAsk },
  ];
  return (
    <MainLayout title={AssetHomeLang.stationImportanceDetailes[Lang]} className="">
      <View className="flex flex-col bg-white">
        <InfoDetailes details={detailsData} />
        <View style={[styles.assetsGrid, { height: screenHeight }]}>
          <MainGrid
            pk={'AnswerID'}
            spTrx={'api_ms_Consequence_Answers_Trx'}
            spIns={'api_ms_Consequence_Answers_Ins'}
            spUpd={'api_ms_Consequence_Answers_Upd'}
            spDel={'api_ms_Consequence_Answers_Del'}
            TrxParam={[
              { name: 'ConsequenceLevelTypeID', value: ConsequenceLevelTypeID },
              { name: 'DepartmentID', value: DepartmentID },
              { name: 'CompanyID', value: company },
              { name: 'UserName', value: user.username },
              { name: 'LangID', value: Lang },
            ]}
            DelParam={[
              {
                rowData: true,
                name: 'AnswerID',
                value: 'AnswerID',
              },
              { name: 'DepartmentID', value: DepartmentID },
              { name: 'CompanyID', value: company },
              { name: 'UserName', value: user.username },
              { name: 'LangID', value: Lang },
            ]}
            UpdBody={{
              DepartmentID: DepartmentID,
              UserName: user.username,
              LangID: Lang,
              CompanyID: company,
              ConsequenceLevelTypeID,
            }}
            InsBody={{
              DepartmentID: DepartmentID,
              UserName: user.username,
              LangID: Lang,
              CompanyID: company,
              ConsequenceLevelTypeID,
            }}
            TrxDependency={[ConsequenceLevelTypeID]}
            tableHead={[
              {
                key: 'AnswerID',
                label: AssetHomeLang.Code[Lang],
                type: 'number',
                input: 'false',
                visible: 'false',
              },
              {
                key: 'Answer',
                label: AssetHomeLang.Answer[Lang],
                type: ' ',
                input: 'true',
                visible: 'true',
                width: 250,
              },
              {
                key: 'AnswerValue',
                label: AssetHomeLang.Value[Lang],
                type: 'number',
                input: 'true',
                visible: 'true',
                width: 100,
              },
              {
                key: 'ValueDesc',
                label: AssetHomeLang.Description[Lang],
                type: '',
                input: 'true',
                visible: 'true',
                width: 250,
              },
            ]}
            mixedWidth={true}
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

export default StationImportanceDetails;
