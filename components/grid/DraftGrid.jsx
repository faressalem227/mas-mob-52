import { useState, useEffect, useRef } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  RefreshControl,
  View,
  ScrollView,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Modal,
  Text,
  Image,
  TextInput,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { Table, Row } from 'react-native-table-component';
import { CustomButton, MainButton, CheckBox, DatePickerInput, Dropdown } from '../index';
import PencilLine from '../../assets/images/PencilLine.png';
import add_outline from '../../assets/images/add_outline.png';
import Nigative from '../../assets/images/Nigative.png';
import Plus from '../../assets/images/Pluss.png';
import trashh from '../../assets/images/trashh.png';
import Warning from '../../assets/images/Warning.png';
import ArrowLineUpRight from '../../assets/images/ArrowLineUpRight.png';
import { useRouter } from 'expo-router';
import api from '../../utilities/api';
import { priceFormatter } from '../../utilities/dateFormater';
import Toast from 'react-native-toast-message';

import { buildTree } from '../../utilities/functions';
import { useGlobalContext } from '../../context/GlobalProvider';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MainGridLang from '../../constants/Lang/components/MainGridLang';
const validateRowFields = (tableHead, rowData, dynamicCode) => {
  const errors = {};
  for (const header of tableHead) {
    const isInput = header.input && header.input !== 'false';
    const isRequired = header.required;
    const valueMissing = !rowData[header.key] || rowData[header.key] === '';
    const isDynamicField = dynamicCode && dynamicCode.codeCol === header.key;

    if (isInput && isRequired && valueMissing && !isDynamicField) {
      errors[header.key] = `${header.label} مطلوب ولا يمكن أن يكون فارغًا.`;
    }
  }
  return errors;
};

const RenderInput = ({
  inputkey,
  label,
  type,
  value,
  options = [],
  lines = 4,
  onChange,
  setRowData,
  children = [],
  handleDropdownChange,
  dynamicCode,
  code,
}) => {
  const { Rtl, company, Lang } = useGlobalContext();

  const handleInputChange = (key, value, type) => {
    if (type == 'dropdown' && handleDropdownChange) {
      handleDropdownChange(inputkey, value);
    }
    setRowData((prevData) => ({ ...prevData, [inputkey]: value }));
  };
  useEffect(() => {
    if (code && dynamicCode && dynamicCode.codeCol == inputkey) {
      handleInputChange(dynamicCode.codeCol, code);
    }
  }, []);

  switch (type) {
    case 'sub':
      return (
        <div key={inputkey} className="flex w-full flex-col gap-3">
          <div className="flex flex-wrap gap-4"></div>
        </div>
      );

    case 'number' || 'price':
      return (
        <TextInput
          className={`h-14 w-full rounded-lg border-[.5px] border-[#1C5B7D] p-4 text-right text-sm font-medium focus:border-[#133e5475] ${!Rtl && 'text-left'}`}
          keyboardType="numeric"
          value={`${code && dynamicCode.codeCol == inputkey ? code : value ? value : ''}`}
          onChangeText={(text) => handleInputChange(inputkey, text)}
          editable={dynamicCode && dynamicCode.codeCol == inputkey ? false : true}
        />
      );

    case 'date':
      return (
        <DatePickerInput
          defaultDate={value}
          setDate={(selectedDate) => handleInputChange(inputkey, selectedDate)}
        />
      );

    case 'checkbox':
      return (
        <CheckBox
          value={value}
          isEditable={true}
          onChange={(checked) => handleInputChange(inputkey, checked)}
        />
      );

    case 'text':
      return (
        <TextInput
          className={`h-14 w-full rounded-lg border-[.5px] border-[#1C5B7D] p-4 text-right text-sm font-medium focus:border-[#133e5475] ${!Rtl && 'text-left'}`}
          multiline
          numberOfLines={lines || 4}
          value={`${code && dynamicCode.codeCol == inputkey ? code : value ? value : ''}`}
          onChangeText={(text) => handleInputChange(inputkey, text)}
          editable={dynamicCode && dynamicCode.codeCol == inputkey ? false : true}
        />
      );

    case 'dropdown':
      return (
        <Dropdown
          placeholder={'اختر '}
          data={options}
          value={value}
          initailOption={value}
          onChange={(v) => handleInputChange(inputkey, v, type)}
        />
      );

    default:
      return (
        <TextInput
          className={`h-14 w-full rounded-lg border-[.5px] border-[#1C5B7D] p-4 text-right text-sm font-medium focus:border-[#133e5475] ${!Rtl && 'text-left'}`}
          value={`${code && dynamicCode.codeCol == inputkey ? code : value ? value : ''}`}
          onChangeText={(text) => handleInputChange(inputkey, text)}
          editable={dynamicCode && dynamicCode.codeCol == inputkey ? false : true}
        />
      );
  }
};

