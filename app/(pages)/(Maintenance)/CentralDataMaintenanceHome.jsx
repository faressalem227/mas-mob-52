import { useGlobalContext } from '../../../context/GlobalProvider';
import { View, ScrollView } from 'react-native';
import { MainButton, MainLayout } from '../../../components';
import { useRouter } from 'expo-router';
import { icons } from '../../../constants';
import MaintenanceHomeLang from '../../../constants/Lang/Maintenance/MaintenanceHome';
import MaintenanceReports from '../../../constants/Lang/Maintenance/MaintenanceReports';
const CentralDataMaintenanceHome = () => {
  const { DepartmentID } = useGlobalContext();
  const router = useRouter();
  const { Lang } = useGlobalContext();

  //console.log(user);
  return (
    <MainLayout title={MaintenanceHomeLang.pageTitle[Lang]}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={true}>
        <View className="flex-1 items-center justify-center gap-6 px-4">
          <MainButton
            title={MaintenanceHomeLang.MaintenanceSystemSettingss[Lang]}
            handlePress={() => {
              router.navigate({
                pathname: 'CenteralDataMaintenanceSystem',
                params: {
                  DepartmentID: DepartmentID,
                },
              });
            }}
            icon={icons.ArrowCircleLeft}
            iconStyles={'w-8 h-8'}
            textStyles={'w-56 p-2'}
          />

          <MainButton
            title={MaintenanceHomeLang.Safty[Lang]}
            handlePress={() => {
              router.navigate({
                pathname: 'HealthAndSafety',
                params: {
                  DepartmentID: DepartmentID,
                },
              });
            }}
            icon={icons.ArrowCircleLeft}
            iconStyles={'w-8 h-8'}
            textStyles={'w-56 p-2'}
          />

          <MainButton
            title={MaintenanceHomeLang.PreventiveMaintenancee[Lang]}
            handlePress={() => {
              router.navigate({
                pathname: 'CenteralPreventiveMaintenance',
                params: {
                  DepartmentID: DepartmentID,
                },
              });
            }}
            icon={icons.ArrowCircleLeft}
            iconStyles={'w-8 h-8'}
            textStyles={'w-56 p-2'}
          />

          <MainButton
            title={MaintenanceHomeLang.CentralSchedule[Lang]}
            handlePress={() => {
              router.navigate({
                pathname: 'CeneteralSchedulePreventiveMaintenance',
                params: {
                  DepartmentID: DepartmentID,
                },
              });
            }}
            icon={icons.ArrowCircleLeft}
            iconStyles={'w-8 h-8'}
            textStyles={'w-56 p-2'}
          />

          <MainButton
            title={MaintenanceHomeLang.GenerateCentralWorkOrders[Lang]}
            handlePress={() => {
              router.navigate({
                pathname: 'CenteralCreateWorkOrders',
                params: {
                  DepartmentID: DepartmentID,
                },
              });
            }}
            icon={icons.ArrowCircleLeft}
            iconStyles={'w-8 h-8'}
            textStyles={'w-56 p-2'}
          />

          <MainButton
            title={MaintenanceHomeLang.CenteralReportFailure[Lang]}
            handlePress={() => {
              router.navigate({
                pathname: 'CeneteralReportFailure',
                params: {
                  DepartmentID: DepartmentID,
                },
              });
            }}
            icon={icons.ArrowCircleLeft}
            iconStyles={'w-8 h-8'}
            textStyles={'w-56 p-2'}
          />

          <MainButton
            title={MaintenanceHomeLang.CenteralWorkOrders[Lang]}
            handlePress={() => {
              router.navigate({
                pathname: 'CeneteralWorkOrders',
                params: {
                  DepartmentID: DepartmentID,
                },
              });
            }}
            icon={icons.ArrowCircleLeft}
            iconStyles={'w-8 h-8'}
            textStyles={'w-56 p-2'}
          />

          {/* <View className="mb-6">
            <MainButton
              title={MaintenanceHomeLang.MaintenanceAlerts[Lang]}
              handlePress={() => {
                router.navigate({
                  pathname: 'MaintenanceAlerts',
                  params: {
                    DepartmentID: DepartmentID,
                  },
                });
              }}
              icon={icons.ArrowCircleLeft}
              iconStyles={'w-8 h-8'}
              textStyles={'w-56 p-2'}
            />
          </View>

          <View className="mb-6">
            <MainButton
              icon={icons.ArrowCircleLeft}
              iconStyles={'w-8 h-8'}
              textStyles={'w-[55vw] p-2'}
              title={MaintenanceReports.title[Lang]}
              handlePress={() => router.navigate('/MaintenanceReports')}></MainButton>
          </View> */}

          {/* <View className="mb-6">
            <MainButton
              title={"الفحص اليومي"}
              handlePress={() => {
                router.navigate({
                  pathname: "Contractors",
                  params: {
                    DepartmentID: DepartmentID,
                  },
                });
              }}
              icon={icons.ArrowCircleLeft}
              iconStyles={"w-8 h-8"}
              textStyles={"w-56"}
            />
          </View> */}

          {/* <View className="mb-6">
            <MainButton
              title={"تقارير منظومة الصيانة"}
              handlePress={() => {
                router.navigate({
                  pathname: "PreventiveMaintenance",
                  params: {
                    DepartmentID: DepartmentID,
                  },
                });
              }}
              icon={icons.ArrowCircleLeft}
              iconStyles={"w-8 h-8"}
              textStyles={"w-56"}
            />
          </View>
          */}
        </View>
      </ScrollView>
    </MainLayout>
  );
};

export default CentralDataMaintenanceHome;
