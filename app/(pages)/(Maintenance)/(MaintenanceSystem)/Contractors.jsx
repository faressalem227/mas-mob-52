import React, { useState, useCallback, useEffect } from "react";
import { View, Dimensions, Text, StyleSheet } from "react-native";
import { useGlobalContext } from "../../../../context/GlobalProvider";
import ContractorsGrid from "../../../../components/grid/ContractorsGrid";
import MainLayout from "../../../../components/layout/MainLayout";
import { useLocalSearchParams } from "expo-router";
import {
  HandleDropdownFormat,
  useDropDown,
} from "../../../../hooks/useDropDownData";
import MainGrid from "../../../../components/grid/MainGrid";
import ContractorsLang from "../../../../constants/Lang/Maintenance/MaintenanceSystem/Contractors";
const Contractors = () => {
  const { user, DepartmentID, Lang, company } = useGlobalContext();
  const [SubLocationID, setSubLocationID] = useState(null);
  const [SubLocationData, setSubLocationData] = useState([]);
  const [loading, setLoading] = useState(false); // Ensure loading state is defined
  const screenHeight = Dimensions.get("window").height; // Get screen height dynamically
  const { data: ContractorsList, loading: ContractorsListLoader } = useDropDown(
    "api_ms_Contractors_Types_List",
    { LocationID: DepartmentID, CompanyID: company },
    "ContractorTypeID",
    "ContractorTypeName"
  );
  return (
    <MainLayout title={ContractorsLang.pageTitle[Lang]} className="">
      <View className="bg-white py-4 h-[100vh] flex flex-col">
        <View style={[styles.ContractorsGrid, { height: screenHeight }]}>
          <MainGrid
            tableHead={[
              {
                key: "ContractorID",
                label: "المقاول",
                type: "number",
                input: "false",
                visible: "false",
              },
              {
                key: "ContractorCode",
                label: `${ContractorsLang.ContractorCode[Lang]}`,
                input: "true",
                visible: "true",
                width: 120,
              },
              {
                key: "ContractorName",
                label: `${ContractorsLang.ContractorName[Lang]}`,
                input: "true",
                visible: "true",
              },
              {
                key: "ContractorTypeID",
                label: `${ContractorsLang.ContractorTypeID[Lang]}`,
                type: "dropdown",
                options: ContractorsList,
                input: "true",
                visible: "false",
              },
              {
                key: "ContactPerson",
                label: `${ContractorsLang.ContactPerson[Lang]}`,
                input: "true",
                visible: "false",
              },
              {
                key: "ContactInformation",
                label: `${ContractorsLang.ContactInformation[Lang]}`,
                type: "",
                input: "true",
                visible: "false",
              },
              {
                key: "Country",
                label: `${ContractorsLang.Country[Lang]}`,
                type: "",
                input: "true",
                visible: "false",
              },
              {
                key: "City",
                label: `${ContractorsLang.City[Lang]}`,
                type: "",
                input: "true",
                visible: "false",
              },
              {
                key: "Address",
                label: `${ContractorsLang.Address[Lang]}`,
                type: "",
                input: "true",
                visible: "false",
              },
              {
                key: "PhoneNumber",
                label: `${ContractorsLang.PhoneNumber[Lang]}`,
                type: "number",
                input: "true",
                visible: "false",
              },
              {
                key: "FaxNumber",
                label: `${ContractorsLang.FaxNumber[Lang]}`,
                type: "number",
                input: "true",
                visible: "false",
              },
              {
                key: "email",
                label: `${ContractorsLang.email[Lang]}`,
                type: "",
                input: "true",
                visible: "false",
              },
              {
                key: "Services",
                label: `${ContractorsLang.Services[Lang]}`,
                type: "text",
                input: "true",
                visible: "false",
              },
              {
                key: "CentralDataID",
                label: " ",
                type: "number",
                input: "false",
                visible: "false",
              },
              {
                key: "Sync_Time",
                label: " ",
                type: "date",
                input: "false",
                visible: "false",
              },
              {
                key: "Sync_guid",
                label: " ",
                type: "date",
                input: "false",
                visible: "false",
              },
            ]}
            mixedWidth={true}
            pk={"ContractorID"}
            spTrx={"api_ms_Contractors_Trx"}
            spIns={"api_ms_Contractors_Ins"}
            spUpd={"api_ms_Contractors_Upd"}
            spDel={"api_ms_Contractors_Del"}
            dynamicCode={{
              tbName: "ms_Contractors",
              codeCol: "ContractorCode",
            }}
            TrxParam={[
              { name: "LocationID", value: DepartmentID },
              { name: "CompanyID", value: company },
              { name: "LangID", value: Lang },
              { name: "UserName", value: user },
            ]}
            DelParam={[
              { rowData: true, name: "ContractorID", value: "ContractorID" },
              { name: "LocationID", value: DepartmentID },
            ]}
            UpdBody={{ LocationID: DepartmentID, CompanyID: company }}
            InsBody={{
              LocationID: DepartmentID,
              CompanyID: company,
              LangID: Lang,
              UserName: user,
            }}
            TrxDependency={[DepartmentID]}
            routeTo={{
              path: "/ContractorsDetails",
              hasParams: true,
              params: {
                LocationID: DepartmentID,
                rowData: true,
              },
            }}
          />
        </View>
        {/* <ContractorsGrid LocationID={DepartmentID} /> */}
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
    marginVertical: 24,
  },
  ContractorsGrid: {
    marginVertical: 8,
  },
});

export default Contractors;
