import { View } from 'react-native';
import { MainLayout, MainGrid, Dropdown } from '../../../../components';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import { useLocalSearchParams } from 'expo-router';
import { useDropDown } from '../../../../hooks/useDropDownData';
import { useState } from 'react';

const MonthlyAssetMaintenanceLang = {
  MonthlyAssetMaintenance: {
    1: 'بيانات الصيانه الشهريه',
    2: 'Monthly Maintenance Data',
  },

  // General
  YearID: { 1: 'السنة', 2: 'Year' },
  YearName: { 1: 'السنة', 2: 'Year' },
  MonthID: { 1: 'الشهر', 2: 'Month' },
  Effecency: { 1: 'الكفاءة', 2: 'Effeciency' },

  // Preventive Workorders
  PreventiveWorkorders: { 1: 'أوامر شغل الصيانة الدورية', 2: 'PM Workorders' },
  AllPreventiveWorkorders: { 1: 'عدد صادر', 2: 'All Preventive' },
  AllClosePreventiveWorkorders: { 1: 'عدد منفذ', 2: 'All Close' },
  AllWaitPreventiveWorkorders: { 1: 'عدد منتظر ق غ', 2: 'All Wait spare Parts' },
  TotalpreventiveMaterialCost: { 1: 'تكلفة ق غ', 2: 'Total Cost' },

  // Failures Workorders
  FailuresWorkorder: { 1: 'أوامر شغل الاعطال', 2: 'Failures Workorder' },
  AllCorrectiveWorkorders: { 1: 'عدد صادر', 2: 'All CM Workorders' },
  AllCloseCorrectiveWorkorders: { 1: 'عدد منفذ', 2: 'All Close CM Workorders' },
  allTotalcorrectiveMaterialCost: { 1: 'تكلفه منفذ', 2: 'All Total CM Material Cost' },
  AllWaitCorrectiveWorkorders: { 1: 'عدد منتظر ق غ', 2: 'All Wait CM Workorders' },
  TotalcorrectiveMaterialCost: { 1: 'تكلفة ق غ', 2: 'Total CM Cost' },

  // Asset Status
  AssetStatus: { 1: 'حالة المعدة', 2: 'Asset Status' },
  StatusID: { 1: 'الحالة الفنية', 2: 'Technical Status' },
  ActionRequiredID: { 1: 'الإجراء المطلوب (ID)', 2: 'Required Action (ID)' },
  ActionRequired: { 1: 'الإجراء المطلوب', 2: 'Required Action' },
  EstimatedCost: { 1: 'التكلفة التقديرية', 2: 'Estimated Cost' },

  // Alternatives
  Alternative1: {
    1: 'بديل احلال وتجديد (صيانة)',
    2: 'Rehabilitation and Renewal Alternative (Maintenance)',
  },
  Alternative1_Name: { 1: 'وصف بديل الصيانة', 2: 'Maintenance Alternative Description' },
  Alternative1_Cost: { 1: 'تكلفة بديل الصيانة', 2: 'Maintenance Alternative Cost' },
  Alternative1_Age: { 1: 'العمر المتوقع لبديل الصيانة', 2: 'Maintenance Alternative Expected Age' },

  Alternative2: {
    1: 'بديل احلال وتجديد (احلال)',
    2: 'Rehabilitation and Renewal Alternative (Rehabilitation)',
  },
  Alternative2_Name: { 1: 'وصف بديل الاحلال', 2: 'Rehabilitation Alternative Description' },
  Alternative2_Cost: { 1: 'تكلفة بديل الاحلال', 2: 'Rehabilitation Alternative Cost' },
  Alternative2_Age: {
    1: 'العمر المتوقع لبديل الاحلال',
    2: 'Rehabilitation Alternative Expected Age',
  },

  Alternative3: {
    1: 'بديل احلال وتجديد (استبدال)',
    2: 'Rehabilitation and Renewal Alternative (Replacement)',
  },
  Alternative3_Name: { 1: 'وصف بديل الاستبدال', 2: 'Replacement Alternative Description' },
  Alternative3_Cost: { 1: 'تكلفة بديل الاستبدال', 2: 'Replacement Alternative Cost' },
  Alternative3_Age: {
    1: 'العمر المتوقع لبديل الاستبدال',
    2: 'Replacement Alternative Expected Age',
  },
};

