import { TouchableOpacity, View, Text } from 'react-native';
import { MainLayout, FormField, TextArea } from '../../../components';
import { useLocalSearchParams } from 'expo-router';
import HealthAndSafetyDetailsLang from '../../../constants/Lang/Maintenance/HealthAndSafetyDetails';
import { useGlobalContext } from '../../../context/GlobalProvider';
import { useState } from 'react';
import api from '../../../utilities/api';
import Toast from 'react-native-toast-message';
import { ScrollView } from 'react-native';
// import { lang } from '../../../constants/Lang/components/CustomMenu';
const HealthAndSafetyDetails = () => {
  const { SafetyCode, SafetyName, SafetyInstructions, SafetyTools, TradeID, SafetyID } =
    useLocalSearchParams();
  const { user, DepartmentID, Lang, company } = useGlobalContext();
  const [manipulatedRow, setManipulatedRow] = useState({
    SafetyName,
    SafetyInstructions,
    SafetyTools,
    SafetyCode,
  });
  const [isLoading, setIsLoading] = useState(false);
  console.log(SafetyID, 'SafetyID');
  console.log(TradeID, 'TradeID');

  const handleSave = async () => {
    try {
      setIsLoading(true);
      await api.post('table/', {
        sp: 'api_ms_Safety_Upd',
        UserName: user.username,
        LangID: Lang,
        TradeID,
        SafetyID,
        DepartmentID,
        ...manipulatedRow,
      });
      Toast.show({ type: 'success', text1: HealthAndSafetyDetailsLang.saveSuccess[Lang] });
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
      Toast.show({ type: 'error', text1: HealthAndSafetyDetailsLang.saveFailed[Lang] });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout title={HealthAndSafetyDetailsLang.pageTitle[Lang]}>
      <ScrollView className="flex-1 gap-5 p-4">
        <FormField title={HealthAndSafetyDetailsLang.SafetyCode[Lang]} value={SafetyCode} />

        <FormField
          title={HealthAndSafetyDetailsLang.SafetyName[Lang]}
          value={manipulatedRow.SafetyName}
          handleChangeText={(val) =>
            setManipulatedRow({
              ...manipulatedRow,
              SafetyName: val,
            })
          }
        />

        <TextArea
          label={HealthAndSafetyDetailsLang.SafetyInstructions[Lang]}
          initialHeight={180}
          value={manipulatedRow.SafetyInstructions || ''}
          onChange={(val) =>
            setManipulatedRow({
              ...manipulatedRow,
              SafetyInstructions: val,
            })
          }
          disabled={false}
        />

        <TextArea
          label={HealthAndSafetyDetailsLang.SafetyTools[Lang]}
          disabled={false}
          initialHeight={200}
          value={manipulatedRow.SafetyTools || ''}
          onChange={(val) =>
            setManipulatedRow({
              ...manipulatedRow,
              SafetyTools: val,
            })
          }
        />

        <View className="mt-3 flex-row items-center justify-center">
          <TouchableOpacity className="rounded-lg bg-primary p-4" onPress={handleSave}>
            <Text className="text-white">{`${HealthAndSafetyDetailsLang.save[Lang]}${isLoading ? '...' : ''}`}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </MainLayout>
  );
};

export default HealthAndSafetyDetails;
