import { StyleSheet, View, Dimensions } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
// import { colors, roles } from "../../../constants";
import icons from '../../../constants';
import { useGlobalContext } from '../../../context/GlobalProvider';
import MainGrid from '../../../components/grid/MainGrid';
import { MainLayout } from '../../../components';
import InvintorySystemSettingLang from '../../../constants/Lang/Invintory/InvintorySystemSettingLang';
const JobStatusCoding = ({ title, hasLeftComponent = false, onDrawerPress }) => {
  const screenHeight = Dimensions.get('window').height;
  const { DepartmentID, Lang, company, user } = useGlobalContext();
  return (
    <View style={styles.container}>
      <MainLayout title={InvintorySystemSettingLang.FunctionalStatusCoding[Lang]}>
        <View style={[styles.assetsGrid, { height: screenHeight }]}>
          <MainGrid
            pk={'DefinitionID'}
            spTrx={'api_ms_MaintenanceWorkStatus_Trx'}
            spIns={'api_ms_MaintenanceWorkStatus_Ins'}
            spUpd={'api_ms_MaintenanceWorkStatus_Upd'}
            spDel={'api_ms_MaintenanceWorkStatus_Del'}
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
            tableHead={[
              {
                key: 'DefinitionID',
                label: InvintorySystemSettingLang.Code[Lang],
                type: 'number',
                input: 'false',
                visible: 'false',
              },
              {
                key: 'DefinitionCode',
                label: InvintorySystemSettingLang.Code[Lang],
                type: 'number',
                input: 'true',

                visible: 'true',
                width: 90,
                required: true,
              },
              {
                key: 'DefinitionNameAr',
                label: InvintorySystemSettingLang.FunctionalStatusCoding[Lang],
                type: 'text',
                input: 'true',
                visible: 'true',
                width: 200,
                required: true,
              },
              {
                key: 'DefinitionNameEn',
                label: InvintorySystemSettingLang.FunctionalStatusEn[Lang],
                type: 'text',
                width: 200,
              },
            ]}
            mixedWidth={true}
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

export default JobStatusCoding;
