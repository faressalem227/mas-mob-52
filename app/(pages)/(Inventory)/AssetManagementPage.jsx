import { View } from "react-native";
import React, { useState, useEffect } from "react";
import api from "../../../utilities/api";
import { ErrorMassege, ScrollComponent, MainLayout, MainButton } from "../../../components";
import { useRouter } from "expo-router";
import { useGlobalContext } from "../../../context/GlobalProvider";
import DropDown from "../../../components/UI/DropDown";
import { icons } from "../../../constants";
import AssetManagementPageLang from "../../../constants/Lang/Invintory/AssetManagementPage" ;
import ButtonWithoutIcons from "../../../components/UI/ButtonWithoutIcons";
const AssetManagementPage = () => {
    const router = useRouter();
    const handleNavigate = () => {
        router.navigate("/StoresTablePage")
    };
    const {Lang, company}=useGlobalContext();

    return (
        <MainLayout title={AssetManagementPageLang.PageTitle[Lang]}>
            <>
                <View className="flex flex-row flex-wrap p-2 mt-10">
                    <ButtonWithoutIcons title={AssetManagementPageLang.Financial[Lang]}></ButtonWithoutIcons>
                    <ButtonWithoutIcons title={AssetManagementPageLang.Technical[Lang]}></ButtonWithoutIcons>
                    <ButtonWithoutIcons title={AssetManagementPageLang.failures[Lang]}></ButtonWithoutIcons>
                    <ButtonWithoutIcons title={AssetManagementPageLang.Operational[Lang]}></ButtonWithoutIcons>
                    <ButtonWithoutIcons title={AssetManagementPageLang.Possibility[Lang]}></ButtonWithoutIcons>
                    <ButtonWithoutIcons title={AssetManagementPageLang.Report[Lang]}></ButtonWithoutIcons>
                    <ButtonWithoutIcons title={AssetManagementPageLang.schedules[Lang]}></ButtonWithoutIcons>
                    <ButtonWithoutIcons title={AssetManagementPageLang.Monthly[Lang]}></ButtonWithoutIcons>
                    <ButtonWithoutIcons title={AssetManagementPageLang.TechnicalEv[Lang]}></ButtonWithoutIcons>
                    <ButtonWithoutIcons title={AssetManagementPageLang.Risk[Lang]}></ButtonWithoutIcons>
                    <ButtonWithoutIcons title={AssetManagementPageLang.daily[Lang]}></ButtonWithoutIcons>
                </View>
                <View className="px-3 mt-20">
                    <MainButton
                        icon={icons.ArrowCircleLeft}
                        iconStyles={"mr-2 mt-1"}
                        title={AssetManagementPageLang.Next[Lang]}
                        handlePress={handleNavigate}
                    ></MainButton>
                </View>
            </>
        </MainLayout>
    );
};

export default AssetManagementPage;
