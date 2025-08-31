import { StyleSheet, View, Dimensions } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
// import { colors, roles } from "../../../constants";
import icons from "../../../constants";
import { useGlobalContext } from "../../../context/GlobalProvider";
import MainGrid from "../../../components/grid/MainGrid";
import { MainLayout } from "../../../components";
import MainDataLang from "../../../constants/Lang/Invintory/MainDataLang";
const Clients = ({ title, hasLeftComponent = false, onDrawerPress }) => {
    const screenHeight = Dimensions.get("window").height;
    const { DepartmentID,Lang,company} = useGlobalContext();
    return (

    <View style={styles.container}>
            <MainLayout title={MainDataLang.Customers[Lang]}>
                <View style={[styles.assetsGrid, { height: screenHeight }]}>
                    <MainGrid
                        const tableHead={[
                            {
                                key: "ClientID",
                                label: MainDataLang.Code[Lang],
                                type: "number",
                                input: "false",
                                visible: "false",
                            },
                            
                            {
                                key: "ClientCode",
                                label: MainDataLang.Code[Lang],
                                type: "number",
                                input: "true",
                                visible: "true",

                            },
                            {
                                key: "ClientName",
                                label: MainDataLang.CustomerName[Lang],
                                input: "true",
                                visible: "true",
                            },
                        ]}
                        dynamicCode={
                            {
                              tbName:'Sc_Clients',
                              codeCol:'ClientCode'
                            }
                          }
                        pk={'ClientID'}
                        spTrx={'api_Sc_Clients_Trx'}
                        spIns={'api_Sc_Clients_Ins'}
                        spUpd={'api_Sc_Clients_Upd'}
                        spDel={'api_Sc_Clients_Del'}
                        TrxParam={[
                            {name: "CompanyID", value: company}
                        ]}
                        DelParam={[
                            { name: 'LocationID', value: DepartmentID },
                            { name: "CompanyID", value: company },
                            { rowData: true, name: 'ClientID', value: 'ClientID' }
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

export default Clients;
