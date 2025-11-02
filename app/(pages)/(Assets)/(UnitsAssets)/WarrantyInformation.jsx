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

const RenderWarrantyInput = ({
  item,
  handleChange,
  obj,
  supplierData = [],
  contractorData = [],
  Lang,
}) => {
  const value = obj[item.KeyName] ?? item.Value;
  const label = item.Label || item.label;
  const selectSupplier = {
    1: 'اختر مورد',
    2: ' Select Supplier',
  };
  const selectContractor = {
    1: 'اختر مقاول',
    2: 'Select Contractor',
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
      // Determine which dropdown data to use based on KeyName
      let dropdownData = [];
      if (item.KeyName === 'SupplierID') {
        dropdownData = supplierData;
      } else if (item.KeyName === 'ContractorID') {
        dropdownData = contractorData;
      }

      return (
        <Dropdown
          label={label}
          value={obj[item.KeyName]}
          initailOption={item?.Value}
          onChange={(val) => handleChange(item.KeyName, val)}
          data={dropdownData}
          placeholder={
            item.KeyName === 'ContractorID' ? selectContractor[Lang] : selectSupplier[Lang]
          }
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

const WarrantyAssets = () => {
  const { AssetID, DepartmentID } = useLocalSearchParams();
  const { Lang, company } = useGlobalContext();

  const [loading, setLoading] = useState(false);
  const [WarrantyData, setWarrantyData] = useState([]);
  const [warrantyObj, setWarrantyObj] = useState({});

  const { data: SupplierList, loading: SupplierLoader } = useDropDown(
    'Sc_Suppliers_List',
    { CompanyID: company, LangID: Lang },
    'SupplierID',
    'SupplierName'
  );

  const { data: ContractorList, loading: ContractorLoader } = useDropDown(
    'Sc_Contractor_List',
    { CompanyID: company, LangID: Lang },
    'ContractorID',
    'ContractorName'
  );
  const updateWarrantyObj = (key, value) => {
    setWarrantyObj((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const fetchWarrantyAssets = async () => {
    setLoading(true);
    try {
      const response = await api.get(
        `/table?sp=api_ms_Assets_Warranty_Trx&AssetID=${AssetID}&DepartmentID=${DepartmentID}`
      );
      const data = response.data.data || [];

      // Transform the data to match the expected format
      const transformedData = [
        {
          KeyName: 'ContractorID',
          Label: Lang===1?'المقاول':"Contractor",
          DataType: 'dropDown',
          Value: data[0]?.ContractorID || '',
        },
        {
          KeyName: 'SupplierID',
          Label:Lang===1? 'المورد':"Supplier",
          DataType: 'dropDown',
          Value: data[0]?.SupplierID || '',
        },
        {
          KeyName: 'WarrantyProvider',
          Label: Lang===1?'شركه الضمان':"Warranty Provider",
          DataType: 'text',
          Value: data[0]?.WarrantyProvider || '',
        },
        {
          KeyName: 'WarrantyContact',
          Label: Lang===1?'مسؤول الضمان':"Warranty Contact",
          DataType: 'text',
          Value: data[0]?.WarrantyContact || '',
        },
        {
          KeyName: 'WarrantyStartDate',
          Label: Lang===1?'تاريخ بدايه الضمان':"Start Date",
          DataType: 'date',
          Value: data[0]?.WarrantyStartDate || '',
        },
        {
          KeyName: 'WarrantyEndDate',
          Label: Lang===1?'تاريخ نهايه الضمان':"End Date",
          DataType: 'date',
          Value: data[0]?.WarrantyEndDate || '',
        },
      ];

      setWarrantyData(transformedData);

      // Initialize the warranty object with existing values
      if (data[0]) {
        setWarrantyObj({
          ContractorID: data[0].ContractorID || '',
          SupplierID: data[0].SupplierID || '',
          WarrantyProvider: data[0].WarrantyProvider || '',
          WarrantyContact: data[0].WarrantyContact || '',
          WarrantyStartDate: data[0].WarrantyStartDate || '',
          WarrantyEndDate: data[0].WarrantyEndDate || '',
        });
      }
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

  const WarrantyDataLang = {
    1: 'بيانات الضمان',
    2: 'Warranty Data',
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await api.post(`/table`, {
        sp: 'api_ms_Assets_Warranty_Upd',
        AssetID,
        ...warrantyObj,
      });
      await fetchWarrantyAssets();

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
    if (AssetID) fetchWarrantyAssets();
  }, [AssetID]);

  console.log('Warranty Object:', warrantyObj);

  const isDropdownLoading = SupplierLoader || ContractorLoader;

  return (
    <MainLayout title={WarrantyDataLang[Lang]} loading={loading || isDropdownLoading}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}>
        <View className="flex-1">
          <View className="flex-1 p-4">
            <FlatList
              data={WarrantyData}
              keyExtractor={(item) => String(item?.KeyName)}
              showsVerticalScrollIndicator={false}
              removeClippedSubviews={false}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => (
                <View className="my-2">
                  <RenderWarrantyInput
                    item={item}
                    handleChange={updateWarrantyObj}
                    obj={warrantyObj}
                    supplierData={SupplierList}
                    contractorData={ContractorList}
                    Lang={Lang}
                  />
                </View>
              )}
            />
          </View>

          <View className="my-6 flex-row items-center justify-center px-4">
            <TouchableOpacity
              className="w-1/2 rounded-lg bg-primary p-2"
              onPress={handleSave}
              disabled={loading}>
              <Text className="text-center font-tregular text-white">
                {AssetHomeLang.Save?.[Lang] || 'حفظ'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </MainLayout>
  );
};

export default WarrantyAssets;
