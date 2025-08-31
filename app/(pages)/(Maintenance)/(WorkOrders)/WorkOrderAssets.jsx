/* eslint-disable eqeqeq */
import { useState } from 'react';
import { View } from 'react-native';
import { MainLayout, MainGrid } from '../../../../components';
import { useLocalSearchParams } from 'expo-router';
import { useDropDown } from '../../../../hooks/useDropDownData';
import WorkOrderAssetsLang from '../../../../constants/Lang/Maintenance/WorkOrders/WorkOrderAssetsLang';
import { useGlobalContext } from '../../../../context/GlobalProvider';

const WorkOrderAssets = () => {
  const { DepartmentID, Lang, user } = useGlobalContext();
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
    MainWorkorderID,
  } = useLocalSearchParams();

  const [SubLocationID, setSubLocationID] = useState(null);

  const { data: SubLocationList } = useDropDown(
    'api_ms_sublocation_List',
    { DepartmentID },
    'value',
    'label'
  );

  const { data: AssetList } = useDropDown(
    'ms_Workorders_Assets_Workshop_list',
    {
      WorkorderID: MainWorkorderID,
    },
    'AssetID',
    'AssetName'
  );

  return (
    <MainLayout title={WorkOrderAssetsLang.PageTitle[Lang]}>
      <View className="flex-1">
        <MainGrid
          pk={'WorkorderAssetID'}
          spTrx={'api_ms_Workorder_Assets_Trx'}
          spIns={'api_ms_Workorder_Assets_Ins'}
          spUpd={'api_ms_Workorder_Assets_Upd'}
          spDel={'api_ms_Workorder_Assets_Del'}
          hasCrud={parseInt(WorkorderStatusID) < 3 || parseInt(WorkorderStatusID) == 5}
          hasIns={WorkorderTypeID == 4}
          hasDel={WorkorderTypeName == 4}
          StaticWidth
          TrxParam={[
            { name: 'DepartmentID', value: DepartmentID },
            { name: 'WorkorderID', value: WorkorderID },
            { name: 'UserName', value: user.username },
            { name: 'LangID', value: Lang },
          ]}
          DelParam={[
            {
              rowData: true,
              name: 'WorkorderAssetID',
              value: 'WorkorderAssetID',
            },
          ]}
          UpdBody={{ DepartmentID, WorkorderID, LangID: Lang, UserName: user.username }}
          InsBody={{ DepartmentID, WorkorderID, LangID: Lang, UserName: user.username }}
          TrxDependency={[DepartmentID, WorkorderID]}
          tableHead={[
            {
              key: 'WorkorderAssetID',
            },
            {
              key: 'DepartmentName',
              label: WorkOrderAssetsLang.DepartmentName[Lang],
              visible: WorkorderTypeID == 4,
              width: 200,
            },
            {
              key: 'SubLocationName',
              label: WorkOrderAssetsLang.SubLocation[Lang],
              visible: true,
              width: 200,
            },
            {
              key: 'AssetCode',
              label: WorkOrderAssetsLang.AssetCode[Lang],
              type: 'number',
              visible: true,
              width: 100,
            },
            {
              key: 'AssetID',
              label: WorkOrderAssetsLang.Asset[Lang],
              options: AssetList,
              type: 'dropdown',
              input: WorkorderTypeID == 4,
              width: 100,
            },
            {
              key: 'AssetName',
              label: WorkOrderAssetsLang.AssetName[Lang],
              visible: true,
              width: 200,
            },
            {
              key: 'ProcedureCode',
              label: WorkOrderAssetsLang.ProcedureCode[Lang],
              visible: true,
              width: 100,
            },
            {
              key: 'ProcedureName',
              label: WorkOrderAssetsLang.Procedure[Lang],
              visible: true,
              width: 300,
            },
            {
              key: 'AssetStop',
              label: WorkOrderAssetsLang.AssetStop[Lang],
              type: 'checkbox',
              visible: WorkorderTypeID != 4,
              width: 100,
            },
            {
              key: 'MeterValue',
              label: WorkOrderAssetsLang.MeterValue[Lang],
              type: 'number',
              input: WorkorderTypeID != 4,
              visible: WorkorderTypeID != 4,
              width: 120,
            },
            {
              key: 'Instructions',
              label: WorkOrderAssetsLang.Instructions[Lang],
              input: true,
              visible: true,
              width: 320,
            },
            {
              key: 'DepreciationValue',
            },
            {
              key: 'OperatingCost',
            },
          ]}
        />
      </View>
    </MainLayout>
  );
};

export default WorkOrderAssets;
