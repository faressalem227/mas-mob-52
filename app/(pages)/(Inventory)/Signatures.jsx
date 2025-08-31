import { StyleSheet, View, Dimensions } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
// import { colors, roles } from "../../../constants";
import icons from "../../../constants";
import { useGlobalContext } from "../../../context/GlobalProvider";
import MainGrid from "../../../components/grid/MainGrid";
import { MainLayout } from "../../../components";
import InvintorySystemSettingLang from "../../../constants/Lang/Invintory/InvintorySystemSettingLang";
const Signatures = ({ title, hasLeftComponent = false, onDrawerPress }) => {
    const screenHeight = Dimensions.get("window").height;
    const { ProcessID } = useLocalSearchParams();
    const {Lang}=useGlobalContext();
    return (

    <View style={styles.container}>
            <MainLayout title={InvintorySystemSettingLang.Signatures[Lang]}>
                <View style={[styles.assetsGrid, { height: screenHeight }]}>
                    <MainGrid
                        const tableHead={[
                            {
                                key: "SignatureID",
                                label:InvintorySystemSettingLang.Code[Lang],
                                type: "number",
                                input: "false",
                                visible: "false",
                            },
                            {
                                key: "SignatureCode",
                                label: InvintorySystemSettingLang.Code[Lang],
                                type: "number",
                                input: "true",
                                visible: "true",
                                width: 50
                            }, {
                                key: "FirstSignature",
                                label:InvintorySystemSettingLang.FirstSignature[Lang],
                                input: "true",
                                visible: "true",

                            },
                            {
                                key: "SecondSignature",
                                label: InvintorySystemSettingLang.SecondSignature[Lang],
                                input: "true",
                                visible: "true",

                            },
                        ]}
                        dynamicCode={
                            {
                              tbName:'sc_process_signature',
                              codeCol:'SignatureCode'
                            }
                          }
                        mixedWidth={true}
                        pk={'SignatureID'}
                        spTrx={'api_sc_process_signature_trx'}
                        spIns={'api_sc_process_signature_Ins'}
                        spUpd={'api_sc_process_signature_Upd'}
                        spDel={'api_sc_process_signature_Del'}
                        TrxParam={[
                            {name: "ProcessID", value: ProcessID}
                        ]}
                        
                        DelParam={[
                            // {name: "ProcessID", value: ProcessID},
                            { rowData: true, name: 'SignatureID', value: 'SignatureID' }
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

export default Signatures;
