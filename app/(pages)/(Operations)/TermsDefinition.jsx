import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { MainLayout, MainButton } from '../../../components';
import { useRouter, useLocalSearchParams } from 'expo-router';
import MainGrid from '../../../components/grid/MainGrid';
import OperatingSystemLang from '../../../constants/Lang/OperatingSystem/OperatingSystemLang';
import { HandleDropdownFormat, useDropDown } from '../../../hooks/useDropDownData';
import { useGlobalContext } from '../../../context/GlobalProvider';

const TermsDefinition = ({ route }) => {
  const { DepartmentID, Lang, company } = useGlobalContext();
  const router = useRouter();
  const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);
  const [width, setWidth] = useState();
  const screenHeight = Dimensions.get('window').height; // Get screen height dynamically

  useEffect(() => {
    if (windowWidth < 800) {
      setWidth('w-48'); // Set width to 250 px
    } else {
      setWidth('w-[80%]'); // Set width to 80%
    }
  }, [windowWidth]);

  //console.log("windowWidth", windowWidth);
  //console.log("computed width", width);
  return (
    <MainLayout title={OperatingSystemLang.DefiningOperatingItems[Lang]} className="">
      <View className="flex h-[100vh] flex-col bg-white">
        <View style={[styles.assetsGrid, { height: screenHeight }]}>
          <MainGrid
            tableHead={[
              {
                key: 'OperationItemID',
                label: OperatingSystemLang.Code[Lang],
                input: 'false',
                visible: 'false',
              },

              {
                key: 'OperationItemCode',
                label: OperatingSystemLang.Code[Lang],
                type: 'number',
                input: 'true',
                visible: 'true',
              },
              {
                key: 'OperationItemName',
                label: OperatingSystemLang.Item[Lang],
                input: 'true',
                visible: 'true',
              },
              {
                key: 'OperationItemUnit',
                label: OperatingSystemLang.Unit[Lang],
                input: 'true',
                visible: 'true',
              },
            ]}
            dynamicCode={{
              tbName: 'op_OperationItems',
              codeCol: 'OperationItemCode',
            }}
            pk={'OperationItemID'}
            spTrx={'api_op_OperationItems_Trx'}
            spIns={'api_op_OperationItems_Ins'}
            spUpd={'api_op_OperationItems_Upd'}
            spDel={'api_op_OperationItems_Del'}
            TrxParam={[{ name: 'DepartmentID', value: DepartmentID, CompanyID: company }]}
            DelParam={[
              { rowData: true, name: 'OperationItemID', value: 'OperationItemID' },
              { name: 'DepartmentID', value: DepartmentID },
            ]}
            UpdBody={{ DepartmentID: DepartmentID }}
            InsBody={{ DepartmentID: DepartmentID }}
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
  assetsGrid: {
    marginVertical: 16,
  },
});

export default TermsDefinition;
