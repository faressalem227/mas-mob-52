import { useCallback } from 'react';
import Toast from 'react-native-toast-message';
import api from '../utilities/api';
import { useRouter } from 'expo-router';

const useTableActions = ({
  selectedRow,
  setSelectedRow,
  setRefetch,
  setData,
  setCode,
  setModalVisible,
  setModelLoader,
  setErrorMessage,
  setErrors,
  setReportFilters,
  company,
}) => {
  const router = useRouter();

  // ✅ Memoized param builder
  const buildParams = useCallback((paramList, row) => {
    return paramList
      .filter((p) => p.name !== 'CompanyID')
      .map((p) => `&${p.name}=${p.rowData ? row[p.value] : p.value}`)
      .join('');
  }, []);

  // ✅ Better Toast show with cleanup
  const showToast = useCallback((type, message) => {
    Toast.hide(); // Clear previous toast before showing a new one
    Toast.show({
      type,
      text1: type === 'success' ? 'عملية ناجحه' : 'حدث خطأ',
      text2: message,
      autoHide: true,
      visibilityTime: 3000,
      text1Style: { textAlign: 'right' },
      text2Style: { textAlign: 'right' },
    });
  }, []);

  // ✅ Reset modal & state
  const closeAndReset = useCallback(() => {
    setModelLoader(false);
    setErrorMessage(false);
    setErrors({});
    setModalVisible(false);
    setSelectedRow(null);
    setRefetch((prev) => prev + 1);
  }, [setModelLoader, setErrorMessage, setErrors, setModalVisible, setSelectedRow, setRefetch]);

  // ✅ Manual cancel
  const cancelModal = useCallback(() => {
    setModalVisible(false);
    setErrors({});
    setSelectedRow(null);
  }, [setModalVisible, setErrors, setSelectedRow]);

  const confirmAction = useCallback(
    async ({
      modalType,
      rowData,
      filters,
      validateFields,
      insRoute,
      spIns,
      spUpd,
      spDel,
      InsParam = [],
      UpdParam = [],
      DelParam = [],
      InsBody = {},
      UpdBody = {},
    }) => {
      try {
        if ((modalType === 'add' || modalType === 'edit') && !validateFields()) return;

        setModelLoader(true);
        let params = '';
        let url = '';

        if (modalType === 'add') {
          params = buildParams(InsParam, selectedRow);

          url = `/${insRoute || 'table'}?sp=${spIns}&CompanyID=${company}${params}`;

          const response = await api.post(url, { ...rowData, ...InsBody });

          setData((prev) => [...prev, response.data]);

          setCode(false);

          showToast('success', 'تمت الاضافة بنجاح ✅');

          closeAndReset();
        } else if (modalType === 'edit') {
          params = buildParams(UpdParam, selectedRow);
          url = `/table?sp=${spUpd}${params}&CompanyID=${company}`;
          await api.put(url, { ...rowData, ...UpdBody });
          showToast('success', 'تم التعديل بنجاح ✅');
          closeAndReset();
        } else if (modalType === 'delete') {
          params = buildParams(DelParam, selectedRow);
          url = `/table?sp=${spDel}${params}&CompanyID=${company}`;
          await api.delete(url);
          showToast('success', 'تم الحذف بنجاح ✅');
          closeAndReset();
        } else if (modalType === 'report') {
          router.navigate({
            pathname: 'ReportsStim',
            params: {
              ReportName: selectedRow.ReportTitle,
              ReportID: selectedRow.ReportID,
              ...filters,
            },
          });
          showToast('success', 'تمت العملية بنجاح ✅');
          closeAndReset();
        }
      } catch (error) {
        console.error(error);
        showToast('error', error?.response?.data?.message || 'حدث خطأ اثناء تنفيذ العمليه ❌');
        setModelLoader(false);
        setModalVisible(false);
      }
    },
    [buildParams, selectedRow, company, router, closeAndReset, showToast]
  );

  return { confirmAction, cancelModal };
};

export default useTableActions;

