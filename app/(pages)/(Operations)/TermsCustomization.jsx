import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { MainLayout, MainButton, Dropdown } from '../../../components';
import { useRouter, useLocalSearchParams } from 'expo-router';
import MainGrid from '../../../components/grid/MainGrid';
import { HandleDropdownFormat, useDropDown } from '../../../hooks/useDropDownData';
import { useGlobalContext } from '../../../context/GlobalProvider';
import OperatingSystemLang from '../../../constants/Lang/OperatingSystem/OperatingSystemLang';
const TermsDefinition = ({ route }) => {
  const { DepartmentID, Lang, company, user } = useGlobalContext();
  const router = useRouter();
  const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);
  const [width, setWidth] = useState();
  const screenHeight = Dimensions.get('window').height; // Get screen height dynamically
  const [AssetClass, setAssetClass] = useState(false);
  //   const { data: AssetClassesList, loading: AssetClassesListLoader } = useDropDown(
  //     'ms_AssetClass_Trx',
  //     { LocationID: DepartmentID },
  //     'AssetClassID',
  //     'AssetClassName'
  //   );
  const { data: OperationItemsList, loading: OperationItemsListLoader } = useDropDown(
    'api_op_OperationItems_List',
    { DepartmentID: DepartmentID, UserName: user.username, LangID: Lang },
    'OperationItemID',
    'OperationItemName'
  );
  const { data: sds_Classes } = useDropDown(
    'api_asset_classes_List3',
    { CompanyID: company, UserName: user.username, LangID: Lang },
    'AssetClassID',
    'FullAssetClassName'
  );
  //console.log("windowWidth", windowWidth);
  //console.log("computed width", width);
  return (
    <MainLayout title={OperatingSystemLang.AllocatingOperatingItems[Lang]} className="">
      <View className="m-2 flex h-[100vh] flex-col bg-white">
        <View className="mx-[16px] my-6 ">
          <Dropdown
            title={OperatingSystemLang.Classification[Lang]}
            data={sds_Classes}
            placeholder={OperatingSystemLang.select[Lang]}
            value={AssetClass}
            initailOption={sds_Classes[0]?.key}
            onChange={(value) => {
              setAssetClass(value);
            }}
          />
        </View>
        <View style={[styles.assetsGrid, { height: screenHeight }]}>
          <MainGrid
            tableHead={[
              {
                key: 'OperationAssignID',
                label: OperatingSystemLang.Code[Lang],
                input: 'false',
                visible: 'false',
              },

              // {
              // 	key: "AssetClassID",
              // 	label: "التصنيف",
              // 	type: "dropdown",
              // 	options: AssetClassesList,
              // 	input: "true",
              // 	visible: "false",
              // },
              // {
              // 	key: "AssetClassName",
              // 	label: "التصنيف",
              // 	input: "false",
              // 	visible: "true",
              // },
              {
                key: 'Serial',
                label: OperatingSystemLang.Serial[Lang],
                input: 'true',
                visible: 'true',
              },
              {
                key: 'OperationItemID',
                label: OperatingSystemLang.Item[Lang],
                type: 'dropdown',
                options: OperationItemsList,
                input: 'true',
                visible: 'false',
              },
              {
                key: 'OperationItemName',
                label: OperatingSystemLang.Item[Lang],
                input: 'false',
                visible: 'true',
              },
              //   {
              //     key: 'OperationItemUnit',
              //     label: OperatingSystemLang.Unit[Lang],
              //     input: 'false',
              //     visible: 'true',
              //   },
              {
                key: 'Remarks',
                label: OperatingSystemLang.Notes[Lang],
                input: 'true',
                required: false,
                visible: 'true',
              },
            ]}
            dynamicCode={{
              tbName: 'op_OperationAssign',
              codeCol: 'Serial',
            }}
            pk={'OperationAssignID'}
            spTrx={'api_op_OperationAssign_Trx'}
            spIns={'api_op_OperationAssign_Ins'}
            spUpd={'api_op_OperationAssign_Upd'}
            spDel={'api_op_OperationAssign_Del'}
            TrxParam={[
              { name: 'DepartmentID', value: DepartmentID },
              {
                name: 'AssetClassID',
                value: AssetClass,
              },
              { name: 'CompanyID', value: company },
              { name: 'UserName', value: user.username },
              { name: 'LangID', value: Lang },
            ]}
            DelParam={[
              {
                rowData: true,
                name: 'OperationAssignID',
                value: 'OperationAssignID',
              },
              { name: 'DepartmentID', value: DepartmentID },
            ]}
            UpdBody={{ DepartmentID: DepartmentID }}
            InsBody={{ DepartmentID: DepartmentID, AssetClassID: AssetClass }}
            TrxDependency={[AssetClass]}
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
