import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
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
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  RefreshControl,
} from 'react-native';
import MainGridText from '../../constants/Lang/components/MainGridLang';
import { Table, Row } from 'react-native-table-component';
// import { CustomButton, MainButton, CheckBox, DatePickerInput, Dropdown, FormField } from '../index';
import MainButton from '../UI/MainButton';
import CheckBox from '../UI/CheckBox';
import DatePickerInput from '../UI/DatePickerInput';
import Dropdown from '../UI/DropDown';
import FormField from '../UI/FormField';
import CustomButton from '../UI/CrudButton';
import PencilLine from '../../assets/images/PencilLine.png';
import add_outline from '../../assets/images/add_outline.png';
import trashh from '../../assets/images/trashh.png';
import Warning from '../../assets/images/Warning.png';
import ArrowLineUpRight from '../../assets/images/ArrowLineUpRight.png';
import { useRouter } from 'expo-router';
import api from '../../utilities/api';
import { priceFormatter } from '../../utilities/dateFormater';
import Toast from 'react-native-toast-message';
import { useGlobalContext } from '../../context/GlobalProvider';
import ReportDropDown from '../UI/ReportDropDown';
import MultiSelectComponent from '../UI/MultiSelectDropDown';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useTableApi } from '../../hooks/useTableApi';
import { useModalManager } from '../../hooks/useModalManager';
import useTableActions from '../../hooks/useTableActions'; // Adjust path based on your project structure

import { RenderInput } from '../../utilities';

const RenderReportInput = ({ item, setFilters, filters }) => {
  const { Rtl, company, DepartmentID } = useGlobalContext();
  // console.log(item, 'each item');

  switch (item?.SelectionTypeName) {
    case 'Combo':
      return (
        <ReportDropDown
          key={item?.FilterFieldName} // Ensure a unique key for each element
          FilterFieldName={item?.FilterFieldName}
          ValueField={item?.ValueField}
          title={item?.TitleAr}
          TextField={item?.TextField}
          spName={item?.spName}
          value={filters[item?.ValueField]}
          params={
            item.Dependent == 1
              ? Object.entries(filters)
                  .filter(([key]) => key !== item.ValueField)
                  .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {})
              : []
          }
          onChange={(e) => {
            setFilters({
              ...filters,
              [item?.ValueField]: e,
            });
          }}
        />
      );

    case 'Typing Text':
      return (
        <FormField
          key={item?.ValueField} // Ensure a unique key for each element
          type="text"
          className="border-gray-300 rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={filters[item?.ValueField]}
          handleChangeText={(e) => {
            setFilters({
              ...filters,
              [item?.ValueField]: e,
            });
          }}
        />
      );
    case 'Date From To':
      return (
        <>
          <View className="flex items-center gap-1">
            <DatePickerInput
              setDate={(e) => {
                setFilters({
                  ...filters,
                  DateFrom: e,
                });
              }}
              title={'الفترة من'}
            />
          </View>
          <View className="flex items-center gap-1">
            <DatePickerInput
              // value={fillter?.DateTo || ""}
              parentStyle={'w-[180px]'}
              setDate={(e) => {
                setFilters({
                  ...filters,
                  DateTo: e,
                });
              }}
              title={'الفترة الى'}
            />
          </View>
        </>
      );

    case 'List Multi Select':
      return (
        <MultiSelectComponent
          title={item?.TitleAr}
          ValueField={item?.ValueField}
          FilterFieldName={item?.FilterFieldName}
          TextField={item?.TextField}
          spName={item?.spName}
          value={filters[item?.ValueField]}
          onChange={(e) => {
            setFilters((filter) => {
              return {
                ...filter,
                MultiSelectDropdown: e,
              };
            });
          }}
        />
      );

    default:
      return <></>; // Handle unexpected types gracefully
  }
};