// import { useState } from "react";
// import Toast from "react-native-toast-message";
// import api from "../utilities/api"; // adjust based on your setup
// import { useRouter } from "expo-router";

// const useTableActions = ({
//   selectedRow,
//   setSelectedRow,
//   setRefetch,
//   setData,
//   setCode,
//   setModalVisible,
//   setModelLoader,
//   setErrorMessage,
//   setErrors,
//   setReportFilters,
//   company,
// }) => {
//   const router = useRouter();

//   const buildParams = (paramList, row) =>
//     paramList
//       .filter((p) => p.name !== "CompanyID")
//       .map((p) => `&${p.name}=${p.rowData ? row[p.value] : p.value}`)
//       .join("");

//   const showToast = (type, message) => {
//     Toast.show({
//       type,
//       text1: type === "success" ? "عملية ناجحه" : "حدث خطأ",
//       text2: message,
//       autoHide: true,
//       visibilityTime: 3000,
//       text1Style: { textAlign: "right" },
//       text2Style: { textAlign: "right" },
//     });
//   };

//   const closeAndReset = () => {
//     setModelLoader(false);
//     setErrorMessage(false);
//     setErrors({});
//     setModalVisible(false);
//     setSelectedRow(null);
//     setRefetch((prev) => prev + 1);
//   };

//   const confirmAction = async ({
//     modalType,
//     rowData,
//     filters,
//     validateFields,
//     insRoute,
//     spIns,
//     spUpd,
//     spDel,
//     InsParam = [],
//     UpdParam = [],
//     DelParam = [],
//     InsBody = {},
//     UpdBody = {},
//   }) => {
//     try {
//       if ((modalType === "add" || modalType === "edit") && !validateFields()) return;

//       setModelLoader(true);
//       let params = "";
//       let url = "";

//       if (modalType === "add") {
//         params = buildParams(InsParam, selectedRow);
//         url = `/${insRoute || "table"}?sp=${spIns}&CompanyID=${company}${params}`;
//         const response = await api.post(url, { ...rowData, ...InsBody });
//         setData((prev) => [...prev, response.data]);
//         setCode(false);
//         showToast("success", "تمت الاضافة بنجاح ✅");
//         closeAndReset();
//       }

//       else if (modalType === "edit") {
//         params = buildParams(UpdParam, selectedRow);
//         url = `/table?sp=${spUpd}${params}&CompanyID=${company}`;
//         await api.put(url, { ...rowData, ...UpdBody });
//         showToast("success", "تم التعديل بنجاح ✅");
//         closeAndReset();
//       }

//       else if (modalType === "delete") {
//         params = buildParams(DelParam, selectedRow);
//         url = `/table?sp=${spDel}${params}&CompanyID=${company}`;
//         await api.delete(url);
//         showToast("success", "تم الحذف بنجاح ✅");
//         closeAndReset();
//       }

//       else if (modalType === "report") {
//         router.navigate({
//           pathname: "ReportsStim",
//           params: {
//             ReportName: selectedRow.ReportTitle,
//             ReportID: selectedRow.ReportID,
//             ...filters,
//           },
//         });
//         showToast("success", "تمت العملية بنجاح ✅");
//         closeAndReset();
//       }
//     } catch (error) {
//       console.error(error);
//       showToast(
//         "error",
//         error?.response?.data?.message || "حدث خطأ اثناء تنفيذ العمليه ❌"
//       );
//       setModelLoader(false);
//       setModalVisible(false);
//     }
//   };

//   return { confirmAction };
// };

// export default useTableActions;
// import { useCallback } from 'react';
// import Toast from 'react-native-toast-message';
// import api from '../utilities/api';
// import { useRouter } from 'expo-router';

// const useTableActions = ({
//   selectedRow,
//   setSelectedRow,
//   setRefreshing,
//   setRefetch,
//   setData,
//   setCode,
//   setModalVisible,
//   setModelLoader,
//   setErrorMessage,
//   setErrors,
//   setReportFilters,
//   company,
// }) => {
//   const router = useRouter();

