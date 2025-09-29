import { StyleSheet, View, Dimensions } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
// import { colors, roles } from "../../../constants";
import icons from '../../../constants';
import { useGlobalContext } from '../../../context/GlobalProvider';
import MainGrid from '../../../components/grid/MainGrid';
import { MainLayout } from '../../../components';
import InvintorySystemSettingLang from '../../../constants/Lang/Invintory/InvintorySystemSettingLang';
const QualificationCoding = ({ title, hasLeftComponent = false, onDrawerPress }) => {
  const screenHeight = Dimensions.get('window').height;
  const { DepartmentID, Lang, company, user } = useGlobalContext();
  return (
    <View style={styles.container}>
      <MainLayout title={InvintorySystemSettingLang.QualificationCoding[Lang]}>
        <View style={[styles.assetsGrid, { height: screenHeight }]}>
          <MainGrid
            const
            tableHead={[
              {
                key: 'DefinitionID',
                label: InvintorySystemSettingLang.Code[Lang],
                type: 'number',
                input: 'false',
                visible: 'false',
                width: 50,
              },
              {
                key: 'DefinitionCode',
                label: InvintorySystemSettingLang.Code[Lang],
                type: 'number',
                input: true,
                visible: 'true',
                width: 80,
                required: true,
              },
              {
                key: 'DefinitionNameAr',
                label: InvintorySystemSettingLang.QualificationName[Lang],
                type: 'text',
                input: 'true',
                visible: 'true',
                width: 200,
                required: true,
              },
              {
                key: 'DefinitionNameEn',
                label: InvintorySystemSettingLang.QualificationNameEn[Lang],
                type: 'text',
              },
            ]}
            mixedWidth={true}
            pk={'DefinitionID'}
            spTrx={'api_ms_MaintenanceSocial_Trx'}
            spIns={'api_ms_MaintenanceSocial_Ins'}
            spUpd={'api_ms_MaintenanceSocial_Upd'}
            spDel={'api_ms_MaintenanceSocial_Del'}
            TrxParam={[
              { name: 'DepartmentID', value: DepartmentID },
              { name: 'CompanyID', value: company },
              { name: 'UserName', value: user },
              { name: 'LangID', value: Lang },
            ]}
            DelParam={[
              { name: 'DepartmentID', value: DepartmentID },
              { rowData: true, name: 'DefinitionID', value: 'DefinitionID' },
            ]}
            UpdBody={{ DepartmentID: DepartmentID }}
            InsBody={{ DepartmentID: DepartmentID }}
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

export default QualificationCoding;
