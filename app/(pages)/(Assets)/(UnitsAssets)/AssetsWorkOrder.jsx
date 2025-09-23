import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { MainLayout, Dropdown, MainGrid } from '../../../../components';
import { useLocalSearchParams } from 'expo-router';
import AssetHomeLang from '../../../../constants/Lang/AssetManagment/AssetHomeLang';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import { useDropDown } from '../../../../hooks/useDropDownData';
import ReportBugsLang from '../../../../constants/Lang/Maintenance/ReportBugs';

const AssetsWorkOrder = () => {
  const {
    AssetID,
    SubLocationID,
    LocationID,
    AssetCode,
    AssetName,
    AssetClassName,
    AssetStatusName,
    ...restParams
  } = useLocalSearchParams();

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
              label: 'تصنيف الاعمال',
              type: '',
              input: 'true',
              visible: 'true',
              width: 200,
            },
            {
              key: 'PriorityName',
              label: 'الاولوية',
              type: '',
              input: 'true',
              visible: 'true',
              width: 200,
            },
            {
              key: 'StaffCode',
              label: 'كود الموظف',
              type: '',
              input: 'true',
              visible: 'true',
              width: 200,
            },
            {
              key: 'StaffName',
              label: 'اسم الموظف المسئول',
              type: '',
              input: 'true',
              visible: 'true',
              width: 200,
            },
            {
              key: 'RequiredExecuteDate',
              label: 'تاريخ التنفيذ المطلوب',
              type: '',
              input: 'true',
              visible: 'true',
              width: 200,
            },
            {
              key: 'Safety',
              label: 'مهمات الوقاية والامان',
              type: '',
              input: 'true',
              visible: 'true',
              width: 200,
            },
            {
              key: 'FailureCauseName',
              label: 'سبب العطل',
              type: '',
              input: 'true',
              visible: 'true',
              width: 200,
            },
            {
              key: 'PlannedStartDate',
              label: 'تاريخ بدء مخطط',
              type: '',
              input: 'true',
              visible: 'true',
              width: 200,
            },
            {
              key: 'PlannedEndDate',
              label: 'تاريخ نهو مخطط',
              type: '',
              input: 'true',
              visible: 'true',
              width: 200,
            },
            {
              key: 'ActualStartDate',
              label: 'تاريخ بدا فعلي',
              type: '',
              input: 'true',
              visible: 'true',
              width: 200,
            },
            {
              key: 'ActualEndDate',
              label: 'تاريخ نهو فعلي',
              type: '',
              input: 'true',
              visible: 'true',
              width: 200,
            },
            {
              key: 'ClosedDate',
              label: 'تاريخ الاغلاق ',
              type: '',
              input: 'true',
              visible: 'true',
              width: 200,
            },
            {
              key: 'CancelledDate',
              label: 'تاريخ الالغاء ',
              type: '',
              input: 'true',
              visible: 'true',
              width: 200,
            },
            {
              key: 'ScheduleCode',
              label: 'كود الجدولة ',
              type: '',
              input: 'true',
              visible: 'true',
              width: 200,
            },
            {
              key: 'ScheduleName',
              label: 'اسم الجدولة ',
              type: '',
              input: 'true',
              visible: 'true',
              width: 200,
            },
          ]}
          //pk={"WorkorderAssetID"}
          spTrx={'api_ms_Asset_WorkOrders'}
          TrxParam={[
            { name: 'DepartmentID', value: DepartmentID },
            { name: 'AssetID', value: AssetID },
            { name: 'YearID', value: YearID },
          ]}
          TrxDependency={[YearID]}
          hasCrud={false}
          StaticWidth={true}
          routeTo={{
            path: '/WorkOrderDetails',
            hasParams: true,
            params: {
              LocationID: LocationID,
              SubLocationID: SubLocationID,
            },
          }}
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