//   // ✅ Memoized param builder
//   const buildParams = useCallback((paramList, row) => {
//     return paramList
//       .filter((p) => p.name !== 'CompanyID')
//       .map((p) => `&${p.name}=${p.rowData ? row[p.value] : p.value}`)
//       .join('');
//   }, []);

//   // ✅ Better Toast show with cleanup
//   const showToast = useCallback((type, message) => {
//     Toast.hide(); // Clear previous toast before showing a new one
//     Toast.show({
//       type,
//       text1: type === 'success' ? 'عملية ناجحه' : 'حدث خطأ',
//       text2: message,
//       autoHide: true,
//       visibilityTime: 3000,
//       text1Style: { textAlign: 'right' },
//       text2Style: { textAlign: 'right' },
//     });
//   }, []);

//   // ✅ Reset modal & state
//   const closeAndReset = useCallback(() => {
//     setModelLoader(false);
//     setErrorMessage(false);
//     setRefreshing(true);
//     setErrors({});
//     setModalVisible(false);
//     setSelectedRow(null);
//     // setRefetch((prev) => prev + 1);
//   }, [
//     setModelLoader,
//     setErrorMessage,
//     setErrors,
//     setModalVisible,
//     setSelectedRow,
//     // setRefetch,
//     setRefreshing,
//   ]);

//   // ✅ Manual cancel
//   const cancelModal = useCallback(() => {
//     setModalVisible(false);
//     setErrors({});
//     setSelectedRow(null);
//   }, [setModalVisible, setErrors, setSelectedRow]);

//   const confirmAction = useCallback(
//     async ({
//       modalType,
//       rowData,
//       filters,
//       validateFields,
//       insRoute,
//       spIns,
//       spUpd,
//       spDel,
//       InsParam = [],
//       UpdParam = [],
//       DelParam = [],
//       InsBody = {},
//       UpdBody = {},
//     }) => {
//       try {
//         if ((modalType === 'add' || modalType === 'edit') && !validateFields()) return;

//         setModelLoader(true);
//         let params = '';
//         let url = '';

//         if (modalType === 'add') {
//           params = buildParams(InsParam, selectedRow);
//           url = `/${insRoute || 'table'}?sp=${spIns}&CompanyID=${company}${params}`;
//           const response = await api.post(url, { ...rowData, ...InsBody });
//           setData((prev) => [...prev, response.data]);
//           setCode(false);
//           showToast('success', 'تمت الاضافة بنجاح ✅');
//           closeAndReset();
//         } else if (modalType === 'edit') {
//           params = buildParams(UpdParam, selectedRow);
//           url = `/table?sp=${spUpd}${params}&CompanyID=${company}`;
//           await api.put(url, { ...rowData, ...UpdBody });
//           showToast('success', 'تم التعديل بنجاح ✅');
//           closeAndReset();
//         } else if (modalType === 'delete') {
//           console.log('selectedRow in table Actions:', selectedRow);
//           console.log('DelParam:', DelParam);
//           console.log('rowData (should be null in delete):', rowData);
//           if (!selectedRow) {
//             selectedRow = rowData;
//           }
//           console.log('selectedRow in table Actions2:', selectedRow);
//           params = buildParams(DelParam, selectedRow);
//           url = `/table?sp=${spDel}${params}&CompanyID=${company}`;
//           await api.delete(url);
//           showToast('success', 'تم الحذف بنجاح ✅');
//           closeAndReset();
//         } else if (modalType === 'report') {
//           router.navigate({
//             pathname: 'ReportsStim',
//             params: {
//               ReportName: selectedRow.ReportTitle,
//               ReportID: selectedRow.ReportID,
//               ...filters,
//             },
//           });
//           showToast('success', 'تمت العملية بنجاح ✅');
//           closeAndReset();
//         }
//         setRefetch((prev) => prev + 1);
//         setRefreshing(true);
//       } catch (error) {
//         console.error(error);
//         showToast('error', error?.response?.data?.message || 'حدث خطأ اثناء تنفيذ العمليه ❌');
//         setModelLoader(false);
//         setModalVisible(false);
//       } finally {
//         setRefreshing(false);
//       }
//     },
//     [buildParams, selectedRow, company, router, closeAndReset, showToast, setRefetch]
//   );

