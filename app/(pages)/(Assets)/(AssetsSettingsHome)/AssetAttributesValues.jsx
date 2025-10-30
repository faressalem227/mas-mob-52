import { MainGrid, MainLayout } from '../../../../components';
import { useLocalSearchParams } from 'expo-router';
import AssetHomeLang from '../../../../constants/Lang/AssetManagment/AssetHomeLang';
import { useGlobalContext } from '../../../../context/GlobalProvider';
const AssetAttributesValues = () => {
  const { AssetClassID } = useLocalSearchParams();
  const { Lang } = useGlobalContext();

  console.log('AssetClassID', AssetClassID);

  return (
    <MainLayout title={AssetHomeLang.TechnicalSpecifications[Lang]}>
      <MainGrid
        pk={'AttributeID'}
        spTrx={'api_ms_AssetAttributesList_Trx'}
        spIns={'api_ms_AssetAttributesList_Ins'}
        spUpd={'api_ms_AssetAttributesList_Upd'}
        spDel={'api_ms_AssetAttributesList_Del'}
        TrxParam={[{ name: 'AssetClassID', value: AssetClassID }]}
        DelParam={[
          {
            rowData: true,
            name: 'AttributeID',
            value: 'AttributeID',
          },
        ]}
        InsBody={{
          AssetClassID,
        }}
        UpdBody={{}}
        StaticWidth
        tableHead={[
          {
            key: 'AttributeID',
          },
          {
            key: 'AttributeCode',
            label: AssetHomeLang.Code[Lang],
            type: 'number',
            input: true,
            visible: true,
            width: 100,
            required: true,
          },
          {
            key: 'AttributeName',
            label: AssetHomeLang.AttributeName[Lang],
            input: true,
            visible: true,
            width: 150,
            required: true,
          },
          {
            key: 'Unit',
            label: AssetHomeLang.Unit[Lang],
            input: true,
            visible: true,
            width: 100,
          },
        ]}
      />
    </MainLayout>
  );
};

export default AssetAttributesValues;
