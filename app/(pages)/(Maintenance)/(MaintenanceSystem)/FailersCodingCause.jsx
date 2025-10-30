import React, { useState, useCallback, useEffect } from 'react';
import { View, Dimensions, Text, StyleSheet } from 'react-native';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import MainLayout from '../../../../components/layout/MainLayout';
import { useLocalSearchParams } from 'expo-router';
import MainGrid from '../../../../components/grid/MainGrid';
import FailersCodingCauseLang from '../../../../constants/Lang/Maintenance/MaintenanceSystem/FailersCodingCause';
const FailersCodingCause = () => {
  const screenHeight = Dimensions.get('window').height; // Get screen height dynamically
  const { DepartmentID, Lang, company, user } = useGlobalContext();

  return (
    <MainLayout title={FailersCodingCauseLang.pageTitle[Lang]} className="">
      <View className="flex h-[100vh] flex-col bg-white py-4">
        <View style={[styles.FailersCodingCauseGrid, { height: screenHeight }]}>
          <MainGrid
            tableHead={[
              {
                key: 'FailureCauseID',
                label: ' الكود  ',
                type: 'number',
                input: 'false',
                visible: 'false',
                width: 80,
              },
              {
                key: 'FailureCauseCode',
                label: `${FailersCodingCauseLang.FailureCauseCode[Lang]}`,
                type: 'number',
                input: true,
                visible: 'true',
                width: 150,
                required: true,
              },
              {
                key: 'FailureCauseName',
                label: `${FailersCodingCauseLang.FailureCauseName[Lang]}`,
                type: '',
                input: 'true',
                visible: 'true',
                required: true,
              },
            ]}
            mixedWidth={true}
            pk={'FailureCauseID'}
            spTrx={'api_ms_FailureCause_trx'}
            spIns={'api_ms_FailureCause_Ins'}
            spUpd={'api_ms_FailureCause_Upd'}
            spDel={'api_ms_FailureCause_Del'}
            dynamicCode={{
              tbName: 'ms_FailureCause',
              codeCol: 'FailureCauseCode',
            }}
            TrxParam={[
              { name: 'DepartmentID', value: DepartmentID },
              { name: 'CompanyID', value: company },
              { name: 'UserName', value: user.username },
              { name: 'LangID', value: Lang },
            ]}
            DelParam={[
              { rowData: true, name: 'FailureCauseID', value: 'FailureCauseID' },
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
            }}
            InsBody={{
              DepartmentID: DepartmentID,
              UserName: user.username,
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
  FailersCodingCauseGrid: {
    marginVertical: 8,
  },
});

export default FailersCodingCause;
