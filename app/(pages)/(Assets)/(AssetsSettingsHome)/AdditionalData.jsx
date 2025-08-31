import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Modal,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  Platform,
} from "react-native";
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MainLayout, MainButton } from "../../../../components";
import { useRouter, useLocalSearchParams } from "expo-router";
import api from "../../../../utilities/api";
import AssetHomeLang from "../../../../constants/Lang/AssetManagment/AssetHomeLang";
import { useGlobalContext } from "../../../../context/GlobalProvider";

const AdditionalData = () => {
  const { AssetID, LocationID } = useLocalSearchParams();
  const { Lang, user } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [additionalFields, setAdditionalFields] = useState([]);
  const [formValues, setFormValues] = useState({});

  const handleSave = async () => {
    setLoading(true);
    try {
      await api.post(
        `/table?sp=api_sys_addition_data__Upd&TableDataID=${AssetID}&TableID=2&LangID=${Lang}&UserName=${user}`,
        {
          LocationID,
          AssetID,
          AdditionalData: formValues,
        }
      );
      setModalVisible(true);
    } catch (err) {
      Alert.alert(
        err.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const getAdditionalFields = async () => {
    setLoading(true);
    try {
      const response = await api.get(
        `/table?sp=api_sys_addition_data__Trx&TableDataID=${AssetID}&TableID=2&LangID=${Lang}&UserName=${user}`
      );
      
      // Add null check for response.data.data
      const fieldsData = response?.data?.data || [];
      
      const fields = fieldsData.map(field => ({
        AdditionName: field.AdditionName,
        DataTypeID: field.DataTypeID,
        AdditionID: field.AdditionID,
      }));
      
      setAdditionalFields(fields);
      
 
      const initialValues = {};
      fields.forEach(field => {
        initialValues[field.AdditionID] = field.DataTypeID === 4 ? new Date() : '';
      });
      setFormValues(initialValues);
    } catch (err) {
      Alert.alert(err.message || "Failed to fetch additional fields");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAdditionalFields();
  }, []);

  const handleFieldChange = (fieldId, value) => {
    setFormValues(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const renderField = (field) => {
    const { AdditionName, DataTypeID, AdditionID } = field;
    const value = formValues[AdditionID] || '';
    
    const handleChange = (newValue) => {
      handleFieldChange(AdditionID, newValue);
    };

    switch (DataTypeID) {
      case 1: 
        return (
          <TextInput
            key={AdditionID}
            value={value}
            onChangeText={handleChange}
            placeholder={`Enter ${AdditionName}`}
            style={styles.inputField}
          />
        );

      case 2: 
        return (
          <TextInput
            key={AdditionID}
            value={value}
            onChangeText={handleChange}
            keyboardType="numeric"
            placeholder={`Enter ${AdditionName}`}
            style={styles.inputField}
          />
        );

      case 3: 
        return (
          <TextInput
            key={AdditionID}
            value={value}
            onChangeText={handleChange}
            keyboardType="decimal-pad"
            placeholder={`Enter ${AdditionName}`}
            style={styles.inputField}
          />
        );

      case 4: 
        return (
          <View key={AdditionID} style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>{AdditionName}</Text>
            {/* <DateTimePicker
              value={value || new Date()}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, selectedDate) => {
                if (selectedDate) handleChange(selectedDate);
              }}
            /> */}
          </View>
        );

      case 5:
        return (
          <View key={AdditionID} style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>{AdditionName}</Text>
            <Picker
              selectedValue={value}
              onValueChange={handleChange}
              style={styles.picker}
            >
              <Picker.Item label="Yes" value="yes" />
              <Picker.Item label="No" value="no" />
            </Picker>
          </View>
        );

      case 6:
      case 9: 
      case 10: 
        return (
          <View key={AdditionID} style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>{AdditionName}</Text>
            <Picker
              selectedValue={value}
              onValueChange={handleChange}
              style={styles.picker}
            >
              <Picker.Item label="Select an option" value="" />
              <Picker.Item label="Option 1" value="1" />
              <Picker.Item label="Option 2" value="2" />
            </Picker>
          </View>
        );

      default:
        return (
          <View key={AdditionID} style={styles.fieldContainer}>
            <Text>Unsupported Data Type for {AdditionName}</Text>
          </View>
        );
    }
  };
  return (
    <MainLayout title={AssetHomeLang.AdditionalData[Lang]}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidingView}
        >
          <ScrollView contentContainerStyle={styles.scrollView}>
            {additionalFields.length > 0 ? (
              <View style={styles.fieldsContainer}>
                {additionalFields.map(field => renderField(field))} 
              </View>
            ) : (
              <Text style={styles.noFieldsText}>
                {AssetHomeLang.NoAdditionalFields[Lang] || "No additional fields available"}
              </Text>
            )}

            <View style={styles.buttonContainer}>
              <MainButton
                title={AssetHomeLang.Save[Lang]}
                handlePress={handleSave}
                loading={loading}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{AssetHomeLang.Saved[Lang]}</Text>
            <Text style={styles.modalMessage}>
              {AssetHomeLang.DataSavedSuccessfully[Lang]}
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>إغلاق</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </MainLayout>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
    marginBottom: 16,
  },
  scrollView: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  fieldsContainer: {
    padding: 16,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  fieldLabel: {
    marginBottom: 8,
    fontSize: 16,
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  buttonContainer: {
    marginTop: 16,
    marginBottom: 80,
  },
  noFieldsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: "Tajawal-Medium",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Tajawal-Medium",
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#227099",
    padding: 12,
    borderRadius: 5,
    width: '100%',
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Tajawal-Medium",
    textAlign: "center",
  },
});

export default AdditionalData;