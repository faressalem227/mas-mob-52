import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { MainLayout, MainButton } from '../../../../components';
import { useRouter, useLocalSearchParams } from 'expo-router';
import MainGrid from '../../../../components/grid/MainGrid';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import AssetHomeLang from '../../../../constants/Lang/AssetManagment/AssetHomeLang';
const AssetStatus = ({ route }) => {
  const { DepartmentID, Lang, company, user } = useGlobalContext();
  const router = useRouter();
  const screenHeight = Dimensions.get('window').height; // Get screen height dynamically
  return (
    <MainLayout title={AssetHomeLang.AssetCondition[Lang]} className="">
      <View className="flex h-[100vh] flex-col bg-white p-3">
        <View style={[styles.assetsGrid, { height: screenHeight }]}>
          <MainGrid
            hasCrud={false}
            pk={'AssetStatusID'}
            spTrx={'api_ms_AssetStatus_Trx'}
            spIns={'api_ms_AssetStatus_Ins'}
            spUpd={'api_ms_AssetStatus_Upd'}
            spDel={'api_ms_AssetStatus_Del'}
            dynamicCode={{
              tbName: 'ms_AssetStatus',
              codeCol: 'AssetStatusCode',
            }}
            TrxParam={[
              { name: 'DepartmentID', value: DepartmentID },
              { name: 'CompanyID', value: company },
              { name: 'UserName', value: user },
              { name: 'LangID', value: Lang },
            ]}
            DelParam={[
              { rowData: true, name: 'AssetStatusID', value: 'AssetStatusID' },
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
            tableHead={[
              {
                key: 'AssetStatusID',
              },
              {
                key: 'AssetStatusCode',
                label: AssetHomeLang.Code[Lang],
                input: 'true',
                visible: true,
              },
              {
                key: 'AssetStatusName',
                label: AssetHomeLang.AssetCondition[Lang],
                input: 'true',
                visible: 'true',
              },
            ]}
            mixedWidth
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

export default AssetStatus;
