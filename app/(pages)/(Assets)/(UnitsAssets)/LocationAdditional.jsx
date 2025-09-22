import { View, Text } from 'react-native';
import { MainLayout, MainGrid } from '../../../../components';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import { useDropDown } from '../../../../hooks/useDropDownData';

const LocationAdditionalLang = {
  AdditionalLocationData: {
    1: 'تعريف البيانات الاضافيه  للموقع',
    2: 'Location Additional Data Definitions',
  },
  AdditionID: {
    1: 'AdditionID',
    2: 'AdditionID',
  },
  AdditionNo: {
    1: 'الكود',
    2: 'Code',
  },
  AdditionName: {
    1: 'البيان الإضافي',
    2: 'Additional Statement',
  },
  DataTypeID: {
    1: 'نوع البيان',
    2: 'Statement Type',
  },
};

const LocationAdditional = () => {
  const { Lang, company, DepartmentID } = useGlobalContext();

  const { data: sds_DataType } = useDropDown(
    'api_sys_datatypes_list_web',
    {},
    'DataTypeID',
    'DataTypeName'
  );

  return (
    <MainLayout title={LocationAdditionalLang.AdditionalLocationData[Lang]}>
      <View className="flex-1">
        <MainGrid
          pk={'AdditionID'}
          spTrx={'api_sys_addition_Location_trx'}
          spIns={'api_sys_addition__Ins_Location'}
          spUpd={'sys_addition__Upd_Location'}
          spDel={'sys_addition__Del_web'}
          TrxParam={[
            { name: 'CompanyID', value: company },
            { name: 'LangID', value: Lang },
            { name: 'TableID', value: 6 },
          ]}
          InsBody={{
            CompanyID: company,
            TableID: 6,
          }}
          DelParam={[{ rowData: true, name: 'AdditionID', value: 'AdditionID' }]}
          UpdBody={{ TableID: 6 }}
          mixedWidth
          tableHead={[
            {
              key: 'AdditionID',
              type: 'number',
              required: false,
              input: false,
              visible: false,
              label: LocationAdditionalLang.AdditionID[Lang],
            },
            {
              key: 'AdditionNo',
              type: 'number',
              required: true,
              input: true,
              visible: true,
              width: 100,
              label: LocationAdditionalLang.AdditionNo[Lang],
            },
            {
              key: 'AdditionName',
              type: 'text',
              required: false,
              input: true,
              visible: true,
              width: 250,
              label: LocationAdditionalLang.AdditionName[Lang],
            },
            {
              key: 'DataTypeID',
              type: 'dropdown',
              required: false,
              input: true,
              hidden: false,
              width: 150,
              options: sds_DataType,
              label: LocationAdditionalLang.DataTypeID[Lang],
            },
          ]}
          routeTo={{
            path: 'LocationAdditionalValue',
            hasParams: true,
          }}
        />
      </View>
    </MainLayout>
  );
};

export default LocationAdditional;
