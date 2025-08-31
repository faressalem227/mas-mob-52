import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Alert,
  Dimensions,
  Modal,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  Platform,
} from "react-native";
import { MainLayout, MainButton, DatePickerInput ,Dropdown} from "../../../components";
import { useRouter, useLocalSearchParams } from "expo-router";
import api from "../../../utilities/api";
import AssetHomeLang from "../../../constants/Lang/AssetManagment/AssetHomeLang";
import { useGlobalContext } from "../../../context/GlobalProvider";
const FinancialAssets = () => {
  const {
    AssetID,
    LocationID,
    AssetCode,
    AssetName,
    AssetClassName,
    AssetStatusName,
  } = useLocalSearchParams();
  const { Lang, Rtl } = useGlobalContext();
  const router = useRouter();
  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get("window").width
  );
  const [width, setWidth] = useState("w-[80%]");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Financial asset states
  const [operationDate, setOperationDate] = useState(Date.now());
  const [originalCost, setOriginalCost] = useState("");
  const [depreciationRate, setDepreciationRate] = useState("");
  const [accumulatedDepreciation, setAccumulatedDepreciation] = useState("");
  const [replacmentValue, setReplacmentValue] = useState("");
  const [shedulePeriodHours, setShedulePeriodHours] = useState("");
  const [totalOpHoursSinceLastSch, setTotalOpHoursSinceLastSch] = useState("");
  const [totalOpHoursSinceStart, setTotalOpHoursSinceStart] = useState("");
  const [lastSheduleDate, setLastSheduleDate] = useState(Date.now());

  useFocusEffect(
    useCallback(() => {
      const fetchFinancialAssets = async () => {
        setLoading(true);
        try {
          const response = await api.get(
            `/table?sp=api_am_asset_financial_Trx&AssetID=${AssetID}`
          );
          const data = response.data.data[0] || {};

          setOperationDate(data.OperationDate || null);
          setOriginalCost(data.OriginalCost?.toString() || "");
          setDepreciationRate(data.DepreciationRate?.toString() || "");
          setAccumulatedDepreciation(
            data.AccumulatedDepreciation?.toString() || ""
          );
          setReplacmentValue(data.ReplacmentValue?.toString() || "");
          setShedulePeriodHours(data.ShedulePeriodHours?.toString() || "");
          setTotalOpHoursSinceLastSch(
            data.TotalOpHoursSinceLastSch?.toString() || ""
          );
          setTotalOpHoursSinceStart(
            data.TotalOpHoursSinceStart?.toString() || ""
          );
          setLastSheduleDate(data.LastSheduleDate || null);
        } catch (err) {
          setError(err.message || "Failed to fetch data");
        } finally {
          setLoading(false);
        }
      };

      if (AssetID) {
        fetchFinancialAssets();
      }
    }, [AssetID])
  );

  const handleSave = async () => {
    setLoading(true);
    try {
      await api.post(`/table?sp=api_am_asset_financial_Upd`, {
       // LocationID,
        AssetID,
        OperationDate: operationDate,
        OriginalCost: originalCost,
        DepreciationRate: depreciationRate,
        AccumulatedDepreciation: accumulatedDepreciation,
        ReplacmentValue: replacmentValue,
        ShedulePeriodHours: shedulePeriodHours,
        TotalOpHoursSinceLastSch: totalOpHoursSinceLastSch,
        TotalOpHoursSinceStart: totalOpHoursSinceStart,
        LastSheduleDate: lastSheduleDate,
        //EmployeeID:EmployeeID
      });

      setModalVisible(true);
    } catch (err) {
      Alert.alert(
        err.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setWidth(windowWidth < 800 ? "w-48" : "w-[80%]");
  }, [windowWidth]);

  return (
    <MainLayout title={AssetHomeLang.FinancialData[Lang]}>
      <View className="bg-white h-[100vh] flex flex-col">
        <View className={`flex flex-col ${Rtl ? "rtl" : "ltr"} bg-[#F6F6F6] rounded-sm p-4 m-4`}>
          <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
            <Text className="w-[109px] text-base font-tmedium">{AssetHomeLang.AssetCode[Lang]}</Text>
            <Text className={`${width} text-base font-tmedium`}>
              {AssetCode}
            </Text>
          </View>
          <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
            <Text className="w-[109px] text-base font-tmedium"> {AssetHomeLang.AssetName[Lang]}</Text>
            <Text className={`${width} text-base font-tmedium`}>
              {AssetName}
            </Text>
          </View>
        </View>

        <KeyboardAvoidingView
          className="mb-16"
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView className="px-4 mb-24">
            <DatePickerInput
              title={AssetHomeLang.OperationDate[Lang]}
              defaultDate={operationDate}
              setDate={(v)=>setOperationDate(v)}
            />

            {[
              {
                label: AssetHomeLang.BaseCost[Lang],
                value: originalCost,
                setter: setOriginalCost,
              },
              {
                label: AssetHomeLang.DepreciationRate[Lang],
                value: depreciationRate,
                setter: setDepreciationRate,
              },
              {
                label: AssetHomeLang.AccumulatedDepreciation[Lang],
                value: accumulatedDepreciation,
                setter: setAccumulatedDepreciation,
                editable: false,
              },
              {
                label: AssetHomeLang.ReplacementValue[Lang],
                value: replacmentValue,
                setter: setReplacmentValue,
              },
              {
                label: AssetHomeLang.OverhaulHours[Lang],
                value: shedulePeriodHours,
                setter: setShedulePeriodHours,
              },
              {
                label: AssetHomeLang.TotalOperatingHoursSinceStart[Lang],
                value: totalOpHoursSinceStart,
                setter: setTotalOpHoursSinceStart,
              },
              {
                label: AssetHomeLang.TotalOperatingHoursSinceLastOverhaul[Lang],
                value: totalOpHoursSinceLastSch,
                setter: setTotalOpHoursSinceLastSch,
              },
            ].map((field, index) => (
              <View key={index} className="my-1">
                <Text className="text-base font-tmedium my-2">
                  {field.label}
                </Text>
                <TextInput
                  className="w-full text-sm font-medium h-14 border-[.5px] border-[#1C5B7D] rounded-lg p-4 text-right"
                  keyboardType="numeric"
                  value={field.value}
                  onChangeText={(e) => field.setter(e)}
                  editable={field.editable !== false}
                />
              </View>
            ))}

            <DatePickerInput
              title={AssetHomeLang.DateofLastOverhaul[Lang]}
              defaultDate={lastSheduleDate}
              setDate={(v)=>setLastSheduleDate(v)}
            />
            {/* <Dropdown
              placeholder={AssetHomeLang.Employee[Lang]}
              title={AssetHomeLang.Employees[Lang]}
              // initailOption={user?.DepartmentID}
              // onChange={(v) => handleDepartmentChange(v)}
              // data={departmentData}
            /> */}
            <View className="mt-4 mb-24">
              <MainButton title={AssetHomeLang.Save[Lang]} handlePress={handleSave} />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}> {AssetHomeLang.Saved[Lang]}</Text>
            <Text style={styles.modalMessage}> {AssetHomeLang.DataSavedSuccessfully[Lang]} ✅</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>إغلاق</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </MainLayout>
  );
};
const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: "Tajawal-Medium",

    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Tajawal-Medium",

    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#227099",
    padding: 4,
    borderRadius: 5,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Tajawal-Medium",

    textAlign: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});


