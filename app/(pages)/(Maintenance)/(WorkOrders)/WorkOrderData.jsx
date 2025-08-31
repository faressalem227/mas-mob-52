import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Alert,
  ScrollView,
  Dimensions,
} from "react-native";
import {
  MainLayout,
  MainButton,
  DatePickerInput,
  Dropdown,
} from "../../../../components";
import { useRouter, useLocalSearchParams } from "expo-router";
import ArrowLineUpRight from "../../../../assets/images/ArrowLineUpRight.png";
import api from "../../../../utilities/api";
import { HandleDropdownFormat, useDropDown } from "../../../../hooks/useDropDownData";
import WorkOrderDataLang from "../../../../constants/Lang/Maintenance/WorkOrders/WorkOrderDataLang"; // Import the language file
import { useGlobalContext } from "../../../../context/GlobalProvider"; // Import the context

const WorkOrderData = ({ route }) => {
  const { Lang , Rtl} = useGlobalContext(); // Get the current language from context
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
    WorkorderStatusID,
  } = useLocalSearchParams();

  const router = useRouter();
  const [WorkOrderData, setWorkOrderData] = useState([]);
  const [PriorityID, setPriorityID] = useState([]);
  const [EmployeeID, setEmployeeID] = useState([]);
  const [TradeValue, setTradeValue] = useState([]);
  const [RequiredExecuteDate, setRequiredExecuteDate] = useState([]);
  const [loading, setLoading] = useState("");
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading("fetching");
    try {
      const response = await api.get(
        `/table?sp=api_ms_WorkorderInfo&WorkorderID=${WorkorderID}&LocationID=${LocationID}`
      );
      setWorkOrderData(response.data.data[0]);
    } catch (err) {
      setError(err.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (WorkorderID && LocationID) fetchData();
  }, [WorkorderID, LocationID]);

  // Handle input changes for two-way binding
  const handleInputChange = (key, value) => {
    setWorkOrderData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  // Save updated data to the API
  const handleSave = async () => {
    if (!WorkOrderData.TradeID || !WorkOrderData.PriorityID) {
      Alert.alert(WorkOrderDataLang.Error[Lang], WorkOrderDataLang.FillAllFields[Lang]);
      return;
    }

    setLoading(true);
    try {
      const response = await api.post(`/table?sp=api_ms_WorkorderInfo_Update`, {
        LocationID: LocationID,
        WorkorderID: WorkorderID,
        TradeID: TradeValue,
        PriorityID: PriorityID,
        EmployeeID: EmployeeID,
        RequiredExecuteDate: RequiredExecuteDate,
      });

      Alert.alert(WorkOrderDataLang.SavedSuccessfully[Lang], WorkOrderDataLang.DataSavedSuccessfully[Lang]);
      setWorkOrderData({
        LocationID: LocationID,
        WorkorderID: WorkorderID,
        TradeID: TradeValue,
        PriorityID: PriorityID,
        EmployeeID: EmployeeID,
        RequiredExecuteDate: RequiredExecuteDate,
      });
    } catch (err) {
      console.error("Error saving data:", err);
      Alert.alert(WorkOrderDataLang.Error[Lang], WorkOrderDataLang.SaveFailed[Lang]);
    } finally {
      setLoading(false);
    }
  };

  const { data: Priority, loading: PriorityLoader } = useDropDown(
    "api_ms_Priority_List",
    { LocationID: LocationID },
    "value",
    "label"
  );
  const { data: Trade, loading: TradeLoader } = useDropDown(
    "api_ms_Trade_List",
    { LocationID: LocationID },
    "value",
    "label"
  );
  const { data: employee, loading: TemployeeLoader } = useDropDown(
    "api_employee_list",
    { LocationID: LocationID },
    "key",
    "value"
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
    <MainLayout
      loading={loading == "fetching" && PriorityLoader && TradeLoader && TemployeeLoader}
      title={WorkOrderDataLang.PageTitle[Lang]}
      className="">
      <View className="bg-white h-[100vh] flex flex-col">
	  <View className={`flex flex-col ${Rtl ? "rtl" : "ltr"} bg-[#F6F6F6] rounded-sm p-4 m-4`}>
	  <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
	  <Text className="w-[122px] text-base font-tmedium">
              {WorkOrderDataLang.WorkorderCode[Lang]}
            </Text>
            <Text className={`${width} text-basefont-tmedium`}>{WorkorderCode}</Text>
          </View>
		  <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
		  <Text className="w-[122px] text-base font-tmedium">
              {WorkOrderDataLang.WorkorderName[Lang]}
            </Text>
            <Text className={`${width} text-basefont-tmedium`}>{WorkorderName}</Text>
          </View>
		  <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
		  <Text className="w-[122px] text-base font-tmedium">
              {WorkOrderDataLang.WorkorderTypeName[Lang]}
            </Text>
            <Text className={`${width} text-basefont-tmedium`}>{WorkorderTypeName}</Text>
          </View>
		  <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
		  <Text className="w-[122px] text-base pt-1 font-tmedium">
              {WorkOrderDataLang.WorkorderStatusName[Lang]}
            </Text>
            <Text className={`${width} text-basefont-tmedium`}>{WorkorderStatusName}</Text>
          </View>
        </View>

        {/* Input Fields */}
        {loading ? (
          <ActivityIndicator size="large" color="#227099" />
        ) : error ? (
          <Text>{error}</Text>
        ) : (
          <ScrollView className="flex flex-col bg-[#F6F6F6] rounded-sm mx-4 p-4 pb-36 mb-16 space-y-2">
            <View className="pb-4">
              <Text className="text-base font-tmedium font-medium my-2">
                {WorkOrderDataLang.Priority[Lang]}
              </Text>
              <Dropdown
                data={Priority}
                onChange={(e) => setPriorityID(e)}
                initailOption={WorkOrderData.PriorityID}
                value={WorkOrderData.PriorityID}
                placeholder={WorkOrderDataLang.SelectPriority[Lang]}
              />
            </View>

            <View className="pb-4">
              <Text className="text-base font-tmedium font-medium my-2">
                {WorkOrderDataLang.Trade[Lang]}
              </Text>
              <Dropdown
                data={Trade}
                onChange={(e) => setTradeValue(e)}
                value={WorkOrderData.TradeID}
                initailOption={WorkOrderData.TradeID}
                placeholder={WorkOrderDataLang.SelectTrade[Lang]}
              />
            </View>
            <View className="pb-4">
              <Text className="text-base font-tmedium font-medium my-2">
                {WorkOrderDataLang.RequiredExecuteDate[Lang]}
              </Text>
              <DatePickerInput
                setDate={(e) => setRequiredExecuteDate(e)}
                defaultDate={WorkOrderData.RequiredExecuteDate}
              />
            </View>
            <View className="pb-4">
              <Text className="text-base font-tmedium font-medium my-2">
                {WorkOrderDataLang.ResponsibleEmployee[Lang]}
              </Text>
              <Dropdown
                data={employee}
                onChange={(e) => setEmployeeID(e)}
                initailOption={WorkOrderData.EmployeeID}
                value={WorkOrderData.EmployeeID}
                placeholder={WorkOrderDataLang.SelectResponsibleEmployee[Lang]}
              />
            </View>

            <View className="py-5">
              {!loading && preventCrud != "false" ? (
                <View>
                  <MainButton
                    title={WorkOrderDataLang.Save[Lang]}
                    icon={ArrowLineUpRight}
                    handlePress={handleSave}
                  />
                </View>
              ) : (
                <></>
              )}
            </View>
          </ScrollView>
        )}
      </View>
    </MainLayout>
  );
};

export default WorkOrderData;