import { StyleSheet, View, Dimensions } from 'react-native';
import { useGlobalContext } from '../../../context/GlobalProvider';
import { useDropDown } from '../../../hooks/useDropDownData';
import MainGrid from '../../../components/grid/MainGrid';
import { useState } from 'react';
import { Dropdown, MainLayout } from '../../../components';
import MainDataLang from '../../../constants/Lang/Invintory/MainDataLang';
const Employees = ({ title, hasLeftComponent = false, onDrawerPress }) => {
  const screenHeight = Dimensions.get('window').height;
  const { DepartmentID, Lang, company, user, departmentTypeData, departmentData } =
    useGlobalContext();
  const [StatusID, setStatusID] = useState(null);

  const { data: statusList, loading: statusListLoader } = useDropDown(
    'api_py_definitions_List',
    { UserName: user, LangID: Lang, TableID: 39, CompanyID: company },
    'DefinitionID',
    'DefinitionName'
  );

  const { data: subDepartmentList } = useDropDown(
    'ms_subDepartments_List',
    {
      DepartmentID,
      UserName: user.username,
      LangID: Lang,
    },
    'SubDepartmentID',
    'DepartmentName'
  );

  const { data: JobList, loading: JobListLoader } = useDropDown(
    'api_py_definitions_List',
    { LangID: Lang, TableID: 9, CompanyID: company },
    'DefinitionID',
    'DefinitionName'
  );

  const { data: EducationList, loading: EducationListLoader } = useDropDown(
    'api_py_definitions_List',
    { LangID: Lang, TableID: 11, CompanyID: company },
    'DefinitionID',
    'DefinitionName'
  );

  const { data: MaritalStatusList, loading: MaritalStatusListLoader } = useDropDown(
    'api_py_definitions_List',
    { LangID: Lang, TableID: 5, CompanyID: company },
    'DefinitionID',
    'DefinitionName'
  );

  const { data: JobTypeList, loading: JobTypeListLoader } = useDropDown(
    'api_py_definitions_List',
    { LangID: Lang, TableID: 15, CompanyID: company },
    'DefinitionID',
    'DefinitionName'
  );

  const { data: TypeList, loading: TypeListLoader } = useDropDown(
    'api_py_definitions_List',
    { LangID: Lang, TableID: 16, CompanyID: 1, UserName: user.username },
    'DefinitionID',
    'DefinitionName'
  );

  const { data: JobStatus, loading: JobStatusLoader } = useDropDown(
    'api_py_definitions_List',
    { LangID: Lang, TableID: 39, CompanyID: company },
    'DefinitionID',
    'DefinitionName'
  );

  const { data: DegreeList, loading: DegreeListLoader } = useDropDown(
    'api_py_definitions_List',
    { LangID: Lang, TableID: 10, CompanyID: company },
    'DefinitionID',
    'DefinitionName'
  );

  console.log('user', user.username);
  console.log(TypeList, 'TypeList');
  console.log(company);

  return (
    <View style={styles.container}>
      <MainLayout title={MainDataLang.Employees[Lang]}>
        <View style={styles.dropdownContainer}>
          <Dropdown
            placeholder={MainDataLang.WorkStatus[Lang]}
            data={statusList}
            initailOption={statusList[0]?.key}
            title={MainDataLang.WorkStatus[Lang]}
            onChange={
              (val) => setStatusID(val) // Update the SubLocationID state
            }
          />
        </View>
        <View style={[styles.assetsGrid, { height: screenHeight - 20 }]}>
          <MainGrid
            pk={'StaffID'}
            spTrx={'api_py_StaffCompany_Trx'}
            spIns={'api_py_StaffM_Ins'}
            spUpd={'api_py_StaffM_Upd'}
            spDel={'api_py_StaffM_Del'}
            TrxParam={[
              { name: 'DepartmentID', value: DepartmentID },
              { name: 'CompanyID', value: company },
              { name: 'UserName', value: user.username },
              { name: 'LangID', value: Lang },
              { name: 'StatusID', value: StatusID },
            ]}
            DelParam={[
              { name: 'DepartmentID', value: DepartmentID },
              { rowData: true, name: 'StaffID', value: 'StaffID' },
            ]}
            UpdBody={{ DepartmentID }}
            InsBody={{ DepartmentID }}
            TrxDependency={[StatusID]}
            routeTo={{
              path: '/EmployeesDetailes',
              hasParams: true,
              params: {
                LocationID: DepartmentID,
              },
            }}
            tableHead={[
              {
                key: 'StaffID',
              },
              {
                key: 'StaffCode',
                label: MainDataLang.EmployeeCode[Lang],
                type: 'number',
                input: true,
                visible: true,
                width: 150,
              },
              {
                key: 'StaffName',
                label: MainDataLang.EmployeeName[Lang],
                type: 'text',
                input: true,
                visible: true,
                width: 200,
              },
              {
                key: 'GenderID',
                label: MainDataLang.Gender[Lang],
                type: 'dropdown',
                options: TypeList,
                input: true,
              },
              {
                key: 'GenderName',
                label: MainDataLang.Gender[Lang],
                visible: true,
                width: 120,
              },
              {
                key: 'BirthDate',
                label: MainDataLang.DateOfBirth[Lang],
                type: 'date',
                input: true,
                visible: true,
                width: 120,
              },
              {
                key: 'Address',
                label: MainDataLang.Address[Lang],
                type: 'text',
                input: true,
                visible: true,
                width: 120,
              },
              {
                key: 'Phones',
                label: MainDataLang.Telephone[Lang],
                type: 'number',
                input: true,
                visible: true,
                width: 120,
              },
              {
                key: 'CivilID',
                label: MainDataLang.NationalID[Lang],
                type: 'number',
                input: true,
                visible: true,
                width: 150,
              },
              {
                key: 'Mail',
                label: MainDataLang.Email[Lang],
                input: true,
                visible: true,
                width: 150,
              },
              {
                key: 'SubDepartmentID',
                label: MainDataLang.SubDepartment[Lang],
                type: 'dropdown',
                options: subDepartmentList,
                input: true,
              },
              {
                key: 'SubDepartmentName',
                label: MainDataLang.SubDepartment[Lang],
                width: 180,
                visible: true,
              },
              {
                key: 'UMaritalStatusID',
                label: MainDataLang.MaritalStatus[Lang],
                type: 'dropdown',
                options: MaritalStatusList,
                input: true,
              },
              {
                key: 'SocialName',
                label: MainDataLang.MaritalStatus[Lang],
                type: 'text',
                visible: true,
                width: 150,
              },
              {
                key: 'UDegreeID',
                label: MainDataLang.Grade[Lang],
                type: 'dropdown',
                options: DegreeList,
                input: true,
              },
              {
                key: 'DegreeName',
                label: MainDataLang.Grade[Lang],
                type: 'text',
                visible: true,
                width: 150,
              },
              {
                key: 'CentralTeam',
                label: MainDataLang.CentralMaintenanceTeam[Lang],
                type: 'checkbox',
                input: true,
                visible: true,
                width: 150,
              },
              {
                key: 'DepartmentTypeID',
                label: MainDataLang.DepartmentType[Lang],
                type: 'dropdown',
                options: departmentTypeData,
                input: true,
              },
              {
                key: 'DepartmentTypeName',
                label: MainDataLang.DepartmentType[Lang],
                visible: true,
                width: 150,
              },
              {
                key: 'DepartmentID',
                label: MainDataLang.Department[Lang],
                type: 'dropdown',
                options: departmentData,
                input: true,
              },
              {
                key: 'DepartmentName',
                label: MainDataLang.Department[Lang],
                visible: true,
                width: 230,
              },
              {
                key: 'UJobID',
                label: MainDataLang.Job[Lang],
                type: 'dropdown',
                options: JobList,
                input: true,
              },
              {
                key: 'JobName',
                label: MainDataLang.Job[Lang],
                type: 'text',
                visible: true,
                width: 200,
              },
              {
                key: 'UServiceStatusID',
                label: MainDataLang.EmploymentStatus[Lang],
                type: 'dropdown',
                options: JobStatus,
                input: true,
              },
              {
                key: 'ServiceStatusName',
                label: MainDataLang.EmploymentStatus[Lang],
                type: 'text',
                visible: true,
                width: 150,
              },
              {
                key: 'UEducationID',
                label: MainDataLang.Qualification[Lang],
                type: 'dropdown',
                options: EducationList,
                input: true,
              },
              {
                key: 'EducationName',
                label: MainDataLang.Qualification[Lang],
                type: 'text',
                visible: true,
                width: 250,
              },
              {
                key: 'UContractTypeID',
                label: MainDataLang.TypeOfEmployment[Lang],
                type: 'dropdown',
                options: JobTypeList,
                input: true,
              },
              {
                key: 'ContractTypeName',
                label: MainDataLang.TypeOfEmployment[Lang],
                visible: true,
                width: 150,
              },
              {
                key: 'UBasicSalary',
                label: MainDataLang.BasicSalary[Lang],
                input: true,
                visible: true,
                width: 150,
              },
              {
                key: 'RetailAge',
                label: MainDataLang.RetailAge[Lang],
                type: 'number',
                input: true,
                visible: true,
                width: 150,
              },
              // {
              //   key: 'BirthDate',
              //   label: MainDataLang.DateOfBirth[Lang],
              //   type: 'date',
              //   input: 'true',
              //   visible: 'false',
              // },
              // {
              //   key: 'MonthlySalary',
              //   label: MainDataLang.MonthlySalary[Lang],
              //   type: 'number',
              //   input: 'true',
              //   visible: 'false',
              // },
              // {
              //   key: 'HourlySalary',
              //   label: MainDataLang.HourlyWage[Lang],
              //   type: 'number',
              //   input: 'true',
              //   visible: 'false',
              // },

              // {
              //   key: 'OverTime1',
              //   label: MainDataLang.DaytimeOvertime[Lang],
              //   type: 'number',
              //   input: 'true',
              //   visible: 'false',
              // },
              // {
              //   key: 'OverTime2',
              //   label: MainDataLang.NighttimeOvertime[Lang],
              //   type: 'number',
              //   input: 'true',
              //   visible: 'false',
              // },
              // {
              //   key: 'Email',
              //   label: MainDataLang.Email[Lang],
              //   type: 'text',
              //   input: 'true',
              //   visible: 'false',
              // },
            ]}
            mixedWidth={true}
          />
        </View>
      </MainLayout>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dropdownContainer: {
    marginHorizontal: 16,
    marginVertical: 24,
  },
  assetsGrid: {
    marginVertical: 8,
  },
});

export default Employees;
