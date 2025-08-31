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
import ServicesLang from "../../../../constants/Lang/Maintenance/WorkOrders/ServicesLang";
import { useGlobalContext } from "../../../../context/GlobalProvider";

const Extracts = () => {
  const {
    TradeID,
    LocationID,
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

  const { Lang , Rtl} = useGlobalContext(); // Get the current language from global context
  const [selectedScetionID, setselectedScetionID] = useState();
  const [selectdGroupID, setSelectdGroupID] = useState();
  const [ItemID, setItemID] = useState();

  const { data: Group } = useDropDown(
    "api_Sc_Item_Group_List2",
    {SectionID: 9 },
    "GroupID",
    "GroupName"
  );

  const { data: Items } = useDropDown(
    "api_Sc_Items__List2",
    {
      GroupID: selectdGroupID,
      SectionID: 9,
    },
    "ItemID",
    "ItemName"
  );

  const { data: UnitList } = useDropDown(
    "api_sc_Items_Units_List",
    { ItemID: ItemID },
    "value",
    "label"
  );
  const { data: Asset } = useDropDown(
    "api_ms_Workorder_Assets_Trx",
    { LocationID: LocationID, WorkorderID: WorkorderID },
    "AssetID",
    "AssetName"
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
    <MainLayout title={ServicesLang.PageTitle[Lang]} className="">
      <View className="bg-white h-[100vh] flex flex-col">
	  <View className={`flex flex-col ${Rtl ? "rtl" : "ltr"} bg-[#F6F6F6] rounded-sm p-4 m-4`}>
	  <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
	  <Text className="w-[122px] text-base font-tmedium">
              {ServicesLang.WorkOrderDetails.WorkOrderCode[Lang]}
            </Text>
            <Text className={`${width} text-base font-tmedium`}>
              {WorkorderCode}
            </Text>
          </View>
		  <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
		  <Text className="w-[122px] text-base font-tmedium">
              {ServicesLang.WorkOrderDetails.WorkOrderDescription[Lang]}
            </Text>
            <Text className={`${width} text-base font-tmedium`}>
              {WorkorderName}
            </Text>
          </View>
		  <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
		  <Text className="w-[122px] text-base font-tmedium">
              {ServicesLang.WorkOrderDetails.WorkOrderType[Lang]}
            </Text>
            <Text className={`${width} text-base font-tmedium`}>
              {WorkorderTypeName}
            </Text>
          </View>
		  <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
		  <Text className="w-[122px] text-base pt-1 font-tmedium">
              {ServicesLang.WorkOrderDetails.WorkOrderStatus[Lang]}
            </Text>
            <Text className={`${width} text-base font-tmedium`}>
              {WorkorderStatusName}
            </Text>
          </View>
        </View>
        <MainGrid
          tableHead={[
            {
              key: "ComparisonID",
              label: ServicesLang.TableHeaders.Section[Lang],
              type: "dropdown",
              input: "false",
              visible: "false",
              width: 100,
            },
            {
              key: "TaskCode",
              label: "",
              type: "text",
              input: "false",
              visible: "false",
              width: 100,
            },
            {
              key: "TaskName",
              label: ServicesLang.TableHeaders.Group[Lang],
              type: "dropdown",
              options: Group,
              input: "true",
              visible: "false",
              width: 100,
            },
            {
              key: "Quantity",
              label: ServicesLang.TableHeaders.Group[Lang],
              type: "dropdown",
              options: Group,
              input: "false",
              visible: "true",
              width: 100,
            },
            {
              key: "Cost",
              label: ServicesLang.TableHeaders.Item[Lang],
              type: "dropdown",
              options: Items,
              input: "true",
              visible: "false",
              width: 100,
            },
            {
              key: "Unit",
              label: ServicesLang.TableHeaders.Item[Lang],
              input: "false",
              visible: "true",
              width: 100,
            },
            {
              key: "UnitID",
              label: ServicesLang.TableHeaders.Unit[Lang],
              type: "dropdown",
              options: UnitList,
              input: "true",
              visible: "false",
              width: 100,
            },
            {
              key: "Quantity",
              label: ServicesLang.TableHeaders.Quantity[Lang],
              type: "number",
              input: "true",
              visible: "true",
              width: 100,
            },
            {
              key: "UnitName",
              label: ServicesLang.TableHeaders.Unit[Lang],
              type: "",
              input: "false",
              visible: "true",
              width: 100,
            },
            {
              key: "IssueDate",
              label: ServicesLang.TableHeaders.IssueDate[Lang],
              type: "date",
              input: "true",
              visible: "true",
              width: 200,
            },
            {
              key: "IsRequired",
              label: ServicesLang.TableHeaders.IsRequired[Lang],
              type: "checkbox",
              input: "true",
              visible: "true",
              required: "false",
              width: 130,
            },
            {
              key: "AssetID",
              label: ServicesLang.TableHeaders.Asset[Lang],
              type: "dropdown",
              options: Asset,
              input: "true",
              visible: "false",
              width: 100,
            },
            {
              key: "AssetCode",
              label: ServicesLang.TableHeaders.AssetCode[Lang],
              type: "",
              input: "false",
              visible: "true",
              width: 100,
            },
            {
              key: "AssetName",
              label: ServicesLang.TableHeaders.AssetName[Lang],
              type: "",
              input: "false",
              visible: "true",
              width: 100,
            },
            {
              key: "WorkorderMaterialID",
              label: ServicesLang.TableHeaders.AssetName[Lang],
              type: "",
              input: "false",
              visible: "false",
              width: 100,
            },
          ]}
          pk={"ComparisonID"}
          spTrx={"api_ms_workorder_Comparison_trx"}
          spIns={"api_ms_workorder_Comparison_Ins"}
          spDel={"api_ms_workorder_Comparison_Del"}
          spUpd={"api_ms_workorder_Comparison_Upd"}
          UpdBody={{
            WorkorderID: WorkorderID,
            LocationID: LocationID,
            SectionID: 9,
          }}
          InsBody={{
            WorkorderID: WorkorderID,
            LocationID: LocationID,
            SectionID: 9,
          }}
          hasCrud={preventCrud}
          TrxParam={[
            { name: "LocationID", value: LocationID },
            { name: "LangID", value: Lang },
            { name: "UserName", value: "host" },
            { name: "WorkorderID", value: WorkorderID },
          ]}
          DelParam={[
            {
              rowData: true,
              name: "WorkorderMaterialID",
              value: "WorkorderMaterialID",
            },
            { name: "LocationID", value: LocationID },
            { name: "WorkorderID", value: WorkorderID },
          ]}
          TrxDependency={[WorkorderID]}
          mixedWidth
          routeTo={{
            path: "/StockItemsDetails",
            hasParams: true,
            params: {
              TradeID,
              LocationID,
              WorkorderID,
              FailureDescription,
              WorkorderCode,
              WorkorderName,
              WorkorderTypeID,
              WorkorderTypeName,
              WorkorderStatusName,
              ...restParams,
            },
          }}
        />
      </View>
    </MainLayout>
  );
};

export default Extracts;