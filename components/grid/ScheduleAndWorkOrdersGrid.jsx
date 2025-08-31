import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  Alert,
  Dimensions,
  TouchableOpacity,
  Modal,
  Text,
  Image,
  TouchableWithoutFeedback,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { Table, Row } from 'react-native-table-component';
import Done from '../../assets/images/Done.png';
import { CustomButton, MainButton, CheckBox, DatePickerInput, Dropdown } from '../index';
import PencilLine from '../../assets/images/PencilLine.png';
import add_outline from '../../assets/images/add_outline.png';
import trashh from '../../assets/images/trashh.png';
import Warning from '../../assets/images/Warning.png';
import ArrowLineUpRight from '../../assets/images/ArrowLineUpRight.png';
import api from '../../utilities/api';
import { useRouter } from 'expo-router';
import { HandleDropdownFormat } from '../../hooks/useDropDownData';
import { useGlobalContext } from '../../context/GlobalProvider';
import ScheduleAndWorkOrdersLang from '../../constants/Lang/Maintenance/PreventiveMaintenanceHome/SchedulePreventiveMaintenance/ScheduleAndWorkOrders';

// import { Picker } from "react-native-web";
const ScheduleAndWorkOrdersGrid = ({ DepartmentID, ScheduleID, NoOfYears }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const router = useRouter();
  const [materialClasses, setMaterialClasses] = useState([]);
  const [modelLoader, setModelLoader] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [selectedMaterialClassID, setSelectedMaterialClassID] = useState(null);
  const [Materials, setMaterials] = useState([]);
  const [Asset, setAsset] = useState({});
  const [refetch, setRefetch] = useState(0);
  const { Lang } = useGlobalContext();

  console.log(data);
  useEffect(() => {
    if (DepartmentID && NoOfYears) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await api.get(
            `/table?sp=ms_Schedule_Details_Trx2&DepartmentID=${DepartmentID}&ScheduleID=${ScheduleID}&NoOfYears=${NoOfYears}`
          );
          setData(response.data.data);
        } catch (err) {
          setError(err?.response?.data?.message || 'Failed to fetch data');
        } finally {
          setTimeout(() => {
            setLoading(false);
          }, 200);
        }
      };
      fetchData();
    }
  }, [DepartmentID, NoOfYears, refetch]);
  const tableHead = [
    {
      key: 'ScheduleDetailsID',
      label: '',
      type: '',
      input: 'false',
      visible: 'false',
    },
    {
      key: 'WorkorderID',
      label: ScheduleAndWorkOrdersLang.WorkorderID[Lang],
      type: '',
      input: 'true',
      visible: 'true',
    },
    {
      key: 'PlannedStartDate',
      label: ScheduleAndWorkOrdersLang.PlannedStartDate[Lang],
      type: 'date',
      input: 'true',
      visible: 'true',
    },
    {
      key: 'PlannedEndDate',
      label: ScheduleAndWorkOrdersLang.PlannedEndDate[Lang],
      type: 'date',
      input: 'true',
      visible: 'true',
    },
  ];
  const screenWidth = Dimensions.get('window').width;

  // Filter the table headers based on the 'visible' property
  const filteredTableHead = tableHead.filter((header) => header.visible === 'true');

  // Create state with only visible headers
  const state = {
    tableHead: filteredTableHead.map((col) => col.label), // Map visible headers to their labels
  };

  const scrollViewRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      //console.log("ScrollView Ref:", scrollViewRef.current); // Debugging
      if (scrollViewRef.current) {
        scrollViewRef.current?.scrollToEnd({ animated: false });
      }
    }, 50); // Delay by 100ms to allow rendering
    setLoading(false);
    return () => clearTimeout(timeout); // Cleanup timeout
  }, [scrollViewRef, data]);

  // Create static WidthArr from the 'width' property
  const dynamicWidthArr = filteredTableHead.map(() => screenWidth / filteredTableHead.length);
  const [error, setError] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [lastClickTime, setLastClickTime] = useState(0);

  // Modal states
  const [modalType, setModalType] = useState(''); // "add", "edit", or "delete"
  const [rowData, setRowData] = useState(Object.fromEntries(tableHead.map((col) => [col.key, ''])));

  const handleRowPress = (row, index) => {
    setSelectedRow(row);
  };

  const handleAdd = async () => {
    setRowData(Object.fromEntries(tableHead.map((col) => [col.key, ''])));
    setModelLoader(true);

    const response = await api.post(
      `table?sp=ms_sp_pm_GenerateTimeLineOneYear&DepartmentID=${DepartmentID}&ScheduleID=${ScheduleID}&NoOfYears=${NoOfYears}`
    );

    //console.log("api_ms_sp_pm_GenerateTimeLineOneYear", response);
    setModelLoader(false);

    setModalType('success');
    setModalVisible(true); // Show the modal only on success

    // Set a timeout to hide the modal after 1 second
    setTimeout(() => {
      setModalVisible(false);
    }, 1000); // 1000 milliseconds = 1 second

    setRefetch((prev) => prev + 1);
  };

  const handleEdit = () => {
    if (selectedRow !== null) {
      setRowData(selectedRow);
      setModalType('edit');
      setModalVisible(true);
    } else {
      Alert.alert(ScheduleAndWorkOrdersLang.SelectEdit[Lang]);
    }
  };

  const handleDelete = () => {
    if (selectedRow !== null) {
      setRowData(selectedRow);
      setModalType('delete');
      setModalVisible(true);
    } else {
      Alert.alert(ScheduleAndWorkOrdersLang.SelectDel[Lang]);
    }
  };

  const confirmAction = async () => {
    try {
      if (modalType === 'add') {
        setModelLoader(true);
        const response = await api.post(
          `table?sp=api_ms_sp_pm_GenerateTimeLineOneYear&DepartmentID=${DepartmentID}&ScheduleID=${ScheduleID}&NoOfYears=${NoOfYears}`
        );
        //console.log("api_ms_sp_pm_GenerateTimeLineOneYear", response);
        setModelLoader(false);
        setModalType('success');
        setModalVisible(true); // Show the modal only on success
        setRefetch((prev) => prev + 1);
      } else if (modalType === 'delete') {
        setModelLoader(true);
        //console.log(rowData, "DELETE");
        const url = `/table?sp=api_ms_Schedule_Details_Del&DepartmentID=${DepartmentID}&ScheduleDetailsID=${rowData.ScheduleDetailsID}`;
        //console.log(url, "hhhhhhhhhhhhhhhhhhhhhhhhhhh");

        await api.delete(url);
        setModelLoader(false);
        setRefetch((prev) => prev + 1);
        setSelectedRow(null);
      }
      setModalVisible(false);
    } catch (error) {
      console.error(error);
      Alert.alert(ScheduleAndWorkOrdersLang.Error[Lang], ScheduleAndWorkOrdersLang.Error2[Lang]);
    }
  };

  const handleInputChange = (key, value) => {
    setRowData((prevData) => ({ ...prevData, [key]: value }));
  };

  const renderInput = (key, type, value, options = []) => {
    switch (type) {
      case 'number':
        return (
          <TextInput
            className="h-14 w-full rounded-lg border-[.5px] border-[#1C5B7D]  p-4 text-right font-tmedium text-sm font-medium focus:border-[#133e5475]"
            keyboardType="numeric"
            value={value}
            onChangeText={(text) => handleInputChange(key, text)}
          />
        );

      case 'text':
        return (
          <TextInput
            className="h-14 w-full rounded-lg border-[.5px] border-[#1C5B7D]  p-4 text-right font-tmedium text-sm font-medium focus:border-[#133e5475] "
            multiline
            numberOfLines={4}
            value={value}
            onChangeText={(text) => handleInputChange(key, text)}
          />
        );
      case 'dropdown':
        if (key === 'MaterialClassID') {
          return (
            <Dropdown
              onChange={(selectedValue) => {
                handleInputChange(key, selectedValue);
                setSelectedMaterialClassID(selectedValue); // Update state for MaterialClassID
                fetchMaterialDropdownData(selectedValue); // Fetch materials based on selected class
              }}
              data={materialClasses} // Assuming materialClasses is populated
              placeholder={ScheduleAndWorkOrdersLang.Select[Lang]}
              initailOption={value} // Set initial option if needed
              value={value} // Controlled value for the dropdown
              inputName="MaterialClassID" // Use the key as input name
            />
          );
        } else if (key === 'MaterialID') {
          return (
            <Dropdown
              onChange={(selectedValue) => {
                handleInputChange(key, selectedValue);
                // Additional logic for MaterialID if needed
              }}
              data={Materials} // Assuming Materials is populated
              placeholder={ScheduleAndWorkOrdersLang.Select[Lang]}
              initailOption={null} // Set initial option if needed
              defaultOption={null} // Set a default option if needed
              value={value} // Controlled value for the dropdown
              inputName="MaterialID" // Use the key as input name
            />
          );
        }
        // Default case for other dropdowns
        return (
          <Dropdown
            onChange={(selectedValue) => handleInputChange(key, selectedValue)}
            data={options} // Pass any other options
            placeholder={ScheduleAndWorkOrdersLang.Select[Lang]}
            initailOption={null} // Set initial option if needed
            defaultOption={null} // Set a default option if needed
            value={value} // Controlled value for the dropdown
            inputName={key} // Unique identifier
          />
        );
      case 'date':
        return <DatePickerInput setDate={(Value) => handleInputChange(key, Value)} />;
      case 'checkbox':
        return (
          <CheckBox
            value={value}
            isEditable={true}
            onChange={(Value) => handleInputChange(key, Value)}
          />
        );
      default:
        return (
          <TextInput
            className="h-14 w-full rounded-lg border-[.5px] border-[#1C5B7D]  p-4 text-right font-tmedium text-sm font-medium focus:border-[#133e5475]"
            value={value}
            onChangeText={(text) => handleInputChange(key, text)}
          />
        );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View className="flex flex-col" dir="rtl">
        <View style={styles.buttonContainer}>
          <CustomButton
            Icon={add_outline}
            title={ScheduleAndWorkOrdersLang.CreateSchedule[Lang]}
            onPress={handleAdd}
          />
          <CustomButton
            Icon={trashh}
            title={ScheduleAndWorkOrdersLang.Del[Lang]}
            onPress={handleDelete}
          />
        </View>
      </View>

      {loading && refetch == 0 ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={{ textAlign: 'center', color: 'red' }}>{error}</Text>
      ) : (
        <ScrollView horizontal={true} ref={scrollViewRef}>
          <View className="mb-16">
            <Table>
              <Row
                className="flex flex-row-reverse font-tbold text-base font-bold"
                data={state.tableHead} // Visible headers
                widthArr={dynamicWidthArr} // Dynamic widths
                style={styles.head}
                textStyle={styles.text}
              />
            </Table>
            <ScrollView>
              <Table>
                {data.map((dataRow, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      handleRowPress(dataRow, index);
                    }}>
                    <Row
                      className="flex flex-row-reverse py-2"
                      style={[
                        styles.row,
                        index % 2 === 0
                          ? { backgroundColor: '#ffffff' }
                          : { backgroundColor: '#f9f9f9' },
                        selectedRow?.ScheduleDetailsID === dataRow?.ScheduleDetailsID && {
                          backgroundColor: '#E4EDF2',
                        },
                      ]}
                      textStyle={styles.text}
                      widthArr={dynamicWidthArr} // Dynamic widths
                      data={filteredTableHead.map((col, idx) => {
                        const item = dataRow[col.key]; // Get the corresponding column data
                        if (col?.type === 'checkbox') {
                          // Return JSX inside a wrapper for checkbox columns
                          return (
                            <View
                              key={idx}
                              style={{
                                width: dynamicWidthArr[idx], // Set width for each column
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <CheckBox
                                value={item}
                                isEditable={false}
                                onChange={(newValue) => {}}
                              />
                            </View>
                          );
                        } else {
                          // Return plain text for other column types
                          return (
                            <Text
                              key={idx}
                              style={[
                                styles.text,
                                {
                                  width: dynamicWidthArr[idx],
                                  textAlign: 'center',
                                },
                              ]}>
                              {col.type === 'date' ? item?.split('T')[0] : item}
                            </Text>
                          );
                        }
                      })}
                    />
                  </TouchableOpacity>
                ))}
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      )}

      {/* Modal */}
      <Modal animationType="fade" visible={modalVisible} transparent={true}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay} dir={'rtl'}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                {modalType === 'success' ? (
                  <View className="py-4 text-center">
                    <Image source={Done} className="mx-auto h-10 w-10" />
                    <Text className="mt-9 text-center font-tbold text-base">
                      {ScheduleAndWorkOrdersLang.CreateScheduleSuccess[Lang]}{' '}
                    </Text>
                  </View>
                ) : modalType === 'delete' ? (
                  // Existing delete confirmation modal
                  <View className="text-center">
                    <Image source={Warning} className="mx-auto h-16 w-16" />
                    <Text className="text-center font-tbold">
                      {ScheduleAndWorkOrdersLang.DelSchedule[Lang]}
                    </Text>
                    <Text className="text-center font-tmedium">
                      {ScheduleAndWorkOrdersLang.DelSchedule1[Lang]}
                    </Text>
                    <View className="mt-4 flex flex-row justify-center">
                      <TouchableOpacity
                        className="mx-2 flex w-[69px] flex-row items-center justify-center rounded-md border-[.5px] border-[#133E54] bg-none px-4 py-2"
                        onPress={() => setModalVisible(false)}>
                        <Text className="font-tbold text-[#133E54]">
                          {ScheduleAndWorkOrdersLang.cancellation[Lang]}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        className="mx-2 flex w-[69px] flex-row items-center justify-center rounded-md bg-[#F15555]"
                        onPress={confirmAction}>
                        <Text className="font-tbold text-white">
                          {ScheduleAndWorkOrdersLang.Del[Lang]}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : null}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

const styles = {
  buttonContainer: {
    flexDirection: 'row-reverse',
    marginBottom: 16,
  },
  head: {
    height: 50,
    backgroundColor: '#F6F6F6',
  },
  text: {
    textAlign: 'center',
    fontFamily: 'Tajawal-Medium',
    fontSize: 16,
  },
  row: {
    height: 'fit-contant',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
  },
  inputContainer: {
    marginBottom: 10,
    width: '100%',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  warningImage: {
    width: 50,
    height: 50,
    marginBottom: 20,
  },
  warningText: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
};

export default ScheduleAndWorkOrdersGrid;

// import React, { useState, useEffect, useCallback, useRef } from "react";
// import {
//   View,
//   ScrollView,
//   SafeAreaView,
//   Alert,
//   Dimensions,
//   TouchableOpacity,
//   Modal,
//   Text,
//   Image,
//   TouchableWithoutFeedback,
//   TextInput,
//   ActivityIndicator,
// } from "react-native";
// import { Table, Row } from "react-native-table-component";
// import {
//   CustomButton,
//   MainButton,
//   CheckBox,
//   DatePickerInput,
//   Dropdown,
// } from "../index";
// import Done from "../../assets/images/Done.png";
// import add_outline from "../../assets/images/add_outline.png";
// import trashh from "../../assets/images/trashh.png";
// import Warning from "../../assets/images/Warning.png";
// import ArrowLineUpRight from "../../assets/images/ArrowLineUpRight.png";
// import api from "../../utilities/api";
// import { useRouter } from "expo-router";
// import { HandleDropdownFormat } from "../../hooks/useDropDownData";

// const ScheduleAndWorkOrdersGrid = ({ LocationID, ScheduleID, NoOfYears }) => {
//   // const [ContractorsData, setContractorsData] = useState([]);
//   const [SchedualAndWorkOrderList, setSchedualAndWorkOrderList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [refetch, setRefetch] = useState(0);
//   const [selectedRow, setSelectedRow] = useState(null);

//   // Modal states
//   const [modalVisible, setModalVisible] = useState(false);
//   const [modalType, setModalType] = useState(""); // "add", "edit", or "delete"
//   const [rowData, setRowData] = useState({});
//   const [modelLoader, setModelLoader] = useState(false);
//   const lastClickTime = useRef(0);
//   const router = useRouter();
//   const tableHead = [
// {
//   key: "ScheduleDetailsID",
//   label: "  ",
//   type: "",
//   input: "true",
//   visible: "false",
// },
// {
//   key: "WorkorderCode",
//   label: "  رقم امر الشغل",
//   type: "dropdown",
//   input: "true",
//   visible: "true",
// },
// {
//   key: "PlannedStartDate",
//   label: " تاريخ بدء مخطط ",
//   type: "date",
//   input: "true",
//   visible: "true",
// },
// {
//   key: "PlannedEndDate",
//   label: "تاريخ نهو مخطط  ",
//   type: "date",

//   input: "true",
//   visible: "true",
// },
//   ];

// const screenWidth = Dimensions.get("window").width;
//   const filteredTableHead = tableHead.filter(
//     (header) => header.visible === "true"
//   );
//   const dynamicWidthArr = filteredTableHead.map(
//     () => screenWidth / filteredTableHead.length
//   );
//   const state = {
//     tableHead: filteredTableHead.map((col) => col.label), // Map visible headers to their labels
//   };

//   const fetchDropdownData = useCallback(async () => {
//     if (LocationID && NoOfYears) {
//       try {
//         //console.log("Fetching data for LocationID:", LocationID);
//         setLoading(true);

//         // Fetch API response
//         const response = await api.get(
// `/table?sp=api_ms_Schedule_Details_Trx2&LocationID=${LocationID}&ScheduleID=99&NoOfYears=${NoOfYears}`
//         );

//         //console.log("Full API Response:", response);
//         const List = response?.data?.data || [];

//         // Ensure response is an array
//         if (Array.isArray(List)) {
//           setSchedualAndWorkOrderList(List);
//         } else {
//           console.error("Expected List to be an array, but got:", List);
//           setSchedualAndWorkOrderList([]); // Fallback to empty array
//         }
//       } catch (err) {
//         console.error(
//           "Error fetching dropdown data:",
//           err.response ? err.response.data : err.message
//         );
//       } finally {
//         setLoading(false);
//       }
//     } else {
//       console.warn("LocationID is undefined or invalid.");
//     }
//   }, [LocationID, NoOfYears]);

//   useEffect(() => {
//     fetchDropdownData();
//   }, [fetchDropdownData]);

//   const handleRowPress = (row, index) => {
//     setSelectedRow(index);
//   };

//   // const handleAdd = () => {
//   //   setRowData(Object.fromEntries(tableHead.map((col) => [col.key, ""])));
//   //   setModalType("add");
//   //   setModalVisible(true);
//   // };
//   const handleAdd = () => {
//     // Set default data for adding a new entry
//     setRowData(Object.fromEntries(tableHead.map((col) => [col.key, ""])));
//     setModalType("add"); // Set modal type to "add"
//   };
//   const handleEdit = () => {
//     if (selectedRow !== null) {
//       setRowData(SchedualAndWorkOrderList[selectedRow]);
//       setModalType("edit");
//       setModalVisible(true);
//     } else {
//       Alert.alert("Please select a row to edit.");
//     }
//   };

//   const handleDelete = () => {
//     if (selectedRow !== null) {
//       setModalType("delete");
//       setModalVisible(true);
//     } else {
//       Alert.alert("Please select a row to delete.");
//     }
//   };

//   const confirmAction = async () => {
//     try {
//       setModelLoader(true);
//       if (modalType === "add") {
//         // Send new row data to the API
//         const response = await api.post(
// `table?sp=api_ms_sp_pm_GenerateTimeLineOneYear&LocationID=5&ScheduleID=99&NoOfYears=${NoOfYears}`,
//           rowData // Assuming `rowData` contains the new row's details
//         );

//         // Update the table data with the new entry
//         const newEntry = response.data;
//         setSchedualAndWorkOrderList((prevData) => [...prevData, newEntry]);

//         // Show modal on success
//         setModalType("success"); // Change modal type to display success message
//         setModalVisible(true); // Show the modal only on success
//       } else if (modalType === "delete") {
//         // Delete logic
//         await api.delete(
//           `/table?sp=api_ms_Schedule_Details_Del&LocationID=5&ScheduleDetailsID=${rowData.ScheduleDetailsID}`
//         );
//         setSchedualAndWorkOrderList((prevData) =>
//           prevData.filter((_, index) => index !== selectedRow)
//         );
//         setSelectedRow(null);
//         setModalType("success"); // Change modal type to display success message
//         setModalVisible(true); // Show the modal only on success
//       }
//     } catch (error) {
//       console.error("Error in confirmAction:", error);
//       Alert.alert("Error", "Something went wrong. Please try again.");
//     } finally {
//       setModelLoader(false);
//     }
//   };

//   // const confirmAction = async () => {
//   //   try {
//   //     //console.log(rowData);
//   //     if (modalType === "add") {
//   //       setModelLoader(true);
//   //       const response = await api.post(`table?sp=api_ms_sp_pm_GenerateTimeLineOneYear&LocationID=${LocationID}&ScheduleID=99&NoOfYears=${NoOfYears}`);
// setModelLoader(false);
//   //       setRefetch((prev) => prev + 1);
//   //       setSchedualAndWorkOrderList((prevData) => [...prevData, response.data]);

//   //     } else if (modalType === "delete") {
//   //       setModelLoader(true);
//   //       await api.delete(
//   //         `/table?sp=api_ms_Schedule_Details_Del&LocationID=5&ScheduleDetailsID=${rowData.ScheduleDetailsID}`
//   //       );
//   //       setModelLoader(false);
//   //       setRefetch((prev) => prev + 1);
//   //       setSchedualAndWorkOrderList((prevData) =>
//   //         prevData.filter((_, index) => index !== selectedRow)
//   //       );
//   //       setSelectedRow(null);
//   //     }
//   //     setModalVisible(false);
//   //   } catch (error) {
//   //     console.error(error);
//   //     Alert.alert("Error", "Something went wrong. Please try again.");
//   //   }
//   // };

//   const handleInputChange = (key, value) => {
//     setRowData((prevData) => ({ ...prevData, [key]: value }));
//   };

//   const renderInput = (key, type, value, options = []) => {
//     switch (type) {
//       case "number":
//         return (
//           <TextInput
//             className="w-full text-sm font-tmedium font-medium h-14 border-[.5px] border-[#1C5B7D] rounded-lg p-4 text-right focus:border-[#133e5475]"
//             keyboardType="numeric"
//             value={value}
//             onChangeText={(text) => handleInputChange(key, text)}
//           />
//         );

//       case "text":
//         return (
//           <TextInput
//             className="w-full text-sm font-tmedium font-medium h-14 border-[.5px] border-[#1C5B7D] rounded-lg p-4 text-right focus:border-[#133e5475] "
//             multiline
//             numberOfLines={4}
//             value={value}
//             onChangeText={(text) => handleInputChange(key, text)}
//           />
//         );
//       case "dropdown":
//         return (
//           <Dropdown
//             onChange={(Value) => handleInputChange(key, Value)}
//             data={options}
//             placeholder={""}
//             initailOption={rowData[key]}
//           />
//         );
//       case "date":
//         return (
//           <DatePickerInput setDate={(Value) => handleInputChange(key, Value)} />
//         );
//       case "checkbox":
//         return (
//           <CheckBox
//             value={value}
//             isEditable={true}
//             onChange={(Value) => handleInputChange(key, Value)}
//           />
//         );
//       default:
//         return (
//           <TextInput
//             className="w-full text-sm font-tmedium font-medium h-14 border-[.5px] border-[#1C5B7D] rounded-lg p-4 text-right focus:border-[#133e5475]"
//             value={value}
//             onChangeText={(text) => handleInputChange(key, text)}
//           />
//         );
//     }
//   };

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
//       <View style={styles.buttonContainer}>
//         <CustomButton
//           Icon={add_outline}
//           title="انشاء جدول زمني"
//           onPress={handleAdd}
//         />
//         <CustomButton Icon={trashh} title="حذف" onPress={handleDelete} />
//       </View>

//       <ScrollView horizontal={true}>
//         <View className="mb-16">
//           <Table>
//             <Row
//               className="flex flex-row-reverse text-base font-tbold font-bold"
//               data={state.tableHead} // Visible headers
//               widthArr={dynamicWidthArr} // Dynamic widths
//               style={styles.head}
//               textStyle={styles.text}
//             />
//           </Table>
//           <ScrollView>
//             <Table>
//               {SchedualAndWorkOrderList.map((dataRow, index) => (
//                 <TouchableOpacity
//                   key={index}
//                   onPress={() => {
//                     handleRowPress(dataRow, index);
//                   }}
//                 >
//                   <Row
//                     className="flex flex-row-reverse py-2"
//                     style={[
//                       styles.row,
//                       index % 2 === 0
//                         ? { backgroundColor: "#ffffff" }
//                         : { backgroundColor: "#f9f9f9" },
//                       selectedRow == index && { backgroundColor: "#E4EDF2" },
//                     ]}
//                     textStyle={styles.text}
//                     widthArr={dynamicWidthArr} // Dynamic widths
//                     data={filteredTableHead.map((col, idx) => {
//                       const item = dataRow[col.key]; // Get the corresponding column data
//                       if (col?.type === "checkbox") {
//                         // Return JSX inside a wrapper for checkbox columns
//                         return (
//                           <View
//                             key={idx}
//                             style={{
//                               width: dynamicWidthArr[idx], // Set width for each column
//                               justifyContent: "center",
//                               alignItems: "center",
//                             }}
//                           >
//                             <CheckBox
//                               value={item}
//                               isEditable={false}
//                               onChange={(newValue) => {}}
//                             />
//                           </View>
//                         );
//                       } else if (col?.type === "date") {
//                         // Return JSX inside a wrapper for checkbox columns
//                         return (
//                           <View
//                             key={idx}
//                             style={{
//                               width: dynamicWidthArr[idx], // Set width for each column
//                               justifyContent: "center",
//                               alignItems: "center",
//                             }}
//                           >
//                             <Text>{item?.split("T")[0]}</Text>
//                           </View>
//                         );
//                       } else {
//                         // Return plain text for other column types
//                         return (
//                           <Text
//                             key={idx}
//                             style={[
//                               styles.text,
//                               {
//                                 width: dynamicWidthArr[idx],
//                                 textAlign: "center",
//                               },
//                             ]}
//                           >
//                             {item}
//                           </Text>
//                         );
//                       }
//                     })}
//                   />
//                 </TouchableOpacity>
//               ))}
//             </Table>
//           </ScrollView>
//         </View>
//       </ScrollView>

//       {/* Modal */}
// <Modal animationType="fade" visible={modalVisible} transparent={true}>
//   <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
//     <View style={styles.modalOverlay} dir={"rtl"}>
//       <TouchableWithoutFeedback>
//         <View style={styles.modalContent}>
//           {modalType === "success" ? (
//             <View className="text-center py-4">
//               <Image source={Done} className="mx-auto w-10 h-10" />
//               <Text className="font-tbold text-base mt-9 text-center">
//                 تم انشاء الجدول الزمني بنجاح
//               </Text>
//               <TouchableOpacity
//                 className="mx-auto mt-4 px-4 py-2 bg-[#133E54] rounded-md"
//                 onPress={() => setModalVisible(false)}
//               >
//                 <Text className="font-tbold text-white">إغلاق</Text>
//               </TouchableOpacity>
//             </View>
//           ) : modalType === "delete" ? (
//             // Existing delete confirmation modal
//             <View className="text-center">
//               <Image source={Warning} className="mx-auto w-16 h-16" />
//               <Text className="font-tbold text-center">
//                 هل انت متأكد من حذف هذا الموقع
//               </Text>
//               <Text className="font-tmedium text-center">
//                 يرجي العلم انه سوف تفقد كافة البيانات الخاصة بهذا الادخال
//               </Text>
//               <View className="flex flex-row justify-center mt-4">
//                 <TouchableOpacity
//                   className="rounded-md px-4 py-2 bg-none border-[.5px] border-[#133E54] mx-2 w-[69px] flex flex-row justify-center items-center"
//                   onPress={() => setModalVisible(false)}
//                 >
//                   <Text className="font-tbold text-[#133E54]">إلغاء</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   className="mx-2 rounded-md bg-[#F15555] w-[69px] flex flex-row justify-center items-center"
//                   onPress={confirmAction}
//                 >
//                   <Text className="font-tbold text-white">حذف</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           ) : null}
//         </View>
//       </TouchableWithoutFeedback>
//     </View>
//   </TouchableWithoutFeedback>
// </Modal>

//       {/* <Modal animationType="fade" visible={modalVisible} transparent={true}>
//         <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
//           <View style={styles.modalOverlay} dir={"rtl"}>
//             <TouchableWithoutFeedback>
//               <View style={styles.modalContent}>
//                 {modalType !== "delete" ? (
//                   <>
//                     <View className="text-center py-4">
//                       <Image
//                         source={Done}
//                         className="mx-auto w-10 h-10"
//                       ></Image>
//                       <Text className="font-tbold text-base mt-9 text-center">
//                         تم انشاء الجدول الزمني{" "}
//                       </Text>

//                       <View className="flex flex-row justify-center mt-4 "></View>
//                     </View>
//                   </>
//                 ) : (
//                   <View className="text-center">
//                     <Image
//                       source={Warning}
//                       className="mx-auto w-16 h-16"
//                     ></Image>
//                     <Text className="font-tbold text-center">
//                       هل انت متأكد من حذف هذا الموقع
//                     </Text>
//                     <Text className="font-tmedium text-center">
//                       يرجي العلم انه سوف تفقد كافة البيانات الخاصة بهذا الادخال{" "}
//                     </Text>
//                     <View className="flex flex-row justify-center mt-4 ">
//                       <TouchableOpacity
//                         className=" rounded-md px-4 py-2 bg-none border-[.5px] border-[#133E54] mx-2  w-[69px]  flex flex-row justify-center items-center"
//                         onPress={() => setModalVisible(false)}
//                       >
//                         <Text className="font-tbold text-[#133E54]">إلغاء</Text>
//                       </TouchableOpacity>
//                       <TouchableOpacity
//                         className="mx-2 rounded-md  bg-[#F15555] w-[69px] flex flex-row justify-center items-center"
//                         onPress={confirmAction}
//                       >
//                         <Text className="font-tbold text-white">حذف</Text>
//                       </TouchableOpacity>
//                     </View>
//                   </View>
//                 )}
//               </View>
//             </TouchableWithoutFeedback>
//           </View>
//         </TouchableWithoutFeedback>
//       </Modal> */}
//     </SafeAreaView>
//   );
// };

// const styles = {
//   buttonContainer: {
//     flexDirection: "row-reverse",
//     marginBottom: 16,
//   },
//   head: {
//     height: 90,
//     backgroundColor: "#F6F6F6",
//   },
//   text: {
//     textAlign: "center",
//     fontFamily: "Tajawal-Medium",
//     fontSize: 16,
//   },
//   row: {
//     height: "fit-contant",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalContent: {
//     width: "80%",
//     backgroundColor: "white",
//     padding: 16,
//     borderRadius: 8,
//   },
//   modalButtons: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginTop: 16,
//   },
//   inputContainer: {
//     marginBottom: 8,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#CCC",
//     borderRadius: 4,
//     padding: 8,
//   },
// };

// export default ScheduleAndWorkOrdersGrid;
