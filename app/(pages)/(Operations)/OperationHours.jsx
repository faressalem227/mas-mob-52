import { MainLayout, MainGrid } from '../../../components';
import { useLocalSearchParams } from 'expo-router';
import OperatingSystemLang from '../../../constants/Lang/OperatingSystem/OperatingSystemLang';
import { useGlobalContext } from '../../../context/GlobalProvider';

const OperationHours = () => {
  const { Lang, user, company, DepartmentID } = useGlobalContext();

  const { TradeID, subLocationID, date } = useLocalSearchParams();

  return (
    <MainLayout title={OperatingSystemLang.operationHours[Lang]}>
      <MainGrid
        pk={'AssetID'}
        hasIns={false}
        hasDel={false}
        spTrx={'api_op_OperationData_Trx'}
        spUpd={'api_op_OperationData_Upd'}
        TrxParam={[
          { name: 'DepartmentID', value: DepartmentID },
          { name: 'OperationDate', value: date },
          { name: 'SubLocationID', value: subLocationID },
        ]}
        UpdBody={{ DepartmentID, OperationDate: date }}
        TrxDependency={[date, subLocationID]}
        StaticWidth={true}
        tableHead={[
          {
            key: 'AssetID',
          },
          {
            key: 'DepartmentID',
          },
          {
            key: 'AssetCode',
            label: OperatingSystemLang.AssetCode[Lang],
            type: 'number',
            input: 'false',
            visible: 'true',
            width: 80,
          },
          {
            key: 'AssetName',
            label:OperatingSystemLang.AssetName[Lang],
            type: 'text',
            input: 'false',
            visible: 'true',
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
            key: 'OperatingHours',
            label: OperatingSystemLang.ValueOfDay[Lang],
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

export default OperationHours;