const MainGrid = ({
  tableHead,
  pk = false,
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
  onRowPress = () => {},
  insRoute = '',
  reports = false,
}) => {
  const router = useRouter();

  const [refreshing, setRefreshing] = useState(false);
  const { Rtl, Lang, company } = useGlobalContext();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refetch, setRefetch] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [modelLoader, setModelLoader] = useState(false);
  const [reportFilters, setReportFilters] = useState([]);
  // Modal states
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState(''); // "add", "edit", or "delete"
  const [code, setCode] = useState(false);
  const [filters, setFilters] = useState({});
  const [errorMessage, setErrorMessage] = useState(false);
  const [errors, setErrors] = useState({});
  const windowWidth = Dimensions.get('window').width;

  const [circleSize, setCircleSize] = useState(wp('14%'));
  const [labelFontSize, setLabelFontSize] = useState(hp('1.5%'));
  const [valueFontSize, setValueFontSize] = useState(hp('2%'));
  const [rowHeight, setRowHeight] = useState(hp('6%')); // New responsive row height
  const [rowData, setRowData] = useState(Object.fromEntries(tableHead.map((col) => [col.key, ''])));
  const { confirmAction } = useTableActions({
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
  });

  // const [widthArr, setWidthArr] = useState([]);
  //(data, "sadojasdhsado");
  const scrollViewRef = useRef(null);

  // Filter the table headers based on the 'visible' property
  const filteredTableHead = tableHead.filter(
    (header) => (header.visible || header.visible === 'true') && header.visible !== 'false'
  );
  // console.log(tableHead[0].input, 'header.input');

  // Create state with only visible headers
  const state = {
    tableHead: filteredTableHead.map((col) => col.label), // Map visible headers to their labels
  };

  const screenWidth = Dimensions.get('window').width - 16;

  const widthArr = useMemo(() => {
    const totalCols = filteredTableHead.length;

    if (mixedWidth) {
      let fixedWidth = 0;
      let num = 0;

      filteredTableHead.forEach((col) => {
        if (col.width) {
          fixedWidth += col.width;
          num++;
        }
      });

      const remainingWidth = screenWidth - fixedWidth;
      const extraPerCol =
        remainingWidth > 0 && totalCols > num ? remainingWidth / (totalCols - num) : 0;

      if (num === totalCols && fixedWidth < screenWidth) {
        return filteredTableHead.map(() => screenWidth / totalCols);
      } else {
        return filteredTableHead.map((col) => col.width || extraPerCol);
      }
    }

    if (StaticWidth) {
      const totalWidth = filteredTableHead.reduce((sum, col) => sum + (col.width || 0), 0);

      if (totalWidth < screenWidth && totalCols < 10) {
        return filteredTableHead.map(() => screenWidth / totalCols);
      } else {
        return filteredTableHead.map((col) => col.width || screenWidth / totalCols);
      }
    }

    const colWidth = screenWidth / totalCols;
    return Array(totalCols).fill(colWidth);
  }, [filteredTableHead, mixedWidth, StaticWidth]);

  const handleDoubleClick = (row) => {
    if (!routeTo) return;

    // ✅ If routeTo is a function, just call it
    if (typeof routeTo === 'function') {
      routeTo(row);
      return;
    }

    // ✅ Otherwise, assume it's an object
    if (routeTo.hasSpecialVal && routeTo.specialVal) {
      if (row[routeTo.specialVal.col] === routeTo.specialVal.value) {
        router.push({
          pathname: routeTo.path,
          ...(routeTo.hasParams && { params: { ...row, ...routeTo.params } }),
        });
      }
    } else {
      router.push({
        pathname: routeTo.path,
        ...(routeTo.hasParams && { params: { ...row, ...routeTo.params } }),
      });
    }
  };

  const { fetchNextCode, fetchReportFilters } = useTableApi();

  const showErrorToast = (msg = 'حدث خطأ اثناء تنفيذ العملية') => {
    Toast.show({
      type: 'error',
      text1: 'حدث خطأ',
      text2: msg,
      autoHide: true,
      visibilityTime: 3000,
      text1Style: { textAlign: 'right' },
      text2Style: { textAlign: 'right' },
    });
  };

  const { openModal } = useModalManager({
    setModalVisible,
    setModalType,
    setRowData,
    showErrorToast,
  });

  // handlers
  const handleAdd = async () => {
    if (dynamicCode) {
      try {
        const code = await fetchNextCode(
          dynamicCode.tbName,
          dynamicCode.codeCol,
          dynamicCode.CompanyID || company
        );
        setCode(code);
      } catch {
        showErrorToast('حدث خطأ اثناء تنفيذ العمليه حاول مره اخرى ❌');
      } finally {
        setLoading(false);
      }
    }

    const emptyRow = Object.fromEntries(tableHead.map((col) => [col.key, '']));
    setRowData({ [dynamicCode.codeCol]: code, ...emptyRow });
    openModal('add');
  };

  const handleEdit = () => openModal('edit', selectedRow);

  const handleDelete = () => openModal('delete', selectedRow);

  const handleReport = async () => {
    if (!selectedRow) return showErrorToast('من فضلك اختر صف لاستكمال العمليه');

    try {
      const filters = await fetchReportFilters(selectedRow.ReportID);
      setReportFilters(filters);
      openModal('report', selectedRow);
    } catch (err) {
      console.log(err);
      showErrorToast();
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setRefetch((prev) => prev + 1);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const validateFields = () => {
    const newErrors = {};
    for (const header of tableHead) {
      // console.log(header.input, 'header.input');
      const isInput = header.input && header.input != 'false';
      const isRequired = header.required;
      const valueMissing = !rowData[header.key];

      // 👇 Skip if it's the dynamicCode field
      const isDynamicField = dynamicCode && dynamicCode.codeCol === header.key;

      if (isInput && isRequired && valueMissing && !isDynamicField) {
        newErrors[header.key] = `${header.label} مطلوب ولا يمكن أن يكون فارغًا.`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onConfirm = useCallback(() => {
    confirmAction({
      modalType,
      rowData,
      filters,
      validateFields,
      insRoute,
      spIns,
      spUpd,
      spDel,
      InsParam,
      UpdParam,
      DelParam,
      InsBody,
      UpdBody,
    });
  }, [
    confirmAction,
    modalType,
    rowData,
    filters,
    validateFields,
    insRoute,
    spIns,
    spUpd,
    spDel,
    InsParam,
    UpdParam,
    DelParam,
    InsBody,
    UpdBody,
  ]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      //("ScrollView Ref:", scrollViewRef.current); // Debugging
      if (scrollViewRef.current && Rtl) {
        scrollViewRef.current?.scrollToEnd({ animated: false });
      }
    }, 500); // Delay by 100ms to allow rendering

    return () => clearTimeout(timeout); // Cleanup timeout
  }, [scrollViewRef, data]); // Re-run effect when data changes

  // console.log(errorMessage, 'ereee');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let params = ``;
        let url = ``;

        TrxParam != [] &&
          TrxParam.map((p) => {
            if (p.name == 'CompanyID') {
              console.log(p.name);
            } else {
              p.rowData
                ? (params = params + `&${p.name}=${selectedRow[p.value]}`)
                : (params = params + `&${p.name}=${p.value}`);
            }
          });
        TrxParam != []
          ? (url = `/table?sp=${spTrx}${params}&CompanyID=${company}`)
          : `/table?sp=${spTrx}&CompanyID=${company}`;

        const response = await api.get(url);

        //console.log(response.data.data, 'response.data.data');

        setData(response.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [refetch, ...TrxDependency]);

  useEffect(() => {
    if (windowWidth < 400) {
      setCircleSize(wp('14%'));
      setLabelFontSize(hp('1.7%'));
      setValueFontSize(hp('2%'));
      setRowHeight(hp('7.5%'));
    } else if (windowWidth < 750) {
      setCircleSize(wp('12%'));
      setLabelFontSize(hp('1.2%'));
      setValueFontSize(hp('2.3%'));
      setRowHeight(hp('6.5%'));
    } else {
      setCircleSize(wp('9%'));
      setLabelFontSize(hp('1.2%'));
      setValueFontSize(hp('1.8%'));
      setRowHeight(hp('6.5%'));
    }
  }, [windowWidth]);

  // console.log('modal type', modalType);
  // console.log('rowData', rowData);

  // console.log('selected Row', selectedRow);

  // console.log('data', data);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={{ flex: 1 }} keyboardShouldPersistTaps="handled">
          <View
            style={{ paddingHorizontal: 10 }}
            className={`${Rtl ? 'flex-row-reverse' : 'flex-row'} my-2 items-center justify-between`}>
            <View className={`relative flex-wrap ${Rtl ? 'flex-row-reverse' : 'flex-row'}`}>
              {hasCrud && hasCrud !== 'false' ? (
                <>
                  {hasIns && (
                    <CustomButton
                      Icon={add_outline}
                      title={MainGridText.addBtn[Lang]}
                      onPress={handleAdd}
                      Rtl={Rtl}
                    />
                  )}
                  {hasUpd && (
                    <CustomButton
                      Icon={PencilLine}
                      title={MainGridText.editBtn[Lang]}
                      onPress={handleEdit}
                      Rtl={Rtl}
                    />
                  )}
                  {hasDel && (
                    <CustomButton
                      Icon={trashh}
                      title={MainGridText.deleteBtn[Lang]}
                      onPress={handleDelete}
                      Rtl={Rtl}
                    />
                  )}
                </>
              ) : (
                <>
                  {reports && (
                    <CustomButton
                      Icon={PencilLine}
                      title={MainGridText.reportsBtn[Lang]}
                      onPress={handleReport}
                      Rtl={Rtl}
                    />
                  )}
                </>
              )}
              {hasSpecialButton && (
                <View className="my-3 flex flex-row gap-2">
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
                        Rtl={Rtl}
                      />
                    ))}
                </View>
              )}
            </View>
            <View
              style={[
                {
                  width: circleSize,
                  height: circleSize,
                  borderRadius: '50%',
                },
              ]}
              className={`items-center justify-center rounded-full bg-[#F6F6F6] shadow-md`}>
              <Text
                style={{
                  fontSize: labelFontSize,
                }}
                className="text-xs font-semibold text-[#333]">
                {MainGridText.total[Lang]}
              </Text>
              <Text
                style={{
                  fontSize: labelFontSize,
                }}
                className="text-md font-bold text-[#333]">
                {data.length}
              </Text>
            </View>
          </View>

          {loading && refetch === 0 ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : error && data.length === 0 ? (
            <Text style={{ textAlign: 'center', color: 'red' }}>{error}</Text>
          ) : (
            <ScrollView horizontal={true} ref={scrollViewRef} style={{ flex: 1 }}>
              <View style={{ flex: 1 }}>
                {/* Table Header */}
                <Table>
                  <Row
                    className={`font-tbold text-base`}
                    data={state.tableHead} // Visible headers
                    widthArr={widthArr} // Dynamic widths
                    style={[
                      styles.head,
                      { height: rowHeight, flexDirection: Rtl ? 'row-reverse' : 'row' },
                    ]}
                    textStyle={{
                      ...styles.text,
                      fontSize: labelFontSize * 1.2,
                    }}
                  />
                </Table>
                {/* Table Body with FlatList */}
                <FlatList
                  data={data}
                  contentContainerStyle={{ paddingBottom: 100 }}
                  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                  maxToRenderPerBatch={30}
                  initialNumToRender={50}
                  keyboardShouldPersistTaps="handled"
                  nestedScrollEnabled
                  keyExtractor={(item, index) => `${item[pk]}-${index}`}
                  renderItem={({ item: dataRow, index }) => (
                    <TouchableOpacity
                      onLongPress={() => handleDoubleClick(dataRow)}
                      onPress={() => {
                        setSelectedRow(dataRow);
                        onRowPress(dataRow);
                      }}>
                      <Row
                        style={[
                          styles.row,
                          index % 2 === 0
                            ? { backgroundColor: '#ffffff' }
                            : { backgroundColor: '#f9f9f9' },
                          pk &&
                            selectedRow &&
                            selectedRow[`${pk}`] === dataRow[`${pk}`] && {
                              backgroundColor: '#227099',
                            },
                          highlight &&
                            dataRow[`${highlight.col}`] === highlight?.value && {
                              backgroundColor: highlight.bgcolor,
                            },
                          {
                            minHeight: rowHeight * 0.8,
                            flexDirection: Rtl ? 'row-reverse' : 'row',
                          },
                        ]}
                        textStyle={{ ...styles.text, fontSize: valueFontSize * 1.6 }}
                        widthArr={widthArr} // Dynamic widths
                        data={filteredTableHead.map((col, idx) => {
                          const columnKey =
                            typeof col.key === 'function' ? col.key(dataRow) : col.key;

                          const item = dataRow[columnKey];
                          if (col?.type === 'checkbox') {
                            return (
                              <View
                                key={idx}
                                style={{
                                  width: widthArr[idx],
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <CheckBox value={item} isEditable={false} />
                              </View>
                            );
                          } else {
                            return (
                              <Text
                                className="line-clamp-3"
                                key={idx}
                                style={[
                                  styles.text,
                                  {
                                    width: widthArr[idx],
                                    textAlign: 'center',
                                    overflow: 'hidden',
                                  },
                                  pk &&
                                    selectedRow &&
                                    selectedRow[`${pk}`] === dataRow[`${pk}`] && {
                                      color: '#ffffff',
                                    },
                                ]}
                                numberOfLines={3}>
                                {col.type === 'date' && item
                                  ? item?.includes('T')
                                    ? item?.split('T')[0]
                                    : item
                                  : col.type === 'price'
                                    ? priceFormatter(item)
                                    : item}
                              </Text>
                            );
                          }
                        })}
                      />
                    </TouchableOpacity>
                  )}
                />
              </View>
            </ScrollView>
          )}

          {/* Modal */}
          <Modal animationType="fade" visible={modalVisible} transparent={true}>
            <TouchableWithoutFeedback
              onPress={() => {
                setModalVisible(false);
                setErrorMessage(false);
                setCode(false);
                setErrors({});
                setSelectedRow(null);
              }}>
              <View style={styles.modalOverlay} dir={Rtl}>
                <TouchableWithoutFeedback>
                  <View style={styles.modalContent}>
                    {modalType == 'report' ? (
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
                          data={reportFilters}
                          keyExtractor={(item) => item.ReportFilterID}
                          contentContainerStyle={{
                            paddingHorizontal: 16,
                            paddingVertical: 8,
                          }}
                          nestedScrollEnabled
                          renderItem={({ item }) => {
                            return (
                              <>
                                <View style={styles.inputContainer}>
                                  <Text className="my-2 font-tmedium text-base font-medium">
                                    {item.TitleAr}
                                  </Text>
                                  <KeyboardAvoidingView behavior="padding">
                                    <RenderReportInput
                                      item={item}
                                      filters={filters}
                                      setFilters={setFilters}
                                    />
                                  </KeyboardAvoidingView>
                                </View>
                              </>
                            );
                          }}
                        />

                        <MainButton
                          title={MainGridText.reportsBtn[Lang]}
                          icon={ArrowLineUpRight}
                          handlePress={onConfirm}
                          isLoading={modelLoader}
                          containerStyles={'mt-4 flex items-center '}
                          width={wp('50%')}
                        />
                      </>
                    ) : modalType !== 'delete' ? (
                      <>
                        <FlatList
                          keyboardShouldPersistTaps="handled"
                          nestedScrollEnabled={true}
                          removeClippedSubviews={false}
                          maxToRenderPerBatch={10}
                          windowSize={10}
                          initialNumToRender={5}
                          style={{
                            maxHeight: screenWidth,
                            width: '100%',
                            marginBottom: 5,
                            // backgroundColor:"red",
                          }}
                          data={tableHead}
                          keyExtractor={(item, index) => `${item.key}-${index}`}
                          contentContainerStyle={{
                            paddingHorizontal: wp('1%'),
                            paddingVertical: wp('2%'),
                          }}
                          renderItem={({ item }) => {
                            const type =
                              typeof item.type === 'function' ? item?.type(rowData) : item?.type;

                            const options =
                              typeof item.options === 'function'
                                ? item?.options(rowData)
                                : item?.options;

                            const key =
                              typeof item?.key === 'function' ? item?.key?.(rowData) : item?.key;

                            const addParams = item?.addParams && item?.addParams?.(rowData);

                            return (
                              <>
                                {item?.input && item?.input !== 'false' && (
                                  <View
                                    style={[styles.inputContainer, { paddingVertical: hp('.5%') }]}>
                                    <Text
                                      style={{
                                        fontSize: labelFontSize * 1.2,
                                        marginVertical: hp('1.5%'),
                                      }}
                                      className="font-tmedium text-base font-medium">
                                      {item.label}
                                    </Text>
                                    <KeyboardAvoidingView behavior="padding">
                                      <RenderInput
                                        inputkey={key}
                                        label={item.label}
                                        type={type}
                                        value={rowData[key]}
                                        onChange={item.onChange}
                                        options={options}
                                        lines={item.lines}
                                        setRowData={setRowData}
                                        handleDropdownChange={handleDropDownChange}
                                        dynamicCode={dynamicCode}
                                        code={code}
                                        input={item.input}
                                        preventDefault={item.preventDefault}
                                        sp={item.sp}
                                        addParams={addParams}
                                      />
                                      {errors[item.key] && (
                                        <Text
                                          style={{
                                            fontSize: labelFontSize * 1.2,
                                            marginVertical: hp('.5%'),
                                          }}
                                          className="text-center font-tmedium text-red-600">
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

                        <View style={{ marginBottom: hp('1%') }}>
                          <MainButton
                            title={modalType === 'add' ? 'إضافه' : 'حفظ التعديل'}
                            icon={ArrowLineUpRight}
                            // handlePress={async () => {
                            //   await confirmAction(); // Only call confirmAction if valid
                            // }}
                            handlePress={onConfirm}
                            isLoading={modelLoader}
                            containerStyles={'mt-4 flex items-center '}
                            width={wp('50%')}
                          />
                        </View>
                      </>
                    ) : (
                      <View className="text-center ">
                        <Image
                          source={Warning}
                          className="mx-auto"
                          style={{
                            width:
                              windowWidth < 400
                                ? wp('18%')
                                : windowWidth < 750
                                  ? wp('15%')
                                  : wp('12%'),
                            height:
                              windowWidth < 400
                                ? wp('18%')
                                : windowWidth < 750
                                  ? wp('15%')
                                  : wp('12%'),
                            marginVertical: hp('1%'),
                          }}></Image>
                        <Text
                          style={{
                            fontSize: labelFontSize * 1.3,
                            marginTop: hp('1%'),
                          }}
                          className="text-center font-tbold">
                          هل تريد تأكيد عملية الحذف؟
                        </Text>
                        <Text
                          style={{
                            fontSize: labelFontSize * 1.2,
                            marginVertical: hp('1%'),
                          }}
                          className="text-center font-tmedium">
                          يرجي العلم انه سوف تفقد كافة البيانات الخاصة بهذا الادخال{' '}
                        </Text>
                        <View
                          style={{ marginBottom: hp('1%') }}
                          className="mt-4 flex flex-row justify-center ">
                          <TouchableOpacity
                            style={{
                              width:
                                windowWidth < 400
                                  ? wp('20%')
                                  : windowWidth < 750
                                    ? wp('15%')
                                    : wp('13%'),
                            }}
                            className=" mx-2 flex flex-row items-center  justify-center rounded-md border-[.5px]  border-[#133E54] bg-none px-4 py-2"
                            onPress={() => setModalVisible(false)}>
                            <Text
                              style={{
                                fontSize: labelFontSize * 0.9,
                              }}
                              className="font-tbold text-[#133E54]">
                              إلغاء
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={{
                              width:
                                windowWidth < 400
                                  ? wp('20%')
                                  : windowWidth < 750
                                    ? wp('15%')
                                    : wp('13%'),
                            }}
                            className="mx-2 flex  w-[69px] flex-row items-center justify-center rounded-md bg-[#F15555]"
                            onPress={onConfirm}>
                            <Text
                              style={{
                                fontSize: labelFontSize,
                              }}
                              className="font-tbold text-white">
                              حذف
                            </Text>
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
    backgroundColor: '#F6F6F6',
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

export default MainGrid;
