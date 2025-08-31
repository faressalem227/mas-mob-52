import { StyleSheet, View, Dimensions } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
// import { colors, roles } from "../../../constants";
import icons from "../../../constants";
import { useGlobalContext } from "../../../context/GlobalProvider";
import MainGrid from "../../../components/grid/MainGrid";
import { MainLayout } from "../../../components";
import InvintorySystemSettingLang from "../../../constants/Lang/Invintory/InvintorySystemSettingLang";
const AdministrationCoding = ({ title, hasLeftComponent = false, onDrawerPress }) => {
    const screenHeight = Dimensions.get("window").height;
    const { DepartmentID,Lang,company } = useGlobalContext();
    return (

    <View style={styles.container}>
            <MainLayout title={InvintorySystemSettingLang.AdministrationCoding[Lang]}>
                <View style={[styles.assetsGrid, { height: screenHeight }]}>
                    <MainGrid
                        const tableHead={[
                            {
                                key: "DepartmentID",
                                label: InvintorySystemSettingLang.Code[Lang],
                                type: "number",
                                input: "false",
                                visible: "false",
                                width: 90
                            },
                            {
                                key: "DepartmentCode",
                                label: InvintorySystemSettingLang.Code[Lang],
                                type: "number",
                                input: "true",
                                visible: "true",
                                width: 90
                            }, {
                                key: "DepartmentName",
                                label: InvintorySystemSettingLang.AdministrationName[Lang],
                                input: "true",
                                visible: "true",

                            }
                        ]}
                        mixedWidth={true}
                        pk={'SubDepartmentID'}
                        dynamicCode={
                            {
                              tbName:'ms_SubDepartment',
                              codeCol:'DepartmentCode'
                            }
                          }
                        spTrx={'api_ms_Department_Trx'}
                        spIns={'api_ms_Department_Ins'}
                        spUpd={'api_ms_Department_Upd'}
                        spDel={'api_ms_Department_Del'}
                        TrxParam={[
                            { name: 'LocationID', value: DepartmentID },
                            { name: 'CompanyID', value: company },
                        ]}
                        DelParam={[
                            { name: 'LocationID', value: DepartmentID },
                            { rowData: true, name: 'SubDepartmentID', value: 'SubDepartmentID' }
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

export default AdministrationCoding;
