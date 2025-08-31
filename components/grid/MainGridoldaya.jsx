import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  RefreshControl,
  View,
  ScrollView,
  SafeAreaView,
  Alert,
  Dimensions,
  TouchableOpacity,
  Modal,
  Text,
  Image,
  TextInput,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import MainGridText from '../../constants/Lang/components/MainGridLang.js';
import { CustomButton, MainButton, CheckBox, DatePickerInput, Dropdown, FormField } from '../index';
import PencilLine from '../../assets/images/PencilLine.png';
import add_outline from '../../assets/images/add_outline.png';
import trashh from '../../assets/images/trashh.png';
import Warning from '../../assets/images/Warning.png';
import ArrowLineUpRight from '../../assets/images/ArrowLineUpRight.png';
import { useRouter } from 'expo-router';
import api, { REPORT_SERVER_URL } from '../../utilities/api.js';
import { priceFormatter } from '../../utilities/dateFormater.js';
import { HandleDropdownFormat } from '../../hooks/useDropDownData.jsx';
import CustomDropDown from '../UI/CustomDropDown.jsx';
import Toast from 'react-native-toast-message';
import { useGlobalContext } from '../../context/GlobalProvider.js';
import ReportDropDown from '../UI/ReportDropDown.jsx';
import MultiSelectComponent from '../UI/MultiSelectDropDown.jsx';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useTableApi } from '../../hooks/useTableApi.jsx';
import { useModalManager } from '../../hooks/useModalManager.jsx';
import useTableActions from '../../hooks/useTableActions.jsx';
import MainGridLang from '../../constants/Lang/MainGridLang.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Row, Table } from 'react-native-table-component';

const RenderInput = React.memo(
  ({
    inputkey,
    label,
    type,
    value,
    options = [],
    lines = 4,
    onChange,
    children = [],
    handleDropdownChange,
    dynamicCode,
    code,
    Rtl,
    IsPaginated,
    spName,
    dependencies,
  }) => {
    const { Lang } = useGlobalContext();
    const windowWidth = Dimensions.get('window').width;
    const [valueFontSize, setValueFontSize] = useState(hp('2%'));
    const [inputHeight, setInputHeight] = useState(hp('6%'));

    const handleInputChange = (key, value, inputType) => {
      if (inputType === 'dropdown' && handleDropdownChange) {
        handleDropdownChange(inputkey, value);
      }
      onChange(key, value);
    };

    useEffect(() => {
      if (code && dynamicCode && dynamicCode.codeCol === inputkey) {
        handleInputChange(dynamicCode.codeCol, code);
      }
    }, [code, dynamicCode, inputkey]);

    useEffect(() => {
      if (windowWidth < 400) {
        setValueFontSize(hp('2%'));
        setInputHeight(hp('6.5%'));
      } else if (windowWidth < 750) {
        setValueFontSize(hp('1.8%'));
        setInputHeight(hp('5.5%'));
      } else {
        setValueFontSize(hp('1.6%'));
        setInputHeight(hp('5%'));
      }
    }, [windowWidth]);

    switch (type) {
      case 'number':
      case 'price':
        return (
          <TextInput
            style={{
              fontSize: valueFontSize,
              height: inputHeight,
            }}
            className={`w-full rounded-lg border-[.5px] border-[#1C5B7D] p-4 text-right text-sm font-medium focus:border-[#133e5475] ${
              !Rtl && 'text-left'
            }`}
            keyboardType="numeric"
            value={`${code && dynamicCode.codeCol === inputkey ? code : value ? value : ''}`}
            onChangeText={(text) => handleInputChange(inputkey, text)}
            editable={dynamicCode && dynamicCode.codeCol === inputkey ? false : true}
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
            style={{
              fontSize: valueFontSize,
              height: inputHeight,
            }}
            className={`w-full rounded-lg border-[.5px] border-[#1C5B7D] p-4 text-right text-sm font-medium focus:border-[#133e5475] ${
              !Rtl && 'text-left'
            }`}
            multiline
            numberOfLines={lines || 4}
            value={`${code && dynamicCode.codeCol === inputkey ? code : value ? value : ''}`}
            onChangeText={(text) => handleInputChange(inputkey, text)}
            editable={dynamicCode && dynamicCode.codeCol === inputkey ? false : true}
          />
        );

      case 'dropdown':
        return (
          <Dropdown
            placeholder={MainGridLang.Choose[Lang]}
            IsPaginated={IsPaginated}
            spName={spName}
            dependencies={dependencies}
            data={options ? options : ''}
            value={value}
            initailOption={value}
            onChange={(v) => handleInputChange(inputkey, v, type)}
          />
        );

      default:
        return (
          <TextInput
            style={{
              fontSize: valueFontSize,
              height: inputHeight,
            }}
            className={`w-full rounded-lg border-[.5px] border-[#1C5B7D] p-4 text-right text-sm font-medium focus:border-[#133e5475] ${
              !Rtl && 'text-left'
            }`}
            value={`${code && dynamicCode.codeCol === inputkey ? code : value ? value : ''}`}
            onChangeText={(text) => handleInputChange(inputkey, text)}
            editable={dynamicCode && dynamicCode.codeCol === inputkey ? false : true}
          />
        );
    }
  }
);

