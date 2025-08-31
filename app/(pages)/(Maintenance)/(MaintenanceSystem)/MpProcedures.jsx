import { View } from 'react-native';
import { MainLayout, MainGrid, Dropdown } from '../../../../components';
import MaintenanceSystem from '../../../../constants/Lang/Maintenance/MaintenanceSystem/MaintenanceSystem';

import { useGlobalContext } from '../../../../context/GlobalProvider';

import { useDropDown } from '../../../../hooks/useDropDownData';
import { useState } from 'react';

const MpProcedures = () => {
  const [TradeID, setTradeID] = useState(null);
  const [ProcedureTypeID, setProcedureTypeID] = useState(null);

  const { Lang, DepartmentID, company, user } = useGlobalContext();

  const { data: TradeList } = useDropDown(
    'api_ms_Trade_List',
    {
      DepartmentID,
      UserName: user.username,
      LangID: Lang,
      CompanyID: company,
    },
    'TradeID',
    'TradeName'
  );

  const { data: PeriodsList } = useDropDown(
    'api_ms_Periods_List',
    {
      UserName: user.username,
      LangID: Lang,
    },
    'PeriodID',
    'PeriodName'
  );

  const { data: ProcedureTypeList } = useDropDown(
    'api_ms_Procedures_Types_List',
    {
      UserName: user.username,
      LangID: Lang,
    },
    'ProcedureTypeID',
    'ProcedureTypeName'
  );

  const { data: AssetClassList } = useDropDown(
    'api_asset_classes_List3_Trade',
    {
      TradeID,
    },
    'AssetClassID',
    'FullAssetClassName',
    [TradeID]
  );

  return (
    <MainLayout title={MaintenanceSystem.MpProcedures[Lang]}>
      <View className="my-5 gap-3 px-4">
        <Dropdown
          label={MaintenanceSystem.trade[Lang]}
          initailOption={16}
          data={TradeList}
          value={TradeID}
          onChange={(val) => setTradeID(val)}
        />

        <Dropdown
          label={MaintenanceSystem.period[Lang]}
          defaultOption={ProcedureTypeList[0]}
          data={ProcedureTypeList}
          value={ProcedureTypeID}
          onChange={(val) => setProcedureTypeID(val)}
        />
      </View>

      <MainGrid
        pk={'ProcedureID'}
        spTrx={'api_ms_SMPData_Trx'}
        spIns={'api_ms_SMPData_Ins'}
        spUpd={'api_ms_SMPData_Upd'}
        spDel={'api_ms_Procedures_Del'}
        TrxParam={[
          { name: 'TradeID', value: TradeID },
          { name: 'ProcedureTypeID', value: ProcedureTypeID },
          { name: 'UserName', value: user.username },
          { name: 'CompanyID', value: company },
          { name: 'LangID', value: Lang },
          { name: 'IsSm', value: 1 },
          { name: 'TableName', value: 'ms_Procedures' },
        ]}
        InsBody={{
          DepartmentID,
          ProcedureTypeID,
          TradeID,
          LangID: Lang,
          CompanyID: company,
          UserName: user.username,
        }}
        UpdBody={{
          DepartmentID,
          ProcedureTypeID,
          TradeID,
          LangID: Lang,
          UserName: user.username,
        }}
        DelParam={[
          {
            rowData: true,
            name: 'ProcedureID',
            value: 'ProcedureID',
          },
        ]}
        TrxDependency={[TradeID, ProcedureTypeID]}
        mixedWidth
        tableHead={[
          {
            key: 'ProcedureID',
          },
          {
            key: 'DepartmentID',
          },
          {
            key: 'TradeName',
          },
          {
            key: 'ProcedureCode',
            label: MaintenanceSystem.procedureCode[Lang],
            input: true,
            visible: true,
            width: 120,
          },
          {
            key: 'ProcedureName',
            label: MaintenanceSystem.procedureName[Lang],
            input: false,
            visible: true,
            width: 220,
          },
          {
            key: 'AssetClassID',
            label: MaintenanceSystem.AssetClass[Lang],
            type: 'dropdown',
            input: true,
            options: AssetClassList,
          },
          {
            key: 'AssetClassName',
            label: MaintenanceSystem.AssetClass[Lang],
            visible: true,
            width: 320,
          },
          {
            key: 'PeriodID',
            label: MaintenanceSystem.periodName[Lang],
            type: 'dropdown',
            input: true,
            options: PeriodsList,
          },
          {
            key: 'PeriodName',
            label: MaintenanceSystem.periodName[Lang],
            visible: true,
            width: 120,
          },
        ]}
        routeTo={{
          path: '/MpProceduresDetails',
          hasParams: true,
          params: {},
        }}
      />
    </MainLayout>
  );
};

export default MpProcedures;
