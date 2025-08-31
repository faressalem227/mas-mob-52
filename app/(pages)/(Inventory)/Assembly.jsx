import { StyleSheet, View, Dimensions, Text } from "react-native";
import { router, useLocalSearchParams, useRouter } from "expo-router";
// import { colors, roles } from "../../../constants";
import icons from "../../../constants";
import { useGlobalContext } from "../../../context/GlobalProvider";
import MainGrid from "../../../components/grid/MainGrid";
import { MainLayout } from "../../../components";
import {useDropDown } from "../../../hooks/useDropDownData";
import { useEffect, useState } from "react";
import MainDataLang from "../../../constants/Lang/Invintory/MainDataLang";
const Assembly = ({ title, hasLeftComponent = false, onDrawerPress }) => {
    const screenHeight = Dimensions.get("window").height;
    const row = useLocalSearchParams();
                    const router = useRouter();
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
                const { DepartmentID,Lang ,company,Rtl} = useGlobalContext()
    const { ItemID } = useLocalSearchParams();
    const { data: Unit, loading: unitLoader } = useDropDown(
        "api_Sc_Items_Units_list",
        {ItemID},
        "value",
        "label"
    );  
    const { data: Item, loading: ItemLoader } = useDropDown(
        "api_Sc_Items_List2",
        {GroupID:1,SectionID:1},
        "ItemID",
        "FullItemName"
    );  
    return (
    <View style={styles.container}>
            <MainLayout title={MainDataLang.Collection[Lang]}>
            <View className={`flex flex-col ${Rtl ? "rtl" : "ltr"} bg-[#F6F6F6] rounded-sm p-4 m-4`}>
            <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
            <Text className="w-[122px] text-base font-tmedium">{MainDataLang.ItemCode[Lang]}</Text>
                                                        <Text className={`${width} text-basefont-tmedium`}>
                                                            {row.ItemCode}
                                                        </Text>
                                                    </View>
                                                    <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
                                                    <Text className="w-[122px] text-base font-tmedium"> {MainDataLang.ItemName[Lang]}</Text>
                                                        <Text className={`${width} text-basefont-tmedium`}>
                                                            {row.ItemName}
                                                        </Text>
                                                    </View>
                                                    <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
                                                    <Text className="w-[122px] text-base font-tmedium">{MainDataLang.Unit[Lang]}</Text>
                                                        <Text className={`${width} text-basefont-tmedium text-left`}>
                                                            {row.UnitName}
                                                        </Text>
                                                    </View>
                                                    </View>
                <View style={[styles.assetsGrid, { height: screenHeight -155 }]}>
                    <MainGrid
                        const tableHead={[
                            {
                                key: "AssemblyItemID",
                                label: MainDataLang.ItemName[Lang],
                                type: "dropdown",
                                options:Item,
                                input: "true",
                                visible: "false",
                            },
                            {
                                key: "ItemName",
                                label: MainDataLang.ItemName[Lang],
                                input: "false",
                                visible: "true",

                            },
                            {
                                key: "AssemblyUnitID",
                                label: MainDataLang.Unit[Lang],
                                type: "dropdown",
                                options:Unit,
                                input: "true",
                                visible: "false",
                                width: 50
                            },
                            {
                                key: "UnitName",
                                label: MainDataLang.Unit[Lang],
                                input: "false",
                                visible: "true",
                                width: 50
                            },
                            {
                                key: "AssemblyQuantity",
                                label: MainDataLang.Quantity[Lang],
                                type: "number",
                                input: "true",
                                visible: "true",

                            },
                            
                        ]}
                        mixedWidth={true}
                        pk={'AssemblyID'}
                        spTrx={'api_Sc_Items_Items_Assembly_Trx'}
                        spIns={'api_Sc_Items_Items_Assembly_Ins'}
                        spUpd={'api_Sc_Items_Items_Assembly_Upd'}
                        spDel={'api_Sc_Items_Items_Assembly_Del'}
                        TrxParam={[
                            { name: 'ItemID', value: ItemID},
                            { name: 'CompanyID', value: company },
                        ]}
                        DelParam={[
                            {rowData: true, name: 'AssemblyID', value: 'AssemblyID'},
                            // { rowData: true, name: 'JobID', value: 'JobID' }
                        ]}
                        UpdBody={{ ItemID: ItemID }}
                        InsBody={{ CompanyID:1,ItemID: ItemID}}
                        TrxDependency={[]}
                    />
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

export default Assembly;
