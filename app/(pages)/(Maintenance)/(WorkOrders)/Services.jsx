import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { MainLayout, MainButton, DatePickerInput } from '../../../../components';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { TextInput } from 'react-native';
import ArrowLineUpRight from '../../../../assets/images/ArrowLineUpRight.png';
import { useDropDown } from '../../../../hooks/useDropDownData';
import StockItemsGrid from '../../../../components/grid/StockItemsGrid';
import MainGrid from '../../../../components/grid/MainGrid';
import ServicesLang from '../../../../constants/Lang/Maintenance/WorkOrders/ServicesLang';
import { useGlobalContext } from '../../../../context/GlobalProvider';

const Services = () => {
  const {
    TradeID,
    DepartmentID,
    WorkorderID,
    FailureDescription,
    WorkorderCode,
    WorkorderName,
    WorkorderTypeID,
    WorkorderTypeName,
    WorkorderStatusName,
    preventCrud,
    ...restParams
  } = useLocalSearchParams();

  const { Lang, Rtl, company } = useGlobalContext(); // Get the current language from global context
  const [selectedScetionID, setselectedScetionID] = useState();
  const [selectdGroupID, setSelectdGroupID] = useState();
  const [ItemID, setItemID] = useState();

  const { data: Section } = useDropDown(
    'api_ms_MaterialServices_List',
    { CompanyID: company, LangID: Lang, IsServices: 1 },
    'SectionID',
    'SectionName'
  );

  const { data: Group } = useDropDown(
    'api_Sc_Item_Group_List',
    { CompanyID: company, LangID: Lang, SectionID: selectedScetionID },
    'GroupID',
    'GroupName'
  );

  const { data: Items } = useDropDown(
    'api_Sc_Items_List4',
    {
      GroupID: selectdGroupID,
      //SectionID: 9,
    },
    'ItemID',
    'ItemName'
  );

  const { data: UnitList } = useDropDown(
    'api_Sc_Units_List2',
    { ItemID: ItemID },
    'UnitID',
    'UnitName'
  );
  const { data: Asset } = useDropDown(
    'api_ms_Workorder_Assets',
    { DepartmentID: DepartmentID, WorkorderID: WorkorderID, CompanyID: company, LangID: Lang },
    'AssetID',
    'FullAssetName'
  );

  const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);
  const [width, setWidth] = useState();

  useEffect(() => {
    if (windowWidth < 800) {
      setWidth('w-48'); // Set width to 250 px
    } else {
      setWidth('w-[80%]'); // Set width to 80%
    }
  }, [windowWidth]);

  return (
    <MainLayout title={ServicesLang.PageTitle[Lang]} className="">
      <View className="flex-1">
        <MainGrid
          handleDropDownChange={(e, v) => {
            if (e === 'SectionID') {
              setselectedScetionID(v);
            }
            if (e === 'GroupID') {
              setSelectdGroupID(v);
            }
            if (e === 'ItemID') {
              setItemID(v);
            }
          }}
          tableHead={[
            {
              key: 'DepartmentName',
              label: Lang == 1 ? 'المخزن الجغرافي' : 'Department',
              type: 'text',
              input: false,
              visible: true,
              width: 200,
            },
            {
              key: 'SectionID',
              label: ServicesLang.TableHeaders.Section[Lang],
              type: 'dropdown',
              input: 'true',
              visible: 'false',
              options: Section,
              width: 100,
              required: true,

              // onChange: (val) => selectedScetionID(val)
            },
            {
              key: 'SectionName',
              label: ServicesLang.TableHeaders.Section[Lang],
              type: 'text',
              input: 'false',
              visible: 'true',
              width: 150,
            },
            {
              key: 'GroupID',
              label: ServicesLang.TableHeaders.Group[Lang],
              type: 'dropdown',
              options: Group,
              input: 'true',
              visible: 'false',
              width: 100,
              required: true,

              onChange: (val) => setSelectdGroupID(val),
            },
            {
              key: 'GroupName',
              label: ServicesLang.TableHeaders.Group[Lang],
              type: 'text',
              input: 'false',
              visible: 'true',
              width: 100,
            },
            {
              key: 'ItemID',
              label: ServicesLang.TableHeaders.Item[Lang],
              type: 'dropdown',
              options: Items,
              input: 'true',
              visible: 'false',
              width: 100,
              onChange: (val) => setItemID(val),
              required: true,
            },
            {
              key: 'ItemName',
              label: ServicesLang.TableHeaders.Item[Lang],
              input: 'false',
              visible: 'true',
              width: 250,
            },
            {
              key: 'UnitID',
              label: ServicesLang.TableHeaders.Unit[Lang],
              type: 'dropdown',
              options: UnitList,
              input: 'true',
              visible: 'false',
              width: 100,
            },
            {
              key: 'UnitName',
              label: ServicesLang.TableHeaders.Unit[Lang],
              type: 'text',
              input: 'false',
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
              required: true,
            },
            {
              key: 'UnitCost',
              label: ServicesLang.TableHeaders.UnitCost[Lang],
              type: 'number',
              input: 'false',
              visible: 'true',
              width: 100,
            },
            {
              key: 'TotalCost',
              label: ServicesLang.TableHeaders.TotalCost[Lang],
              type: 'number',
              input: 'false',
              visible: 'true',
              width: 100,
            },

            {
              key: 'IssueDate',
              label: ServicesLang.TableHeaders.IssueDate[Lang],
              type: 'date',
              input: 'true',
              visible: 'true',
              width: 200,
              preventDefault: true,
            },

            {
              key: 'AssetID',
              label: ServicesLang.TableHeaders.Asset[Lang],
              type: 'dropdown',
              options: Asset,
              input: 'true',
              visible: 'false',
              width: 100,
              required: true,
            },
            {
              key: 'AssetName',
              label: ServicesLang.TableHeaders.AssetName[Lang],
              type: '',
              input: 'false',
              visible: 'true',
              width: 150,
            },
            {
              key: 'Repeated',
              label: ServicesLang.TableHeaders.Repeated[Lang],
              type: 'checkbox',
              input: 'true',
              visible: 'true',
              width: 130,
            },
            {
              key: 'IsRequired',
              label: ServicesLang.TableHeaders.IsRequired[Lang],
              type: 'checkbox',
              input: 'true',
              visible: 'true',
              width: 150,
            },
            {
              key: 'LoanNo',
              label: ServicesLang.TableHeaders.LoanNo[Lang],
              type: 'text',
              input: 'false',
              visible: 'true',
              width: 150,
            },
            {
              key: 'DirectPurchase',
              label: ServicesLang.TableHeaders.DirectPurchase[Lang],
              type: 'checkbox',
              input: 'false',
              visible: 'true',
              width: 130,
            },
            // {
            //   key: "AssetCode",
            //   label: ServicesLang.TableHeaders.AssetCode[Lang],
            //   type: "",
            //   input: "false",
            //   visible: "true",
            //   width: 100,
            // },

            // {
            //   key: "WorkorderMaterialID",
            //   label: ServicesLang.TableHeaders.AssetName[Lang],
            //   type: "",
            //   input: "false",
            //   visible: "false",
            //   width: 100,
            // },
          ]}
          pk={'WorkorderMaterialID'}
          spTrx={'API_ms_WorkOrders_Materials_Trx8'}
          spIns={'api_ms_WorkOrders_Materials_Ins'}
          spDel={'api_ms_WorkOrders_Materials_Del'}
          spUpd={'api_ms_WorkOrders_Materials_Upd'}
          UpdBody={{
            WorkorderID: WorkorderID,
            DepartmentID: DepartmentID,
          }}
          InsBody={{
            WorkorderID: WorkorderID,
            DepartmentID: DepartmentID,
          }}
          hasCrud={preventCrud}
          TrxParam={[
            { name: 'DepartmentID', value: DepartmentID },
            { name: 'LangID', value: Lang },
            { name: 'UserName', value: 'host' },
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
          routeTo={{
            path: '/StockItemsDetails',
            hasParams: true,
            params: {
              TradeID,
              DepartmentID,
              WorkorderID,
              FailureDescription,
              WorkorderCode,
              WorkorderName,
              WorkorderTypeID,
              WorkorderTypeName,
              WorkorderStatusName,
              ...restParams,
            },
          }}
        />
      </View>
    </MainLayout>
  );
};

export default Services;
