import { useCallback } from 'react';

export const useModalManager = ({ setModalVisible, setModalType, setRowData, showErrorToast }) => {
  const openModal = useCallback(
    (type, data = null) => {
      if (!data && type !== 'add') {
        showErrorToast('من فضلك اختر صف لاستكمال العمليه');
        return;
      }

      if (data) setRowData(data);
      setModalType(type);
      setModalVisible(true);
    },
    [setModalVisible, setModalType, setRowData, showErrorToast]
  );

  return { openModal };
};
// import { useCallback } from "react";

// export const useModalManager = ({
//   setModalVisible,
//   setModalType,
//   setRowData,
//   showErrorToast,

// }) => {
//   const openModal = useCallback((type, data = null) => {
//     if (!data && type !== "add") {
//       showErrorToast("من فضلك اختر صف لاستكمال العمليه");
//       return;
//     }

//     if (data) setRowData(data);
//         console.log("selected Row in openModal",data)

//     setModalType(type);
//     setModalVisible(true);
//   }, [setModalVisible, setModalType, setRowData, showErrorToast]);

//   return { openModal };
// };
