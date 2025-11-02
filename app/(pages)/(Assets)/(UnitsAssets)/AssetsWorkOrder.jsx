import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { MainLayout, Dropdown, MainGrid } from '../../../../components';
import { useLocalSearchParams } from 'expo-router';
import AssetHomeLang from '../../../../constants/Lang/AssetManagment/AssetHomeLang';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import { useDropDown } from '../../../../hooks/useDropDownData';
import ReportBugsLang from '../../../../constants/Lang/Maintenance/ReportBugs';

const AssetsWorkOrder = () => {
  const { AssetID, SubLocationID, LocationID } = useLocalSearchParams();

  const { Lang, DepartmentID, user } = useGlobalContext();

  const [YearID, setYearID] = useState(null);

  const { data: YearList, loading: YearLoader } = useDropDown(
    'api_ms_Years_List',
    { DepartmentID, LangID: Lang, UserName: user.username },
    'YearID',
    'YearName'
  );

  return (
    <MainLayout title={AssetHomeLang.WorkOrders[Lang]} loading={YearLoader}>
      <View className="flex-1">
        <View className="my-3 px-4">
          <Dropdown
            placeholder={ReportBugsLang.YearChoose[Lang]}
            label={ReportBugsLang.Year[Lang]}
            data={YearList}
            initailOption={YearList[5]?.key}
            onChange={(e) => {
              setYearID(e);
            }}
          />
        </View>

        <MainGrid
          pk={'WorkorderCode'}
          spTrx={'api_ms_Asset_WorkOrders'}
          TrxParam={[
            { name: 'DepartmentID', value: DepartmentID },
            { name: 'AssetID', value: AssetID },
            { name: 'YearID', value: YearID },
            { name: 'LangID', value: Lang },
            { name: 'UserName', value: user.username },
          ]}
          TrxDependency={[YearID]}
          hasCrud={false}
          mixedWidth
          tableHead={[
            {
              key: 'WorkorderCode',
              label: AssetHomeLang.WorkOrderNumber[Lang],
              type: 'number',
              input: 'true',
              visible: 'true',
              width: 200,
            },
            {
              key: 'WorkorderName',
              label: AssetHomeLang.WorkOrderDescription[Lang],
              input: 'true',
              visible: 'true',
              width: 200,
            },
            {
              key: 'WorkorderTypeName',
              label: AssetHomeLang.WorkOrderType[Lang],
              input: 'true',
              visible: 'true',
              width: 200,
            },
            {
              key: 'WorkorderStatusName',
              label: AssetHomeLang.WorkOrderStatus[Lang],
              type: '',
              input: 'true',
              visible: 'true',
              width: 200,
            },
            {
              key: 'TradeName', //
              label: AssetHomeLang.trade[Lang],
              type: '',
              input: 'true',
              visible: 'true',
              width: 200,
            },
            {
              key: 'PriorityName',
              label: AssetHomeLang.Priority[Lang],
              type: '',
              input: 'true',
              visible: 'true',
              width: 200,
            },
            {
              key: 'StaffCode',
              label: AssetHomeLang.StaffCode[Lang],
              type: '',
              input: 'true',
              visible: 'true',
              width: 200,
            },
            {
              key: 'StaffName',
              label: AssetHomeLang.StaffName[Lang],
              type: '',
              input: 'true',
              visible: 'true',
              width: 200,
            },
            {
              key: 'RequiredExecuteDate',
              label: AssetHomeLang.RequiredExecuteDate[Lang],
              type: '',
              input: 'true',
              visible: 'true',
              width: 200,
            },
            {
              key: 'Safety',
              label: AssetHomeLang.Safety[Lang],
              type: '',
              input: 'true',
              visible: 'true',
              width: 200,
            },
            {
              key: 'FailureCauseName',
              label: AssetHomeLang.FailureCauseName[Lang],
              type: '',
              input: 'true',
              visible: 'true',
              width: 200,
            },
            {
              key: 'PlannedStartDate',
              label: AssetHomeLang.PlannedStartDate[Lang],
              type: '',
              input: 'true',
              visible: 'true',
              width: 200,
            },
            {
              key: 'PlannedEndDate',
              label: AssetHomeLang.PlannedEndDate[Lang],
              type: '',
              input: 'true',
              visible: 'true',
              width: 200,
            },
            {
              key: 'ActualStartDate',
              label: AssetHomeLang.ActualStartDate[Lang],
              type: '',
              input: 'true',
              visible: 'true',
              width: 200,
            },
            {
              key: 'ActualEndDate',
              label: AssetHomeLang.ActualEndDate[Lang],
              type: '',
              input: 'true',
              visible: 'true',
              width: 200,
            },
            {
              key: 'ClosedDate',
              label: AssetHomeLang.ClosedDate[Lang],
              type: '',
              input: 'true',
              visible: 'true',
              width: 200,
            },
            {
              key: 'CancelledDate',
              label: AssetHomeLang.CancelledDate[Lang],
              type: '',
              input: 'true',
              visible: 'true',
              width: 200,
            },
            {
              key: 'ScheduleCode',
              label: AssetHomeLang.ScheduleCode[Lang],
              type: '',
              input: 'true',
              visible: 'true',
              width: 200,
            },
            {
              key: 'ScheduleName',
              label: AssetHomeLang.ScheduleName[Lang],
              type: '',
              input: 'true',
              visible: 'true',
              width: 200,
            },
          ]}
        />
      </View>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dropdownContainer: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  assetsGrid: {
    marginVertical: 8,
  },
});

export default AssetsWorkOrder;
