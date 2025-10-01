import { View, StyleSheet, Dimensions } from 'react-native';
import { MainLayout } from '../../../../components';
import MainGrid from '../../../../components/grid/MainGrid';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import AssetHomeLang from '../../../../constants/Lang/AssetManagment/AssetHomeLang';
const StationImportance = ({ route }) => {
  const { DepartmentID, Lang, company, user } = useGlobalContext();
  const screenHeight = Dimensions.get('window').height; // Get screen height dynamically

  return (
    <MainLayout title={AssetHomeLang.StationCriticality[Lang]}>
      <View style={styles.container} className="flex flex-col bg-white">
        <View style={{ height: screenHeight }}>
          <MainGrid
            pk={'ConsequenceLevelTypeID'}
            spTrx={'api_ms_consequence_leveltype_Trx'}
            spIns={'api_ms_consequence_leveltype_Ins'}
            spUpd={'api_ms_consequence_leveltype_Upd'}
            spDel={'api_ms_consequence_leveltype_Del'}
            TrxParam={[
              { name: 'DepartmentID', value: DepartmentID },
              { name: 'CompanyID', value: company },
              { name: 'UserName', value: user.username },
              { name: 'LangID', value: Lang },
            ]}
            DelParam={[
              { rowData: true, name: 'ConsequenceLevelTypeID', value: 'ConsequenceLevelTypeID' },
              { name: 'DepartmentID', value: DepartmentID },
              { name: 'CompanyID', value: company },
              { name: 'UserName', value: user.username },
              { name: 'LangID', value: Lang },
            ]}
            UpdBody={{
              DepartmentID: DepartmentID,
              UserName: user.username,
              LangID: Lang,
              CompanyID: company,
            }}
            InsBody={{
              DepartmentID: DepartmentID,
              UserName: user.username,
              LangID: Lang,
              CompanyID: company,
            }}
            TrxDependency={[]}
            tableHead={[
              {
                key: 'ConsequenceLevelTypeID',
                label: AssetHomeLang.ServiceLevel[Lang],
                type: 'number',
                input: 'false',
                visible: 'false',
              },
              {
                key: 'LevelOfService',
                label: AssetHomeLang.ServiceLevel[Lang],
                type: '',
                input: 'true',
                visible: 'true',
                width: 250,
                required: true,
              },
              {
                key: 'NormWt',
                label: AssetHomeLang.Weight[Lang],
                type: 'number',
                input: 'true',
                visible: 'true',
                width: 100,
                required: true,
              },
              {
                key: 'QuestionToAsk',
                label: AssetHomeLang.Question[Lang],
                type: '',
                input: 'true',
                visible: 'true',
                width: 250,
                required: true,
              },
            ]}
            StaticWidth={true}
            routeTo={{
              path: '/StationImportanceDetails',
              hasParams: true,
              params: {},
            }}
          />
        </View>
      </View>
    </MainLayout>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default StationImportance;