//   return { confirmAction, cancelModal };
// };

// export default useTableActions;

// // import { useState } from "react";
// // import Toast from "react-native-toast-message";
// // import api from "../utilities/api"; // adjust based on your setup
// // import { useRouter } from "expo-router";

// // const useTableActions = ({
// //   selectedRow,
// //   setSelectedRow,
// //   setRefetch,
// //   setData,
// //   setCode,
// //   setModalVisible,
// //   setModelLoader,
// //   setErrorMessage,
// //   setErrors,
// //   setReportFilters,
// //   company,
// // }) => {
// //   const router = useRouter();

// //   const buildParams = (paramList, row) =>
// //     paramList
// //       .filter((p) => p.name !== "CompanyID")
// //       .map((p) => `&${p.name}=${p.rowData ? row[p.value] : p.value}`)
// //       .join("");

// //   const showToast = (type, message) => {
// //     Toast.show({
// //       type,
// //       text1: type === "success" ? "عملية ناجحه" : "حدث خطأ",
// //       text2: message,
// //       autoHide: true,
// //       visibilityTime: 3000,
// //       text1Style: { textAlign: "right" },
// //       text2Style: { textAlign: "right" },
// //     });
// //   };

// //   const closeAndReset = () => {
// //     setModelLoader(false);
// //     setErrorMessage(false);
// //     setErrors({});
// //     setModalVisible(false);
// //     setSelectedRow(null);
// //     setRefetch((prev) => prev + 1);
// //   };

// //   const confirmAction = async ({
// //     modalType,
// //     rowData,
// //     filters,
// //     validateFields,
// //     insRoute,
// //     spIns,
// //     spUpd,
// //     spDel,
// //     InsParam = [],
// //     UpdParam = [],
// //     DelParam = [],
// //     InsBody = {},
// //     UpdBody = {},
// //   }) => {
// //     try {
// //       if ((modalType === "add" || modalType === "edit") && !validateFields()) return;

// //       setModelLoader(true);
// //       let params = "";
// //       let url = "";

// //       if (modalType === "add") {
// //         params = buildParams(InsParam, selectedRow);
// //         url = `/${insRoute || "table"}?sp=${spIns}&CompanyID=${company}${params}`;
// //         const response = await api.post(url, { ...rowData, ...InsBody });
// //         setData((prev) => [...prev, response.data]);
// //         setCode(false);
// //         showToast("success", "تمت الاضافة بنجاح ✅");
// //         closeAndReset();
// //       }

// //       else if (modalType === "edit") {
// //         params = buildParams(UpdParam, selectedRow);
// //         url = `/table?sp=${spUpd}${params}&CompanyID=${company}`;
// //         await api.put(url, { ...rowData, ...UpdBody });
// //         showToast("success", "تم التعديل بنجاح ✅");
// //         closeAndReset();
// //       }

// //       else if (modalType === "delete") {
// //         params = buildParams(DelParam, selectedRow);
// //         url = `/table?sp=${spDel}${params}&CompanyID=${company}`;
// //         await api.delete(url);
// //         showToast("success", "تم الحذف بنجاح ✅");
// //         closeAndReset();
// //       }

// //       else if (modalType === "report") {
// //         router.navigate({
// //           pathname: "ReportsStim",
// //           params: {
// //             ReportName: selectedRow.ReportTitle,
// //             ReportID: selectedRow.ReportID,
// //             ...filters,
// //           },
// //         });
// //         showToast("success", "تمت العملية بنجاح ✅");
// //         closeAndReset();
// //       }
// //     } catch (error) {
// //       console.error(error);
// //       showToast(
// //         "error",
// //         error?.response?.data?.message || "حدث خطأ اثناء تنفيذ العمليه ❌"
// //       );
// //       setModelLoader(false);
// //       setModalVisible(false);
// //     }
// //   };

// //   return { confirmAction };
// // };

// // export default useTableActions;
