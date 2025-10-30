import { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import Calender from '../../assets/images/calender.png';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment-timezone';
import { useGlobalContext } from '../../context/GlobalProvider';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const normalizeDate = (val) => {
  if (!val) return null;
  const d = new Date(val);
  return isNaN(d.getTime()) ? null : d;
};

const DatePickerInput = ({
  setDate,
  title,
  defaultDate,
  birthday = false,
  disabled = false,
  preventDefault = false, // 👈 NEW PROP
}) => {
  const { Rtl, Lang } = useGlobalContext();

  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [windowWidth] = useState(Dimensions.get('window').width);

  const fontSize = windowWidth < 800 ? wp('4%') : wp('2.5%');

  const handleDateChange = (_, date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false); // Auto-close picker on Android
    }

    if (date) {
      const normalized = normalizeDate(date);
      if (!normalized && preventDefault) {
      }
      setSelectedDate(normalized);

      // Convert to Cairo timezone before sending up
      const cairoTime = moment(normalized).tz('Africa/Cairo').format('YYYY-MM-DD HH:mm:ss');
      setDate?.(cairoTime);
    }
  };

  useEffect(() => {
    if (selectedDate) return;
    const normalized = normalizeDate(defaultDate);
    if (normalized) {
      setSelectedDate(normalized);
      const cairoTime = moment(normalized).tz('Africa/Cairo').format('YYYY-MM-DD HH:mm:ss');
      setDate?.(cairoTime);
    } else if (!preventDefault) {
      const now = new Date();
      setSelectedDate(now);
      const cairoTime = moment(now).tz('Africa/Cairo').format('YYYY-MM-DD HH:mm:ss');
      setDate?.(cairoTime);
    } else {
      setSelectedDate(null);
    }
  }, [defaultDate]);

  return (
    <View style={styles.container}>
      {title && (
        <Text
          className={`my-2 font-tmedium text-base ${Rtl ? 'text-right' : 'text-left'}`}
          style={{ fontSize }}>
          {title}
        </Text>
      )}

      <SizedBox height={8} />

      <TouchableOpacity
        disabled={disabled}
        onPress={() => setShowDatePicker(true)}
        className={`flex-row-reverse items-center justify-between ${!Rtl && 'flex-row'}`}
        style={styles.inputContainer}>
        <TextInput
          style={[styles.input, !Rtl && { textAlign: 'right' }]}
          value={selectedDate ? moment(selectedDate).format('YYYY-MM-DD') : ''}
          editable={false}
          placeholder={Lang === 1 ? 'أدخل التاريخ' : 'Select Date'}
          placeholderTextColor="#aaa"
        />
        <Image
          source={Calender}
          style={{ width: 20, height: 20, marginLeft: 8 }}
          resizeMode="contain"
        />
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate || new Date()} // 👈 fallback
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
          minimumDate={new Date(1960, 0, 1)}
          {...(birthday && { maximumDate: new Date() })}
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

const SizedBox = ({ height }) => <View style={{ height }} />;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputContainer: {
    alignItems: 'center',
    width: '100%',
    borderRadius: 8,
    height: 56,
    paddingHorizontal: 8,
    borderWidth: 0.5,
    borderColor: '#227099',
    paddingVertical: 8,
  },
  input: {
    padding: 8,
    fontSize: 14,
    fontFamily: 'Tajawal-Medium',
    color: 'black',
  },
});

export default DatePickerInput;