export default FinancialAssets;

// import React, { useState, useEffect, useCallback } from "react";
// import { useFocusEffect } from "@react-navigation/native";
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   Alert,
//   Dimensions,
//   Modal,
//   TouchableOpacity,
//   KeyboardAvoidingView,
// } from "react-native";
// import { MainLayout, MainButton, DatePickerInput } from "../../../components";
// import { useRouter, useLocalSearchParams } from "expo-router";
// import FinancialAssetsGrid from "../../../components/grid/FinancialAssetGrid";
// import MainGrid from "../../../components/grid/MainGrid";
// import { ScrollView } from "react-native";
// import { TextInput } from "react-native";
// import api from "../../../utilities/api";
// const FinancialAssets = ({ route }) => {
//   const {
//     AssetID,
//     SubLocationID,
//     LocationID,
//     AssetCode,
//     AssetName,
//     AssetClassName,
//     AssetStatusName,
//     ...restParams
//   } = useLocalSearchParams();
//   const router = useRouter();
//   const [windowWidth, setWindowWidth] = useState(
//     Dimensions.get("window").width
//   );
//   const [width, setWidth] = useState();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const [modalVisible, setModalVisible] = useState(false);
//   const [operationDate, setOperationDate] = useState();
//   const [originalCost, setOriginalCost] = useState();
//   const [depreciationRate, setDepreciationRate] = useState();
//   const [accumulatedDepreciation, setAccumulatedDepreciation] = useState();
//   const [replacmentValue, setReplacmentValue] = useState();
//   const [shedulePeriodHours, setShedulePeriodHours] = useState();
//   const [totalOpHoursSinceLastSch, setTotalOpHoursSinceLastSch] = useState();
//   const [totalOpHoursSinceStart, setTotalOpHoursSinceStart] = useState();
//   const [lastSheduleDate, setLastSheduleDate] = useState();

