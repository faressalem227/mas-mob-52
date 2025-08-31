import { useGlobalContext } from '../../../context/GlobalProvider';
import { View, ScrollView } from 'react-native';
import { MainButton, MainLayout } from '../../../components';
import { useRouter } from 'expo-router';
import { icons } from '../../../constants';
import MaintenanceHomeLang from '../../../constants/Lang/Maintenance/MaintenanceHome';

const MaintenanceHome = () => {
  const { Lang, DepartmentID } = useGlobalContext();

  const router = useRouter();
  return (
    <MainLayout title={MaintenanceHomeLang.pageTitle[Lang]}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 justify-center gap-4 px-4">
          <MainButton
            title={MaintenanceHomeLang.EmploymentsCoding[Lang]}
            handlePress={() => {
              router.navigate({
                pathname: 'EmploymentsCoding',
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
                pathname: 'PreventiveMaintenance',
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
            title={MaintenanceHomeLang.Classification[Lang]}
            handlePress={() => {
              router.navigate({
                pathname: 'Trades',
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
            title={MaintenanceHomeLang.SchedulePreventiveMaintenance[Lang]}
            handlePress={() => {
              router.navigate({
                pathname: 'SchedulePreventiveMaintenance',
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
            title={MaintenanceHomeLang.CreateWorkOrders[Lang]}
            handlePress={() => {
              router.navigate({
                pathname: 'CreateWorkOrders',
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
            title={MaintenanceHomeLang.ReportBugs[Lang]}
            handlePress={() => {
              router.navigate({
                pathname: 'ReportFailure',
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
            title={MaintenanceHomeLang.WorkOrders[Lang]}
            handlePress={() => {
              router.navigate({
                pathname: 'WorkOrders',
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
            title={MaintenanceHomeLang.CurrentStatus[Lang]}
            handlePress={() => {
              router.navigate({
                pathname: 'CurrentStatus',
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
      </ScrollView>
    </MainLayout>
  );
};

export default MaintenanceHome;
