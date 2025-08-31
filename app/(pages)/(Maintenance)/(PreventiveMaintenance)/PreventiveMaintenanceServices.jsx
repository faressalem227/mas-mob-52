import { useState } from 'react';
import { View } from 'react-native';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import { useLocalSearchParams } from 'expo-router';
import { useDropDown } from '../../../../hooks/useDropDownData';
import PreventiveMaintenanceServicesLang from '../../../../constants/Lang/Maintenance/PreventiveMaintenanceHome/PreventiveMaintenance/PreventiveMaintenanceServicesLang';
import { MainLayout, MainGrid, InfoDetailes } from '../../../../components';
import PreventiveMaintenanceDetailsLang from '../../../../constants/Lang/Maintenance/PreventiveMaintenanceHome/PreventiveMaintenanceDetails';

const PreventiveMaintenanceServices = () => {
  const { Lang, company, DepartmentID, user } = useGlobalContext();

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
    { CompanyID: company, IsServices: 1, LangID: Lang, UserName: user.username },
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
    <MainLayout title={PreventiveMaintenanceServicesLang.PageTitle[Lang]} className="">
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
            { name: 'IsServices', value: 1 },
            { name: 'LangID', value: Lang },
          ]}
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
              key: 'SectionID',
              label: PreventiveMaintenanceServicesLang.TableHeaders.Section[Lang],
              type: 'dropdown',
              options: Section,
              input: true,
              width: 100,
            },
            {
              key: 'SectionName',
              label: PreventiveMaintenanceServicesLang.TableHeaders.Section[Lang],
              visible: 'true',
              width: 100,
            },
            {
              key: 'GroupID',
              label: PreventiveMaintenanceServicesLang.TableHeaders.Group[Lang],
              type: 'dropdown',
              options: Group,
              input: true,
              width: 100,
            },
            {
              key: 'GroupName',
              label: PreventiveMaintenanceServicesLang.TableHeaders.Group[Lang],
              visible: true,
              width: 150,
            },
            {
              key: 'ItemID',
              label: PreventiveMaintenanceServicesLang.TableHeaders.Item[Lang],
              type: 'dropdown',
              options: Items,
              input: 'true',
              width: 100,
            },
            {
              key: 'ItemName',
              label: PreventiveMaintenanceServicesLang.TableHeaders.Item[Lang],
              visible: 'true',
              width: 100,
            },
            {
              key: 'UnitID',
              label: PreventiveMaintenanceServicesLang.TableHeaders.Unit[Lang],
              type: 'dropdown',
              options: UnitList,
              input: 'true',
              width: 100,
            },
            {
              key: 'UnitName',
              label: PreventiveMaintenanceServicesLang.TableHeaders.Unit[Lang],
              visible: 'true',
              width: 100,
            },
            {
              key: 'Quantity',
              label: PreventiveMaintenanceServicesLang.TableHeaders.Quantity[Lang],
              type: 'number',
              input: 'true',
              visible: 'true',
              width: 100,
            },
            {
              key: 'UnitCost',
              label: PreventiveMaintenanceServicesLang.TableHeaders.UnitCost[Lang],
              type: 'number',
              visible: 'true',
              width: 100,
            },
            {
              key: 'TotalCost',
              label: PreventiveMaintenanceServicesLang.TableHeaders.TotalCost[Lang],
              type: 'number',
              visible: true,
              width: 150,
            },
          ]}
          StaticWidth
        />
      </View>
    </MainLayout>
  );
};

export default PreventiveMaintenanceServices;
