import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import {
  MainLayout,
  MainButton,
  DatePickerInput,
} from "../../../../components";
import { useRouter, useLocalSearchParams } from "expo-router";
import MainGrid from "../../../../components/grid/MainGrid";
import AssaysLang from "../../../../constants/Lang/Maintenance/WorkOrders/Assays";
import { useGlobalContext } from "../../../../context/GlobalProvider";

const Works = () => {
  const {
    TradeID,
    DepartmentID,
    WorkorderID,
    FailureDescription,
    WorkorderCode,
    WorkorderName,
    WorkorderTypeID,
    WorkorderTypeName,
    WorkorderStatusName,
    preventCrud,
    ...restParams
  } = useLocalSearchParams();

  const { Lang, Rtl } = useGlobalContext(); // Get the current language from global context
 

 

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

  return (
    <MainLayout title={AssaysLang.WorkOrderWorks[Lang]} className="">
      <View className="bg-white h-[100vh] flex flex-col">
        <View
          className={`flex flex-col ${
            Rtl ? "rtl" : "ltr"
          } bg-[#F6F6F6] rounded-sm p-4 m-4`}
        >
          <View
            className={`flex flex-row ${
              Rtl ? "flex-row-reverse" : ""
            } justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}
          >
            <Text className="w-[122px] text-base font-tmedium">
              {AssaysLang.WorkOrderCode[Lang]}
            </Text>
            <Text className={`${width} text-base font-tmedium`}>
              {WorkorderCode}
            </Text>
          </View>
          <View
            className={`flex flex-row ${
              Rtl ? "flex-row-reverse" : ""
            } justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}
          >
            <Text className="w-[122px] text-base font-tmedium">
              {AssaysLang.WorkOrderDescription[Lang]}
            </Text>
            <Text className={`${width} text-base font-tmedium`}>
              {WorkorderName}
            </Text>
          </View>
          <View
            className={`flex flex-row ${
              Rtl ? "flex-row-reverse" : ""
            } justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}
          >
            <Text className="w-[122px] text-base font-tmedium">
              {AssaysLang.WorkOrderType[Lang]}
            </Text>
            <Text className={`${width} text-base font-tmedium`}>
              {WorkorderTypeName}
            </Text>
          </View>
          <View
            className={`flex flex-row ${
              Rtl ? "flex-row-reverse" : ""
            } justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}
          >
            <Text className="w-[122px] text-base pt-1 font-tmedium">
              {AssaysLang.WorkOrderStatus[Lang]}
            </Text>
            <Text className={`${width} text-base font-tmedium`}>
              {WorkorderStatusName}
            </Text>
          </View>
        </View>
        <MainGrid
          tableHead={[
            {
              key: "TaskCode",
              label: AssaysLang.TaskCode[Lang],
              type: "number",
              input: "true",
              visible: "true",
              width: 100,
            },
            {
              key: "TaskName",
              label: AssaysLang.TaskName[Lang],
              type: "text",
              input: "true",
              visible: "true",
              width: 100,
            },
            {
              key: "Quantity",
              label: AssaysLang.Quantity[Lang],
              type: "number",
              input: "true",
              visible: "true",
              width: 100,
            },
            {
              key: "Cost",
              label: AssaysLang.Cost[Lang],
              type: "number",
              input: "true",
              visible: "true",
              width: 100,
            },
            {
              key: "Unit",
              label: AssaysLang.Unit[Lang],
              type: "text",
              input: "true",
              visible: "true",
              width: 100,
            },
            {
              key: "PlannedStartDate",
              label: AssaysLang.PlannedStartDate[Lang],
              type: "date",
              input: "true",
              visible: "true",
              width: 100,
            },
            {
              key: "PlannedEndDate",
              label: AssaysLang.PlannedEndDate[Lang],
              type: "date",
              input: "true",
              visible: "true",
              width: 100,
            },
            {
              key: "ActualStartDate",
              label: AssaysLang.ActualStartDate[Lang],
              type: "date",
              input: "true",
              visible: "true",
              width: 100,
            },
            {
              key: "ActualEndDate",
              label: AssaysLang.ActualEndDate[Lang],
              type: "date",
              input: "true",
              visible: "true",
              width: 100,
            },

            {
              key: "SPI",
              label: "",
              type: "",
              input: "false",
              visible: "false",
              width: 100,
            },
            {
              key: "CPI",
              label: "",
              type: "",
              input: "false",
              visible: "false",
              width: 100,
            },
            {
              key: "TotalCost",
              label: AssaysLang.TotalCost[Lang],
              type: "number",
              input: "false",
              visible: "true",
              width: 100,
              required:"false"
            },
          ]}
          pk={"ItemID"}
          spTrx={"api_ms_WorkorderTasks_Trx"}
          spIns={"api_ms_WorkorderTasks_Ins"}
          spDel={"api_ms_WorkorderTasks_Del"}
          spUpd={"api_ms_WorkorderTasks_Upd"}
          UpdBody={{
            WorkorderID: WorkorderID,
            DepartmentID: DepartmentID,
         
          }}
          InsBody={{
            WorkorderID: WorkorderID,
            DepartmentID: DepartmentID,
          }}
          hasCrud={preventCrud}
          TrxParam={[
            { name: "DepartmentID", value: DepartmentID },
            { name: "LangID", value: Lang },
            { name: "UserName", value: "host" },
            { name: "WorkorderID", value: WorkorderID },
          ]}
          DelParam={[
            {
              rowData: true,
              name: "ItemID",
              value: "ItemID",
            },
            { name: "DepartmentID", value: DepartmentID },
            { name: "WorkorderID", value: WorkorderID },
          ]}
          TrxDependency={[WorkorderID]}
          mixedWidth
          // routeTo={{
          //   path: "/StockItemsDetails",
          //   hasParams: true,
          //   params: {
          //     TradeID,
          //     DepartmentID,
          //     WorkorderID,
          //     FailureDescription,
          //     WorkorderCode,
          //     WorkorderName,
          //     WorkorderTypeID,
          //     WorkorderTypeName,
          //     WorkorderStatusName,
          //     ...restParams,
          //   },
          // }}
        />
      </View>
    </MainLayout>
  );
};

export default Works;
