import { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { MainLayout, DatePickerInput, Dropdown, FormField } from '../../../../components';
import { useLocalSearchParams } from 'expo-router';
import api from '../../../../utilities/api';
import AssetHomeLang from '../../../../constants/Lang/AssetManagment/AssetHomeLang';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import { useDropDown } from '../../../../hooks/useDropDownData';
import Toast from 'react-native-toast-message';

const RenderInput = ({ item, handleChange, obj, dropdownData = [], Lang }) => {
  const value = obj[item.KeyName] ?? item.Value; // fallback only if undefined
  const label = item.Label || item.label;

  const selectEmployee = {
    1: '  اختر موظف',
    2: 'Select Employee',
  };

  switch (item.DataType) {
    case 'date':
      return (
        <DatePickerInput
          title={label}
          defaultDate={obj[item.KeyName] || item.Value}
          setDate={(val) => handleChange(item.KeyName, val)}
          preventDefault={true}
        />
      );

    case 'dropDown':
      return (
        <Dropdown
          label={label}
          value={obj[item.KeyName]}
          initailOption={item?.Value}
          onChange={(val) => handleChange(item.KeyName, val)}
          data={dropdownData}
          placeholder={selectEmployee[Lang]}
        />
      );

    case 'int':
      return (
        <FormField
          title={label}
          value={value}
          handleChangeText={(val) => handleChange(item.KeyName, val)}
          numeric
          editable={!(item.KeyName === 'AccumulatedDepreciation')}
        />
      );

    default:
      return (
        <FormField
          title={label}
          value={value}
          handleChangeText={(val) => handleChange(item.KeyName, val)}
        />
      );
  }
};

const FinancialAssets = () => {
  const { AssetID, TradeID } = useLocalSearchParams();
  const { Lang, DepartmentID, company } = useGlobalContext();

  const [loading, setLoading] = useState(false);
  const [FinanceData, setFinanceData] = useState([]);
  const [financeObj, setFinanceObj] = useState({});

  const { data: ms_EmployeeList } = useDropDown(
    'py_Staff_List_CenterlalTeam',
    {
      CompanyID: company,
      DepartmentID,
      CentralTeam: 0,
    },
    'StaffID',
    'StaffName'
  );

  const updateFinanceObj = (key, value) => {
    setFinanceObj((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const fetchFinancialAssets = async () => {
    setLoading(true);
    try {
      const response = await api.get(
        `/table?sp=api_am_asset_financial_Trx&AssetID=${AssetID}&LangID=${Lang}&TradeID=${TradeID}`
      );
      const data = response.data.data || [];
      setFinanceData(data);

      const initialObj = {};
      data.forEach((item) => {
        initialObj[item.KeyName] = item.Value;
      });
      setFinanceObj(initialObj);
      setFinanceData(data);
    } catch (err) {
      console.error(err);
      Toast.show({
        type: 'error',
        text1: err.message || 'Failed to fetch data',
      });
    } finally {
      setLoading(false);
    }
  };

  const saved = {
    1: 'تم الحفظ بنجاح',
    2: 'Saved successfully',
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        AssetID: AssetID,
        ...financeObj, // ده هيتحول params أوتوماتيك
      }).toString();

      const response = await api.post(`/table?sp=api_am_asset_financial_Upd&${query}`);
      // const response = await api.post(`/table?sp=api_am_asset_financial_Upd&AssetID=${AssetID}`, {
      //   ...financeObj,
      // });

      Toast.show({
        type: 'success',
        text1: saved[Lang],
      });
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: err.response?.data?.message || 'Save failed',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (AssetID) fetchFinancialAssets();
  }, [AssetID]);

  console.log(financeObj);

  return (
    <MainLayout title={AssetHomeLang.FinancialData[Lang]} loading={loading}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80} // adjust if header overlaps inputs
      >
        <View className="flex-1">
          <View className="flex-1 px-4">
            <FlatList
              data={FinanceData}
              keyExtractor={(item) => String(item?.RowID || item?.KeyName)}
              showsVerticalScrollIndicator={false}
              removeClippedSubviews={false} // keep TextInputs mounted
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => (
                <View className="my-2">
                  <RenderInput
                    item={item}
                    handleChange={updateFinanceObj}
                    obj={financeObj}
                    dropdownData={ms_EmployeeList}
                    Lang={Lang}
                  />
                </View>
              )}
            />
          </View>

          <View className="my-6 flex-row items-center justify-center px-4">
            <TouchableOpacity className="w-1/2 rounded-lg bg-primary p-2" onPress={handleSave}>
              <Text className="text-center font-tregular text-white">
                {AssetHomeLang.Save[Lang]}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </MainLayout>
  );
};

export default FinancialAssets;
