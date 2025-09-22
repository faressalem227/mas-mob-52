import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { icons } from '../../constants';
import { useGlobalContext } from '../../context/GlobalProvider';

const FormField = ({
  title,
  value,
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
  secure = false, // ✅ allow forcing password input
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const { Rtl } = useGlobalContext();

  const isPasswordField = secure || title === 'كلمة المرور' || title === 'Password';

  const handleDecimalInput = (text) => {
    const validatedText = text.replace(/[^0-9.]/g, ''); // Allow only numbers + dot
    handleChangeText(validatedText, inputName);
  };

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      {title && (
        <View className={`${Rtl ? 'flex-row-reverse' : 'flex-row'} mb-2`}>
          <Text className={`font-tmedium text-base text-dark ${Rtl ? 'text-right' : 'text-left'}`}>
            {title}
          </Text>
          {icon && <Image source={icon} resizeMode="contain" className="ml-1 h-6 w-6" />}
        </View>
      )}

      <View
        style={{ borderWidth: 0.5, borderColor: '#227099' }}
        className={`h-14 w-full ${Rtl ? 'flex-row-reverse' : 'flex-row'} items-center rounded-lg bg-[#FEFEFE] px-4`}>
        {/* Password toggle */}
        {isPasswordField && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eyeIcon : icons.eyeSlash}
              className="h-6 w-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}

        {/* Extra icons */}
        {inputIcon && (
          <TouchableOpacity
            className={`h-8 w-8 items-center justify-center rounded-md bg-[#227099] ${iconStyle}`}
            onPress={inputPress}
            disabled={disableChat}>
            <Image source={inputIcon} className="h-6 w-6" resizeMode="contain" />
          </TouchableOpacity>
        )}

        {inputIconUser && (
          <TouchableOpacity
            className="items-center justify-center rounded-md"
            onPress={inputPress}
            disabled={disableChat}>
            <Image source={inputIconUser} className="h-6 w-6" resizeMode="contain" />
          </TouchableOpacity>
        )}

        {/* Text Input */}
        <TextInput
          autoCapitalize="none"
          editable={editable}
          className={`flex-1 font-tregular text-base leading-5 text-dark ${
            inputStyle || ''
          } ${Rtl ? 'text-right' : 'text-left'}`}
          value={value}
          keyboardType={numeric ? 'numeric' : 'default'}
          placeholder={placeholder}
          placeholderTextColor="#2B2B2B80"
          onChangeText={(e) => (numeric ? handleDecimalInput(e) : handleChangeText(e, inputName))}
          secureTextEntry={isPasswordField && !showPassword}
          {...props}
        />
      </View>
    </View>
  );
};

export default FormField;
