import { MainLayout, MainGrid } from '../../../../components';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import HealthAndSafetyLang from '../../../../constants/Lang/Maintenance/HealthAndSafety';

const Statistics = () => {
  const { user, DepartmentID, Lang, company } = useGlobalContext();

  return (
    <MainLayout title={HealthAndSafetyLang.statistics[Lang]}>
      <MainGrid
        pk={'id'}
        spTrx={'api_ms_rpt_dashboard_status1'}
        TrxParam={[
          { name: 'DepartmentID', value: DepartmentID },
          { name: 'CompanyID', value: company },
          { name: 'LangID', value: Lang },
          { name: 'UserName', value: user.username },
        ]}
        hasCrud={false}
        TrxDependency={[DepartmentID]}
        StaticWidth
        tableHead={[
          {
            key: 'id',
            label: HealthAndSafetyLang.SafetyCode[Lang],
            type: 'number',
            input: 'true',
            visible: 'false',
            width: 100,
          },
          {
            key: 'title',
            label: HealthAndSafetyLang.title[Lang],
            input: 'true',
            lines: 2,
            type: 'text',
            visible: 'true',
            width: 200,
          },
          {
            key: 'pm',
            label: HealthAndSafetyLang.pm[Lang],
            type: 'number',
            input: 'true',
            visible: 'true',
            width: 100,
          },
          {
            key: 'cm',
            label: HealthAndSafetyLang.cm[Lang],
            type: 'number',
            input: 'true',
            visible: 'true',
            width: 100,
          },
          {
            key: 'total',
            label: HealthAndSafetyLang.total[Lang],
            type: 'number',
            input: 'true',
            visible: 'true',
            width: 100,
          },
        ]}
      />
    </MainLayout>
  );
};

export default Statistics;
