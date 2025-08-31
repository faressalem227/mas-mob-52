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
import ScadaLang from '../../constants/Lang/SCADA/SCADALang';
import { CustomButton, MainButton, CheckBox, DatePickerInput, Dropdown } from '../index';
import PencilLine from '../../assets/images/PencilLine.png';
import add_outline from '../../assets/images/add_outline.png';
import trashh from '../../assets/images/trashh.png';
import Warning from '../../assets/images/Warning.png';
import ArrowLineUpRight from '../../assets/images/ArrowLineUpRight.png';
import api from '../../utilities/api';
import { useRouter } from 'expo-router';
import { HandleDropdownFormat, useDropDown } from '../../hooks/useDropDownData';
import { useGlobalContext } from '../../context/GlobalProvider';
// import { Picker } from "react-native-web";
const TagsGrid = ({ LocationID, TagClass, TagGroup }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const router = useRouter();
  const [modelLoader, setModelLoader] = useState(false);
  const [refetch, setRefetch] = useState(0);
  const [Asset, setAsset] = useState([]);
  const [SectionList, setSectionList] = useState([]);
  const [SelectedAsset, setSelectedAsset] = useState([]);
  // const [operationList, setOperationList] = useState([]);
  const [SelectedSubLocation, setSelectedSubLocation] = useState([]);
  const { Lang, DepartmentID, user } = useGlobalContext();
  // const [Items, setItems] = useState([]);
  ///////////////////////////////////////////////////////////////

  const { data: GroupTagList, loading: GroupTagLoader } = useDropDown(
    'Scada_Tag_Group_List',
    { LocationID: LocationID },
    'TagGroupID',
    'TagGroupName'
  );
  const { data: ClassTagList, loading: ClassTagLoader } = useDropDown(
    'api_Scada_Tag_Class_List',
    { LocationID: LocationID },
    'TagClassID',
    'TagClassName'
  );
  const { data: SubLocationData, loading: SubLocationDataLoader } = useDropDown(
    'api_ms_SubLocation_List',
    { LocationID: LocationID },
    'value',
    'label'
  );
  // const { data: Asset, loading: AssetLoader } = useDropDown(
  //   "api_ms_assets_trx",
  //   {LocationID:LocationID,SubLocationID:SelectedSubLocation},
  //   "AssetID",
  //   "AssetName"
  // );
  const { data: operationList, loading: operationListLoader } = useDropDown(
    'api_op_OperationItems_List',
    { LocationID: LocationID }, //AssetID:SelectedAsset
    'OperationItemID',
    'OperationItemName'
  );

  const { data: AggregateList, loading: AggregateListLoader } = useDropDown(
    'Scada_AggregateFunction_List',
    { LocationID: LocationID },
    'AggregateID',
    'AggregateName'
  );
  const { data: ProcedureList, loading: ProcedureListLoader } = useDropDown(
    'Scada_Procedures_List',
    { DepartmentID: LocationID, LangID: Lang, UserName: user.username },
    'ProcedureID',
    'ProcedureName'
  );
  const { data: NotificationTypes, loading: NotificationTypesLoader } = useDropDown(
    'Scada_NotificationTypes_List',
    { DepartmentID: LocationID, LangID: Lang, UserName: user.username },
    'NotificationTypeID',
    'NotificationTypeName'
  );
  /////////////////

  console.log('Fetching data with:', { TagGroup, LocationID, TagClass });
  useEffect(() => {
    if (LocationID && TagGroup && TagClass) {
      const fetchData = async () => {
        setLoading(true);
        console.log('Fetching data with:', { TagGroup, LocationID, TagClass });
        try {
          const response = await api.get(
            `/table?sp=api_Scada_Tags_Trx&TagGroupID=${TagGroup}&LocationID=${LocationID}&TagClassID=${TagClass}`
          );
          console.log('API Response:', response.data); // Check response structure
          setData(response.data.data);
        } catch (err) {
          console.error('Fetch error:', err);
          setError(err.message || 'Failed to fetch data');
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [LocationID, TagClass, TagGroup, refetch]);

  const { data: sds_Procedures } = useDropDown(
    'Scada_Procedures_List',
    {
      UserName: user.username,
      LangID: Lang,
      DepartmentID: DepartmentID,
    },
    'ProcedureID',
    'FullProcedureName'
  );

  const fetchAsset = useCallback(async () => {
    if (SelectedSubLocation && LocationID) {
      try {
        setLoading(true);
        const response = await api.get(
          `/table?sp=api_ms_assets_trx&SubLocationID=${SelectedSubLocation}&LocationID=${LocationID}`
        );
        console.log('Fetched Items:', response.data.data);

        const List = response.data.data || [];
        if (Array.isArray(List)) {
          setAsset(HandleDropdownFormat(List, 'AssetID', 'AssetName'));
        } else {
          console.error('Expected List to be an array, but got:', List);
        }
      } catch (err) {
        console.error('Error fetching material data:', err);
      } finally {
        setLoading(false);
      }
    }
  }, [SelectedSubLocation, LocationID]);

  useEffect(() => {
    fetchAsset();
    // fetchoperationList();
  }, [SelectedSubLocation]);
  // useEffect(() => {
  //   fetchoperationList();
  // }, [SelectedAsset]);
  const tableHead = [
    {
      key: 'AssetTagID',
      label: '',
      type: '',
      input: 'false',
      visible: 'false',
      width: 100,
    },
    {
      key: 'TagGroupID',
      label: ScadaLang.Group[Lang],
      type: 'dropdown',
      options: GroupTagList,
      input: 'true',
      visible: 'false',
      width: 100,
    },
    {
      key: 'TagNo',
      label: ScadaLang.TageNumber[Lang],
      input: 'true',
      visible: 'true',
      type: 'number',
      width: 100,
    },
    {
      key: 'TagName',
      label: ScadaLang.TageName[Lang],
      input: 'true',
      visible: 'true',
      width: 200,
    },
    {
      key: 'TagDescription',
      label: ScadaLang.TageDescription[Lang],
      input: 'true',
      visible: 'true',
      width: 110,
    },
    {
      key: 'TagUnit',
      label: ScadaLang.Unit[Lang],
      input: 'false',
      visible: 'false',
      width: 100,
    },
    {
      key: 'TagClassID',
      label: ScadaLang.Classification[Lang],
      type: 'dropdown',
      options: ClassTagList,
      input: 'true',
      visible: 'true',
      width: 100,
    },
    {
      key: 'IsActive',
      label: ScadaLang.Active[Lang],
      type: 'checkbox',
      input: 'true',
      visible: 'true',
      width: 100,
    },
    {
      key: 'SubLocationID',
      label: ScadaLang.Location[Lang],
      type: 'dropdown',
      options: SubLocationData,
      input: 'true',
      visible: 'true',
      width: 100,
    },
    {
      key: 'AssetID',
      label: ScadaLang.AssetCode[Lang],
      type: 'dropdown',
      options: Asset,
      input: 'true',
      visible: 'false',
      width: 100,
    },
    {
      key: 'AssetCode',
      label: ScadaLang.AssetCode[Lang],
      type: '',
      input: 'false',
      visible: 'true',
      width: 100,
    },
    {
      key: 'AssetName',
      label: ScadaLang.AssetName[Lang],
      type: '',
      input: 'false',
      visible: 'true',
      width: 200,
    },
    {
      key: 'OperationItemID',
      label: ScadaLang.Operationitem[Lang],
      type: 'dropdown',
      options: operationList,
      input: 'true',
      visible: 'false',
      width: 100,
    },
    {
      key: 'OperationItemName',
      label: ScadaLang.Operationitem[Lang],
      type: '',
      input: 'false',
      visible: 'true',
      width: 120,
    },
    {
      key: 'AggregateID',
      label: ScadaLang.AggregateFunction[Lang],
      type: 'dropdown',
      options: AggregateList,
      input: 'true',
      visible: 'false',
      width: 100,
    },
    {
      key: 'AggregateName',
      label: ScadaLang.AggregateFunction[Lang],
      type: 'dropdown',
      options: AggregateList,
      input: 'false',
      visible: 'true',
      width: 150,
    },
    {
      key: 'ProcedureID',
      label: ScadaLang.ProcedureCode[Lang],
      type: 'dropdown',
      options: ProcedureList,
      input: 'true',
      visible: 'false',
      width: 120,
    },
    {
      key: 'ProcedureCode',
      label: ScadaLang.ProcedureCode[Lang],
      type: 'dropdown',
      input: 'false',
      visible: 'true',
      width: 120,
    },
    {
      key: 'ProcedureName',
      label: ScadaLang.ProcedureName[Lang],
      type: 'dropdown',
      input: 'false',
      visible: 'true',
      width: 200,
    },
    {
      key: 'Limit',
      label: ScadaLang.Value[Lang],
      input: 'true',
      type: 'number',
      visible: 'true',
      width: 100,
    },
    {
      key: 'Factor',
      label: ScadaLang.Factor[Lang],
      input: 'true',
      type: 'number',
      visible: 'true',
      width: 100,
    },
    {
      key: 'Equation',
      label: ScadaLang.Equation[Lang],
      type: 'checkbox',
      input: 'true',
      visible: 'true',
      width: 100,
    },
    {
      key: 'Alert',
      label: ScadaLang.Notifications[Lang],
      type: 'checkbox',
      input: 'true',
      visible: 'true',
      width: 110,
    },
    {
      key: 'NotificationTypeName',
      label: ScadaLang.MaintenanceType[Lang],
      type: 'dropdown',
      options: NotificationTypes,
      input: 'false',
      visible: 'true',
      width: 140,
    },
    {
      key: 'NotificationTypeID',
      label: ScadaLang.MaintenanceType[Lang],
      type: 'dropdown',
      options: NotificationTypes,
      input: 'true',
      visible: 'false',
      width: 120,
    },
    {
      key: 'ServerName',
      label: ScadaLang.ServerName[Lang],
      input: 'true',
      visible: 'true',
      width: 120,
    },
    {
      key: 'ProtocolName',
      label: ScadaLang.ProtocolName[Lang],
      input: 'true',
      visible: 'true',
      width: 120,
    },
    {
      key: 'ReadIntervalSec',
      label: ScadaLang.ReadIntervalSec[Lang],
      input: 'true',
      type: 'number',
      visible: 'true',
      width: 130,
    },
    {
      key: 'MinLimit',
      label: ScadaLang.MinLimit[Lang],
      type: 'number',
      input: 'true',
      visible: 'true',
      width: 100,
    },
    {
      key: 'MaxLimit',
      label: ScadaLang.MaxLimit[Lang],
      type: 'number',
      input: 'true',
      visible: 'true',
      width: 100,
    },
  ];

  // Filter the table headers based on the 'visible' property
  const filteredTableHead = tableHead.filter((header) => header.visible === 'true');

  // Create state with only visible headers
  const state = {
    tableHead: filteredTableHead.map((col) => col.label), // Map visible headers to their labels
  };

  const scrollViewRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log('ScrollView Ref:', scrollViewRef.current); // Debugging
      if (scrollViewRef.current) {
        scrollViewRef.current?.scrollToEnd({ animated: false });
      }
    }, 50); // Delay by 100ms to allow rendering
    setLoading(false);
    return () => clearTimeout(timeout); // Cleanup timeout
  }, [scrollViewRef, data]);

  // Create static WidthArr from the 'width' property
  const staticWidthArr = filteredTableHead.map((col) => col.width);
  const [error, setError] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [lastClickTime, setLastClickTime] = useState(0);

  // Modal states
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState(''); // "add", "edit", or "delete"
  const [rowData, setRowData] = useState(Object.fromEntries(tableHead.map((col) => [col.key, ''])));

  const handleRowPress = (row, index) => {
    setSelectedRow(row);
  };

  const handleAdd = () => {
    setRowData(Object.fromEntries(tableHead.map((col) => [col.key, ''])));
    setModalType('add');
    setModalVisible(true);
  };

  const handleEdit = () => {
    if (selectedRow !== null) {
      setRowData(selectedRow);
      setModalType('edit');
      setModalVisible(true);
    } else {
      Alert.alert(ScadaLang.edit[Lang]);
    }
  };

  const handleDelete = () => {
    if (selectedRow !== null) {
      setRowData(selectedRow);
      setModalType('delete');
      setModalVisible(true);
    } else {
      Alert.alert(ScadaLang.delete[Lang]);
    }
  };

  const confirmAction = async () => {
    try {
      if (modalType === 'add') {
        setModelLoader(true);
        const response = await api.post('/table?sp=api_Scada_Tags_Ins', {
          ...rowData,
          LocationID: LocationID,
        });
        setModelLoader(false);
        setRefetch((prev) => prev + 1);
      } else if (modalType === 'edit') {
        setModelLoader(true);
        const response = await api.put(`/table?sp=api_Scada_Tags_Upd`, {
          ...rowData,
          LocationID: LocationID,
        });
        setModelLoader(false);
        setRefetch((prev) => prev + 1);
        setSelectedRow(null);
      } else if (modalType === 'delete') {
        setModelLoader(true);
        console.log(rowData, 'DELETE');

        await api.delete(
          `/table?sp=api_Scada_Tags_Del&AssetTagID=${rowData?.AssetTagID}&LocationID=${LocationID}`
        );
        setModelLoader(false);
        setRefetch((prev) => prev + 1);
        setSelectedRow(null);
      }
      setModalVisible(false);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
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
            className="h-14 w-full rounded-lg border-[.5px] border-[#1C5B7D] p-4 text-right font-tmedium text-sm font-medium focus:border-[#133e5475]"
            keyboardType="numeric"
            value={value}
            onChangeText={(text) => handleInputChange(key, text)}
          />
        );

      case 'text':
        return (
          <TextInput
            className="h-14 w-full rounded-lg border-[.5px] border-[#1C5B7D] p-4 text-right font-tmedium text-sm font-medium focus:border-[#133e5475] "
            multiline
            numberOfLines={4}
            value={value}
            onChangeText={(text) => handleInputChange(key, text)}
          />
        );
      case 'dropdown':
        if (key === 'AssetID') {
          return (
            <Dropdown
              onChange={(selectedValue) => {
                handleInputChange(key, selectedValue);
                setSelectedAsset(selectedValue);
              }}
              data={Asset} // Assuming materialClasses is populated
              placeholder="Select Asset "
              initailOption={value[0] ? value[0] : value} // Set initial option if needed
              value={value[0] ? value[0] : value} // Controlled value for the dropdown
              inputName="AssetID" // Use the key as input name
            />
          );
        } else if (key === 'SubLocationID') {
          return (
            <Dropdown
              onChange={(selectedValue) => {
                handleInputChange(key, selectedValue);
                setSelectedSubLocation(selectedValue); // Update state for MaterialClassID
                fetchAsset(selectedValue);
              }} 
              data={SubLocationData} // Assuming Materials is populated
              placeholder="Select SubLocation"
              initailOption={value[0] ? value[0] : value} // Set initial option if needed
              value={value[0] ? value[0] : value} // Controlled value for the dropdown
              inputName="SubLocationID" // Use the key as input name
            />
          );
        }
        // Default case for other dropdowns
        return (
          <Dropdown
            onChange={(selectedValue) => handleInputChange(key, selectedValue)}
            data={options} // Pass any other options
            placeholder="Select an option"
            initailOption={value[0] ? value[0] : value} // Set initial option if needed
            value={value[0] ? value[0] : value} // Controlled value for the dropdown
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
            className="h-14 w-full rounded-lg border-[.5px] border-[#1C5B7D] p-4 text-right font-tmedium text-sm font-medium focus:border-[#133e5475]"
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
          <CustomButton Icon={add_outline} title="إضافه" onPress={handleAdd} />
          <CustomButton Icon={PencilLine} title="تعديل" onPress={handleEdit} />
          <CustomButton Icon={trashh} title="حذف" onPress={handleDelete} />
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
                widthArr={staticWidthArr} // Dynamic widths
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
                        selectedRow?.AssetTagID === dataRow?.AssetTagID && {
                          backgroundColor: '#E4EDF2',
                        },
                      ]}
                      textStyle={styles.text}
                      widthArr={staticWidthArr} // Dynamic widths
                      data={filteredTableHead.map((col, idx) => {
                        const item = dataRow[col.key]; // Get the corresponding column data
                        if (col?.type === 'checkbox') {
                          // Return JSX inside a wrapper for checkbox columns
                          return (
                            <View
                              key={idx}
                              style={{
                                width: staticWidthArr[idx], // Set width for each column
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
                                  width: staticWidthArr[idx],
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
                {modalType !== 'delete' ? (
                  <>
                    <ScrollView className="mb-10 max-h-[60vh] w-[100%]">
                      {tableHead.map((header) => {
                        if (header.input === 'true') {
                          return (
                            <View key={header.key} style={styles.inputContainer}>
                              <Text className="my-2 font-tmedium text-base font-medium ">
                                {header.label}
                              </Text>
                              {renderInput(
                                header.key,
                                header.type,
                                rowData[header.key],
                                header.options
                              )}
                            </View>
                          );
                        }
                        return null; // Do not render anything if input is "false"
                      })}
                    </ScrollView>
                    <MainButton
                      title={modalType === 'add' ? 'إضافه' : 'حفظ التعديل'}
                      icon={ArrowLineUpRight}
                      handlePress={confirmAction}
                      isLoading={modelLoader}
                    />
                  </>
                ) : (
                  <View className="text-center">
                    <Image source={Warning} className="mx-auto h-16 w-16"></Image>
                    <Text className="text-center font-tbold">هل انت متأكد من حذف هذا الموقع</Text>
                    <Text className="text-center font-tmedium">
                      يرجي العلم انه سوف تفقد كافة البيانات الخاصة بهذا الادخال{' '}
                    </Text>
                    <View className="mt-4 flex flex-row justify-center ">
                      <TouchableOpacity
                        className=" mx-2 flex w-[69px] flex-row  items-center justify-center rounded-md  border-[.5px]  border-[#133E54] bg-none px-4 py-2"
                        onPress={() => setModalVisible(false)}>
                        <Text className="font-tbold text-[#133E54]">إلغاء</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        className="mx-2 flex  w-[69px] flex-row items-center justify-center rounded-md bg-[#F15555]"
                        onPress={confirmAction}>
                        <Text className="font-tbold text-white">حذف</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
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

export default TagsGrid;
