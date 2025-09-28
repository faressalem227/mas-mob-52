import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useGlobalContext } from '../../context/GlobalProvider';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const DropdownComponent = ({
  data = [],
  title,
  initailOption,
  defaultOption,
  value,
  label,
  placeholder,
  onChange,
  flag = false,
  disabled = false,
}) => {
  const [Value, setValue] = useState(value || null);
  const [isFocus, setIsFocus] = useState(false);
  const { Rtl } = useGlobalContext();
  const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(Dimensions.get('window').width);
    };

    const subscription = Dimensions.addEventListener('change', handleResize);
    return () => {
      subscription?.remove();
    };
  }, []);

  const dropdownHeight = windowWidth < 800 ? hp('7%') : hp('5%');
  const fontSize = windowWidth < 800 ? wp('4%') : wp('2.5%');

  useEffect(() => {
    if (initailOption == null && defaultOption == null) return;

    let newVal;

    if (defaultOption?.key !== undefined && defaultOption?.key !== null) {
      newVal = parseInt(defaultOption.key);
    } else if (initailOption !== undefined && initailOption !== null) {
      newVal = parseInt(initailOption);
    }

    // ✅ Only update if different (allow 0)
    if (newVal !== undefined && newVal !== null && newVal !== value) {
      onChange(newVal);
      setValue(newVal);
    }
  }, [initailOption, defaultOption, data]);

  return (
    <View>
      {(label || title) && (
        <View className={`${Rtl ? 'flex-row-reverse' : 'flex-row'}`}>
          <Text className="text-right font-tmedium text-base text-dark" style={{ fontSize }}>
            {label || title}
          </Text>
        </View>
      )}
      <Dropdown
        style={[
          styles.dropdown,
          { height: dropdownHeight },
          isFocus && { borderColor: '#1C5B7D' },
          disabled && { backgroundColor: '#f0f0f0' }, // ✅ greyed out when disabled
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        fontFamily="Tajawal-Medium"
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="value"
        valueField="key"
        placeholder={!isFocus ? placeholder : '...'}
        searchPlaceholder="بحث..."
        value={isFocus ? null : Value}
        onFocus={() => !disabled && setIsFocus(true)} // ✅ prevent focus if disabled
        onBlur={() => !disabled && setIsFocus(false)}
        onChange={(item) => {
          if (!disabled) {
            setValue(item.key);
            setIsFocus(false);
            onChange(item.key);
          }
        }}
        disable={disabled} // ✅ official prop
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={isFocus ? '#00507a' : '#1C5B7D'}
            name={flag ? 'flag' : 'Safety'}
            size={20}
          />
        )}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    marginTop: 10,
    borderColor: '#1C5B7D',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: wp('2%'),
    fontFamily: 'Tajawal-Medium',
  },
  icon: {
    marginRight: 5,
    color: '#1C5B7D',
  },
  placeholderStyle: {
    fontSize: 16,
    fontFamily: 'Tajawal-Medium',
  },
  selectedTextStyle: {
    fontSize: 16,
    fontFamily: 'Tajawal-Medium',
  },
  iconStyle: {
    width: 20,
    height: 20,
    color: '#1C5B7D',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    fontFamily: 'Tajawal-Medium',
  },
});