const RenderReportInput = React.memo(({ item, setFilters, filters }) => {
  const { Lang } = useGlobalContext();

  switch (item?.SelectionTypeName) {
    case 'Combo':
      return (
        <ReportDropDown
          key={item?.FilterFieldName}
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
          key={item?.ValueField}
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
              title={MainGridLang.periodfrom[Lang]}
            />
          </View>
          <View className="flex items-center gap-1">
            <DatePickerInput
              parentStyle={'w-[180px]'}
              setDate={(e) => {
                setFilters({
                  ...filters,
                  DateTo: e,
                });
              }}
              title={MainGridLang.periodto[Lang]}
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
      return <></>;
  }
});

const TableCell = React.memo(({ col, item, width, isSelected, highlight }) => {
  if (col?.type === 'checkbox') {
    return (
      <View className="items-center justify-center" style={{ width }}>
        <CheckBox value={item} isEditable={false} onChange={() => {}} />
      </View>
    );
  }

  const formatCellValue = (value, cellType) => {
    if (cellType === 'date' && value) return value.split('T')[0];
    if (cellType === 'price') return priceFormatter(value);
    return value;
  };

  return (
    <Text
      numberOfLines={3}
      className={`truncate text-center text-xs sm:text-sm md:text-base ${
        isSelected ? 'text-white' : 'text-[#333]'
      }`}
      style={{ width }}>
      {formatCellValue(item, col.type)}
    </Text>
  );
});

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
  IsPaginated = false,
  insRoute = '',
  reports = false,
}) => {
  const router = useRouter();
  const { Rtl, Lang, company } = useGlobalContext();

  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refetch, setRefetch] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);
  const [modelLoader, setModelLoader] = useState(false);
  const [reportFilters, setReportFilters] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [code, setCode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const PageSize = 15;
  const [filters, setFilters] = useState({});
  const [errorMessage, setErrorMessage] = useState(false);
  const [errors, setErrors] = useState({});
  const windowWidth = Dimensions.get('window').width;
  const [totalCount, setTotalCount] = useState(0);
  const [circleSize, setCircleSize] = useState(wp('14%'));
  const [labelFontSize, setLabelFontSize] = useState(hp('1.5%'));
  const [valueFontSize, setValueFontSize] = useState(hp('2%'));
  const [rowHeight, setRowHeight] = useState(hp('6%')); // New responsive row height
  const [rowData, setRowData] = useState(Object.fromEntries(tableHead.map((col) => [col.key, ''])));
  const scrollViewRef = useRef(null);
  const screenWidth = windowWidth - 16;
  const dynamicStyles = useMemo(() => {
    const styles = {};
    if (windowWidth < 400) {
      styles.circleSize = wp('14%');
      styles.labelFontSize = hp('1.7%');
      styles.valueFontSize = hp('2%');
      styles.rowHeight = hp('7.5%');
    } else if (windowWidth < 750) {
      styles.circleSize = wp('12%');
      styles.labelFontSize = hp('1.2%');
      styles.valueFontSize = hp('2.3%');
      styles.rowHeight = hp('6.5%');
    } else {
      styles.circleSize = wp('9%');
      styles.labelFontSize = hp('1.2%');
      styles.valueFontSize = hp('1.8%');
      styles.rowHeight = hp('6.5%');
    }
    return styles;
  }, [windowWidth]);

  const filteredTableHead = useMemo(
    () => tableHead.filter((header) => header.visible === 'true'),
    [tableHead]
  );

  const state = useMemo(
    () => ({
      tableHead: filteredTableHead.map((col) => col.label),
    }),
    [filteredTableHead]
  );

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
  }, [filteredTableHead, mixedWidth, StaticWidth, screenWidth]);

  const { fetchNextCode, fetchReportFilters } = useTableApi();
  const { confirmAction } = useTableActions({
    setSelectedRow,
    setRefetch,
    setRefreshing,
    setData,
    setCode,
    setModalVisible,
    setModelLoader,
    setErrorMessage,
    setErrors,
    setReportFilters,
    company,
  });
  console.log(refreshing);
  const showErrorToast = useCallback(
    (msg = MainGridLang.error[Lang]) => {
      Toast.show({
        type: 'error',
        text1: MainGridLang.error2[Lang],
        text2: msg,
        autoHide: true,
        visibilityTime: 3000,
        text1Style: { textAlign: 'right' },
        text2Style: { textAlign: 'right' },
      });
    },
    [Lang]
  );

  const { openModal } = useModalManager({
    setModalVisible,
    setModalType,
    setRowData,
    showErrorToast,
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      let params = ``;
      let url = ``;

      TrxParam.forEach((p) => {
        if (p.name !== 'CompanyID') {
          p.rowData
            ? (params = params + `&${p.name}=${selectedRow?.[p.value]}`)
            : (params = params + `&${p.name}=${p.value}`);
        }
      });

      url = `/table?sp=${spTrx}${params}&CompanyID=${company}`;

      const cacheKey = `${spTrx}-${company}-${JSON.stringify(TrxParam)}`;
      const cachedData = await AsyncStorage.getItem(cacheKey);

      if (cachedData) {
        setData(JSON.parse(cachedData));
      }
      const response = await api.get(url);
      setData(response.data.data);
      await AsyncStorage.setItem(cacheKey, JSON.stringify(response.data.data));
    } catch (err) {
      console.log(err);
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [spTrx, company, TrxParam]);

  useEffect(() => {
    console.log(refetch, 'changed');

    fetchData();
  }, [fetchData, refetch, ...TrxDependency, refreshing]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (scrollViewRef.current && Rtl) {
        scrollViewRef.current?.scrollToEnd({ animated: false });
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [scrollViewRef, data, Rtl]);

  const handleDoubleClick = useCallback(
    (row) => {
      if (routeTo) {
        if (routeTo.hasSpecialVal && routeTo.specialVal) {
          if (row[routeTo.specialVal.col] === routeTo.specialVal.value) {
            router.push({
              pathname: routeTo.path,
              ...(routeTo.hasParams && {
                params: { ...row, ...routeTo.params },
              }),
            });
          }
        } else {
          router.push({
            pathname: routeTo.path,
            ...(routeTo.hasParams && { params: { ...row, ...routeTo.params } }),
          });
        }
      }
    },
    [routeTo, router]
  );

  const handleAdd = useCallback(async () => {
    if (dynamicCode) {
      try {
        const code = await fetchNextCode(dynamicCode.tbName, dynamicCode.codeCol);
        setCode(code);
      } catch {
        showErrorToast(MainGridLang.error[Lang]);
      } finally {
        setLoading(false);
      }
    }

    const emptyRow = Object.fromEntries(tableHead.map((col) => [col.key, '']));
    setRowData(emptyRow);
    openModal('add');
  }, [dynamicCode, fetchNextCode, openModal, showErrorToast, tableHead, Lang]);

  const handleEdit = () => {
    console.log('selectedRow with no callback', selectedRow);
    if (!selectedRow) {
      showErrorToast('No selected Row');
      return;
    }
    openModal('edit',selectedRow);
    setRowData(selectedRow);
  };

  const handleDelete =() => {
    console.log("selected Row in handel delete",selectedRow)
    if (!selectedRow) {
      showErrorToast(MainGridLang.Select[Lang]);
      return;
    }
    setRowData(selectedRow);
    openModal('delete',selectedRow);
  };

  const handleReport = useCallback(async () => {
    if (!selectedRow) {
      showErrorToast(MainGridLang.Select[Lang]);
      return;
    }

    try {
      const filters = await fetchReportFilters(selectedRow.ReportID);
      setReportFilters(filters);
      openModal('report', selectedRow);
    } catch (err) {
      console.log(err);
      showErrorToast();
    }
  }, [selectedRow, showErrorToast, fetchReportFilters, openModal, Lang]);

  const handleRowPress = useCallback((row, index) => {
    setSelectedRow(row);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // setRefetch((prev) => prev + 1);
  }, []);

  const validateFields = useCallback(() => {
    const newErrors = {};
    for (const header of tableHead) {
      const isInput = header.input === 'true';
      const isRequired = header.required !== 'false' || false;
      const valueMissing = !rowData[header.key];

      const isDynamicField = dynamicCode && dynamicCode.codeCol === header.key;

      if (isInput && isRequired && valueMissing && !isDynamicField) {
        newErrors[header.key] = `${header.label}${MainGridLang.Required[Lang]}`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [tableHead, rowData, dynamicCode, Lang]);

  const onConfirm = useCallback(async () => {
    await confirmAction({
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
      setRefetch,
    });
  }, [
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
    confirmAction,
  ]);

  const renderModalContent = useMemo(() => {
    if (modalType === 'report') {
      return (
        <>
          <FlatList
            data={reportFilters}
            keyExtractor={(item) => item.ReportFilterID}
            renderItem={({ item }) => (
              <View style={styles.inputContainer}>
                <Text className="my-2 font-tmedium text-base font-medium">{item.TitleAr}</Text>
                <KeyboardAvoidingView behavior="padding">
                  <RenderReportInput item={item} filters={filters} setFilters={setFilters} />
                </KeyboardAvoidingView>
              </View>
            )}
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingVertical: 8,
            }}
            style={{
              maxHeight: screenWidth,
              width: '100%',
              marginBottom: 5,
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
      );
    } else if (modalType === 'delete') {
      return (
        <View className="text-center">
          <Image
            source={Warning}
            style={{
              width: dynamicStyles.circleSize,
              height: dynamicStyles.circleSize,
              marginVertical: hp('1%'),
              marginHorizontal: 'auto',
            }}
          />
          <Text
            style={{
              fontSize: dynamicStyles.labelFontSize * 1.3,
              marginTop: hp('1%'),
            }}
            className="text-center font-tbold">
            {MainGridLang.DeleteReq[Lang]}
          </Text>
          <Text
            style={{
              fontSize: dynamicStyles.labelFontSize * 1.2,
              marginVertical: hp('1%'),
            }}
            className="text-center font-tmedium">
            {MainGridLang.DeleteSure[Lang]}
          </Text>
          <View style={{ marginBottom: hp('1%') }} className="mt-4 flex flex-row justify-center">
            <TouchableOpacity
              style={{
                width: wp('20%'),
              }}
              className="mx-2 flex flex-row items-center justify-center rounded-md border-[.5px] border-[#133E54] bg-none px-4 py-2"
              onPress={() => setModalVisible(false)}>
              <Text
                style={{
                  fontSize: dynamicStyles.labelFontSize * 0.9,
                }}
                className="font-tbold text-[#133E54]">
                {MainGridLang.Cancel[Lang]}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: wp('20%'),
                backgroundColor: '#F15555',
              }}
              className="mx-2 flex w-[69px] flex-row items-center justify-center rounded-md"
              onPress={onConfirm}>
              <Text
                style={{
                  fontSize: dynamicStyles.labelFontSize,
                  color: '#fff',
                }}
                className="font-tbold">
                {MainGridLang.Delete[Lang]}
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
      );
    } else {
      return (
        <>
          <FlatList
            data={tableHead}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <>
                {item?.input === 'true' && (
                  <View style={[styles.inputContainer, { paddingVertical: hp('.5%') }]}>
                    <Text
                      style={{
                        fontSize: dynamicStyles.labelFontSize * 1.2,
                        marginVertical: hp('1.5%'),
                        textAlign: Rtl ? 'right' : '',
                      }}
                      className="font-tmedium text-base font-medium">
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
                        onChange={(key, value) => setRowData((prev) => ({ ...prev, [key]: value }))}
                        handleDropdownChange={handleDropDownChange}
                        dynamicCode={dynamicCode}
                        code={code}
                        Rtl={Rtl}
                        IsPaginated={item.IsPaginated}
                        spName={item.spName}
                        dependencies={item.dependencies}
                      />
                      {errors[item.key] && (
                        <Text
                          style={{
                            fontSize: dynamicStyles.labelFontSize * 1.2,
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
            )}
            contentContainerStyle={{
              paddingHorizontal: wp('1%'),
              paddingVertical: wp('2%'),
            }}
            style={{
              maxHeight: screenWidth,
              width: '100%',
              marginBottom: 5,
            }}
          />
          <View style={{ marginBottom: hp('1%') }}>
            <MainButton
              title={modalType === 'add' ? MainGridLang.Add[Lang] : MainGridLang.Edits[Lang]}
              icon={ArrowLineUpRight}
              handlePress={onConfirm}
              isLoading={modelLoader}
              containerStyles={'mt-4 flex items-center '}
              width={wp('50%')}
            />
          </View>
        </>
      );
    }
  }, [
    modalType,
    reportFilters,
    filters,
    modelLoader,
    Lang,
    onConfirm,
    dynamicStyles,
    tableHead,
    rowData,
    handleDropDownChange,
    dynamicCode,
    code,
    Rtl,
    errors,
    screenWidth,
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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       let params = '';
  //       let url = '';
  //       let paginationParams = '';

  //       // Add pagination params if enabled
  //       if (IsPaginated && typeof IsPaginated === 'object') {
  //         paginationParams = `&currentPage=${currentPage}&PageSize=${PageSize}&TableName=${IsPaginated.TableName}&IsPaginated=true`;
  //       }

  //       // Safely build query params
  //       if (Array.isArray(TrxParam) && TrxParam.length > 0) {
  //         TrxParam.forEach((p) => {
  //           if (p.name !== 'CompanyID') {
  //             params += `&${p.name}=${p.rowData ? selectedRow[p.value] : p.value}`;
  //           }
  //         });
  //       }

  //       // Assign URL properly
  //       if (Array.isArray(TrxParam) && TrxParam.length > 0) {
  //         url = `/table?sp=${spTrx}${params}&CompanyID=${company}${paginationParams}`;
  //       } else {
  //         url = `/table?sp=${spTrx}&CompanyID=${company}${paginationParams}`;
  //       }

  //       console.log('API URL =>', url); // 👈 debug line

  //       const response = await api.get(url);
  //       const fetchedData = response.data.data;
  //       const total = response.data.data[0]?.TotalCount || 0;

  //       setTotalCount(total);

  //       if (currentPage === 0) {
  //         setData(fetchedData);
  //       } else {
  //         setData((prev) => [...prev, ...fetchedData]);
  //       }
  //     } catch (err) {
  //       console.log('API error:', err);
  //     } finally {
  //       setTimeout(() => {
  //         setLoading(false);
  //       }, 200);
  //     }
  //   };

  //   fetchData();
  // }, [refetch, ...TrxDependency, currentPage]);
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
      return (
        <>
          <FlatList
            data={tableHead}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <>
                {item?.input === 'true' && (
                  <View style={[styles.inputContainer, { paddingVertical: hp('.5%') }]}>
                    <Text
                      style={{
                        fontSize: dynamicStyles.labelFontSize * 1.2,
                        marginVertical: hp('1.5%'),
                        textAlign: Rtl ? 'right' : '',
                      }}
                      className="font-tmedium text-base font-medium">
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
                        onChange={(key, value) => setRowData((prev) => ({ ...prev, [key]: value }))}
                        handleDropdownChange={handleDropDownChange}
                        dynamicCode={dynamicCode}
                        code={code}
                        Rtl={Rtl}
                        IsPaginated={item.IsPaginated}
                        spName={item.spName}
                        dependencies={item.dependencies}
                      />
                      {errors[item.key] && (
                        <Text
                          style={{
                            fontSize: dynamicStyles.labelFontSize * 1.2,
                            marginVertical: hp('.5%'),
                            textAlign: Rtl ? 'right' : '',
                          }}
                          className="text-center font-tmedium text-red-600">
                          {errors[item.key]}
                        </Text>
                      )}
                    </KeyboardAvoidingView>
                  </View>
                )}
              </>
            )}
            contentContainerStyle={{
              paddingHorizontal: wp('1%'),
              paddingVertical: wp('2%'),
            }}
            style={{
              maxHeight: screenWidth,
              width: '100%',
              marginBottom: 5,
            }}
          />
          <View style={{ marginBottom: hp('1%') }}>
            <MainButton
              title={modalType === 'add' ? MainGridLang.Add[Lang] : MainGridLang.Edits[Lang]}
              icon={ArrowLineUpRight}
              handlePress={onConfirm}
              isLoading={modelLoader}
              containerStyles={'mt-4 flex items-center '}
              width={wp('50%')}
            />
          </View>
        </>
      );
    }
  }, [
    modalType,
    reportFilters,
    filters,
    modelLoader,
    Lang,
    onConfirm,
    dynamicStyles,
    tableHead,
    rowData,
    handleDropDownChange,
    dynamicCode,
    code,
    Rtl,
    errors,
    screenWidth,
  ]);
  const handleLoadMore = () => {
    if (!loading) {
      setCurrentPage(currentPage + 1);
    }
  };
  useEffect(() => {
    setData([]);
    // setCurrentPage(0);
  }, [...TrxDependency]);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView
          style={{ flex: 1, backgroundColor: '#fff', marginTop: hp('2%') }}
          keyboardShouldPersistTaps="handled">
          <View
            style={[
              {
                flexDirection: 'row-reverse',
                marginBottom: hp('2%'),
              },
              !Rtl && { flexDirection: 'row' },
              hasCrud == false && { marginVertical: 15 },
            ]}
            className="relative flex-wrap">
            {hasCrud && hasCrud != 'false' ? (
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
              <>
                {specialButton.map((button, index) => (
                  <CustomButton
                    key={index}
                    Icon={button.icon}
                    title={button.title}
                    onPress={() => button.action(selectedRow)}
                    width={button.width}
                    backgroundColor={button.backgroundColor}
                    textColor={button.textColor}
                    Rtl={Rtl}
                  />
                ))}
              </>
            )}
          </View>
          <View
            style={[
              {
                width: dynamicStyles.circleSize,
                height: dynamicStyles.circleSize,
                borderRadius: '50%',
                padding: wp('1%'),
              },
              hasCrud == false && { marginTop: 22 },
            ]}
            className={`absolute -top-3 z-10 m-2 w-14 items-center justify-center rounded-full bg-[#F6F6F6] p-2 shadow-md ${
              !hasCrud && !reports && '-top-14'
            } ${Rtl ? 'left-0' : 'right-0'}`}>
            <Text
              style={{
                fontSize: dynamicStyles.labelFontSize,
              }}
              className="text-xs font-semibold text-[#333]">
              {MainGridText.total[Lang]}
            </Text>
            <Text
              style={{
                fontSize: dynamicStyles.labelFontSize,
              }}
              className="text-md font-bold text-[#333]">
              {/* {data.length} */}
              {totalCount}
            </Text>
          </View>
          {
            // IsPaginated ? (
            //   // ✅ Paginated View
            //   <ScrollView snapToStart horizontal ref={scrollViewRef}>
            //     <View className="mb-16 px-2">
            //       {/* Table Header */}
            //       <Table>
            //         <Row
            //           className={`flex flex-row-reverse items-center justify-between font-tbold text-xs font-bold sm:text-sm md:text-base`}
            //           data={state.tableHead}
            //           widthArr={widthArr}
            //           style={[
            //             styles.head,
            //             { height: rowHeight, flexDirection: Rtl ? 'row-reverse':'' },
            //           ]}
            //           textStyle={[styles.text, { fontSize: labelFontSize }]}
            //         />
            //       </Table>

            //       {/* FlatList with pagination */}
            //       <FlatList
            //         data={data}
            //         refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            //         maxToRenderPerBatch={10}
            //         initialNumToRender={10}
            //         contentContainerStyle={{ paddingBottom: 90 }}
            //         onEndReached={() => {
            //           if (!loading && data.length < totalCount) {
            //             setCurrentPage((prev) => prev + 1);
            //           }
            //         }}
            //         onEndReachedThreshold={0.3}
            //         ListFooterComponent={
            //           loading && currentPage > 0 ? (
            //             <View style={{ paddingVertical: 10 }}>
            //               <ActivityIndicator size="small" color="#227099" />
            //             </View>
            //           ) : null
            //         }
            //         keyExtractor={(item, index) => index.toString()}
            //         renderItem={({ item: dataRow, index }) => (
            //           <TouchableOpacity
            //             key={index}
            //             onLongPress={() => handleDoubleClick(dataRow, index)}
            //             onPress={() => handleRowPress(dataRow, index)}>
            //             <Row
            //               style={{
            //                 backgroundColor:
            //                   pk && selectedRow?.[pk] === dataRow?.[pk]
            //                     ? '#227099'
            //                     : highlight && dataRow?.[highlight.col] == highlight.value
            //                       ? highlight.bgcolor
            //                       : index % 2 === 0
            //                         ? '#ffffff'
            //                         : '#f9f9f9',
            //                 height: rowHeight * 0.8,
            //                 flexDirection: Rtl ? 'row-reverse':'',
            //               }}
            //               className={`flex  items-center p-2 font-tregular text-xs sm:text-sm md:text-base`}
            //               widthArr={widthArr}
            //               data={filteredTableHead.map((col, idx) => {
            //                 const item = dataRow[col.key];

            //                 if (col?.type === 'checkbox') {
            //                   return (
            //                     <View
            //                       key={idx}
            //                       className="items-center justify-center"
            //                       style={{ width: widthArr[idx] }}>
            //                       <CheckBox value={item} isEditable={false} onChange={() => {}} />
            //                     </View>
            //                   );
            //                 } else {
            //                   return (
            //                     <Text
            //                       key={idx}
            //                       numberOfLines={3}
            //                       style={{
            //                         width: widthArr[idx],
            //                         color:
            //                           pk && selectedRow?.[pk] === dataRow?.[pk]
            //                             ? '#ffffff'
            //                             : '#333333',
            //                         textAlign: 'center',
            //                         fontFamily: 'Tajawal-Medium',
            //                         fontSize: 14,
            //                       }}>
            //                       {col.type === 'date' && item
            //                         ? item?.split('T')[0]
            //                         : col.type === 'price'
            //                           ? priceFormatter(item)
            //                           : item}
            //                     </Text>
            //                   );
            //                 }
            //               })}
            //             />

            //           </TouchableOpacity>
            //         )}
            //       />
            //     </View>
            //   </ScrollView>
            // ) :
            loading && refetch === 0 ? (
              // ⏳ Loading View
              <ActivityIndicator size="large" color="#0000ff" />
            ) : error && data.length === 0 ? (
              // ❌ Error View
              <Text style={{ textAlign: 'center', color: 'red' }}>{error}</Text>
            ) : (
              // ✅ Non-paginated fallback View
              <ScrollView snapToStart horizontal ref={scrollViewRef}>
                <View>
                  {/* Table Header */}
                  <Table>
                    <Row
                      className={`flex flex-row-reverse items-center justify-between font-tbold  text-base font-bold sm:text-sm md:text-base`}
                      data={state.tableHead}
                      widthArr={widthArr}
                      style={[
                        styles.head,
                        {
                          height: rowHeight,
                          flexDirection: Rtl ? 'row-reverse' : 'row',
                        },
                      ]}
                      textStyle={[styles.text, { fontSize: labelFontSize }]}
                    />
                  </Table>

                  {/* FlatList without pagination */}
                  <FlatList
                    data={data}
                    refreshControl={
                      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    maxToRenderPerBatch={10}
                    initialNumToRender={10}
                    // contentContainerStyle={{ paddingBottom: 90 }}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item: dataRow, index }) => (
                      <TouchableOpacity
                        key={index}
                        onLongPress={() => handleDoubleClick(dataRow, index)}
                        onPress={() => handleRowPress(dataRow, index)}>
                        <Row
                          style={{
                            backgroundColor:
                              pk && selectedRow?.[pk] === dataRow?.[pk]
                                ? '#227099'
                                : highlight && dataRow?.[highlight.col] == highlight.value
                                  ? highlight.bgcolor
                                  : index % 2 === 0
                                    ? '#ffffff'
                                    : '#f9f9f9',
                            height: rowHeight * 0.8,
                            flexDirection: Rtl ? 'row-reverse' : '',
                          }}
                          className={`flex items-center p-2 font-tregular text-xs sm:text-sm md:text-base`}
                          widthArr={widthArr}
                          data={filteredTableHead.map((col, idx) => {
                            const item = dataRow[col.key];

                            if (col?.type === 'checkbox') {
                              return (
                                <View
                                  key={idx}
                                  className="items-center justify-center"
                                  style={{ width: widthArr[idx] }}>
                                  <CheckBox value={item} isEditable={false} onChange={() => {}} />
                                </View>
                              );
                            } else {
                              return (
                                <Text
                                  key={idx}
                                  numberOfLines={3}
                                  style={{
                                    width: widthArr[idx],
                                    color:
                                      pk && selectedRow?.[pk] === dataRow?.[pk]
                                        ? '#ffffff'
                                        : '#333333',
                                    textAlign: 'center',
                                    fontFamily: 'Tajawal-Medium',
                                    fontSize: 14,
                                  }}>
                                  {col.type === 'date' && item
                                    ? item?.split('T')[0]
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
            )
          }

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
                  <View style={styles.modalContent}>{renderModalContent}</View>
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
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontFamily: 'Tajawal-Medium',
  },
  headerText: {
    fontWeight: 'bold',
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
};

export default MainGrid;
