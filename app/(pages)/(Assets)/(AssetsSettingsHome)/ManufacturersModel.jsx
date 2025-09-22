import { View, Dimensions } from 'react-native';
import { MainLayout, MainGrid, InfoDetailes } from '../../../../components';
import AssetHomeLang from '../../../../constants/Lang/AssetManagment/AssetHomeLang';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import { useLocalSearchParams } from 'expo-router';
// import { lang } from '../../../../constants/Lang/components/CustomMenu';
const ManufacturersModel = () => {
  const { Lang, company, DepartmentID } = useGlobalContext();
  const screenHeight = Dimensions.get('window').height;
  const { ManufacturerID } = useLocalSearchParams();
  //   const detailsData = [
  //     { label: AssetHomeLang.AdditionCode[Lang], value: AdditionNo },
  //     { label: AssetHomeLang.AdditionName[Lang], value: AdditionName },
  //     { label: AssetHomeLang.AdditionDataTypeID[Lang], value: DataTypeName },
  //   ];

  //   console.log('AdditionID', AdditionID);

  return (
    <MainLayout title={AssetHomeLang.ManufacturersModels[Lang]}>
      <View style={{ height: screenHeight }}>
        <MainGrid
          pk={'ModelID'}
          spTrx={'api_ms_ManufacturersModels_Trx'}
          spIns={'api_ms_ManufacturersModels_Ins'}
          spUpd={'api_ms_ManufacturersModels_Trx'}
          spDel={'api_ms_ManufacturersModels_Del'}
          TrxParam={[
            { name: 'CompanyID', value: company },
            { name: 'ManufacturerID', value: ManufacturerID },
          ]}
          DelParam={[{ rowData: true, name: 'ModelID', value: "ModelID" }]}
          InsBody={{
            CompanyID: company,
            ManufacturerID,
            DepartmentID: DepartmentID,
          }}
          UpdBody={{
            CompanyID: company,
            ManufacturerID,
          }}
          TrxDependency={[]}
          tableHead={[
            {
              key: 'ModelID',
            },
            {
              key: 'ModelCode',
              label: AssetHomeLang.Code[Lang],
              visible: true,
              input: true,
              width: 150,
            },
            {
              key: 'ModelName',
              label: AssetHomeLang.ModelName[Lang],
              input: true,
              visible: true,
              width: 300,
            },
          ]}
          mixedWidth={true}
        />
      </View>
    </MainLayout>
  );
};

export default ManufacturersModel;
