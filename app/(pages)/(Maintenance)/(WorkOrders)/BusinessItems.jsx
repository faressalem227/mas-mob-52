import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Dimensions,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useGlobalContext } from "../../../../context/GlobalProvider";
import ContractsGrid from "../../../../components/grid/ContractsGrid";
import MainLayout from "../../../../components/layout/MainLayout";
import { useLocalSearchParams } from "expo-router";
import {
  HandleDropdownFormat,
  useDropDown,
} from "../../../../hooks/useDropDownData";
import MainGrid from "../../../../components/grid/MainGrid";
import BusinessItemsLang from "../../../../constants/Lang/Maintenance/WorkOrders/BusinessItemsLang";

const BusinessItems = () => {
  const {
    TradeID,
    LocationID,
    WorkorderID,
    FailureDescription,
    WorkorderCode,
    preventCrud,
    WorkorderName,
    WorkorderTypeID,
    WorkorderTypeName,
    WorkorderStatusName,
    ...restParams
  } = useLocalSearchParams();
  const { user, Lang,Rtl } = useGlobalContext(); // Get the current language from global context
  const screenHeight = Dimensions.get("window").height; // Get screen height dynamically
  const { data: Trade, loading: TradeLoader } = useDropDown(
    "api_ms_Trade_List",
    { LocationID: LocationID },
    "value",
    "label"
  );

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
    <MainLayout title={BusinessItemsLang.PageTitle[Lang]} className="">
      <View className="bg-white h-[100vh] flex flex-col">
	  	<View className={`flex flex-col ${Rtl ? "rtl" : "ltr"} bg-[#F6F6F6] rounded-sm p-4 m-4`}>
	  		<View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>	
            <Text className="w-[122px] text-base font-tmedium">
              {BusinessItemsLang.WorkOrderDetails.WorkOrderCode[Lang]}
            </Text>
            <Text className={`${width} text-base font-tmedium`}>
              {WorkorderCode}
            </Text>
          </View>
		  <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
		  <Text className="w-[122px] text-base font-tmedium">
              {BusinessItemsLang.WorkOrderDetails.WorkOrderDescription[Lang]}
            </Text>
            <Text className={`${width} text-base font-tmedium`}>
              {WorkorderName}
            </Text>
          </View>
		  <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
		  <Text className="w-[122px] text-base font-tmedium">
              {BusinessItemsLang.WorkOrderDetails.WorkOrderType[Lang]}
            </Text>
            <Text className={`${width} text-base font-tmedium`}>
              {WorkorderTypeName}
            </Text>
          </View>
		  <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
		  <Text className="w-[122px] text-base pt-1 font-tmedium">
              {BusinessItemsLang.WorkOrderDetails.WorkOrderStatus[Lang]}
            </Text>
            <Text className={`${width} text-base font-tmedium`}>
              {WorkorderStatusName}
            </Text>
          </View>
        </View>

        <View
          className="mb-24"
          style={[styles.assetsGrid, { height: screenHeight }]}
        >
          <MainGrid
            tableHead={[
              {
                key: "TaskID",
                label: BusinessItemsLang.TableHeaders.Task[Lang],
                type: "dropdown",
                input: "false",
                visible: "false",
                width: 100,
              },
              {
                key: "TradeID",
                label: BusinessItemsLang.TableHeaders.Category[Lang],
                type: "dropdown",
                input: "true",
                options: Trade,
                visible: "false",
                width: 100,
              },
              {
                key: "TaskCode",
                label: BusinessItemsLang.TableHeaders.TaskCode[Lang],
                type: "",
                input: "false",
                visible: "false",
                width: 100,
              },
              {
                key: "TaskName",
                label: BusinessItemsLang.TableHeaders.TaskName[Lang],
                type: "",
                input: "true",
                visible: "true",
                width: 100,
              },
              {
                key: "Unit",
                label: BusinessItemsLang.TableHeaders.Unit[Lang],
                type: "text",
                input: "true",
                visible: "true",
                width: 100,
              },
              {
                key: "Quantity",
                label: BusinessItemsLang.TableHeaders.Quantity[Lang],
                type: "number",
                input: "true",
                visible: "true",
                width: 100,
              },
              {
                key: "Cost",
                label: BusinessItemsLang.TableHeaders.Cost[Lang],
                type: "number",
                input: "true",
                visible: "true",
                width: 100,
              },
              {
                key: "PlannedStartDate",
                label: BusinessItemsLang.TableHeaders.PlannedStartDate[Lang],
                type: "date",
                input: "true",
                visible: "true",
                width: 130,
              },
              {
                key: "PlannedEndDate",
                label: BusinessItemsLang.TableHeaders.PlannedEndDate[Lang],
                type: "date",
                input: "true",
                visible: "true",
                width: 130,
              },
              {
                key: "ActualStartDate",
                label: BusinessItemsLang.TableHeaders.ActualStartDate[Lang],
                type: "date",
                input: "true",
                visible: "true",
                width: 130,
              },
              {
                key: "ActualEndDate",
                label: BusinessItemsLang.TableHeaders.ActualEndDate[Lang],
                type: "date",
                input: "true",
                visible: "true",
                width: 130,
              },
            ]}
            StaticWidth={true}
            pk={"ItemID"}
            spTrx={"api_ms_WorkorderTasks_Trx"}
            spIns={"api_ms_WorkorderTasks_Ins"}
            spUpd={"api_ms_WorkorderTasks_Upd"}
            spDel={"api_ms_WorkorderTasks_Del"}
            TrxParam={[
              { name: "LocationID", value: LocationID },
              { name: "WorkorderID", value: WorkorderID },
            ]}
            hasCrud={preventCrud}
            DelParam={[
              {
                rowData: true,
                name: "ItemID",
                value: "ItemID",
              },
              { name: "LocationID", value: LocationID },
              { name: "WorkorderID", value: WorkorderID },
            ]}
            UpdBody={{ LocationID: LocationID }}
            InsBody={{ LocationID: LocationID, WorkorderID: WorkorderID }}
            TrxDependency={[WorkorderID]}
            routeTo={{
              path: "/BusinessItemsDetails",
              hasParams: true,
              params: {
                LocationID: LocationID,
                WorkorderID: WorkorderID,
              },
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
  ContractsGrid: {
    marginVertical: 8,
  },
});

export default BusinessItems;