//   useFocusEffect(
//     useCallback(() => {
//       const fetchFinancialAssets = async () => {
//         setLoading(true);
//         try {
//           const response = await api.get(
//             `/table?sp=api_am_asset_financial_Trx&AssetID=${AssetID}`
//           );
//           setOperationDate(response.data.data[0]?.OperationDate);
//           setOriginalCost(response.data.data[0]?.OriginalCost.toString());
//           console.log(response.data.data[0]?.OriginalCost.toString());
//           setDepreciationRate(
//             response.data.data[0]?.DepreciationRate.toString()
//           );
//           setAccumulatedDepreciation(
//             response.data.data[0]?.AccumulatedDepreciation.toString()
//           );
//           setReplacmentValue(response.data.data[0]?.ReplacmentValue.toString());
//           setShedulePeriodHours(
//             response.data.data[0]?.ShedulePeriodHours.toString()
//           );
//           setTotalOpHoursSinceLastSch(
//             response.data.data[0]?.TotalOpHoursSinceLastSch.toString()
//           );
//           setTotalOpHoursSinceStart(
//             response.data.data[0]?.TotalOpHoursSinceStart.toString()
//           );
//           setLastSheduleDate(response.data.data[0]?.LastSheduleDate);
//           console.log(response.data.data[0]);
//         } catch (err) {
//           setError(err.message || "Failed to fetch workorder data");
//         } finally {
//           setLoading(false);
//         }
//       };

//       if (AssetID) {
//         fetchFinancialAssets();
//       }
//     }, [AssetID]) // Dependency array
//   );
//   const handleSave = async () => {
//     setLoading(true);
//     try {
//       const response = await api.post(`/table?sp=api_am_asset_financial_Upd`, {
//         LocationID,
//         AssetID,
//         OperationDate: operationDate,
//         OriginalCost: originalCost,
//         DepreciationRate: depreciationRate,
//         AccumulatedDepreciation: accumulatedDepreciation,
//         ReplacmentValue: replacmentValue,
//         ShedulePeriodHours: shedulePeriodHours,
//         TotalOpHoursSinceLastSch: totalOpHoursSinceLastSch,
//         TotalOpHoursSinceStart: totalOpHoursSinceStart,
//         LastSheduleDate: lastSheduleDate,
//       });

