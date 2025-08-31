import { StyleSheet, View, Dimensions } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
// import { colors, roles } from "../../../constants";
import icons from "../../../constants";
import { useGlobalContext } from "../../../context/GlobalProvider";
import MainGrid from "../../../components/grid/MainGrid";
import { MainLayout } from "../../../components";
import InvintorySystemSettingLang from "../../../constants/Lang/Invintory/InvintorySystemSettingLang"
const SpecificationDefinition = ({ title, hasLeftComponent = false, onDrawerPress }) => {
    const screenHeight = Dimensions.get("window").height;
    const { DepartmentID,Lang} = useGlobalContext();
    return (

    <View style={styles.container}>
            <MainLayout title={InvintorySystemSettingLang.SpecificationDefinition[Lang]}>
                <View style={[styles.assetsGrid, { height: screenHeight }]}>
                    <MainGrid
                        const tableHead={[
                            {
                                key: "SpecID",
                                label:InvintorySystemSettingLang.Code[Lang],
                                type: "number",
                                input: "false",
                                visible: "false",
                                width: 80
                            },
                            {
                                key: "SpecCode",
                                label: InvintorySystemSettingLang.Code[Lang],
                                type: "number",
                                input: "true",
                                visible: "true",
                                width: 80
                            }, {
                                key: "SpecName",
                                label:InvintorySystemSettingLang.Name[Lang],
                                input: "true",
                                visible: "true",

                            },
                        ]}
                        mixedWidth={true}
                        pk={'SpecID'}
                        spTrx={'api_Sc_item_Spec_Trx'}
                        spIns={'api_Sc_item_Spec_Ins'}
                        spUpd={'api_Sc_item_Spec_Upd'}
                        spDel={'api_Sc_item_Spec_Del'}
                        dynamicCode={
                            {
                              tbName:'Sc_item_Spec',
                              codeCol:'SpecCode'
                            }
                          }
                        TrxParam={[
                            { name: 'LocationID', value: DepartmentID },
                        ]}
                        DelParam={[
                            { name: 'LocationID', value: DepartmentID },
                            { rowData: true, name: 'SpecID', value: 'SpecID' }
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

export default SpecificationDefinition;
