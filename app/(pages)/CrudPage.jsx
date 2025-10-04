import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Image,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useGlobalContext } from '../../context/GlobalProvider';
import { RenderInput } from '../../utilities';
import { ArrowLineUpRight } from './../../assets/images/ArrowLineUpRight.png';
import { ArrowCircleLeft } from './../../assets/images/ArrowCircleLeft.png';

import { MainLayout, MainButton } from '../../components';

import useTableActions from '../../hooks/useTableActions';

const CrudPage = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { Rtl, Lang, company } = useGlobalContext();

  // Parse params
  const modalType = params.modalType || 'add'; // 'add' or 'edit'
  const tableHead = params.tableHead ? JSON.parse(params.tableHead) : [];
  const initialData = params.rowData ? JSON.parse(params.rowData) : {};
  const spIns = params.spIns;
  const spUpd = params.spUpd;
  const InsParam = params.InsParam ? JSON.parse(params.InsParam) : [];
  const UpdParam = params.UpdParam ? JSON.parse(params.UpdParam) : [];
  const InsBody = params.InsBody ? JSON.parse(params.InsBody) : [];
  const UpdBody = params.UpdBody ? JSON.parse(params.UpdBody) : [];
  const dynamicCode = params.dynamicCode ? JSON.parse(params.dynamicCode) : false;
  const code = params.code || false;
  const insRoute = params.insRoute || '';
  const handleDropDownChange = params.handleDropDownChange || false;

  const [rowData, setRowData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [editr, seteditr] = useState({});
  const windowWidth = Dimensions.get('window').width;
  const [labelFontSize, setLabelFontSize] = useState(hp('1.5%'));

  const { confirmAction } = useTableActions({
    selectedRow: null,
    setSelectedRow: () => {},
    setRefetch: () => {},
    setData: () => {},
    setCode: () => {},
    setModalVisible: () => {},
    setModelLoader: setLoading,
    setErrorMessage,
    setErrors,
    setReportFilters: () => {},
    company,
  });
  useEffect(() => {
    if (params?.rowData) {
      console.log(params.rowData);
      try {
        const parsed = JSON.parse(params.rowData);
        setRowData(parsed);
        // seteditr(parsed)
      } catch (e) {
        console.error('Invalid rowData JSON:', e);
        setRowData({});
      }
    } else {
      setRowData({});
    }
  }, []);

  useEffect(() => {
    if (windowWidth < 400) {
      setLabelFontSize(hp('1.7%'));
    } else if (windowWidth < 750) {
      setLabelFontSize(hp('1.2%'));
    } else {
      setLabelFontSize(hp('1.2%'));
    }
  }, []);
  console.log(editr);
  

  const validateFields = () => {
    const newErrors = {};
    for (const header of tableHead) {
      const isInput = header.input && header.input !== 'false';
      const isRequired = header.required;
      const valueMissing = !rowData[header.key];
      const isDynamicField = dynamicCode && dynamicCode.codeCol === header.key;

      if (isInput && isRequired && valueMissing && !isDynamicField) {
        newErrors[header.key] = `${header.label} مطلوب ولا يمكن أن يكون فارغًا.`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onConfirm = async () => {
    if (!validateFields()) {
      return;
    }

    const result = await confirmAction({
      modalType,
      rowData,
      filters: {},
      validateFields,
      insRoute,
      spIns,
      spUpd,
      spDel: null,
      InsParam,
      UpdParam,
      DelParam: [],
      InsBody,
      UpdBody,
    });

    // If successful, navigate back
    if (result !== false) {
      router.back();
    }
  };
  console.log(rowData);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        {/* Header */}
        <View
          style={{
            flexDirection: Rtl ? 'row-reverse' : 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderBottomWidth: 1,
            borderBottomColor: '#e0e0e0',
          }}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={{ marginRight: Rtl ? 0 : 16, marginLeft: Rtl ? 16 : 0 }}>
            <Image
              source={ArrowCircleLeft}
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: labelFontSize * 1.5,
              fontWeight: 'bold',
              color: '#133E54',
            }}>
            {modalType === 'add' ? 'إضافة جديد' : 'تعديل البيانات'}
          </Text>
        </View>

        {/* Form */}
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16 }}>
          {tableHead.map((item, index) => {
            const type = typeof item.type === 'function' ? item?.type(rowData) : item?.type;
            const options =
              typeof item.options === 'function' ? item?.options(rowData) : item?.options;
            const key = typeof item?.key === 'function' ? item?.key?.(rowData) : item?.key;
            const addParams = item?.addParams && item?.addParams?.(rowData);

            if (!item?.input || item?.input === 'false') {
              return null;
            }

            return (
              <View key={`${item.key}-${index}`} style={{ marginBottom: 20 }}>
                <Text
                  style={{
                    fontSize: labelFontSize * 1.2,
                    marginBottom: 8,
                    fontWeight: '500',
                  }}>
                  {item.label}
                  {item.required && <Text style={{ color: 'red' }}> *</Text>}
                </Text>
                <RenderInput
                  inputkey={key}
                  label={item.label}
                  type={type}
                  value={editr?.[key]}
                  onChange={item.onChange}
                  options={options}
                  lines={item.lines}
                  setRowData={seteditr}
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
                      fontSize: labelFontSize * 1.1,
                      color: '#F15555',
                      marginTop: 4,
                      textAlign: Rtl ? 'right' : 'left',
                    }}>
                    {errors[item.key]}
                  </Text>
                )}
              </View>
            );
          })}

          {errorMessage && (
            <Text
              style={{
                fontSize: labelFontSize * 1.2,
                color: '#F15555',
                textAlign: 'center',
                marginVertical: 10,
              }}>
              {errorMessage}
            </Text>
          )}
        </ScrollView>

        {/* Footer Button */}
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderTopWidth: 1,
            borderTopColor: '#e0e0e0',
          }}>
          <MainButton
            title={modalType === 'add' ? 'إضافه' : 'حفظ التعديل'}
            icon={ArrowLineUpRight}
            handlePress={onConfirm}
            isLoading={loading}
            containerStyles="flex items-center"
            width="100%"
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CrudPage;
