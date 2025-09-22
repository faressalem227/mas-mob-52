import { MainGrid, MainLayout, InfoDetailes, MainButton } from '../../../../components';
import { router, useLocalSearchParams, useRouter } from 'expo-router';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import { View } from 'react-native';

const UnitEmployeesDetailsLang = {
  EmployeeDetails: {
    1: 'بيانات الموظف',
    2: 'Employee Details',
  },

  StaffCode: {
    1: 'الكود',
    2: 'Code',
  },

  StaffName: {
    1: 'اسم الموظف',
    2: 'Employee Name',
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

  CivilID: {
    1: 'الرقم القومي',
    2: 'National ID',
  },

  DegreeName: {
    1: ' الدرجة',
    2: 'Degree',
  },

  UContractTypeID: {
    1: 'نوع التعاقد',
    2: 'Contract Type',
  },

  UEducationID: {
    1: 'المؤهل',
    2: 'Education',
  },

  AssignedAssets: {
    1: 'الأصول المخصصة للموظف',
    2: 'Assigned Assets',
  },

  AssigendWorkorders: {
    1: 'أوامر الشغل المخصصة للموظف',
    2: 'Assigend Workorders',
  },
};

const UnitEmployeesDetails = () => {
  const { Lang } = useGlobalContext();

  const data = useLocalSearchParams();
  const router = useRouter();

  const infoData = [
    { label: UnitEmployeesDetailsLang.StaffCode[Lang], value: data.StaffCode },
    { label: UnitEmployeesDetailsLang.StaffName[Lang], value: data.StaffName },
    { label: UnitEmployeesDetailsLang.GenderName[Lang], value: data.GenderName },
    { label: UnitEmployeesDetailsLang.BirthDate[Lang], value: data.BirthDate.split('T')[0] },
    { label: UnitEmployeesDetailsLang.Address[Lang], value: data.Address },
    { label: UnitEmployeesDetailsLang.Phones[Lang], value: data.Phones },
    { label: UnitEmployeesDetailsLang.CivilID[Lang], value: data.CivilID },
    { label: UnitEmployeesDetailsLang.DegreeName[Lang], value: data.DegreeName },
    { label: UnitEmployeesDetailsLang.UContractTypeID[Lang], value: data.UContractTypeID },
    { label: UnitEmployeesDetailsLang.UEducationID[Lang], value: data.UEducationID },
  ];

  return (
    <MainLayout title={UnitEmployeesDetailsLang.EmployeeDetails[Lang]}>
      <View className="flex-1 p-4">
        <InfoDetailes details={infoData} />

        <View className="my-5 flex-1 items-center gap-3">
          <MainButton
            title={UnitEmployeesDetailsLang.AssignedAssets[Lang]}
            handlePress={() =>
              router.navigate({
                pathname: '/UnitAssignedAssets',
                params: {
                  StaffID: data.StaffID,
                },
              })
            }
          />

          <MainButton
            title={UnitEmployeesDetailsLang.AssigendWorkorders[Lang]}
            handlePress={() =>
              router.navigate({
                pathname: '/UnitAssignedWorkorders',
                params: {
                  StaffID: data.StaffID,
                },
              })
            }
          />
        </View>
      </View>
    </MainLayout>
  );
};

export default UnitEmployeesDetails;
