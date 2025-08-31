import { StyleSheet, View, Dimensions } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
// import { colors, roles } from "../../../constants";
import icons from "../../../constants";
import { useGlobalContext } from "../../../context/GlobalProvider";
import MainGrid from "../../../components/grid/MainGrid";
import { MainLayout } from "../../../components";
import InvintorySystemSettingLang from "../../../constants/Lang/Invintory/InvintorySystemSettingLang";
const UnitTypeDefinition = ({ title, hasLeftComponent = false, onDrawerPress }) => {
    const screenHeight = Dimensions.get("window").height;
    const { DepartmentID,Lang } = useGlobalContext();
    return (

    <View style={styles.container}>
            <MainLayout title={InvintorySystemSettingLang.DefinationOfUnitType[Lang]}>
                <View style={[styles.assetsGrid, { height: screenHeight }]}>
                    <MainGrid
                        const tableHead={[
                            {
                                key: "UnitTypeID",
                                label: InvintorySystemSettingLang.Code[Lang],
                                type: "number",
                                input: "false",
                                visible: "false",
                                width: 80
                            },
                            {
                                key: "UnitTypeCode",
                                label: InvintorySystemSettingLang.Code[Lang],
                                type: "number",
                                input: "true",
                                visible: "true",
                                width: 80
                            }, {
                                key: "UnitTypeName",
                                label:InvintorySystemSettingLang.Name[Lang],
                                input: "true",
                                visible: "true",

                            },
                        ]}
                        dynamicCode={
                            {
                              tbName:'Sc_item_unitType',
                              codeCol:'UnitTypeCode'
                            }
                          }
                        mixedWidth={true}
                        pk={'UnitTypeID'}
                        spTrx={'api_Sc_item_unitType_trx'}
                        spIns={'api_Sc_item_unitType_Ins'}
                        spUpd={'api_Sc_item_unitType_Upd'}
                        spDel={'api_Sc_item_unitType_Del'}
                        TrxParam={[
                            { name: 'LocationID', value: DepartmentID },
                        ]}
                        DelParam={[
                            { name: 'LocationID', value: DepartmentID },
                            { rowData: true, name: 'UnitTypeID', value: 'UnitTypeID' }
                        ]}
                        UpdBody={{ LocationID: DepartmentID }}
                        InsBody={{ LocationID: DepartmentID }}
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

export default UnitTypeDefinition;
