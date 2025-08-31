import { StyleSheet, View, Dimensions } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
// import { colors, roles } from "../../../constants";
import icons from '../../../constants';
import { useGlobalContext } from '../../../context/GlobalProvider';
import MainGrid from '../../../components/grid/MainGrid';
import { MainLayout } from '../../../components';
import InvintorySystemSettingLang from '../../../constants/Lang/Invintory/InvintorySystemSettingLang';
const UnitDefinition = ({ title, hasLeftComponent = false, onDrawerPress }) => {
  const screenHeight = Dimensions.get('window').height;
  const { DepartmentID, Lang, company, user } = useGlobalContext();
  return (
    <View style={styles.container}>
      <MainLayout title={InvintorySystemSettingLang.DefinationOfUnits[Lang]}>
        <View style={[styles.assetsGrid, { height: screenHeight }]}>
          <MainGrid
            const
            tableHead={[
              {
                key: 'UnitID',
                label: InvintorySystemSettingLang.Code[Lang],
                type: 'number',
                input: 'false',
                visible: 'false',
                width: 80,
              },
              {
                key: 'UnitCode',
                label: InvintorySystemSettingLang.Code[Lang],
                type: 'number',
                input: 'true',
                visible: 'true',
                width: 90,
              },
              {
                key: 'UnitName',
                label: InvintorySystemSettingLang.Name[Lang],
                input: 'true',
                visible: 'true',
              },
              {
                key: 'UnitNameEn',
                label: InvintorySystemSettingLang.NameEn[Lang],
                input: 'true',
                visible: 'true',
              },
            ]}
            dynamicCode={{
              tbName: 'Sc_Item_Unit',
              codeCol: 'UnitCode',
            }}
            mixedWidth={true}
            StaticWidth
            pk={'UnitID'}
            spTrx={'api_Sc_Item_Unit_Trx'}
            spIns={'api_Sc_Item_Unit_Ins'}
            spUpd={'api_Sc_Item_Unit_Upd'}
            spDel={'api_Sc_Item_Unit_Del'}
            TrxParam={[
              { name: 'CompanyID', value: company },
              { name: 'LangID', value: Lang },
              { name: 'UserName', value: user },
            ]}
            DelParam={[
              { name: 'CompanyID', value: company },
              { rowData: true, name: 'UnitID', value: 'UnitID' },
            ]}
            UpdBody={{ CompanyID: company }}
            InsBody={{ CompanyID: company }}
            TrxDependency={[]}
          />
        </View>
      </MainLayout>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dropdownContainer: {
    marginHorizontal: 16,
    marginVertical: 24,
  },
  assetsGrid: {
    marginVertical: 8,
  },
});

export default UnitDefinition;
