import { StyleSheet, View, Dimensions } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
// import { colors, roles } from "../../../constants";
import icons from "../../../constants";
import { useGlobalContext } from "../../../context/GlobalProvider";
import MainGrid from "../../../components/grid/MainGrid";
import { MainLayout } from "../../../components";
import MainDataLang from "../../../constants/Lang/Invintory/MainDataLang";
const Entities = ({ title, hasLeftComponent = false, onDrawerPress }) => {
    const screenHeight = Dimensions.get("window").height;
    const { DepartmentID,Lang, company } = useGlobalContext()
    return (

    <View style={styles.container}>
            <MainLayout title={MainDataLang.Entities[Lang]}>
                <View style={[styles.assetsGrid, { height: screenHeight }]}>
                    <MainGrid
                        const tableHead={[
                            {
                                key: "ParityID",
                                label: MainDataLang.Code[Lang],
                                type: "number",
                                input: "false",
                                visible: "false",
                            },
                            {
                                key: "ParityCode",
                                label: MainDataLang.Code[Lang],
                                type: "number",
                                input: "true",
                                visible: "true",
                                width: 50
                            },
                            {
                                key: "ParityName",
                                label:MainDataLang.EntityName[Lang],
                                input: "true",
                                visible: "true",
                                width: 100

                            }
                        ]}
                        dynamicCode={
                            {
                              tbName:'Sc_Parity',
                              codeCol:'ParityCode'
                            }
                          }
                          StaticWidth={true}
                        pk={'ParityID'}
                        spTrx={'api_Sc_Parity_Trx'}
                        spIns={'api_Sc_Parity_Ins'}
                        spUpd={'api_Sc_Parity_Upd'}
                        spDel={'api_Sc_Parity_Del'}
                        TrxParam={[
                            { name: "CompanyID", value: company },
                        ]}
                        DelParam={[
                            { name: 'LocationID', value: DepartmentID },
                            { name: 'CompanyID', value: 1 },
                            { rowData: true, name: 'ParityID', value: 'ParityID' }
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

export default Entities;
