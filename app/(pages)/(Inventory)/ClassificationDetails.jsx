import { StyleSheet, View, TouchableOpacity, Dimensions } from "react-native";
import { useGlobalContext } from "../../../context/GlobalProvider";
import { MainButton, WelcomeCard, Dropdown } from "../../../components";
import MainGrid from "../../../components/grid/MainGrid";
import React, { useState, useCallback, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { MainLayout } from "../../../components";
import api from "../../../utilities/api";
import InvintorySystemSettingLang from "../../../constants/Lang/Invintory/InvintorySystemSettingLang";
import { HandleDropdownFormat } from "../../../hooks/useDropDownData";
const Classification = ({ title, hasLeftComponent = false, onDrawerPress }) => {
    const screenHeight = Dimensions.get("window").height;
    const { DepartmentID,Lang,company,user } = useGlobalContext();
    const { GroupID } = useLocalSearchParams();
    console.log(GroupID, 'GroupID');

    //console.log(DepartmentID)

    return (
    <View style={styles.container}>
            <MainLayout title="خصائص التصنيف">
                <View className="h-[100vh] my-4">
                    <View style={[styles.assetsGrid, { height: screenHeight-50 }]}>
                        <MainGrid
                            const
                            tableHead={[
                                {
                                    key: "GroupSpecID",
                                    label: InvintorySystemSettingLang.ItemCode[Lang],
                                    type: "number",
                                    input: "false",
                                    visible: "false",
                                    width: 120,
                                },
                                {
                                    key: "GroupAttributeNameAr",
                                    label: "المواصفه بالعربي",
                                    input: "true",
                                    visible: "true",
                                    width: 150,
                                },
                                {
                                    key: "GroupAttributeNameAr",
                                    label: "المواصفه بالانجليزي",
                                    input: "true",
                                    visible: "true",
                                    width: 150,
                                },
                                {
                                    key: "IsKmAge",
                                    label: "العمر بالكيلومترات",
                                    input: "true",
                                    visible: "true",
                                    width: 150,
                                },
                                {
                                    key: "IsDaysAge",
                                    label: "العمر بالايام",
                                    input: "true",
                                    visible: "true",
                                    width: 150,
                                },
                            ]}
                            // dynamicCode={{
                            //     tbName: "sc_item_group_spec",
                            //     codeCol: "GroupCode",
                            // }}
                            mixedWidth={true}
                            pk={"GroupSpecID"}
                            spTrx={"api_sc_item_group_spec_trx"}
                            spIns={"api_sc_item_group_Spec_ins"}
                            spUpd={"api_sc_item_group_spec_upd"}
                            spDel={"api_sc_item_group_spec_del"}
                            TrxParam={[
                                { name: "GroupID", value: GroupID },
                                { name: "CompanyID", value: company },
                            ]}
                            DelParam={[
                                { name: "CompanyID", value: company },
                                { rowData: true, name: "GroupID", value: "GroupID" },
                            ]}
                            UpdBody={{ CompanyID: company }}
                            InsBody={{ CompanyID: company }}
                            TrxDependency={[]}
                        />
                    </View>
                </View>
            </MainLayout>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    dropdownContainer: {
        marginHorizontal: 16,
        marginVertical: 24,
    },
    assetsGrid: {
        marginVertical: 8,
    },
});

export default Classification;
