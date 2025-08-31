import { useState } from 'react';
import { MainLayout, TextArea, InfoDetailes } from '../../../../components';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import ProcedureRequiredTasksLang from '../../../../constants/Lang/Maintenance/PreventiveMaintenanceHome/PreventiveMaintenance/ProcedureRequiredTasksLang';
import MaintenanceSystem from '../../../../constants/Lang/Maintenance/MaintenanceSystem/MaintenanceSystem';
import { View, TouchableOpacity, Text } from 'react-native';
import api from '../../../../utilities/api';
import Toast from 'react-native-toast-message';
import { useLocalSearchParams } from 'expo-router';

const ProcedureRequiredTasks = () => {
  const { ProcedureID, ProcedureCode, ProcedureName, PeriodName, TradeName, Tasks } =
    useLocalSearchParams();

  const [tasks, setTasks] = useState(Tasks || '');
  const [isLoading, setIsLoading] = useState(false);
  const { Lang } = useGlobalContext();

  const saveTasks = async () => {
    setIsLoading(true);
    try {
      api.post('table/', {
        sp: 'api_ms_ProceduresData_Tasks_upd',
        ProcedureID,
        Tasks: tasks,
      });
      Toast.show({ type: 'success', text1: ProcedureRequiredTasksLang.saveSuccess[Lang] });
    } catch (error) {
      Toast.show({ type: 'success', text1: ProcedureRequiredTasksLang.saveFailed[Lang] });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const detailsData = [
    { label: MaintenanceSystem.procedureCode[Lang], value: ProcedureCode },
    { label: MaintenanceSystem.procedureName[Lang], value: ProcedureName },
    { label: MaintenanceSystem.trade[Lang], value: TradeName },
    { label: MaintenanceSystem.periodName[Lang], value: PeriodName },
  ];

  return (
    <MainLayout title={ProcedureRequiredTasksLang.ProcedurerequiredTasks[Lang]}>
      <InfoDetailes details={detailsData} />
      <View className="mt-4 px-4">
        <TextArea
          label={ProcedureRequiredTasksLang.tasks[Lang]}
          initialHeight={150}
          onChange={(val) => setTasks(val)}
          value={tasks}
        />
      </View>

      <View className="mt-7 items-center">
        <TouchableOpacity
          onPress={saveTasks}
          className="w-1/3 items-center rounded-lg bg-[#227099] p-4">
          <Text className="text-3xl text-white">
            {isLoading
              ? ProcedureRequiredTasksLang.loading[Lang]
              : ProcedureRequiredTasksLang.save[Lang]}
          </Text>
        </TouchableOpacity>
      </View>
    </MainLayout>
  );
};

export default ProcedureRequiredTasks;
