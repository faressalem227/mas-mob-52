import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import { MainLayout, MainButton } from "../../../../components";
import { useRouter, useLocalSearchParams } from "expo-router";
import MainGrid from "../../../../components/grid/MainGrid";
import { useGlobalContext } from "../../../../context/GlobalProvider";
import AssetHomeLang from "../../../../constants/Lang/AssetManagment/AssetHomeLang";
import InfoDetailes from "../../../../components/UI/InfoDetailes";
const AssetFailureProbabilityDetails = ({ route }) => {
  const { DepartmentID,Lang, company,Rtl} = useGlobalContext();
  const router = useRouter();
  const screenHeight = Dimensions.get("window").height; // Get screen height dynamically
  const {
    LikelihoodLevelTypeID,
    Category,
    NormWt,
    QuestionToAsk,
    ...restParams
  } = useLocalSearchParams();
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
  const detailsData = [
    { label: AssetHomeLang.Group[Lang], value: Category },
    { label: AssetHomeLang.Weight[Lang], value: NormWt },
    { label: AssetHomeLang.Question[Lang], value: QuestionToAsk },
  ];
  return (
    <MainLayout title={AssetHomeLang.AssetFailureProbabilityDetailes[Lang]} className="">
      <View className="bg-white h-[100vh] flex flex-col">
      <InfoDetailes
  details={detailsData}
  valueWidthClass="w-[60%]" 
/>
        <View style={[styles.assetsGrid, { height: screenHeight }]}>
          <MainGrid
            tableHead={[
              {
                key: "AnswerID",
                label: AssetHomeLang.Code[Lang],
                type: "number",
                input: "false",
                visible: "false",
              },
              {
                key: "Answer",
                label: AssetHomeLang.Answer[Lang],
                type: " ",
                input: "true",
                visible: "true",
                width: 250,
              },
              {
                key: "AnswerValue",
                label: AssetHomeLang.Value[Lang],
                type: "number",
                input: "true",
                visible: "true",
                width: 100,
              },
              {
                key: "ValueDesc",
                label: AssetHomeLang.Description[Lang],
                type: "",
                input: "true",
                visible: "true",
                width: 250,
              },
            ]}
            pk={"AnswerID"}
            spTrx={"api_am_Likelihood_Answers_Trx"}
            spIns={"api_am_Likelihood_Answers_Ins"}
            spUpd={"api_am_Likelihood_Answers_Upd"}
            spDel={"api_am_Likelihood_Answers_Del"}
            TrxParam={[
              { name: "LikelihoodLevelTypeID", value: LikelihoodLevelTypeID },
              {name:"CompanyID", value:company}
            ]}
            DelParam={[
              {
                rowData: true,
                name: "AnswerID",
                value: "AnswerID",
              },
              { name: "LocationID", value: DepartmentID },
            ]}
            UpdBody={{ LocationID: DepartmentID }}
            InsBody={{ LocationID: DepartmentID ,LikelihoodLevelTypeID:LikelihoodLevelTypeID}}
            TrxDependency={[LikelihoodLevelTypeID]}
            mixedWidth={true}
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

export default AssetFailureProbabilityDetails;
