//api_admin_Reports_Basic__Trx LangID, UserName, GroupID 66

import { StyleSheet, View, Dimensions } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
// import { colors, roles } from "../../../constants";
import icons from '../../../constants';
import { useGlobalContext } from '../../../context/GlobalProvider';
import MainGrid from '../../../components/grid/MainGrid';
import { MainLayout } from '../../../components';
import { User } from 'lucide-react-native';
import MaintenanceReportsText from '../../../constants/Lang/Maintenance/MaintenanceReports';
const MaintenanceReports = ({ title, hasLeftComponent = false, onDrawerPress }) => {
  const screenHeight = Dimensions.get('window').height;
  const { DepartmentID, Lang, user, company } = useGlobalContext();
  return (
    <View style={styles.container}>
      <MainLayout title={MaintenanceReportsText.title[Lang]}>
        <View style={[styles.assetsGrid, { height: screenHeight }]}>
          <MainGrid
            const
            tableHead={[
              {
                key: 'ReportID',
                label: MaintenanceReportsText.ReportGrid.ReportNo[Lang],
                type: 'number',
                input: 'false',
                visible: 'false',
              },
              {
                key: 'ReportNo',
                label: MaintenanceReportsText.ReportGrid.ReportNo[Lang],
                type: 'number',
                input: 'true',
                visible: 'true',
                width: 100,
              },
              {
                key: 'ReportTitle',
                label: MaintenanceReportsText.ReportGrid.ReportTitle[Lang],
                input: 'true',
                visible: 'true',
              },
            ]}
            dynamicCode={{
              tbName: 'Sc_item_unit',
              codeCol: 'UnitCode',
            }}
            reports={'MaintenanceReports'}
            mixedWidth={true}
            pk={'ReportID'}
            hasCrud={false}
            spTrx={'api_admin_Reports_Basic__Trx'}
            TrxParam={[
              { name: 'CompanyID', value: company },
              { name: 'GroupID', value: 67 },
              { name: 'LangID', value: Lang },
              { name: 'UserName', value: user.username },
            ]}
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

export default MaintenanceReports;
