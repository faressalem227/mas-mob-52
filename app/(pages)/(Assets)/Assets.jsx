import React, { useState, useCallback, useEffect } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { useGlobalContext } from '../../../context/GlobalProvider';
import { Dropdown } from '../../../components';
import AssetsGrid from '../../../components/grid/AssetsGrid';
import { MainLayout } from '../../../components';
import { useLocalSearchParams } from 'expo-router';
import AssetHomeLang from '../../../constants/Lang/AssetManagment/AssetHomeLang';
import { HandleDropdownFormat, useDropDown } from '../../../hooks/useDropDownData';
import api from '../../../utilities/api';
import MainGrid from '../../../components/grid/MainGrid';
import WorkOrdersLang from '../../../constants/Lang/Maintenance/WorkOrders/WorkOrdersLang';

const Assets = () => {
  const { user, company, DepartmentID, Lang } = useGlobalContext();
  const screenHeight = Dimensions.get('window').height; // Get screen height dynamically
  const [SubLocationID, setSubLocationID] = useState(40);
  const [SubLocationData, setSubLocationData] = useState([]);
  const [loading, setLoading] = useState(false); // Ensure loading state is defined
  const [TradeID, setTradeID] = useState(16);

  const params = { LocationID: DepartmentID, CompanyID: company };
  const { data: ClassList, loading: ClassLoader } = useDropDown(
    'ms_AssetClass_Trx',
    {},
    'AssetClassID',
    'AssetClassName'
  );
  const { data: AttributeList, loading: AttributeLoader } = useDropDown(
    'api_ms_AssetStatus_List',
    params,
    'AssetStatusID',
    'AssetStatusName'
  );

  const { data: TradeList, loading: TradeListLoader } = useDropDown(
    'api_ms_Trade_List',
    params,
    'TradeID',
    'TradeName'
  );
  const { data: SubLocation, loading: SubLocationLoader } = useDropDown(
    'api_ms_SubLocation_List',
    params,
    'value',
    'label'
  );
  //console.log(TradeList, 'tradeeeeeeeeeeeeeee');

  return (
    <View style={styles.container}>
      <MainLayout title={AssetHomeLang.Assets[Lang]} loading={ClassLoader || loading}>
        {/* <View style={styles.dropdownContainer}>
          <Dropdown
            // IsPaginated={{ TableName: "ms_SubLocation" }}
            // spName={{spTrx:"api_ms_SubLocation_List_PG",key:"SubLocationID",value:"SubLocationName"}}
            placeholder={AssetHomeLang.ChooseLocation[Lang]}
            data={SubLocation}
            initailOption={ SubLocationID ||SubLocation[0]?.key}
            title={AssetHomeLang.Location[Lang]}
            onChange={(e) => {
              setSubLocationID(e); // Update the SubLocationID state
            }}
          />
        </View> */}
        <View style={styles.dropdownContainer}>
          <Dropdown
            placeholder={WorkOrdersLang.TradeName[Lang]}
            label={WorkOrdersLang.TradeName[Lang]}
            initailOption={TradeID || TradeList[0]?.key}
            data={TradeList}
            onChange={(e) => {
              setTradeID(e);
            }}
          />
        </View>
        <View style={[styles.assetsGrid, { height: screenHeight - 280 }]} className="pb-12">
          <MainGrid
            tableHead={[
              {
                key: 'AssetClassID',
                label: AssetHomeLang.Classification[Lang],
                type: 'dropdown',
                options: ClassList,
                input: 'true',
                visible: 'false',
                width: 100,
              },
              {
                key: 'AssetID',
                label: '',
                input: 'false',
                visible: 'false',
              },

              {
                key: 'AssetCode',
                label: AssetHomeLang.AssetCode[Lang],
                type: 'number',
                input: 'true',
                visible: 'true',
                width: 100,
              },
              {
                key: 'AssetName',
                label: AssetHomeLang.AssetName[Lang],
                input: 'true',
                visible: 'true',
                width: 100,
              },
              {
                key: 'TradeID',
                label: WorkOrdersLang.TradeName[Lang],
                input: 'true',
                type: 'dropdown',
                options: TradeList,
                visible: 'false',
                width: 100,
              },
              {
                key: 'TradeName',
                label: WorkOrdersLang.TradeName[Lang],
                input: 'false',
                visible: 'true',
                width: 100,
              },
              {
                key: 'AssetClassName',
                label: AssetHomeLang.Classification[Lang],
                input: 'false',
                visible: 'true',
                width: 150,
              },
              {
                key: 'AssetStatusID',
                label: AssetHomeLang.Status[Lang],
                type: 'dropdown',
                options: AttributeList,
                input: 'true',
                visible: 'false',
              },
              {
                key: 'AssetStatusNameAr',
                label: AssetHomeLang.Status[Lang],
                type: '',
                input: 'false',
                visible: 'true',
                width: 100,
              },
              {
                key: 'IsActive',
                label: AssetHomeLang.Active[Lang],
                type: 'checkbox',
                input: 'true',
                visible: 'true',
                required: 'false',
                width: 100,
              },
              {
                key: 'SubLocationName',
                label: '',
                type: '',
                input: 'false',
                visible: 'false',
              },
            ]}
            pk={'AssetID'}
            spTrx={'api_ms_Assets__Trx'}
            spIns={'api_ms_Assets__Ins'}
            spUpd={'api_ms_Assets__Upd'}
            spDel={'api_ms_Assets__Del'}
            dynamicCode={{
              tbName: 'ms_assets',
              codeCol: 'AssetCode',
              CompanyID: company,
            }}
            mixedWidth
            TrxParam={[
              { name: 'DepartmentID', value: DepartmentID },
              { name: 'CompanyID', value: company },
              { name: 'UserName', value: user.username },
              { name: 'LangID', value: Lang },
              { name: 'TradeID', value: TradeID },
            ]}
            DelParam={[
              { rowData: true, name: 'AssetID', value: 'AssetID' },
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
            TrxDependency={[SubLocationID, TradeID]}
            routeTo={{
              path: '/AssetDetails',
              hasParams: true,
              params: {
                LocationID: DepartmentID,
                SubLocationID: SubLocationID,
              },
            }}
          />
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
    marginVertical: 8,
  },
  assetsGrid: {
    marginTop: 4,
    marginBottom: 68,
  },
});

export default Assets;
