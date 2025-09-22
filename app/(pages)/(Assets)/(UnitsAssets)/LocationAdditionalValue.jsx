import { View, Text } from 'react-native';
import { MainLayout, MainGrid } from '../../../../components';

import { useGlobalContext } from '../../../../context/GlobalProvider';
import { useLocalSearchParams } from 'expo-router';

const LocationAdditionalValueLang = {
  LocationAdditionalValue: {
    1: 'الاختيار',
    2: 'Choice',
  },
  SelectID: {
    1: 'المعرف',
    2: 'ID',
  },
  SelectNo: {
    1: 'الكود',
    2: 'Code',
  },
  SelectName: {
    1: 'الاختيار',
    2: 'Selection',
  },
};

const LocationAdditionalValue = () => {
  const { Lang, company } = useGlobalContext();
  const { AdditionID } = useLocalSearchParams();
  return (
    <MainLayout title={LocationAdditionalValueLang.LocationAdditionalValue[Lang]}>
      <MainGrid
        pk={'SelectID'}
        spTrx={'api_sys_addition_select__Trx_web'}
        spIns={'api_sys_addition_select__Ins_web'}
        spUpd={'api_sys_addition_select__Upd_web'}
        spDel={'api_sys_addition_select__Del_web'}
        TrxParam={[
          { name: 'AdditionID', value: AdditionID },
          { name: 'CompanyID', value: company },
        ]}
        InsBody={{
          AdditionID,
          CompanyID: company,
        }}
        UpdBody={{
          AdditionID,
          CompanyID: company,
        }}
        DelParam={[{ rowData: true, name: 'SelectID', value: 'SelectID' }]}
        tableHead={[
          {
            key: 'SelectID',
            type: 'number',
            required: false,
            input: false,
            visible: false,
            label: LocationAdditionalValueLang.SelectID[Lang],
          },
          {
            key: 'SelectNo',
            type: 'number',
            required: true,
            input: false,
            visible: true,
            width: 150,
            label: LocationAdditionalValueLang.SelectNo[Lang],
          },
          {
            key: 'SelectName',
            type: 'text',
            required: false,
            input: true,
            visible: true,
            width: 150,
            label: LocationAdditionalValueLang.SelectName[Lang],
          },
        ]}
      />
    </MainLayout>
  );
};

export default LocationAdditionalValue;
