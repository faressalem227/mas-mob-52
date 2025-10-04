import { View, Dimensions } from 'react-native';
import { MainLayout } from '../../../../components';
import MainGrid from '../../../../components/grid/MainGrid';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import AssetHomeLang from '../../../../constants/Lang/AssetManagment/AssetHomeLang';
const ManufacturersCountry = ({ route }) => {
  const { DepartmentID, Lang, company, user } = useGlobalContext();
  const screenHeight = Dimensions.get('window').height; // Get screen height dynamically

  return (
    <MainLayout title={AssetHomeLang.Manufacturers[Lang]}>
      <View style={{ height: screenHeight }} className='p-2'>
        <MainGrid 
          pk={'CountryID'}
          spTrx={'api_ms_ManufacturerCountries_list'}
          spIns={'api_ms_ManufacturerCountries_Ins'}
          spUpd={'api_ms_ManufacturerCountries_Upd'}
          spDel={'api_ms_ManufacturerCountries_Del'}
          TrxParam={[
            { name: 'CompanyID', value: company },
            { name: 'UserName', value: user.username },
            { name: 'LangID', value: Lang },
          ]}
          DelParam={[
            { rowData: true, name: 'CountryID', value: 'CountryID' },
            { name: 'CompanyID', value: company },
            { name: 'UserName', value: user },
            { name: 'LangID', value: Lang },
          ]}
          UpdBody={{
            UserName: user.username,
            LangID: Lang,
            CompanyID: company,
          }}
          InsBody={{
            UserName: user.username,
            LangID: Lang,
            CompanyID: company,
          }}
          TrxDependency={[]}
          tableHead={[
            {
              key: 'CountryID',
            },
            {
              key: 'CountryCode',
              label: AssetHomeLang.Code[Lang],
              input: 'true',
              visible: 'true',
              width: 150,
              required: true,
            },
            {
              key: 'CountryName',
              label: AssetHomeLang.ManufacturersCountry[Lang],
              input: 'true',
              visible: 'true',
              width: 150,
              required: true,
            },
          ]}
          mixedWidth
        />
      </View>
    </MainLayout>
  );
};

export default ManufacturersCountry;
