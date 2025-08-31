import { StyleSheet, View, Dimensions } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
// import { colors, roles } from "../../../constants";
import icons from "../../../constants";
import { useGlobalContext } from "../../../context/GlobalProvider";
import MainGrid from "../../../components/grid/MainGrid";
import { MainLayout } from "../../../components";
import InvintorySystemSettingLang from "../../../constants/Lang/Invintory/InvintorySystemSettingLang"
const ImageSizeDefinition = ({ title, hasLeftComponent = false, onDrawerPress }) => {
    const screenHeight = Dimensions.get("window").height;
    const { DepartmentID,Lang, compnay} = useGlobalContext();
    return (

    <View style={styles.container}>
            <MainLayout title={InvintorySystemSettingLang.DefinationOfItemImageSize[Lang]}>
                <View style={[styles.assetsGrid, { height: screenHeight }]}>
                    <MainGrid
                        const tableHead={[
                            {
                                key: "ImageSizeID",
                                label:InvintorySystemSettingLang.Code[Lang],
                                type: "number",
                                input: "false",
                                visible: "false",
                                width: 80
                            },
                            {
                                key: "ImageSizeCode",
                                label:InvintorySystemSettingLang.Code[Lang],
                                type: "number",
                                input: "true",
                                visible: "true",
                                width: 80
                            }, {
                                key: "ImageSizeName",
                                label: InvintorySystemSettingLang.Name[Lang],
                                input: "true",
                                visible: "true",

                            },
                        ]}
                        dynamicCode={
                            {
                              tbName:'Sc_item_image_size',
                              codeCol:'ImageSizeCode'
                            }
                          }
                        mixedWidth={true}
                        pk={'ImageSizeID'}
                        spTrx={'api_Sc_item_image_size_List'}
                        spIns={'api_Sc_item_image_size_Ins'}
                        spUpd={'api_Sc_item_image_size_Upd'}
                        spDel={'api_Sc_item_image_size_Del'}
                        TrxParam={[
                            { name: 'LocationID', value: DepartmentID },
                        ]}
                        DelParam={[
                            { name: 'LocationID', value: DepartmentID },
                            { rowData: true, name: 'ImageSizeID', value: 'ImageSizeID' }
                        ]}
                        UpdBody={{ LocationID: DepartmentID , CompanyID:1}}
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

export default ImageSizeDefinition;
