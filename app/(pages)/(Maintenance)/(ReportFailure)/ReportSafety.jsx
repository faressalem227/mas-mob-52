/* eslint-disable eqeqeq */
import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useDropDown } from '../../../../hooks/useDropDownData';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import { useLocalSearchParams } from 'expo-router';
import { MainLayout, TextArea, Dropdown, InfoDetailes } from '../../../../components';
import ReportBugsLang from '../../../../constants/Lang/Maintenance/ReportBugs';
import api from '../../../../utilities/api';
import Toast from 'react-native-toast-message';

const ReportSafety = () => {
  const { DepartmentID, Lang, user } = useGlobalContext();
  const {
    TradeID,
    SafetyID,
    SafetyInstructions,
    SafetyDetails,
    SafetyTools,
    FailureReportID,
    FailureReportCode,
    FailureReportStatusID,
    FailureReportStatusName,
    FailureReportDate,
    FailureDate,
  } = useLocalSearchParams();

  const [Safety, SetSafety] = useState({
    SafetyID: SafetyID || 0,
    SafetyInstructions: SafetyInstructions || '',
    SafetyDetails: SafetyDetails || '',
    SafetyTools: SafetyTools || '',
  });
  const [isLoading, setIsLoading] = useState(false);
  console.log(SafetyID, 'SafetyID');

  const { data: safetyList, originalData: OriginalData } = useDropDown(
    'api_ms_Safety_ListForWo',
    {
      DepartmentID,
      LangID: Lang,
      UserName: user.username,
      TradeID,
    },
    'SafetyID',
    'SafetyName'
  );

  const handleDropdownChange = (safety) => {
    console.log(safety);

    if (!safety) {
      return; // Don't do anything if no safety selected
    }

    if (safety == SafetyID) {
      console.log('=== DROPDOWN CHANGE DEBUG ===');
      console.log('Selected safety:', safety);
      console.log('Original SafetyID from params:', SafetyID);
      console.log('Current Safety state before change:', Safety);
      console.log('OriginalData:', OriginalData);
      SetSafety({
        SafetyID: SafetyID,
        SafetyInstructions,
        SafetyDetails,
        SafetyTools,
      });
    } else {
      // If selecting a different SafetyID, get data from dropdown
      const currentRow = OriginalData.find((rec) => rec.SafetyID == safety);
      console.log(currentRow);

      if (currentRow) {
        SetSafety({
          SafetyID: safety,
          SafetyInstructions: currentRow.SafetyInstructions || '',
          SafetyDetails: currentRow.SafetyDetail || '', // Note the field name difference
          SafetyTools: currentRow.SafetyTools || '',
        });
      } else {
        // Fallback if no data found - keep existing data but update SafetyID
        SetSafety((prev) => ({
          ...prev,
          SafetyID: safety,
        }));
      }
    }
  };
  const handleChangeSafetyID = async () => {
    if (FailureReportStatusID != 1) {
      return;
    }

    setIsLoading(true);
    try {
      await api.post('table/', {
        sp: 'api_ms_FailureReport_Safety_InsUpd',
        SafetyID: Safety.SafetyID,
        SafetyInstructions: Safety.SafetyInstructions,
        SafetyDetails: Safety.SafetyDetails,
        SafetyTools: Safety.SafetyTools,
        FailureReportID,
      });
      SetSafety((prev) => ({
        ...prev,
        SafetyID: prev.SafetyID, 
      }));

      Toast.show({ type: 'success', text1: ReportBugsLang.saveSuccess[Lang] });
    } catch (error) {
      console.error(error);
      Toast.show({ type: 'error', text1: ReportBugsLang.saveFailed[Lang] });
    } finally {
      setIsLoading(false);
    }
  };

  const detailsData = [
    { label: ReportBugsLang.FailureReportCode[Lang], value: FailureReportCode },
    { label: ReportBugsLang.FailureReportStatusName[Lang], value: FailureReportStatusName },
    { label: ReportBugsLang.FailureReportDate[Lang], value: FailureReportDate },
    { label: ReportBugsLang.FailureReportDate[Lang], value: FailureDate },
  ];
  // useEffect(() => {
  //   if (SafetyID) {
  //     SetSafety((prev) => ({
  //       ...prev,
  //       SafetyID: Number(SafetyID),
  //     }));
  //   }
  // }, [SafetyID]);

  return (
    <MainLayout title={ReportBugsLang.Safety[Lang]}>
      <ScrollView className="mt-3 flex-1 px-4">
        <InfoDetailes details={detailsData} />

        <View className="my-4 flex-1 gap-4">
          <Dropdown
            label={ReportBugsLang.select[Lang]}
            data={safetyList}
            value={Safety.SafetyID}
            onChange={(val) => handleDropdownChange(val)}
            disabled={FailureReportStatusID != 1}
            initailOption={Safety.SafetyID} // Add this line
          />

          <TextArea
            label={ReportBugsLang.SafetyTasks[Lang]}
            onChange={(val) =>
              SetSafety((prev) => ({
                ...prev,
                SafetyTools: val,
              }))
            }
            value={Safety?.SafetyTools || ''}
            initialHeight={80}
            disabled={FailureReportStatusID != 1}
          />

          <TextArea
            label={ReportBugsLang.SafetyInstructions[Lang]}
            onChange={(val) =>
              SetSafety((prev) => ({
                ...prev,
                SafetyInstructions: val,
              }))
            }
            value={Safety?.SafetyInstructions || ''}
            initialHeight={180}
            disabled={FailureReportStatusID != 1}
          />

          <View className="items-center">
            <TouchableOpacity
              onPress={handleChangeSafetyID}
              className="w-1/3 items-center rounded-lg bg-[#227099] p-4">
              <Text className="text-3xl text-white">{`${ReportBugsLang.save[Lang]}${isLoading ? '...' : ''}`}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </MainLayout>
  );
};

export default ReportSafety;
