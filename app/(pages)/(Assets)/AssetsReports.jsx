//api_admin_Reports_Basic__Trx LangID, UserName, GroupID 66

import { StyleSheet, View, Dimensions } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
// import { colors, roles } from "../../../constants";
import icons from '../../../constants';
import { useGlobalContext } from '../../../context/GlobalProvider';
import MainGrid from '../../../components/grid/MainGrid';
import { MainLayout } from '../../../components';
import AssetsReportsText from '../../../constants/Lang/AssetManagment/AssetsReports';
import { User } from 'lucide-react-native';
const AssetsReports = ({ title, hasLeftComponent = false, onDrawerPress }) => {
  const screenHeight = Dimensions.get('window').height;
  const { DepartmentID, Lang, user, company } = useGlobalContext();
  return (
    <View style={styles.container}>
      <MainLayout title={AssetsReportsText.title[Lang]}>
        <View style={[styles.assetsGrid, { height: screenHeight }]}>
          <MainGrid
            const
            tableHead={[
              {
                key: 'ReportID',
                label: 'كود ',
                type: 'number',
                input: 'false',
                visible: 'false',
              },
              {
                key: 'MenuCode',
                label: AssetsReportsText.ReportGrid.ReportNo[Lang],
                type: 'number',
                input: 'true',
                visible: 'true',
                width: 100,
              },
              {
                key: 'ReportTitle',
                label: AssetsReportsText.ReportGrid.ReportTitle[Lang],
                input: 'true',
                visible: 'true',
              },
            ]}
            dynamicCode={{
              tbName: 'Sc_item_unit',
              codeCol: 'UnitCode',
            }}
            reports={'AssetsReports'}
            mixedWidth={true}
            pk={'ReportID'}
            hasCrud={false}
            spTrx={'api_report_menue_mob'}
            TrxParam={[{ name: 'LangID', value: Lang }]}
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

export default AssetsReports;
