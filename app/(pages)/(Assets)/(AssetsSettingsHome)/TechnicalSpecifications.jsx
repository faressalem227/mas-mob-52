import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { MainLayout, Dropdown } from '../../../../components';
import MainGrid from '../../../../components/grid/MainGrid';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import { useDropDown } from '../../../../hooks/useDropDownData';
import AssetHomeLang from '../../../../constants/Lang/AssetManagment/AssetHomeLang';
const TechnicalSpecifications = ({ route }) => {
  const { DepartmentID, Lang, company, user } = useGlobalContext();
  const [TradeID, setTradeID] = useState(null);
  const [AssetClass, setAssetClass] = useState(null);

  const screenHeight = Dimensions.get('window').height; // Get screen height dynamically

  const { data: TradeList } = useDropDown(
    'api_ms_Trade_List',
    {
      DepartmentID,
      UserName: user.userName,
      LangID: Lang,
    },
    'TradeID',
    'TradeName'
  );

  const { data: AssetClassList } = useDropDown(
    'api_ms_AssetClass_Trx_Trad',
    { TradeID: TradeID,CompanyID: company},
    'AssetClassID',
    'AssetClassName'
  );

  console.log(AssetClassList);
  return (
    <MainLayout title={AssetHomeLang.TechnicalSpecifications[Lang]} className="">
      <View className="mt-5 flex flex-1 flex-col bg-white">
        <View className="mx-4 mb-4 gap-3">
          <Dropdown
            label={AssetHomeLang.trade[Lang]}
            data={TradeList}
            initailOption={16}
            value={TradeID}
            onChange={(e) => setTradeID(e)}
          />
          <Dropdown
            label={AssetHomeLang.Classification[Lang]}
            data={AssetClassList}
            defaultOption={AssetClassList[0]}
            initailOption={AssetClassList[0]?.Key}
            value={AssetClass}
            onChange={(e) => setAssetClass(e)}
          />
        </View>
        <MainGrid
          pk={'AttributeID'}
          spTrx={'api_ms_AssetAttributesList_Trx'}
          spIns={'api_ms_AssetAttributesList_Ins'}
          spUpd={'api_ms_AssetAttributesList_Upd'}
          spDel={'api_ms_AssetAttributesList_Del'}
          TrxParam={[
            { name: 'DepartmentID', value: DepartmentID },
            { name: 'CompanyID', value: company },
            { name: 'UserName', value: user.username },
            { name: 'LangID', value: Lang },
            { name: 'AssetClassID', value: AssetClass },
           // { name: 'TradeID', value: TradeID },

          ]}
          DelParam={[
            {
              rowData: true,
              name: 'AttributeID',
              value: 'AttributeID',
            },
          ]}
          UpdBody={{
            DepartmentID: DepartmentID,
            UserName: user.username,
            LangID: Lang,
            CompanyID: company,
          }}
          InsBody={{
            DepartmentID,
            UserName: user.username,
            LangID: Lang,
            CompanyID: company,
            AssetClassID: AssetClass,
          }}
          TrxDependency={[AssetClass]}
          tableHead={[
            {
              key: 'AttributeID',
            },
            {
              key: 'AttributeCode',
              label: AssetHomeLang.Code[Lang],
              type: 'number',
              input: true,
              visible: true,
            },
            {
              key: 'AttributeName',
              label: AssetHomeLang.Feature[Lang],
              input: true,
              visible: true,
            },
            {
              key: 'Unit',
              label: AssetHomeLang.Unit[Lang],
              input: true,
              visible: true,
            },
          ]}
          routeTo={{
            path: '/AssetAttributesValues',
            hasParams: true,
            params: {},
          }}
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
    marginVertical: 24,
  },
  assetsGrid: {
    marginVertical: 16,
  },
});

export default TechnicalSpecifications;
