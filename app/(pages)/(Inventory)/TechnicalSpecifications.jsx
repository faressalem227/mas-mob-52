import { StyleSheet, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useDropDown } from '../../../hooks/useDropDownData';
import { useGlobalContext } from '../../../context/GlobalProvider';
import { MainLayout, MainGrid } from '../../../components';
import MainDataLang from '../../../constants/Lang/Invintory/MainDataLang';

const TechnicalSpecificationsLang = {
  TechnicalSpecifications: {
    1: 'المواصفات',
    2: 'Technical Specifications',
  },

  GroupSpecID: {
    1: 'المواصفة',
    2: 'Specification',
  },

  SpecValue: {
    1: 'القيمة',
    2: 'Value',
  },
};

const TechnicalSpecifications = () => {
  const { ItemID, GroupID } = useLocalSearchParams();

  const { Lang, company, user } = useGlobalContext();

  const { data: itemSpecs } = useDropDown(
    'sc_item_group_spec_list',
    {
      CompanyID: company,
      LangID: Lang,
      UserName: user.username,
      GroupID,
    },
    'GroupSpecID',
    'GroupAttribute'
  );
  return (
    <MainLayout title={TechnicalSpecificationsLang.TechnicalSpecifications[Lang]}>
      <View className="flex-1">
        <MainGrid
          pk={'ItemSpecID'}
          spTrx={'api_sc_item_specs_trx'}
          spIns={'api_Sc_Items_Spec_Ins'}
          spUpd={'api_Sc_Items_Spec_Upd'}
          spDel={'api_Sc_Items_Spec_Del'}
          TrxParam={[
            { name: 'ItemID', value: ItemID },
            { name: 'LangID', value: Lang },
            { name: 'CompanyID', value: company },
            { name: 'UserName', value: user.username },
            { name: 'LangID', value: Lang },
          ]}
          InsBody={{ ItemID }}
          UpdBody={{ ItemID }}
          DelParam={[
            { name: 'ItemID', value: ItemID },
            { rowData: true, name: 'ItemSpecID', value: 'ItemSpecID' },
          ]}
          tableHead={[
            { key: 'ItemSpecID' },
            { key: 'ItemID' },
            {
              key: 'GroupSpecID',
              label: TechnicalSpecificationsLang.GroupSpecID[Lang],
              type: 'dropdown',
              options: itemSpecs || [],
              input: true,
              width: 100,
              required: true,
            },
            {
              key: 'GroupAttributeName',
              label: TechnicalSpecificationsLang.GroupSpecID[Lang],
              visible: true,
              width: 100,
            },
            {
              key: 'SpecValue',
              label: TechnicalSpecificationsLang.SpecValue[Lang],
              type: 'text',
              input: true,
              width: 200,
              visible: true,
              required: true,
            },
          ]}
          mixedWidth={true}
        />
      </View>
    </MainLayout>
  );
};

export default TechnicalSpecifications;