const RenderRows = ({
  Expandednodes = [],
  setExpandednodes = () => {},
  dataRow,
  index,
  depth = 0,
  pk,
  handleDoubleClick,
  handleRowPress,
  selectedRow,
  highlight,
  widthArr,
  filteredTableHead = [],
  isNested,
}) => {
  const { Rtl } = useGlobalContext();
  const expandedSet = new Set(Expandednodes);
  const isExpanded = dataRow?.[pk] && expandedSet.has(dataRow[pk]);
  const isSelected = selectedRow?.[pk] === dataRow?.[pk];
  const windowWidth = Dimensions.get('window').width;

  const [buttonStyles, setButtonStyles] = useState({
    buttonHeight: hp('6%'),
    fontSize: hp('1.8%'),
    iconSize: hp('2%'),
    gap: wp('1%'),
    padding: wp('2%'),
  });

  useEffect(() => {
    if (windowWidth < 750) {
      setButtonStyles({
        buttonHeight: hp('5%'),
        fontSize: hp('1.8%'),
        iconSize: hp('2.2%'),
        gap: wp('1%'),
        padding: wp('3%'),
      });
    } else {
      setButtonStyles({
        buttonHeight: hp('4.5%'),
        fontSize: hp('1.4%'),
        iconSize: hp('2%'),
        gap: wp('.5%'),
        padding: wp('2%'),
      });
    }
  }, [windowWidth]);

  if (!dataRow) return null;

  const handleExpandToggle = () => {
    setExpandednodes((prev) =>
      isExpanded ? prev.filter((id) => id !== dataRow[pk]) : [...prev, dataRow[pk]]
    );
  };

  const indentStyle = {
    [Rtl ? 'paddingRight' : 'paddingLeft']: depth * 20,
  };

  return (
    <View key={dataRow[pk] || `row-${index}`} style={indentStyle}>
      <View
        className={`${Rtl ? 'flex-row-reverse' : 'flex-row'} border-b-4 border-b-[#f3f2f3] bg-[#f9f9f9]`}>
        {isNested &&
          (dataRow.children?.length > 0 ? (
            <TouchableOpacity
              style={[
                {
                  backgroundColor: '#f9f9f9',
                  padding: 8,
                },
                isSelected && { backgroundColor: '#227099' },
                highlight?.col &&
                  dataRow[highlight.col] === highlight.value && {
                    backgroundColor: highlight.bgcolor,
                  },
              ]}
              className="items-center justify-center px-2"
              onPress={handleExpandToggle}>
              <Image
                source={isExpanded ? Nigative : Plus}
                style={{
                  width: buttonStyles.iconSize,
                  height: buttonStyles.iconSize,
                  resizeMode: 'contain',
                  marginLeft: Rtl ? 0 : wp('1%'),
                  marginRight: Rtl ? wp('1%') : 0,
                  opacity: 0.25,
                }}
              />
            </TouchableOpacity>
          ) : (
            <View
              style={{
                width: buttonStyles.iconSize,
                height: buttonStyles.iconSize,
              }}
              className="bg-[#F3F3F3] px-8"
            />
          ))}

        <TouchableOpacity
          onLongPress={() => handleDoubleClick(dataRow, index)}
          onPress={() => handleRowPress(dataRow, index)}>
          <Row
            style={{
              ...(!isNested && {
                backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9f9f9',
                padding: 8,
              }),
              ...(isNested &&
                dataRow.children?.length > 0 && {
                  backgroundColor: '#f9f9f9',
                  paddingVertical: 8,
                }),
              ...(isSelected && { backgroundColor: '#227099' }),
              ...(highlight?.col &&
                dataRow[highlight.col] == highlight.value && {
                  backgroundColor: highlight.bgcolor,
                }),
              flexDirection: Rtl ? 'row-reverse' : 'row',
            }}
            widthArr={widthArr}
            data={
              Array.isArray(filteredTableHead)
                ? filteredTableHead.map((col, idx) => {
                    if (!col) return null;
                    const item = col.key ? (dataRow[col.key] ?? '') : '';
                    return col.type === 'checkbox' ? (
                      <View
                        key={`checkbox-${idx}`}
                        style={{
                          width: widthArr[idx],
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <CheckBox value={!!item} isEditable={false} />
                      </View>
                    ) : (
                      <View key={`text-${idx}`} className="p-2">
                        <Text
                          numberOfLines={3}
                          className="line-clamp-3"
                          style={{
                            width: widthArr[idx],
                            textAlign: 'center',
                            overflow: 'hidden',
                            color: isSelected ? '#fff' : '#000',
                          }}>
                          {col.type === 'date' && item
                            ? item.split('T')[0]
                            : col.type === 'price'
                              ? priceFormatter(item)
                              : item}
                        </Text>
                      </View>
                    );
                  })
                : null
            }
          />
        </TouchableOpacity>
      </View>

      {isExpanded &&
        isNested &&
        Array.isArray(dataRow.children) &&
        dataRow.children.map((child, idx) => (
          <RenderRows
            key={child?.[pk] || `child-${idx}`}
            Expandednodes={Expandednodes}
            setExpandednodes={setExpandednodes}
            dataRow={child}
            index={idx}
            depth={depth + 1}
            pk={pk}
            handleDoubleClick={handleDoubleClick}
            handleRowPress={handleRowPress}
            selectedRow={selectedRow}
            highlight={highlight}
            widthArr={widthArr}
            filteredTableHead={filteredTableHead}
            isNested
          />
        ))}
    </View>
  );
};

const DraftGrid = ({
  tableHead,
  pk = false,
  parentKey = false,
  spTrx,
  spUpd = null,
  spIns = null,
  spDel = null,
  TrxParam = [],
  UpdParam = [],
  InsParam = [],
  DelParam = [],
  UpdBody = [],
  InsBody = [],
  StaticWidth = false,
  hasCrud = true,
  hasIns = true,
  hasUpd = true,
  hasDel = true,
  hasSpecialButton = false,
  specialButton = [],
  TrxDependency = [],
  routeTo = false,
  mixedWidth = false,
  handleDropDownChange = false,
  highlight = false,
  dynamicCode = false,
  insRoute = '',
  isNested,
}) => {
  const router = useRouter();

  const [refreshing, setRefreshing] = useState(false);

  const { Rtl, company, Lang } = useGlobalContext();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refetch, setRefetch] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [modelLoader, setModelLoader] = useState(false);
  // Modal states
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState(''); // "add", "edit", or "delete"
  const [code, setCode] = useState(false);
  const [Expandednodes, setExpandednodes] = useState([]);

  const [rowData, setRowData] = useState(Object.fromEntries(tableHead.map((col) => [col.key, ''])));
  const [labelFontSize, setLabelFontSize] = useState(hp('1.5%'));

  //(data, "sadojasdhsado");
  const scrollViewRef = useRef(null);

  // Filter the table headers based on the 'visible' property
  const filteredTableHead = tableHead.filter(
    (header) => header.visible || header.visible === 'true'
  );

  // Create state with only visible headers
  const state = {
    tableHead: filteredTableHead.map((col) => col.label), // Map visible headers to their labels
  };

  const screenWidth = Dimensions.get('window').width - 16;

  let widthArr = [];

  if (mixedWidth) {
    let widths = 0;
    let count = 0;

    filteredTableHead.map((col) => (col.width ? (widths += col.width) : (count += 1)));

    widthArr = filteredTableHead.map((col) =>
      col.width ? col.width : (screenWidth - widths) / count
    );
  } else {
    if (StaticWidth) {
      const totalWidth = filteredTableHead.reduce((sum, col) => sum + (col.width || 0), 0);
      if (totalWidth < screenWidth && filteredTableHead.length < 10) {
        widthArr = filteredTableHead.map(() => screenWidth / filteredTableHead.length);
      } else {
        widthArr = filteredTableHead.map(
          (col) => col.width || screenWidth / filteredTableHead.length
        );
      }
    } else {
      widthArr = filteredTableHead.map(() => screenWidth / filteredTableHead.length);
    }
  }

  const handleDoubleClick = (row) => {
    if (routeTo) {
      if (routeTo.hasSpecialVal && routeTo.specialVal) {
        if (row[routeTo.specialVal.col] === routeTo.specialVal.value) {
          router.navigate({
            pathname: routeTo.path,
            ...(routeTo.hasParams && { params: { ...row, ...routeTo.params } }),
          });
        } else {
          return;
        }
      } else {
        router.navigate({
          pathname: routeTo.path,
          ...(routeTo.hasParams && { params: { ...row, ...routeTo.params } }),
        });
      }
    }
  };

  const handleRowPress = (row, index) => {
    setSelectedRow(row);
  };

  const handleAdd = async () => {
    let Code;
    if (dynamicCode) {
      try {
        const response = await api.get(
          `/table?sp=GetNextCodeForTable&TableName=${dynamicCode.tbName}&CodeFieldName=${dynamicCode.codeCol}`
        );
        Code = response.data.data[0].NextCode;
        setCode(Code);
      } catch (err) {
        Toast.show({
          type: 'error',
          text1: 'حدث خطأ',
          text2: `حدث خطأ اثناء تنفيذ العمليه حاول مره اخرى ❌`,
          autoHide: true,
          visibilityTime: 3000,
          text1Style: {
            textAlign: 'right',
          },
          text2Style: {
            textAlign: 'right',
          },
        });
      } finally {
        setLoading(false);
      }
    }
    if (selectedRow !== null && parentKey) {
      setRowData(
        Object.fromEntries(
          tableHead.map((col) => [col.key, col.key == parentKey ? selectedRow[pk] : ''])
        )
      );
    } else {
      setRowData(Object.fromEntries(tableHead.map((col) => [col.key, ''])));
    }
    setModalType('add');
    setModalVisible(true);
  };
  const handleEdit = () => {
    if (selectedRow !== null) {
      setRowData(selectedRow);
      setModalType('edit');
      setModalVisible(true);
    } else {
      Toast.show({
        type: 'error',
        text1: 'حدث خطأ',
        text2: `من فضلك اختر صف لاستكمال العمليه`,
        autoHide: true,
        visibilityTime: 3000,
        text1Style: {
          textAlign: 'right',
        },
        text2Style: {
          textAlign: 'right',
        },
      });
    }
  };

  const handleDelete = () => {
    if (selectedRow !== null) {
      setModalType('delete');
      setModalVisible(true);
    } else {
      Toast.show({
        type: 'error',
        text1: 'حدث خطأ',
        text2: `من فضلك اختر صف لاستكمال العمليه`,
        autoHide: true,
        visibilityTime: 3000,
        text1Style: {
          textAlign: 'right',
        },
        text2Style: {
          textAlign: 'right',
        },
      });
    }
  };
  const onRefresh = () => {
    setRefreshing(true);
    setRefetch((prev) => prev + 1);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const validationErrors = validateRowFields(tableHead, rowData, dynamicCode);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const confirmAction = async () => {
    try {
      if (!validateFields()) {
        return;
      }
      if (modalType === 'add') {
        setModelLoader(true);
        let params = ``;
        let url = ``;
        InsParam != [] &&
          InsParam.map((p) =>
            p.rowData
              ? (params = params + `&${p.name}=${selectedRow[p.value]}`)
              : (params = params + `&${p.name}=${p.value}`)
          );
        const Ins = insRoute ? insRoute : 'table';
        InsParam != [] ? (url = `/${Ins}?sp=${spIns}${params}`) : `/${Ins}?sp=${spIns}`;
        console.log('riwdata', rowData);

        const response = await api.post(url, {
          ...rowData,
          ...InsBody,
        });
        setModelLoader(false);
        Toast.show({
          type: 'success',
          text1: 'عملية ناجحه',
          text2: `تمت الاضافة بنجاح ✅`,
          autoHide: true,
          visibilityTime: 3000,
          text1Style: {
            textAlign: 'right',
          },
          text2Style: {
            textAlign: 'right',
          },
        });
        setRefetch((prev) => prev + 1);
        setData((prevData) => [...prevData, response.data]);
      } else if (modalType === 'edit') {
        setModelLoader(true);
        let params = ``;
        let url = ``;
        UpdParam != [] &&
          UpdParam.map((p) =>
            p.rowData
              ? (params = params + `&${p.name}=${selectedRow[p.value]}`)
              : (params = params + `&${p.value}=${p.name}`)
          );
        UpdParam != [] ? (url = `/table?sp=${spUpd}${params}`) : `/table?sp=${spUpd}`;
        const response = await api.put(url, {
          ...rowData,
          ...UpdBody,
        });
        setModelLoader(false);
        Toast.show({
          type: 'success',
          text1: 'عملية ناجحه',
          text2: `تم التعديل بنجاح ✅`,
          autoHide: true,
          visibilityTime: 3000,
          text1Style: {
            textAlign: 'right',
          },
          text2Style: {
            textAlign: 'right',
          },
        });
        setRefetch((prev) => prev + 1);
        setSelectedRow(null);
      } else if (modalType === 'delete') {
        setModelLoader(true);
        let params = ``;
        let url = ``;
        DelParam != [] &&
          DelParam.map((p) =>
            p.rowData
              ? (params = params + `&${p.name}=${selectedRow[p.value]}`)
              : (params = params + `&${p.name}=${p.value}`)
          );
        DelParam != [] ? (url = `/table?sp=${spDel}${params}`) : `/table?sp=${spDel}`;
        //(url);

        await api.delete(url);
        setModelLoader(false);
        Toast.show({
          type: 'success',
          text1: 'عملية ناجحه',
          text2: `تم الحذف بنجاح ✅`,
          autoHide: true,
          visibilityTime: 3000,
          text1Style: {
            textAlign: 'right',
          },
          text2Style: {
            textAlign: 'right',
          },
        });
        setRefetch((prev) => prev + 1);
        setSelectedRow(null);
      }
      setModalVisible(false);
    } catch (error) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: 'حدث خطأ',
        text2: error?.response?.data?.message || `حدث خطأ اثناء تنفيذ العمليه حاول مره اخرى ❌`,
        autoHide: true,
        visibilityTime: 3000,
        text1Style: {
          textAlign: 'right',
        },
        text2Style: {
          textAlign: 'right',
        },
      });
      setModalVisible(false);
      setModelLoader(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      //("ScrollView Ref:", scrollViewRef.current); // Debugging
      if (scrollViewRef.current) {
        scrollViewRef.current?.scrollToEnd({ animated: false });
      }
    }, 500); // Delay by 100ms to allow rendering

    return () => clearTimeout(timeout); // Cleanup timeout
  }, [scrollViewRef, data]); // Re-run effect when data changes

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let params = ``;
        let url = ``;

        TrxParam != [] && TrxParam.map((p) => (params = params + `&${p.name}=${p.value}`));
        TrxParam != [] ? (url = `/table?sp=${spTrx}${params}`) : `/table?sp=${spTrx}`;

        const response = await api.get(url);

        const fetchedData = isNested
          ? buildTree(response.data.data, null, parentKey, pk)
          : response.data.data;

        setData(fetchedData);
      } catch (err) {
        console.log(err);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 200);
      }
    };
    fetchData();
  }, [refetch, ...TrxDependency]);

  // console.log(pk, parentKey);

  // console.log(data);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView
          style={{ flex: 1, backgroundColor: '#fff' }}
          keyboardShouldPersistTaps="handled">
          <View
            style={{
              flexDirection: `${Rtl ? 'row-reverse' : 'row'}`,
              marginBottom: 16,
            }}
            className="flex-wrap">
            {hasCrud && hasCrud != 'false' ? (
              <>
                {hasIns && (
                  <CustomButton
                    Icon={add_outline}
                    title={Lang == 1 ? 'إضافه' : 'Add'}
                    onPress={handleAdd}
                    Rtl={Rtl}
                  />
                )}
                {hasUpd && (
                  <CustomButton
                    Icon={PencilLine}
                    title={MainGridLang.editBtn[Lang]}
                    onPress={handleEdit}
                    Rtl={Rtl}
                  />
                )}
                {hasDel && (
                  <CustomButton
                    Icon={trashh}
                    title={Lang == 1 ? 'حذف' : 'Delete'}
                    onPress={handleDelete}
                    Rtl={Rtl}
                  />
                )}
              </>
            ) : (
              <></>
            )}
            {hasSpecialButton && (
              <>
                {specialButton &&
                  specialButton.map((button, index) => (
                    <CustomButton
                      key={index}
                      Icon={button.icon}
                      title={button.title}
                      onPress={() => {
                        button.action(selectedRow);
                      }}
                      width={button.width}
                      backgroundColor={button.backgroundColor}
                      textColor={button.textColor}
                    />
                  ))}
              </>
            )}
          </View>

          {loading && refetch == 0 ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : error && data.length > 0 ? (
            <Text style={{ textAlign: 'center', color: 'red' }}>{error}</Text>
          ) : (
            <ScrollView horizontal={true} ref={scrollViewRef}>
              <View className="mb-16 px-2">
                {/* Table Header */}
                <Table>
                  <View className={`${Rtl ? 'flex-row-reverse' : 'flex-row'}`}>
                    <View
                      style={[styles.head, { flexDirection: Rtl ? 'row-reverse' : 'row' }]}
                      className={'bg-[#F3F3F3] px-3'}>
                      <View className={'bg-[#F3F3F3] px-3'}></View>
                    </View>
                    <Row
                      className={`flex font-tbold text-base`}
                      data={state.tableHead} // Visible headers
                      widthArr={widthArr} // Dynamic widths
                      style={{
                        ...styles.head,
                        flexDirection: Rtl ? 'row-reverse' : 'row',
                      }}
                      textStyle={styles.headerText}
                    />
                  </View>
                </Table>

                {/* Table Body with FlatList */}
                <FlatList
                  data={data}
                  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                  maxToRenderPerBatch={30}
                  initialNumToRender={50}
                  keyboardShouldPersistTaps="handled"
                  scrollEnabled
                  nestedScrollEnabled
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item: dataRow, index }) => (
                    <RenderRows
                      Expandednodes={Expandednodes}
                      setExpandednodes={setExpandednodes}
                      isNested={isNested}
                      dataRow={dataRow}
                      index={index}
                      pk={pk}
                      handleDoubleClick={handleDoubleClick}
                      handleRowPress={handleRowPress}
                      selectedRow={selectedRow}
                      highlight={highlight}
                      widthArr={widthArr}
                      filteredTableHead={filteredTableHead}
                    />
                  )}
                />
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
                        <FlatList
                          keyboardShouldPersistTaps="handled"
                          maxToRenderPerBatch={10}
                          windowSize={5}
                          initialNumToRender={10}
                          style={{
                            maxHeight: screenWidth,
                            width: '100%',
                            marginBottom: 5,
                          }}
                          data={tableHead}
                          keyExtractor={(item) => item.key}
                          contentContainerStyle={{
                            paddingHorizontal: 16,
                            paddingVertical: 8,
                          }}
                          nestedScrollEnabled
                          renderItem={({ item }) => {
                            return (
                              <>
                                {item?.input && item?.input !== 'false' && (
                                  <View style={styles.inputContainer}>
                                    <Text className="my-2 font-tmedium text-base font-medium">
                                      {item.label}
                                    </Text>
                                    <KeyboardAvoidingView behavior="padding">
                                      <RenderInput
                                        inputkey={item.key}
                                        label={item.label}
                                        type={item.type}
                                        value={rowData[item.key]}
                                        options={item.options}
                                        lines={item.lines}
                                        setRowData={setRowData}
                                        handleDropdownChange={handleDropDownChange}
                                        dynamicCode={dynamicCode}
                                        code={code}
                                      />
                                      {errors[item.key] && (
                                        <Text
                                          style={{
                                            fontSize: labelFontSize * 1.2,
                                            marginVertical: hp('.5%'),
                                            // color: 'red',
                                            textAlign: 'center',
                                          }}>
                                          {errors[item.key]}
                                        </Text>
                                      )}
                                    </KeyboardAvoidingView>
                                  </View>
                                )}
                              </>
                            );
                          }}
                        />

                        <MainButton
                          title={
                            modalType === 'add'
                              ? Lang == 1
                                ? 'إضافه'
                                : 'Add'
                              : Lang == 1
                                ? 'حفظ التعديل'
                                : 'Edit'
                          }
                          icon={ArrowLineUpRight}
                          handlePress={confirmAction}
                          isLoading={modelLoader}
                          containerStyles={'mt-4 flex items-center '}
                          width={wp('50%')}
                        />
                      </>
                    ) : (
                      <View className="text-center ">
                        <Image source={Warning} className="mx-auto h-16 w-16"></Image>
                        <Text className="text-center font-tbold">هل تريد تأكيد عملية الحذف؟</Text>
                        <Text className="text-center font-tmedium">
                          يرجي العلم انه سوف تفقد كافة البيانات الخاصة بهذا الادخال
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
                            {modelLoader && (
                              <ActivityIndicator
                                animating={modelLoader}
                                color="#fff"
                                size="small"
                                className="ml-2"
                              />
                            )}
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
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = {
  buttonContainer: {
    flexDirection: 'row-reverse',

    marginBottom: 16,
  },
  head: {
    height: 50,
    backgroundColor: '#F3F3F3',
    FontWeight: 'bold',
  },
  headerText: {
    textAlign: 'center',
    fontFamily: 'Tajawal-Medium',
    fontSize: 16,
  },
  text: {
    textAlign: 'center',
    fontFamily: 'Tajawal-Medium',
    fontSize: 16,
  },
  row: {
    // height: "fit-contant",
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
    padding: 16,
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

export default DraftGrid;

// const RenderRows = ({
//   dataRow,
//   index,
//   depth = 0,
//   pk,
//   handleDoubleClick,
//   handleRowPress,
//   selectedRow,
//   highlight,
//   widthArr,
//   filteredTableHead = [],
//   isNested,
// }) => {
//   if (!dataRow) return null; // ✅ Prevents error

//   return (
//     <>
//       <View key={dataRow[pk] || `row-${index}`} className="flex-row-reverse">
//         {isNested && (
//           <TouchableOpacity className="bg-[#f9f9f9]">
//             <Text className="text-lg">+</Text>
//           </TouchableOpacity>
//         )}
//         <TouchableOpacity
//           onLongPress={() => handleDoubleClick(dataRow, index)}
//           onPress={() => handleRowPress(dataRow, index)}
//         >
//           <Row
//             className={`flex flex-row-reverse ${!isNested ? "p-2" : ""}`}
//             style={[
//               styles.row,
//               !isNested
//                 ? index % 2 === 0
//                   ? { backgroundColor: "#ffffff" }
//                   : { backgroundColor: "#f9f9f9" }
//                 : "",
//               pk &&
//                 selectedRow?.[pk] === dataRow[pk] && {
//                   backgroundColor: "#227099",
//                 },
//               highlight?.col &&
//                 dataRow[highlight.col] == highlight.value && {
//                   backgroundColor: highlight.bgcolor,
//                 },
//               isNested && {
//                 paddingRight: depth * 40,
//               },
//             ]}
//             textStyle={styles.text}
//             widthArr={widthArr}
//             data={filteredTableHead?.map((col, idx) => {
//               if (!col) return null; // ✅ Prevents error

//               const item = col.key ? dataRow[col.key] ?? "" : "";

//               let content;
//               if (col?.type === "checkbox") {
//                 content = (
//                   <View
//                     key={`checkbox-${idx}`}
//                     style={{
//                       width: widthArr[idx],
//                       justifyContent: "center",
//                       alignItems: "center",
//                     }}
//                   >
//                     <CheckBox
//                       value={!!item}
//                       isEditable={false}
//                       onChange={() => {}}
//                     />
//                   </View>
//                 );
//               } else {
//                 content = (
//                   <Text
//                     className="line-clamp-3 p-2"
//                     key={`text-${idx}`}
//                     style={[
//                       styles.text,
//                       {
//                         width: widthArr[idx],
//                         textAlign: "center",
//                         overflow: "hidden",
//                       },
//                       pk &&
//                         selectedRow?.[pk] === dataRow[pk] && {
//                           color: "#ffffff",
//                         },
//                     ]}
//                     numberOfLines={3}
//                   >
//                     {col.type === "date" && item
//                       ? item.split("T")[0]
//                       : col.type === "price"
//                       ? priceFormatter(item)
//                       : item}
//                   </Text>
//                 );
//               }

//               return (
//                 <View
//                   key={`view-${idx}`}
//                   className={`${
//                     isNested && selectedRow?.[pk] !== dataRow?.[pk]
//                       ? "bg-[#f9f9f9]"
//                       : ""
//                   } ${
//                     isNested && idx === 0 ? "border-r-2 border-r-[#227099]" : ""
//                   }`}
//                 >
//                   {content}
//                 </View>
//               );
//             })}
//           />
//         </TouchableOpacity>
//       </View>

//       {isNested &&
//         Array.isArray(dataRow.children) &&
//         dataRow.children.length > 0 && (
//           <View>
//             {dataRow.children.map((child, idx) => (
//               <RenderRows
//                 key={`${child?.[pk] || idx * (depth + 1)}`} // ✅ Ensures unique key
//                 dataRow={child}
//                 index={idx}
//                 depth={depth + 1}
//                 pk={pk}
//                 handleDoubleClick={handleDoubleClick}
//                 handleRowPress={handleRowPress}
//                 selectedRow={selectedRow}
//                 highlight={highlight}
//                 widthArr={widthArr}
//                 filteredTableHead={filteredTableHead}
//                 isNested
//               />
//             ))}
//           </View>
//         )}
//     </>
//   );
// };
