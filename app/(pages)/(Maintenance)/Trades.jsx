import { View } from 'react-native';
import { useGlobalContext } from '../../../context/GlobalProvider';
import MainLayout from '../../../components/layout/MainLayout';
import { useDropDown } from '../../../hooks/useDropDownData';
import MainGrid from '../../../components/grid/MainGrid';
import BusinessClassificationLang from '../../../constants/Lang/Maintenance/MaintenanceSystem/BusinessClassification';

const Trades = () => {
  const { DepartmentID, Lang, company, user } = useGlobalContext();

  const { data: TradeList } = useDropDown(
    'api_Def_ms_Trade_List_Def',
    { DepartmentID: DepartmentID, CompanyID: company, LangID: Lang },
    'TradeID',
    'TradeName'
  );

  return (
    <MainLayout title={BusinessClassificationLang.pageTitle[Lang]}>
      <View className="mt-3 flex-1">
        <MainGrid
          tableHead={[
            {
              key: 'TradeID',
              label: `${BusinessClassificationLang.TradeChoose[Lang]}`,
              type: 'dropdown',
              input: 'true',
              options: TradeList,
              visible: 'false',
              width: 80,
            },
            {
              key: 'DepartmentTradeID',
              label: `${BusinessClassificationLang.TradeCode[Lang]}`,
              type: 'number',
              input: 'false',
              visible: 'false',
              width: 80,
            },
            {
              key: 'TradeCode',
              label: `${BusinessClassificationLang.TradeCode[Lang]}`,
              type: 'number',
              input: 'false',
              visible: 'false',
              width: 80,
            },
            {
              key: 'TradeName',
              label: `${BusinessClassificationLang.TradeName[Lang]}`,
              type: '',
              input: 'false',
              visible: 'true',
              width: 200,
            },
            // {
            //   key: 'Contracting',
            //   label: `${BusinessClassificationLang.Contracting[Lang]}`,
            //   type: 'checkbox',
            //   input: 'true',
            //   visible: 'true',
            //   required: 'false',
            //   width: 80,
            // },
            // {
            //   key: 'IsNetwork',
            //   label: `${BusinessClassificationLang.IsNetwork[Lang]}`,
            //   type: 'checkbox',
            //   input: 'true',
            //   visible: 'true',
            //   required: 'false',
            //   width: 80,
            // },
            // {
            //   key: 'IsVehicle',
            //   label: `${BusinessClassificationLang.IsVehicle[Lang]}`,
            //   type: 'checkbox',
            //   input: 'true',
            //   visible: 'true',
            //   required: 'false',
            //   width: 80,
            // },
            // {
            //   key: 'IsWorkShop',
            //   label: `${BusinessClassificationLang.IsWorkShop[Lang]}`,
            //   type: 'checkbox',
            //   input: 'true',
            //   visible: 'true',
            //   required: 'false',
            //   width: 80,
            // },
          ]}
          mixedWidth={true}
          StaticWidth
          pk={'DepartmentTradeID'}
          spTrx={'api_ms_Departments_Trade_trx'}
          spIns={'api_ms_Departments_Trade_Ins'}
          spUpd={'api_ms_Departments_Trade_Upd'}
          spDel={'api_ms_Departments_Trade_Del'}
          // dynamicCode={{
          //   tbName: 'ms_Departments_Trade',
          //   codeCol: 'TradeCode',
          // }}
          TrxParam={[
            { name: 'DepartmentID', value: DepartmentID },
            { name: 'LangID', value: Lang },
          ]}
          DelParam={[
            { rowData: true, name: 'DepartmentTradeID', value: 'DepartmentTradeID' },
            { name: 'DepartmentID', value: DepartmentID },
            { name: 'CompanyID', value: company },
            { name: 'UserName', value: user },
            { name: 'LangID', value: Lang },
          ]}
          UpdBody={{
            DepartmentID: DepartmentID,
            UserName: user,
            LangID: Lang,
            CompanyID: company,
          }}
          InsBody={{
            DepartmentID: DepartmentID,
            UserName: user,
            LangID: Lang,
            CompanyID: company,
          }}
          TrxDependency={[]}
        />
      </View>
    </MainLayout>
  );
};

export default Trades;
