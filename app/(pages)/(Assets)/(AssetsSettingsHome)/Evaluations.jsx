import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { MainLayout, MainButton } from '../../../../components';
import { useRouter, useLocalSearchParams } from 'expo-router';
import MainGrid from '../../../../components/grid/MainGrid';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import AssetHomeLang from '../../../../constants/Lang/AssetManagment/AssetHomeLang';
const Evaluations = ({ route }) => {
  const { DepartmentID, Lang, company } = useGlobalContext();
  const router = useRouter();
  const screenHeight = Dimensions.get('window').height; // Get screen height dynamically

  return (
    <MainLayout title={AssetHomeLang.EvaluationBodies[Lang]}>
      <View className="flex flex-col bg-white">
        <View style={[styles.assetsGrid, { height: screenHeight }]}>
          <MainGrid
            tableHead={[
              {
                key: 'EvaluatorID',
              },
              {
                key: 'Code',
                label: AssetHomeLang.Code[Lang],
                type: 'number',
                visible: 'true',
                input: 'true',

                width: 80,
              },
              {
                key: 'Eval_name',
                label: AssetHomeLang.Side[Lang],
                input: 'true',
                visible: 'true',
                width: 200,
              },
            ]}
            mixedWidth
            pk={'EvaluatorID'}
            spTrx={'api_am_Evaluator_Trx'}
            spIns={'api_am_Evaluator_Ins'}
            spUpd={'api_am_Evaluator_Upd'}
            spDel={'api_am_Evaluator_Del'}
            dynamicCode={{
              tbName: 'am_Evaluator',
              codeCol: 'Code',
            }}
            TrxParam={[
              { name: 'LocationID', value: DepartmentID },
              { name: 'CompanyID', value: company },
            ]}
            DelParam={[
              { rowData: true, name: 'EvaluatorID', value: 'EvaluatorID' },
              { name: 'LocationID', value: DepartmentID },
            ]}
            UpdBody={{ LocationID: DepartmentID }}
            InsBody={{ LocationID: DepartmentID }}
            TrxDependency={[]}
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

export default Evaluations;
