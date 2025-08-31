import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { MainLayout, MainButton, Dropdown } from '../../../components';
import { useRouter, useLocalSearchParams } from 'expo-router';
import MainGrid from '../../../components/grid/MainGrid';
import { icons } from 'lucide-react-native';
import OperatingSystemLang from '../../../constants/Lang/OperatingSystem/OperatingSystemLang';
import { useGlobalContext } from '../../../context/GlobalProvider';
import { HandleDropdownFormat, useDropDown } from '../../../hooks/useDropDownData';

const Expenses = ({ route }) => {
  const { SubLocationID, DepartmentID, ...restParams } = useLocalSearchParams();
  const router = useRouter();
  const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);
  const date = new Date();
  const [width, setWidth] = useState();
  const [Month, setMonth] = useState(date.getMonth() + 1);
  const [Year, setYear] = useState(date.getFullYear());
  const { Lang, user } = useGlobalContext();
  const screenHeight = Dimensions.get('window').height; // Get screen height dynamically

  useEffect(() => {
    if (windowWidth < 800) {
      setWidth('w-48'); // Set width to 250 px
    } else {
      setWidth('w-[80%]'); // Set width to 80%
    }
  }, [windowWidth]);

  console.log('windowWidth', windowWidth);
  console.log('computed width', width);
  const MonthID = [
    { value: OperatingSystemLang.January[Lang], key: 1 },
    { value: OperatingSystemLang.February[Lang], key: 2 },
    { value: OperatingSystemLang.March[Lang], key: 3 },
    { value: OperatingSystemLang.April[Lang], key: 4 },
    { value: OperatingSystemLang.May[Lang], key: 5 },
    { value: OperatingSystemLang.June[Lang], key: 6 },
    { value: OperatingSystemLang.July[Lang], key: 7 },
    { value: OperatingSystemLang.August[Lang], key: 8 },
    { value: OperatingSystemLang.September[Lang], key: 9 },
    { value: OperatingSystemLang.October[Lang], key: 10 },
    { value: OperatingSystemLang.November[Lang], key: 11 },
    { value: OperatingSystemLang.December[Lang], key: 12 },
  ];
  const { data: yearList, loading: yearLoader } = useDropDown(
    'admin_Years_List',
    { LocaotionID: DepartmentID },
    'YearID',
    'YearName'
  );
  console.log(yearList);

  const { data: Item } = useDropDown(
    'api_ex_Items_Trx',
    { LocationID: DepartmentID },
    'ItemID',
    'ItemName'
  );
  return (
    <MainLayout title={OperatingSystemLang.Expenses[Lang]} className="">
      <View className="flex h-[100vh] flex-col bg-white">
        <View className="m-4">
          <View className="flex  flex-row-reverse" style={{ gap: 16 }}>
            <View className="flex-1">
              <Dropdown
                title={OperatingSystemLang.Month[Lang]}
                data={MonthID}
                placeholder={OperatingSystemLang.select[Lang]}
                value={Month}
                onChange={(v) => setMonth(v)}
              />
            </View>

            <View className="flex-1">
              <Dropdown
                title={OperatingSystemLang.Year[Lang]}
                data={yearList}
                placeholder={OperatingSystemLang.select[Lang]}
                value={Year}
                onChange={(v) => setYear(v)}
              />
            </View>
            <View className="flex-1">
              <MainButton
                // alternative
                containerStyles={'p-0 flex-1 mt-8 justify-center'}
                title={OperatingSystemLang.Search[Lang]}
                textStyles={'text-base'}
                handlePress={() => {
                  router.navigate('ExpenseInquiry');
                }}
              />
            </View>
          </View>
        </View>
        <View style={[styles.assetsGrid, { height: screenHeight }]}>
          <MainGrid
            tableHead={[
              {
                key: 'TrxID',
                label: 'الكود',
                Type: 'number',
                input: 'false',
                visible: 'false',
                width: 80,
              },
              {
                key: 'TrxDate',
                label: OperatingSystemLang.Date[Lang],
                type: 'date',
                input: 'true',
                visible: 'true',
                width: 100,
              },

              {
                key: 'ItemID',
                label: OperatingSystemLang.ExpenseItem[Lang],
                type: 'dropdown',
                options: Item,
                input: 'true',
                visible: 'false',
                width: 100,
              },
              {
                key: 'ItemName',
                label: OperatingSystemLang.ExpenseItem[Lang],
                input: 'false',
                visible: 'true',
                width: 100,
              },
              {
                key: 'Cost',
                label: OperatingSystemLang.Value[Lang],
                type: 'number',
                input: 'true',
                visible: 'true',
                width: 100,
              },
              {
                key: 'Settelment',
                label: OperatingSystemLang.Settlement[Lang],
                type: 'number',
                input: 'true',
                visible: 'true',
                width: 100,
              },
              {
                key: 'TotalCost',
                label: OperatingSystemLang.TotalCost[Lang],
                type: 'number',
                input: 'false',
                visible: 'true',
                width: 100,
              },
              {
                key: 'Remarks',
                label: OperatingSystemLang.Notes[Lang],
                type: 'text',
                input: 'true',
                visible: 'true',
                required: 'false',
                width: 100,
              },
            ]}
            // StaticWidth={true}
            pk={'TrxID'}
            spTrx={'api_ex_Trx_Trx'}
            spIns={'api_ex_Trx_Ins'}
            spUpd={'api_ex_Trx_Upd'}
            spDel={'api_ex_Trx_Del'}
            TrxParam={[
              { name: 'LocationID', value: DepartmentID },
              { name: 'YearID', value: Year },
              { name: 'MonthID', value: Month },
            ]}
            DelParam={[
              { rowData: true, name: 'TrxID', value: 'TrxID' },
              { name: 'LocationID', value: DepartmentID },
            ]}
            UpdBody={{ LocationID: DepartmentID }}
            InsBody={{
              LocationID: DepartmentID,
              YearID: Year,
              MonthID: Month,
              UserName: user.username,
              LangID: Lang,
            }}
            hasSpecialButton
            TrxDependency={[Year, Month]}
            // specialButton={[
            // 	{
            // 		title: "الاستعلام عن المصروفات",
            // 		action: () => {
            // 			router.navigate("ExpenseInquiry");
            // 		},
            // 	},
            // ]}
            StaticWidth
            routeTo={{
              path: '/ExpensesData',
              hasParams: true,
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
  assetsGrid: {
    marginVertical: 16,
  },
});

export default Expenses;
