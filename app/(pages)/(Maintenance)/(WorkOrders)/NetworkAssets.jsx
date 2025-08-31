/* eslint-disable eqeqeq */
import { MainLayout, MainGrid } from '../../../../components';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import { useDropDown } from '../../../../hooks/useDropDownData';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import NetworkAssetsLang from '../../../../constants/Lang/Maintenance/WorkOrders/NetworkAssetLang';

const NetworkAssets = () => {
  const { DepartmentID, Lang, user } = useGlobalContext();
  const [subLocation, setSubLocation] = useState(null);

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

  const { data: Location } = useDropDown(
    'ms_SubLocation_Network_List',
    {
      LangID: Lang,
      DepartmentID,
      TradeID,
    },
    'SubLocationID',
    'SubLocationName'
  );
  const { data: Asset } = useDropDown(
    'ms_Assets_List',
    {
      UserName: user.userame,
      LangID: Lang,
      DepartmentID,
      SubLocationID: subLocation,
    },
    'AssetID',
    'FullAssetName'
  );
  const { data: FailureTypes } = useDropDown(
    'ms_Network_Failure_list',
    {
      UserName: user.userame,
      LangID: Lang,
    },
    'FailureID',
    'FailureName'
  );

  return (
    <MainLayout title={NetworkAssetsLang.NetworkAssets[Lang]}>
      <MainGrid
        pk={'WorkorderNtAssetID'}
        hasCrud={parseInt(WorkorderStatusID) < 3 || parseInt(WorkorderStatusID) == 5}
        spTrx={'api_ms_Workorders_NetworkAssets_Trx'}
        spIns={'api_ms_Workorders_NetworkAssets_Ins'}
        spUpd={'api_ms_Workorders_NetworkAssets_Upd'}
        spDel={'api_ms_Workorders_NetworkAssets_Del'}
        TrxParam={[
          { name: 'DepartmentID', value: DepartmentID },
          { name: 'WorkorderID', value: WorkorderID },
          { name: 'UserName', value: user.username },
          { name: 'LangID', value: Lang },
        ]}
        InsBody={{
          WorkorderID,
        }}
        UpdBody={{
          WorkorderID,
        }}
        DelParam={[
          {
            rowData: true,
            name: 'WorkorderNtAssetID',
            value: 'WorkorderNtAssetID',
          },
        ]}
        StaticWidth
        tableHead={[
          {
            key: 'SubLocationID',
            label: NetworkAssetsLang.SubLocationID[Lang],
            type: 'dropdown',
            options: Location || [],
            onChange: (val) => setSubLocation(val),
            input: true,
            required: true,
            width: 300,
          },
          {
            key: 'SubLocationName',
            label: NetworkAssetsLang.SubLocationName[Lang],
            visible: true,
            isRequired: false,
            width: 300,
          },
          {
            key: 'AssetID',
            label: NetworkAssetsLang.AssetID[Lang],
            type: 'dropdown',
            input: true,
            required: true,
            width: 250,
            options: Asset,
          },
          {
            key: 'AssetName',
            label: NetworkAssetsLang.AssetName[Lang],
            visible: true,
            width: 250,
          },
          {
            key: 'FailureTypeID',
            label: NetworkAssetsLang.FailureTypeID[Lang],
            type: 'dropdown',
            input: true,
            visible: true,
            required: true,
            width: 150,
            options: FailureTypes,
          },
          {
            key: 'gps_x',
            label: NetworkAssetsLang.gps_x[Lang],
            type: 'number',
            input: true,
            visible: true,
            width: 70,
          },
          {
            key: 'gps_y',
            label: NetworkAssetsLang.gps_y[Lang],
            type: 'number',
            input: true,
            visible: true,
            width: 70,
          },
          {
            key: 'Diameter',
            label: NetworkAssetsLang.Diameter[Lang],
            type: 'number',
            input: true,
            visible: true,
            width: 100,
          },
          {
            key: 'Material',
            label: NetworkAssetsLang.Material[Lang],
            type: 'text',
            input: true,
            visible: true,
            width: 100,
          },
          {
            key: 'address',
            label: NetworkAssetsLang.address[Lang],
            type: 'text',
            input: true,
            visible: true,
            width: 200,
          },
          {
            key: 'Remarks',
            label: NetworkAssetsLang.Remarks[Lang],
            type: 'text',
            input: true,
            visible: true,
            width: 100,
          },
        ]}
      />
    </MainLayout>
  );
};

export default NetworkAssets;
