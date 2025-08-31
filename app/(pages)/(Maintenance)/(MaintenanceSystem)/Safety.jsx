import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { MainLayout, InfoDetailes, Dropdown, TextArea } from '../../../../components';
import MaintenanceSystem from '../../../../constants/Lang/Maintenance/MaintenanceSystem/MaintenanceSystem';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import { useDropDown } from '../../../../hooks/useDropDownData';
import { useEffect, useState } from 'react';
import api from '../../../../utilities/api';

const Safety = () => {
  const { Lang, DepartmentID, company, user } = useGlobalContext();

  const { ProcedureID, ProcedureCode, ProcedureName, PeriodName, TradeName, TradeID, SafetyID } =
    useLocalSearchParams();

  const [safety, setSafety] = useState(SafetyID || '');
  const [selectedRecord, setSelectedRecord] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const detailsData = [
    { label: MaintenanceSystem.procedureCode[Lang], value: ProcedureCode },
    { label: MaintenanceSystem.procedureName[Lang], value: ProcedureName },
    { label: MaintenanceSystem.trade[Lang], value: TradeName },
    { label: MaintenanceSystem.periodName[Lang], value: PeriodName },
  ];

  const { data: safetyList } = useDropDown(
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

  const getSafety = async () => {
    setIsLoading('Safety');
    try {
      const Safety = await api.get(
        `table?sp=api_ms_procedure_safety_trx&ProcedureID=${ProcedureID}&SafetyID=${safety}`
      );

      setSelectedRecord(Safety.data.data[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading('');
    }
  };

  const handleSaveSafety = async () => {
    try {
      await api.post('table/', {
        sp: 'api_ms_ProcedureSafety_InsUpd',
        ProcedureID,
        Safety: safety,
        ...selectedRecord,
      });

      console.log('fares');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSafety();
  }, [safety]);

  return (
    <MainLayout title={MaintenanceSystem.safety[Lang]}>
      <InfoDetailes details={detailsData} />
      <ScrollView className="mt-3 px-4">
        <View className="flex-1 gap-6">
          <Dropdown
            data={safetyList}
            onChange={(val) => setSafety(val)}
            label={MaintenanceSystem.selectSafety[Lang]}
            value={safety}
            initailOption={safety}
          />

          <TextArea
            label={MaintenanceSystem.safetyTasks[Lang]}
            onChange={(val) =>
              setSelectedRecord((prev) => ({
                ...prev,
                SafetyTools: val,
              }))
            }
            value={selectedRecord?.SafetyTools || ''}
            initialHeight={80}
          />

          <TextArea
            label={MaintenanceSystem.safetyInstructions[Lang]}
            onChange={(val) =>
              setSelectedRecord((prev) => ({
                ...prev,
                SafetyInstructions: val,
              }))
            }
            value={selectedRecord?.SafetyInstructions || ''}
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
