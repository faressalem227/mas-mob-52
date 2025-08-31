import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import { MainLayout, MainButton } from "../../../../components";
import { useRouter, useLocalSearchParams } from "expo-router";
import MainGrid from "../../../../components/grid/MainGrid";
import { useGlobalContext } from "../../../../context/GlobalProvider";
import AssetHomeLang from "../../../../constants/Lang/AssetManagment/AssetHomeLang";
const TechnicalCondition = ({ route }) => {
  const { DepartmentID, Lang, company } = useGlobalContext();
  const router = useRouter();
  const screenHeight = Dimensions.get("window").height; // Get screen height dynamically

  return (
    <MainLayout title={AssetHomeLang.TechnicalCondition[Lang]} className="">
      <View className="bg-white h-[100vh] flex flex-col">
        <View style={[styles.assetsGrid, { height: screenHeight }]}>
          <MainGrid
            tableHead={[
              {
                key: "ConditionID",
                label: AssetHomeLang.Code[Lang],
                input: "false",
                visible: "false",
                width: 100,
              },
              {
                key: "ConditionNo",
                label: AssetHomeLang.Code[Lang],
                type: "number",
                input: "true",
                visible: "true",
                width: 80,
              },
              {
                key: "ConditionName",
                label: AssetHomeLang.Status[Lang],
                input: "true",
                visible: "true",
                width: 100,
              },
              {
                key: "ConditionDesc",
                label: AssetHomeLang.Description[Lang],
                type: "",
                input: "true",
                visible: "true",
                width: 200,
              },
              {
                key: "ValueFrom",
                label: AssetHomeLang.ValueFrom[Lang],
                type: "number",
                input: "true",
                visible: "true",
                width: 100,
              },
              {
                key: "ValueTo",
                label: AssetHomeLang.ValueTo[Lang],
                type: "number",
                input: "true",
                visible: "true",
                width: 100,
              },
            ]}
            mixedWidth
            pk={"ConditionID"}
            spTrx={"api_am_Condition_List"}
            spIns={"api_am_Condition_Ins"}
            spUpd={"api_am_Condition_Upd"}
            spDel={"api_am_Condition_Del"}
            dynamicCode={{
              tbName: "am_Condition",
              codeCol: "ConditionNo",
            }}
            TrxParam={[
              { name: "LocationID", value: DepartmentID },
              { name: "CompanyID", value: company },
            ]}
            DelParam={[
              { rowData: true, name: "ConditionID", value: "ConditionID" },
              { name: "LocationID", value: DepartmentID },
            ]}
            UpdBody={{ LocationID: DepartmentID }}
            InsBody={{ LocationID: DepartmentID }}
            TrxDependency={[]}
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

export default TechnicalCondition;
