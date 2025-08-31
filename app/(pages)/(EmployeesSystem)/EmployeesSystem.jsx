import { StyleSheet, View } from 'react-native';
import { MainLayout } from '../../../components';
import { MainButton } from '../../../components';
import { icons } from '../../../constants';
import { useRouter } from 'expo-router';
import { useGlobalContext } from '../../../context/GlobalProvider';
import InvintorySystemSettingLang from '../../../constants/Lang/Invintory/InvintorySystemSettingLang';
import EmployeesReports from '../../../constants/Lang/EmployeesSystem/EmployeesReports';
function EmployeesSystem() {
  const router = useRouter();
  const { DepartmentID, Lang } = useGlobalContext();
  return (
    <View style={styles.container}>
      <MainLayout title={InvintorySystemSettingLang.EmployeesSystem[Lang]}>
        <View className="mx-[16px] flex h-full flex-col justify-center ">
          <View className="mb-6">
            <MainButton
              title={InvintorySystemSettingLang.EmployeeSettings[Lang]}
              handlePress={() => {
                router.navigate({
                  pathname: 'EmployeesSystemSetting',
                  params: {
                    DepartmentID: DepartmentID,
                  },
                });
              }}
              icon={icons.ArrowCircleLeft}
              iconStyles={'w-8 h-8'}
              textStyles={'w-52 p-2'}
            />
          </View>
          <View className="mb-6">
            <MainButton
              title={InvintorySystemSettingLang.EmployeeSystemData[Lang]}
              handlePress={() => {
                router.navigate({
                  pathname: 'Employees',
                  params: {
                    DepartmentID: DepartmentID,
                  },
                });
              }}
              icon={icons.ArrowCircleLeft}
              iconStyles={'w-8 h-8'}
              textStyles={'w-52 p-2'}
            />
          </View>
          <View className="mb-6">
            <MainButton
              icon={icons.ArrowCircleLeft}
              iconStyles={'w-8 h-8'}
              textStyles={'w-[55vw] p-2'}
              title={EmployeesReports.title[Lang]}
              handlePress={() => router.navigate('/EmployeesReports')}></MainButton>
          </View>
          {/* <View className="mb-6">
                    <MainButton
                      title="تقارير"
                      handlePress={() => {
                        router.navigate({pathname:"Employees", params:{
                          DepartmentID:DepartmentID
                        }});
                      }}
                      icon={icons.ArrowCircleLeft}
                      iconStyles={"w-8 h-8"}
                      textStyles={"w-52"}
                    />
                  </View> */}
        </View>
      </MainLayout>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dropdownContainer: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  assetsGrid: {
    marginTop: 4,
    marginBottom: 68,
  },
});
export default EmployeesSystem;
