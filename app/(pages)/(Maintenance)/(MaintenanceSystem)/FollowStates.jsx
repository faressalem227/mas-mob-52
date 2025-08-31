import React, { useState, useCallback, useEffect } from 'react';
import { View, Dimensions, Text, StyleSheet } from 'react-native';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import MainLayout from '../../../../components/layout/MainLayout';
import { useLocalSearchParams } from 'expo-router';
import MainGrid from '../../../../components/grid/MainGrid';
import ImportanceLang from '../../../../constants/Lang/Maintenance/MaintenanceSystem/Importance';
const FollowStates = () => {
  const screenHeight = Dimensions.get('window').height; // Get screen height dynamically
  const { DepartmentID, Lang, company, user } = useGlobalContext();

  return (
    <MainLayout title={ImportanceLang.FollowStates[Lang]} className="">
      <View className="flex h-[100vh] flex-col bg-white py-4">
        <View style={[styles.ImportanceGrid, { height: screenHeight }]}>
          <MainGrid
            tableHead={[
              {
                key: 'StateID',
                label: ' الكود  ',
                type: 'number',
                input: 'false',
                visible: 'false',
                width: 80,
              },
              {
                key: 'StateCode',
                label: `${ImportanceLang.PriorityCode[Lang]}`,
                type: 'number',
                input: 'true',
                visible: 'true',
                width: 100,
              },
              {
                key: 'StateNameAr',
                label: `${ImportanceLang.FollowStatesAr[Lang]}`,
                type: '',
                input: 'true',
                visible: 'true',
              },
              {
                key: 'StateNameEn',
                label: `${ImportanceLang.FollowStatesEn[Lang]}`,
                type: '',
                input: 'true',
                visible: 'true',
              },
            ]}
            mixedWidth={true}
            pk={'StateID'}
            spTrx={'api_ms_FollowUp_State_Trx'}
            spIns={'api_ms_FollowUp_State_Ins'}
            spUpd={'api_ms_FollowUp_State_Upd'}
            spDel={'api_ms_FollowUp_State_Del'}
            // dynamicCode={{
            //   tbName: 'ms_FollowUp_State',
            //   codeCol: 'StateCode',
            // }}
            TrxParam={[
              { name: 'DepartmentID', value: DepartmentID },
              { name: 'CompanyID', value: company },
              { name: 'UserName', value: user.username },
              { name: 'LangID', value: Lang },
            ]}
            DelParam={[
              { rowData: true, name: 'StateID', value: 'StateID' },
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
            TrxDependency={[DepartmentID]}
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
  ImportanceGrid: {
    marginVertical: 8,
  },
});

export default FollowStates;
