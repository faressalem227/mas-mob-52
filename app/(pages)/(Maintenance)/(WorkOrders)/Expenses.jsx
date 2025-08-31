import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import {
  MainLayout,
  MainButton,
  DatePickerInput,
} from "../../../../components";
import { useRouter, useLocalSearchParams } from "expo-router";
import { TextInput } from "react-native";
import ArrowLineUpRight from "../../../../assets/images/ArrowLineUpRight.png";
import { useDropDown } from "../../../../hooks/useDropDownData";
import StockItemsGrid from "../../../../components/grid/StockItemsGrid";
import MainGrid from "../../../../components/grid/MainGrid";
import WorkOrders from "../../../../constants/Lang/Maintenance/WorkOrders/WorkOrders";
import { useGlobalContext } from "../../../../context/GlobalProvider";

const Expenses = () => {
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

  const { Lang , Rtl,company} = useGlobalContext(); // Get the current language from global context

  const { data: ExpenseType } = useDropDown(
    "api_ms_Expenses_Types_list",
    { CompanyID:company },
    "ExpenseTypeID",
    "ExpenseTypeName"
  );

  const [windowWidth, setWindowWidth] = useState(Dimensions.get("window").width);
  const [width, setWidth] = useState();

  useEffect(() => {
    if (windowWidth < 800) {
      setWidth("w-48"); // Set width to 250 px
    } else {
      setWidth("w-[80%]"); // Set width to 80%
    }
  }, [windowWidth]);

  return (
    <MainLayout title={WorkOrders.workOrderExpnses[Lang]} className="">
      <View className="bg-white h-[100vh] flex flex-col">
	  <View className={`flex flex-col ${Rtl ? "rtl" : "ltr"} bg-[#F6F6F6] rounded-sm p-4 m-4`}>
	  <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
	  <Text className="w-[122px] text-base font-tmedium">
              {WorkOrders.WorkorderCode[Lang]}
            </Text>
            <Text className={`${width} text-base font-tmedium`}>
              {WorkorderCode}
            </Text>
          </View>
		  <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
		  <Text className="w-[122px] text-base font-tmedium">
              {WorkOrders.WorkOrderDescription[Lang]}
            </Text>
            <Text className={`${width} text-base font-tmedium`}>
              {WorkorderName}
            </Text>
          </View>
		  <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
		  <Text className="w-[122px] text-base font-tmedium">
              {WorkOrders.WorkorderTypeName[Lang]}
            </Text>
            <Text className={`${width} text-base font-tmedium`}>
              {WorkorderTypeName}
            </Text>
          </View>
		  <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
		  <Text className="w-[122px] text-base pt-1 font-tmedium">
              {WorkOrders.WorkorderStatusName[Lang]}
            </Text>
            <Text className={`${width} text-base font-tmedium`}>
              {WorkorderStatusName}
            </Text>
          </View>
        </View>
        <MainGrid
          
          tableHead={[
            {
              key: "PredecessorCode",
              label: "رقم السلفة",
              type: "text",
              input: "TRUE",
              visible: "true",
              width: 100,
            },
            {
              key: "ExpenseTypeID",
              label: WorkOrders.ExpenseType[Lang],
              type: "dropdown",
              options:ExpenseType,
              input: "true",
              visible: "false",
              width: 100,
            },
            {
              key: "ExpenseTypeName",
              label: WorkOrders.ExpenseType[Lang],
              type: "text",
              input: "false",
              visible: "true",
              width: 100,
            },
            {
              key: "ExpnsesDate",
              label: WorkOrders.ExpnsesDate[Lang],
              type: "date",
              input: "true",
              visible: "true",
              width: 100,
            },
            {
              key: "Value",
              label: WorkOrders.Value[Lang],
              type: "number",
              input: "true",
              visible: "true",
              width: 100,
            },

          ]}
          pk={"ExpenseID"}
          spTrx={"api_ms_Workorders_Expenses_Trx"}
          spIns={"api_ms_Workorders_Expenses_Ins"}
          spDel={"api_ms_Workorders_Expenses_Del"}
          spUpd={"api_ms_Workorders_Expenses_Upd"}
          UpdBody={{
            WorkorderID: WorkorderID,
            DepartmentID: DepartmentID,
            //SectionID: 9,
          }}
          InsBody={{
            WorkorderID: WorkorderID,
            DepartmentID: DepartmentID,
            //SectionID: 9,
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
              name: "ExpenseID",
              value: "ExpenseID",
            },
            { name: "DepartmentID", value: DepartmentID },
            { name: "WorkorderID", value: WorkorderID },
          ]}
          TrxDependency={[WorkorderID]}
          mixedWidth
         
        />
      </View>
    </MainLayout>
  );
};

export default Expenses;