import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Ellipse from "../../../assets/images/Ellipse 1.png";
import Delete from "../../../assets/images/delete.png";
import { MainLayout } from "../../../components";
import api from "../../../utilities/api";
import SCADALang from "../../../constants/Lang/SCADA/SCADALang";
import { useGlobalContext } from "../../../context/GlobalProvider";

const SCADA_Alerts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { Lang } = useGlobalContext();
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api.get(
        `/table?sp=api_sys_Notification_Trx&TypeID=2`
      );
      console.log(response.data.data); // Log API response to check structure
      setData(response.data.data || []);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteAlert = async (NotificationID) => {
    try {
      await api.delete(
        `/table?sp=api_sys_Notification_Del&NotificationID=${NotificationID}`
      );
      setData((prevData) =>
        prevData.filter((item) => item.NotificationID !== NotificationID)
      );
    } catch (err) {
      console.error("Delete error:", err);
      setError(err.message || "Failed to delete alert");
    }
  };

  const changeAlertStatus = async (NotificationID) => {
    try {
      await api.put(
        `/table?sp=api_sys_Notification_Status&NotificationID=${NotificationID}`
      );
      await fetchData(); // Refetch the data after changing the alert status
    } catch (err) {
      console.error("Change status error:", err);
      setError(err.message || "Failed to change alert status");
    }
  };

  if (loading) {
    return (
      <MainLayout title={SCADALang.SCADAAlerts[Lang]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout title={SCADALang.SCADAAlerts[Lang]}>
        <Text style={{ color: "red", textAlign: "center", margin: 20 }}>
          {error}
        </Text>
      </MainLayout>
    );
  }

  return (
    <MainLayout title={SCADALang.SCADAAlerts[Lang]}>
      <ScrollView className="mb-2">
        {data.length>0&&data.map((item) => {
          const {
            Head,
            Body,
            InsertTime,
            NotificationID,
            Status,
            NotificationTime,
          } = item;

          // Directly check if Status is "true" for opacity
          const isRead = Status ? "opacity-50" : "";

          return (
            <TouchableOpacity
              onLongPress={() => changeAlertStatus(NotificationID)}
              key={NotificationID}
            >
              <View
                className={`w-full bg-[#F6F6F6] p-4 my-4 rounded-lg ${isRead}`}
              >
                <View className="flex flex-row-reverse justify-between mb-2 w-full">
                  <View className="flex flex-row items-center gap-2">
                    <Text className="font-tbold text-base">{Head}</Text>
                    <Image
                      source={Ellipse}
                      resizeMode="contain"
                      className="w-2 h-2"
                    />
                  </View>
                  <TouchableOpacity onPress={() => deleteAlert(NotificationID)}>
                    <Image
                      source={Delete}
                      resizeMode="contain"
                      className="w-6 h-6"
                    />
                  </TouchableOpacity>
                </View>
                <View className="w-full">
                  <Text className="font-tregular text-sm">{Body}</Text>
                </View>
                <View>
                  <Text className="font-light mt-2 text-xs mb-2">
                    {NotificationTime
                      ? new Date(NotificationTime).toLocaleString("en-US", {
                          timeZone: "Africa/Cairo",
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })
                      : "No date available"}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </MainLayout>
  );
};

export default SCADA_Alerts;
