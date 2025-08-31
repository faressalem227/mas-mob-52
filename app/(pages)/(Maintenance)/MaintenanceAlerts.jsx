import React, { useState, useEffect } from 'react';
import { View, Text, Image, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import Ellipse from '../../../assets/images/Ellipse 1.png';
import Delete from '../../../assets/images/delete.png';
import { MainLayout } from '../../../components';
import api from '../../../utilities/api';
import MaintenanceAlerts from '../../../constants/Lang/Maintenance/MaintenanceAlert';
import { useGlobalContext } from '../../../context/GlobalProvider';

const Maintenance_Alerts = () => {
  const [AlertsData, setAlertsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { Lang } = useGlobalContext();
  const [ViewFailer, setViewFailer] = useState(true);
  const [ViewWorkOrder, setViewWorkOrder] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api.get('/table?sp=api_sys_Notification_Trx2');
      console.log(response.data); // Log the entire response
      setAlertsData(response.data.data || []);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleViewFailer = () => {
    setViewFailer(true);
    setViewWorkOrder(false);
  };

  const toggleViewWorkOrder = () => {
    setViewWorkOrder(true);
    console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh');
    
    setViewFailer(false);
  };

  const deleteAlert = async (NotificationID) => {
    try {
      await api.delete(`/table?sp=api_sys_Notification_Del&NotificationID=${NotificationID}`);
      setAlertsData((prevData) =>
        prevData.filter((item) => item.NotificationID !== NotificationID)
      );
    } catch (err) {
      console.error('Delete error:', err);
      setError(err.message || 'Failed to delete alert');
    }
  };

  const changeAlertStatus = async (NotificationID) => {
    try {
      await api.put(`/table?sp=api_sys_Notification_Status&NotificationID=${NotificationID}`);
      await fetchData(); // Refetch the data after changing the alert status
    } catch (err) {
      console.error('Change status error:', err);
      setError(err.message || 'Failed to change alert status');
    }
  };

  if (loading) {
    return (
      <MainLayout title={MaintenanceAlerts.MaintenanceAlerts[Lang]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout title={MaintenanceAlerts.MaintenanceAlerts[Lang]}>
        <Text style={{ color: 'red', textAlign: 'center', margin: 20 }}>{error}</Text>
      </MainLayout>
    );
  }

  return (
    <MainLayout title={MaintenanceAlerts.MaintenanceAlerts[Lang]}>
      <View className="flex flex-row justify-between bg-[#ffffff] px-4 pt-3">
        <TouchableOpacity className="w-1/2" onPress={toggleViewWorkOrder}>
          <Text
            className={`pb-4 text-center font-tmedium text-base ${
              ViewWorkOrder ? 'border-b-2 border-[#027E01] text-[#027E01]' : 'text-slate-400'
            }`}>
            {MaintenanceAlerts.Workorders[Lang]}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="w-1/2" onPress={toggleViewFailer}>
          <Text
            className={`pb-4  text-center font-tmedium text-base ${
              ViewFailer ? 'border-b-2 border-[#FB0000] text-[#FB0000]' : 'text-slate-400'
            }`}>
            {MaintenanceAlerts.FailerReport[Lang]}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="">
        {AlertsData.length > 0 &&
          AlertsData.map((item) => {
            const { Head, Body, NotificationID, Status, NotificationTime } = item;

            const isRead = Status ? 'opacity-50' : '';

            if ((ViewFailer && item.TypeID === 1) || (ViewWorkOrder && item.TypeID === 3)) {
              return (
                <TouchableOpacity
                  onLongPress={() => changeAlertStatus(NotificationID)}
                  key={NotificationID}>
                  <View className={`my-4 w-full rounded-lg bg-[#F6F6F6] p-4 ${isRead}`}>
                    <View className="mb-2 flex w-full flex-row-reverse justify-between">
                      <View className="flex flex-row items-center gap-2">
                        <Text className="font-tbold text-base">{Head}</Text>
                        <Image source={Ellipse} resizeMode="contain" className="h-2 w-2" />
                      </View>
                      <TouchableOpacity onPress={() => deleteAlert(NotificationID)}>
                        <Image source={Delete} resizeMode="contain" className="h-6 w-6" />
                      </TouchableOpacity>
                    </View>
                    <View className="w-full">
                      <Text className="font-tregular text-sm">{Body}</Text>
                    </View>
                    <View>
                      <Text className="mb-2 mt-2 text-xs font-light">
                        {NotificationTime
                          ? new Date(NotificationTime).toLocaleString('en-US', {
                              timeZone: 'Africa/Cairo',
                              year: 'numeric',
                              month: '2-digit',
                              day: '2-digit',
                              hour: 'numeric',
                              minute: '2-digit',
                              hour12: true,
                            })
                          : 'No date available'}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }
            return null;
          })}
      </ScrollView>
    </MainLayout>
  );
};

export default Maintenance_Alerts;
