/* eslint-disable eqeqeq */
import { View, TouchableOpacity, Text } from 'react-native';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import { MainLayout, Dropdown, MainGrid, InputModal } from '../../../../components';
import { useState } from 'react';
import { useDropDown } from '../../../../hooks/useDropDownData';
import ReportBugsLang from '../../../../constants/Lang/Maintenance/ReportBugs';
import api from '../../../../utilities/api';
import Toast from 'react-native-toast-message';

const ReportFailure = () => {
  const { user, Lang, DepartmentID, Rtl } = useGlobalContext();
  const [TradeID, setTradeID] = useState(null);
  const [YearID, setYearID] = useState(null);
  const [row, setRow] = useState(null);
  const [cancelObj, setCancelObj] = useState({});
  const [loading, setLoading] = useState(false);
  const [cancelLoader, setCancelLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [counter, setCounter] = useState(0);

  const { data: ReportEmployeesList } = useDropDown(
    'api_ms_Employees_ListForWo',
    {
      DepartmentID,
      UserName: user.username,
      LangID: Lang,
    },
    'StaffID',
    'StaffName'
  );

  const { data: priorityList } = useDropDown(
    'api_ms_Priority_List',
    {
      UserName: user.username,
      DepartmentID,
    },
    'PriorityID',
    'PriorityName'
  );

  const { data: tradeList } = useDropDown(
    'api_ms_Trade_List_pm',
    {
      DepartmentID,
      UserName: user.username,
      LangID: Lang,
    },
    'TradeID',
    'TradeName'
  );

  const { data: yearList } = useDropDown(
    'api_ms_Years_List',
    {
      DepartmentID,
      UserName: user.username,
      LangID: Lang,
    },
    'YearID',
    'YearName'
  );

  const cancelReport = async () => {
    setCancelLoader(true);
    try {
      await api.post('table/', {
        sp: 'api_ms_sp_cm_CancelNotification',
        DepartmentID,
        FailureReportID: row.FailureReportID,
        UserName: user.username,
        LangID: Lang,
        ...cancelObj,
      });

      setCounter((prev) => prev + 1);

      Toast.show({
        type: 'success',
        text1: ReportBugsLang.cancelSuccess[Lang],
      });

      setShowModal(false);
    } catch (error) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: ReportBugsLang.cancelFailure[Lang],
      });
    } finally {
      setCancelLoader(false);
    }
  };

  const createWorkorder = async () => {
    if (!row) {
      Toast.show({
        type: 'error',
        text1: ReportBugsLang.rowRequired[Lang],
      });
      return;
    }

    setLoading(true);

    try {
      await api.post('table/', {
        sp: 'api_ms_sp_cm_GenerateWorkorder',
        DepartmentID,
        UserName: user.username,
        LangID: Lang,
        FailureReportID: row.FailureReportID,
      });
      Toast.show({
        type: 'success',
        text1: ReportBugsLang.createSuccess[Lang],
      });
    } catch (error) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: ReportBugsLang.createFailure[Lang],
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChangeCancel = (key, value) => {
    setCancelObj((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const cancelInputs = [
    {
      key: 'CancelReason',
      input: true,
      label: ReportBugsLang.CancelReason[Lang],
      onChange: (val) => handleChangeCancel('CancelReason', val),
    },
    {
      key: 'CancelledDate',
      input: true,
      label: ReportBugsLang.CancelledDate[Lang],
      type: 'date',
      onChange: (val) => handleChangeCancel('CancelledDate', val),
    },
    {
      key: 'CancelledByEmployeeID',
      input: true,
      label: ReportBugsLang.CancelledBy[Lang],
      type: 'dropdown',
      options: ReportEmployeesList,
      onChange: (val) => handleChangeCancel('CancelledByEmployeeID', val),
    },
  ];

  return (
    <>
      <MainLayout title={ReportBugsLang.pageTitle[Lang]}>
        <View className="flex-1">
          <View className="my-6 gap-4 px-4">
            <Dropdown
              placeholder={ReportBugsLang.TradeName[Lang]}
              label={ReportBugsLang.TradeName[Lang]}
              data={tradeList}
              initailOption={tradeList[0]?.key}
              onChange={(e) => {
                setTradeID(e);
              }}
            />

            <Dropdown
              placeholder={ReportBugsLang.YearChoose[Lang]}
              label={ReportBugsLang.Year[Lang]}
              data={yearList}
              initailOption={yearList[5]?.key}
              onChange={(e) => {
                setYearID(e);
              }}
            />
          </View>

          <View className={`my-6 px-4 ${Rtl ? 'flex-row-reverse' : 'flex-row'} items-center gap-3`}>
            <TouchableOpacity
              className={`rounded-lg ${
                !row || row.FailureReportStatusID == 2 || row.FailureReportStatusID == 3
                  ? 'bg-slate-500'
                  : 'bg-green-500'
              } p-3 duration-300`}
              onPress={createWorkorder}>
              <Text className="text-white">{`${ReportBugsLang.createWorkorder[Lang]}${loading ? '...' : ''}`}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`rounded-lg ${row && row?.FailureReportStatusID == 1 ? 'bg-red-500' : 'bg-slate-500'} p-3 duration-300`}
              onPress={() => {
                if (row && row?.FailureReportStatusID == 1) {
                  setShowModal(true);
                } else {
                  Toast.show({
                    type: 'error',
                    text1: ReportBugsLang.rowRequired[Lang],
                  });
                }
              }}>
              <Text className="text-white">{`${ReportBugsLang.cancelReport[Lang]}${loading ? '...' : ''}`}</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-1">
            <MainGrid
              onRowPress={(row) => setRow(row)}
              pk={'FailureReportID'}
              spTrx={'api_ms_FailureReports_Trx'}
              spIns={'api_ms_FailureReports_Ins'}
              spUpd={'api_ms_FailureReports_Upd'}
              spDel={'api_ms_FailureReports_Del'}
              TrxParam={[
                { name: 'DepartmentID', value: DepartmentID },
                { name: 'TradeID', value: TradeID },
                { name: 'IsSm', value: 0 },
                { name: 'YearID', value: YearID },
                { name: 'LangID', value: Lang },
                { name: 'UserName', value: user.username },
              ]}
              DelParam={[
                { name: 'DepartmentID', value: DepartmentID },
                {
                  rowData: true,
                  name: 'FailureReportID',
                  value: 'FailureReportID',
                },
              ]}
              InsBody={{
                DepartmentID,
                LangID: Lang,
                UserName: user.username,
                TradeID,
                IsSm: 1,
              }}
              UpdBody={{ DepartmentID, TradeID }}
              TrxDependency={[TradeID, YearID, counter]}
              routeTo={{
                path: 'ReportFailureDetails',
                hasParams: true,
                params: { DepartmentID: DepartmentID, TradeID: TradeID },
              }}
              StaticWidth={true}
              hasSpecialButton={true}
              dynamicCode={{
                tbName: 'ms_FailureReports',
                codeCol: 'FailureReportCode',
              }}
              tableHead={[
                {
                  key: 'FailureReportCode',
                  label: `${ReportBugsLang.FailureReportCode[Lang]}`,
                  type: 'number',
                  input: 'true',
                  visible: 'true',
                  width: 100,
                },
                {
                  key: 'FailureReportStatusName',
                  label: `${ReportBugsLang.FailureReportStatusName[Lang]}`,
                  type: 'text',
                  visible: 'true',
                  width: 100,
                },
                {
                  key: 'WorkorderID',
                  lable: 'workorderID',
                  type: 'number',
                  input: 'false',
                  visible: 'false',
                },
                {
                  key: 'FailureReportDate',
                  label: `${ReportBugsLang.FailureReportDate[Lang]}`,
                  type: 'date',
                  input: 'true',
                  visible: 'true',
                  width: 130,
                },
                {
                  key: 'FailureDate',
                  label: `${ReportBugsLang.FailureDate[Lang]}`,
                  type: 'date',
                  input: 'true',
                  visible: 'true',
                  width: 100,
                },
                {
                  key: 'ProblemDescription',
                  label: `${ReportBugsLang.ProblemDescription[Lang]}`,
                  type: 'text',
                  input: 'true',
                  visible: 'true',
                  width: 250,
                },
                {
                  key: 'ReportedByEmployeeID',
                  label: `${ReportBugsLang.ReportedByEmployeeID[Lang]}`,
                  type: 'dropdown',
                  options: ReportEmployeesList,
                  input: 'true',
                  visible: 'false',
                  width: 150,
                },
                {
                  key: 'WorkorderCode',
                  label: 'رقم امر الشغل',
                  type: 'number',
                  input: 'false',
                  visible: 'true',
                  width: 100,
                },
                {
                  key: 'WorkorderStatusName',
                  label: 'حاله امر الشغل',
                  type: 'text',
                  input: 'false',
                  visible: 'true',
                  width: 100,
                },
                {
                  key: 'PriorityID',
                  label: `${ReportBugsLang.PriorityID[Lang]}`,
                  type: 'dropdown',
                  options: priorityList,
                  input: 'true',
                  visible: 'false',
                  width: 100,
                },
                {
                  key: 'FailureReportID',
                  label: 'كود البلاغ',
                  type: 'number',
                  input: 'false',
                  visible: 'false',
                  width: 100,
                },
                {
                  key: 'StaffName',
                  label: `${ReportBugsLang.EmployeeName[Lang]}`,
                  type: 'text',
                  input: 'false',
                  visible: 'true',
                  width: 150,
                },
                {
                  key: 'PriorityName',
                  label: `${ReportBugsLang.PriorityName[Lang]}`,
                  type: 'text',
                  input: 'false',
                  visible: 'true',
                  width: 100,
                },
                {
                  key: 'CancelledName',
                  label: `الالغاء بواسطه`,
                  type: 'text',
                  input: 'false',
                  visible: 'true',
                  width: 100,
                },
                {
                  key: 'CancelledDate',
                  label: `تاريخ االغاء`,
                  type: 'date',
                  input: 'false',
                  visible: 'true',
                  width: 100,
                },
                {
                  key: 'CancelReason',
                  label: `سبب الالغاء`,
                  type: 'text',
                  input: 'false',
                  visible: 'true',
                  width: 100,
                },
              ]}
            />
          </View>

          <InputModal
            data={cancelInputs}
            buttonTitle={ReportBugsLang.cancelReport[Lang]}
            onButtonPress={cancelReport}
            visible={showModal}
            manipulatedRow={cancelObj}
            loading={cancelLoader}
            onClose={() => setShowModal(false)}
          />
        </View>
      </MainLayout>
    </>
  );
};

export default ReportFailure;
