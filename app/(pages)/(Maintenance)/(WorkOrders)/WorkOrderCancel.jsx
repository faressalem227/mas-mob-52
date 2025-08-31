/* eslint-disable eqeqeq */
import { useLocalSearchParams } from 'expo-router';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import {
  MainButton,
  DatePickerInput,
  Dropdown,
  MainLayout,
  TextArea,
} from '../../../../components/index';
import { useState, useEffect } from 'react';
import { View, Text, TextInput } from 'react-native';
import api from '../../../../utilities/api';
import WorkOrderCancelLang from '../../../../constants/Lang/Maintenance/WorkOrders/WorkOrderCancelLang'; // Import the language file
import { useDropDown } from '../../../../hooks/useDropDownData';
import Toast from 'react-native-toast-message';

const WorkOrderCancel = () => {
  const { Lang, user, DepartmentID } = useGlobalContext(); // Get the current language from context
  const { WorkorderID, IsSm } = useLocalSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [cancelObj, setCancelObj] = useState(null);

  const { data: EmployeesList } = useDropDown(
    'py_Staff_List_CenterlalTeam_t',
    {
      // CompanyID: organizationValue?.value,
      DepartmentID,
      UserName: user.username,
      LangID: Lang,
      IsSm,
    },
    'StaffID',
    'StaffName'
  );

  const getCancelData = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(
        `table?sp=api_ms_WorkorderInfoCancel&DepartmentID=${DepartmentID}&WorkorderID=${WorkorderID}&LangID=${Lang}&UserName=${user.username}`
      );

      console.log('res', response.data);
      setCancelObj(response.data.data[0]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const cancelWorkOrder = async () => {
    if (
      !cancelObj?.CancelledDate ||
      !cancelObj?.CancelReason ||
      !cancelObj?.CancelledByEmployeeID
    ) {
      Toast.show({
        type: 'error',
        text1: WorkOrderCancelLang.fill[Lang],
      });
      return;
    }

    setIsLoading(true);

    try {
      await api.post('table/', {
        sp: 'api_ms_WorkorderInfoCancel_Update',
        DepartmentID,
        WorkorderID,
        UserName: user.username,
        LangID: Lang,
        ...cancelObj,
      });

      const res = await api.post('table/', {
        sp: 'api_ms_sp_WorkorderCancel',
        DepartmentID,
        WorkorderID,
        UserName: user.username,
        LangID: Lang,
      });

      const data = res.data.data[0];

      Toast.show({
        type: data.Status == 2 ? 'error' : 'success',
        text1: data.Result,
      });

      console.log('res', res.data);
    } catch (error) {
      console.error(error);

      Toast.show({
        type: 'error',
        text1: WorkOrderCancelLang.CancelFailed[Lang],
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeCancelData = (key, value) => {
    setCancelObj((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    getCancelData();
  }, []);

  console.log(cancelObj);

  return (
    <MainLayout title={WorkOrderCancelLang.PageTitle[Lang]}>
      <View className="flex-1 gap-6 p-4">
        <TextArea
          label={WorkOrderCancelLang.CancelReason[Lang]}
          value={cancelObj?.CancelReason}
          initialHeight={100}
          onChange={(val) => handleChangeCancelData('CancelReason', val)}
        />

        <DatePickerInput
          setDate={(val) => handleChangeCancelData('CancelledDate', val)}
          title={WorkOrderCancelLang.CancelDate[Lang]}
          defaultDate={cancelObj?.CancelledDate}
        />

        <Dropdown
          data={EmployeesList}
          value={cancelObj?.CancelledByEmployeeID}
          initailOption={cancelObj?.CancelledByEmployeeID}
          onChange={(val) => handleChangeCancelData('CancelledByEmployeeID', val)}
          title={WorkOrderCancelLang.SelectCancelledBy[Lang]}
        />

        {/* Save Button */}
        <View className="mt-4">
          <MainButton
            title={`${WorkOrderCancelLang.ConfirmCancel[Lang]}${isLoading ? '...' : ''}`}
            handlePress={cancelWorkOrder}
          />
        </View>
      </View>
    </MainLayout>
  );
};

export default WorkOrderCancel;
