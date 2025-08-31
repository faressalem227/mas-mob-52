import { View, Dimensions } from 'react-native';
import { MainLayout, MainGrid, InfoDetailes } from '../../../../components';
import AssetHomeLang from '../../../../constants/Lang/AssetManagment/AssetHomeLang';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import { useLocalSearchParams } from 'expo-router';
const AdditionDataDetails = () => {
  const { Lang, company } = useGlobalContext();
  const screenHeight = Dimensions.get('window').height;
  const { AdditionID, AdditionNo, AdditionName, DataTypeName } = useLocalSearchParams();
  const detailsData = [
    { label: AssetHomeLang.AdditionCode[Lang], value: AdditionNo },
    { label: AssetHomeLang.AdditionName[Lang], value: AdditionName },
    { label: AssetHomeLang.AdditionDataTypeID[Lang], value: DataTypeName },
  ];

  console.log('AdditionID', AdditionID);

  return (
    <MainLayout title={AssetHomeLang.AdditionDataDetails[Lang]}>
      <View style={{ height: screenHeight }}>
        <InfoDetailes details={detailsData} />
        <MainGrid
          pk={'SelectID'}
          spTrx={'api_sys_addition_select__Trx_web'}
          spIns={'api_sys_addition_select__Ins_web'}
          spUpd={'api_sys_addition_select__Upd_web'}
          spDel={'api_sys_addition_select__Del_web'}
          TrxParam={[
            { name: 'CompanyID', value: company },
            { name: 'AdditionID', value: AdditionID },
          ]}
          DelParam={[{ rowData: true, name: 'SelectID', value: 'SelectID' }]}
          InsBody={{
            CompanyID: company,
            AdditionID,
          }}
          UpdBody={{
            CompanyID: company,
            AdditionID,
          }}
          TrxDependency={[]}
          tableHead={[
            {
              key: 'SelectID',
            },
            {
              key: 'SelectNo',
              label: AssetHomeLang.SelectionCode[Lang],
              visible: true,
              width: 150,
            },
            {
              key: 'SelectName',
              label: AssetHomeLang.AdditionSelectName[Lang],
              input: true,
              visible: true,
              width: 150,
            },
          ]}
          mixedWidth={true}
        />
      </View>
    </MainLayout>
  );
};

export default AdditionDataDetails;
