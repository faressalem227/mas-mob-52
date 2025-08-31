import { View, Text, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import api from "../../../utilities/api";
import { MainLayout, MainButton } from "../../../components";
import { useLocalSearchParams, useRouter } from "expo-router";
import { icons } from "../../../constants";
import { useGlobalContext } from "../../../context/GlobalProvider";
import InvintorySystemSettingLang from "../../../constants/Lang/Invintory/InvintorySystemSettingLang";
import InfoDetailes from "../../../components/UI/InfoDetailes";
const StoresPage = () => {
    const router = useRouter();
    const data = useLocalSearchParams();
    const row = useLocalSearchParams();
    const { Lang, Rtl } = useGlobalContext();
    const [windowWidth, setWindowWidth] = useState(
        Dimensions.get("window").width
    );
    const [width, setWidth] = useState();
    useEffect(() => {
        if (windowWidth < 800) {
            setWidth("w-48"); // Set width to 250 px
        } else {
            setWidth("w-[80%]"); // Set width to 80%
        }
    }, [windowWidth]);
    const detailsData = [
        { label: InvintorySystemSettingLang.OperationName[Lang], value: row.ProcessName },
        { label: InvintorySystemSettingLang.OperationType[Lang], value: "" },
        { label: InvintorySystemSettingLang.NextOperation[Lang], value: row.NextProcessTitleID },
        { label: InvintorySystemSettingLang.NextOperationAr[Lang], value: row.NextProcessTitleAr },
        { label: InvintorySystemSettingLang.NextOperationEn[Lang], value: row.NextProcessTitleEn },
    ];
    return (
        <MainLayout title={InvintorySystemSettingLang.InvintoryOperationsDetailes[Lang]}>
            <>
                <InfoDetailes
                    details={detailsData}
                    valueWidthClass="w-[60%]"
                />
                <View className="bg-transparent ">
                    <View className="flex flex-col mx-[16px] mt-2 justify-center ">
                        <View className="mb-2">
                            <MainButton
                                icon={icons.ArrowCircleLeft}
                                iconStyles={"w-8 h-8"}
                                textStyles={"w-52"}
                                title={InvintorySystemSettingLang.AdditionalData[Lang]}
                                handlePress={() => {
                                    router.navigate({
                                        pathname: "AdditionalData",
                                        params: {
                                            ProcessID: data.ProcessID,
                                        },
                                    });
                                }}
                            ></MainButton>
                        </View>
                        <View className="mb-2">
                            <MainButton
                                icon={icons.ArrowCircleLeft}
                                iconStyles={"w-8 h-8"}
                                textStyles={"w-52"}
                                title={InvintorySystemSettingLang.Choices[Lang]}
                                handlePress={() => {
                                    router.navigate({
                                        pathname: "Options",
                                        params: {
                                            ProcessID: data.ProcessID,
                                        },
                                    });
                                }}
                            ></MainButton>
                        </View>
                        <View className="mb-2">
                            <MainButton
                                icon={icons.ArrowCircleLeft}
                                iconStyles={"w-8 h-8"}
                                textStyles={"w-52"}
                                title={InvintorySystemSettingLang.Signatures[Lang]}
                                handlePress={() => {
                                    router.navigate({
                                        pathname: "Signatures",
                                        params: {
                                            ProcessID: data.ProcessID,
                                        },
                                    });
                                }}
                            ></MainButton>
                        </View>
                        <View className="mb-2">
                        </View>
                    </View>
                </View>
            </>
        </MainLayout>
    );
};

export default StoresPage;
