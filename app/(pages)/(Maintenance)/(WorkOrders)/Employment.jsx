/* eslint-disable eqeqeq */
import { View } from 'react-native';
import { MainLayout, MainGrid } from '../../../../components';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useDropDown } from '../../../../hooks/useDropDownData';
import EmploymentLang from '../../../../constants/Lang/Maintenance/WorkOrders/EmploymentLang';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import { useState } from 'react';

const Employment = () => {
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

  const { Lang, DepartmentID, user, company } = useGlobalContext(); // Get the current language from global context
  const [CentralTeam, setCentralTeam] = useState(false);
  const router = useRouter();

  const { data: employeetList } = useDropDown(
    'api_py_Staff_List_CenterlalTeam',
    {
      CompanyID: company,
      DepartmentID,
      CentralTeam: CentralTeam,
    },
    'StaffID',
    'StaffName'
  );

  const { data: Asset } = useDropDown(
    'ms_Workorder_Assets',
    {
      DepartmentID,
      WorkorderID,
      UserName: user.username,
      LangID: Lang,
    },
    'AssetID',
    'AssetName'
  );

  const { data: sds_ListWoAssetsWS } = useDropDown(
    'api_ms_Workorder_Assets_contractor_List',
    {
      WorkorderID,
    },
    'AssetID',
    'AssetName'
  );

  console.log(WorkorderID);

  return (
    <MainLayout title={EmploymentLang.PageTitle[Lang]} className="">
      <View className="flex-1">
        <MainGrid
          pk={'WorkorderLaborID'}
          spTrx={'api_ms_WorkOrders_Labours_Trx'}
          spIns={'api_ms_WorkOrders_Labours_Ins'}
          spUpd={'api_ms_WorkOrders_Labours_Upd'}
          spDel={'api_ms_WorkOrders_Labours_Del'}
          TrxParam={[
            { name: 'DepartmentID', value: DepartmentID },
            { name: 'WorkorderID', value: WorkorderID },
            { name: 'LangID', value: Lang },
            { name: 'UserName', value: user.username },
          ]}
          hasCrud={parseInt(WorkorderStatusID) < 3 || parseInt(WorkorderStatusID) == 5}
          DelParam={[
            {
              rowData: true,
              name: 'WorkorderLaborID',
              value: 'WorkorderLaborID',
            },
            { name: 'DepartmentID', value: DepartmentID },
            { name: 'WorkorderID', value: WorkorderID },
          ]}
          UpdBody={[
            { rowData: true },
            { name: 'WorkorderLaborID', value: 'WorkorderLaborID' },
            { name: 'DepartmentID', value: DepartmentID },
            { name: 'WorkorderID', value: WorkorderID },
          ]}
          InsBody={{ DepartmentID: DepartmentID, WorkorderID: WorkorderID }}
          TrxDependency={[WorkorderID]}
          StaticWidth
          tableHead={[
            {
              key: 'WorkorderLaborID',
            },
            {
              key: 'WorkorderID',
            },
            {
              key: 'CentralTeam',
              label: EmploymentLang.TableHeaders.isCenteral[Lang],
              type: 'checkbox',
              input: WorkorderTypeID != 4,
              visible: WorkorderTypeID != 4,
              saveOrder: true,
              width: 125,
              onChange: (val) => {
                setCentralTeam(val);
              },
            },
            {
              key: 'EmployeeID',
              label: EmploymentLang.TableHeaders.Employee[Lang],
              type: 'dropdown',
              options: employeetList,
              input: 'true',
              required: true,
            },
            {
              key: 'EmployeeName',
              label: EmploymentLang.TableHeaders.Employee[Lang],
              visible: 'true',
              width: 150,
            },
            {
              key: 'SalaryHours',
              label: EmploymentLang.TableHeaders.SalaryHours[Lang],
              type: 'number',
              input: 'true',
              visible: 'true',
              width: 150,
            },
            {
              key: 'OverTime1',
              label: EmploymentLang.TableHeaders.OverTime1[Lang],
              type: 'number',
              input: 'true',
              visible: 'true',
              width: 150,
            },
            {
              key: 'OverTime2',
              label: EmploymentLang.TableHeaders.OverTime2[Lang],
              type: 'number',
              input: 'true',
              visible: 'true',
              width: 150,
            },
            {
              key: 'StartDate',
              label: EmploymentLang.TableHeaders.StartDate[Lang],
              type: 'date',
              input: 'true',
              visible: 'true',
              width: 150,
            },
            {
              key: 'EndDate',
              label: EmploymentLang.TableHeaders.EndDate[Lang],
              type: 'date',
              input: 'true',
              visible: 'true',
              width: 150,
            },
            {
              key: 'TotalHours',
              label: EmploymentLang.TableHeaders.TotalHours[Lang],
              type: 'number',
              input: 'false',
              visible: 'true',
              width: 150,
              required: true,
            },
            {
              key: 'TotalCost',
              label: EmploymentLang.TableHeaders.TotalCost[Lang],
              type: 'number',
              input: 'false',
              visible: 'true',
              width: 150,
            },
            {
              key: 'AssetWsID',
              label: EmploymentLang.TableHeaders.Assetws[Lang],
              type: 'dropdown',
              input: WorkorderTypeID == 4,
              visible: WorkorderTypeID == 4,
              required: WorkorderTypeID == 4,
              width: 220,
              options: sds_ListWoAssetsWS,
            },
            {
              key: 'AssetID',
              label: EmploymentLang.TableHeaders.Asset[Lang],
              type: 'dropdown',
              options: Asset,
              input: 'true',
              visible: 'false',
              width: 150,
                            required: true,

            },
            {
              key: 'AssetNameLabour',
              label: EmploymentLang.TableHeaders.AssetName[Lang],
              type: '',
              input: 'false',
              visible: 'true',
              width: 150,
            },
            {
              key: 'Remarks',
              label: EmploymentLang.TableHeaders.Remarks[Lang],
              input: true,
              visible: true,
              width: 250,
            },
            {
              key: 'Repeated',
              label: EmploymentLang.TableHeaders.repeated[Lang],
              type: 'checkbox',
              input: true,
              visible: true,
              width: 130,
            },
          ]}
          // routeTo={{
          //   path: '/EmploymentDetails',
          //   hasParams: true,
          //   params: {
          //     DepartmentID,
          //     WorkorderID: WorkorderID,
          //     WorkorderStatusName: WorkorderStatusName,
          //     WorkorderTypeName: WorkorderTypeName,
          //     WorkorderCode: WorkorderCode,
          //     WorkorderName: WorkorderName,
          //   },
          // }}
        />
      </View>
    </MainLayout>
  );
};

export default Employment;
