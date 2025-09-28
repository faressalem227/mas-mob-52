import { useState } from 'react';
import { View } from 'react-native';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import MainLayout from '../../../../components/layout/MainLayout';
import { Dropdown, MainGrid } from '../../../../components';
import { useDropDown } from '../../../../hooks/useDropDownData';
import PreventiveMaintenanceLang from '../../../../constants/Lang/Maintenance/PreventiveMaintenanceHome/PreventiveMaintenance';

const CenteralPreventiveMaintenance = () => {
  const { DepartmentID, Lang, company, user } = useGlobalContext();
  const [TradeID, setTradeID] = useState([]);
  const [ProcedureTypeID, setProcedureTypeID] = useState([]);

  const { data: TradeList } = useDropDown(
    'api_ms_Trade_List_pm',
    { DepartmentID: DepartmentID, CompanyID: company },
    'TradeID',
    'TradeName'
  );

  const { data: PriorityList } = useDropDown(
    'api_ms_Priority_List',
    { DepartmentID: DepartmentID, CompanyID: company, LangID: Lang },
    'PriorityID',
    'PriorityName'
  );
  const { data: PeriodList } = useDropDown(
    'api_ms_Periods_List',
    { LocationID: DepartmentID, LangID: Lang },
    'PeriodID',
    'PeriodName'
  );
  const { data: ProceduresTypeList } = useDropDown(
    'api_ms_Procedures_Types_List',
    { DepartmentID: DepartmentID, CompanyID: company, LangID: Lang },
    'ProcedureTypeID',
    'ProcedureTypeName'
  );
  console.log(DepartmentID, 'DepartmentID');

  return (
    <MainLayout title={PreventiveMaintenanceLang.CenteralpageTitle[Lang]}>
      <View className="my-4 gap-4 px-4">
        <Dropdown
          placeholder={PreventiveMaintenanceLang.TradeChoose[Lang]}
          title={PreventiveMaintenanceLang.Trade[Lang]}
          data={TradeList}
          initailOption={TradeList[0]?.key}
          onChange={(e) => {
            setTradeID(e);
          }}
        />

        <Dropdown
          placeholder={PreventiveMaintenanceLang.ProcedureType[Lang]}
          title={PreventiveMaintenanceLang.ProcedureType[Lang]}
          data={ProceduresTypeList}
          initailOption={ProceduresTypeList[0]?.key}
          onChange={(val) => {
            setProcedureTypeID(val);
          }}
        />
      </View>

      <View className="flex-1">
        <MainGrid
          pk={'ProcedureID'}
          spTrx={'api_ms_Procedures_Trx_Central'}
          spIns={'api_ms_Procedures_Ins'}
          spUpd={'api_ms_Procedures_Upd'}
          spDel={'api_ms_Procedures_Del'}
          TrxParam={[
            { name: 'DepartmentID', value: DepartmentID },
            { name: 'CompanyID', value: company },
            { name: 'UserName', value: user.username },
            { name: 'LangID', value: Lang },
            { name: 'TradeID', value: TradeID },
            { name: 'ProcedureTypeID', value: ProcedureTypeID },
            { name: 'IsSm', value: 1 },
          ]}
          InsBody={{
            DepartmentID,
            UserName: user.username,
            LangID: Lang,
            CompanyID: company,
            TradeID: TradeID,
            ProcedureTypeID,
            IsSm: 1,
          }}
          UpdBody={{
            DepartmentID,
            UserName: user.username,
            LangID: Lang,
            CompanyID: company,
            TradeID,
          }}
          DelParam={[{ rowData: true, name: 'ProcedureID', value: 'ProcedureID' }]}
          TrxDependency={[TradeID, ProcedureTypeID]}
          StaticWidth
          tableHead={[
            {
              key: 'ProcedureID',
            },
            {
              key: 'ProcedureCode',
              label: PreventiveMaintenanceLang.ProcedureCode[Lang],
              input: true,
              visible: true,
              width: 100,
              required: true,
            },
            {
              key: 'ProcedureName',
              label: PreventiveMaintenanceLang.ProcedureName[Lang],
              input: true,
              visible: true,
              lines: 3,
              width: 150,
            },
            {
              key: 'PriorityID',
              label: PreventiveMaintenanceLang.PriorityName[Lang],
              type: 'dropdown',
              options: PriorityList,
              input: true,
              width: 100,
              required: true,
            },
            {
              key: 'PriorityName',
              label: PreventiveMaintenanceLang.PriorityName[Lang],
              visible: true,
              width: 100,
            },
            {
              key: 'PeriodName',
              label: PreventiveMaintenanceLang.Period[Lang],
              visible: true,
              width: 100,
            },
            {
              key: 'PeriodID',
              label: PreventiveMaintenanceLang.Period[Lang],
              type: 'dropdown',
              options: PeriodList,
              input: true,
              width: 100,
              required: true,
            },
            {
              key: 'SCADA',
              label: PreventiveMaintenanceLang.SCADA[Lang],
              type: 'checkbox',
              input: true,
              visible: true,
              width: 100,
            },
            {
              key: 'EstimatedLaborHours',
              label: PreventiveMaintenanceLang.EstimatedLaborHours[Lang],
              type: 'number',
              input: true,
              visible: true,
              width: 100,
            },
            // {
            //   key: 'AssetStopped',
            //   label: PreventiveMaintenanceLang.AssetStopped[Lang],
            //   type: 'checkbox',
            //   input: true,
            //   visible: true,
            //   width: 100,
            // },
            // {
            //   key: 'PlantStopped',
            //   label: PreventiveMaintenanceLang.PlantStopped[Lang],
            //   type: 'checkbox',
            //   input: true,
            //   visible: true,
            //   width: 100,
            // },
            {
              key: 'Tasks',
              label: PreventiveMaintenanceLang.Tasks[Lang],
              type: 'text',
              lines: 6,
              input: true,
              visible: true,
              width: 300,
            },
            // {
            //   key: 'SafetyName',
            //   label: PreventiveMaintenanceLang.Safety[Lang],
            //   type: 'text',
            //   lines: 6,
            //   input: true,
            //   visible: true,
            //   width: 200,
            // },
            {
              key: 'Tools',
              label: PreventiveMaintenanceLang.Tools[Lang],
              lines: 6,
              input: true,
              visible: true,
              width: 150,
            },
            {
              key: 'CountDocuments',
              label: PreventiveMaintenanceLang.CountDocuments[Lang],
              visible: true,
              width: 120,
            },
          ]}
          routeTo={{
            path: 'PreventiveMaintenanceDetails',
            hasParams: true,
            params: {
              DepartmentID: DepartmentID,
              TradeID: TradeID,
            },
          }}
        />
      </View>
    </MainLayout>
  );
};

export default CenteralPreventiveMaintenance;
