//api_admin_Reports_Basic__Trx LangID, UserName, GroupID 66

import { StyleSheet, View, Dimensions } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
// import { colors, roles } from "../../../constants";
import icons from "../../../constants";
import { useGlobalContext } from "../../../context/GlobalProvider";
import MainGrid from "../../../components/grid/MainGrid";
import { MainLayout } from "../../../components";
import InventoryReportsText from "../../../constants/Lang/Invintory/InventoryReports"
import { User } from "lucide-react-native";
const InventoryReports = ({ title, hasLeftComponent = false, onDrawerPress }) => {
    const screenHeight = Dimensions.get("window").height;
    const { DepartmentID,Lang, user,company} = useGlobalContext();
    return (

    <View style={styles.container}>
            <MainLayout title={InventoryReportsText.title[Lang]}>
                <View style={[styles.assetsGrid, { height: screenHeight }]}>
                <MainGrid
                        const tableHead={[
                            {
                                key: "ReportID",
                                label: InventoryReportsText.ReportGrid.ReportNo[Lang],
                                type: "number",
                                input: "false",
                                visible: "false",
                            },
                            {
                                key: "ReportNo",
                                label: InventoryReportsText.ReportGrid.ReportNo[Lang],
                                type: "number",
                                input: "true",
                                visible: "true",
                                width: 100
                            }, {
                                key: "ReportTitle",
                                label: InventoryReportsText.ReportGrid.ReportTitle[Lang],
                                input: "true",
                                visible: "true",

                            },
                        ]}
                        dynamicCode={
                            {
                              tbName:'Sc_item_unit',
                              codeCol:'UnitCode'
                            }
                          }
                        reports={"InventoryReports"}
                        mixedWidth={true}
                        pk={'ReportID'}
                        hasCrud={false}
                        spTrx={'api_admin_Reports_Basic__Trx'}
                        TrxParam={[
                            {name: "CompanyID", value: company},
                            {name:"GroupID", value:66},
                            {name:"LangID", value:Lang},
                            {name:"UserName", value: user.username}
                        ]}
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

export default InventoryReports;
