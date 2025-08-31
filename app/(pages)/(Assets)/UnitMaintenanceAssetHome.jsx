import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useGlobalContext } from '../../../context/GlobalProvider';
import AssetHomeLang from '../../../constants/Lang/AssetManagment/AssetHomeLang';
import AssetsReports from '../../../constants/Lang/AssetManagment/AssetsReports';
import { MainButton, MainLayout } from '../../../components';
import { useRouter } from 'expo-router';
import { icons } from '../../../constants';

const UnitMaintenanceAssetHome = () => {
  const { DepartmentID, Lang } = useGlobalContext();
  const router = useRouter();

  return (
    <MainLayout title={AssetHomeLang.PageTitle[Lang]}>
      <ScrollView contentContainerStyle={{ padding: 16 }} showsVerticalScrollIndicator={false}>
        <View className="flex flex-col justify-center bg-transparent">
          <View className="mb-6">
            <MainButton
              title={AssetHomeLang.SubDepartments[Lang]}
              handlePress={() => {
                router.navigate({
                  pathname: 'SubDepartments',
                  params: { DepartmentID },
                });
              }}
              icon={icons.ArrowCircleLeft}
              iconStyles={'w-8 h-8'}
              textStyles={'w-52 p-2'}
            />
          </View>
          <View className="mb-6">
            <MainButton
              title={AssetHomeLang.Locations[Lang]}
              handlePress={() => {
                router.navigate({
                  pathname: 'Locations',
                  params: { DepartmentID },
                });
              }}
              icon={icons.ArrowCircleLeft}
              iconStyles={'w-8 h-8'}
              textStyles={'w-52 p-2'}
            />
          </View>
          <View className="mb-6">
            <MainButton
              title={AssetHomeLang.Assets[Lang]}
              handlePress={() => {
                router.navigate({
                  pathname: 'Assets',
                  params: { DepartmentID },
                });
              }}
              icon={icons.ArrowCircleLeft}
              iconStyles={'w-8 h-8'}
              textStyles={'w-52 p-2'}
            />
          </View>

          <View className="mb-6">
            <MainButton
              title={AssetHomeLang.AssetsReports[Lang]}
              handlePress={() =>
                router.navigate({
                  pathname: 'AssetsReports',
                  params: { DepartmentID },
                })
              }
              icon={icons.ArrowCircleLeft}
              iconStyles={'w-8 h-8'}
              textStyles={'w-[55vw] p-2'}
            />
          </View>
        </View>
      </ScrollView>
    </MainLayout>
  );
};

export default UnitMaintenanceAssetHome;
