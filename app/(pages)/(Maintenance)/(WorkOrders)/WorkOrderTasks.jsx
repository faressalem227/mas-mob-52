import { useState } from 'react';
import { View } from 'react-native';
import { MainLayout, Dropdown, MainGrid } from '../../../../components';
import { useLocalSearchParams } from 'expo-router';
import { useDropDown } from '../../../../hooks/useDropDownData';
import WorkOrderAssetsLang from '../../../../constants/Lang/Maintenance/WorkOrders/WorkOrderAssetsLang'; // Import the language file
import { useGlobalContext } from '../../../../context/GlobalProvider'; // Import the context

const WorkOrderTasks = () => {
  const { DepartmentID, Lang } = useGlobalContext();
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

  const [ProcedureID, setProcedureID] = useState(null);

  const { data: Procedure } = useDropDown(
    'api_ms_Workorders_Procedure_List',
    {
      WorkorderID,
    },
    'ProcedureID',
    'ProcedureName'
  );

  console.log(WorkorderStatusID);

  return (
    <MainLayout title={WorkOrderAssetsLang.WorkOrderTasks[Lang]} className="">
      <View className="flex-1">
        <View className="gap-4 p-4">
          <Dropdown
            title={WorkOrderAssetsLang.Procedure[Lang]}
            data={Procedure}
            value={ProcedureID || ''}
            initailOption={Procedure[0]?.key}
            onChange={(v) => setProcedureID(v)}
            placeholder={WorkOrderAssetsLang.Procedure[Lang]}
          />
        </View>
        <MainGrid
          pk={'TaskSelectedID'}
          spTrx={'api_ms_Workorders_Tasks_Trx'}
          spIns={'api_ms_Workorders_Tasks_Ins'}
          spUpd={'api_ms_Workorders_Tasks_Upd'}
          spDel={'api_ms_Workorders_Tasks_Del'}
          hasIns={false}
          hasDel={false}
          hasCrud={parseInt(WorkorderStatusID) < 3}
          StaticWidth={true}
          mixedWidth
          TrxParam={[
            { name: 'DepartmentID', value: DepartmentID },
            { name: 'WorkorderID', value: WorkorderID },
            { name: 'ProcedureID', value: ProcedureID },
          ]}
          DelParam={[
            {
              rowData: true,
              name: 'TaskSelectedID',
              value: 'TaskSelectedID',
            },
            { name: 'WorkorderID', value: WorkorderID },
          ]}
          UpdBody={{ DepartmentID, WorkorderID }}
          InsBody={{ DepartmentID, WorkorderID, ProcedureID }}
          TrxDependency={[DepartmentID, WorkorderID, ProcedureID]}
          tableHead={[
            {
              key: 'TaskSelectedID',
              label: '',
              type: 'number',
            },
            {
              key: 'ProcedureTaskName',
              label: WorkOrderAssetsLang.Tasks[Lang],
              visible: 'true',
              width: 200,
            },
            {
              key: 'EstimatedHours',
              label: WorkOrderAssetsLang.EstimatedHours[Lang],
              type: 'number',
              visible: 'true',
              width: 100,
            },
            {
              key: 'TaskDone',
              label: WorkOrderAssetsLang.TaskDone[Lang],
              type: 'checkbox',
              input: 'true',
              visible: 'true',
              width: 120,
            },
          ]}
        />
      </View>
    </MainLayout>
  );
};

export default WorkOrderTasks;