//       setModalVisible(true);
//     } catch (err) {
//       Alert.alert(
//         err.response?.data?.message || "An error occurred. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (windowWidth < 800) {
//       setWidth("w-48"); // Set width to 250 px
//     } else {
//       setWidth("w-[80%]"); // Set width to 80%
//     }
//   }, [windowWidth]);

//   return (
//     <MainLayout title={" البيانات المالية للاصل"} className="">
//       <View className="bg-white h-[100vh] flex flex-col">
//         <View className="flex flex-col bg-[#F6F6F6] rounded-sm p-4 m-4">
//           <View className="flex flex-row-reverse justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]">
//             <Text className="w-[109px] text-base font-tmedium">كود الاصل</Text>
//             <Text className={`${width} text-basefont-tmedium`}>
//               {AssetCode}
//             </Text>
//           </View>
//           <View className="flex flex-row-reverse justify-between  items-center border-b-[1px] py-1 border-[#E4E7EC]">
//             <Text className="w-[109px] text-base font-tmedium"> اسم الاصل</Text>
//             <Text className={`${width} text-basefont-tmedium`}>
//               {AssetName}
//             </Text>
//           </View>
//           <View className="flex flex-row-reverse justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]">
//             <Text className="w-[109px] text-base font-tmedium"> التصنيف</Text>
//             <Text className={`${width} text-basefont-tmedium`}>
//               {AssetClassName}
//             </Text>
//           </View>
//           <View className="flex flex-row-reverse justify-between items-center">
//             <Text className="w-[109px] text-base pt-1 font-tmedium">
//               حاله امر الشغل
//             </Text>
//             <Text className={`${width} text-basefont-tmedium`}>
//               {AssetStatusName}
//             </Text>
//           </View>
//         </View>
//         <KeyboardAvoidingView className=" mb-16" behavior="height">
//           <ScrollView className="px-4 mb-24">
//             <DatePickerInput
//               title={"تاريخ التشغيل"}
//               defaultDate={operationDate}
//               setDate={setOperationDate}
//             />
//             <View calssName="my-1">
//               <Text className="text-base font-tmedium font-medium my-2 ">
//                 التكلفه الأساسيه
//               </Text>
//               <TextInput
//                 className="w-full text-sm font-medium h-14 border-[.5px] border-[#1C5B7D] rounded-lg p-4 text-right focus:border-[#133e5475]"
//                 keyboardType="numeric"
//                 value={originalCost}
//                 onChangeText={(e) => setOriginalCost(e)}
//               />
//             </View>
//             <View calssName="my-1">
//               <Text className="text-base font-tmedium font-medium my-2 ">
//                 معدل الاهلاك{" "}
//               </Text>
//               <TextInput
//                 className="w-full text-sm font-medium h-14 border-[.5px] border-[#1C5B7D] rounded-lg p-4 text-right focus:border-[#133e5475]"
//                 keyboardType="numeric"
//                 value={depreciationRate}
//                 onChangeText={(e) => setDepreciationRate(e)}
//               />
//             </View>
//             <View calssName="my-1">
//               <Text className="text-base font-tmedium font-medium my-2 ">
//                 مجمع الاهلاك{" "}
//               </Text>
//               <TextInput
//                 className="w-full text-sm font-medium h-14 border-[.5px] border-[#1C5B7D] rounded-lg p-4 text-right focus:border-[#133e5475]"
//                 keyboardType="numeric"
//                 value={accumulatedDepreciation}
//                 onChangeText={(e) => setAccumulatedDepreciation(e)}
//                 editable={false}