const MonthlyAssetMaintenance = () => {
  const { Lang, company, user } = useGlobalContext();
  const { AssetID } = useLocalSearchParams();

  const [YearID, setYearID] = useState(new Date().getFullYear());
  const [MonthID, setMonthID] = useState(new Date().getMonth() + 1);
  const [Effeciency, setEffeciency] = useState(null);

  const { data: YearsList } = useDropDown(
    'ms_admin_Years_List',
    {
      LangID: Lang,
      UserName: user.username,
    },
    'YearID',
    'YearName'
  );

  const { data: action_required } = useDropDown(
    'ms_action_required_List',
    {
      LangID: Lang,
      UserName: user.username,
    },
    'ActionRequiredID',
    'ActionRequired'
  );

  const { data: monthDropDown } = useDropDown(
    'ms_Months_List',
    {
      LangID: Lang,
      UserName: user.username,
    },
    'MonthID',
    'MonthName'
  );

  const { data: AssetStatusDropDown } = useDropDown(
    'ms_Asset_status_List',
    {
      LangID: Lang,
      UserName: user.username,
    },
    'StatusID',
    'StatusName'
  );

  return (
    <MainLayout title={MonthlyAssetMaintenanceLang.MonthlyAssetMaintenance[Lang]}>
      <View className="flex-1">
        <View className="my-3 px-4">
          <Dropdown
            data={YearsList}
            value={YearID}
            onChange={(value) => setYearID(value)}
            initailOption={new Date().getFullYear()}
          />
        </View>
        <MainGrid
          pk={'MaintenanceID'}
          spTrx={'api_ms_asset_maintenance_Trx'}
          spIns={'api_ms_asset_maintenance_Ins'}
          spUpd={'api_ms_asset_maintenance_Upd'}
          spDel={'api_ms_asset_maintenance_Del'}
          TrxParam={[
            { name: 'AssetID', value: AssetID },
            { name: 'YearID', value: YearID },
            { name: 'LangID', value: Lang },
            { name: 'UserName', value: user.username },
          ]}
          InsBody={{
            AssetID,
            YearID,
            LangId: Lang,
            UserName: user.username,
          }}
          UpdBody={{
            AssetID,
            YearID,
            LangId: Lang,
            UserName: user.username,
          }}
          DelParam={[{ rowData: true, name: 'MaintenanceID', value: 'MaintenanceID' }]}
          TrxDependency={[YearID]}
          mixedWidth
          tableHead={[
            {
              key: 'AssetID',
            },
            {
              key: 'YearID',
              label: MonthlyAssetMaintenanceLang.YearID[Lang],
              required: true,
              input: true,
              options: YearsList,
              type: 'dropdown',
              visible: false,
              width: 100,
            },
            {
              key: 'YearName',
              label: MonthlyAssetMaintenanceLang.YearID[Lang],
              required: false,
              type: 'text',
              input: false,
              visible: true,
              width: 100,
            },
            {
              key: 'MonthID',
              label: MonthlyAssetMaintenanceLang.MonthID[Lang],
              required: true,
              input: true,
              type: 'dropdown',
              options: monthDropDown,
              visible: true,
              width: 150,
              onChange: (val) => {
                setMonthID(val);
              },
            },
            {
              key: 'Effecency',
              label: MonthlyAssetMaintenanceLang.Effecency[Lang],
              type: 'number',
              input: true,
              required: false,
              visible: true,
              width: 120,
            },
            {
              key: 'AllPreventiveWorkorders',
              label: MonthlyAssetMaintenanceLang.AllPreventiveWorkorders[Lang],
              type: 'number',
              input: false,
              visible: true,
              width: 150,
            },
            {
              key: 'AllClosePreventiveWorkorders',
              label: MonthlyAssetMaintenanceLang.AllClosePreventiveWorkorders[Lang],
              type: 'number',
              input: false,
              visible: true,
              width: 150,
            },
            {
              key: 'AllWaitPreventiveWorkorders',
              label: MonthlyAssetMaintenanceLang.AllWaitPreventiveWorkorders[Lang],
              type: 'number',
              input: false,
              visible: true,
              width: 150,
            },
            {
              key: 'TotalpreventiveMaterialCost',
              label: MonthlyAssetMaintenanceLang.TotalpreventiveMaterialCost[Lang],
              type: 'number',
              input: false,
              visible: true,
              width: 150,
            },
            {
              key: 'AllCorrectiveWorkorders',
              label: MonthlyAssetMaintenanceLang.AllCorrectiveWorkorders[Lang],
              type: 'number',
              input: false,
              required: false,
              visible: true,
              width: 150,
            },
            {
              key: 'AllCloseCorrectiveWorkorders',
              label: MonthlyAssetMaintenanceLang.AllCloseCorrectiveWorkorders[Lang],
              type: 'number',
              input: false,
              required: false,
              visible: true,
              width: 150,
            },
            {
              key: 'allTotalcorrectiveMaterialCost',
              label: MonthlyAssetMaintenanceLang.allTotalcorrectiveMaterialCost[Lang],
              type: 'number',
              input: false,
              required: false,
              visible: true,
              width: 150,
            },
            {
              key: 'AllWaitCorrectiveWorkorders',
              label: MonthlyAssetMaintenanceLang.AllWaitCorrectiveWorkorders[Lang],
              type: 'number',
              input: false,
              required: false,
              visible: true,
              width: 150,
            },
            {
              key: 'TotalcorrectiveMaterialCost',
              label: MonthlyAssetMaintenanceLang.TotalcorrectiveMaterialCost[Lang],
              type: 'number',
              input: false,
              required: false,
              visible: true,
              width: 150,
            },
            {
              key: 'StatusID',
              label: MonthlyAssetMaintenanceLang.StatusID[Lang],
              type: 'dropdown',
              options: AssetStatusDropDown,
              input: true,
              required: false,
              visible: true,
              width: 150,
            },
            {
              key: 'ActionRequiredID',
              label: MonthlyAssetMaintenanceLang.ActionRequired[Lang],
              type: 'dropdown',
              options: action_required,
              input: true,
              required: false,
              visible: false,
              width: 100,
            },
            {
              key: 'ActionRequired',
              label: MonthlyAssetMaintenanceLang.ActionRequired[Lang],
              type: 'text',
              input: false,
              required: false,
              visible: true,
              width: 200,
            },
            {
              key: 'EstimatedCost',
              label: MonthlyAssetMaintenanceLang.EstimatedCost[Lang],
              type: 'number',
              input: true,
              required: false,
              visible: true,
              width: 150,
            },

            {
              key: 'Alternative1_Name',
              label: MonthlyAssetMaintenanceLang.Alternative1_Name[Lang],
              type: 'text',
              input: true,
              required: false,
              visible: true,
              width: 200,
            },
            {
              key: 'Alternative1_Cost',
              label: MonthlyAssetMaintenanceLang.Alternative1_Cost[Lang],
              type: 'number',
              input: true,
              required: false,
              visible: true,
              width: 150,
            },
            {
              key: 'Alternative1_Age',
              label: MonthlyAssetMaintenanceLang.Alternative1_Age[Lang],
              type: 'number',
              input: true,
              required: false,
              visible: true,
              width: 150,
            },
            {
              key: 'Alternative2_Name',
              label: MonthlyAssetMaintenanceLang.Alternative2_Name[Lang],
              type: 'text',
              input: true,
              required: false,
              visible: true,
              width: 200,
            },
            {
              key: 'Alternative2_Cost',
              label: MonthlyAssetMaintenanceLang.Alternative2_Cost[Lang],
              type: 'number',
              input: true,
              required: false,
              visible: true,
              width: 150,
            },
            {
              key: 'Alternative2_Age',
              label: MonthlyAssetMaintenanceLang.Alternative2_Age[Lang],
              type: 'number',
              input: true,
              required: false,
              visible: true,
              width: 150,
            },
            {
              key: 'Alternative3_Name',
              label: MonthlyAssetMaintenanceLang.Alternative3_Name[Lang],
              type: 'text',
              input: true,
              required: false,
              visible: true,
              width: 200,
            },
            {
              key: 'Alternative3_Cost',
              label: MonthlyAssetMaintenanceLang.Alternative3_Cost[Lang],
              type: 'number',
              input: true,
              required: false,
              visible: true,
              width: 150,
            },
            {
              key: 'Alternative3_Age',
              label: MonthlyAssetMaintenanceLang.Alternative3_Age[Lang],
              type: 'number',
              input: true,
              required: false,
              visible: true,
              width: 150,
            },
          ]}
        />
      </View>
    </MainLayout>
  );
};

export default MonthlyAssetMaintenance;
