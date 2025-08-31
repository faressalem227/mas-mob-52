import {
    StyleSheet,
    View,
    Dimensions,
    Modal,
    TouchableWithoutFeedback,
    Image,
    Text,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import {
    router,
    useFocusEffect,
    useLocalSearchParams,
} from "expo-router";
import { useGlobalContext } from "../../../context/GlobalProvider";
import React, { useState, useEffect, useCallback } from "react";
import api from "../../../utilities/api";
import MainGrid from "../../../components/grid/MainGrid";
import { CustomButton, MainLayout } from "../../../components";
import trashh from "../../../assets/images/trashh.png";
import Warning from "../../../assets/images/Warning.png";
import { icons } from "../../../constants";
import { priceFormatter } from "../../../utilities/dateFormater";
import { useDropDown } from "../../../hooks/useDropDownData";
import StoresPageLang from "../../../constants/Lang/Invintory/StoresPageLang";
import InfoDetailes from "../../../components/UI/InfoDetailes";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const screenHeight = Dimensions.get("window").height;

const PermissionDetails = () => {
    const { DepartmentID, Lang, Rtl } = useGlobalContext();
    const { user, company } = useGlobalContext();
    const row = useLocalSearchParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalType, setModalType] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [refetch, setRefetch] = useState(0);
    const [selectedGroupID, setSelectdGroupID] = useState(false);
    const [ItemID, setItemID] = useState(false);
    const [windowWidth, setWindowWidth] = useState(Dimensions.get("window").width);
    const [width, setWidth] = useState();

    useEffect(() => {
        if (windowWidth < 800) {
            setWidth("w-48"); // Set width to 250 px
        } else {
            setWidth("w-[80%]"); // Set width to 80%
        }
    }, [windowWidth]);

    useFocusEffect(
        useCallback(() => {
            setRefetch((prevRefetch) => prevRefetch + 1);
        }, [])
    );

    const { data: Group } = useDropDown(
        "api_Sc_Item_Group_List2",
        { SectionID: row.SectionID },
        "GroupID",
        "GroupName"
    );

    const { data: Items } = useDropDown(
        "api_Sc_Items__List2",
        {
            GroupID: selectedGroupID,
            SectionID: row.SectionID,
        },
        "ItemID",
        "ItemName"
    );

    const { data: UnitList } = useDropDown(
        "api_sc_Items_Units_List",
        { ItemID: ItemID },
        "value",
        "label"
    );

    console.log(row, "#####################");
    const confirmDelete = async () => {
        try {
            const res = await api.delete(
                `/table?sp=DeleteOrderWithDetails&OrderID=${row.OrderID}&CompanyID=${company}`
            );
            console.log(res);
            console.log("Deleting");
            setModalVisible(false);
            router.back();
        } catch (e) {
            console.log(e);
        }
    };
    const confirmConfirm = async () => {
        try {
            const res = await api.put(`/table?sp=api_Sc_Orders_Confirm`, {
                OrderID: row.OrderID,
                UserName: user.username,
                LocationID: DepartmentID,
                CompanyID: company
            });
            console.log(res.data, "44444444");
            console.log("Confirming");
            setModalVisible(false);
            router.replace({
                pathname: "FirstTermBalance",
                params: {
                    processTypeID: row.processTypeID,
                    SectionID: row.SectionID,
                    OrderID: row.OrderID,
                    LocationID: row.LocationID,
                },
            });
        } catch (e) {
            console.log(e);
        }
    };
    const handleDelete = () => {
        setModalType("delete");
        setModalVisible(true);
    };

    const handleConfirm = () => {
        setModalType("confirm");
        setModalVisible(true);
    };

    const handleShowReport = () => {
        router.navigate({
            pathname: "ReportsStim",
            params: {
                ReportID: 10041,
                ReportName: StoresPageLang.PermissionReport[Lang], // Translated report name
                Value: row.OrderID,
            },
        });
    };
    const detailsData = [
        { label: StoresPageLang.PermissionNumber[Lang], value: row.OrderNo },
        { label: StoresPageLang.PermissionType[Lang], value: row?.ProcessName },
        { label: StoresPageLang.PermissionDate[Lang], value: row?.OrderDate?.split("T")[0] },
        { label: StoresPageLang.Description[Lang], value: row?.OrderDescription },
        { label: StoresPageLang.Total[Lang], value: row?.Total ? priceFormatter(row?.Total) : "" },
    ];
    return (
        <MainLayout
            loading={loading}
            title={`${StoresPageLang.Data[Lang]} ${row.ProcessName}`} // Translated title
        >
            <ScrollView horizontal={true} className={`flex pb-10 pt-2 px-3 ${Rtl ? "flex-row-reverse" : "flex-row"} flex-wrap`} >
                {row?.trx_statusID != 6 && (
                    <>
                        <CustomButton
                            Icon={icons.PencilLine}
                            title={StoresPageLang.EditAddition[Lang]} // Translated button title
                            onPress={() => {
                                router.navigate({
                                    pathname: "AddNewPermissionPage",
                                    params: {
                                        type: 2,
                                        processTypeID: row.processTypeID,
                                        SectionID: row.SectionID,
                                        processID: row.ProcessID,
                                        processLabel: row.ProcessName,
                                        ...row,
                                    },
                                });
                            }}
                        // width={windowWidth<800?wp("22%"):wp("20%")}
                        />
                        <CustomButton
                            Icon={icons.Done}
                            title={StoresPageLang.Modal.ConfirmButton[Lang]} // Translated button title
                            onPress={handleConfirm}
                        // width={windowWidth<800?wp("20%"):wp("13%")}
                        />
                        <CustomButton
                            Icon={trashh}
                            title={StoresPageLang.Modal.DeleteButton[Lang]} // Translated button title
                            onPress={handleDelete}
                        // width={windowWidth<800?wp("20%"):wp("13%")}
                        />
                    </>
                )}
                <CustomButton
                    title={StoresPageLang.Report[Lang]} // Translated button title
                    onPress={handleShowReport}

                // width={windowWidth<800?wp("20%"):wp("10%")}
                />
            </ScrollView>
            <View style={[styles.assetsGrid, { height: screenHeight }]}>
                <InfoDetailes
                    details={detailsData}
                    valueWidthClass="w-[60%]"
                />
                <MainGrid
                    handleDropDownChange={(e, v) => {
                        if (e === "GroupID") {
                            setSelectdGroupID(v);
                        }
                        if (e === "ItemID") {
                            setItemID(v);
                        }
                    }}
                    tableHead={[
                        {
                            key: "GroupID",
                            label: StoresPageLang.Group[Lang], // Translated label
                            type: "dropdown",
                            input: "true",
                            options: Group,
                            visible: "false",
                            width: 50,
                        },
                        {
                            key: "OrderDetailsID",
                            label: "رقم المجموعة",
                            type: "number",
                            input: "false",
                            visible: "false",
                            width: 50,
                        },
                        {
                            key: "GroupName",
                            label: StoresPageLang.Group[Lang], // Translated label
                            type: "text",
                            input: "false",
                            visible: "true",
                            width: 100,
                        },
                        {
                            key: "ItemID",
                            label: StoresPageLang.Item[Lang], // Translated label
                            type: "dropdown",
                            options: Items,
                            input: "true",
                            visible: "false",
                            width: 100,
                        },
                        {
                            key: "ItemCode",
                            label: StoresPageLang.ItemCode[Lang], // Translated label
                            type: "number",
                            input: "false",
                            visible: "true",
                            width: 100,
                        },
                        {
                            key: "ItemName",
                            label: StoresPageLang.Item[Lang], // Translated label
                            type: "text",
                            input: "false",
                            visible: "true",
                            width: 100,
                        },
                        {
                            key: "UnitName",
                            label: StoresPageLang.Unit[Lang], // Translated label
                            type: "text",
                            input: "false",
                            visible: "true",
                            width: 100,
                        },
                        {
                            key: "UnitID",
                            label: StoresPageLang.Unit[Lang], // Translated label
                            type: "dropdown",
                            input: "true",
                            options: UnitList,
                            visible: "false",
                            width: 100,
                        },
                        {
                            key: "Balance",
                            label: StoresPageLang.Balance[Lang], // Translated label
                            type: "text",
                            input: "false",
                            visible: "true",
                            width: 100,
                        },
                        {
                            key: "Qty",
                            label: StoresPageLang.Quantity[Lang], // Translated label
                            type: "number",
                            input: "true",
                            visible: "true",
                            width: 100,
                        },
                        {
                            key: "Qty2",
                            label: StoresPageLang.GridLabels.Quantity2[Lang], // Translated label
                            type: "number",
                            input: "false",
                            visible: row.processTypeID == 5 ? "true" : "false",
                            width: 100,
                        },
                        {
                            key: "UnitCost",
                            label: StoresPageLang.UnitPrice[Lang], // Translated label
                            type: "price",
                            input: "true",
                            visible: "true",
                            width: 100,
                        },
                        {
                            key: "TotalCost",
                            label: StoresPageLang.Total[Lang], // Translated label
                            type: "price",
                            input: "false",
                            visible: "true",
                            width: 100,
                        },
                    ]}
                    pk={"OrderDetailsID"}
                    spTrx={"api_Sc_Orders_Details_Trx"}
                    spIns={"api_Sc_Orders_Details_Ins"}
                    spUpd={"api_Sc_Orders_Details_Upd"}
                    spDel={"api_Sc_Orders_Details_Del"}
                    hasCrud={row?.trx_statusID != 6}
                    UpdBody={{ OrderID: row.OrderID }}
                    InsBody={{ OrderID: row.OrderID }}
                    TrxParam={[{ name: "OrderID", value: row.OrderID }]}
                    DelParam={[
                        { rowData: true, name: "OrderDetailsID", value: "OrderDetailsID" },
                    ]}
                    TrxDependency={[row.OrderID, row.Changed, refetch]}
                    StaticWidth={true}
                />
            </View>
            <Modal
                animationType="fade"
                visible={modalVisible}
                transparent={true}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={styles.modalOverlay} dir={Rtl ? "rtl" : "ltr"}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalContent}>
                                {modalType !== "delete" ? (
                                    <View className="text-center">
                                        <Image
                                            source={icons.Done}
                                            className="mx-auto w-12 h-12 mb-3"
                                        />
                                        <Text className="font-tbold text-center">
                                            {StoresPageLang.Modal.ConfirmTitle[Lang]} {/* Translated title */}
                                        </Text>
                                        <Text className="font-tmedium text-center">
                                            {StoresPageLang.Modal.ConfirmMessage[Lang]} {/* Translated message */}
                                        </Text>
                                        <View className="flex flex-row justify-center mt-4">
                                            <TouchableOpacity
                                                className="rounded-md px-4 py-2 bg-none border-[.5px] border-[#133E54] mx-2 w-[69px] flex flex-row justify-center items-center"
                                                onPress={() => setModalVisible(false)}
                                            >
                                                <Text className="font-tbold text-[#133E54]">
                                                    {StoresPageLang.Modal.CancelButton[Lang]} {/* Translated button text */}
                                                </Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                className="mx-2 rounded-md bg-green-600 w-[69px] flex flex-row justify-center items-center"
                                                onPress={confirmConfirm}
                                            >
                                                <Text className="font-tbold text-white">
                                                    {StoresPageLang.Modal.ConfirmButton[Lang]} {/* Translated button text */}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                ) : (
                                    <View className="text-center">
                                        <Image
                                            source={Warning}
                                            className="mx-auto w-16 h-16"
                                        />
                                        <Text className="font-tbold text-center">
                                            {StoresPageLang.Modal.DeleteTitle[Lang]} {/* Translated title */}
                                        </Text>
                                        <Text className="font-tmedium text-center">
                                            {StoresPageLang.Modal.DeleteMessage[Lang]} {/* Translated message */}
                                        </Text>
                                        <View className="flex flex-row justify-center mt-4">
                                            <TouchableOpacity
                                                className="rounded-md px-4 py-2 bg-none border-[.5px] border-[#133E54] mx-2 w-[69px] flex flex-row justify-center items-center"
                                                onPress={() => setModalVisible(false)}
                                            >
                                                <Text className="font-tbold text-[#133E54]">
                                                    {StoresPageLang.Modal.CancelButton[Lang]} {/* Translated button text */}
                                                </Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                className="mx-2 rounded-md bg-[#F15555] w-[69px] flex flex-row justify-center items-center"
                                                onPress={confirmDelete}
                                            >
                                                <Text className="font-tbold text-white">
                                                    {StoresPageLang.Modal.DeleteButton[Lang]} {/* Translated button text */}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )}
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </MainLayout>
    );
};
const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 16,
        padding: 8,
    },
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
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        width: "80%",
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 8,
        alignItems: "center",
    },
});

export default PermissionDetails;