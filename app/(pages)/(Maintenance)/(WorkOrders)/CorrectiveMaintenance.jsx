import { StyleSheet, View, Dimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import { useState } from 'react';
import { MainLayout } from '../../../../components';
import MainGrid from '../../../../components/grid/MainGrid';
import { useDropDown } from '../../../../hooks/useDropDownData';
import CorrectiveMaintenanceLang from '../../../../constants/Lang/Maintenance/WorkOrders/CorrectiveMaintenanceLang';

const CorrectiveMaintenance = ({}) => {
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
  const { user, Lang, company } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const [SubLocationID, setSubLocationID] = useState(null);
  const [dropdownValues, setDropdownValues] = useState({
    SubDepartmentID: false,
  });
  const { width, height } = Dimensions.get('window');

  const { data: subLocationList, loading: subLocationListLoader } = useDropDown(
    'api_ms_SubLocation_List',
    { DepartmentID: DepartmentID, LangID: Lang },
    'SubLocationID',
    'SubLocationName'
  );

  const { data: assetList, loading: assetLoader } = useDropDown(
    'api_ms_Assets_List_Location',
    { DepartmentID: DepartmentID, SubLocationID: SubLocationID },
    'AssetID',
    'AssetName'
  );

  const { data: failure } = useDropDown(
    'api_ms_Failure_ListForWo',
    { CompanyID: company },
    'FailureID',
    'FailureName'
  );

  const { data: failureCause } = useDropDown(
    'api_ms_FailureCause_ListForWo',
    { CompanyID: company },
    'FailureCauseID',
    'FailureCauseName'
  );

  return (
    <MainLayout title="بيانات العطل" loading={subLocationListLoader || loading}>
      <View style={{ height: height - 50 }}>
        <MainGrid
          tableHead={[
            {
              key: 'SubLocationID',
              label: `${CorrectiveMaintenanceLang.SubLocation[Lang]}`,
              type: 'dropdown',
              options: subLocationList,
              input: 'true',
              visible: 'false',
              width: 200,
              onChange: (val) => setSubLocationID(val),
            },
            {
              key: 'SubLocationName',
              label: `${CorrectiveMaintenanceLang.SubLocation[Lang]}`,
              type: 'text',
              input: 'false',
              visible: 'true',
              width: 200,
            },
            {
              key: 'AssetID',
              label: `${CorrectiveMaintenanceLang.Asset[Lang]}`,
              type: 'dropdown',
              options: assetList,
              input: 'true',
              visible: 'false',
              width: 200,
            },
            {
              key: 'AssetName',
              label: `${CorrectiveMaintenanceLang.Asset[Lang]}`,
              type: 'text',
              input: 'false',
              visible: 'true',
              width: 200,
            },
            {
              key: 'FailureDescription',
              label: `${CorrectiveMaintenanceLang.FailureDescription[Lang]}`,
              type: 'text',
              input: 'true',
              visible: 'true',
              width: 250,
            },
            {
              key: 'ActionBeforeReport',
              label: `${CorrectiveMaintenanceLang.Prevention[Lang]}`,
              type: 'text',
              input: 'true',
              visible: 'true',
              width: 200,
            },
            {
              key: 'AssetStop',
              label: `${CorrectiveMaintenanceLang.AssetStopped[Lang]}`,
              type: 'checkbox',
              input: 'true',
              visible: 'true',
              width: 140,
            },
            {
              key: 'FailureID',
              label: `${CorrectiveMaintenanceLang.FailureCode[Lang]}`,
              type: 'dropdown',
              options: failure,
              input: 'true',
              visible: 'false',
              width: 200,
            },
            {
              key: 'FailureName',
              label: `${CorrectiveMaintenanceLang.FailureCode[Lang]}`,
              type: 'text',
              input: 'false',
              visible: 'true',
              width: 200,
            },
            // {
            //   key: "FailureCauseName",
            //   label: `${CorrectiveMaintenanceLang.FailureCause[Lang]}`,
            //   type: "dropdown",
            //   options: failureCode,
            //   input: "false",
            //   visible: "true",
            //   width: 100,
            // },
            {
              key: 'FailureCauseID',
              label: `${CorrectiveMaintenanceLang.FailureCause[Lang]}`,
              type: 'dropdown',
              options: failureCause,
              input: 'true',
              visible: 'false',
              width: 100,
            },
            {
              key: 'FailureCauseName',
              label: `${CorrectiveMaintenanceLang.FailureCause[Lang]}`,
              type: 'text',
              input: 'false',
              visible: 'true',
              width: 200,
            },
            {
              key: 'WorksDone',
              label: `${CorrectiveMaintenanceLang.WorksDone[Lang]}`,
              type: 'text',
              input: 'true',
              visible: 'true',
              width: 200,
            },
            {
              key: 'ActiontakenToNotRepeat',
              label: 'الإجراء المتخذ لمنع التكرار',
              type: 'text',
              input: 'true',
              visible: 'true',
              width: 200,
            },
            {
              key: 'MeterValue',
              label: `${CorrectiveMaintenanceLang.MeterValue[Lang]}`,
              type: 'number',
              input: 'true',
              visible: 'true',
              width: 200,
            },
            {
              key: 'Instructions',
              label: 'تعليمات وملاحظات الصيانة',
              type: 'text',
              input: 'true',
              visible: 'true',
              width: 200,
            },
          ]}
          pk={'WorkorderAssetID'}
          spTrx={'api_ms_Workorder_Assets_Failure_Trx'}
          spIns={'api_ms_Workorder_Assets_Failure_Ins'}
          spUpd={'api_ms_Workorder_Assets_Failure_Upd'}
          spDel={'api_ms_Workorder_Assets_Failure_Del'}
          TrxParam={[
            { name: 'DepartmentID', value: DepartmentID },
            { name: 'WorkorderID', value: WorkorderID },
            { name: 'UserName', value: user },
            { name: 'LangID', value: Lang },
          ]}
          DelParam={[
            { name: 'DepartmentID', value: DepartmentID },
            {
              rowData: true,
              name: 'WorkorderAssetID',
              value: 'WorkorderAssetID',
            },
          ]}
          UpdBody={{ DepartmentID: DepartmentID, WorkorderID: WorkorderID }}
          InsBody={{
            DepartmentID: DepartmentID,
            LangID: Lang,
            UserName: user.username,
          }}
          StaticWidth={true}
          hasSpecialButton={true}
          hasIns={false}
          hasDel={false}
          handleDropDownChange={(key, value) =>
            setDropdownValues((prev) => ({ ...prev, [key]: value }))
          }
        />
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
    marginVertical: 8,
  },
  assetsGrid: {
    marginVertical: 8,
  },
});

