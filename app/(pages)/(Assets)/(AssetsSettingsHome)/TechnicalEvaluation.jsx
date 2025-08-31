import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { MainLayout, MainButton, Dropdown } from '../../../../components';
import { useRouter, useLocalSearchParams } from 'expo-router';
import MainGrid from '../../../../components/grid/MainGrid';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import { useDropDown } from '../../../../hooks/useDropDownData';
import AssetHomeLang from '../../../../constants/Lang/AssetManagment/AssetHomeLang';
const TechnicalEvaluation = ({ route }) => {
  const { DepartmentID, Lang, company, user } = useGlobalContext();
  const [TradeID, setTradeID] = useState(null);
  const [AssetClass, setAssetClass] = useState(null);

  const screenHeight = Dimensions.get('window').height; // Get screen height dynamically

  const { data: TradeList } = useDropDown(
    'api_ms_Trade_List',
    {
      DepartmentID,
      UserName: user.userName,
      LangID: Lang,
    },
    'TradeID',
    'TradeName'
  );

  const { data: AssetClassList } = useDropDown(
      'api_ms_AssetClass_Trx_Trad',
      { TradeID: TradeID,CompanyID: company},
      'AssetClassID',
      'AssetClassName'
    );
  return (
    <MainLayout title={AssetHomeLang.TechnicalEvaluation[Lang]} className="">
      <View className="flex flex-col bg-white">
        <View style={[styles.assetsGrid, { height: screenHeight }]}>
          <View className="mx-4 mb-4 gap-3">
            <Dropdown
              label={AssetHomeLang.trade[Lang]}
              data={TradeList}
              initailOption={16}
              value={TradeID}
              onChange={(e) => setTradeID(e)}
            />
            <Dropdown
              label={AssetHomeLang.Classification[Lang]}
              data={AssetClassList}
              defaultOption={AssetClassList[0]}
              initailOption={AssetClassList[0]?.Key}
              value={AssetClass}
              onChange={(e) => setAssetClass(e)}
            />
          </View>
          <MainGrid
            pk={'ConditionAnswerID'}
            spTrx={'api_am_condition_questions_Trx'}
            spIns={'api_am_Condition_Questions_Ins'}
            spUpd={'api_am_Condition_Questions_Upd'}
            spDel={'api_am_Condition_Questions_Del'}
            TrxParam={[
              { name: 'AssetClassID', value: AssetClass },
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
            UpdBody={{ LocationID: DepartmentID, AssetClassID: AssetClass }}
            InsBody={{ LocationID: DepartmentID, AssetClassID: AssetClass }}
            TrxDependency={[AssetClass]}
            tableHead={[
              {
                key: 'ConditionQuestionID',
              },
              {
                key: 'QuestionNo',
                label: AssetHomeLang.Sequence[Lang],
                type: 'number',
                input: true,
                visible: true,
              },
              {
                key: 'Question',
                label: AssetHomeLang.evalItem[Lang],
                input: true,
                visible: true,
              },
              {
                key: 'Weight',
                label: AssetHomeLang.Weight[Lang],
                type: 'number',
                input: true,
                visible: true,
              },
            ]}
            StaticWidth
            routeTo={{
              path: '/TechnicalEvaluationDetails',
              hasParams: true,
              params: {},
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

export default TechnicalEvaluation;
