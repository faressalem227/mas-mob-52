import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';

import { icons } from '../../constants';
import { useGlobalContext } from '../../context/GlobalProvider';

const FormField = ({
  title,
  value,
  handlePress,
  placeholder,
  handleChangeText,
  inputName,
  otherStyles,
  icon,
  inputIcon,
  blurFunction,
  disableChat,
  FocusFunction,
  inputIconUser,
  numeric = false,
  editable = true,
  inputPress = () => {},
  inputStyle,
  iconStyle,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleDecimalInput = (text, setValue) => {
    const validatedText = text.replace(/[^0-9.]/g, ''); // Allow only numbers and decimal points
    setValue(validatedText, inputName);
  };
  const { Rtl } = useGlobalContext();
  const isPasswordField = title === 'كلمة المرور' || title === 'Password';
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      {title && (
        <View className={`${Rtl ? 'flex-row-reverse' : 'flex-row'} mb-2`}>
          <Text className={`font-tmedium text-base text-dark ${Rtl ? 'text-right' : 'text-left'}`}>
            {title}
          </Text>

          {icon ? <Image source={icon} resizeMode="contain" className={`ml-1 h-6 w-6`} /> : ''}
        </View>
      )}
      <View
        style={{ borderWidth: 0.5, borderColor: '227099' }}
        className={`h-14 w-full ${Rtl ? 'flex-row-reverse' : 'flex-row '} items-center rounded-lg bg-[#FEFEFE] px-4 focus:border-primary`}>
        {title === ('كلمة المرور' || title === 'Password') && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eyeIcon : icons.eyeSlash}
              className="h-6 w-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}

        {inputIcon && (
          <TouchableOpacity
            className={`h-8 w-8 items-center justify-center rounded-md bg-[#227099] ${iconStyle}`}
            onPress={() => handlePress()}
            disabled={disableChat}>
            <Image source={inputIcon} className="h-6 w-6" resizeMode="contain" />
          </TouchableOpacity>
        )}
        {inputIconUser && (
          <TouchableOpacity
            className="items-center justify-center rounded-md "
            onPress={() => handlePress()}
            disabled={disableChat}>
            <Image source={inputIconUser} className="h-6 w-6" resizeMode="contain" />
          </TouchableOpacity>
        )}
        <TextInput
          autoCapitalize={'none'}
          editable={editable ? true : false}
          multiline={!isPasswordField}
          className={`flex-1 text-right font-tregular text-base leading-5 text-dark ${inputStyle ? inputStyle : ''} ${!Rtl && 'text-left'}`}
          value={value}
          keyboardType={numeric ? 'numeric' : ''}
          placeholder={placeholder}
          placeholderTextColor="#2B2B2B80"
          onChangeText={(e) => {
            if (numeric) handleDecimalInput(e, handleChangeText);
            else handleChangeText(e, inputName);
          }}
          secureTextEntry={!showPassword}
        />
      </View>
    </View>
  );
};

export default FormField;
