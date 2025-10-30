import { View } from 'react-native';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import MainLayout from '../../../../components/layout/MainLayout';
import { useDropDown } from '../../../../hooks/useDropDownData';
import MainGrid from '../../../../components/grid/MainGrid';
import BusinessClassificationLang from '../../../../constants/Lang/Maintenance/MaintenanceSystem/BusinessClassification';

const DefTrade = () => {
  const { DepartmentID, Lang, company, user } = useGlobalContext();

  //   const { data: TradeList } = useDropDown(
  //     'api_Def_ms_Trade_List_Def',
  //     { DepartmentID: DepartmentID, CompanyID: company, LangID: Lang },
  //     'TradeID',
  //     'TradeName'
  //   );

  return (
    <MainLayout title={BusinessClassificationLang.pageTitle[Lang]}>
      <View className="mt-3 flex-1">
        <MainGrid
          tableHead={[
            {
              key: 'TradeID',
            },

            {
              key: 'TradeCode',
              label: `${BusinessClassificationLang.TradeCode[Lang]}`,
              type: 'number',
              input: 'true',
              visible: 'true',
              width: 80,
              required: true,
            },
            {
              key: 'TradeNameAr',
              label: `${BusinessClassificationLang.TradeNameAr[Lang]}`,
              type: 'text',
              input: 'true',
              visible: 'true',
              width: 300,
              required: true,
            },
            {
              key: 'TradeName',
              label: `${BusinessClassificationLang.TradeNameEn[Lang]}`,
              type: 'text',
              input: 'true',
              visible: 'true',
              width: 300,
              required: true,
            },

            {
              key: 'Contracting',
              label: `${BusinessClassificationLang.Contracting[Lang]}`,
              type: 'checkbox',
              input: 'true',
              visible: 'true',
              required: false,
              width: 150,
            },
            {
              key: 'IsNetwork',
              label: `${BusinessClassificationLang.IsNetwork[Lang]}`,
              type: 'checkbox',
              input: 'true',
              visible: 'true',
              required: false,
              width: 150,
            },
            {
              key: 'IsVehicle',
              label: `${BusinessClassificationLang.IsVehicle[Lang]}`,
              type: 'checkbox',
              input: 'true',
              visible: 'true',
              required: false,
              width: 150,
            },
            {
              key: 'IsWorkShop',
              label: `${BusinessClassificationLang.IsWorkShop[Lang]}`,
              type: 'checkbox',
              input: 'true',
              visible: 'true',
              required: false,
              width: 150,
            },
          ]}
          mixedWidth={true}
          StaticWidth
          pk={'TradeID'}
          spTrx={'api_ms_Trade_Trx'}
          spIns={'api_ms_Trade_Ins'}
          spUpd={'api_ms_Trade_Upd'}
          spDel={'api_ms_Trade_Del'}
          dynamicCode={{
            tbName: 'ms_Trade',
            codeCol: 'TradeCode',
          }}
          TrxParam={[
            { name: 'DepartmentID', value: DepartmentID },
            { name: 'LangID', value: Lang },
          ]}
          DelParam={[
            { rowData: true, name: 'TradeID', value: 'TradeID' },
            { name: 'DepartmentID', value: DepartmentID },
            { name: 'CompanyID', value: company },
            { name: 'UserName', value: user.username },
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
        />
      </View>
    </MainLayout>
  );
};

export default DefTrade;
