import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { MainLayout } from "../../../../components";
import { useLocalSearchParams } from "expo-router";
import api from "../../../../utilities/api";
import WorkOrderDetails2Lang from "../../../../constants/Lang/Maintenance/WorkOrders/WorkOrderDetails2";
import { useGlobalContext } from "../../../../context/GlobalProvider";
import InfoDetailes from "../../../../components/UI/InfoDetailes";
const WorkOrderDetails2 = () => {
  const [AssetData, setAssetData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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
  const { Lang, Rtl } = useGlobalContext();
  const { TradeID, LocationID, WorkorderID } = useLocalSearchParams();
  const formatDate = (date) => {
    if (!date) return "N/A";
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };
  useEffect(() => {
    if (LocationID && TradeID && WorkorderID) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await api.get(
            `/table?sp=api_ms_workodres_trx2&LocationID=${LocationID}&TradeID=${TradeID}&WorkorderID=${WorkorderID}`
          );

          setAssetData(response.data.data[0] || {});
          //console.log("تفاصيل امر الشغل", response.data.data);
        } catch (err) {
          setError(err.message || "Failed to fetch data");
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [LocationID, TradeID, WorkorderID]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }
  const detailsData = [
    { label: WorkOrderDetails2Lang.WorkorderCode[Lang], value: AssetData?.WorkorderCode },
    { label: WorkOrderDetails2Lang.WorkorderName[Lang], value: AssetData?.WorkorderName },
    { label: WorkOrderDetails2Lang.WorkorderTypeName[Lang], value: AssetData?.WorkorderTypeName },
    { label: WorkOrderDetails2Lang.WorkOrderStatusName[Lang], value: AssetData?.WorkorderStatusName },
    { label: WorkOrderDetails2Lang.PriorityID[Lang], value: AssetData?.PriorityName },
    { label: WorkOrderDetails2Lang.TradeID[Lang], value: AssetData?.TargetTypeName },
    { label: WorkOrderDetails2Lang.EmployeeID[Lang], value: AssetData?.AssignedEmployeeID },
    { label: WorkOrderDetails2Lang.RequiredExecuteDate[Lang], value: AssetData?.RequiredExecuteDate?.split("T")[0] },
    { label: WorkOrderDetails2Lang.Safety[Lang], value: AssetData?.Safety },
    { label: WorkOrderDetails2Lang.FailureCauseDescription[Lang], value: AssetData?.FailureCauseDescription },
    { label: WorkOrderDetails2Lang.WorksDone[Lang], value: AssetData?.WorksDone },
    { label: WorkOrderDetails2Lang.PlannedStartDate[Lang], value: AssetData?.ActualStartDate?.split("T")[0] },
    { label: WorkOrderDetails2Lang.ActualEndDate[Lang], value: AssetData?.ActualEndDate?.split("T")[0] },
    { label: WorkOrderDetails2Lang.WostatuesID[Lang], value: AssetData?.WostatuesID },
    { label: WorkOrderDetails2Lang.ClosedDate[Lang], value: AssetData?.AssetData?.ClosedDate?.split("T")[0] },
    { label: WorkOrderDetails2Lang.CancelledDate[Lang], value: AssetData?.CancelledDate?.split("T")[0] },
  ];
  return (
    <MainLayout title={WorkOrderDetails2Lang.pageTitle[Lang]}>
      <View className="bg-white flex flex-col">
        <ScrollView>
          <InfoDetailes
            details={detailsData}
            valueWidthClass="w-[60%]"
          />
        </ScrollView>
      </View>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F6F6",
    padding: 16,
  },
  row: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#E4E7EC",
    paddingVertical: 8,
  },
  label: {
    width: 125,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "right",
  },
  value: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "right",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});

export default WorkOrderDetails2;
