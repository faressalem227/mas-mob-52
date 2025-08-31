import React, { useState } from "react";
import MainLayout from "../../../../components/layout/MainLayout";
import { View } from "react-native";
import SmallButton from "../../../../components/UI/SmallButton";
import { useRouter } from "expo-router";
import MaintenanceSystemLang from "../../../../constants/Lang/Maintenance/MaintenanceSystem/MaintenanceSystem";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useGlobalContext } from "../../../../context/GlobalProvider";

function MaintenanceSystem() {
  const router = useRouter();
  const { Lang } = useGlobalContext();
  return (
    <>
      <MainLayout title={MaintenanceSystemLang.pageTitle[Lang]}>
        <View className="mt-12"></View>
        <View
          className="flex flex-wrap flex-row-reverse justify-center items-center"
          style={{ gap: hp("1.5%") }}
        >
          <SmallButton
            title={MaintenanceSystemLang.FailersCodingCause[Lang]}
            handlePress={() => router.navigate("/FailersCodingCause")}
          />
          <SmallButton
            title={MaintenanceSystemLang.FailersCoding[Lang]}
            handlePress={() => router.navigate("/FailersCoding")}
          />
          <SmallButton
            title={MaintenanceSystemLang.BusinessClassification[Lang]}
            handlePress={() => router.navigate("/BusinessClassification")}
          />
          <SmallButton
            title={MaintenanceSystemLang.Importance[Lang]}
            handlePress={() => router.navigate("/Importance")}
          />
          <SmallButton
            title={MaintenanceSystemLang.DefinitionQuantities[Lang]}
            handlePress={() => router.navigate("/DefinitionQuantities")}
          />
          <SmallButton
            title={MaintenanceSystemLang.SubDepartments[Lang]}
            handlePress={() => router.navigate("/SubDepartments")}
          />
          <SmallButton
            title={MaintenanceSystemLang.EmploymentsCoding[Lang]}
            handlePress={() => router.navigate("/EmploymentsCoding")}
          />
          <SmallButton
            title={MaintenanceSystemLang.Contractors[Lang]}
            handlePress={() => router.navigate("/Contractors")}
          />
        </View>
      </MainLayout>
    </>
  );
}

export default MaintenanceSystem;
