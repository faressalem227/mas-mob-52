/* eslint-disable eqeqeq */
import { useState, useEffect } from 'react';
import { View, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { MainLayout, MainButton, DatePickerInput, Dropdown } from '../../../../components';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import api from '../../../../utilities/api';
import WorkOrderCloseLang from '../../../../constants/Lang/Maintenance/WorkOrders/WorkOrderCloseLang'; // Import the language file
import { useDropDown } from '../../../../hooks/useDropDownData';
import Toast from 'react-native-toast-message';

const WorkOrderClose = () => {
  const { user, Lang, Rtl } = useGlobalContext(); // Get the current language from context
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [workorderData, setWorkorderData] = useState({});
  const [selectedEvaluation, setSelectedEvaluation] = useState(null);
  const [closeObj, setCloseObj] = useState(null);

  const {
    TradeID,
    DepartmentID,
    WorkorderID,
    FailureDescription,
    WorkorderCode,
    WorkorderName,
    WorkorderTypeID,
    WorkorderTypeName,
    WorkorderStatusName,
  } = useLocalSearchParams();

  const { data: EvalList } = useDropDown(
    'api_ms_Workorders_Evaluation_List',
    {
      DepartmentID,
      LangID: Lang,
      UserName: user.username,
    },
    'WorkorderEvaluationID',
    'WorkorderEvaluationName'
  );

  const handleChangeCancelData = (key, value) => {
    setCloseObj((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Fetch initial workorder data
  const getCloseData = async () => {
    try {
      const response = await api.get(
        `table?sp=api_ms_WorkorderInfoClose&DepartmentID=${DepartmentID}&WorkorderID=${WorkorderID}&LangID=${Lang}&UserName=${user.username}`
      );
      setCloseObj(response.data.data[0]);

      console.log('res', response.data);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const cancelWorkOrder = async () => {
    if (
      !closeObj?.ActualStartDate ||
      !closeObj?.ActualEndDate ||
      !closeObj?.WorkorderEvaluationID
    ) {
      Toast.show({
        type: 'error',
        text1: WorkOrderCloseLang.FillAllFields[Lang],
      });
      return;
    }

    setLoading(true);
    try {
      await api.post('table/', {
        sp: 'api_ms_WorkorderInfoClose_Update',
        DepartmentID,
        WorkorderID,
        UserName: user.username,
        LangID: Lang,
        ...closeObj,
      });

      await api.post('table/', {
        sp: 'ms_sp_WorkorderClose',
        DepartmentID,
        WorkorderID,
        UserName: user.username,
        LangID: Lang,
      });

      await getCloseData();

      Toast.show({
        type: 'success',
        text1: WorkOrderCloseLang.Closesuccess[Lang],
      });
    } catch (error) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: WorkOrderCloseLang.CloseFailed[Lang],
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCloseData();
  }, []);

  console.log(closeObj);

  return (
    <MainLayout title={WorkOrderCloseLang.PageTitle[Lang]}>
      <View className="flex-1">
        <View className="gap-5 p-4">
          <DatePickerInput
            defaultDate={closeObj?.ActualStartDate}
            setDate={(val) => handleChangeCancelData('ActualStartDate', val)}
            title={WorkOrderCloseLang.ActualStartDate[Lang]}
          />

          <DatePickerInput
            title={WorkOrderCloseLang.ActualEndDate[Lang]}
            defaultDate={closeObj?.ActualEndDate}
            setDate={(val) => handleChangeCancelData('ActualEndDate', val)}
          />

          <Dropdown
            title={WorkOrderCloseLang.Evaluation[Lang]}
            value={closeObj?.WorkorderEvaluationID}
            data={EvalList}
            onChange={(val) => handleChangeCancelData('WorkorderEvaluationID', val)}
            placeholder={WorkOrderCloseLang.SelectEvaluation[Lang]}
            initailOption={closeObj?.WorkorderEvaluationID}
          />

          <DatePickerInput
            title={WorkOrderCloseLang.CloseDate[Lang]}
            defaultDate={closeObj?.ActualEndDate}
            setDate={(val) => handleChangeCancelData('ClosedDate', val)}
          />

          <MainButton
            title={`${WorkOrderCloseLang.ConfirmClose[Lang]}${loading ? '...' : ''}`}
            handlePress={cancelWorkOrder}
          />
        </View>
      </View>
    </MainLayout>
  );
};

export default WorkOrderClose;
