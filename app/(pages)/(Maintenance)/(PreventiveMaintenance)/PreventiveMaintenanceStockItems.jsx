import { useState } from 'react';
import { View } from 'react-native';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import MainLayout from '../../../../components/layout/MainLayout';
import { useLocalSearchParams } from 'expo-router';
import { useDropDown } from '../../../../hooks/useDropDownData';
import MainGrid from '../../../../components/grid/MainGrid';
import PreventiveMaintenanceStockItemsLang from '../../../../constants/Lang/Maintenance/PreventiveMaintenanceHome/PreventiveMaintenance/PreventiveMaintenanceStockItemsLang';
import PreventiveMaintenanceDetailsLang from '../../../../constants/Lang/Maintenance/PreventiveMaintenanceHome/PreventiveMaintenanceDetails';
import { InfoDetailes } from '../../../../components';

const PreventiveMaintenanceStockItems = () => {
  const { Lang, DepartmentID, company } = useGlobalContext();
  const {
    ProcedureID,
    ProcedureCode,
    ProcedureName,
    PeriodName,
    EstimatedLaborHours,
    TradeName,
    PriorityName,
    ProcedureTypeName,
  } = useLocalSearchParams();
  const [selectedScetionID, setselectedScetionID] = useState();
  const [selectdGroupID, setSelectdGroupID] = useState();
  const [ItemID, setItemID] = useState();

  const { data: Section } = useDropDown(
    'api_ms_MaterialServices_List',
    { CompanyID: company, IsServices: 0, LangID: Lang },
    'SectionID',
    'SectionName'
  );

  const { data: Group } = useDropDown(
    'api_Sc_Item_Group_List',
    { SectionID: selectedScetionID, CompanyID: company, LangID: Lang },
    'GroupID',
    'GroupName'
  );

  const { data: Items } = useDropDown(
    'api_Sc_Items_ListByGroup',
    {
      GroupID: selectdGroupID,
    },
    'ItemID',
    'ItemName'
  );

  const { data: UnitList } = useDropDown(
    'api_Sc_Units_List2',
    { ItemID: ItemID, LangID: Lang },
    'UnitID',
    'UnitName'
  );

  const detailsData = [
    { label: PreventiveMaintenanceDetailsLang.ProcedureCode[Lang], value: ProcedureCode },
    { label: PreventiveMaintenanceDetailsLang.ProcedureName[Lang], value: ProcedureName },
    { label: PreventiveMaintenanceDetailsLang.Trade[Lang], value: TradeName },
    { label: PreventiveMaintenanceDetailsLang.PriorityName[Lang], value: PriorityName },
    { label: PreventiveMaintenanceDetailsLang.Period[Lang], value: PeriodName },
    {
      label: PreventiveMaintenanceDetailsLang.EstimatedLaborHours[Lang],
      value: EstimatedLaborHours,
    },
    { label: PreventiveMaintenanceDetailsLang.ProcedureType[Lang], value: ProcedureTypeName },
  ];

  return (
    <MainLayout title={PreventiveMaintenanceStockItemsLang.PageTitle[Lang]} className="">
      <View className="flex-1">
        <InfoDetailes details={detailsData} />
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
          spTrx={'api_ms_Procedures_Materials_Trx'}
          spIns={'api_ms_Procedures_Materials_Ins'}
          spDel={'api_ms_Procedures_Materials_Del'}
          spUpd={'api_ms_Procedures_Materials_Upd'}
          pk={'ProcedureMaterilID'}
          InsBody={{ DepartmentID: DepartmentID, ProcedureID: ProcedureID }}
          TrxParam={[
            { name: 'DepartmentID', value: DepartmentID },
            { name: 'ProcedureID', value: ProcedureID },
            { name: 'IsServices', value: 0 },
            { name: 'LangID', value: Lang },
          ]}
          mixedWidth
          DelParam={[
            {
              rowData: true,
              name: 'ProcedureMaterilID',
              value: 'ProcedureMaterilID',
            },
            { name: 'DepartmentID', value: DepartmentID },
            { name: 'ProcedureID', value: ProcedureID },
          ]}
          UpdBody={{ DepartmentID: DepartmentID }}
          tableHead={[
            {
              key: 'ProcedureMaterilID',
            },
            {
              key: 'SectionID',
              label: PreventiveMaintenanceStockItemsLang.TableHeaders.Category[Lang],
              type: 'dropdown',
              options: Section,
              input: 'true',
              visible: 'false',
              width: 100,
            },
            {
              key: 'SectionName',
              label: PreventiveMaintenanceStockItemsLang.TableHeaders.Category[Lang],
              type: 'text',
              input: 'false',
              visible: 'true',
              width: 150,
            },
            {
              key: 'GroupID',
              label: PreventiveMaintenanceStockItemsLang.TableHeaders.Group[Lang],
              type: 'dropdown',
              options: Group,
              input: 'true',
              visible: 'false',
              width: 200,
            },
            {
              key: 'GroupName',
              label: PreventiveMaintenanceStockItemsLang.TableHeaders.Group[Lang],
              type: 'text',
              input: false,
              visible: true,
              width: 150,
            },
            {
              key: 'ItemID',
              label: PreventiveMaintenanceStockItemsLang.TableHeaders.Item[Lang],
              type: 'dropdown',
              options: Items,
              input: 'true',
              visible: 'false',
              width: 200,
            },
            {
              key: 'ItemName',
              label: PreventiveMaintenanceStockItemsLang.TableHeaders.Item[Lang],
              input: 'false',
              visible: 'true',
              width: 200,
            },
            {
              key: 'UnitID',
              label: PreventiveMaintenanceStockItemsLang.TableHeaders.Unit[Lang],
              type: 'dropdown',
              options: UnitList,
              input: 'true',
              visible: 'false',
              width: 120,
            },

            {
              key: 'UnitName',
              label: PreventiveMaintenanceStockItemsLang.TableHeaders.Unit[Lang],
              type: 'text',
              input: 'false',
              visible: 'true',
              width: 150,
            },
            {
              key: 'Quantity',
              label: PreventiveMaintenanceStockItemsLang.TableHeaders.Quantity[Lang],
              type: 'number',
              input: true,
              visible: true,
              Width: 200,
            },
            {
              key: 'UnitCost',
              label: PreventiveMaintenanceStockItemsLang.TableHeaders.UnitCost[Lang],
              type: 'number',
              visible: 'true',
              width: 150,
            },
            {
              key: 'TotalCost',
              label: PreventiveMaintenanceStockItemsLang.TableHeaders.TotalCost[Lang],
              type: 'text',
              visible: true,
              width: 150,
            },
            {
              key: 'ProcedureMaterialID',
            },
          ]}
        />
      </View>
    </MainLayout>
  );
};

export default PreventiveMaintenanceStockItems;
