import { View, Text } from 'react-native';
import { MainLayout, MainGrid } from '../../../../components';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import { useDropDown } from '../../../../hooks/useDropDownData';

const UnitEmployeesDataLang = {
  EmployeesData: {
    1: 'بيانات الموظفين',
    2: 'Employees Data',
  },

  StaffID: {
    1: 'StaffID', // no captions in your config
    2: 'StaffID',
  },
  StaffCode: {
    1: 'الكود',
    2: 'Code',
  },
  StaffName: {
    1: 'اسم الموظف',
    2: 'Employee Name',
  },
  GenderID: {
    1: 'النوع',
    2: 'Gender',
  },
  GenderName: {
    1: 'النوع',
    2: 'Gender',
  },
  BirthDate: {
    1: 'تاريخ الميلاد',
    2: 'Birth Date',
  },
  Address: {
    1: 'العنوان',
    2: 'Address',
  },
  Phones: {
    1: 'التليفون',
    2: 'Phone',
  },
  Mail: {
    1: 'البريد الإلكتروني',
    2: 'E-Mail',
  },
  CivilID: {
    1: 'الرقم القومي',
    2: 'National ID',
  },
  UMaritalStatusID: {
    1: ' الحالة الاجتماعية',
    2: 'Marital Status',
  },
  UDegreeID: {
    1: ' الدرجة',
    2: 'Degree',
  },
  DegreeName: {
    1: ' الدرجة',
    2: 'Degree',
  },
  SubDepartmentID: {
    1: ' الإداره الفرعيه',
    2: 'SubDepartment',
  },
  CentralTeam: {
    1: ' فريق مركزي',
    2: 'Central Team',
  },
  UJobID: {
    1: 'الوظيفة',
    2: 'Job',
  },
  HourlySalary: {
    1: 'أجر الساعه',
    2: 'Hourly Salary',
  },
  Overtime1: {
    1: 'اضافي نهاري ',
    2: 'Overtime Day',
  },
  Overtime2: {
    1: 'اضافي ليلي ',
    2: 'Overtime Night',
  },
  UBasicSalary: {
    1: ' المرتب الأساسي ',
    2: 'Basic Salary',
  },
  UServiceStatusID: {
    1: 'الحالة الوظيفية',
    2: 'Job Status',
  },

  ServiceStatusName: {
    1: 'الحالة الوظيفية',
    2: 'Job Status',
  },

  UEducationID: {
    1: 'المؤهل',
    2: 'Education',
  },

  UContractTypeID: {
    1: 'نوع التعاقد',
    2: 'Contract Type',
  },

  USixtyDate: {
    1: ' تاريخ التقاعد',
    2: ' Retail Date',
  },
  RetailAge: {
    1: 'سن المعاش',
    2: ' Retail Age',
  },
};

