/* eslint-disable eqeqeq */
import { useState } from 'react';
import { MainLayout, MainGrid } from '../../../../components';
import { useLocalSearchParams } from 'expo-router';
import { useDropDown } from '../../../../hooks/useDropDownData';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import AssetContractorsLang from '../../../../constants/Lang/Maintenance/WorkOrders/AssetsContarctorsLang';

const ContractorAssets = () => {
  const { DepartmentID, Lang, user } = useGlobalContext();
  const [SubLocationID, setSubLocationID] = useState(null);

  const { data: sds_SubLocation } = useDropDown(
    'ms_SubLocation_List',
    {
      DepartmentID,
      UserName: user.username,
      LangID: Lang,
    },
    'SubLocationID',
    'SubLocationName'
  );

  const { data: sds_Assets } = useDropDown(
    'ms_Assets_List_Location',
    {
      DepartmentID,
      SubLocationID,
    },
    'AssetID',
    'AssetName'
  );

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

  console.log(WorkorderID);

  return (
    <MainLayout title={AssetContractorsLang.contractorAssets[Lang]}>
      <MainGrid
        pk={'WorkorderContractorAssetID'}
        hasCrud={parseInt(WorkorderStatusID) < 3 || parseInt(WorkorderStatusID) == 5}
        spTrx={'api_ms_Workorder_Assets_contractor_Trx'}
        spIns={'api_ms_Workorder_Assets_contractor_Ins'}
        spUpd={'api_ms_Workorder_Assets_contractor_Upd'}
        spDel={'api_ms_Workorder_Assets_contractor_Del'}
        StaticWidth
        TrxParam={[
          { name: 'DepartmentID', value: DepartmentID },
          { name: 'WorkorderID', value: WorkorderID },
          { name: 'UserName', value: user.username },
          { name: 'LangID', value: Lang },
        ]}
        UpdBody={{ DepartmentID, WorkorderID, LangID: Lang, UserName: user.username }}
        InsBody={{ DepartmentID, WorkorderID, LangID: Lang, UserName: user.username }}
        DelParam={[
          {
            rowData: true,
            name: 'WorkorderContractorAssetID',
            value: 'WorkorderContractorAssetID',
          },
        ]}
        tableHead={[
          { key: 'WorkorderAssetID' },
          {
            key: 'SubLocationID',
            label: AssetContractorsLang.SubLocationName[Lang],
            type: 'dropdown',
            input: true,
            required: true,
            width: 220,
            options: sds_SubLocation || [],
            onChange: (val) => setSubLocationID(val),
          },
          {
            key: 'SubLocationName',
            label: AssetContractorsLang.SubLocationName[Lang],
            visible: true,
            width: 200,
          },
          {
            key: 'AssetID',
            label: AssetContractorsLang.AssetID[Lang],
            type: 'dropdown',
            input: true,
            required: true,
            width: 250,
            options: sds_Assets,
          },
          {
            key: 'AssetName',
            label: AssetContractorsLang.AssetName[Lang],
            visible: true,
            width: 200,
          },
          {
            key: 'DepreciationValue',
            label: AssetContractorsLang.DepreciationValue[Lang],
            type: 'number',
            input: true,
            visible: true,
            width: 140,
          },
          {
            key: 'OperatingCost',
            label: AssetContractorsLang.OperatingCost[Lang],
            type: 'number',
            input: true,
            visible: true,
            width: 140,
          },
          {
            key: 'Instructions',
            label: AssetContractorsLang.Instructions[Lang],
            type: 'text',
            input: true,
            visible: true,
            width: 320,
          },
        ]}
      />
    </MainLayout>
  );
};

export default ContractorAssets;
