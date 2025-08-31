import { View, Text, TextInput, Dimensions } from 'react-native';
import { useGlobalContext } from '../../context/GlobalProvider';
import { useState, useEffect } from 'react';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const TextArea = ({
  label = '',
  placeholder = '',
  onChange,
  value = '',
  initialHeight = 50,
  disabled = false, // ✅ new prop
}) => {
  const { Rtl } = useGlobalContext();
  const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setWindowWidth(window.width);
    });
    return () => subscription?.remove();
  }, []);

  const fontSize = windowWidth < 800 ? wp('4%') : wp('2.5%');

  return (
    <View className="gap-3">
      {label && (
        <Text style={{ fontSize }} className="text-right font-tmedium text-base text-dark">
          {label}
        </Text>
      )}

      <TextInput
        placeholder={placeholder}
        onChangeText={onChange}
        style={{
          borderWidth: 0.5,
          borderColor: '#227099',
          textAlignVertical: 'top',
          textAlign: Rtl ? 'right' : 'left',
          minHeight: initialHeight,
          backgroundColor: disabled ? '#f0f0f0' : 'white', // ✅ greyed background
        }}
        multiline
        value={value || ''}
        editable={!disabled} // ✅ disables input
        selectTextOnFocus={!disabled} // prevents highlighting when disabled
        className="rounded-lg p-2 font-tregular text-base leading-5 text-dark"
      />
    </View>
  );
};

export default TextArea;
