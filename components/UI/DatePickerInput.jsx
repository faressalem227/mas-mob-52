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

const DatePickerInput = ({ setDate, title, defaultDate, birthday = false }) => {
  const { Rtl } = useGlobalContext();
  const [selectedDate, setSelectedDate] = useState(
    defaultDate ? new Date(defaultDate) : new Date()
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [windowWidth] = useState(Dimensions.get('window').width);

  const fontSize = windowWidth < 800 ? wp('4%') : wp('2.5%');

  const handleDateChange = (event, date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false); // Auto-close picker on Android
    }
    if (date) {
      setSelectedDate(date);

      // Convert to Cairo timezone
      const cairoTime = moment(date).tz('Africa/Cairo').format('YYYY-MM-DD HH:mm:ss');
      setDate?.(cairoTime);
    }
  };

  useEffect(() => {
    if (defaultDate) {
      const date = new Date(defaultDate);
      setSelectedDate(date);

      const cairoTime = moment(date).tz('Africa/Cairo').format('YYYY-MM-DD HH:mm:ss');
      setDate?.(cairoTime);
    }
  }, []); // 👈 run only once

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
        onPress={() => setShowDatePicker(true)}
        className={`flex-row-reverse items-center justify-between ${!Rtl && 'flex-row'}`}
        style={styles.inputContainer}>
        <TextInput
          style={[styles.input, !Rtl && { textAlign: 'right' }]}
          value={moment(selectedDate).format('YYYY-MM-DD')}
          editable={false}
          placeholder="أدخل التاريخ"
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
          value={selectedDate}
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
