import { useRouter } from 'expo-router';
import { View, Text, ScrollView } from 'react-native';
import { SmallButton, MainLayout } from '../../../../components';
import { useGlobalContext } from '../../../../context/GlobalProvider';

const UnitEmployeesHomeLang = {
  Employees: {
    1: 'الموظفين',
    2: 'Employees',
  },

  SubDepartments: {
    1: 'الادارات الفرعية',
    2: 'Sub Departments',
  },

  EmployeesData: {
    1: 'بيانات الموظفين',
    2: 'Employees Data',
  },
};

const UnitEmployeesHome = () => {
  const { Lang } = useGlobalContext();
  const router = useRouter();

  return (
    <MainLayout title={UnitEmployeesHomeLang.Employees[Lang]}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 items-center justify-center gap-6 px-4">
          <SmallButton
            title={UnitEmployeesHomeLang.SubDepartments[Lang]}
            handlePress={() => {
              router.navigate({
                pathname: 'SubDepartments',
              });
            }}
          />

          <SmallButton
            title={UnitEmployeesHomeLang.EmployeesData[Lang]}
            handlePress={() => {
              router.navigate({
                pathname: 'UnitEmployeesData',
              });
            }}
          />
        </View>
      </ScrollView>
    </MainLayout>
  );
};

export default UnitEmployeesHome;