export default CorrectiveMaintenance;

// import React, { useCallback, useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   TextInput,
//   ActivityIndicator,
//   Alert,
//   ScrollView,
//   Dimensions,
// } from "react-native";
// import {
//   MainLayout,
//   MainButton,
//   DatePickerInput,
//   Dropdown,
// } from "../../../../components";
// import { useRouter, useLocalSearchParams, useFocusEffect } from "expo-router";
// import ArrowLineUpRight from "../../../../assets/images/ArrowLineUpRight.png";
// import api from "../../../../utilities/api";
// import { useDropDown } from "../../../../hooks/useDropDownData";
// import { useLayoutEffect } from "react";
// import CorrectiveMaintenanceLang from "../../../../constants/Lang/Maintenance/WorkOrders/CorrectiveMaintenanceLang";
// import { useGlobalContext } from "../../../../context/GlobalProvider";

// const CorrectiveMaintenance = () => {
//   const {
//     TradeID,
//     DepartmentID,
//     WorkorderID,
//     FailureDescription,
//     WorkorderCode,
//     WorkorderName,
//     WorkorderTypeID,
//     preventCrud,
//     WorkorderTypeName,
//     WorkorderStatusName,
//   } = useLocalSearchParams();

//   const { Lang, Rtl } = useGlobalContext(); // Get the current language from global context
//   const router = useRouter();
//   const [MaintenanceData, setMaintenanceData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [CorrectiveMaintenance, setCorrectiveMaintenance] = useState({
//     DepartmentID: DepartmentID, // Integer
//     WorkorderID: WorkorderID, // Integer
//     FailureID: null, // Integer
//     FailureDescription: "", // String
//     FailureCauseID: null, // Integer
//     FailureCauseDescription: "", // String
//     WorksDone: "", // String
//     PreventionDone: "", // String
//   });

//   const { data: failureCode } = useDropDown(
//     "api_ms_Failure_List",
//     { DepartmentID: DepartmentID },
//     "FailureID",
//     "Failure"
//   );

//   const { data: failureCause } = useDropDown(
//     "api_ms_FailureCause_List",
//     { DepartmentID: DepartmentID },
//     "FailureCauseID",
//     "FailureCause"
//   );

//   const fetchData = useCallback(() => {
//     const fetch = async () => {
//       setLoading(true);
//       try {
//         const response = await api.get(
//           `/table?sp=api_ms_WorkorderInfoCm&WorkorderID=${WorkorderID}&DepartmentID=${DepartmentID}`
//         );
//         setCorrectiveMaintenance({
//           ...response.data.data[0],
//           DepartmentID: DepartmentID,
//           WorkorderID: WorkorderID,
//         });
//       } catch (err) {
//         setError(err.message || "Failed to fetch data");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetch();
//   }, [WorkorderID, DepartmentID]);

