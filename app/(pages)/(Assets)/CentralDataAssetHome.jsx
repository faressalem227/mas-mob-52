import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useGlobalContext } from '../../../context/GlobalProvider';
import AssetHomeLang from '../../../constants/Lang/AssetManagment/AssetHomeLang';
import AssetsReports from '../../../constants/Lang/AssetManagment/AssetsReports';
import { MainButton, MainLayout } from '../../../components';
import { useRouter } from 'expo-router';
import { icons } from '../../../constants';

const Home = () => {
  const { DepartmentID, Lang } = useGlobalContext();
  const router = useRouter();

  return (
    <MainLayout title={AssetHomeLang.PageTitle[Lang]}>
      <View className="mx-4 my-auto flex flex-col justify-center bg-transparent">
        <View className="mb-6">
          <MainButton
            title={AssetHomeLang.AssetSystemSettingss[Lang]}
            handlePress={() => {
              router.navigate({
                pathname: 'CentralDataAssetsSettingsHome',
                params: { DepartmentID },
              });
            }}
            icon={icons.ArrowCircleLeft}
            iconStyles={'w-8 h-8'}
            textStyles={'w-52 p-2'}
          />
        </View>
        {/* <View className="mb-6">
						<MainButton
							title={AssetHomeLang.Locations[Lang]}
							handlePress={() => {
								router.navigate({
									pathname: "Locations",
									params: { DepartmentID },
								});
							}}
							icon={icons.ArrowCircleLeft}
							iconStyles={"w-8 h-8"}
							textStyles={"w-52 p-2"}
						/>
					</View> */}
        <View className="mb-6">
          <MainButton
            title={AssetHomeLang.AssetClassification[Lang]}
            handlePress={() => {
              router.navigate({
                pathname: 'AssetsClassification',
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
            title={AssetHomeLang.AssetsAttributes[Lang]}
            handlePress={() => {
              router.navigate({
                pathname: 'TechnicalSpecifications',
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
            title={AssetHomeLang.TechnicalEvaluation[Lang]}
            handlePress={() => {
              router.navigate({
                pathname: './(AssetsSettingsHome)/TechnicalEvaluation',
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
            title={AssetHomeLang.RiskLikelihood[Lang]}
            handlePress={() => {
              router.navigate({
                pathname: './(AssetsSettingsHome)/RiskLikelihood',
                params: { DepartmentID },
              });
            }}
            icon={icons.ArrowCircleLeft}
            iconStyles={'w-8 h-8'}
            textStyles={'w-52 p-2'}
          />
        </View>
        {/* <View className="mb-6">
						<MainButton
							title={AssetHomeLang.AssetClasses[Lang]}
							handlePress={() => {
								router.navigate({
									pathname: "AssetCategories",
									params: { DepartmentID },
								});
							}}
							icon={icons.ArrowCircleLeft}
							iconStyles={"w-8 h-8"}
							textStyles={"w-52 p-2"}
						/>
					</View> */}
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
    </MainLayout>
  );
};

export default Home;
