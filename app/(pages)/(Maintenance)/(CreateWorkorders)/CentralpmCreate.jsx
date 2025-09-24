import { useState } from 'react';
import { MainLayout, MainGrid, InfoDetailes } from '../../../../components';
import { TouchableOpacity, View, Text } from 'react-native';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import { useLocalSearchParams } from 'expo-router';
import CreateWorkOrdersLang from '../../../../constants/Lang/Maintenance/PreventiveMaintenanceHome/CreateWorkOrders';
import api from '../../../../utilities/api';
import Toast from 'react-native-toast-message';
const CentralpmCreate = () => {
  const { user, DepartmentID, Lang, company, Rtl } = useGlobalContext();
  const { DateTo, DateFrom, TradeID, ProcedureTypeID, TradeName, IsSm } = useLocalSearchParams();
  const [generateWorkorderLoaderAll, setWorkorderLoaderAll] = useState(false);
  const [generateWorkorderLoader, setWorkorderLoader] = useState(false);
  const [generateScheduleLoader, setGenerateScheduleLoader] = useState(false);
  const [row, setRow] = useState(null);

  const detailsData = [
    {
      label: CreateWorkOrdersLang.StartDate[Lang],
      value: DateFrom,
    },
    {
      label: CreateWorkOrdersLang.EndDate[Lang],
      value: DateTo,
    },
    {
      label: CreateWorkOrdersLang.Trade[Lang],
      value: TradeName,
    },
  ];

  const generateSchedule = async () => {
    setGenerateScheduleLoader(true);
    try {
      await api.post('table/', {
        sp: 'api_ms_sp_pm_GenerateTimeLine2',
        DepartmentID,
        UserName: user.username,
        LangID: Lang,
        TradeID,
        PeriodFrom: DateFrom,
        PeriodTo: DateTo,
      });

      Toast.show({
        type: 'success',
        text1: CreateWorkOrdersLang.generateTimelineSuccess[Lang],
      });
    } catch (error) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: CreateWorkOrdersLang.generateTimelineFailure[Lang],
      });
    } finally {
      setGenerateScheduleLoader(false);
    }
  };

  const generateWorkorderAll = async () => {
    setWorkorderLoaderAll(true);
    try {
      await api.post('table/', {
        sp: 'api_ms_sp_pm_GenerateWorkorders22_Central',
        DepartmentID,
        UserName: user.username,
        LangID: Lang,
        TradeID1: TradeID,
        PeriodFrom: DateFrom,
        PeriodTo: DateTo,
        ProcedureTypeID:ProcedureTypeID,
        IsSm:1,
      });

      Toast.show({
        type: 'success',
        text1: CreateWorkOrdersLang.createAllSuccess[Lang],
      });
    } catch (error) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: CreateWorkOrdersLang.createAllFailure[Lang],
      });
    } finally {
      setWorkorderLoaderAll(false);
    }
  };

  const generateWorkorder = async () => {
    if (!row) {
      Toast.show({
        type: 'error',
        text1: CreateWorkOrdersLang.rowRequired[Lang],
      });

      return;
    }

    setWorkorderLoader(true);
    try {
      await api.post('table/', {
        sp: 'api_ms_sp_pm_GenerateWorkorders_For_details',
        CompanyID: company,
        DepartmentID,
        UserName: user.username,
        LangID: Lang,
        PeriodFrom: DateFrom,
        PeriodTo: DateTo,
        ScheduleDetailsID: row.ScheduleDetailsID,
      });
      Toast.show({
        type: 'success',
        text1: CreateWorkOrdersLang.createSuccess[Lang],
      });
    } catch (error) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: CreateWorkOrdersLang.createFailure[Lang],
      });
    } finally {
      setWorkorderLoader(false);
    }
  };

  return (
    <MainLayout title={CreateWorkOrdersLang.preventiveMs[Lang]}>
      <InfoDetailes details={detailsData} />

      <View className={`my-4 items-center gap-4 px-4 ${Rtl ? 'flex-row-reverse' : 'flex-row'}`}>
        <TouchableOpacity className="rounded-lg bg-primary p-3" onPress={generateSchedule}>
          <Text className="text-white">{`${CreateWorkOrdersLang.generateTimeLine[Lang]}${generateScheduleLoader ? '...' : ''}`}</Text>
        </TouchableOpacity>

        <TouchableOpacity className="rounded-lg bg-green-500 p-3" onPress={generateWorkorderAll}>
          <Text className="text-white">{`${CreateWorkOrdersLang.CreateWorkOrderAll[Lang]}${generateWorkorderLoaderAll ? '...' : ''}`}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`rounded-lg ${row ? 'bg-green-500' : 'bg-slate-500'} p-3`}
          onPress={generateWorkorder}>
          <Text className="text-white">{`${CreateWorkOrdersLang.CreateWorkOrder[Lang]}${generateWorkorderLoader ? '...' : ''}`}</Text>
        </TouchableOpacity>
      </View>

      <MainGrid
        hasIns={false}
        onRowPress={(row) => setRow(row)}
        pk={'ScheduleDetailsID'}
        spTrx={'ms_Schedule_Details_Trx_Central'}
        spIns={'api_ms_Schedule_Details_Ins'}
        spUpd={'api_ms_Schedule_Details_Upd'}
        spDel={'api_ms_Schedule_Details_Del'}
        TrxParam={[
          { name: 'CompanyID', value: company },
          { name: 'DepartmentID', value: DepartmentID },
          { name: 'DateFrom', value: DateFrom },
          { name: 'DateTo', value: DateTo },
          { name: 'UserName', value: user.username },
          { name: 'LangID', value: Lang },
          { name: 'TradeID', value: TradeID },
          { name: 'IsSm', value: 1 },
          { name: 'ProcedureTypeID', value: ProcedureTypeID },

        ]
}
        
        
        TrxDependency={[company,DepartmentID,TradeID, ProcedureTypeID, DateFrom, DateTo]}
        StaticWidth
        tableHead={[
          {
            key: 'ScheduleDetailsID',
          },
          {
            key: 'ScheduleID',
          },
          {
            key: 'ScheduleName',
            label: CreateWorkOrdersLang.ScheduleName[Lang],
            width: 360,
            visible: true,
          },
          {
            key: 'PlannedStartDate',
            label: CreateWorkOrdersLang.PlannedStartDate[Lang],
            type: 'date',
            visible: true,
            width: 120,
          },
          {
            key: 'PlannedEndDate',
            label: CreateWorkOrdersLang.PlannedEndDate[Lang],
            type: 'date',
            visible: true,
            width: 120,
          },
          {
            key: 'WorkorderCounter',
            label: CreateWorkOrdersLang.Counter[Lang],
            type: 'number',
            visible: true,
            width: 100,
          },
          {
            key: 'LabourCost',
            label: CreateWorkOrdersLang.LaborCost[Lang],
            type: 'number',
            visible: true,
            width: 110,
          },
          {
            key: 'MaterialCost',
            label: CreateWorkOrdersLang.MaterialCost[Lang],
            type: 'number',
            visible: true,
            width: 130,
          },
          {
            key: 'WorkorderCode',
            label: CreateWorkOrdersLang.WorkorderCode[Lang],
            visible: true,
            width: 110,
          },
          {
            key: 'GenerateWODateStart',
            label: CreateWorkOrdersLang.GenerateWODateStart[Lang],
            type: 'date',
            visible: true,
            width: 130,
          },
          {
            key: 'GenerateWODateEnd',
            label: CreateWorkOrdersLang.GenerateWODateEnd[Lang],
            type: 'date',
            visible: true,
            width: 130,
          },
          {
            key: 'GenerateWOUserName',
            label: CreateWorkOrdersLang.GenerateWOUserName[Lang],
            visible: true,
            width: 130,
          },
          {
            key: 'ServiceCost',
            label: CreateWorkOrdersLang.ServiceCost[Lang],
            type: 'number',
            visible: true,
            width: 120,
          },
          {
            key: 'ContractorsCost',
            label: CreateWorkOrdersLang.ContractorsCost[Lang],
            type: 'number',
            visible: true,
            width: 120,
          },
          {
            key: 'Execluded',
            label: CreateWorkOrdersLang.Execluded[Lang],
            type: 'checkbox',
            input: true,
            visible: true,
            width: 90,
          },
          {
            key: 'ExecludReason',
            label: CreateWorkOrdersLang.ExecludReason[Lang],
            input: true,
            visible: true,
            width: 160,
          },
        ]}
      />
    </MainLayout>
  );
};

export default CentralpmCreate;
