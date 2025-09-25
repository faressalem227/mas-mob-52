import { useState } from 'react';
import { View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import { useDropDown } from '../../../../hooks/useDropDownData';
import { MainLayout, MainGrid } from '../../../../components';

const AssetBasicLang = {
  BasicData: {
    1: 'البيانات الاساسيه',
    2: 'Basic Data',
  },

  label: {
    1: 'البيان',
    2: 'Statement',
  },

  Value: {
    1: 'القيمه',
    2: 'Value',
  },
};

const AssetBasic = () => {
  const [CurrentRow, SetCurrentRow] = useState(null);
  const [manufacturerID, SetManufacturerID] = useState(null);

  const { Lang, DepartmentID, user, company } = useGlobalContext();
  const { AssetID, ManufacturerID, TradeID } = useLocalSearchParams();

  const { data: ManufacturerModels_List } = useDropDown(
    'api_ms_ManufacturerModels_List',
    {
      ManufacturerID: manufacturerID || ManufacturerID,
    },
    'ModelID',
    'ModelName'
  );

  const { data: Manufacturers_List } = useDropDown(
    'api_ms_Manufacturers_List',
    {
      DepartmentID,
      CompanyID: company,
      LangID: Lang,
      UserName: user.username,
    },
    'ManufacturerID',
    'ManufacturerName'
  );

  const { data: ManufacturerCountries_list } = useDropDown(
    'api_ms_ManufacturerCountries_list',
    {
      CompanyID: company,
    },
    'CountryID',
    'CountryName'
  );

  return (
    <MainLayout title={AssetBasicLang.BasicData[Lang]}>
      <View className="flex-1">
        <MainGrid
          hasIns={false}
          hasDel={false}
          pk={'RowID'}
          spTrx={'api_am_asset_BasicData_Trx'}
          spUpd={'am_asset_BasicData_Upd'}
          TrxParam={[
            { name: 'TradeID', value: TradeID },
            { name: 'LangID', value: Lang },
            { name: 'AssetID', value: AssetID },
          ]}
          onRowPress={(row) => {
            SetCurrentRow(row);
          }}
          UpdBody={{
            AssetID,
            UserName: user.username,
          }}
          mixedWidth
          tableHead={[
            {
              key: 'label',
              label: AssetBasicLang.label[Lang],
              input: false,
              required: false,
              visible: true,
              type: 'text',
              width: 200,
            },
            {
              key: 'Value',
              label: AssetBasicLang.Value[Lang],
              input: true,
              visible: false,
              required: false,
              type: (row) => {
                if (row?.DataType === 'int') {
                  return 'number';
                } else if (row?.DataType === 'date') {
                  return 'date';
                } else if (row?.DataType === 'dropDown') {
                  return 'dropdown';
                }
              },
              options: (row) => {
                console.log(row?.RowID);
                if (row?.RowID == 1) {
                  return Manufacturers_List;
                } else if (row?.RowID == 4) {
                  return ManufacturerModels_List;
                } else if (row?.RowID == 2) {
                  return ManufacturerCountries_list;
                }
              },
              width: 200,
            },
            {
              key: 'Name',
              label: AssetBasicLang.Value[Lang],
              input: false,
              required: false,
              visible: true,
              type: 'text',
              width: 200,
            },
          ]}
        />
      </View>
    </MainLayout>
  );
};

export default AssetBasic;
