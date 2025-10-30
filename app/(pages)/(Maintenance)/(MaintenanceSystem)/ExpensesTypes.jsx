import React, { useState, useCallback, useEffect } from 'react';
import { View, Dimensions, Text, StyleSheet } from 'react-native';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import MainLayout from '../../../../components/layout/MainLayout';
import { useLocalSearchParams } from 'expo-router';
import MainGrid from '../../../../components/grid/MainGrid';
import ImportanceLang from '../../../../constants/Lang/Maintenance/MaintenanceSystem/Importance';
const ExpensesTypes = () => {
  const screenHeight = Dimensions.get('window').height; // Get screen height dynamically
  const { DepartmentID, Lang, company, user } = useGlobalContext();

  return (
    <MainLayout title={ImportanceLang.ExpensesTypes[Lang]} className="">
      <View className="m-2 flex h-[100vh] flex-col bg-white py-4">
        <View style={[styles.ImportanceGrid, { height: screenHeight }]}>
          <MainGrid
            tableHead={[
              {
                key: 'ExpenseTypeID',
                label: ' الكود  ',
                type: 'number',
                input: 'false',
                visible: 'false',
                width: 80,
              },
              {
                key: 'ExpenseTypeCode',
                label: `${ImportanceLang.PriorityCode[Lang]}`,
                type: 'number',
                input: 'true',
                visible: 'true',
                width: 100,
                required: true,
              },
              {
                key: 'ExpenseTypeName',
                label: `${ImportanceLang.ExpenseType[Lang]}`,
                type: '',
                input: 'true',
                visible: 'true',
                required: true,
              },
            ]}
            mixedWidth={true}
            pk={'ExpenseTypeID'}
            spTrx={'api_ms_Expenses_Types_Trx'}
            spIns={'api_ms_Expenses_Types_Ins'}
            spUpd={'api_ms_Expenses_Types_Upd'}
            spDel={'api_ms_Expenses_Types_Del'}
            // dynamicCode={{
            //   tbName: 'ms_Expenses_Types',
            //   codeCol: 'PriorityCode',
            // }}
            TrxParam={[
              { name: 'DepartmentID', value: DepartmentID },
              { name: 'CompanyID', value: company },
              { name: 'UserName', value: user.username },
              { name: 'LangID', value: Lang },
            ]}
            DelParam={[
              { rowData: true, name: 'ExpenseTypeID', value: 'ExpenseTypeID' },
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

export default ExpensesTypes;
