import { StyleSheet, View, Dimensions } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useGlobalContext } from '../../../context/GlobalProvider';
import React, { useState } from 'react';
import MainGrid from '../../../components/grid/MainGrid';
import { MainLayout } from '../../../components';
import { useDropDown } from '../../../hooks/useDropDownData';
import InvintorySystemSettingLang from '../../../constants/Lang/Invintory/InvintorySystemSettingLang';
const SpecificInventory = ({ title, hasLeftComponent = false, onDrawerPress }) => {
  const screenHeight = Dimensions.get('window').height;
  const { DepartmentID, Lang, company, user } = useGlobalContext();
  const StoresData = [
    'مخزن وقود وزيوت',
    ' مخزن قطع غيار',
    'مخزن مهمات',
    'مخزن مخلفات',
    'مخزن مشتريات لغرض البيع',
    'مطوبعات',
    'تكوين سلعي',
  ];
  const [selectedClasification, setSelectedClasification] = useState(null);
  console.log(DepartmentID);
  const { data: Employees, loading: EmployeesLoader } = useDropDown(
    'api_employee_list',
    { DepartmentID: DepartmentID },
    'key',
    'value'
  );
  return (
    <View style={styles.container}>
      <MainLayout title={InvintorySystemSettingLang.SpecificInvintory[Lang]}>
        <View className="my-4 flex-1">
          <View style={[styles.assetsGrid, { height: screenHeight - 100 }]}>
            <MainGrid
              const
              tableHead={[
                {
                  key: 'SectionID',
                  label: InvintorySystemSettingLang.InvintoryCode[Lang],
                  type: 'number',
                  input: 'false',
                  visible: 'false',
                  width: 80,
                },
                {
                  key: 'SectionCode',
                  label: InvintorySystemSettingLang.InvintoryCode[Lang],
                  type: 'number',
                  input: 'true',
                  visible: 'true',
                  width: 100,
                },
                {
                  key: 'SectionName',
                  label: InvintorySystemSettingLang.InvintoryNameAr[Lang],
                  input: 'true',
                  visible: 'true',
                  width: 150,
                },
                {
                  key: 'SectionNameEn',
                  label: InvintorySystemSettingLang.InvintoryNameEn[Lang],
                  input: 'true',
                  visible: 'true',
                  width: 150,
                },
                // {
                //   key: 'EmployeeID',
                //   label: InvintorySystemSettingLang.Invintorykeeper[Lang],
                //   type: 'dropdown',
                //   options: Employees,
                //   input: 'true',
                //   visible: 'false',
                // },
                {
                  key: 'EmployeeName',
                  label: InvintorySystemSettingLang.Invintorykeeper[Lang],
                  input: 'false',
                  visible: 'true',
                  width: 150,
                },
                {
                  key: 'IsServices',
                  label: 'خدمات',
                  type: 'checkbox',
                  input: 'true',
                  visible: 'true',
                },
              ]}
              dynamicCode={{
                tbName: 'Sc_Item_Section',
                codeCol: 'SectionCode',
              }}
              StaticWidth={true}
              // mixedWidth={true}
              pk={'SectionID'}
              spTrx={'api_Sc_Item_Section_Trx'}
              spIns={'api_Sc_Item_Section_Ins'}
              spUpd={'api_Sc_Item_Section_Upd'}
              spDel={'api_Sc_Item_Section_Del'}
              TrxParam={[
                { name: 'CompanyID', value: company },
                { name: 'LangID', value: Lang },
                { name: 'UserName', value: user },
              ]}
              DelParam={[
                { rowData: true, name: 'SectionID', value: 'SectionID' },
                { name: 'CompanyID', value: company },
              ]}
              UpdBody={{ CompanyID: company }}
              InsBody={{ CompanyID: company }}
              TrxDependency={[]}
            />
          </View>
        </View>
      </MainLayout>
    </View>
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
    marginVertical: 8,
  },
});
export default SpecificInventory;
