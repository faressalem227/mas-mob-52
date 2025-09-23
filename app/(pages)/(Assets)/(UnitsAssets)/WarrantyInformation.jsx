import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MainLayout, Dropdown, MainGrid } from '../../../../components';
import { useLocalSearchParams } from 'expo-router';
import { useDropDown } from '../../../../hooks/useDropDownData';
import AssetHomeLang from '../../../../constants/Lang/AssetManagment/AssetHomeLang';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import ReportBugsLang from '../../../../constants/Lang/Maintenance/ReportBugs';
const TechnicalAssets = ({ route }) => {
  const {
    AssetID,
    SubLocationID,
    LocationID,
    AssetCode,
    AssetName,
    AssetClassName,
    AssetStatusName,
    ...restParams
  } = useLocalSearchParams();

  const { Lang, company, DepartmentID } = useGlobalContext();

  const { data: SupplierList, loading: SupplierLoader } = useDropDown(
    'Sc_Suppliers_List',
    { CompanyID: company, LangID: Lang },
    'SupplierID',
    'SupplierName'
  );

  const { data: ContractorList, loading: ContractorLoader } = useDropDown(
    'Sc_Contractor_List',
    { CompanyID: company, LangID: Lang },
    'ContractorID',
    'ContractorName'
  );

  return (
    <MainLayout title="بيانات الضمان" className="" loading={SupplierLoader || ContractorLoader}>
      <View className="flex-1">
        <MainGrid
          hasIns={false}
          hasDel={false}
          spTrx={'api_ms_Assets_Warranty_Trx'}
          spUpd={'api_ms_Assets_Warranty_Upd'}
          TrxParam={[
            { name: 'AssetID', value: AssetID },
            { name: 'DepartmentID', value: DepartmentID },
          ]}
          UpdParam={[{ name: 'AssetID', value: AssetID }]}
          mixedWidth
          tableHead={[
            {
              key: 'ContractorID',
              label: 'المقاول',
              type: 'dropdown',
              options: ContractorList,
              input: 'true',
              visible: 'false',
              width: 150,
            },
            {
              key: 'SupplierID',
              label: 'المورد',
              type: 'dropdown',
              options: SupplierList,
              input: 'true',
              visible: 'false',
              width: 150,
            },
            {
              key: 'WarrantyProvider',
              label: 'شركه الضمان',
              type: 'text',
              input: 'true',
              visible: 'true',
              width: 150,
            },
            {
              key: 'WarrantyContact',
              label: 'مسؤول الضمان',
              type: 'text',
              input: 'true',
              visible: 'true',
              width: 150,
            },
            {
              key: 'WarrantyStartDate',
              label: 'تاريخ بدايه الضمان',
              type: 'date',
              input: 'true',
              visible: 'true',
              width: 150,
            },
            {
              key: 'WarrantyEndDate',
              label: 'تاريخ نهايه الضمان',
              type: 'date',
              input: 'true',
              visible: 'true',
              width: 150,
            },
            {
              key: 'SupplierName',
              label: 'المورد',
              input: 'false',
              visible: 'true',
              width: 150,
            },
            {
              key: 'ContractorName',
              label: 'المقاول',
              input: 'false',
              visible: 'true',
              width: 250,
            },
          ]}
        />
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
    marginVertical: 8,
  },
  assetsGrid: {
    marginVertical: 8,
  },
});

export default TechnicalAssets;
