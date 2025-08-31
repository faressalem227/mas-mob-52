import { StyleSheet, View, Dimensions } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
// import { colors, roles } from "../../../constants";
import icons from "../../../constants";
import { useGlobalContext } from "../../../context/GlobalProvider";
import MainGrid from "../../../components/grid/MainGrid";
import { MainLayout } from "../../../components";
import MainDataLang from "../../../constants/Lang/Invintory/MainDataLang";
const Projects = ({ title, hasLeftComponent = false, onDrawerPress }) => {
    const screenHeight = Dimensions.get("window").height;
    const { DepartmentID,Lang} = useGlobalContext();
    return (

    <View style={styles.container}>
            <MainLayout title={MainDataLang.Projects[Lang]}>
                <View style={[styles.assetsGrid, { height: screenHeight }]}>
                    <MainGrid
                        const tableHead={[
                            {
                                key: "ProjectID",
                                label: MainDataLang.Code[Lang],
                                type: "number",
                                input: "false",
                                visible: "false",
                                width: 50
                            },
                            {
                                key: "ProjectCode",
                                label: MainDataLang.Code[Lang],
                                type: "number",
                                input: "true",
                                visible: "true",
                                width: 50
                            },
                            {
                                key: "ProjectName",
                                label: MainDataLang.ProjectName[Lang],
                                input: "true",
                                visible: "true",
                                width: 100

                            }, {
                                key: "IsActive",
                                label: MainDataLang.Active[Lang],
                                type:"checkbox",
                                input: "true",
                                visible: "true",
                            },
                        ]}
                        dynamicCode={
                            {
                              tbName:'Sc_Projects',
                              codeCol:'ProjectCode'
                            }
                          }
                          StaticWidth={true}
                        pk={'ProjectID'}
                        spTrx={'api_Sc_Projects_Trx'}
                        spIns={'api_Sc_Projects_Ins'}
                        spUpd={'api_Sc_Projects_Upd'}
                        spDel={'api_Sc_Projects_Del'}
                        TrxParam={[
                            {name: "LocationID", value: DepartmentID}
                        ]}
                        DelParam={[
                            { name: 'LocationID', value: DepartmentID },
                            // { name: 'CompanyID', value: 1 },
                            { rowData: true, name: 'ProjectID', value: 'ProjectID' }
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

export default Projects;