const UnitEmployeesData = () => {
  const { company, user, Lang, DepartmentID, DepartmentTypeID } = useGlobalContext();

  const { data: statusWork } = useDropDown(
    'py_statusWork',
    {
      TableID: 18,
      UserName: user.username,
      LangID: Lang,
    },
    'StatusID',
    'StatusName'
  );

  const { data: Staffmange } = useDropDown(
    'py_definitions_List',
    {
      CompanyID: company,
      TableID: 18,
      UserName: user.username,
      LangID: Lang,
    },
    'DefinitionID',
    'DefinitionName'
  );

  const { data: gender } = useDropDown(
    'py_definitions_List',
    {
      CompanyID: company,
      TableID: 16,
      UserName: user.username,
      LangID: Lang,
    },
    'DefinitionID',
    'DefinitionName'
  );

  const { data: sds_USERINFO } = useDropDown('USERINFO_List', {}, 'USERID', 'BADGENUMBER');

  const { data: Staff } = useDropDown(
    'py_definitions_List',
    {
      CompanyID: company,
      TableID: 18,
      UserName: user.username,
      LangID: Lang,
    },
    'DefinitionID',
    'DefinitionName'
  );

  const { data: job } = useDropDown(
    'py_definitions_List',
    {
      CompanyID: company,
      UserName: user.username,
      LangID: Lang,
      TableID: 9,
    },
    'DefinitionID',
    'DefinitionName'
  );

  const { data: sds_degree_list } = useDropDown(
    'py_definitions_List',
    {
      CompanyID: company,
      UserName: user.username,
      LangID: Lang,
      TableID: 10,
    },
    'DefinitionID',
    'DefinitionName'
  );

  const { data: Education } = useDropDown(
    'py_definitions_List',
    {
      CompanyID: company,
      UserName: user.username,
      LangID: Lang,
      TableID: 11,
    },
    'DefinitionID',
    'DefinitionName'
  );

  const { data: ContractType } = useDropDown(
    'py_definitions_List1_CodeName',
    {
      CompanyID: company,
      UserName: user.username,
      LangID: Lang,
      TableID: 15,
    },
    'DefinitionID',
    'DefinitionName'
  );

  const { data: MaritalStatus } = useDropDown(
    'py_definitions_List',
    {
      CompanyID: company,
      UserName: user.username,
      LangID: Lang,
      TableID: 5,
    },
    'DefinitionID',
    'DefinitionName'
  );

  const { data: sds_status_list } = useDropDown(
    'py_definitions_List',
    {
      CompanyID: company,
      UserName: user.username,
      LangID: Lang,
      TableID: 39,
    },
    'DefinitionID',
    'DefinitionName'
  );

  const { data: subDepartment } = useDropDown(
    'ms_subDepartments_List',
    {
      DepartmentID,
      UserName: user.username,
      LangID: Lang,
    },
    'SubDepartmentID',
    'DepartmentName'
  );
  return (
    <MainLayout title={UnitEmployeesDataLang.EmployeesData[Lang]}>
      <View className="flex-1">
        <MainGrid
          pk="StaffID"
          spTrx={'api_py_StaffM_Trx'}
          spIns={'api_py_StaffM_Ins'}
          spUpd={'api_py_StaffM_Upd'}
          spDel={'api_py_StaffM_Del'}
          TrxParam={[
            { name: 'DepartmentID', value: DepartmentID },
            { name: 'UserName', value: user.username },
            { name: 'CompanyID', value: company },
            { name: 'LangID', value: Lang },
          ]}
          InsBody={{
            DepartmentID,
            CompanyID: company,
            LangID: Lang,
            UserName: user.username,
            DepartmentTypeID,
          }}
          UpdBody={{
            DepartmentID,
            CompanyID: company,
            LangID: Lang,
            UserName: user.username,
            DepartmentTypeID,
          }}
          DelParam={[
            { rowData: true, name: 'StaffID', value: 'StaffID' },
            { name: 'LangID', value: Lang },
            { name: 'UserName', value: user.username },
          ]}
          mixedWidth
          tableHead={[
            {
              key: 'StaffID',
              label: UnitEmployeesDataLang.StaffID[Lang],
            },
            {
              key: 'StaffCode',
              type: 'number',
              input: true,
              visible: true,
              required: true,
              width: 110,
              disabled: false,
              label: UnitEmployeesDataLang.StaffCode[Lang],
            },
            {
              key: 'StaffName',
              type: 'text',
              input: true,
              visible: true,
              required: true,
              width: 180,
              label: UnitEmployeesDataLang.StaffName[Lang],
            },
            {
              key: 'GenderID',
              type: 'dropDown',
              options: gender,
              input: true,
              visible: false,
              required: false,
              width: 100,
              label: UnitEmployeesDataLang.GenderID[Lang],
            },
            {
              key: 'GenderName',
              type: 'text',
              input: false,
              visible: true,
              required: false,
              width: 100,
              label: UnitEmployeesDataLang.GenderName[Lang],
            },
            {
              key: 'BirthDate',
              type: 'date',
              input: true,
              visible: true,
              required: false,
              width: 110,
              label: UnitEmployeesDataLang.BirthDate[Lang],
            },
            {
              key: 'Address',
              type: 'text',
              input: true,
              visible: true,
              required: false,
              width: 200,
              label: UnitEmployeesDataLang.Address[Lang],
            },
            {
              key: 'Phones',
              type: 'text',
              input: true,
              visible: true,
              required: false,
              width: 110,
              label: UnitEmployeesDataLang.Phones[Lang],
            },
            {
              key: 'Mail',
              type: 'text',
              input: true,
              visible: true,
              required: false,
              width: 110,
              label: UnitEmployeesDataLang.Mail[Lang],
            },
            {
              key: 'CivilID',
              type: 'text',
              input: true,
              visible: true,
              required: true,
              width: 120,
              label: UnitEmployeesDataLang.CivilID[Lang],
            },
            {
              key: 'UMaritalStatusID',
              type: 'dropDown',
              options: MaritalStatus,
              input: true,
              visible: true,
              required: true,
              width: 200,
              disabled: true,
              label: UnitEmployeesDataLang.UMaritalStatusID[Lang],
            },
            {
              key: 'UDegreeID',
              type: 'dropDown',
              options: sds_degree_list,
              input: true,
              hidden: false,
              required: true,
              width: 200,
              disabled: true,
              label: UnitEmployeesDataLang.UDegreeID[Lang],
            },
            {
              key: 'DegreeName',
              type: 'text',
              input: false,
              visible: true,
              required: false,
              width: 200,
              label: UnitEmployeesDataLang.DegreeName[Lang],
            },
            {
              key: 'SubDepartmentID',
              type: 'dropDown',
              options: subDepartment,
              input: true,
              visible: true,
              required: false,
              width: 200,
              label: UnitEmployeesDataLang.SubDepartmentID[Lang],
            },
            {
              key: 'CentralTeam',
              type: 'checkbox',
              input: true,
              visible: true,
              required: false,
              width: 140,
              label: UnitEmployeesDataLang.CentralTeam[Lang],
            },
            {
              key: 'UJobID',
              type: 'dropDown',
              input: true,
              visible: true,
              required: false,
              options: job,
              width: 200,
              label: UnitEmployeesDataLang.UJobID[Lang],
            },
            {
              key: 'HourlySalary',
              type: 'text',
              input: true,
              visible: true,
              required: false,
              options: job,
              width: 200,
              label: UnitEmployeesDataLang.HourlySalary[Lang],
            },
            {
              key: 'Overtime1',
              type: 'text',
              input: true,
              visible: true,
              required: false,
              options: job,
              width: 200,
              label: UnitEmployeesDataLang.Overtime1[Lang],
            },
            {
              key: 'Overtime2',
              type: 'text',
              input: true,
              visible: true,
              required: false,
              options: job,
              width: 200,
              label: UnitEmployeesDataLang.Overtime2[Lang],
            },
            {
              key: 'UBasicSalary',
              type: 'text',
              input: true,
              visible: true,
              required: false,
              options: job,
              width: 200,
              label: UnitEmployeesDataLang.UBasicSalary[Lang],
            },
            {
              key: 'UServiceStatusID',
              type: 'dropDown',
              input: true,
              visible: false,
              required: false,
              width: 120,
              options: sds_status_list,
              label: UnitEmployeesDataLang.UServiceStatusID[Lang],
            },
            {
              key: 'ServiceStatusName',
              type: 'text',
              input: false,
              visible: true,
              required: false,
              width: 120,
              label: UnitEmployeesDataLang.ServiceStatusName[Lang],
            },
            {
              key: 'UEducationID',
              type: 'dropDown',
              options: Education,
              input: true,
              visible: true,
              required: true,
              width: 200,
              label: UnitEmployeesDataLang.UEducationID[Lang],
            },
            {
              key: 'UContractTypeID',
              type: 'dropDown',
              input: true,
              visible: true,
              required: false,
              width: 160,
              options: ContractType,
              label: UnitEmployeesDataLang.UContractTypeID[Lang],
            },
            {
              key: 'USixtyDate',
              type: 'date',
              input: true,
              visible: true,
              required: false,
              width: 140,
              label: UnitEmployeesDataLang.USixtyDate[Lang],
            },
            {
              key: 'RetailAge',
              type: 'number',
              input: true,
              visible: true,
              required: true,
              width: 140,
              label: UnitEmployeesDataLang.RetailAge[Lang],
            },
          ]}
          routeTo={{
            path: '/UnitEmployeesDetails',
            hasParams: true,
          }}
        />
      </View>
    </MainLayout>
  );
};

export default UnitEmployeesData;
