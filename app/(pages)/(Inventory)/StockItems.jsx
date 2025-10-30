import { View } from 'react-native';
import { useGlobalContext } from '../../../context/GlobalProvider';
import { Dropdown, MainGrid } from '../../../components';
import { useState, useEffect } from 'react';
import { MainLayout } from '../../../components';
import MainDataLang from '../../../constants/Lang/Invintory/MainDataLang';
import StockItemsLang from '../../../constants/Lang/Invintory/StockItemsLang';
import { useDropDown } from '../../../hooks/useDropDownData';

const StockItems = () => {
  const { DepartmentID, Lang, company, user } = useGlobalContext();
  const [SectionID, setSectionID] = useState(null);
  const [GroupID, setGroupID] = useState(null);

  const { data: itemSectionList } = useDropDown(
    'api_Sc_Item_Section_List',
    {
      CompanyID: company,
      LangID: Lang,
      UserName: user.username,
    },
    'SectionID',
    'SectionName'
  );

  const { data: itemGroupList } = useDropDown(
    'api_Sc_Item_Group_List',
    {
      CompanyID: company,
      LangID: Lang,
      UserName: user.username,
      SectionID,
    },
    'GroupID',
    'GroupName',
    [SectionID]
  );

  const { data: unitList } = useDropDown(
    'api_Sc_Item_Unit_List',
    {
      CompanyID: company,
      LangID: Lang,
      UserName: user.username,
    },
    'UnitID',
    'UnitName'
  );

  return (
    <MainLayout title={StockItemsLang.StockItems[Lang]}>
      <View className="mx-[16px] mt-6">
        <Dropdown
          data={itemSectionList}
          title={StockItemsLang.ItemsSection[Lang]}
          placeholder={StockItemsLang.ItemsSection[Lang]}
          value={SectionID}
          initailOption={itemSectionList[0]?.key}
          onChange={(v) => setSectionID(v)}
        />
      </View>
      <View className="mx-[16px] my-6">
        <Dropdown
          data={itemGroupList}
          title={StockItemsLang.Group[Lang]}
          placeholder={StockItemsLang.Group[Lang]}
          value={GroupID}
          initailOption={itemGroupList[0]?.key}
          onChange={(value) => {
            setGroupID(value);
          }}
        />
      </View>
      <View className="flex-1">
        <MainGrid
          pk={'ItemID'}
          spTrx={'api_Sc_Items__Trx_ms'}
          spIns={'api_Sc_Items__Ins'}
          spUpd={'api_Sc_Items__Upd'}
          spDel={'api_Sc_Items__Del'}
          TrxParam={[
            { name: 'CompanyID', value: company },
            { name: 'UserName', value: user.username },
            { name: 'LangID', value: Lang },
            { name: 'DepartmentID', value: DepartmentID },
            { name: 'GroupID', value: GroupID },
          ]}
          InsBody={{
            DepartmentID,
            CompanyID: company,
            GroupID,
            UserName: user.username,
            LangID: Lang,
          }}
          UpdBody={{
            DepartmentID,
            CompanyID: company,
            GroupID,
            UserName: user.username,
            LangID: Lang,
          }}
          DelParam={[
            { rowData: true, name: 'ItemID', value: 'ItemID' },
            { name: 'CompanyID', value: company },
            { name: 'UserName', value: user.username },
            { name: 'LangID', value: Lang },
          ]}
          TrxDependency={[GroupID]}
          mixedWidth
          tableHead={[
            { key: 'ItemID', hidden: true },
            { key: 'CompanyID', hidden: true },
            {
              key: 'ItemCode',
              label: StockItemsLang.ItemCode[Lang],
              type: 'number',
              input: true,
              required: true,
              width: 100,
              visible: true,
            },
            {
              key: 'ItemName',
              label: StockItemsLang.ItemName[Lang],
              colspan: 6,
              type: 'text',
              input: true,
              required: true,
              width: 200,
              visible: true,
            },
            {
              key: 'GroupID',
              label: StockItemsLang.Group[Lang],
              type: 'dropdown',
              options: itemGroupList || [],
              input: true,
              visible: false,
              required: true,
              width: 150,
            },
            {
              key: 'GroupName',
              label: StockItemsLang.Group[Lang],
              visible: true,
              width: 150,
            },
            {
              key: 'UnitID',
              label: StockItemsLang.Unit[Lang],
              options: unitList || [],
              type: 'dropdown',
              input: true,
              visible: false,
              required: true,
              width: 80,
            },
            {
              key: 'UnitName',
              label: StockItemsLang.Unit[Lang],
              visible: true,
              width: 80,
            },
            {
              key: 'UnitCost',
              label: StockItemsLang.UnitCost[Lang],
              input: true,
              required: true,
              width: 125,
              visible: true,
            },
            {
              key: 'DepartmentBalance',
              label: StockItemsLang.DepartmentBalance[Lang],
              input: false,
              required: false,
              type: 'number',
              width: 200,
              visible: true,
            },
            {
              key: 'CompanyBalance',
              label: StockItemsLang.CompanyBalance[Lang],
              input: false,
              required: false,
              type: 'number',
              width: 200,
              visible: true,
            },
            {
              key: 'CountDocuments',
              label: StockItemsLang.CountDocuments[Lang],
              input: false,
              required: false,
              width: 120,
              visible: true,
            },
          ]}
          routeTo={{
            path: '/TechnicalSpecifications',
            hasParams: true,
            params: {
              DepartmentID: DepartmentID,
              GroupID,
            },
          }}
        />
      </View>
    </MainLayout>
  );
};

export default StockItems;
