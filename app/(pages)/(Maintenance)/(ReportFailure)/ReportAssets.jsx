/* eslint-disable eqeqeq */
import { MainLayout, MainGrid } from '../../../../components';
import ReportBugsLang from '../../../../constants/Lang/Maintenance/ReportBugs';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import { useLocalSearchParams } from 'expo-router';
import { useDropDown } from '../../../../hooks/useDropDownData';
import { useState } from 'react';

const ReportAssets = () => {
  const { Lang, user, DepartmentID } = useGlobalContext();

  const {
    FailureReportID,
    FailureReportCode,
    FailureReportStatusName,
    FailureReportDate,
    FailureDate,
    TradeID,
    FailureReportStatusID,
  } = useLocalSearchParams();

  const [SubLocationID, setSubLocationID] = useState(null);

  const { data: subLocationList } = useDropDown(
    'api_ms_SubLocation_List',
    {
      UserName: user.username,
      DepartmentID,
      LangID: Lang,
    },
    'SubLocationID',
    'SubLocationName'
  );

  const { data: AssetList } = useDropDown(
    'api_ms_Assets_ListBySubLocation',
    {
      DepartmentID,
      UserName: user.username,
      SubLocationID,
      LangID: Lang,
      TradeID,
    },
    'AssetID',
    'AssetName',
    [SubLocationID]
  );

  const detailsData = [
    { label: ReportBugsLang.FailureReportCode[Lang], value: FailureReportCode },
    { label: ReportBugsLang.FailureReportStatusName[Lang], value: FailureReportStatusName },
    { label: ReportBugsLang.FailureReportDate[Lang], value: FailureReportDate },
    { label: ReportBugsLang.FailureReportDate[Lang], value: FailureDate },
  ];

  return (
    <MainLayout title={ReportBugsLang.Assets[Lang]}>
      <MainGrid
        hasCrud={FailureReportStatusID == 1}
        pk={'FailureReportAssetID'}
        spTrx={'api_ms_FailureReports_Assets_Trx'}
        spIns={'api_ms_FailureReports_Assets_Ins'}
        spUpd={'api_ms_FailureReports_Assets_Upd'}
        spDel={'api_ms_FailureReports_Assets_Del'}
        TrxParam={[
          { name: 'FailureReportID', value: FailureReportID },
          { name: 'UserName', value: user.username },
          { name: 'LangID', value: Lang },
        ]}
        DelParam={[
          { name: 'DepartmentID', value: DepartmentID },
          {
            rowData: true,
            name: 'FailureReportAssetID',
            value: 'FailureReportAssetID',
          },
        ]}
        InsBody={{
          DepartmentID,
          LangID: Lang,
          UserName: user.username,
          TradeID,
          FailureReportID,
        }}
        UpdBody={{ DepartmentID, TradeID }}
        StaticWidth
        hasSpecialButton
        tableHead={[
          {
            key: 'SubLocationID',
            label: ReportBugsLang.SubLocationID[Lang],
            type: 'dropdown',
            options: subLocationList,
            input: 'true',
            onChange: (val) => setSubLocationID(val),
          },
          {
            key: 'SubLocationName',
            label: ReportBugsLang.SubLocationID[Lang],
            visible: 'true',
            width: 200,
          },
          {
            key: 'AssetCode',
            label: ReportBugsLang.AssetCode[Lang],
            type: 'number',
            visible: true,
            width: 150,
          },
          {
            key: 'AssetID',
            label: ReportBugsLang.AssetID[Lang],
            type: 'dropdown',
            options: AssetList,
            input: 'true',
            visible: 'false',
            width: 100,
          },
          {
            key: 'AssetName',
            label: `${ReportBugsLang.AssetName[Lang]}`,
            type: 'text',
            input: 'false',
            visible: 'true',
            width: 200,
          },
          {
            key: 'PlantStopped',
            label: ReportBugsLang.PlantStopped[Lang],
            type: 'checkbox',
            input: 'true',
            visible: 'true',
            width: 100,
          },
          {
            key: 'AssetStopped',
            label: ReportBugsLang.AssetStopped[Lang],
            type: 'checkbox',
            input: 'true',
            visible: 'true',
            width: 140,
          },
          {
            key: 'ActionBeforeReport',
            label: ReportBugsLang.ActionBeforeReporting[Lang],
            type: 'text',
            input: 'true',
            visible: 'true',
            width: 200,
          },
          {
            key: 'FailureDescription',
            label: ReportBugsLang.ProblemDescription[Lang],
            type: 'text',
            input: 'true',
            visible: 'true',
            width: 250,
          },
        ]}
      />
    </MainLayout>
  );
};

export default ReportAssets;
