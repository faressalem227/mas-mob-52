import { StyleSheet, View, Dimensions } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useDropDown } from "../../../hooks/useDropDownData";
import { useGlobalContext } from "../../../context/GlobalProvider";
import MainGrid from "../../../components/grid/MainGrid";
import { MainLayout } from "../../../components";
import InvintorySystemSettingLang from "../../../constants/Lang/Invintory/InvintorySystemSettingLang";
const Options = ({ title, hasLeftComponent = false, onDrawerPress }) => {
    const screenHeight = Dimensions.get("window").height;
    const { ProcessID } = useLocalSearchParams();
    const {Lang}=useGlobalContext();
    const { data: options, loading: optionsLoader } = useDropDown(
            "api_sc_process_optoin_List",
            { LangID:1},
            "value",
            "label"
        );
    return (

    <View style={styles.container}>
            <MainLayout title={InvintorySystemSettingLang.Choices[Lang]}>
                <View style={[styles.assetsGrid, { height: screenHeight }]}>
                    <MainGrid
                        const tableHead={[
                            {
                                key: "ProcessOptionID",
                                label: InvintorySystemSettingLang.Code[Lang],
                                type: "number",
                                input: "true",
                                visible: "true",
                                width: 50
                            }, {
                                key: "OptionID",
                                label: InvintorySystemSettingLang.Choice[Lang],
                                type:"dropdown",
                                options:options,
                                input: "true",
                                visible: "false",
                            },
                            {
                                key: "OptionNameAr",
                                label: InvintorySystemSettingLang.Choice[Lang],
                                input: "false",
                                visible: "true",
                            },
                        ]}
                        dynamicCode={
                            {
                              tbName:'sc_process_options',
                              codeCol:'ProcessOptionID'
                            }
                          }
                        mixedWidth={true}
                        pk={'ProcessOptionID'}
                        spTrx={'api_sc_process_options_trx'}
                        spIns={'api_sc_process_options_ins'}
                        spUpd={'api_sc_process_options_Upd'}
                        spDel={'api_sc_process_options_Del'}
                        TrxParam={[
                            {name: "ProcessID", value: ProcessID}
                        ]}
                        DelParam={[
                            { name: 'ProcessID', value: ProcessID},
                            { rowData: true, name: 'ProcessOptionID', value: 'ProcessOptionID' }
                        ]}
                        UpdBody={{ ProcessID:ProcessID }}
                        InsBody={{ ProcessID:ProcessID}}
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

export default Options;
