import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import dot from '../../assets/images/dot.png';
import True from '../../assets/images/True.png';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useGlobalContext } from '../../context/GlobalProvider';

function Checkbox({
  keyName,
  labelName,
  value = false,
  onChange,
  isEditable = false,
  checkboxSize = 'medium', // 'small', 'medium', 'large'
  checkboxColor = '#227099',
  uncheckedIcon = null, // can be image source or <Image />
  checkboxShape = 'square', // 'square' | 'circle'
}) {
  const [isChecked, setIsChecked] = useState(value);
  const { Rtl } = useGlobalContext();

  useEffect(() => {
    setIsChecked(value);
  }, [value]);

  const handleCheckboxChange = () => {
    if (!isEditable) return;
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    if (onChange) onChange(newChecked, keyName);
  };

  const sizeMap = {
    small: wp('3%'),
    medium: wp('4%'),
    large: wp('6%'),
  };

  const boxSize = sizeMap[checkboxSize] || sizeMap.medium;

  const getCheckboxShape = () => {
    return checkboxShape === 'circle' ? { borderRadius: boxSize / 2 } : { borderRadius: 5 };
  };

  const renderCheckedIcon = () => {
    return checkboxShape === 'circle' ? (
      <Image source={dot} style={{ width: boxSize * 0.8, height: boxSize * 0.8 }} />
    ) : (
      <Image source={True} style={{ width: boxSize * 0.5, height: boxSize * 0.5 }} />
    );
  };

  const renderUncheckedIcon = () => {
    if (!uncheckedIcon) return null;
    if (React.isValidElement(uncheckedIcon)) {
      return uncheckedIcon;
    }
    return <Image source={uncheckedIcon} style={{ width: boxSize, height: boxSize }} />;
  };

  return (
    <View style={[styles.container, { flexDirection: Rtl ? 'row-reverse' : 'row' }]}>
      <TouchableOpacity
        style={[
          styles.checkboxContainer,
          { width: boxSize, height: boxSize, borderColor: checkboxColor },
          getCheckboxShape(),
        ]}
        onPress={handleCheckboxChange}
        disabled={!isEditable}>
        {isChecked ? (
          <View
            style={[
              styles.checkboxChecked,
              { width: boxSize, height: boxSize, backgroundColor: checkboxColor },
              getCheckboxShape(),
            ]}>
            {renderCheckedIcon()}
          </View>
        ) : (
          <View
            style={[
              styles.checkboxUnchecked,
              { width: boxSize, height: boxSize },
              getCheckboxShape(),
            ]}>
            {renderUncheckedIcon()}
          </View>
        )}
      </TouchableOpacity>

      {labelName && (
        <Text style={styles.label} numberOfLines={1}>
          {labelName}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 8,
  },
  checkboxContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderWidth: 0.5,
  },
  checkboxChecked: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  checkboxUnchecked: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderWidth: 0.5,
  },
  label: {
    color: '#333',
    fontSize: 16,
  },
});

export default Checkbox;
