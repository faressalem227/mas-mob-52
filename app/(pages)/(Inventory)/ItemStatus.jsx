import { StyleSheet, View, Dimensions } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
// import { colors, roles } from "../../../constants";
import icons from "../../../constants";
import { useGlobalContext } from "../../../context/GlobalProvider";
import MainGrid from "../../../components/grid/MainGrid";
import InvintorySystemSettingLang from "../../../constants/Lang/Invintory/InvintorySystemSettingLang";
import { MainLayout } from "../../../components";
const ItemStatus = ({ title, hasLeftComponent = false, onDrawerPress }) => {
    const screenHeight = Dimensions.get("window").height;
    const { DepartmentID,Lang} = useGlobalContext();
    return (

    <View style={styles.container}>
            <MainLayout title={InvintorySystemSettingLang.ItemStatus[Lang]}>
                <View style={[styles.assetsGrid, { height: screenHeight }]}>
                    <MainGrid
                        const tableHead={[
                            {
                                key: "StatusID",
                                label: "كود ",
                                type: "number",
                                input: "false",
                                visible: "false",
                            },
                            {
                                key: "StatusCode",
                                label: InvintorySystemSettingLang.Code[Lang],
                                type: "number",
                                input: "true",
                                visible: "true",
                                width: 80
                            }, {
                                key: "StatusName",
                                label: InvintorySystemSettingLang.ItemStatus[Lang],
                                input: "true",
                                visible: "true",

                            },
                        ]}
                        dynamicCode={
                            {
                              tbName:'Sc_Item_Status',
                              codeCol:'StatusCode'
                            }
                          }
                        mixedWidth={true}
                        pk={'StatusID'}
                        spTrx={'api_Sc_Item_Status_Trx'}
                        spIns={'api_Sc_Item_Status_Ins'}
                        spUpd={'api_Sc_Item_Status_Upd'}
                        spDel={'api_Sc_Item_Status_Del'}
                        TrxParam={[
                            {name: "CompanyID", value: 1}
                        ]}
                        DelParam={[
                            { name: 'LocationID', value: DepartmentID },
                            { name: 'CompanyID', value: 1 },
                            { rowData: true, name: 'StatusID', value: 'StatusID' }
                        ]}
                        UpdBody={{ LocationID: DepartmentID,CompanyID:1 }}
                        InsBody={{ LocationID: DepartmentID ,CompanyID:1}}
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

export default ItemStatus;
