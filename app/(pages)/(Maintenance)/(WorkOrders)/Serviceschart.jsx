/* eslint-disable eqeqeq */
import { useState } from 'react';
import { View } from 'react-native';
import { MainLayout } from '../../../../components';
import { useLocalSearchParams } from 'expo-router';
import { useDropDown } from '../../../../hooks/useDropDownData';
import MainGrid from '../../../../components/grid/MainGrid';
import ServicesLang from '../../../../constants/Lang/Maintenance/WorkOrders/ServicesLang';
import { useGlobalContext } from '../../../../context/GlobalProvider';

const Serviceschart = () => {
  const {
    TradeID,
    WorkorderID,
    FailureDescription,
    WorkorderCode,
    WorkorderName,
    WorkorderTypeID,
    WorkorderTypeName,
    WorkorderStatusName,
    preventCrud,
    WorkorderStatusID,
  } = useLocalSearchParams();

  const { Lang, DepartmentID, user, company } = useGlobalContext(); // Get the current language from global context
  const [selectedScetionID, setselectedScetionID] = useState();
  const [selectdGroupID, setSelectdGroupID] = useState();
  const [SectionID, setSectionID] = useState(null);
  const [GroupID, setGroupID] = useState(null);
  const [ItemID, setItemID] = useState();

  const { data: Section } = useDropDown(
    'api_ms_MaterialServices_List1',
    {
      UserName: user.username,
      LangID: Lang,
    },
    'SectionID',
    'SectionName'
  );

  const { data: Group } = useDropDown(
    'api_Sc_Item_Group_List',
    {
      CompanyID: company,
      SectionID,
      UserName: user.username,
      LangID: Lang,
    },
    'GroupID',
    'GroupName',
    [SectionID]
  );

  const { data: Items } = useDropDown(
    'api_Sc_Items_List4',
    {
      GroupID,
      UserName: user.username,
      LangID: Lang,
    },
    'ItemID',
    'FullItemName',
    [GroupID]
  );

  const { data: UnitList } = useDropDown(
    'api_Sc_Units_List2',
    {
      ItemID,
      UserName: user.username,
      LangID: Lang,
    },
    'UnitID',
    'UnitName',
    [ItemID]
  );

  return (
    <MainLayout title={ServicesLang.TableHeaders.contracting[Lang]}>
      <View className="flex-1">
        <MainGrid
          pk={'WorkorderMaterialID'}
          spTrx={'api_ms_WorkOrders_Planned_Materials_Trx'}
          spIns={'api_ms_WorkOrders_Planned_Materials_Ins'}
          spDel={'api_ms_WorkOrders_Planned_Materials_Del'}
          spUpd={'api_ms_WorkOrders_Planned_Materials_Upd'}
          UpdBody={{
            WorkorderID,
            DepartmentID,
          }}
          InsBody={{
            WorkorderID,
            DepartmentID,
          }}
          hasCrud={parseInt(WorkorderStatusID) < 3 || parseInt(WorkorderStatusID) == 5}
          TrxParam={[
            { name: 'DepartmentID', value: DepartmentID },
            { name: 'LangID', value: Lang },
            { name: 'UserName', value: user.username },
            { name: 'WorkorderID', value: WorkorderID },
          ]}
          DelParam={[
            {
              rowData: true,
              name: 'WorkorderMaterialID',
              value: 'WorkorderMaterialID',
            },
            { name: 'DepartmentID', value: DepartmentID },
            { name: 'WorkorderID', value: WorkorderID },
          ]}
          TrxDependency={[WorkorderID]}
          mixedWidth
          tableHead={[
            {
              key: 'SectionID',
              label: ServicesLang.TableHeaders.Section[Lang],
              type: 'dropdown',
              options: Section,
              input: 'true',
              width: 100,
              onChange: (val) => setSectionID(val),
            },
            {
              key: 'SectionName',
              label: ServicesLang.TableHeaders.Section[Lang],
              type: 'text',
              visible: 'true',
              width: 100,
            },
            {
              key: 'GroupID',
              label: ServicesLang.TableHeaders.Group[Lang],
              type: 'dropdown',
              options: Group,
              input: 'true',
              width: 100,
              onChange: (val) => setGroupID(val),
            },
            {
              key: 'GroupName',
              label: ServicesLang.TableHeaders.Group[Lang],
              visible: 'true',
              width: 150,
            },
            {
              key: 'ItemID',
              label: ServicesLang.TableHeaders.Item[Lang],
              type: 'dropdown',
              options: Items,
              input: 'true',
              width: 100,
              onChange: (val) => setItemID(val),
            },
            {
              key: 'ItemName',
              label: ServicesLang.TableHeaders.Item[Lang],
              visible: 'true',
              width: 100,
            },
            {
              key: 'UnitID',
              label: ServicesLang.TableHeaders.Unit[Lang],
              type: 'dropdown',
              options: UnitList,
              input: 'true',
              width: 100,
            },
            {
              key: 'UnitName',
              label: ServicesLang.TableHeaders.Unit[Lang],
              visible: 'true',
              width: 100,
            },
            {
              key: 'Quantity',
              label: ServicesLang.TableHeaders.Quantity[Lang],
              type: 'number',
              input: 'true',
              visible: 'true',
              width: 100,
            },
            {
              key: 'UnitCost',
              label: ServicesLang.TableHeaders.UnitCost[Lang],
              type: 'number',
              input: 'true',
              visible: 'true',
              width: 100,
            },
            {
              key: 'TotalCost',
              label: ServicesLang.TableHeaders.TotalCost[Lang],
              type: 'number',
              visible: 'true',
              width: 100,
            },
          ]}
        />
      </View>
    </MainLayout>
  );
};

export default Serviceschart;