//   useEffect(() => {
//     if (WorkorderID && DepartmentID) fetchData();
//   }, [WorkorderID, DepartmentID]);

//   useFocusEffect(fetchData);

//   const handleSave = async () => {
//     if (
//       !CorrectiveMaintenance.FailureCauseDescription ||
//       !CorrectiveMaintenance.FailureCauseID ||
//       !CorrectiveMaintenance.FailureDescription ||
//       !CorrectiveMaintenance.WorksDone ||
//       !CorrectiveMaintenance.PreventionDone
//     ) {
//       Alert.alert(CorrectiveMaintenanceLang.Alerts.MissingFields[Lang]);
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await api.put(
//         `/table?sp=api_ms_WorkorderInfoCm_Update`,
//         CorrectiveMaintenance
//       );
//       Alert.alert(
//         CorrectiveMaintenanceLang.Alerts.SaveSuccess[Lang],
//         "تم حفظ البيانات بنجاح ✅"
//       );
//     } catch (err) {
//       console.error("Error saving data:", err);
//       Alert.alert(
//         CorrectiveMaintenanceLang.Alerts.SaveError[Lang],
//         "فشل الإدخال يرجى المحاولة مرة أخرى"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const [windowWidth, setWindowWidth] = useState(
//     Dimensions.get("window").width
//   );
//   const [width, setWidth] = useState();

//   useEffect(() => {
//     if (windowWidth < 800) {
//       setWidth("w-48"); // Set width to 250 px
//     } else {
//       setWidth("w-[80%]"); // Set width to 80%
//     }
//   }, [windowWidth]);

//   return (
//     <MainLayout title={CorrectiveMaintenanceLang.PageTitle[Lang]} className="">
//       <View className="bg-white h-[100vh] flex flex-col">
//         <View
//           className={`flex flex-col ${
//             Rtl ? "rtl" : "ltr"
//           } bg-[#F6F6F6] rounded-sm p-4 m-4`}
//         >
//           <View
//             className={`flex flex-row ${
//               Rtl ? "flex-row-reverse" : ""
//             } justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}
//           >
//             <Text className="w-[122px] text-base font-tmedium">
//               {CorrectiveMaintenanceLang.WorkOrderDetails.WorkOrderCode[Lang]}
//             </Text>
//             <Text className={`${width} text-base font-tmedium`}>
//               {WorkorderCode}
//             </Text>
//           </View>
//           <View
//             className={`flex flex-row ${
//               Rtl ? "flex-row-reverse" : ""
//             } justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}
//           >
//             <Text className="w-[122px] text-base font-tmedium">
//               {
//                 CorrectiveMaintenanceLang.WorkOrderDetails.WorkOrderDescription[
//                   Lang
//                 ]
//               }
//             </Text>
//             <Text className={`${width} text-base font-tmedium`}>
//               {WorkorderName}
//             </Text>
//           </View>
//           <View
//             className={`flex flex-row ${
//               Rtl ? "flex-row-reverse" : ""
//             } justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}
//           >
//             <Text className="w-[122px] text-base font-tmedium">
//               {CorrectiveMaintenanceLang.WorkOrderDetails.WorkOrderType[Lang]}
//             </Text>
//             <Text className={`${width} text-base font-tmedium`}>
//               {WorkorderTypeName}
//             </Text>
//           </View>
//           <View
//             className={`flex flex-row ${
//               Rtl ? "flex-row-reverse" : ""
//             } justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}
//           >
//             <Text className="w-[122px] text-base pt-1 font-tmedium">
//               {CorrectiveMaintenanceLang.WorkOrderDetails.WorkOrderStatus[Lang]}
//             </Text>
//             <Text className={`${width} text-base font-tmedium`}>
//               {WorkorderStatusName}
//             </Text>
//           </View>
//         </View>

//         {loading ? (
//           <ActivityIndicator size="large" color="#227099" />
//         ) : error ? (
//           <Text>{error}</Text>
//         ) : (
//           <ScrollView className="p-4 pb-36 mb-14 space-y-2">
//             <View className="pb-4">
//               <Text className="text-base font-tmedium font-medium my-2">
//                 {CorrectiveMaintenanceLang.InputFields.FailureCode[Lang]}
//               </Text>
//               <Dropdown
//                 data={failureCode}
//                 onChange={(val) => {
//                   setCorrectiveMaintenance({
//                     ...CorrectiveMaintenance,
//                     FailureID: val,
//                   });
//                 }}
//                 initailOption={CorrectiveMaintenance.FailureID}
//                 value={CorrectiveMaintenance.FailureID}
//                 placeholder={
//                   CorrectiveMaintenanceLang.Placeholders.SelectFailureCode[Lang]
//                 }
//               />
//             </View>
//             <View className="my-4">
//               <Text className="font-tmedium font-medium text-base my-3 px-1">
//                 {CorrectiveMaintenanceLang.InputFields.FailureDescription[Lang]}
//               </Text>
//               <TextInput
//                 className="w-[100%] p-4 font-tmedium border-[#227099] border-[.5px] rounded-md"
//                 placeholder={
//                   CorrectiveMaintenanceLang.Placeholders
//                     .EnterFailureDescription[Lang]
//                 }
//                 value={CorrectiveMaintenance.FailureDescription}
//                 onChangeText={(val) => {
//                   setCorrectiveMaintenance({
//                     ...CorrectiveMaintenance,
//                     FailureDescription: val,
//                   });
//                 }}
//               />
//             </View>
//             <View className="pb-4">
//               <Text className="text-base font-tmedium font-medium my-2">
//                 {CorrectiveMaintenanceLang.InputFields.FailureCauseCode[Lang]}
//               </Text>
//               <Dropdown
//                 data={failureCause}
//                 onChange={(val) => {
//                   setCorrectiveMaintenance({
//                     ...CorrectiveMaintenance,
//                     FailureCauseID: val,
//                   });
//                 }}
//                 initailOption={MaintenanceData.FailureCauseID}
//                 value={MaintenanceData.FailureCauseID}
//                 placeholder={
//                   CorrectiveMaintenanceLang.Placeholders.SelectFailureCauseCode[
//                     Lang
//                   ]
//                 }
//               />
//             </View>
//             <View className="my-4">
//               <Text className="font-tmedium font-medium text-base my-3 px-1">
//                 {
//                   CorrectiveMaintenanceLang.InputFields.FailureCauseDescription[
//                     Lang
//                   ]
//                 }
//               </Text>
//               <TextInput
//                 className="w-[100%] p-4 font-tmedium border-[#227099] border-[.5px] rounded-md"
//                 multiline
//                 numberOfLines={4}
//                 placeholder={
//                   CorrectiveMaintenanceLang.Placeholders
//                     .EnterFailureCauseDescription[Lang]
//                 }
//                 value={CorrectiveMaintenance.FailureCauseDescription}
//                 onChangeText={(val) => {
//                   setCorrectiveMaintenance({
//                     ...CorrectiveMaintenance,
//                     FailureCauseDescription: val,
//                   });
//                 }}
//               />
//             </View>
//             <View className="my-4">
//               <Text className="font-tmedium font-medium text-base my-3 px-1">
//                 {CorrectiveMaintenanceLang.InputFields.WorksDone[Lang]}
//               </Text>
//               <TextInput
//                 className="w-[100%] p-4 font-tmedium border-[#227099] border-[.5px] rounded-md"
//                 multiline
//                 numberOfLines={4}
//                 placeholder={
//                   CorrectiveMaintenanceLang.Placeholders.EnterWorksDone[Lang]
//                 }
//                 value={CorrectiveMaintenance.WorksDone}
//                 onChangeText={(val) => {
//                   setCorrectiveMaintenance({
//                     ...CorrectiveMaintenance,
//                     WorksDone: val,
//                   });
//                 }}
//               />
//             </View>
//             <View className="my-4">
//               <Text className="font-tmedium font-medium text-base my-3 px-1">
//                 {CorrectiveMaintenanceLang.InputFields.PreventionDone[Lang]}
//               </Text>
//               <TextInput
//                 className="w-[100%] p-4 font-tmedium border-[#227099] border-[.5px] rounded-md"
//                 multiline
//                 numberOfLines={4}
//                 onChangeText={(val) => {
//                   setCorrectiveMaintenance({
//                     ...CorrectiveMaintenance,
//                     PreventionDone: val,
//                   });
//                 }}
//                 value={CorrectiveMaintenance.PreventionDone}
//                 placeholder={
//                   CorrectiveMaintenanceLang.Placeholders.EnterPreventionDone[
//                     Lang
//                   ]
//                 }
//               />
//             </View>
//             <View className="py-5">
//               {!loading && preventCrud != "false" ? (
//                 <View>
//                   <MainButton
//                     title={CorrectiveMaintenanceLang.Buttons.Save[Lang]}
//                     icon={ArrowLineUpRight}
//                     handlePress={handleSave}
//                   />
//                 </View>
//               ) : (
//                 <></>
//               )}
//             </View>
//           </ScrollView>
//         )}
//       </View>
//     </MainLayout>
//   );
// };

// export default CorrectiveMaintenance;
