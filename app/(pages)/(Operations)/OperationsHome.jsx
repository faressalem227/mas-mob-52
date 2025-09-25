import React, { useContext, useEffect } from 'react';
import { useGlobalContext } from '../../../context/GlobalProvider';
import { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import OperatingSystemLang from '../../../constants/Lang/OperatingSystem/OperatingSystemLang';
import { MainButton, WelcomeCard, Dropdown, MainLayout } from '../../../components';
import { useRouter } from 'expo-router';
import { icons } from '../../../constants';

const OperationsHome = () => {
  const { DepartmentID, Lang } = useGlobalContext();
  // const [counter, setcounter] = useState(0);
  const router = useRouter();
  return (
    <MainLayout title={OperatingSystemLang.PageTitle[Lang]}>
      <View className="bg-transparent ">
        <View className="mx-[16px] flex h-full flex-col items-center justify-center ">
          <View className="mb-6">
            <MainButton
              title={OperatingSystemLang.OperatingSystemSettings[Lang]}
              icon={icons.ArrowCircleLeft}
              iconStyles={'w-8 h-8'}
              textStyles={'w-60 p-2'}
              handlePress={() => {
                router.navigate({
                  pathname: 'OperationSettingsHome',
                  params: {
                    DepartmentID: DepartmentID,
                  },
                });
              }}
            />
          </View>
          <View className="mb-6">
            <MainButton
              title={OperatingSystemLang.OperatingData[Lang]}
              icon={icons.ArrowCircleLeft}
              iconStyles={'w-8 h-8'}
              textStyles={'w-60 p-2'}
              handlePress={() => {
                router.navigate({
                  pathname: 'OperatingData',
                  params: {
                    DepartmentID: DepartmentID,
                  },
                });
              }}
            />
          </View>
          {/* <View className="mb-6">
            <MainButton
              title={OperatingSystemLang.ManuallyEquipment[Lang]}
              icon={icons.ArrowCircleLeft}
              iconStyles={'w-8 h-8'}
              textStyles={'w-60 p-2'}
              handlePress={() => {
                router.navigate({
                  pathname: 'DailyOperation',
                  params: {
                    DepartmentID: DepartmentID,
                  },
                });
              }}
            />
          </View>
          <View className="mb-6">
            <MainButton
              title={OperatingSystemLang.Expenses[Lang]}
              icon={icons.ArrowCircleLeft}
              iconStyles={'w-8 h-8'}
              textStyles={'w-60 p-2'}
              handlePress={() => {
                router.navigate({
                  pathname: 'Expenses',
                  params: {
                    DepartmentID: DepartmentID,
                  },
                });
              }}
            />
          </View> */}
        </View>
      </View>
    </MainLayout>
  );
};

export default OperationsHome;
