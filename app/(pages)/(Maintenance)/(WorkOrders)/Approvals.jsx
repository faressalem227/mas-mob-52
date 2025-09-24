/* eslint-disable eqeqeq */
import { View } from 'react-native';
import { MainLayout, MainGrid } from '../../../../components';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useDropDown } from '../../../../hooks/useDropDownData';
import Appproval from '../../../../constants/Lang/Maintenance/WorkOrders/Appproval';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import { useState } from 'react';

const Approvals = () => {
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
    'ms_Employees_ListForWo',
    {
      DepartmentID,
      UserName:user.username,
      LangID:Lang
    },
    'StaffID',
    'StaffName'
  );


  return (
    <MainLayout title={Appproval.PageTitle[Lang]} className="">
      <View className="flex-1">
        <MainGrid
          pk={'ApprovalID'}
          spTrx={'api_ms_WorkorderApprovals_Trx'}
          spIns={'api_ms_WorkorderApprovals_Ins'}
          spUpd={'api_ms_WorkorderApprovals_Upd'}
          spDel={'api_ms_WorkorderApprovals_Del'}
          TrxParam={[
            // { name: 'DepartmentID', value: DepartmentID },
            { name: 'WorkorderID', value: WorkorderID },
            { name: 'LangID', value: Lang },
            { name: 'UserName', value: user.username },
          ]}
          DelParam={[
            {
              rowData: true,
              name: 'ApprovalID',
              value: 'ApprovalID',
            },
            // { name: 'DepartmentID', value: DepartmentID },
            { name: 'WorkorderID', value: WorkorderID },
          ]}
          
           UpdBody={{
           WorkorderID: WorkorderID,
           }}

          InsBody={{ DepartmentID: DepartmentID, WorkorderID: WorkorderID }}
          TrxDependency={[WorkorderID]}
          StaticWidth
          tableHead={[
            {
              key: 'WorkorderID',
            },
            {
              key: 'EmployeeID',
              label: Appproval.ApprovalsDetail.EmployeeName[Lang],
              type: 'dropdown',
              options: employeetList,
              input: 'true',
            },
            {
              key: 'StaffName',
              label: Appproval.ApprovalsDetail.EmployeeName[Lang],
              visible: 'true',
              width: 150,
            },
            {
              key: 'Remarks',
              label: Appproval.ApprovalsDetail.Remarks[Lang],
              input: true,
              visible: true,
              width: 250,
            },
          
          ]}
        />
      </View>
    </MainLayout>
  );
};

export default Approvals;