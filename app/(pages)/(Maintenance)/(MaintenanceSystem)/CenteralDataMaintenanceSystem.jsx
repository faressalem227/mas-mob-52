import React, { useState } from 'react';
import MainLayout from '../../../../components/layout/MainLayout';
import { View } from 'react-native';
import SmallButton from '../../../../components/UI/SmallButton';
import { useRouter } from 'expo-router';
import MaintenanceSystemLang from '../../../../constants/Lang/Maintenance/MaintenanceSystem/MaintenanceSystem';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useGlobalContext } from '../../../../context/GlobalProvider';

function CenteralDataMaintenanceSystem() {
  const router = useRouter();
  const { Lang } = useGlobalContext();
  return (
    <>
      <MainLayout title={MaintenanceSystemLang.pageTitle[Lang]}>
        <View className="mt-12"></View>
        <View
          className="flex flex-row-reverse flex-wrap items-center justify-center"
          style={{ gap: hp('1.5%') }}>
          <SmallButton
            title={MaintenanceSystemLang.FailersCodingCause[Lang]}
            handlePress={() => router.navigate('FailersCodingCause')}
          />
          <SmallButton
            title={MaintenanceSystemLang.FailersCoding[Lang]}
            handlePress={() => router.navigate('FailersCoding')}
          />
          <SmallButton
            title={MaintenanceSystemLang.BusinessClassification[Lang]}
            handlePress={() => router.navigate('BusinessClassification')}
          />
          <SmallButton
            title={MaintenanceSystemLang.PermitionsTypes[Lang]}
            handlePress={() => router.navigate('PermitionsTypes')}
          />
          <SmallButton
            title={MaintenanceSystemLang.ExpensesTypes[Lang]}
            handlePress={() => router.navigate('ExpensesTypes')}
          />
          <SmallButton
            title={MaintenanceSystemLang.FollowStates[Lang]}
            handlePress={() => router.navigate('FollowStates')}
          />
          <SmallButton
            title={MaintenanceSystemLang.FollowTypes[Lang]}
            handlePress={() => router.navigate('FollowType')}
          />
          <SmallButton
            title={MaintenanceSystemLang.MpProcedures[Lang]}
            handlePress={() => router.navigate('MpProcedures')}
          />
        </View>
      </MainLayout>
    </>
  );
}

export default CenteralDataMaintenanceSystem;
