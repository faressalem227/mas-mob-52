import { StyleSheet, View, Dimensions } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
// import { colors, roles } from "../../../constants";
import icons from "../../../constants";
import { useGlobalContext } from "../../../context/GlobalProvider";
import MainGrid from "../../../components/grid/MainGrid";
import { MainLayout } from "../../../components";
import InvintorySystemSettingLang from "../../../constants/Lang/Invintory/InvintorySystemSettingLang";
const UnitDefinition = ({ title, hasLeftComponent = false, onDrawerPress }) => {
    const screenHeight = Dimensions.get("window").height;
    const { DepartmentID,Lang } = useGlobalContext();
    return (

    <View style={styles.container}>
            <MainLayout title={InvintorySystemSettingLang.SuppliersTypes[Lang]}>
                <View style={[styles.assetsGrid, { height: screenHeight }]}>
                    <MainGrid
                        const tableHead={[
                            {
                                key: "SupplierTypeID",
                                label:InvintorySystemSettingLang.Code[Lang],
                                type: "number",
                                input: "false",
                                visible: "false",
                                width: 80
                            },
                            {
                                key: "SupplierTypeCode",
                                label:InvintorySystemSettingLang.Code[Lang],
                                type: "number",
                                input: "true",
                                visible: "true",
                                width: 80
                            }, {
                                key: "SupplierTypeName",
                                label: InvintorySystemSettingLang.SupplierType[Lang],
                                input: "true",
                                visible: "true",

                            },
                        ]}
                        dynamicCode={
                            {
                              tbName:'Sc_Suppliers_Types',
                              codeCol:'SupplierTypeCode'
                            }
                          }
                        mixedWidth={true}
                        pk={'SupplierTypeID'}
                        spTrx={'api_Sc_Suppliers_Types_Trx'}
                        spIns={'api_Sc_Suppliers_Types_Ins'}
                        spUpd={'api_Sc_Suppliers_Types_Upd'}
                        spDel={'api_Sc_Suppliers_Types_Del'}
                        TrxParam={[
                            {name: "CompanyID", value: 1}
                        ]}
                        DelParam={[
                            { name: 'LocationID', value: DepartmentID },
                            { name: 'CompanyID', value: 1 },
                            { rowData: true, name: 'SupplierTypeID', value: 'SupplierTypeID' }
                        ]}
                        UpdBody={{ LocationID: DepartmentID,CompanyID:1 }}
                        InsBody={{ LocationID: DepartmentID ,CompanyID:1,SupplierTypeID:1}}
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

export default UnitDefinition;
