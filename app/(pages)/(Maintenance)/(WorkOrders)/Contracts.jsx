import React, { useState, useCallback, useEffect } from 'react';
import { View, Dimensions, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import ContractsGrid from '../../../../components/grid/ContractsGrid';
import MainLayout from '../../../../components/layout/MainLayout';
import { router, useLocalSearchParams } from 'expo-router';
import { HandleDropdownFormat, useDropDown } from '../../../../hooks/useDropDownData';
import MainGrid from '../../../../components/grid/MainGrid';
import ContractsLang from '../../../../constants/Lang/Maintenance/WorkOrders/ContractsLang';

const Contracts = () => {
  const {
    TradeID,
    preventCrud,
    DepartmentID,
    WorkorderID,
    FailureDescription,
    WorkorderCode,
    WorkorderName,
    WorkorderTypeID,
    WorkorderTypeName,
    WorkorderStatusName,
    ...restParams
  } = useLocalSearchParams();

  const { user, Lang, Rtl } = useGlobalContext(); // Get the current language from global context
  const screenHeight = Dimensions.get('window').height; // Get screen height dynamically
  const [loading, setLoading] = useState(false); // Ensure loading state is defined

  const { data: Contractors, loading: ContractorsLoader } = useDropDown(
    'api_ms_Contractors_List',
    { DepartmentID: DepartmentID },
    'ContractorID',
    'ContractorName'
  );

  const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);
  const [width, setWidth] = useState();

  useEffect(() => {
    if (windowWidth < 800) {
      setWidth('w-48'); // Set width to 250 px
    } else {
      setWidth('w-[80%]'); // Set width to 80%
    }
  }, [windowWidth]);

  return (
    <MainLayout title={ContractsLang.PageTitle[Lang]} className="">
      <View className="flex h-[100vh] flex-col bg-white">
        <View style={[styles.assetsGrid, { height: screenHeight }]}>
          <MainGrid
            tableHead={[
              {
                key: 'WorkorderContractorID',
                label: ContractsLang.TableHeaders.WorkorderContractorID[Lang],
                type: '',
                input: 'false',
                visible: 'false',
                width: 100,
              },
              {
                key: 'ContractorID',
                label: ContractsLang.TableHeaders.ContractorID[Lang],
                type: 'dropdown',
                options: Contractors,
                input: 'true',
                visible: 'false',
                width: 100,
                required: true,
              },
              {
                key: 'ContractorName',
                label: ContractsLang.TableHeaders.ContractorID[Lang],
                type: '',
                input: 'false',
                visible: 'true',
                width: 150,
              },
              {
                key: 'WorkDone',
                label: ContractsLang.TableHeaders.WorkDone[Lang],
                input: 'true',
                visible: 'true',
                width: 150,
                required: true,
              },
              {
                key: 'WorkDate',
                label: ContractsLang.TableHeaders.WorkDate[Lang],
                type: 'date',
                input: 'true',
                visible: 'true',
                width: 150,
                required: true,
              },
              {
                key: 'InvoiceNo',
                label: ContractsLang.TableHeaders.InvoiceNo[Lang],
                type: 'number',
                input: 'true',
                visible: 'true',
                width: 150,
              },
              {
                key: 'InvoiceDate',
                label: ContractsLang.TableHeaders.InvoiceDate[Lang],
                type: 'date',
                input: 'true',
                visible: 'true',
                width: 150,
              },
              {
                key: 'Mech_Cost',
                label: ContractsLang.TableHeaders.Mech_Cost[Lang],
                type: 'number',
                input: 'true',
                visible: 'true',
                width: 150,
              },
              {
                key: 'Elec_Cost',
                label: ContractsLang.TableHeaders.Elec_Cost[Lang],
                type: 'number',
                input: 'true',
                visible: 'true',
                width: 150,
              },
              {
                key: 'Civil_Cost',
                label: ContractsLang.TableHeaders.Civil_Cost[Lang],
                type: 'number',
                input: 'true',
                visible: 'true',
                width: 150,
              },
              {
                key: 'Supp_Cost',
                label: ContractsLang.TableHeaders.Supp_Cost[Lang],
                type: 'number',
                input: 'true',
                visible: 'true',
                width: 150,
              },
              {
                key: 'WorkCost',
                label: ContractsLang.TableHeaders.WorkCost[Lang],
                type: 'number',
                input: 'false',
                visible: 'true',
                width: 150,
              },
              {
                key: 'Percernt_Complete',
                label: ContractsLang.TableHeaders.Percernt_Complete[Lang],
                type: 'number',
                input: 'true',
                visible: 'true',
                width: 150,
              },
              {
                key: 'IsFinal',
                label: ContractsLang.TableHeaders.IsFinal[Lang],
                type: 'checkbox',
                input: 'true',
                visible: 'true',
                required: false,
                width: 100,
              },
              {
                key: 'Notes',
                label: ContractsLang.TableHeaders.Notes[Lang],
                type: 'text',
                input: 'true',
                visible: 'true',
                required: false,

                width: 300,
              },
            ]}
            mixedWidth={true}
            pk={'WorkorderContractorID'}
            hasCrud={preventCrud}
            spTrx={'api_ms_Workorders_Contractors_Trx'}
            spIns={'api_ms_Workorders_Contractors_Ins'}
            spUpd={'api_ms_Workorders_Contractors_Upd'}
            spDel={'api_ms_Workorders_Contractors_Del'}
            TrxParam={[
              { name: 'DepartmentID', value: DepartmentID },
              { name: 'LangID', value: Lang },
              { name: 'UserName', value: 'host' },
              { name: 'WorkorderID', value: WorkorderID },
            ]}
            DelParam={[
              {
                rowData: true,
                name: 'WorkorderContractorID',
                value: 'WorkorderContractorID',
              },
              { name: 'DepartmentID', value: DepartmentID },
              { name: 'WorkorderID', value: WorkorderID },
              { name: 'LangID', value: Lang },
              { name: 'UserName', value: 'host' },
            ]}
            UpdBody={{ DepartmentID: DepartmentID }}
            InsBody={{ DepartmentID: DepartmentID, WorkorderID: WorkorderID }}
            TrxDependency={[WorkorderID]}
            routeTo={{
              path: '/ContractsDetails',
              hasParams: true,
              params: {
                DepartmentID: DepartmentID,
                preventCrud: preventCrud,
                WorkorderID: WorkorderID,
              },
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
  ContractsGrid: {
    marginVertical: 8,
  },
});

export default Contracts;
