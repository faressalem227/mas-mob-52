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
        spTrx={'api_ms_Workorders_Tab_Trx'}
        spUpd={'ms_Workorders_Tab_Upd'}
        TrxParam={[
          { name: 'WorkorderID', value: WorkorderID },
          { name: 'DepartmentID ', value: DepartmentID },
          { name: 'LangID', value: Lang },
          { name: 'UserName', value: user.username },
        ]}
        tableHead={[
          { key: 'WorkOrderID' },
          {
            key: 'Services',
            label: settingsLang.Services[Lang],
            type: 'checkbox',
            input: true,
            visible: true,
            width: 150,
          },
          {
            key: 'Contractors',
            label: settingsLang.Contractors[Lang],
            type: 'checkbox',
            input: true,
            visible: true,
            width: 190,
          },
          {
            key: 'ContractEstimate',
            label: settingsLang.ContractEstimate[Lang],
            type: 'checkbox',
            input: true,
            visible: true,
            width: 190,
          },
          {
            key: 'WorkorderTasks',
            label: settingsLang.WorkorderTasks[Lang],
            type: 'checkbox',
            input: true,
            visible: true,
            width: 180,
          },
          {
            key: 'FollowUP',
            label: settingsLang.FollowUP[Lang],
            type: 'checkbox',
            input: true,
            visible: true,
            width: 180,
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
