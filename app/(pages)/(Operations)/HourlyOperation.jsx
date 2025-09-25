import { MainLayout, MainGrid } from '../../../components';
import { useLocalSearchParams } from 'expo-router';
import OperatingSystemLang from '../../../constants/Lang/OperatingSystem/OperatingSystemLang';
import { useGlobalContext } from '../../../context/GlobalProvider';

const HourlyOperation = () => {
  const { Lang, user, company, DepartmentID } = useGlobalContext();

  const { TradeID, subLocationID, date } = useLocalSearchParams();
  const operationHours = [
    ,
    { value: '0', key: 0 },
    { value: '1', key: 1 },
    { value: '2', key: 2 },
    { value: '3', key: 3 },
    { value: '4', key: 4 },
    { value: '5', key: 5 },
    { value: '6', key: 6 },
    { value: '7', key: 7 },
    { value: '8', key: 8 },
    { value: '9', key: 9 },
    { value: '10', key: 10 },
    { value: '11', key: 11 },
    { value: '12', key: 12 },
    { value: '13', key: 13 },
    { value: '14', key: 14 },
    { value: '15', key: 15 },
    { value: '16', key: 16 },
    { value: '17', key: 17 },
    { value: '18', key: 18 },
    { value: '19', key: 19 },
    { value: '20', key: 20 },
    { value: '21', key: 21 },
    { value: '22', key: 22 },
    { value: '23', key: 23 },
  ];

  return (
    <MainLayout title={OperatingSystemLang.hourlyOperation[Lang]}>
      <MainGrid
        pk={'AssetID1'}
        hasIns={false}
        hasDel={false}
        spTrx={'api_op_AssetsOperation_Trx'}
        spUpd={'api_op_AssetsOperation_Upd'}
        TrxParam={[
          { name: 'DepartmentID', value: DepartmentID },
          { name: 'OperationDate', value: date },
          { name: 'SubLocationID', value: subLocationID },
          { name: 'TradeID', value: TradeID },
          { name: 'LangID', value: Lang },
        ]}
        UpdBody={{
          DepartmentID,
          subLocationID,
          OperationDate: date,
          UserName: user.username,
          LangID: Lang,
        }}
        TrxDependency={[date, subLocationID, TradeID]}
        StaticWidth={true}
        tableHead={[
          {
            key: 'AssetID',
            label: 'المعده',
            input: 'false',
            visible: 'false',
            width: 100,
          },
          {
            key: 'AssetCode',
            label: OperatingSystemLang.AssetCode[Lang],
            type: 'number',
            input: 'false',
            visible: 'true',
            width: 100,
          },
          {
            key: 'AssetName',
            label: OperatingSystemLang.AssetName[Lang],
            type: 'number',
            input: 'false',
            visible: 'true',
            width: 130,
          },
          {
            key: 'OperationItemName',
            label: OperatingSystemLang.OperationItem[Lang],
            type: 'number',
            input: 'false',
            visible: 'true',
            width: 130,
          },
          // {
          //   key: 'OperationHour',
          //   label: OperatingSystemLang.Hour[Lang],
          //   type: 'dropdown',
          //   options: operationHours,
          //   input: 'false',
          //   visible: 'false',
          //   width: 100,
          // },
          // {
          //   key: 'OperationValue',
          //   label: OperatingSystemLang.Value[Lang],
          //   type: 'number',
          //   input: 'false',
          //   visible: 'false',
          //   width: 100,
          // },
          {
            key: 'T00',
            label: OperatingSystemLang.Hour0[Lang],
            type: 'number',
            input: 'true',
            visible: 'true',
            width: 80,
          },
          {
            key: 'T01',
            label: OperatingSystemLang.Hour1[Lang],
            type: 'number',
            input: 'true',
            visible: 'true',
            width: 80,
          },
          {
            key: 'T02',
            label: OperatingSystemLang.Hour2[Lang],
            type: 'number',
            input: 'true',
            visible: 'true',
            width: 80,
          },
          {
            key: 'T03',
            label: OperatingSystemLang.Hour3[Lang],
            type: 'number',
            input: 'true',
            visible: 'true',
            width: 80,
          },
          {
            key: 'T04',
            label: OperatingSystemLang.Hour4[Lang],
            type: 'number',
            input: 'true',
            visible: 'true',
            width: 80,
          },
          {
            key: 'T05',
            label: OperatingSystemLang.Hour5[Lang],
            type: 'number',
            input: 'true',
            visible: 'true',
            width: 80,
          },
          {
            key: 'T06',
            label: OperatingSystemLang.Hour6[Lang],
            type: 'number',
            input: 'true',
            visible: 'true',
            width: 80,
          },
          {
            key: 'T07',
            label: OperatingSystemLang.Hour7[Lang],
            type: 'number',
            input: 'true',
            visible: 'true',
            width: 80,
          },
          {
            key: 'T08',
            label: OperatingSystemLang.Hour8[Lang],
            type: 'number',
            input: 'true',
            visible: 'true',
            width: 80,
          },
          {
            key: 'T09',
            label: OperatingSystemLang.Hour9[Lang],
            type: 'number',
            input: 'true',
            visible: 'true',
            width: 80,
          },
          {
            key: 'T10',
            label: OperatingSystemLang.Hour10[Lang],
            type: 'number',
            input: 'true',
            visible: 'true',
            width: 80,
          },
          {
            key: 'T11',
            label: OperatingSystemLang.Hour11[Lang],
            type: 'number',
            input: 'true',
            visible: 'true',
            width: 80,
          },
          {
            key: 'T12',
            label: OperatingSystemLang.Hour12[Lang],
            type: 'number',
            input: 'true',
            visible: 'true',
            width: 80,
          },
          {
            key: 'T13',
            label: OperatingSystemLang.Hour13[Lang],
            type: 'number',
            input: 'true',
            visible: 'true',
            width: 80,
          },
          {
            key: 'T14',
            label: OperatingSystemLang.Hour14[Lang],
            type: 'number',
            input: 'true',
            visible: 'true',
            width: 80,
          },
          {
            key: 'T15',
            label: OperatingSystemLang.Hour15[Lang],
            type: 'number',
            input: 'true',
            visible: 'true',
            width: 80,
          },
          {
            key: 'T16',
            label: OperatingSystemLang.Hour16[Lang],
            type: 'number',
            input: 'true',
            visible: 'true',
            width: 80,
          },
          {
            key: 'T17',
            label: OperatingSystemLang.Hour17[Lang],
            type: 'number',
            input: 'true',
            visible: 'true',
            width: 80,
          },
          {
            key: 'T18',
            label: OperatingSystemLang.Hour18[Lang],
            type: 'number',
            input: 'true',
            visible: 'true',
            width: 80,
          },
          {
            key: 'T19',
            label: OperatingSystemLang.Hour19[Lang],
            type: 'number',
            input: 'true',
            visible: 'true',
            width: 80,
          },
          {
            key: 'T20',
            label: OperatingSystemLang.Hour20[Lang],
            type: 'number',
            input: 'true',
            visible: 'true',
            width: 80,
          },
          {
            key: 'T21',
            label: OperatingSystemLang.Hour21[Lang],
            type: 'number',
            input: 'true',
            visible: 'true',
            width: 80,
          },
          {
            key: 'T22',
            label: OperatingSystemLang.Hour22[Lang],
            type: 'number',
            input: 'true',
            visible: 'true',
            width: 80,
          },
          {
            key: 'T23',
            label: OperatingSystemLang.Hour23[Lang],
            type: 'number',
            input: 'true',
            visible: 'true',
            width: 80,
          },
        ]}
      />
    </MainLayout>
  );
};

export default HourlyOperation;
