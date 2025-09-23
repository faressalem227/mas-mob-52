import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import {
  MainLayout,
  MainButton,
  DatePickerInput,
} from "../../../../components";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useDropDown } from "../../../../hooks/useDropDownData";
import MainGrid from "../../../../components/grid/MainGrid";
import WorkOrders from "../../../../constants/Lang/Maintenance/WorkOrders/WorkOrders";
import { useGlobalContext } from "../../../../context/GlobalProvider";

const Permits = () => {
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


  const { data: PermitType } = useDropDown(
    "api_ms_Permit_Types_list",
    {CompanyID:company},
    "PermitTypeID",
    "PermitTypeName"
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
    <MainLayout title={WorkOrders.workOrderPermits[Lang]} className="">
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
              key: "PermitTypeID",
              label: WorkOrders.PermitType[Lang],
              type: "dropdown",
              options:PermitType,
              input: "true",
              visible: "false",
              width: 100,
            },
            {
              key: "PermitTypeName",
              label: WorkOrders.PermitType[Lang],
              type: "text",
              input: "false",
              visible: "true",
              width: 100,
            },
          {
              key: "Party",
              label: WorkOrders.Party[Lang],
              type: "text",
              input: "true",
              visible: "true",
              width: 100,
            },
            {
              key: "PermitCost",
              label: WorkOrders.PermitCost[Lang],
              type: "number",
              input: "true",
              visible: "true",
              width: 200,
            },
                  
            {
              key: "ReceiptDate",
              label: WorkOrders.ReceiptDate[Lang],
              type: "date",
              input: "true",
              visible: "true",
              width: 100,
            },
            {
              key: "Remarks",
              label: WorkOrders.Remarks[Lang],
              type: "",
              input: "true",
              visible: "true",
              width: 100,
            },
          ]}
          pk={"PermitID"}
          spTrx={"api_ms_Workorders_Permits_Trx"}
          spIns={"api_ms_Workorders_Permits_Ins"}
          spDel={"api_ms_Workorders_Permits_Del"}
          spUpd={"api_ms_Workorders_Permits_Upd"}
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
              name: "PermitID",
              value: "PermitID",
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

export default Permits;