/* eslint-disable eqeqeq */
import { View } from 'react-native';
import { MainLayout } from '../../../../components';
import { useLocalSearchParams } from 'expo-router';
import MainGrid from '../../../../components/grid/MainGrid';
import { useDropDown } from '../../../../hooks/useDropDownData';
import EmploymentLang from '../../../../constants/Lang/Maintenance/WorkOrders/EmploymentLang';
import { useGlobalContext } from '../../../../context/GlobalProvider';

const Labors = () => {
  const {
    TradeID,
    LocationID,
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

  const { Lang, DepartmentID, user } = useGlobalContext(); // Get the current language from global context

  const { data: employeetList } = useDropDown(
    'api_ms_Jobs_List',
    { DepartmentID },
    'JobID',
    'JobName'
  );

  return (
    <MainLayout title={EmploymentLang.TableHeaders.PlannedLabors[Lang]}>
      <View className="flex-1">
        <MainGrid
          pk={'WorkorderLaborID'}
          spTrx={'api_ms_WorkOrders_Planned_Labours_Trx'}
          spIns={'api_ms_WorkOrders_Planned_Labours_Ins'}
          spUpd={'api_ms_WorkOrders_Planned_Labours_Upd'}
          spDel={'api_ms_WorkOrders_Planned_Labours_Del'}
          StaticWidth={true}
          TrxParam={[
            { name: 'DepartmentID', value: DepartmentID },
            { name: 'LangID', value: Lang },
            { name: 'UserName', value: user.username },
            { name: 'WorkorderID', value: WorkorderID },
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
          UpdBody={{
            DepartmentID,
            LangID: Lang,
            UserName: user.username,
            WorkorderID,
          }}
          InsBody={{ DepartmentID, WorkorderID }}
          TrxDependency={[WorkorderID]}
          tableHead={[
            {
              key: 'JobID',
              label: EmploymentLang.TableHeaders.JobID[Lang],
              type: 'dropdown',
              options: employeetList,
              input: 'true',
              width: 100,
            },
            {
              key: 'JobName',
              label: EmploymentLang.TableHeaders.JobID[Lang],
              visible: 'true',
              width: 100,
            },
            {
              key: 'RequiredCount',
              label: EmploymentLang.TableHeaders.RequiredCount[Lang],
              type: 'number',
              input: 'true',
              visible: 'true',
              width: 100,
            },
            {
              key: 'AvgLabourHourCost',
              label: EmploymentLang.TableHeaders.AvgLabourHourCost[Lang],
              type: 'number',
              visible: 'true',
              width: 100,
            },
            {
              key: 'EstimatedLaborHours',
              label: EmploymentLang.TableHeaders.EstimatedLaborHours[Lang],
              type: 'number',
              input: 'true',
              visible: 'true',
              width: 100,
            },
            {
              key: 'TotalCost',
              label: EmploymentLang.TableHeaders.TotalCost[Lang],
              type: 'number',
              visible: 'true',
              width: 100,
            },
          ]}
        />
      </View>
    </MainLayout>
  );
};

export default Labors;
