import { MainLayout, MainGrid } from '../../../components';
import { useLocalSearchParams } from 'expo-router';
import OperatingSystemLang from '../../../constants/Lang/OperatingSystem/OperatingSystemLang';
import { useGlobalContext } from '../../../context/GlobalProvider';

const OperationDailyData = () => {
  const { Lang, user, company, DepartmentID } = useGlobalContext();

  const { TradeID, subLocationID, date } = useLocalSearchParams();

  return (
    <MainLayout title={OperatingSystemLang.dailyOpertaion[Lang]}>
      <MainGrid
        pk={'ID'}
        hasIns={false}
        hasDel={false}
        spTrx={'api_op_Asset_Daily_Data_Trx'}
        spUpd={'api_op_Asset_Daily_Data_Upd'}
        TrxParam={[
          { name: 'DepartmentID', value: DepartmentID },
          { name: 'OperationDate', value: date },
          { name: 'SubLocationID', value: subLocationID },
          { name: 'TradeID', value: TradeID },
        ]}
        UpdBody={{ SubLocationID: subLocationID, OperationDate: date }}
        TrxDependency={[date, subLocationID, DepartmentID]}
        StaticWidth={true}
        tableHead={[
          {
            key: 'AssetID',
          },
          {
            key: 'DepartmentID',
          },
          {
            key: 'AssetName',
            label: 'اسم الاصل',
            input: 'false',
            visible: 'true',
            width: 100,
          },
          {
            key: 'OperationItemID',
            label: OperatingSystemLang.OperationItem[Lang],
            type: 'number',
            input: 'false',
            visible: 'false',
            width: 100,
          },
          {
            key: 'OperationItemName',
            label: OperatingSystemLang.OperationItem[Lang],
            type: 'text',
            input: 'false',
            visible: 'true',
            width: 100,
          },
          {
            key: 'Day',
            label: OperatingSystemLang.Day[Lang],
            type: 'number',
            input: 'true',
            visible: 'true',
            width: 100,
          },
          {
            key: 'Shift01',
            label: OperatingSystemLang.Shift01[Lang],
            type: 'number',
            input: 'true',
            visible: 'true',
            width: 100,
          },
          {
            key: 'Shift02',
            label: OperatingSystemLang.Shift02[Lang],
            type: 'number',
            input: 'true',
            visible: 'true',
            width: 100,
          },
          {
            key: 'Shift03',
            label: OperatingSystemLang.Shift03[Lang],
            type: 'number',
            input: 'true',
            visible: 'true',
            width: 100,
          },
        ]}
      />
    </MainLayout>
  );
};

export default OperationDailyData;
