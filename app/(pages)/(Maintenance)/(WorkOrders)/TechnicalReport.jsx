import { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import {
  MainLayout,
  MainButton,
  DatePickerInput,
  Dropdown,
  TextArea,
} from '../../../../components';
import { useLocalSearchParams } from 'expo-router';
import { useDropDown } from '../../../../hooks/useDropDownData';
import WorkOrders from '../../../../constants/Lang/Maintenance/WorkOrders/WorkOrders';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import api from '../../../../utilities/api';
import ArrowLineUpRight from '../../../../assets/images/ArrowLineUpRight.png';

import Toast from 'react-native-toast-message';

const TechnicalReport = () => {
  const {
    DepartmentID,
    WorkorderID,
    PlannedStartDate,
    PlannedEndDate,
    ScheduleID,
    // WorksDone,
    WorkorderStatusID,
  } = useLocalSearchParams();

  const { Lang, user } = useGlobalContext();

  const [loading, setLoading] = useState(false);
  const [scheduleID, setscheduleID] = useState(false);

  const [worksDone, setWorksDone] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    let timer;
    if (modalVisible) {
      timer = setTimeout(() => setModalVisible(false), 1000);
    }
    return () => timer && clearTimeout(timer);
  }, [modalVisible]);

  const fetchData = async () => {
    try {
      const response = await api.get(
        `/table?sp=api_ms_WorkorderTechnicalReport_Get&WorkorderID=${WorkorderID}&DepartmentID=${DepartmentID}`
      );
      const data = response.data.data[0];
      setWorksDone(data?.WorksDone || '');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    if (WorkorderID) {
      fetchData();
    }
  }, [WorkorderID]);

  const handleSave = async () => {
    setLoading(true);
    try {
      await api.post(`/table?sp=api_ms_WorkorderInfoPm_Update`, {
        DepartmentID,
        WorkorderID,
        WorksDone: worksDone,
      });
      Toast.show({
        type: 'success',
        text1: WorkOrders.success[Lang],
      });
      await fetchData();
      setModalVisible(true);
    } catch (err) {
      console.error('Error saving data:', err);
      Toast.show({
        type: 'error',
        text1: WorkOrders.failed[Lang],
      });
    } finally {
      setLoading(false);
    }
  };

  const { data: ScheduleList } = useDropDown(
    'api_ms_Schedule_ListForWostatic',
    { WorkorderID },
    'ScheduleID',
    'ScheduleName'
  );

  console.log(worksDone);

  return (
    <MainLayout title={WorkOrders.TechnicalReport[Lang]}>
      <View className="flex-1">
        <ScrollView>
          <View className="gap-8 p-4">
            <DatePickerInput
              title={WorkOrders.PlannedStartDate[Lang]}
              defaultDate={PlannedStartDate || null}
              disabled={true}
              preventDefault
            />

            <DatePickerInput
              title={WorkOrders.PlannedEndDate[Lang]}
              defaultDate={PlannedEndDate || null}
              disabled={true}
              preventDefault
            />

            {/* <Dropdown
              title={WorkOrders.ScheduleID[Lang]}
              placeholder={WorkOrders.ScheduleID[Lang]}
              data={ScheduleList}
              defaultDate={ScheduleID}
              // disabled={true}
            /> */}

            <Dropdown
              title={WorkOrders.ScheduleID[Lang]}
              onChange={(val) => setscheduleID(val)}
              value={scheduleID}
              data={ScheduleList || []}
              initailOption={ScheduleList[0]?.key}
              disabled={true}
            />

            <TextArea
              label={WorkOrders.TechnicalReport[Lang]}
              initialHeight={150}
              value={worksDone}
              onChange={(val) => setWorksDone(val)}
            />
          </View>

          <View className="p-4">
            <MainButton
              isLoading={loading}
              title={loading ? WorkOrders.saving[Lang] : WorkOrders.Buttons.Save[Lang]}
              icon={ArrowLineUpRight}
              handlePress={handleSave}
            />
          </View>
        </ScrollView>
      </View>
    </MainLayout>
  );
};

export default TechnicalReport;

// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Dimensions,
//   TextInput,
//   TouchableWithoutFeedback,
//   Modal,
//   Image,
//   Alert,
// } from 'react-native';
// import { MainLayout, MainButton, DatePickerInput, Dropdown } from '../../../../components';
// import { useRouter, useLocalSearchParams } from 'expo-router';
// import { useDropDown } from '../../../../hooks/useDropDownData';
// import MainGrid from '../../../../components/grid/MainGrid';
// import WorkOrders from '../../../../constants/Lang/Maintenance/WorkOrders/WorkOrders';
// import { useGlobalContext } from '../../../../context/GlobalProvider';
// import api from '../../../../utilities/api';
// import ArrowLineUpRight from '../../../../assets/images/ArrowLineUpRight.png';
// import Done from '../../../../assets/images/Done.png';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import { ScrollView } from 'react-native';
// const TechnicalReport = () => {
//   const {
//     TradeID,
//     DepartmentID,
//     WorkorderID,
//     FailureDescription,
//     WorkorderCode,
//     WorkorderName,
//     WorkorderTypeID,
//     WorkorderTypeName,
//     WorkorderStatusName,
//     preventCrud,
//     ...restParams
//   } = useLocalSearchParams();

//   const { Lang, Rtl, user } = useGlobalContext(); // Get the current language from global context
//   const router = useRouter();
//   const [MaintenanceData, setMaintenanceData] = useState({});
//   const [data, setData] = useState([]);
//   const [TaskLoader, setTaskLoader] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [PlannedStartDate, setPlannedStartDate] = useState();
//   const [PlannedEndDate, setPlannedEndDate] = useState();
//   const [ScheduleID, setScheduleID] = useState();
//   const [WorksDone, setWorksDone] = useState();
//   const [modalVisible, setModalVisible] = useState(false);
//   const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);
//   const [width, setWidth] = useState('w-48');

//   useEffect(() => {
//     if (windowWidth < 800) {
//       setWidth('w-48');
//     } else {
//       setWidth('w-[80%]');
//     }
//   }, [windowWidth]);

//   useEffect(() => {
//     let timer;
//     if (modalVisible) {
//       timer = setTimeout(() => {
//         setModalVisible(false);
//       }, 1000);
//     }
//     return () => {
//       if (timer) clearTimeout(timer);
//     };
//   }, [modalVisible]);

//   // const gettasks = async () => {
//   //   try {
//   //     const res = await api.get(
//   //       `/table?sp=api_ms_WorkorderPm_Tasks_trx&WorkorderID=${WorkorderID}`
//   //     );
//   //     setData(res.data.data);
//   //   } catch (err) {
//   //     console.error('Error getting tasks', err);
//   //   }
//   // };

