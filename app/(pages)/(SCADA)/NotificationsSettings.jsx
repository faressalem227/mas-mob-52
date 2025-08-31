import { StyleSheet, View, Dimensions } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
// import { colors, roles } from "../../../constants";
import icons from "../../../constants";
import { useGlobalContext } from "../../../context/GlobalProvider";
import MainGrid from "../../../components/grid/MainGrid";
import { MainLayout } from "../../../components";
import {useDropDown } from "../../../hooks/useDropDownData";
import {MainButton} from "../../../components";
import SCADALang from "../../../constants/Lang/SCADA/SCADALang";
const NotificationsSettings = ({ title, hasLeftComponent = false, onDrawerPress }) => {
    const screenHeight = Dimensions.get("window").height;
    const { ItemID } = useLocalSearchParams();
    const { Lang } = useGlobalContext();
    return (

        <View >
            <MainLayout title={SCADALang.NotificationSettings[Lang]}>
                <View style={[styles.assetsGrid, { height: screenHeight }]}>
                    <MainGrid
                        const tableHead={[
                            {
                                key: "",
                                label: SCADALang.AlertType[Lang],
                                input: "true",
                                visible: "true",
                                with:100
                            },
                            {
                                key: "",
                                label: SCADALang.SeniorManager[Lang],
                                type: "checkbox",
                                input: "true",
                                visible: "true",
                                width:150
                            }, 
                            {
                                key: "",
                                label: SCADALang.Manager[Lang],
                                type: "checkbox",
                                input: "true",
                                visible: "true",
                                width:100
                            }, 
                            {
                                key: "",
                                label: SCADALang.Enginner[Lang],
                                type: "checkbox",
                                input: "true",
                                visible: "true",
                                width:100
                            }, 
                            {
                                key: "",
                                label:SCADALang.Operator[Lang],
                                type: "checkbox",
                                input: "true",
                                visible: "true",
                                width:100
                            }, 
                            {
                                key: "",
                                label:SCADALang.Store[Lang],
                                type: "checkbox",
                                input: "true",
                                visible: "true",
                                width:100
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
                        ]}
                        DelParam={[
                            { name: 'ItemID', value: ItemID},
                            // { rowData: true, name: 'JobID', value: 'JobID' }
                        ]}
                        UpdBody={{ ItemID: ItemID }}
                        InsBody={{ ItemID: ItemID,CompanyID:'1' }}
                        TrxDependency={[]}
                    />
                </View>
                <View className="mb-6">
            <MainButton
              title={"حفظ"}
            //   icon={}
            //   iconStyles={"w-8 h-8"}
            //   textStyles={"w-52"}
              handlePress={() => {
                router.navigate({
                  pathname: "SCADA_Alerts",
                  params: {
                    DepartmentID: DepartmentID,
                  },
                });
              }}
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

export default NotificationsSettings;
