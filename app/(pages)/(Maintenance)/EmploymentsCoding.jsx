import { View } from 'react-native';
import { useGlobalContext } from '../../../context/GlobalProvider';
import MainLayout from '../../../components/layout/MainLayout';
import MainGrid from '../../../components/grid/MainGrid';
import EmploymentsCodingLang from '../../../constants/Lang/Maintenance/MaintenanceSystem/EmploymentsCoding';
const EmploymentsCoding = () => {
  const { Lang, DepartmentID } = useGlobalContext();

  return (
    <MainLayout title={EmploymentsCodingLang.pageTitle[Lang]} className="">
      <View className="flex-1">
        <MainGrid
          pk={'JobID'}
          spTrx={'ms_DepartmentJobs_trx'}
          spIns={'ms_DepartmentJobs_ins'}
          spUpd={'ms_DepartmentJobs__Upd'}
          spDel={'ms_DepartmentJobs_Del'}
          dynamicCode={{
            tbName: 'ms_Jobs',
            codeCol: 'JobCode',
          }}
          TrxParam={[{ name: 'DepartmentID', value: DepartmentID }]}
          InsBody={{ DepartmentID }}
          UpdBody={{ DepartmentID }}
          DelParam={[
            { rowData: true, name: 'JobID', value: 'JobID' },
            { name: 'DepartmentID', value: DepartmentID },
          ]}
          TrxDependency={[]}
          tableHead={[
            {
              key: 'JobID',
            },
            {
              key: 'JobCode',
              label: EmploymentsCodingLang.JobCode[Lang],
              type: 'number',
              input: true,
              visible: true,
              width: 100,
            },
            {
              key: 'JobName',
              label: EmploymentsCodingLang.JobName[Lang],
              input: true,
              visible: true,
              width: 150,
            },
            {
              key: 'AvgLabourHourCost',
              label: EmploymentsCodingLang.AvgLabourHourCost[Lang],
              type: 'number',
              input: true,
              visible: true,
              width: 150,
            },
          ]}
          StaticWidth
        />
      </View>
    </MainLayout>
  );
};

export default EmploymentsCoding;
