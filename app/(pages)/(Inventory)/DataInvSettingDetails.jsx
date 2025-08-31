import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { MainLayout } from "../../../components";
import { useRouter, useLocalSearchParams } from "expo-router";
import MainGrid from "../../../components/grid/MainGrid";
import { useGlobalContext } from "../../../context/GlobalProvider";
import DataInvSettingLang from "../../../constants/Lang/Invintory/DataInvSettingLang"; // Import language constants
import InfoDetailes from "../../../components/UI/InfoDetailes";
const DataInvSettingDetails = () => {
    const { DepartmentID, company, Rtl, Lang } = useGlobalContext(); // Add Lang from global context
    const router = useRouter();
    const screenHeight = Dimensions.get("window").height; // Get screen height dynamically
    const { AdditionID, AdditionNo, AdditionName, DataTypeName, ...restParams } =
        useLocalSearchParams();
    const [windowWidth, setWindowWidth] = useState(Dimensions.get("window").width);
    const [width, setWidth] = useState();

    useEffect(() => {
        if (windowWidth < 800) {
            setWidth("w-48"); // Set width to 250 px
        } else {
            setWidth("w-[80%]"); // Set width to 80%
        }
    }, [windowWidth]);
    const detailsData = [
        { label: DataInvSettingLang.Labels.Code[Lang], value: AdditionNo },
        { label: DataInvSettingLang.Labels.AdditionalStatement[Lang], value: AdditionName },
        { label: DataInvSettingLang.Labels.DataType[Lang], value: DataTypeName },
    ];
    return (
        <MainLayout title={DataInvSettingLang.PageTitle[Lang]} className="">
            <View className="bg-white flex-1 flex flex-col">
                <InfoDetailes
                    details={detailsData}
                    valueWidthClass="w-[60%]"
                />

                {/* Grid Section */}
                <View style={[styles.assetsGrid, { height: screenHeight }]}>
                    <MainGrid
                        tableHead={[
                            {
                                key: "SelectID",
                                label: DataInvSettingLang.Labels.Code[Lang], // Translated label
                                type: "number",
                                input: "false",
                                visible: "false",
                            },
                            {
                                key: "SelectNo",
                                label: DataInvSettingLang.Labels.Code[Lang], // Translated label
                                type: "number",
                                input: "true",
                                visible: "true",
                            },
                            {
                                key: "SelectName",
                                label: DataInvSettingLang.Labels.Selection[Lang], // Translated label
                                type: " ",
                                input: "true",
                                visible: "true",
                                width: 250,
                            },
                        ]}
                        pk={"SelectID"}
                        spTrx={"api_sc_addition_select__Trx"}
                        spIns={"api_sc_addition_select__Ins"}
                        spUpd={"api_sc_addition_select__Upd"}
                        spDel={"api_sc_addition_select__Del"}
                        dynamicCode={{
                            tbName: "sys_addition_Select",
                            codeCol: "SelectNo",
                        }}
                        TrxParam={[
                            { name: "AdditionID", value: AdditionID },
                            { name: "CompanyID", value: company },
                        ]}
                        DelParam={[
                            {
                                rowData: true,
                                name: "SelectID",
                                value: "SelectID",
                            },
                            { name: "LocationID", value: DepartmentID },
                        ]}
                        UpdBody={{ LocationID: DepartmentID }}
                        InsBody={{ LocationID: DepartmentID, AdditionID: AdditionID }}
                        TrxDependency={[AdditionID]}
                    />
                </View>
            </View>
        </MainLayout>
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
        marginVertical: 16,
    },
});

export default DataInvSettingDetails;