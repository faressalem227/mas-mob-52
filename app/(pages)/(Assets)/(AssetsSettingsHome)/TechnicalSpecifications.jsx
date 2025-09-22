import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { MainLayout, Dropdown } from '../../../../components';
import MainGrid from '../../../../components/grid/MainGrid';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import { useDropDown } from '../../../../hooks/useDropDownData';
import AssetHomeLang from '../../../../constants/Lang/AssetManagment/AssetHomeLang';
import DraftGrid from '../../../../components/grid/DraftGrid';
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

  // const { data: AssetClassList } = useDropDown(
  //   'api_ms_AssetClass_Trx_Trad',
  //   { TradeID: TradeID,CompanyID: company},
  //   'AssetClassID',
  //   'AssetClassName'
  // );
  console.log(company);

  // console.log(AssetClassList);
  return (
    <MainLayout title={AssetHomeLang.TechnicalSpecifications[Lang]} className="">
      <View className="mt-5 flex flex-1 flex-col bg-white">
        <View className="mx-4 mb-4 gap-3">
          <Dropdown
            label={AssetHomeLang.trade[Lang]}
            data={TradeList}
            initailOption={TradeList[0]?.key}
            value={TradeID}
            onChange={(e) => setTradeID(e)}
          />
          {/* <Dropdown
            label={AssetHomeLang.Classification[Lang]}
            data={AssetClassList}
            initailOption={AssetClassList[0]?.Key}
            value={AssetClass}
            onChange={(e) => setAssetClass(e)}
          /> */}
        </View>
        <DraftGrid
          pk={'AssetClassID'}
          parentKey={'AssetClassParentID'}
          isNested={true}
          spTrx={'api_ms_AssetClass_Trx_spec'}
          spIns={'api_ms_AssetClass_Ins'}
          spUpd={'api_ms_AssetClass_Upd'}
          spDel={'api_ms_AssetClass_Del'}
          TrxParam={[
            { name: 'DepartmentID', value: DepartmentID },
            { name: 'CompanyID', value: company },
            { name: 'UserName', value: user.username },
            { name: 'LangID', value: Lang },
            { name: 'TradeID', value: TradeID },
            // { name: 'TradeID', value: TradeID },
          ]}
          DelParam={[
            {
              rowData: true,
              name: 'AssetClassID',
              value: 'AssetClassID',
            },
          ]}
          UpdBody={{
            DepartmentID: DepartmentID,
            UserName: user.username,
            LangID: Lang,
            TradeID: TradeID,
            CompanyID: company,
          }}
          InsBody={{
            DepartmentID,
            UserName: user.username,
            LangID: Lang,
            CompanyID: company,
            TradeID: TradeID,
            AssetClassID: AssetClass,
          }}
          TrxDependency={[TradeID]}
          tableHead={[
            {
              key: 'AssetClassID',
            },
            // {
            //   key: 'AttributeCode',
            //   label: AssetHomeLang.Code[Lang],
            //   type: 'number',
            //   input: true,
            //   visible: true,
            // },
            {
              key: 'AssetClassName',
              label: AssetHomeLang.ClassificationName[Lang],
              input: true,
              visible: true,
            },
            // {
            //   key: 'Unit',
            //   label: AssetHomeLang.Unit[Lang],
            //   input: true,
            //   visible: true,
            // },
          ]}
          routeTo={{
            path: '/AssetAttributesValues',
            hasParams: true,
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
