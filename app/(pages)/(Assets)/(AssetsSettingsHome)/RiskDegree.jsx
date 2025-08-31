import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { MainLayout, MainButton } from '../../../../components';
import { useRouter, useLocalSearchParams } from 'expo-router';
import MainGrid from '../../../../components/grid/MainGrid';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import AssetHomeLang from '../../../../constants/Lang/AssetManagment/AssetHomeLang';
const RiskDegree = ({ route }) => {
  const { DepartmentID, Lang, company } = useGlobalContext();
  const router = useRouter();
  const screenHeight = Dimensions.get('window').height; // Get screen height dynamically
  return (
    <MainLayout title={AssetHomeLang.RiskScore[Lang]} className="">
      <View className="flex h-[100vh] flex-col bg-white">
        <View style={[styles.assetsGrid, { height: screenHeight }]}>
          <MainGrid
            tableHead={[
              {
                key: 'RiskGradeCode',
                label: AssetHomeLang.Code[Lang],
                input: 'true',
                type: 'number',
                visible: 'true',
                width: 80,
              },

              {
                key: 'RiskGradeID',
                label: AssetHomeLang.Code[Lang],
                type: 'number',
                input: 'false',
                visible: 'false',
              },
              {
                key: 'RiskGradeName',
                label: AssetHomeLang.Degree[Lang],
                input: 'true',
                visible: 'true',
              },
              {
                key: 'RangeFrom',
                label: AssetHomeLang.ValueFrom[Lang],
                type: 'number',
                input: 'true',
                visible: 'true',
              },
              {
                key: 'RangeTo',
                label: AssetHomeLang.ValueTo[Lang],
                type: 'number',
                input: 'true',
                visible: 'true',
              },
            ]}
            mixedWidth
            pk={'RiskGradeID'}
            spTrx={'api_am_Risk_Grades_List'}
            spIns={'api_am_Risk_Grades_Ins'}
            spUpd={'api_am_Risk_Grades_Upd'}
            spDel={'api_am_Risk_Grades_Del'}
            dynamicCode={{
              tbName: 'am_Risk_Grades',
              codeCol: 'RiskGradeCode',
            }}
            TrxParam={[
              { name: 'LocationID', value: DepartmentID },
              { name: 'CompanyID', value: company },
            ]}
            DelParam={[
              { rowData: true, name: 'RiskGradeID', value: 'RiskGradeID' },
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

export default RiskDegree;
