import { View } from 'react-native';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import { MainGrid, MainLayout } from '../../../../components';
import SubDepartmentsLang from '../../../../constants/Lang/Maintenance/MaintenanceSystem/SubDepartments';
const SubDepartments = () => {
  const { user, Lang, company, DepartmentID } = useGlobalContext();

  console.log(DepartmentID);

  return (
    <MainLayout title={SubDepartmentsLang.pageTitle[Lang]} className="">
      <View className="flex-1 py-4">
        <MainGrid
          pk={'SubDepartmentID'}
          spTrx={'api_ms_SubDepartment_Trx'}
          spIns={'api_ms_SubDepartment_Ins'}
          spUpd={'api_ms_SubDepartment_Upd'}
          spDel={'api_ms_SubDepartment_Del'}
          dynamicCode={{
            tbName: 'ms_SubDepartment',
            codeCol: 'DepartmentCode',
            CompanyID: company,
          }}
          TrxParam={[
            { name: 'DepartmentID', value: DepartmentID },
            { name: 'UserName', value: user.username },
            { name: 'CompanyID', value: company },
            { name: 'LangID', value: Lang },
          ]}
          InsBody={{ DepartmentID, UserName: user.username, CompanyID: company, LangID: Lang }}
          UpdBody={{ DepartmentID, UserName: user.username, CompanyID: company, LangID: Lang }}
          DelParam={[
            { rowData: true, name: 'SubDepartmentID', value: 'SubDepartmentID' },
            { name: 'DepartmentID', value: DepartmentID },
            { name: 'LangID', value: Lang },
            { name: 'UserName', value: user.username },
          ]}
          TrxDependency={[]}
          tableHead={[
            {
              key: 'SubDepartmentID',
            },
            {
              key: 'DepartmentCode',
              label: `${SubDepartmentsLang.DepartmentCode[Lang]}`,
              type: 'number',
              input: true,
              visible: 'true',
              width: 100,
              required: true,
            },
            {
              key: 'DepartmentName',
              label: `${SubDepartmentsLang.SubDepartmentName[Lang]}`,
              input: 'true',
              visible: 'true',
              required: true,
            },
          ]}
          mixedWidth={true}
        />
      </View>
    </MainLayout>
  );
};

export default SubDepartments;
