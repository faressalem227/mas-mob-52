/* eslint-disable eqeqeq */
import { useMemo, useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import { MainLayout, MainButton, Dropdown, TextArea } from '../../../../components';
import { useLocalSearchParams } from 'expo-router';
import ArrowLineUpRight from '../../../../assets/images/ArrowLineUpRight.png';
import api from '../../../../utilities/api';
import { useDropDown } from '../../../../hooks/useDropDownData';
import WorkOrderSaftyLang from '../../../../constants/Lang/Maintenance/WorkOrders/WorkOrderSaftyLang'; // Import the language file
import { useGlobalContext } from '../../../../context/GlobalProvider'; // Import the context
import Toast from 'react-native-toast-message';

const WorkOrderSafty = () => {
  const { Lang, company, user, DepartmentID } = useGlobalContext(); // Get the current language from context
  const {
    TradeID,
    WorkorderID,
    FailureDescription,
    WorkorderCode,
    WorkorderName,
    WorkorderTypeID,
    WorkorderTypeName,
    preventCrud,
    WorkorderStatusName,
  } = useLocalSearchParams();

  const [Safety, SetSafety] = useState({
    SafetyID: 0,
    SafetyInstructions: '',
    SafetyDetails: '',
    SafetyTools: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [procID, setProcID] = useState(false);

  const { data: safetyList, originalData: OriginalData } = useDropDown(
    'api_ms_Safety_ListForWo',
    { TradeID, CompanyID: company, LangID: Lang, UserName: user.username },
    'SafetyID',
    'SafetyName'
  );

  const { data: safetyProcList, originalData: OriginalProcData } = useDropDown(
    'api_ms_Workorders_Safety_Trx',
    {
      DepartmentID,
      LangID: Lang,
      UserName: user.username,
      WorkorderID,
    },
    'ProcedureID',
    'ProcedureName'
  );

  const handleChangeSafetyID = async () => {
    try {
      setIsLoading(true);
      await api.post('table/', {
        sp: 'api_ms_workorders_safety_InsUpd',
        SafetyID: Safety.SafetyID,
        WorkorderID,
        SafetyInstructions: Safety.SafetyInstructions,
        SafetyDetails: Safety.SafetyDetails,
        SafetyTools: Safety.SafetyTools,
        ProcedureID: procID,
      });
      Toast.show({
        type: 'success',
        text1: WorkOrderSaftyLang.SavedSuccessfully[Lang],
      });
    } catch (error) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: WorkOrderSaftyLang.SaveFailed[Lang],
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDropdownChange = (SafetyID) => {
    console.log(SafetyID);
    if (!SafetyID) {
      return;
    }
    if (SafetyID && SafetyID !== Safety.SafetyID) {
      const currentRow = OriginalData.filter((rec) => rec.SafetyID == SafetyID)[0];
      console.log(currentRow);

      SetSafety({
        SafetyID: currentRow.SafetyID,
        SafetyInstructions: currentRow.SafetyInstructions,
        SafetyDetails: currentRow.SafetyDetail,
        SafetyTools: currentRow.SafetyTools,
      });
    } else if (SafetyID && SafetyID == Safety?.SafetyID) {
      SetSafety({
        SafetyID: SafetyID,
        SafetyInstructions: Safety.SafetyInstructions,
        SafetyDetails: Safety.SafetyDetails,
        SafetyTools: Safety.SafetyTools,
      });
    }
  };

  const safetyProc = useMemo(() => {
    return OriginalProcData?.find((saf) => saf.ProcedureID == procID);
  }, [OriginalProcData, procID]);

  useEffect(() => {
    console.log(OriginalProcData);

    if (safetyProc) {
      SetSafety({
        SafetyID: safetyProc?.SafetyID,
        SafetyInstructions: safetyProc?.SafetyInstructions,
        SafetyDetails: safetyProc?.SafetyDetails,
        SafetyTools: safetyProc?.SafetyTools,
      });
    }
  }, [safetyProc]);

  return (
    <MainLayout title={WorkOrderSaftyLang.PageTitle[Lang]}>
      <View className="flex-1">
        <ScrollView className="mt-12 px-4">
          <View className="mb-6 flex-1 gap-5">
            <Dropdown
              title={WorkOrderSaftyLang.procedure[Lang]}
              placeholder={`${WorkOrderSaftyLang.select[Lang]} ${WorkOrderSaftyLang.procedure[Lang]}`}
              onChange={(val) => setProcID(val)}
              value={procID}
              data={safetyProcList || []}
              initailOption={safetyProcList[0]?.key}
            />

            <Dropdown
              title={WorkOrderSaftyLang.SafetyProc[Lang]}
              placeholder={`${WorkOrderSaftyLang.select[Lang]} ${WorkOrderSaftyLang.procedure[Lang]}`}
              onChange={(val) => handleDropdownChange(val)}
              value={parseInt(Safety.SafetyID)}
              initailOption={parseInt(Safety.SafetyID)}
              data={safetyList || []}
              key={`safety-${Safety.SafetyID}`} // Force re-render when SafetyID changes
            />
            <TextArea
              label={WorkOrderSaftyLang.SafetyTasks[Lang]}
              initialHeight={100}
              value={Safety.SafetyTools}
              onChange={(val) =>
                SetSafety((prev) => ({
                  ...prev,
                  SafetyTools: val,
                }))
              }
            />

            <TextArea
              label={WorkOrderSaftyLang.instructions[Lang]}
              initialHeight={150}
              value={Safety.SafetyInstructions}
              onChange={(val) =>
                SetSafety((prev) => ({
                  ...prev,
                  SafetyInstructions: val,
                }))
              }
            />

            <TextArea
              label={WorkOrderSaftyLang.details[Lang]}
              initialHeight={150}
              value={Safety.SafetyDetails}
              onChange={(val) =>
                SetSafety((prev) => ({
                  ...prev,
                  SafetyDetails: val,
                }))
              }
            />
          </View>

          <View className="mt-5">
            <MainButton
              title={isLoading ? WorkOrderSaftyLang.saving[Lang] : WorkOrderSaftyLang.Save[Lang]}
              icon={ArrowLineUpRight}
              handlePress={handleChangeSafetyID}
            />
          </View>
        </ScrollView>
      </View>
    </MainLayout>
  );
};

export default WorkOrderSafty;
