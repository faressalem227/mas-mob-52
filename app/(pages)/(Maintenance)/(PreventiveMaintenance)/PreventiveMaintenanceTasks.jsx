import { TouchableOpacity, View } from 'react-native';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import { useLocalSearchParams } from 'expo-router';
import PreventiveMaintenanceTasksLang from '../../../../constants/Lang/Maintenance/PreventiveMaintenanceHome/PreventiveMaintenance/PreventiveMaintenanceTasksLang';
import PreventiveMaintenanceDetailsLang from '../../../../constants/Lang/Maintenance/PreventiveMaintenanceHome/PreventiveMaintenanceDetails';
import { MainGrid, MainLayout, InfoDetailes } from '../../../../components';
import { useState } from 'react';
import Toast from 'react-native-toast-message';
import api from '../../../../utilities/api';
import { Dropdown } from 'react-native-element-dropdown';
import { useDropDown } from '../../../../hooks/useDropDownData';

const PreventiveMaintenanceTasks = () => {
  const { Lang, DepartmentID, Rtl, company, user } = useGlobalContext();
  const {
    ProcedureID,
    ProcedureCode,
    ProcedureName,
    PeriodID,
    PeriodName,
    EstimatedLaborHours,
    TradeID,
    TradeName,
    PriorityName,
    ProcedureTypeName,
  } = useLocalSearchParams();

  const detailsData = [
    { label: PreventiveMaintenanceDetailsLang.ProcedureCode[Lang], value: ProcedureCode },
    { label: PreventiveMaintenanceDetailsLang.ProcedureName[Lang], value: ProcedureName },
    { label: PreventiveMaintenanceDetailsLang.Trade[Lang], value: TradeName },
    { label: PreventiveMaintenanceDetailsLang.PriorityName[Lang], value: PriorityName },
    { label: PreventiveMaintenanceDetailsLang.Period[Lang], value: PeriodName },
    {
      label: PreventiveMaintenanceDetailsLang.EstimatedLaborHours[Lang],
      value: EstimatedLaborHours,
    },
    { label: PreventiveMaintenanceDetailsLang.ProcedureType[Lang], value: ProcedureTypeName },
  ];
  const { data: sds_SMPList } = useDropDown(
    'ms_SMPList',
    {
      UserName: user.username,
      LangID: Lang,
      PeriodID: PeriodID,
      TradeID: TradeID,
      CompanyID: company,
    },
    'ProcedureID',
    'ProcedureName'
  );
  const [isLoading, setIsLoading] = useState(false);
  const [SMPID, setSMPID] = useState(false);
  const createWorkorder = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('table/', {
        sp: 'api_ms_Procedures_Tasks_Copy',
        //  DepartmentID: departmentValue?.value,
        SMPID: SMPID,
        ProcedureID: ProcedureID,
      });
      Toast.show({
        type: 'success',
        text1: 'success',
      });
    } catch (error) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout title={PreventiveMaintenanceTasksLang.PageTitle[Lang]} className="">
      <View className="flex h-[100vh] flex-col bg-white py-4">
        <InfoDetailes details={detailsData} />
        <View className={`my-6 px-4 ${Rtl ? 'flex-row-reverse' : 'flex-row'} items-center gap-3`}>
          <Dropdown
            placeholder={pagesText.SMP[languageValue]}
            title={PreventiveMaintenanceLang.ProcedureType[Lang]}
            data={sds_SMPList}
            initailOption={ProceduresTypeList[0]?.key}
            onChange={(val) => {
              setSMPID(val);
            }}
            // defaultValue={16}
          />
          <TouchableOpacity
            className={`rounded-lg 
                bg-green-500
             p-3 duration-300`}
            onPress={createWorkorder}>
            <Text className="text-white">{`${ReportBugsLang.createWorkorder[Lang]}${loading ? '...' : ''}`}</Text>
          </TouchableOpacity>
        </View>
        {/* <div className="mb-4 flex flex-row flex-wrap items-center gap-2">
          <div className="min-w-[300px]">
            <DropDown
              placeHolder={pagesText.SMP[languageValue]}
              options={sds_SMPList}
              onChange={(val) => {
                setSMPID(val);
              }}
              value={SMPID}
              // defaultValue={16}
            />
          </div>
          <div className="min-w-[300px]">
            <TableButton
              // theme={
              //   tableCounter || activeRow?.SMPTasksCopied
              //     ? "disabled"
              //     : "add"
              // }
              onClick={() => {
                if (!SMPID) {
                  toast.error(pagesText.SelectSMP[languageValue]);
                } else {
                  setIsSMPTasks(true);
                  getSMPTasks();
                }
              }}>
              {pagesText.CopySMPTasks[languageValue]}
            </TableButton>
          </div>
        </div> */}
        <View className="flex-1">
          <MainGrid
            tableHead={[
              {
                key: 'ProcedureTasksID',
              },
              {
                key: 'ProcedureTasksCode',
                label: PreventiveMaintenanceTasksLang.TableHeaders.Code[Lang],
                type: 'number',
                visible: 'true',
              },
              {
                key: 'ProcedureTasksName',
                label: PreventiveMaintenanceTasksLang.TableHeaders.RequiredTasks[Lang],
                type: 'text',
                input: 'true',
                visible: 'true',
              },
              {
                key: 'EstimatedTasksHours',
                label: PreventiveMaintenanceTasksLang.TableHeaders.EstimatedHours[Lang],
                type: 'number',
                input: 'true',
                visible: 'true',
              },
            ]}
            pk={'ProcedureTasksID'}
            spTrx={'api_ms_Procedures_Tasks_Trx'}
            spIns={'api_ms_Procedures_Tasks_Ins'}
            spUpd={'api_ms_Procedures_Tasks_Upd'}
            spDel={'api_ms_Procedures_Tasks_Del'}
            dynamicCode={{
              tbName: 'ms_Procedure_Task',
              codeCol: 'ProcedureTasksCode',
            }}
            TrxParam={[
              { name: 'DepartmentID', value: DepartmentID },
              { name: 'ProcedureID', value: ProcedureID },
            ]}
            DelParam={[
              {
                rowData: true,
                name: 'ProcedureTasksID',
                value: 'ProcedureTasksID',
              },
            ]}
            UpdBody={{ DepartmentID: DepartmentID, ProcedureID: ProcedureID }}
            InsBody={{ DepartmentID: DepartmentID, ProcedureID: ProcedureID }}
            TrxDependency={[ProcedureID, DepartmentID]}
          />
        </View>
      </View>
    </MainLayout>
  );
};

export default PreventiveMaintenanceTasks;
