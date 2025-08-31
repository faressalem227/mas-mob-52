import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { MainLayout } from "../../../components";
import { useLocalSearchParams } from "expo-router";
import { useGlobalContext } from "../../../context/GlobalProvider";
import NewPermitionPageGrid from "../../../components/grid/NewPermitionPageGrid";
import NewPermitionPageLang from "../../../constants/Lang/Invintory/NewPermitionPageLang"; // Import language constants
import { CustomButton } from "../../../components";
import { icons } from "../../../constants";

const NewPermitionPage = () => {
    const row = useLocalSearchParams();
    const { Lang  ,Rtl} = useGlobalContext(); // Add Lang from global context

    const handleEdit = () => {
        if (selectedRow !== null) {
            setRowData(selectedRow);
            setModalType("edit");
            setModalVisible(true);
        } else {
            Alert.alert(NewPermitionPageLang.edit[Lang]);
        }
    };

    const handleDelete = () => {
        if (selectedRow !== null) {
            setModalType("delete");
            setModalVisible(true);
        } else {
            Alert.alert(NewPermitionPageLang.delete[Lang]);
        }
    };

    return (
        <MainLayout title={NewPermitionPageLang.PageTitle[Lang]}>
            <View style={styles.buttonContainer} className="px-1 mt-4">
                <CustomButton
                    Icon={icons.PencilLine}
                    title={NewPermitionPageLang.Buttons.EditPermission[Lang]} // Translated button title
                    onPress={handleEdit}
                />
                <CustomButton
                    Icon={icons.Trashh}
                    title={NewPermitionPageLang.Buttons.DeletePermission[Lang]} // Translated button title
                    onPress={handleDelete}
                />
                <CustomButton
                    Icon={icons.Checks}
                    title={NewPermitionPageLang.Buttons.ConfirmPermission[Lang]} // Translated button title
                />
            </View>
            <View className="bg-white h-[100vh] flex flex-col">
            <View className={`flex flex-col ${Rtl ? "rtl" : "ltr"} bg-[#F6F6F6] rounded-sm p-4 m-4`}>
            {/* Permission Number */}
            <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
            <Text className="w-[109px] text-base font-tmedium">
                            {NewPermitionPageLang.Labels.PermissionNumber[Lang]} {/* Translated label */}
                        </Text>
                        <Text className="text-base font-medium w-48">{}</Text>
                    </View>

                    {/* Permission Type */}
                    <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
                    <Text className="w-[109px] text-base font-tmedium">
                            {NewPermitionPageLang.Labels.PermissionType[Lang]} {/* Translated label */}
                        </Text>
                        <Text className="text-base font-medium w-48">{}</Text>
                    </View>

                    {/* Permission Date */}
                    <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
                    <Text className="w-[109px] text-base font-tmedium">
                            {NewPermitionPageLang.Labels.PermissionDate[Lang]} {/* Translated label */}
                        </Text>
                        <Text className="text-base font-tmedium w-48">{}</Text>
                    </View>

                    {/* Parity */}
                    <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
                    <Text className="w-[109px] text-base font-tmedium">
                            {NewPermitionPageLang.Labels.Parity[Lang]} {/* Translated label */}
                        </Text>
                        <Text className="text-base font-tmedium w-48"></Text>
                    </View>

                    {/* Description */}
                    <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
                    <Text className="w-[109px] text-base font-tmedium">
                            {NewPermitionPageLang.Labels.Description[Lang]} {/* Translated label */}
                        </Text>
                        <Text className="text-base font-tmedium w-48">{}</Text>
                    </View>
                </View>
                <NewPermitionPageGrid />
            </View>
        </MainLayout>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: "row-reverse",
        marginBottom: 16,
    },
});

export default NewPermitionPage;