//               />
//             </View>
//             <View calssName="my-1">
//               <Text className="text-base font-tmedium font-medium my-2 ">
//                 {" "}
//                 قيمة الاستبدال{" "}
//               </Text>
//               <TextInput
//                 className="w-full text-sm font-medium h-14 border-[.5px] border-[#1C5B7D] rounded-lg p-4 text-right focus:border-[#133e5475]"
//                 keyboardType="numeric"
//                 value={replacmentValue}
//                 onChangeText={(e) => setReplacmentValue(e)}
//               />
//             </View>
//             <View calssName="my-1">
//               <Text className="text-base font-tmedium font-medium my-2 ">
//                 {" "}
//                 ساعات العمره
//               </Text>
//               <TextInput
//                 className="w-full text-sm font-medium h-14 border-[.5px] border-[#1C5B7D] rounded-lg p-4 text-right focus:border-[#133e5475]"
//                 keyboardType="numeric"
//                 value={shedulePeriodHours}
//                 onChangeText={(e) => setShedulePeriodHours(e)}
//               />
//             </View>
//             <View calssName="my-1">
//               <Text className="text-base font-tmedium font-medium my-2 ">
//                 اجمالى ساعات العمل منذ البدء
//               </Text>
//               <TextInput
//                 className="w-full text-sm font-medium h-14 border-[.5px] border-[#1C5B7D] rounded-lg p-4 text-right focus:border-[#133e5475]"
//                 keyboardType="numeric"
//                 value={totalOpHoursSinceStart}
//                 onChangeText={(e) => setTotalOpHoursSinceStart(e)}
//                 // editable={false}

//               />
//             </View>
//             <View calssName="my-1">
//               <Text className="text-base font-tmedium font-medium my-2 ">
//                 اجمالى ساعات العمل منذ اخر عمره
//               </Text>
//               <TextInput
//                 className="w-full text-sm font-medium h-14 border-[.5px] border-[#1C5B7D] rounded-lg p-4 text-right focus:border-[#133e5475]"
//                 keyboardType="numeric"
//                 value={totalOpHoursSinceLastSch}
//                 onChangeText={(e) => setTotalOpHoursSinceLastSch(e)}
//                 // editable={false}

//               />
//             </View>
//             <DatePickerInput
//               title={"تاريخ اخر عمرة "}
//               defaultDate={lastSheduleDate}
//               setDate={setLastSheduleDate}
//             />
//             <View className="mt-4 mb-24">
//               <MainButton title={"حفظ"} handlePress={handleSave} />
//             </View>
//           </ScrollView>
//         </KeyboardAvoidingView>
//       </View>
//       <Modal
//         visible={modalVisible}
//         transparent
//         animationType="fade"
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.modalBackground}>
//           <View style={styles.modalContainer}>
//             <Text
//               className="font-tmedium font-medium text-base my-3 px-1"
//               style={styles.modalTitle}
//             >
//               تم الحفظ
//             </Text>
//             <Text
//               className="font-tmedium font-medium text-base my-3 px-1"
//               style={styles.modalMessage}
//             >
//               تم حفظ البيانات بنجاح ✅
//             </Text>
//             <TouchableOpacity
//               style={styles.modalButton}
//               onPress={() => setModalVisible(false)}
//             >
//               <Text
//                 className="font-tmedium font-medium text-base  px-1"
//                 style={styles.modalButtonText}
//               >
//                 إغلاق
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </MainLayout>
//   );
// };

// const styles = StyleSheet.create({
//   modalBackground: {
//     flex: 1,
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalContainer: {
//     width: "80%",
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     padding: 20,
//     alignItems: "center",
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontFamily: "Tajawal-Medium",

//     marginBottom: 10,
//   },
//   modalMessage: {
//     fontSize: 16,
//     textAlign: "center",
//     fontFamily: "Tajawal-Medium",

//     marginBottom: 20,
//   },
//   modalButton: {
//     backgroundColor: "#227099",
//     padding: 4,
//     borderRadius: 5,
//   },
//   modalButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontFamily: "Tajawal-Medium",

//     textAlign: "center",
//   },
//   errorText: {
//     color: "red",
//     fontSize: 16,
//     textAlign: "center",
//     marginTop: 20,
//   },
// });

// export default FinancialAssets;
