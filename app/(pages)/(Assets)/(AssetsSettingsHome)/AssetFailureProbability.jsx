import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import { MainLayout, MainButton } from "../../../../components";
import { useRouter, useLocalSearchParams } from "expo-router";
import MainGrid from "../../../../components/grid/MainGrid";
import { useGlobalContext } from "../../../../context/GlobalProvider";
import AssetHomeLang from "../../../../constants/Lang/AssetManagment/AssetHomeLang";
const AssetFailureProbability = ({ route }) => {
  const { DepartmentID,Lang, company } = useGlobalContext();
  const router = useRouter();
  const screenHeight = Dimensions.get("window").height; // Get screen height dynamically

  return (
    <MainLayout title={AssetHomeLang.AssetFailureProbability[Lang]} className="">
      <View className="bg-white h-[100vh] flex flex-col">
        <View style={[styles.assetsGrid, { height: screenHeight }]}>
          <MainGrid
            tableHead={[
              {
                key: "LikelihoodLevelTypeID",
                label: AssetHomeLang.Code[Lang],
                type: "number",
                input: "false",
                visible: "false",
                width:50
              },
              {
                key: "Category",
                label: AssetHomeLang.Group[Lang],
                type: " ",
                input: "true",
                visible: "true",
                width: 200,
              },
              {
                key: "NormWt",
                label: AssetHomeLang.Weight[Lang],
				        type:"number",
                input: "true",
                visible: "true",
                width: 100,
              },
              {
                key: "QuestionToAsk",
                label: AssetHomeLang.Question[Lang],
                type: "",
                input: "true",
                visible: "true",
                width: 250,
              },
            ]}
            StaticWidth
            pk={"LikelihoodLevelTypeID"}
            spTrx={"api_am_Likelihood_LevelType_Trx"}
            spIns={"api_am_Likelihood_LevelType_Ins"}
            spUpd={"api_am_Likelihood_LevelType_Upd"}
            spDel={"api_am_Likelihood_LevelType_Del"}
            TrxParam={[{ name: "LocationID", value: DepartmentID }, {name:"CompanyID", value: company}]}
            DelParam={[
              {
                rowData: true,
                name: "LikelihoodLevelTypeID",
                value: "LikelihoodLevelTypeID",
              },
              { name: "LocationID", value: DepartmentID },
            ]}
            UpdBody={{ LocationID: DepartmentID }}
            InsBody={{ LocationID: DepartmentID }}
            TrxDependency={[]}
			routeTo={{
				path: "/AssetFailureProbabilityDetails",
				hasParams: true,
				params: {},
			}}
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

export default AssetFailureProbability;