//   useEffect(() => {
//     if (!WorkorderID || !DepartmentID) return;
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const response = await api.get(
//           `/table?sp=api_ms_WorkorderInfoPm&WorkorderID=${WorkorderID}&DepartmentID=${DepartmentID}&LangID=${Lang}&UserName=${user.username}`
//         );
//         setMaintenanceData(response.data.data[0] || {});
//         setPlannedEndDate(MaintenanceData.PlannedEndDate);
//         setPlannedStartDate(MaintenanceData.PlannedStartDate);
//         setScheduleID(MaintenanceData.ScheduleID);
//         setWorksDone(MaintenanceData.WorksDone);
//       } catch (err) {
//         setError(err.message || 'Failed to fetch data');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [WorkorderID, DepartmentID]);

//   const handleInputChange = (key, value) => {
//     setMaintenanceData((prevData) => ({
//       ...prevData,
//       [key]: value,
//     }));
//   };

//   const handleSave = async () => {
//     if (
//       !WorkorderID ||
//       !DepartmentID ||
//       !ScheduleID ||
//       !PlannedEndDate ||
//       !PlannedStartDate ||
//       !WorksDone
//     )
//       return;

//     setLoading(true);
//     try {
//       await api.post(`/table?sp=api_ms_WorkorderInfoPm_Update`, {
//         ScheduleID,
//         DepartmentID,
//         WorkorderID,
//         WorksDone,
//         PlannedStartDate,
//         PlannedEndDate,
//       });
//       setModalVisible(true);
//     } catch (err) {
//       console.error('Error saving data:', err);
//       Alert.alert(WorkOrders.Alerts.SaveError[Lang], WorkOrders.Alerts.SaveErrorMessage[Lang]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const { data: Schedule, loading: ScheduleListLoader } = useDropDown(
//     'api_ms_Schedule_ListForWo',
//     { DepartmentID: DepartmentID, UserName: user.username, LangID: Lang },
//     'ScheduleID',
//     'ScheduleName'
//   );

//   return (
//     <MainLayout title={WorkOrders.TechnicalReport[Lang]} className="">
//       <View className="flex h-[100vh] flex-col bg-white">
//         <View className={`flex flex-col ${Rtl ? 'rtl' : 'ltr'} m-4 rounded-sm bg-[#F6F6F6] p-4`}>
//           <View
//             className={`flex flex-row ${Rtl ? 'flex-row-reverse' : ''} items-center  justify-between  border-b-[1px] border-[#E4E7EC] py-1`}>
//             <Text className="w-[122px] font-tmedium text-base">
//               {WorkOrders.WorkorderCode[Lang]}
//             </Text>
//             <Text className={`${width} font-tmedium text-base`}>{WorkorderCode}</Text>
//           </View>
//           <View
//             className={`flex flex-row ${Rtl ? 'flex-row-reverse' : ''} items-center  justify-between  border-b-[1px] border-[#E4E7EC] py-1`}>
//             <Text className="w-[122px] font-tmedium text-base">
//               {WorkOrders.WorkOrderDescription[Lang]}
//             </Text>
//             <Text className={`${width} font-tmedium text-base`}>{WorkorderName}</Text>
//           </View>
//           <View
//             className={`flex flex-row ${Rtl ? 'flex-row-reverse' : ''} items-center  justify-between  border-b-[1px] border-[#E4E7EC] py-1`}>
//             <Text className="w-[122px] font-tmedium text-base">
//               {WorkOrders.WorkorderTypeName[Lang]}
//             </Text>
//             <Text className={`${width} font-tmedium text-base`}>{WorkorderTypeName}</Text>
//           </View>
//           <View
//             className={`flex flex-row ${Rtl ? 'flex-row-reverse' : ''} items-center  justify-between  border-b-[1px] border-[#E4E7EC] py-1`}>
//             <Text className="w-[122px] pt-1 font-tmedium text-base">
//               {WorkOrders.WorkorderStatusName[Lang]}
//             </Text>
//             <Text className={`${width} font-tmedium text-base`}>{WorkorderStatusName}</Text>
//           </View>
//         </View>
//         <ScrollView>
//           <View className="p-4" style={{ gap: hp('1%') }}>
//             <DatePickerInput
//               title={WorkOrders.PlannedStartDate[Lang]}
//               defaultDate={PlannedStartDate ? PlannedStartDate : new Date()}
//               setDate={(v)=>setPlannedStartDate(v)}
//             />
//             <DatePickerInput
//               title={WorkOrders.PlannedEndDate[Lang]}
//               defaultDate={PlannedEndDate ? PlannedEndDate : new Date()}
//               setDate={(v)=>setPlannedEndDate(v)}
//             />
//             <Dropdown
//               title={WorkOrders.ScheduleID[Lang]}
//               placeholder={WorkOrders.ScheduleID[Lang]}
//               data={Schedule}
//               initailOption={ScheduleID ? ScheduleID : Schedule[0]}
//               onChange={(v) => setScheduleID(v)}
//             />

//             <Text
//               className="mt-2 px-1 font-tmedium text-base font-medium"
//               style={{ direction: Rtl ? 'rtl' : 'ltr' }}>
//               {WorkOrders.TechnicalReport[Lang]}
//             </Text>
//             <TextInput
//               className="h-28 rounded-md border-[.5px] border-[#227099] p-4 font-tmedium"
//               multiline
//               numberOfLines={4}
//               placeholder={WorkOrders.TechnicalReport[Lang]}
//               value={MaintenanceData?.WorksDone || WorksDone}
//               onChangeText={(text) => handleInputChange('WorksDone', text)}
//             />
//           </View>
//           <View className="p-4">
//             {!loading && preventCrud != 'false' ? (
//               <MainButton
//                 title={WorkOrders.Buttons.Save[Lang]}
//                 icon={ArrowLineUpRight}
//                 handlePress={handleSave}
//               />
//             ) : (
//               <></>
//             )}
//           </View>
//         </ScrollView>
//       </View>

//       <Modal animationType="fade" visible={modalVisible} transparent>
//         <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
//           <View className="flex-1 items-center justify-center bg-[#00000088] bg-opacity-50">
//             <View className="items-center rounded-lg bg-white p-5">
//               <Image source={Done} className="h-10 w-10" />
//               <Text className="mt-4 font-tbold text-base">
//                 {WorkOrders.ModalMessages.SaveSuccess[Lang]}
//               </Text>
//             </View>
//           </View>
//         </TouchableWithoutFeedback>
//       </Modal>
//     </MainLayout>
//   );
// };

// export default TechnicalReport;
