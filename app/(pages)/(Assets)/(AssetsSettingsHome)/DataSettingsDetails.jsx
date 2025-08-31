import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { MainLayout, MainButton } from "../../../../components";
import { useRouter, useLocalSearchParams } from "expo-router";
import MainGrid from "../../../../components/grid/MainGrid";
import { useGlobalContext } from "../../../../context/GlobalProvider";
import DataSettingsDetailsLang from "../../../../constants/Lang/AssetManagment/DataSettingsDetailsLang"; // Import the language file
import InfoDetailes from "../../../../components/UI/InfoDetailes";
const DataSettingsDetails = ({ route }) => {
  const { DepartmentID, company, Lang,Rtl } = useGlobalContext(); // Get the current language from context
  const router = useRouter();
  const screenHeight = Dimensions.get("window").height; // Get screen height dynamically
  const { AdditionID, AdditionNo, AdditionName, DataTypeName, ...restParams } =
    useLocalSearchParams();
  const [windowWidth, setWindowWidth] = useState(Dimensions.get("window").width);
  const [width, setWidth] = useState();

  useEffect(() => {
    if (windowWidth < 800) {
      setWidth("w-48"); // Set width to 250 px
    } else {
      setWidth("w-[80%]"); // Set width to 80%
    }
  }, [windowWidth]);
  const detailsData = [
    { label: DataSettingsDetailsLang.Code[Lang], value: AdditionNo },
    { label: DataSettingsDetailsLang.AdditionName[Lang], value: AdditionName },
    { label: DataSettingsDetailsLang.DataTypeName[Lang], value: DataTypeName },
  ];
  return (
    <MainLayout title={DataSettingsDetailsLang.PageTitle[Lang]} className="">
      <View className="bg-white flex-1 flex flex-col">
  <InfoDetailes  details={detailsData}  valueWidthClass="w-[60%]" />
        <View style={[styles.assetsGrid, { height: screenHeight }]}>
          <MainGrid
            tableHead={[
              {
                key: "SelectID",
                label: DataSettingsDetailsLang.Code[Lang],
                type: "number",
                input: "false",
                visible: "false",
              },
              {
                key: "SelectNo",
                label: DataSettingsDetailsLang.Code[Lang],
                type: "number",
                input: "true",
                visible: "true",
                width: 80,
              },
              {
                key: "SelectName",
                label: DataSettingsDetailsLang.Selection[Lang],
                type: " ",
                input: "true",
                visible: "true",
                width: 250,
              },
            ]}
            mixedWidth
            pk={"SelectID"}
            spTrx={"api_sys_addition_Select__Trx"}
            spIns={"api_sys_addition_Select__Ins"}
            spUpd={"api_sys_addition_Select__Upd"}
            spDel={"api_sys_addition_Select__Del"}
            dynamicCode={{
              tbName: "sys_addition_Select",
              codeCol: "SelectNo",
            }}
            TrxParam={[
              { name: "AdditionID", value: AdditionID },
              { name: "CompanyID", value: company },
            ]}
            DelParam={[
              {
                rowData: true,
                name: "SelectID",
                value: "SelectID",
              },
              { name: "LocationID", value: DepartmentID },
            ]}
            UpdBody={{ LocationID: DepartmentID }}
            InsBody={{ LocationID: DepartmentID, AdditionID: AdditionID }}
            TrxDependency={[AdditionID]}
          />
        </View>
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
  assetsGrid: {
    marginVertical: 16,
  },
});

export default DataSettingsDetails;