import { View } from 'react-native';
import { MainLayout, Dropdown } from '../../../../components';
import { useLocalSearchParams } from 'expo-router';
import MainGrid from '../../../../components/grid/MainGrid';
import AssetHomeLang from '../../../../constants/Lang/AssetManagment/AssetHomeLang';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import ReportBugsLang from '../../../../constants/Lang/Maintenance/ReportBugs';
import { useDropDown } from '../../../../hooks/useDropDownData';
import { useState } from 'react';
const AssetMaintenance = () => {
  const { AssetID } = useLocalSearchParams();

  const { Lang, DepartmentID, user } = useGlobalContext();
  const [YearID, setYearID] = useState(new Date().getFullYear());

  const { data: YearList } = useDropDown(
    'api_ms_Years_List',
    {
      DepartmentID,
      LangID: Lang,
      UserName: user.username,
    },
    'YearID',
    'YearName'
  );

  return (
    <MainLayout title={AssetHomeLang.MaintenancePlan[Lang]} className="">
      <View className="flex-1">
        <View className="my-3 px-4">
          <Dropdown
            placeholder={ReportBugsLang.YearChoose[Lang]}
            label={ReportBugsLang.Year[Lang]}
            data={YearList}
            initailOption={new Date().getFullYear()}
            onChange={(e) => {
              setYearID(e);
            }}
          />
        </View>
        <MainGrid
          spTrx={'api_ms_Assets_plan'}
          mixedWidth
          TrxDependency={[YearID]}
          TrxParam={[
            { name: 'AssetID', value: AssetID },
            { name: 'DepartmentID', value: DepartmentID },
            { name: 'YearID', value: YearID },
          ]}
          hasCrud={false}
          tableHead={[
            {
              key: 'ScheduleDetailsID',
              label: AssetHomeLang.ScheduleCode[Lang],
              type: 'number',
              input: 'true',
              visible: 'true',
              width: 150,
            },
            {
              key: 'ScheduleName',
              label: AssetHomeLang.ScheduleName[Lang],
              input: 'true',
              visible: 'true',
              width: 150,
            },
            {
              key: 'PlannedStartDate',
              label: AssetHomeLang.ScheduleStartDate[Lang],
              type: 'date',
              input: 'true',
              visible: 'true',
              width: 150,
            },
            {
              key: 'PlannedEndDate',
              label: AssetHomeLang.SchemeEndDate[Lang],
              type: 'date',
              input: 'true',
              visible: 'true',
              width: 150,
            },
            {
              key: 'LabourCost',
              label: 'تكلفه العماله',
              type: 'number',
              input: 'true',
              visible: 'true',
              width: 150,
            },
            {
              key: 'MaterialCost',
              label: 'تكلفه قطع الغيار',
              type: 'number',
              input: 'true',
              visible: 'true',
              width: 150,
            },
            {
              key: 'ServiceCost',
              label: 'تكلفه  الخدمات',
              type: 'number',
              input: 'true',
              visible: 'true',
              width: 150,
            },
            {
              key: 'ContractorsCost',
              label: 'تكلفه  مقاولات',
              type: 'number',
              input: 'true',
              visible: 'true',
              width: 150,
            },
            {
              key: 'WorkorderCounter',
              label: 'عداد',
              type: 'number',
              input: 'true',
              visible: 'true',
              width: 150,
            },
            {
              key: 'WorkorderCode',
              label: 'رقم امر الشغل',
              type: 'text',
              input: 'true',
              visible: 'true',
              width: 150,
            },
            {
              key: 'WorkorderStatusName',
              label: 'حاله امر الشغل',
              type: 'text',
              input: 'true',
              visible: 'true',
              width: 150,
            },
          ]}
        />
      </View>
    </MainLayout>
  );
};

export default AssetMaintenance;
