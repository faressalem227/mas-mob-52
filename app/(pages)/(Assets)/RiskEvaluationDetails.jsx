import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
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
} from "../../../components";
import { useRouter, useLocalSearchParams } from "expo-router";
import InfoDetailes from "../../../components/UI/InfoDetailes";
import ArrowLineUpRight from "../../../assets/images/ArrowLineUpRight.png";
import api from "../../../utilities/api";
import MainGrid from "../../../components/grid/MainGrid";
import { HandleDropdownFormat, useDropDown } from "../../../hooks/useDropDownData";
import RiskEvaluationTable from "../../../components/grid/RiskEvaluationTable"
const RiskEvaluationDetails = ({ route }) => {
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
    RiskID
  } = useLocalSearchParams();
  const router = useRouter();
  const [MaintenanceData, setMaintenanceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const screenHeight = Dimensions.get("window").height; // Get screen height dynamically

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.get(
          `/table?sp=api_ms_WorkorderInfoPm&WorkorderID=${WorkorderID}&LocationID=${LocationID}`
        );
        console.log(response.data.data[0], "44444");
        setMaintenanceData(response.data.data[0]);
      } catch (err) {
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    if (WorkorderID && LocationID) fetchData();
  }, [WorkorderID, LocationID]);

  // Handle input changes for two-way binding
  const handleInputChange = (key, value) => {
    setMaintenanceData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  // Save updated data to the API
  const handleSave = async () => {
    if (!MaintenanceData.PlannedStartDate || !MaintenanceData.PlannedEndDate) {
      Alert.alert("لم يتم ادخال جميع الحقول");
      return;
    }

    setLoading(true);
    try {
      const response = await api.put(
        `/table?sp=api_ms_WorkorderInfoPm_Update`,
        {
          LocationID,
          WorkorderID,
          WorksDone: MaintenanceData.WorksDone,
          PlannedStartDate: MaintenanceData.PlannedStartDate,
          PlannedEndDate: MaintenanceData.PlannedEndDate,
        }
      );

      Alert.alert("تم الحفظ", "   تم حفظ البيانات بنجاح ✅");
      console.log("Save response:", response.data);
    } catch (err) {
      console.error("Error saving data:", err);
      Alert.alert("خطأ", "فشل الإدخال يرجى المحاوله مره أخرى");
    } finally {
      setLoading(false);
    }
  };
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

  console.log("windowWidth", windowWidth);
  console.log("computed width", width);
  const detailsData = [
	{ label: "تاريخ التقيم", value: WorkorderCode },
	{ label: "تاريخ التقيم التالي", value: WorkorderName },
	{ label: "التقيم الفني", value: WorkorderTypeName },
	{ label: "درجة الاهمية", value: WorkorderTypeName },
	{ label: "درجة الاحتمالية", value: WorkorderTypeName },
	{ label: "درجة المخاطرة", value: WorkorderTypeName },
	{ label: "ملاحظات", value: WorkorderTypeName },
	{ label: "كود الاصل", value: WorkorderTypeName },
	{ label: "اسم الاصل", value: WorkorderStatusName },
  ];
  return (
    <MainLayout title={"تفاصيل تقييم المخاطرة"} className="">
      <View className="bg-white h-[100vh] flex flex-col">
	  <InfoDetailes
  details={detailsData}
  valueWidthClass="w-[60%]" 
/>
<RiskEvaluationTable RiskID={RiskID} />
     
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
  RiskEvaluationDetailsGrid: {
    marginTop:4,
    marginBottom:68,
  },
});

export default RiskEvaluationDetails;