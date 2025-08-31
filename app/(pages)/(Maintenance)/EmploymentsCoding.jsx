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
          spTrx={'api_ms_Jobs_Trx'}
          spIns={'api_ms_Jobs_Ins'}
          spUpd={'api_ms_Jobs_Upd'}
          spDel={'api_ms_Jobs_Del'}
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
