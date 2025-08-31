import { TouchableOpacity, View, Text } from 'react-native';
import { MainLayout, FormField, TextArea } from '../../../components';
import { useLocalSearchParams } from 'expo-router';
import HealthAndSafetyDetailsLang from '../../../constants/Lang/Maintenance/HealthAndSafetyDetails';
import { useGlobalContext } from '../../../context/GlobalProvider';
import { useState } from 'react';
import api from '../../../utilities/api';
import Toast from 'react-native-toast-message';
const HealthAndSafetyDetails = () => {
  const { SafetyCode, SafetyName, SafetyInstructions, SafetyTools, TradeID } =
    useLocalSearchParams();
  const { user, DepartmentID, Lang, company } = useGlobalContext();
  const [manipulatedRow, setManipulatedRow] = useState({
    SafetyName,
    SafetyInstructions,
    SafetyTools,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    try {
      setIsLoading(true);
      await api.post('table/', {
        sp: 'api_ms_Safety_Upd',
        UserName: user.username,
        LangID: Lang,
        TradeID,
        DepartmentID,
        ...manipulatedRow,
      });
      Toast.show({ type: 'success', text1: HealthAndSafetyDetailsLang.saveSuccess[Lang] });
    } catch (error) {
      console.error(error);
      Toast.show({ type: 'error', text1: HealthAndSafetyDetailsLang.saveFailed[Lang] });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout title={HealthAndSafetyDetailsLang.pageTitle[Lang]}>
      <View className="flex-1 gap-5 p-4">
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
          value={manipulatedRow.SafetyInstructions}
          onChange={(val) => ({
            ...manipulatedRow,
            SafetyInstructions: val,
          })}
        />

        <TextArea
          label={HealthAndSafetyDetailsLang.SafetyTools[Lang]}
          initialHeight={200}
          value={manipulatedRow.SafetyTools}
          onChange={(val) => ({
            ...manipulatedRow,
            SafetyTools: val,
          })}
        />

        <View className="flex-row items-center justify-center">
          <TouchableOpacity className="rounded-lg bg-primary p-3" onPress={handleSave}>
            <Text className="text-white">{`${HealthAndSafetyDetailsLang.save}${isLoading ? '...' : ''}`}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </MainLayout>
  );
};

export default HealthAndSafetyDetails;
