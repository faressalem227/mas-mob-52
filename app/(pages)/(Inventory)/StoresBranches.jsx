import { View } from 'react-native';
import React, { useState, useEffect } from 'react';
import api from '../../../utilities/api';
import { ErrorMassege, ScrollComponent, MainLayout, MainButton } from '../../../components';
import { useRouter } from 'expo-router';
import { useGlobalContext } from '../../../context/GlobalProvider';
import DropDown from '../../../components/UI/DropDown';
import { icons } from '../../../constants';
import ButtonWithoutIcons from '../../../components/UI/ButtonWithoutIcons';
import StoresBranchesLang from '../../../constants/Lang/Invintory/StoresBranchesLang';
const StoresPage = () => {
  const router = useRouter();
  const { getFunction, Lang } = useGlobalContext();
  const [qualitativeStoreValue, setQualitativeStoreValue] = useState(null);
  const options = ['المخزن النوعي', 'المخزن الثاني', 'المخزن التالت'];
  return (
    <MainLayout title={StoresBranchesLang.pageTitle[Lang]}>
      <>
        <View className="bg-transparent ">
          <View className="mx-[16px] flex h-full flex-col justify-center ">
            <View className="mb-6">
              <MainButton
                icon={icons.ArrowCircleLeft}
                iconStyles={'w-8 h-8'}
                textStyles={'w-[55vw] p-2'}
                title={StoresBranchesLang.invintorySystemSetting[Lang]}
                handlePress={() => router.navigate('/InvintorySetting')}></MainButton>
            </View>
            <View className="mb-6">
              <MainButton
                icon={icons.ArrowCircleLeft}
                iconStyles={'w-8 h-8'}
                textStyles={'w-[55vw] p-2'}
                title={StoresBranchesLang.InventoryItemData[Lang]}
                handlePress={() => router.navigate('/StockItems')}></MainButton>
            </View>
            <View className="mb-6">
              <MainButton
                icon={icons.ArrowCircleLeft}
                iconStyles={'w-8 h-8'}
                textStyles={'w-[55vw] p-2'}
                title={StoresBranchesLang.InvintoryData[Lang]}
                handlePress={() => router.navigate('/StoresMovement')}></MainButton>
            </View>
            <View className="mb-6">
              <MainButton
                icon={icons.ArrowCircleLeft}
                iconStyles={'w-8 h-8'}
                textStyles={'w-[55vw] p-2'}
                title={StoresBranchesLang.InventoryReports[Lang]}
                handlePress={() => router.navigate('/InventoryReports')}></MainButton>
            </View>
          </View>
        </View>
      </>
    </MainLayout>
  );
};
export default StoresPage;
