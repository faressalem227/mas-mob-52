import React, { useState } from 'react';
import { View } from 'react-native';
import { MainLayout, Dropdown } from '../../../../components';
import DraftGrid from '../../../../components/grid/DraftGrid';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import AssetHomeLang from '../../../../constants/Lang/AssetManagment/AssetHomeLang';
import { useDropDown } from '../../../../hooks/useDropDownData';
const AssetsClassification = () => {
  const { DepartmentID, Lang, company, user } = useGlobalContext();
  const [TradeID, setTradeID] = useState(null);
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

  console.log('trade', TradeList);

  return (
    <MainLayout title={AssetHomeLang.AssetClassification[Lang]} className="">
      <View className="flex-1 bg-white">
        <View className="m-4">
          <Dropdown
            placeholder={AssetHomeLang.ClassificationName[Lang]}
            label={AssetHomeLang.ClassificationName[Lang]}
            initailOption={16}
            data={TradeList}
            onChange={(e) => {
              setTradeID(e);
            }}
          />
        </View>
        <View className="flex-1">
          <DraftGrid
            isNested={true}
            pk={'AssetClassID'}
            parentKey={'AssetClassParentID'}
            spTrx={'api_ms_AssetClass_Trx_Trad'}
            spIns={'api_ms_AssetClass_Ins'}
            spUpd={'api_ms_AssetClass_Upd'}
            spDel={'api_ms_AssetClass_Del'}
            TrxParam={[
              { name: 'DepartmentID', value: DepartmentID },
              { name: 'CompanyID', value: company },
              { name: 'UserName', value: user.username },
              { name: 'LangID', value: Lang },
              { name: 'TradeID', value: TradeID },
            ]}
            DelParam={[
              { rowData: true, name: 'AssetClassID', value: 'AssetClassID' },
              { name: 'DepartmentID', value: DepartmentID },
              { name: 'CompanyID', value: company },
              { name: 'UserName', value: user.username },
              { name: 'LangID', value: Lang },
              { name: 'TradeID', value: TradeID },
            ]}
            UpdBody={{
              DepartmentID: DepartmentID,
              UserName: user.username,
              LangID: Lang,
              CompanyID: company,
              TradeID: TradeID,
            }}
            InsBody={{
              DepartmentID: DepartmentID,
              UserName: user.username,
              LangID: Lang,
              CompanyID: company,
              TradeID: TradeID,
            }}
            TrxDependency={[TradeID]}
            tableHead={[
              {
                key: 'AssetClassID',
              },
              {
                key: 'AssetClassParentID',
              },
              {
                key: 'AssetClassCode',
                label: AssetHomeLang.Code[Lang],
                type: 'number',
                input: true,
                visible: true,
                width: 80,
              },
              {
                key: 'AssetClassName',
                label: AssetHomeLang.ClassificationName[Lang],
                input: 'true',
                visible: 'true',
                width: 150,
              },
              {
                key: 'TradeID',
                label: AssetHomeLang.Trade[Lang],
                type: 'dropdown',
                options: TradeList,
                input: 'true',
                visible: 'true',
                width: 150,
              },
              {
                key: 'DepreciationRate',
                label: AssetHomeLang.DepreciationRate[Lang],
                type: 'number',
                input: 'true',
                visible: 'true',
                width: 120,
              },
              {
                key: 'ManualOperation',
                label: AssetHomeLang.ManualOperation[Lang],
                type: 'checkbox',
                input: 'true',
                visible: 'true',
                width: 120,
              },
              {
                key: 'HoursOperation',
                type: 'checkbox',
                label: AssetHomeLang.hoursOperation[Lang],
                width: 120,
                input: true,
                visible: true,
              },
              {
                key: 'DailyOperation',
                type: 'checkbox',
                label: AssetHomeLang.dailyOperation[Lang],
                width: 120,
                input: true,
                visible: true,
              },
              {
                key: 'HourlyOperation',
                type: 'checkbox',
                label: AssetHomeLang.twentyfourOperation[Lang],
                width: 150,
                input: true,
                visible: true,
              },
            ]}
            StaticWidth
          />
        </View>
      </View>
    </MainLayout>
  );
};

export default AssetsClassification;
