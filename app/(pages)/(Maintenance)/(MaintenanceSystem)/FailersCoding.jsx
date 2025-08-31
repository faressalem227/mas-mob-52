import React, { useState, useCallback, useEffect } from 'react';
import { View, Dimensions, Text, StyleSheet } from 'react-native';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import MainLayout from '../../../../components/layout/MainLayout';
import { useLocalSearchParams } from 'expo-router';
import MainGrid from '../../../../components/grid/MainGrid';
import FailersCodingLang from '../../../../constants/Lang/Maintenance/MaintenanceSystem/FailersCoding';
const FailersCoding = () => {
  const { user, Lang, company } = useGlobalContext();
  const screenHeight = Dimensions.get('window').height; // Get screen height dynamically
  const { DepartmentID } = useGlobalContext();

  return (
    <MainLayout title={FailersCodingLang.pageTitle[Lang]} className="">
      <View className="flex h-[100vh] flex-col bg-white py-4 ">
        <View style={[styles.FailersCodingGrid, { height: screenHeight }]} className="mb-4">
          <MainGrid
            tableHead={[
              {
                key: 'FailureID',
                label: ' كود العطل ',
                type: 'number',
                input: 'false',
                visible: 'false',
                width: 80,
              },
              {
                key: 'FailureCode',
                label: `${FailersCodingLang.FailureCode[Lang]}`,
                type: 'number',
                width: 100,
                input: 'false',
                visible: 'true',
              },
              {
                key: 'FailureName',
                label: `${FailersCodingLang.FailureName[Lang]}`,
                type: 'text',
                input: 'true',
                visible: 'true',
              },
            ]}
            mixedWidth={true}
            pk={'FailureID'}
            spTrx={'api_ms_Failure_trx'}
            spIns={'api_ms_Failure_Ins'}
            spUpd={'api_ms_Failure_Upd'}
            spDel={'api_ms_Failure_Del'}
            dynamicCode={{
              tbName: 'ms_Failure',
              codeCol: 'FailureCode',
            }}
            TrxParam={[
              { name: 'DepartmentID', value: DepartmentID },
              { name: 'CompanyID', value: company },
              { name: 'UserName', value: user },
              { name: 'LangID', value: Lang },
            ]}
            DelParam={[
              { rowData: true, name: 'FailureID', value: 'FailureID' },
              { name: 'DepartmentID', value: DepartmentID },
              { name: 'CompanyID', value: company },
              { name: 'UserName', value: user },
              { name: 'LangID', value: Lang },
            ]}
            UpdBody={{
              DepartmentID: DepartmentID,
              UserName: user,
              LangID: Lang,
              CompanyID: company,
            }}
            InsBody={{
              DepartmentID: DepartmentID,
              UserName: user,
              LangID: Lang,
              CompanyID: company,
            }}
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
  FailersCodingGrid: {
    marginVertical: 8,
  },
});

export default FailersCoding;
