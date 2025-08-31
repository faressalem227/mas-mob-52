import { MainGrid, MainLayout } from '../../../../components';
import { useLocalSearchParams } from 'expo-router';
import AssetHomeLang from '../../../../constants/Lang/AssetManagment/AssetHomeLang';
import { useGlobalContext } from '../../../../context/GlobalProvider';
const AssetAttributesValues = () => {
  const { AttributeID } = useLocalSearchParams();
  const { Lang } = useGlobalContext();

  console.log(AttributeID);

  return (
    <MainLayout title={AssetHomeLang.AttributeValues[Lang]}>
      <MainGrid
        pk={'ValueID'}
        spTrx={'api_ms_asset_attributes_values_Trx'}
        spIns={'api_ms_asset_attributes_values_Ins'}
        spUpd={'api_ms_asset_attributes_values_Upd'}
        spDel={'api_ms_asset_attributes_values_Del'}
        TrxParam={[{ name: 'AttributeID', value: AttributeID }]}
        DelParam={[
          {
            rowData: true,
            name: 'ValueID',
            value: 'ValueID',
          },
        ]}
        InsBody={{
          AttributeID,
        }}
        UpdBody={{}}
        StaticWidth
        tableHead={[
          {
            key: 'ValueID',
          },
          {
            key: 'ValueCode',
            label: AssetHomeLang.valueCode[Lang],
            type: 'number',
            input: true,
            visible: true,
            width: 150,
          },
          {
            key: 'ValueName',
            label: AssetHomeLang.valueName[Lang],
            input: true,
            visible: true,
            width: 150,
          },
        ]}
      />
    </MainLayout>
  );
};

export default AssetAttributesValues;
