import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import { MainLayout, MainButton,Dropdown } from "../../../components";
import { useRouter, useLocalSearchParams } from "expo-router";
import TechnicalAssetGrid from "../../../components/grid/TechnicalAssetGrid";
import MainGrid from "../../../components/grid/MainGrid";
import { useDropDown } from "../../../hooks/useDropDownData";
import AssetHomeLang from "../../../constants/Lang/AssetManagment/AssetHomeLang";
import { useGlobalContext } from "../../../context/GlobalProvider";
import WorkOrdersLang from '../../../constants/Lang/Maintenance/WorkOrders/WorkOrdersLang'; // Import the language file
import ReportBugsLang from '../../../constants/Lang/Maintenance/ReportBugs';
const TechnicalAssets = ({ route }) => {
    const router = useRouter();
    const {
        AssetID,
        SubLocationID,
        LocationID,
        AssetCode,
        AssetName,
        AssetClassName,
        AssetStatusName,
        ...restParams
    } = useLocalSearchParams();
      const [YearID, setYearID] = useState(null);
    const { data: YearList, loading: YearLoader } = useDropDown(
        'api_ms_Years_List',
        { DepartmentID: DepartmentID },
        'YearID',
        'YearName'
      );
 const {Lang, company,Rtl,DepartmentID}=useGlobalContext();

    const { data: SupplierList, loading: SupplierLoader } =
        useDropDown(
            "Sc_Suppliers_List",
            { CompanyID: company, LangID: Lang },
            "SupplierID",
            "SupplierName"
        );
         const { data: ContractorList, loading: ContractorLoader } =
        useDropDown(
            "Sc_Contractor_List",
            { CompanyID: company, LangID: Lang },
            "ContractorID",
            "ContractorName"
        );

    const [windowWidth, setWindowWidth] = useState(
        Dimensions.get("window").width
    );
    const [width, setWidth] = useState();
    useEffect(() => {
        if (windowWidth < 800) {
            setWidth("w-48"); // Set width to 250 px
        } else {
            setWidth("w-[80%]"); // Set width to 80%
        }
    }, [windowWidth]);

    //console.log("windowWidth", windowWidth);
    //console.log("computed width", width);
    return (
        <MainLayout
            title="بيانات الضمان"
            className=""
            loading={ SupplierLoader || ContractorLoader}>
            <View className=" flex-1 flex flex-col">
            <View className={`flex flex-col ${Rtl ? "rtl" : "ltr"} bg-[#F6F6F6] rounded-sm p-4 m-4`}>
            <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
            <Text className="w-[109px] text-base font-tmedium">{AssetHomeLang.AssetCode[Lang]}</Text>
                        <Text className={`${width} text-basefont-tmedium`}>
                            {AssetCode}
                        </Text>
                    </View>
                    <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
                        <Text className="w-[109px] text-base font-tmedium">{AssetHomeLang.AssetName[Lang]}</Text>
                        <Text className={`${width} text-basefont-tmedium`}>
                            {AssetName}
                        </Text>
                    </View>
                    <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
                        <Text className="w-[109px] text-base font-tmedium"> {AssetHomeLang.Classification[Lang]}</Text>
                        <Text className={`${width} text-basefont-tmedium`}>
                            {AssetClassName}
                        </Text>
                    </View>
                </View>
                <View style={styles.dropdownContainer}>
              <Dropdown
                placeholder={ReportBugsLang.YearChoose[Lang]}
                label={ReportBugsLang.Year[Lang]}
                data={YearList}
                initailOption={YearList[5]?.key}
                onChange={(e) => {
                  setYearID(e);
                }}
              />
        </View>
                
                <MainGrid
                
                    tableHead={[
                        {
                            key: "ContractorID",
                            label: "المقاول",
                            type: "dropdown",
                            options: ContractorList,
                            input: "true",
                            visible: "false",
                        },
                        {
                            key: "SupplierID",
                            label: "المورد",
                            type: "dropdown",
                            options: SupplierList,
                            input: "true",
                            visible: "false",
                        },
                        {
                            key: "WarrantyProvider",
                            label: "شركه الضمان",
                            type: "text",
                            input: "true",
                            visible: "true",
                        },
                        {
                            key: "WarrantyContact",
                            label: "مسؤول الضمان",
                            type: "text",
                            input: "true",
                            visible: "true",
                        },
                        {
                            key: "WarrantyStartDate",
                            label: "تاريخ بدايه الضمان",
                            type: "date",
                            input: "true",
                            visible: "true",
                        },
                        {
                            key: "WarrantyEndDate",
                            label: "تاريخ نهايه الضمان",
                            type: "date",
                            input: "true",
                            visible: "true",
                        },
                        {
                            key: "SupplierName",
                            label: "المورد",
                            input: "false",
                            visible: "true",
                        },
                        {
                            key: "ContractorName",
                            label: "المقاول",
                            input: "false",
                            visible: "true",
                        },
                    ]}
                   // pk={"AssetAttributesID"}
                    spTrx={"api_ms_Assets_Warranty_Trx"}
                    spIns={"api_ms_Assets_Warranty_Upd"}
                    spUpd={"api_ms_Assets_Warranty_Upd"}
                    //spDel={"api_ms_AssetAttributes_Del"}
                    TrxParam={[{ name: "AssetID", value: AssetID }, {name:"DepartmentID", value:DepartmentID}]}
                    UpdParam={[{ name: "AssetID", value: AssetID }]}
                    // DelParam={[
                    //     {
                    //         rowData: true,
                    //         name: "AssetAttributeID",
                    //         value: "AssetAttributesID",
                    //     },
                    // ]}
                    InsBody={{ AssetID: AssetID }}
                />
            </View>
        </MainLayout>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dropdownContainer: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  assetsGrid: {
    marginVertical: 8,
  },
});

export default TechnicalAssets;
