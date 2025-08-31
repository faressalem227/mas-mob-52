import { StyleSheet, View, Dimensions } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
// import { colors, roles } from "../../../constants";
import icons from "../../../constants";
import { useGlobalContext } from "../../../context/GlobalProvider";
import MainGrid from "../../../components/grid/MainGrid";
import { useDropDown } from "../../../hooks/useDropDownData";
import { MainLayout } from "../../../components";
import MainDataLang from "../../../constants/Lang/Invintory/MainDataLang";
const UnitDefinition = ({ title, hasLeftComponent = false, onDrawerPress }) => {
    const screenHeight = Dimensions.get("window").height;
    const { DepartmentID,Lang} = useGlobalContext();
    const { data: supplierData, loading: supplierDataLoader } = useDropDown(
		"Sc_Suppliers_Types_List",
		{LocationID: DepartmentID},
		"SupplierTypeID",
		"SupplierTypeName"
	);

    console.log(supplierData, 'supplierData');
    
    return (

    <View style={styles.container}>
            <MainLayout title={MainDataLang.SupplierData[Lang]}>
                <View style={[styles.assetsGrid, { height: screenHeight }]}>
                    <MainGrid
                        const tableHead={[
                            {
                                key: "SupplierID",
                                label:MainDataLang.Code[Lang],
                                type: "number",
                                input: "false",
                                visible: "false",
                            },
                            {
                                key: "SupplierCode",
                                label:MainDataLang.Code[Lang],
                                type: "number",
                                input: "true",
                                visible: "true",
                                width: 150
                            },
                            {
                                key: "SupplierName",
                                label: MainDataLang.SupplierName[Lang],
                                input: "true",
                                visible: "true",
                                width: 150

                            }, {
                                key: "SupplierTypeID",
                                label: MainDataLang.SupplierType[Lang],
                                type:"dropdown",
                                options:supplierData,
                                input: "true",
                                visible: "false",
                                width: 100
                            },
                            {
                                key: "SupplierTypeName",
                                label: MainDataLang.SupplierType[Lang],
                                input: "false",
                                visible: "true",
                                width: 130
                            },
                            {
                                key: "ContactPerson",
                                label: MainDataLang.ContactPerson[Lang],
                                input: "true",
                                visible: "true",
                                width: 150
                            },
                            {
                                key: "ContactInformation",
                                label: MainDataLang.ContactData[Lang],
                                input: "true",
                                visible: "true",
                                width: 150
                            },
                            {
                                key: "Country",
                                label: MainDataLang.State[Lang],
                                input: "true",
                                visible: "true",
                                width: 100
                            },
                            {
                                key: "City",
                                label: MainDataLang.City[Lang],
                                input: "true",
                                visible: "true",
                                width: 100
                            },
                            {
                                key: "Address",
                                label: MainDataLang.Address[Lang],
                                input: "true",
                                visible: "true",
                                width: 100
                            },{
                                key: "PhoneNumber",
                                label: MainDataLang.Telephone[Lang],
                                input: "true",
                                visible: "true",
                                width: 100
                            },
                            {
                                key: "FaxNumber",
                                label: MainDataLang.Fax[Lang],
                                input: "true",
                                visible: "true",
                                width:100
                            },
                            {
                                key: "email",
                                label: MainDataLang.Email[Lang],
                                input: "true",
                                visible: "true",
                                width: 100
                            },
                            {
                                key: "Services",
                                label: MainDataLang.Services[Lang],
                                input: "true",
                                visible: "true",
                                width: 100
                            },
                        ]}
                        dynamicCode={
                            {
                              tbName:'Sc_Suppliers',
                              codeCol:'SupplierCode'
                            }
                          }
                          StaticWidth={true}
                        pk={'SupplierID'}
                        spTrx={'api_Sc_Suppliers_Trx'}
                        spIns={'api_Sc_Suppliers_Ins'}
                        spUpd={'api_Sc_Suppliers_Upd'}
                        spDel={'api_Sc_Suppliers_Del'}
                        TrxParam={[
                            {name: "CompanyID", value: 1}
                        ]}
                        DelParam={[
                            { name: 'LocationID', value: DepartmentID },
                            { name: 'CompanyID', value: 1 },
                            { rowData: true, name: 'SupplierID', value: 'SupplierID' }
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

export default UnitDefinition;
