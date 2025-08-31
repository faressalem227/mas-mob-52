import React, { useContext, useEffect } from 'react';
import { useGlobalContext } from '../../../context/GlobalProvider';
import { useState } from 'react';
import { SafeAreaView, View, ScrollView } from 'react-native';
import { MainButton, WelcomeCard, Dropdown, MainLayout } from '../../../components';
import { useRouter } from 'expo-router';
import { icons } from '../../../constants';
import MaintenanceHomeLang from '../../../constants/Lang/Maintenance/MaintenanceHome';
import MaintenanceReports from '../../../constants/Lang/Maintenance/MaintenanceReports';
const MaintenanceHome = () => {
  const { DepartmentID } = useGlobalContext();
  const [counter, setcounter] = useState(0);
  const router = useRouter();
  const { user, Lang } = useGlobalContext();

  //console.log(user);
  return (
    <MainLayout title={MaintenanceHomeLang.pageTitle[Lang]}>
      <ScrollView contentContainerStyle={{ padding: 16 }} showsVerticalScrollIndicator={false}>
        <View className="bg-transparent ">
          <View className="mx-[16px] flex h-full flex-col justify-center ">
            <View className="mb-6">
              <MainButton
                title={MaintenanceHomeLang.MaintenanceSystemSettings[Lang]}
                handlePress={() => {
                  router.navigate({
                    pathname: 'MaintenanceSystem',
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
            </View>
            <View className="mb-6">
              <MainButton
                title={MaintenanceHomeLang.PreventiveMaintenance[Lang]}
                handlePress={() => {
                  router.navigate({
                    pathname: 'PreventiveMaintenanceHome',
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
                title={MaintenanceHomeLang.ReportBugs[Lang]}
                handlePress={() => {
                  router.navigate({
                    pathname: 'ReportBugs',
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
            </View>
            <View className="mb-6">
              <MainButton
                icon={icons.ArrowCircleLeft}
                iconStyles={'w-8 h-8'}
                textStyles={'w-[55vw] p-2'}
                title={MaintenanceReports.title[Lang]}
                handlePress={() => router.navigate('/MaintenanceReports')}></MainButton>
            </View>
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
        </View>
      </ScrollView>
    </MainLayout>
  );
};

export default MaintenanceHome;
