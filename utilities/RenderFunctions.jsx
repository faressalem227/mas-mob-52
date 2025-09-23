/* eslint-disable eqeqeq */
import { useState, useEffect } from 'react';
import { useGlobalContext } from '../context/GlobalProvider';
import { Dimensions, TextInput } from 'react-native';
import { DatePickerInput, Dropdown, CheckBox } from '../components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const RenderInput = ({
  inputkey,
  type,
  value,
  options = [],
  lines = 4,
  onChange,
  setRowData,
  handleDropdownChange,
  dynamicCode,
  code,
  input,
  preventDefault,
}) => {
  const { Rtl } = useGlobalContext();
  const windowWidth = Dimensions.get('window').width;

  const [valueFontSize, setValueFontSize] = useState(hp('2%'));
  const [inputHeight, setInputHeight] = useState(hp('6%')); // New responsive row height

  const handleInputChange = (key, value, type) => {
    if (type === 'dropdown' && handleDropdownChange) {
      handleDropdownChange(key, value);
    }
    if (onChange) onChange(value);
    if (setRowData) setRowData((prevData) => ({ ...prevData, [key]: value }));
  };

  useEffect(() => {
    if (code && dynamicCode && dynamicCode.codeCol === inputkey) {
      handleInputChange(dynamicCode.codeCol, code);
    }
  }, []);

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

  if (!input && input == 'false') {
    return;
  }

  switch (type) {
    case 'sub':
      return (
        <div key={inputkey} className="flex w-full flex-col gap-3">
          <div className="flex flex-wrap gap-4"></div>
        </div>
      );

    case 'number':
    case 'price':
      return (
        <TextInput
          style={{
            fontSize: valueFontSize,
            height: inputHeight,
          }}
          className={`w-full rounded-lg border-[.5px]  border-[#1C5B7D] p-4 text-right text-sm font-medium focus:border-[#133e5475] ${
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
          preventDefault={preventDefault}
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
      // console.log(lines, 'lines');

      return (
        <TextInput
          style={{
            fontSize: valueFontSize,
            height: inputHeight,
          }}
          className={`w-full rounded-lg border-[.5px]  border-[#1C5B7D] p-4 text-right text-sm font-medium focus:border-[#133e5475] ${
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
          placeholder={'اختر'}
          data={options}
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
          className={`w-full rounded-lg border-[.5px]  border-[#1C5B7D] p-4 text-right text-sm font-medium focus:border-[#133e5475] ${
            !Rtl && 'text-left'
          }`}
          value={`${code && dynamicCode.codeCol === inputkey ? code : value ? value : ''}`}
          onChangeText={(text) => handleInputChange(inputkey, text)}
          editable={dynamicCode && dynamicCode.codeCol === inputkey ? false : true}
        />
      );
  }
};
