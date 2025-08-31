import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import { MainLayout, MainButton } from "../../../components";
import { useRouter, useLocalSearchParams } from "expo-router";
import AssetOrdersGrid from "../../../components/grid/AssetOrdersGrid";
import MainGrid from "../../../components/grid/MainGrid";
import AssetHomeLang from "../../../constants/Lang/AssetManagment/AssetHomeLang";
import { useGlobalContext } from "../../../context/GlobalProvider";
import { useDropDown } from "../../../hooks/useDropDownData";

const AssetOrders = ({ route }) => {
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
  const router = useRouter();
  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get("window").width
  );
  const [width, setWidth] = useState();
  const { Lang, Rtl , company } = useGlobalContext();
  useEffect(() => {
    if (windowWidth < 800) {
      setWidth("w-48"); // Set width to 250 px
    } else {
      setWidth("w-[80%]"); // Set width to 80%
    }
  }, [windowWidth]);

  const { data: Eval, loading: AssetAttributeLoader } =
      useDropDown(
        "api_am_Evaluator_trx",
        { CompanyID: company },
        "EvaluatorID",
        "Eval_name"
      );

  // console.log("windowWidth", windowWidth);
  // console.log("computed width", width);
  return (
    <MainLayout title={AssetHomeLang.OperatinData[Lang]} className="">
      <View className="bg-white h-[100vh] flex flex-col">
        <View
          className={`flex flex-col ${
            Rtl ? "rtl" : "ltr"
          } bg-[#F6F6F6] rounded-sm p-4 m-4 mb-8`}
        >
          <View
            className={`flex flex-row ${
              Rtl ? "flex-row-reverse" : ""
            } justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}
          >
            <Text className="w-[109px] text-base font-tmedium">
              {" "}
              {AssetHomeLang.AssetCode[Lang]}
            </Text>
            <Text className={`${width} text-basefont-tmedium`}>
              {AssetCode}
            </Text>
          </View>
          <View
            className={`flex flex-row ${
              Rtl ? "flex-row-reverse" : ""
            } justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}
          >
            <Text className="w-[109px] text-base font-tmedium">
              {AssetHomeLang.AssetName[Lang]}
            </Text>
            <Text className={`${width} text-basefont-tmedium`}>
              {AssetName}
            </Text>
          </View>
          <View
            className={`flex flex-row ${
              Rtl ? "flex-row-reverse" : ""
            } justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}
          >
            <Text className="w-[109px] text-base font-tmedium">
              {" "}
              {AssetHomeLang.Classification[Lang]}
            </Text>
            <Text className={`${width} text-basefont-tmedium`}>
              {AssetClassName}
            </Text>
          </View>
          {/* <View
            className={`flex flex-row ${
              Rtl ? "flex-row-reverse" : ""
            } justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}
          >
            <Text className="w-[109px] text-base pt-1 font-tmedium">
              {AssetHomeLang.WorkOrderStatus[Lang]}
            </Text>
            <Text className={`${width} text-basefont-tmedium`}>
              {AssetStatusName}
            </Text>
          </View> */}
        </View>
        <MainGrid
          tableHead={[
            {
              key: "AseetID",
              label: AssetHomeLang.OperationItem[Lang],
              type: "number",
              input: "false",
              visible: "false",
            },
            {
              key: "ConditionDate",
              label: "تاريخ التقييم",
              type: "date",
              input: "false",
              visible: "true",
            },
            {
              key: "EvaluatorID",
              label: "جهه التقييم",
              type: "dropdown",
              input: "true",
              visible: "true",
              options: Eval,
            },
            {
              key: "Eval_name",
              label: "جهه التقييم",
              type: "text",
              input: "false",
              visible: "true",
            },
            {
              key: "ConditionIndex",
              label: "التقييم الفني",
              type: "number",
              input: "false",
              visible: "true",
            },
            {
              key: "Remarks",
              label: "ملاحظات",
              type: "text",
              input: "true",
              visible: "true",
            },
          ]}
          pk={'AssetConditionID'}
          spTrx={"api_am_asset_conditions_Trx"}
          spIns={"api_am_asset_conditions_Ins"}
          spUpd={"api_am_asset_conditions_Upd"}
          spDel={"api_am_asset_conditions_Del"}
          TrxParam={[
            { name: 'DepartmentID', value: DepartmentID },
            { name: 'CompanyID', value: company },
            { name: 'UserName', value: user.username },
            { name: 'LangID', value: Lang },
            { name: "AssetID", value: AssetID }
          ]}
          DelParam={[
            { rowData: true, name: 'SubLocationID', value: 'SubLocationID' },
            { name: 'DepartmentID', value: DepartmentID },
            { name: 'CompanyID', value: company },
            { name: 'UserName', value: user.username },
            { name: 'LangID', value: Lang },
          ]}
          UpdBody={{
            DepartmentID: DepartmentID,
            UserName: user.username,
            LangID: Lang,
            CompanyID: company,
          }}
          InsBody={{
            DepartmentID: DepartmentID,
            UserName: user.username,
            LangID: Lang,
            CompanyID: company,
          }}
          routeTo={{
						path: "/EvaluationDetails",
						hasParams: true,
						params: {
							AssetID: AssetID,
							SubLocationID: SubLocationID,
						},
					}}
          //hasCrud={false}
          // hasDel={false}
          // hasIns={false}
        />
        {/* <AssetOrdersGrid  SubLocationID={SubLocationID} LocationID={LocationID} AssetID={AssetID}   /> */}
      </View>
    </MainLayout>
  );
};

export default AssetOrders;
