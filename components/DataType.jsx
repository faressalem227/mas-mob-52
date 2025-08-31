import React from 'react';
import { View, Text, TextInput, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const DataType = ({ field, value, onChange }) => {
  const { AdditionName, DataTypeID } = field;
  
  const handleChange = (newValue) => {
    onChange(field.AdditionID, newValue);
  };

  const renderField = () => {
    switch (DataTypeID) {
      case 1: // Text
        return (
          <TextInput
            value={value}
            onChangeText={handleChange}
            placeholder={`Enter ${AdditionName}`}
            style={{ borderWidth: 1, padding: 8 }}
          />
        );

      case 2: // Integer
        return (
          <TextInput
            value={value}
            onChangeText={handleChange}
            keyboardType="numeric"
            placeholder={`Enter ${AdditionName}`}
            style={{ borderWidth: 1, padding: 8 }}
          />
        );

      case 3: // Decimal
        return (
          <TextInput
            value={value}
            onChangeText={handleChange}
            keyboardType="decimal-pad"
            placeholder={`Enter ${AdditionName}`}
            style={{ borderWidth: 1, padding: 8 }}
          />
        );

      case 4: // Date
        return (
          <DateTimePicker
            value={value || new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(event, selectedDate) => {
              if (selectedDate) handleChange(selectedDate);
            }}
          />
        );

      case 5: // Yes/No
        return (
          <Picker
            selectedValue={value}
            onValueChange={handleChange}
            style={{ borderWidth: 1 }}
          >
            <Picker.Item label="Yes" value="yes" />
            <Picker.Item label="No" value="no" />
          </Picker>
        );

      case 6: // Dropdown
      case 9: // Supplier List
      case 10: // Manufacturer List
        return (
          <Picker
            selectedValue={value}
            onValueChange={handleChange}
            style={{ borderWidth: 1 }}
          >
            <Picker.Item label="Select an option" value="" />
            <Picker.Item label="Option 1" value="1" />
            <Picker.Item label="Option 2" value="2" />
          </Picker>
        );

      default:
        return <Text>Unsupported Data Type</Text>;
    }
  };

  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ marginBottom: 5 }}>{AdditionName}</Text>
      {renderField()}
    </View>
  );
};

export default DataType;