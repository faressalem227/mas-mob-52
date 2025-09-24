import { useState } from 'react';
import { View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useDropDown } from '../../../../hooks/useDropDownData';
import ScheduleAssetLang from '../../../../constants/Lang/Maintenance/PreventiveMaintenanceHome/SchedulePreventiveMaintenance/ScheduleAsset';
import { MainLayout, MainGrid } from '../../../../components';
import { useGlobalContext } from '../../../../context/GlobalProvider';
const ScheduleAsset = () => {
  const { Lang, DepartmentID } = useGlobalContext();
  const [SubLocationID, setSubLocationID] = useState(null);
  const [AssetID, setAssetID] = useState(null);
  const [CurrentRow, SetCurrentRow] = useState(null);

  const {
    TradeID,
    ScheduleCode,
    ScheduleName,
    PriorityName,
    IsActive,
    StartIssueWODate,
    PeriodName,
    WorkingDays,
    PeriodDays,
    AdjustDays,
    ExecludeHolidays,
    AssignedEmployeeName,
    ShiftWoDates,
    ScheduleID,
    TradeName,
  } = useLocalSearchParams();

  const { data: SubLocationData } = useDropDown(
    'api_ms_SubLocation_List',
    { DepartmentID: DepartmentID },
    'SubLocationID',
    'SubLocationName'
  );

  const { data: AssetData } = useDropDown(
    'api_ms_Assets_List_Schedule',
    {
      DepartmentID,
      SubLocationID,
      TradeID,
      ScheduleID,
      LangID: Lang,
    },
    'AssetID',
    'AssetName',
    [SubLocationID]
  );

  const { data: ProceduresList } = useDropDown(
    'api_ms_Procedures_List',
    { DepartmentID, ScheduleID, AssetID , IsSm: 1},
    'ProcedureID',
    'FullProcedureName'
  );

  
  return (
    <MainLayout title={ScheduleAssetLang.pageTitle[Lang]} className="">
      <View className="flex-1">
        <MainGrid
          pk={'ScheduleAssetID'}
          spTrx={'api_ms_Schedule_Assets_Trx'}
          spIns={'api_ms_Schedule_Assets_Ins'}
          spUpd={'api_ms_Schedule_Assets_Upd'}
          spDel={'api_ms_Schedule_Assets_Del'}
          TrxParam={[
            { name: 'DepartmentID', value: DepartmentID },
            { name: 'ScheduleID', value: ScheduleID },
          ]}
          DelParam={[
            { name: 'DepartmentID', value: DepartmentID },
            { rowData: true, name: 'ScheduleID', value: 'ScheduleID' },
            { rowData: true, name: 'ScheduleAssetID', value: 'ScheduleAssetID' },
          ]}
          UpdBody={{
            DepartmentID: DepartmentID,
            ScheduleID: ScheduleID,
          }}
          InsBody={{
            DepartmentID: DepartmentID,
            ScheduleID: ScheduleID,
          }}
          TrxDependency={[ScheduleID]}
          tableHead={[
            {
              key: 'ScheduleID',
            },
            {
              key: 'SubLocationID',
              label: 'الموقع',
              input: true,
              type: 'dropdown',
              options: SubLocationData,
              onChange: (val) => setSubLocationID(val),
            },
            {
              key: 'SubLocationName',
              label: 'الموقع',
              visible: true,
              width: 150,
            },
            {
              key: 'AssetCode',
              label: ScheduleAssetLang.AssetCode[Lang],
              visible: true,
              width: 150,
            },
            {
              key: 'AssetID',
              label: ScheduleAssetLang.Asset[Lang],
              type: 'dropdown',
              input: 'true',
              options: AssetData,
              onChange: (val) => setAssetID(val),
            },
            {
              key: 'AssetName',
              label: `${ScheduleAssetLang.Asset[Lang]}`,
              input: 'false',
              visible: 'true',
              width: 200,
            },
            {
              key: 'ProcedureCode',
              label: ScheduleAssetLang.ProcedureCode[Lang],
              visible: true,
              width: 150,
            },
            {
              key: 'ProcedureID',
              label: ScheduleAssetLang.Procedure[Lang],
              type: 'dropdown',
              options: ProceduresList,
              input: true,
              width: 150,
            },
            {
              key: 'ProcedureName',
              label: ScheduleAssetLang.Procedure[Lang],
              visible: true,
              width: 200,
            },
            {
              key: 'MeterValue',
              label: ScheduleAssetLang.MeterValue[Lang],
              type: 'number',
              input: 'true',
              visible: 'true',
              width: 100,
            },
            {
              key: 'ExecludeLowerMaint',
              label: ScheduleAssetLang.ExecludeLowerMaint[Lang],
              type: 'checkbox',
              input: 'true',
              visible: 'true',
              width: 140,
            },
            {
              key: 'Remarks',
              label: ScheduleAssetLang.Remarks[Lang],
              type: 'text',
              input: 'true',
              visible: 'true',
              width: 100,
            },
          ]}
          StaticWidth
        />
      </View>
    </MainLayout>
  );
};

export default ScheduleAsset;
