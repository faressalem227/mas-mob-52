import { View } from "react-native";
import React, { useState, useEffect } from "react";
import api from "../../../utilities/api";
import { ErrorMassege, ScrollComponent, MainLayout, MainButton, Dropdown } from "../../../components";
import { useRouter } from "expo-router";
import { useGlobalContext } from "../../../context/GlobalProvider";
import DropDown from "../../../components/UI/DropDown";
import { icons } from "../../../constants";
import ButtonWithoutIcons from "../../../components/UI/ButtonWithoutIcons";
import StoresPageLang from "../../../constants/Lang/Invintory/StoresPageLang";
const StoresPage = () => {
    const router = useRouter();
    const { getFunction } = useGlobalContext()

    const handleNavigate = () => {
        router.navigate("/AssetManagementPage")
    };
    const { DepartmentID,Lang} = useGlobalContext();

const[qualitativeStoreValue,setQualitativeStoreValue]=useState(null);
const options=[StoresPageLang.QualitativeStore[Lang],StoresPageLang.QualitativeStore2[Lang],StoresPageLang.QualitativeStore3[Lang]];
const RouterFirstTermBalance = () => {
    router.navigate("/FirstTermBalance");
  };
    return (
        <MainLayout title={ StoresPageLang.Stores[Lang]}>
            <>
                <View className="mx-[16px] my-6">
                <Dropdown
                        title={StoresPageLang.QualitativeStore[Lang]}
                        data={options}
                        placeholder={StoresPageLang.Select[Lang]}
                        onChange={(value) => {
                            setQualitativeStoreValue(value);
                        }}
                    />
              </View>
                <View className="flex flex-row flex-wrap p-2 mt-5 h-[100%]">
                    <ButtonWithoutIcons title={StoresPageLang.Purchase[Lang]} handlePress={RouterFirstTermBalance}></ButtonWithoutIcons>
                    <ButtonWithoutIcons title={StoresPageLang.Request[Lang]} handlePress={RouterFirstTermBalance}></ButtonWithoutIcons>
                    <ButtonWithoutIcons title={StoresPageLang.permission[Lang]} handlePress={RouterFirstTermBalance}></ButtonWithoutIcons>
                    <ButtonWithoutIcons title={StoresPageLang.inspection[Lang]} handlePress={RouterFirstTermBalance}></ButtonWithoutIcons>
                </View>
                {/* <View className="px-3 mt-20">
                    <MainButton
                        icon={icons.ArrowCircleLeft}
                        iconStyles={"mr-2 mt-1"}
                        title={"التالي"}
                        handlePress={handleNavigate}
                    ></MainButton>
                </View> */}
            </>
        </MainLayout>
    );
};

export default StoresPage;
