import React, { useState, useCallback, useEffect } from 'react';
import { View, Dimensions, Text, StyleSheet } from 'react-native';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import MainLayout from '../../../../components/layout/MainLayout';
import { useLocalSearchParams } from 'expo-router';
import MainGrid from '../../../../components/grid/MainGrid';
import ImportanceLang from '../../../../constants/Lang/Maintenance/MaintenanceSystem/Importance';
const FollowType = () => {
  const screenHeight = Dimensions.get('window').height; // Get screen height dynamically
  const { DepartmentID, Lang, company, user } = useGlobalContext();

  return (
    <MainLayout title={ImportanceLang.FollowTypes[Lang]} className="">
      <View className="flex h-[100vh] flex-col bg-white py-4">
        <View style={[styles.ImportanceGrid, { height: screenHeight }]}>
          <MainGrid
            tableHead={[
              {
                key: 'FollowupTypeID',
                label: ' الكود  ',
                type: 'number',
                input: 'false',
                visible: 'false',
                width: 80,
              },
              {
                key: 'FollowupTypeCode',
                label: `${ImportanceLang.PriorityCode[Lang]}`,
                type: 'number',
                input: 'true',
                visible: 'true',
                width: 100,
              },
              {
                key: 'FollowupTypeNameAr',
                label: `${ImportanceLang.FollowTypesAr[Lang]}`,
                type: '',
                input: 'true',
                visible: 'true',
                width: 200,
              },
              {
                key: 'FollowupTypeNameEn',
                label: `${ImportanceLang.FollowTypesEn[Lang]}`,
                type: '',
                input: 'true',
                visible: 'true',
                width: 200,
              },
            ]}
            mixedWidth={true}
            pk={'FollowupTypeID'}
            spTrx={'api_ms_Followup_Type_Trx'}
            spIns={'api_ms_Followup_Type_Ins'}
            spUpd={'api_ms_Followup_Type_Upd'}
            spDel={'api_ms_Followup_Type_Del'}
            dynamicCode={{
              tbName: 'ms_Followup_Type',
              codeCol: 'FollowupTypeCode',
            }}
            TrxParam={[
              { name: 'DepartmentID', value: DepartmentID },
              { name: 'CompanyID', value: company },
              { name: 'UserName', value: user.username },
              { name: 'LangID', value: Lang },
            ]}
            DelParam={[
              { rowData: true, name: 'FollowupTypeID', value: 'FollowupTypeID' },
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

export default FollowType;
