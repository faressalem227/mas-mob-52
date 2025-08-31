/* eslint-disable eqeqeq */
import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
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

    if (safety && safety !== SafetyID) {
      const currentRow = OriginalData.filter((rec) => rec.SafetyID == safety)[0];
      console.log(currentRow);

      SetSafety({
        SafetyID: safety,
        SafetyInstructions: currentRow.SafetyInstructions,
        SafetyDetails: currentRow.SafetyDetail,
        SafetyTools: currentRow.SafetyTools,
      });
    } else if (safety && safety == SafetyID) {
      SetSafety({
        SafetyID: SafetyID,
        SafetyInstructions,
        SafetyDetails,
        SafetyTools,
      });
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

  return (
    <MainLayout title={ReportBugsLang.Safety[Lang]}>
      <View className="mt-3 flex-1 px-4">
        <InfoDetailes details={detailsData} />

        <View className="my-4 flex-1 gap-4">
          <Dropdown
            label={ReportBugsLang.select[Lang]}
            data={safetyList}
            value={Safety.SafetyID}
            onChange={(val) => handleDropdownChange(val)}
            disabled={FailureReportStatusID != 1}
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
      </View>
    </MainLayout>
  );
};

export default ReportSafety;
