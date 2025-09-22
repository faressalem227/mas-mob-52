import { useLocalSearchParams } from 'expo-router';
import { MainLayout, MainGrid } from '../../../../components';
import { useGlobalContext } from '../../../../context/GlobalProvider';

const SubLocationAdditionsLang = {
  AdditionalData: {
    1: 'البيانات الاضافية',
    2: 'Additional Data',
  },
  AdditionID: {
    1: 'AdditionID',
    2: 'AdditionID',
  },
  TableID: {
    1: 'TableID',
    2: 'TableID',
  },
  DataTypeID: {
    1: 'DataTypeID',
    2: 'DataTypeID',
  },
  AdditionNo: {
    1: 'المسلسل',
    2: 'No',
  },
  AdditionName: {
    1: 'البيان',
    2: 'Statement',
  },
  AdditionValue1: {
    1: 'AdditionValue1',
    2: 'AdditionValue1',
  },
  AdditionValue2: {
    1: 'AdditionValue2',
    2: 'AdditionValue2',
  },
  AdditionValue3: {
    1: 'AdditionValue3',
    2: 'AdditionValue3',
  },
  AdditionValue4: {
    1: 'AdditionValue4',
    2: 'AdditionValue4',
  },
  AdditionValue5: {
    1: 'AdditionValue5',
    2: 'AdditionValue5',
  },
  AdditionValue6: {
    1: 'AdditionValue6',
    2: 'AdditionValue6',
  },
  AdditionValue7: {
    1: 'AdditionValue7',
    2: 'AdditionValue7',
  },
};

const SubLocationAdditions = () => {
  const { Lang, user } = useGlobalContext();

  const { SubLocationID } = useLocalSearchParams();

  //   console.log(SubLocationID);

  return (
    <MainLayout title={SubLocationAdditionsLang.AdditionalData[Lang]}>
      <MainGrid
        pk={'AdditionID'}
        spTrx={'api_sys_addition_data__Trx'}
        spUpd={'api_sys_addition_data__Upd'}
        TrxParam={[
          { name: 'LangID', value: Lang },
          { name: 'UserName', value: user.username },
          { name: 'TableID', value: 6 },
          { name: 'TableDataID', value: SubLocationID },
        ]}
        UpdBody={{
          TableID: 6,
          TableDataID: SubLocationID,
          UserName: user.username,
        }}
        hasIns={false}
        hasDel={false}
        tableHead={[
          {
            key: 'AdditionID',
            input: false,
            required: false,
            visible: false,
            type: 'number',
            label: SubLocationAdditionsLang.AdditionID[Lang],
          },
          {
            key: 'TableID',
            input: false,
            required: false,
            visible: false,
            type: 'number',
            label: SubLocationAdditionsLang.TableID[Lang],
          },
          {
            key: 'DataTypeID',
            input: false,
            required: false,
            visible: false,
            type: 'number',
            label: SubLocationAdditionsLang.DataTypeID[Lang],
          },
          {
            key: 'AdditionNo',
            input: false,
            required: false,
            visible: true,
            type: 'number',
            width: 150,
            label: SubLocationAdditionsLang.AdditionNo[Lang],
          },
          {
            key: 'AdditionName',
            input: false,
            required: false,
            visible: true,
            type: 'number',
            width: 150,
            label: SubLocationAdditionsLang.AdditionName[Lang],
          },
          {
            key: 'AdditionValue1',
            input: false,
            required: false,
            visible: false,
            type: 'number',
            label: SubLocationAdditionsLang.AdditionValue1[Lang],
          },
          {
            key: 'AdditionValue2',
            input: false,
            required: false,
            visible: false,
            type: 'number',
            label: SubLocationAdditionsLang.AdditionValue2[Lang],
          },
          {
            key: 'AdditionValue3',
            input: false,
            required: false,
            visible: false,
            type: 'number',
            label: SubLocationAdditionsLang.AdditionValue3[Lang],
          },
          {
            key: 'AdditionValue4',
            input: false,
            required: false,
            visible: false,
            type: 'number',
            label: SubLocationAdditionsLang.AdditionValue4[Lang],
          },
          {
            key: 'AdditionValue5',
            input: false,
            required: false,
            visible: false,
            type: 'number',
            label: SubLocationAdditionsLang.AdditionValue5[Lang],
          },
          {
            key: 'AdditionValue6',
            input: false,
            required: false,
            visible: false,
            type: 'number',
            label: SubLocationAdditionsLang.AdditionValue6[Lang],
          },
          {
            key: 'AdditionValue7',
            input: false,
            required: false,
            visible: false,
            type: 'number',
            label: SubLocationAdditionsLang.AdditionValue7[Lang],
          },
        ]}
      />
    </MainLayout>
  );
};

export default SubLocationAdditions;
