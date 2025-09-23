import { useState } from 'react';
import { View } from 'react-native';
import { MainLayout, MainGrid, Dropdown } from '../../../../components';
import { useLocalSearchParams } from 'expo-router';
import AssetHomeLang from '../../../../constants/Lang/AssetManagment/AssetHomeLang';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import ReportBugsLang from '../../../../constants/Lang/Maintenance/ReportBugs';
import { useDropDown } from '../../../../hooks/useDropDownData';

const AssetCountersLang = {
  AssetCountersData: {
    1: 'عدادات الأصل',
    2: 'Asset Counters',
  },
  AssetID: {
    1: 'معرف الأصل',
    2: 'Asset ID',
  },
  AssetMeterID: {
    1: 'معرف عداد الأصل',
    2: 'Asset Meter ID',
  },
  MeterDate: {
    1: 'تاريخ القراءة',
    2: 'Reading Date',
  },
  MeterValue: {
    1: 'قراءة العداد',
    2: 'Reading Value',
  },
  Remarks: {
    1: 'ملاحظات',
    2: 'Remarks',
  },
};

const AssetCounters = () => {
  const { AssetID } = useLocalSearchParams();
  const { Lang, DepartmentID, user } = useGlobalContext();
  const [YearID, setYearID] = useState(null);

  const { data: YearList, loading: YearLoader } = useDropDown(
    'ms_admin_Years_List',
    {
      LangID: Lang,
      UserName: user.username,
    },
    'YearID',
    'YearName'
  );

  return (
    <MainLayout title={AssetHomeLang.Meters[Lang]} loading={YearLoader}>
      <View className="my-3 flex-1 px-4">
        <Dropdown
          placeholder={ReportBugsLang.YearChoose[Lang]}
          label={ReportBugsLang.Year[Lang]}
          data={YearList}
          initailOption={new Date().getFullYear()}
          onChange={(e) => {
            setYearID(e);
          }}
        />

        <MainGrid
          pk={'AssetMeterID'}
          spTrx={'api_ms_AssetsMeters_Trx'}
          spIns={'api_ms_AssetsMeters_Ins'}
          spUpd={'api_ms_AssetsMeters_Upd'}
          spDel={'api_ms_AssetsMeters_Del'}
          TrxParam={[
            { name: 'DepartmentID', value: DepartmentID },
            { name: 'AssetID', value: AssetID },
            { name: 'YearID', value: YearID },
          ]}
          DelParam={[
            { name: 'DepartmentID', value: DepartmentID },
            { rowData: true, name: 'AssetMeterID', value: 'AssetMeterID' },
          ]}
          UpdBody={{ DepartmentID }}
          InsBody={{ DepartmentID, AssetID }}
          TrxDependency={[DepartmentID, AssetID, YearID]}
          tableHead={[
            {
              key: 'AssetID',
              visible: false,
              required: false,
              width: 100,
              label: AssetCountersLang.AssetID[Lang],
            },
            {
              key: 'AssetMeterID',
              type: 'text',
              input: false,
              visible: false,
              isRequired: false,
              width: null,
              label: AssetCountersLang.AssetMeterID[Lang],
            },
            {
              key: 'MeterDate',
              type: 'date',
              input: true,
              visible: true,
              isRequired: true,
              width: 210,
              label: AssetCountersLang.MeterDate[Lang],
            },
            {
              key: 'MeterValue',
              type: 'text',
              input: true,
              visible: true,
              isRequired: true,
              width: 170,
              label: AssetCountersLang.MeterValue[Lang],
            },
            {
              key: 'Remarks',
              type: 'text',
              input: true,
              visible: true,
              isRequired: false,
              width: 500,
              ellipsed: true,
              label: AssetCountersLang.Remarks[Lang],
            },
          ]}
        />
      </View>
    </MainLayout>
  );
};

export default AssetCounters;
