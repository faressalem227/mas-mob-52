import { View, Dimensions, StyleSheet } from 'react-native';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import AssetHomeLang from '../../../../constants/Lang/AssetManagment/AssetHomeLang';
import { MainLayout, MainGrid, Dropdown } from '../../../../components';
import { useDropDown } from '../../../../hooks/useDropDownData';
import { useState } from 'react';

const AdditionData = () => {
  const [TradeID, setTradeID] = useState(null);
  const screenHeight = Dimensions.get('window').height; // Get screen height dynamically
  const { DepartmentID, user, Lang, company } = useGlobalContext();

  const { data: sds_Trade } = useDropDown(
    'api_ms_Trade_List',
    {
      DepartmentID: DepartmentID,
      UserName: user.username,
      LangID: Lang,
    },
    'TradeID',
    'TradeName'
  );

  const { data: sds_DataType } = useDropDown(
    'api_sys_datatypes_list',
    {},
    'DataTypeID',
    'DataTypeName'
  );

  // console.log('TradeID', TradeID);

  return (
    <MainLayout title={AssetHomeLang.AdditionData[Lang]} className="">
      <View className="flex flex-col bg-white" style={styles.container}>
        <View className="px-3">
          <Dropdown
            placeholder={AssetHomeLang.trade[Lang]}
            onChange={(val) => setTradeID(val)}
            data={sds_Trade}
            initailOption={sds_Trade[0]?.key}
          />
        </View>
        <View style={{ height: screenHeight }}>
          <MainGrid
            pk={'AdditionID'}
            spTrx={'api_sys_addition__Trx_web'}
            spIns={'api_sys_addition__Ins_web'}
            spUpd={'api_sys_addition__Upd_web'}
            spDel={'api_sys_addition__Del_web'}
            TrxParam={[
              { name: 'CompanyID', value: company },
              { name: 'LangID', value: Lang },
              { name: 'TableID', value: 2 },
              { name: 'TradeID', value: TradeID },
            ]}
            DelParam={[
              { rowData: true, name: 'AdditionID', value: 'AdditionID' },
              { name: 'CompanyID', value: company },
              { name: 'LangID', value: Lang },
              { name: 'TableID', value: 2 },
            ]}
            UpdBody={{
              CompanyID: company,
              TableID: 2,
              TradeID,
            }}
            InsBody={{
              LangID: Lang,
              CompanyID: company,
              TableID: 2,
              TradeID,
            }}
            TrxDependency={[TradeID]}
            tableHead={[
              {
                key: 'AdditionID',
              },
              {
                key: 'AdditionNo',
                label: AssetHomeLang.AdditionCode[Lang],
                type: '',
                input: 'true',
                visible: 'true',
                width: 150,
              },
              {
                key: 'AdditionName',
                label: AssetHomeLang.AdditionName[Lang],
                input: 'true',
                visible: 'true',
                width: 150,
              },
              {
                key: 'DataTypeID',
                label: AssetHomeLang.AdditionDataTypeID[Lang],
                type: 'dropdown',
                input: true,
                width: 150,
                options: sds_DataType,
              },
              {
                key: 'DataTypeName',
                label: AssetHomeLang.AdditionDataTypeID[Lang],
                width: 150,
                visible: true,
              },
            ]}
            mixedWidth={true}
            routeTo={{
              path: '/AdditionDataDetails',
              hasParams: true,
              params: {},
            }}
          />
        </View>
      </View>
    </MainLayout>
  );
};

export default AdditionData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
