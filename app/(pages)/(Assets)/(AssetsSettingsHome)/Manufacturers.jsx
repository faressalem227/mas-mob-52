import { View, Dimensions } from 'react-native';
import { MainLayout } from '../../../../components';
import MainGrid from '../../../../components/grid/MainGrid';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import AssetHomeLang from '../../../../constants/Lang/AssetManagment/AssetHomeLang';
const Manufacturers = ({ route }) => {
  const { DepartmentID, Lang, company, user } = useGlobalContext();
  const screenHeight = Dimensions.get('window').height; // Get screen height dynamically

  return (
    <MainLayout title={AssetHomeLang.Manufacturers[Lang]}>
      <View style={{ height: screenHeight }}>
        <MainGrid
          pk={'ManufacturerID'}
          spTrx={'api_ms_Manufacturers_Trx'}
          spIns={'api_ms_Manufacturers_Ins'}
          spUpd={'api_ms_Manufacturers_Upd'}
          spDel={'api_ms_Manufacturers_Del'}
          TrxParam={[
            { name: 'DepartmentID', value: DepartmentID },
            { name: 'CompanyID', value: company },
            { name: 'UserName', value: user.username },
            { name: 'LangID', value: Lang },
          ]}
          DelParam={[
            { rowData: true, name: 'ManufacturerID', value: 'ManufacturerID' },
            { name: 'DepartmentID', value: DepartmentID },
            { name: 'CompanyID', value: company },
            { name: 'UserName', value: user },
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
              key: 'ManufacturerID',
            },
            {
              key: 'ManufacturerCode',
              label: AssetHomeLang.Code[Lang],
              input: 'true',
              visible: 'true',
              width: 150,
            },
            {
              key: 'ManufacturerName',
              label: AssetHomeLang.Manufacturer[Lang],
              input: 'true',
              visible: 'true',
              width: 150,
            },
          ]}
          mixedWidth
        />
      </View>
    </MainLayout>
  );
};

export default Manufacturers;
