import React, { useState, useEffect } from 'react';
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
import { CustomButton, MainButton, CheckBox, DatePickerInput, Dropdown } from '../index';
import PencilLine from '../../assets/images/PencilLine.png';
import add_outline from '../../assets/images/add_outline.png';
import trashh from '../../assets/images/trashh.png';
import Warning from '../../assets/images/Warning.png';
import ArrowLineUpRight from '../../assets/images/ArrowLineUpRight.png';
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';

const Grid = () => {
  const router = useRouter();
  const tableHead = [
    {
      key: 'ID',
      label: 'كود الاصل',
      type: 'number',
      input: 'true',
      visible: 'true',
    },
    {
      key: 'title',
      label: 'اسم الاصل',
      input: 'true',
      visible: 'true',
    },
    {
      key: 'description',
      label: 'التصنيف',
      input: 'true',
      visible: 'true',
    },
    {
      key: 'dueDate',
      label: 'الحالة',
      type: 'dropdown',
      input: 'true',
      options: '',
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

  // Dynamically calculate widths during rendering
  const dynamicWidthArr = filteredTableHead.map(() => screenWidth / filteredTableHead.length);

  // Use `state.tableHead` and `dynamicWidthArr` in your table rendering logic
  // //console.log(state, dynamicWidthArr);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [lastClickTime, setLastClickTime] = useState(0);

  // Modal states
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState(''); // "add", "edit", or "delete"
  const [rowData, setRowData] = useState(Object.fromEntries(tableHead.map((col) => [col.key, ''])));

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://freetestapi.com/api/v1/todos');
        setData(response.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDoubleClick = (row) => {
    router.navigate({
      pathname: '/AssetDetails',
      params: { id: selectedRow },
    });
  };

  const handleRowPress = (index) => {
    setSelectedRow(index);
  };

  const handleAdd = () => {
    setRowData(Object.fromEntries(tableHead.map((col) => [col.key, ''])));
    setModalType('add');
    setModalVisible(true);
  };

  const handleEdit = () => {
    if (selectedRow !== null) {
      setRowData(data[selectedRow]);
      setModalType('edit');
      setModalVisible(true);
    } else {
      Alert.alert('Please select a row to edit.');
    }
  };

  const handleDelete = () => {
    if (selectedRow !== null) {
      setModalType('delete');
      setModalVisible(true);
    } else {
      Alert.alert('Please select a row to delete.');
    }
  };

  const confirmAction = async () => {
    try {
      if (modalType === 'add') {
        const response = await axios.post('https://freetestapi.com/api/v1/todos', rowData);
        setData((prevData) => [...prevData, response.data]);
      } else if (modalType === 'edit') {
        const response = await axios.put(
          `https://freetestapi.com/api/v1/todos/${data[selectedRow].id}`,
          rowData
        );
        setData((prevData) =>
          prevData.map((row, index) => (index === selectedRow ? response.data : row))
        );
        setSelectedRow(null);
      } else if (modalType === 'delete') {
        await axios.delete(`https://freetestapi.com/api/v1/todos/${data[selectedRow].id}`);
        setData((prevData) => prevData.filter((_, index) => index !== selectedRow));
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
        return (
          <Dropdown
            onChange={(Value) => handleInputChange(key, Value)}
            data={tableHead.options}
            placeholder={''}
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
      <View style={styles.buttonContainer}>
        <CustomButton Icon={add_outline} title="إضافه" onPress={handleAdd} />
        <CustomButton Icon={PencilLine} title="تعديل" onPress={handleEdit} />
        <CustomButton Icon={trashh} title="حذف" onPress={handleDelete} />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={{ textAlign: 'center', color: 'red' }}>{error}</Text>
      ) : (
        <ScrollView horizontal={true}>
          <View>
            <Table>
              <Row
                className="flex flex-row-reverse font-tbold text-base font-bold"
                data={state.tableHead} // Visible headers
                widthArr={dynamicWidthArr} // Dynamic widths
                style={styles.head}
                // textStyle={styles.text}
              />
            </Table>
            <ScrollView>
              <Table>
                {data.map((dataRow, index) => (
                  <TouchableOpacity key={index} onPress={() => handleRowPress(dataRow, index)}>
                    <Row
                      className="flex flex-row-reverse"
                      style={[
                        styles.row,
                        index % 2 === 0
                          ? { backgroundColor: '#ffffff' }
                          : { backgroundColor: '#f9f9f9' },
                        selectedRow === index && { backgroundColor: '#E4EDF2' },
                      ]}
                      // textStyle={styles.text}
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
                              {item}
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

export default Grid;
