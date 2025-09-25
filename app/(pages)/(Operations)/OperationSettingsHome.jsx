import React, { useState } from 'react';
import MainLayout from '../../../components/layout/MainLayout';
import { View } from 'react-native';
import SmallButton from '../../../components/UI/SmallButton';
import { useRouter } from 'expo-router';
import { useGlobalContext } from '../../../context/GlobalProvider';
import OperatingSystemLang from '../../../constants/Lang/OperatingSystem/OperatingSystemLang';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

function OperationSettingsHome() {
  const router = useRouter();
  const { Lang } = useGlobalContext();
  return (
    <>
      <MainLayout title={OperatingSystemLang.OperatingSystemSettings[Lang]}>
        <View className="mx-[16px] gap-4 flex h-full flex-row items-center justify-center ">
          <SmallButton
            title={OperatingSystemLang.AllocatingOperatingItems[Lang]}
            handlePress={() => router.navigate('/TermsCustomization')}
          />
          <SmallButton
            title={OperatingSystemLang.DefiningOperatingItems[Lang]}
            handlePress={() => router.navigate('/TermsDefinition')}
          />
          {/* <SmallButton
            title={OperatingSystemLang.ExpenseItems[Lang]}
            handlePress={() => router.navigate("/TermsExpenses")}
          /> */}
        </View>
      </MainLayout>
    </>
  );
}

export default OperationSettingsHome;
