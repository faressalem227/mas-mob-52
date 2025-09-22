import { MainLayout, MainGrid } from '../../../../components';
import { useLocalSearchParams } from 'expo-router';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import settingsLang from '../../../../constants/Lang/Maintenance/WorkOrders/settingsLang';

const Settings = () => {
  const { WorkorderID } = useLocalSearchParams();
  const { DepartmentID, Lang, user } = useGlobalContext();
  return (
    <MainLayout title={settingsLang.settings[Lang]}>
      <MainGrid
        pk={'WorkorderID'}
        spTrx={'ms_Workorders_Tab_Trx'}
        spUpd={'ms_Workorders_Tab_Upd'}
        TrxParam={[
          { name: 'DepartmentID ', value: DepartmentID },
          { name: 'WorkorderID', value: WorkorderID },
          { name: 'UserName', value: user.username },
          { name: 'LangID', value: Lang },
        ]}
         UpdBody={{ DepartmentID, WorkorderID, LangID: Lang, UserName: user.username }}
         TrxDependency={[DepartmentID, WorkorderID]}

        hasIns={false}
        hasDel={false}
        tableHead={[
          { key: 'WorkOrderID' },
          {
            key: 'Services',
            label: settingsLang.Services[Lang],
            type: 'checkbox',
            input: true,
            visible: true,
            width: 300,
          },
          {
            key: 'Contractors',
            label: settingsLang.Contractors[Lang],
            type: 'checkbox',
            input: true,
            visible: true,
            width: 300,
          },
          {
            key: 'ContractEstimate',
            label: settingsLang.ContractEstimate[Lang],
            type: 'checkbox',
            input: true,
            visible: true,
            width: 300,
          },
          {
            key: 'WorkorderTasks',
            label: settingsLang.WorkorderTasks[Lang],
            type: 'checkbox',
            input: true,
            visible: true,
            width: 300,
          },
          {
            key: 'FollowUP',
            label: settingsLang.FollowUP[Lang],
            type: 'checkbox',
            input: true,
            visible: true,
            width: 300,
          },
          {
            key: 'Permission',
            label: settingsLang.Permission[Lang],
            type: 'checkbox',
            input: true,
            visible: true,
            width: 180,
          },
          {
            key: 'Expenses',
            label: settingsLang.Expenses[Lang],
            type: 'checkbox',
            input: true,
            visible: true,
            width: 150,
          },
          {
            key: 'QualityControl',
            label: settingsLang.QualityControl[Lang],
            type: 'checkbox',
            input: true,
            visible: true,
            width: 120,
          },
          {
            key: 'IsAI',
            label: settingsLang.IsAI[Lang],
            type: 'checkbox',
            input: true,
            visible: true,
            width: 160,
          },
          {
            key: 'CancelWorkorder',
            label: settingsLang.CancelWorkorder[Lang],
            type: 'checkbox',
            input: true,
            visible: true,
            width: 160,
          },
        ]}
      />
    </MainLayout>
  );
};

export default Settings;
