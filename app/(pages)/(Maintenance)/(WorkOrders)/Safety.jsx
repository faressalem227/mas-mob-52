import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { MainLayout, Dropdown, TextArea } from '../../../../components';
import MaintenanceSystem from '../../../../constants/Lang/Maintenance/MaintenanceSystem/MaintenanceSystem';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import { useDropDown } from '../../../../hooks/useDropDownData';
import api from '../../../../utilities/api';
import Toast from 'react-native-toast-message';

const Safety = () => {
  const { Lang, DepartmentID, company, user } = useGlobalContext();

  const { WorkorderID, TradeID } = useLocalSearchParams();

  const [Safety, SetSafety] = useState({
    SafetyID: 0,
    SafetyInstructions: '',
    SafetyDetails: '',
    SafetyTools: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const { data: safetyList, originalData: OriginalData } = useDropDown(
    'api_ms_Safety_ListForWo',
    {
      DepartmentID,
      LangID: Lang,
      UserName: user.username,
      TradeID,
      CompanyID: company,
    },
    'SafetyID',
    'SafetyName'
  );

  const { originalData: OriginalProcData } = useDropDown(
    'ms_Workorders_Safety_Trx',
    {
      DepartmentID,
      LangID: Lang,
      UserName: user.username,
      WorkorderID,
    },
    'ProcedureID',
    'ProcedureName'
  );

  const handleSaveSafety = async () => {
    try {
      setIsLoading(true);
      await api.post('table/', {
        sp: 'ms_workorders_safety_InsUpd',
        WorkorderID,
        ...Safety,
      });

      Toast.show({ type: 'success', text1: MaintenanceSystem.saveSuccess[Lang] });
    } catch (error) {
      Toast.show({ type: 'error', text1: MaintenanceSystem.saveFailed[Lang] });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleDropdownChange = (SafetyID) => {
    console.log('Dropdown changed to:', SafetyID);

    if (!SafetyID) {
      return; // Don't do anything if no safety selected
    }

    if (SafetyID && SafetyID !== Safety?.SafetyID) {
      const currentRow = OriginalData.find((rec) => rec?.SafetyID === SafetyID);

      if (!currentRow) {
        // Fallback - just update SafetyID if no data found
        SetSafety((prev) => ({
          ...prev,
          SafetyID: SafetyID,
        }));
        return;
      }

      console.log('Setting safety data from dropdown:', currentRow);

      SetSafety({
        SafetyID: currentRow.SafetyID,
        SafetyInstructions: currentRow.SafetyInstructions || '',
        SafetyDetails: currentRow.SafetyDetail || '', // Note: SafetyDetail vs SafetyDetails
        SafetyTools: currentRow.SafetyTools || '',
      });
    }
  };

  useEffect(() => {
    console.log(OriginalProcData);

    if (OriginalProcData) {
      SetSafety({
        SafetyID: OriginalProcData[0]?.SafetyID,
        SafetyInstructions: OriginalProcData[0]?.SafetyInstructions,
        SafetyDetails: OriginalProcData[0]?.SafetyDetails,
        SafetyTools: OriginalProcData[0]?.SafetyTools,
      });
    }
  }, [OriginalProcData]);

  console.log(Safety.SafetyID);

  return (
    <MainLayout title={MaintenanceSystem.safety[Lang]}>
      <ScrollView className="mt-10 px-4">
        <View className="flex-1 gap-6">
          <Dropdown
            key={`safety-${Safety?.SafetyID}`}
            data={safetyList}
            onChange={(val) => handleDropdownChange(val)}
            label={MaintenanceSystem.selectSafety[Lang]}
            value={Safety?.SafetyID}
            initailOption={Safety?.SafetyID}
            placeholder={Lang === 1 ? 'اختر الاجراء' : 'select procedure'}
          />

          <TextArea
            label={MaintenanceSystem.safetyTasks[Lang]}
            onChange={(val) =>
              SetSafety((prev) => ({
                ...prev,
                SafetyTools: val,
              }))
            }
            value={Safety?.SafetyTools || ''}
            initialHeight={80}
          />

          <TextArea
            label={MaintenanceSystem.safetyInstructions[Lang]}
            onChange={(val) =>
              SetSafety((prev) => ({
                ...prev,
                SafetyInstructions: val,
              }))
            }
            value={Safety?.SafetyInstructions || ''}
            initialHeight={180}
          />

          <View className="items-center">
            <TouchableOpacity
              onPress={handleSaveSafety}
              className="w-1/3 items-center rounded-lg bg-[#227099] p-4">
              <Text className="text-3xl text-white">
                {isLoading ? MaintenanceSystem.loading[Lang] : MaintenanceSystem.save[Lang]}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </MainLayout>
  );
};

export default Safety;
