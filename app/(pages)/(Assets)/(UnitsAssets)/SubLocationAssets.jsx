import { MainLayout, MainGrid } from '../../../../components';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import { useLocalSearchParams } from 'expo-router';
import AssetHomeLang from '../../../../constants/Lang/AssetManagment/AssetHomeLang';
const SubLocationAssets = () => {
  const { DepartmentID, Lang, company, user } = useGlobalContext();

  const { SubLocationID } = useLocalSearchParams();

  const SubLocationAssets = {
    1: 'الأصول بالموقع الفرعي',
    2: 'SubLocation Assets',
  };

  return (
    <MainLayout title={SubLocationAssets[Lang]}>
      <MainGrid
        pk={'AssetID'}
        spTrx={'api_ms_SubLocation_Sheet_Assets'}
        TrxParam={[
          { name: 'DepartmentID', value: DepartmentID },
          { name: 'SubLocationID', value: SubLocationID },
          { name: 'CompanyID', value: company },
          { name: 'UserName', value: user.username },
          { name: 'LangID', value: Lang },
        ]}
        hasCrud={false}
        mixedWidth
        tableHead={[
          {
            key: 'AssetID',
            label: AssetHomeLang.Asset[Lang],
            type: 'number',
            input: 'true',
            visible: 'false',
            width: 90,
          },
          {
            key: 'AssetCode',
            label: AssetHomeLang.AssetCode[Lang],
            type: 'number',
            input: 'true',
            visible: 'true',
            width: 90,
          },
          {
            key: 'AssetName',
            label: AssetHomeLang.AssetName[Lang],
            type: 'text',
            input: 'true',
            visible: 'true',
            width: 200,
          },
          {
            key: 'AssetClassName',
            label: AssetHomeLang.Classification[Lang],
            type: 'text',
            input: 'true',
            visible: 'true',
            width: 150,
          },
          {
            key: 'AssetStatusName',
            label: AssetHomeLang.AssetStatusName[Lang],
            type: 'text',
            input: 'true',
            visible: 'true',
            width: 100,
          },
          {
            key: 'EmployeeName',
            label: AssetHomeLang.EmployeeName[Lang],
            type: 'text',
            input: 'true',
            visible: 'true',
            width: 150,
          },
          {
            key: 'JobName',
            label: AssetHomeLang.JobName[Lang],
            type: 'text',
            input: 'true',
            visible: 'true',
            width: 150,
          },
          {
            key: 'ModelName',
            label: AssetHomeLang.ModelName[Lang],
            type: 'text',
            input: 'true',
            visible: 'true',
            width: 90,
          },
          {
            key: 'OperationDate',
            label: AssetHomeLang.OperationDate[Lang],
            type: 'date',
            input: 'true',
            visible: 'true',
            width: 150,
          },
          {
            key: 'OriginalCost',
            label: AssetHomeLang.OriginalCost[Lang],
            type: 'number',
            input: 'true',
            visible: 'true',
            width: 150,
          },
        ]}
      />
    </MainLayout>
  );
};

export default SubLocationAssets;
