import { useState } from 'react';
import { View } from 'react-native';
import { useGlobalContext } from '../../../context/GlobalProvider';
import MainLayout from '../../../components/layout/MainLayout';
import MainGrid from '../../../components/grid/MainGrid';
import { useDropDown } from '../../../hooks/useDropDownData';
import HealthAndSafetyLang from '../../../constants/Lang/Maintenance/HealthAndSafety';
import { Dropdown } from '../../../components';

const HealthAndSafety = () => {
  const { user, DepartmentID, Lang, company } = useGlobalContext();

  const [selectedTrade, setSelectedTrade] = useState(null);

  const { data: TradeList } = useDropDown(
    'api_ms_Trade_List',
    { DepartmentID: DepartmentID, UserName: user.username, LangID: Lang, CompanyID: company },
    'TradeID',
    'TradeName'
  );

  return (
    <MainLayout title={HealthAndSafetyLang.pageTitle[Lang]}>
      <View className="flex-1 px-4">
        <View className="my-4">
          <Dropdown
            placeholder={HealthAndSafetyLang.Trade[Lang]}
            title={HealthAndSafetyLang.Trade[Lang]}
            data={TradeList}
            value={selectedTrade}
            initailOption={16}
            onChange={(v) => {
              setSelectedTrade(v);
            }}
          />
        </View>

        <MainGrid
          pk={'SafetyID'}
          spTrx={'api_ms_Safety_Trx'}
          spIns={'api_ms_Safety_Ins'}
          spUpd={'api_ms_Safety_Upd'}
          spDel={'api_ms_Safety_Del'}
          IsPaginated={{ TableName: 'ms_Safety' }}
          TrxParam={[
            { name: 'DepartmentID', value: DepartmentID },
            { name: 'CompanyID', value: company },
            { name: 'LangID', value: Lang },
            { name: 'TradeID', value: selectedTrade },
            { name: 'UserName', value: user.username },
          ]}
          InsBody={{
            DepartmentID: DepartmentID,
            CompanyID: company,
            LangID: Lang,
            UserName: user.username,
            TradeID: selectedTrade,
            IsSm: 1,
          }}
          UpdBody={{
            DepartmentID,
            CompanyID: company,
            LangID: Lang,
            UserName: user.username,
            TradeID: selectedTrade,
            IsSm: 1,
          }}
          DelParam={[
            { rowData: true, name: 'SafetyID', value: 'SafetyID' },
            { name: 'DepartmentID', value: DepartmentID },
            { name: 'UserName', value: user.username },
            { name: 'LangID', value: Lang },
          ]}
          TrxDependency={[DepartmentID, selectedTrade, company]}
          routeTo={{
            path: 'HealthAndSafetyDetails',
            hasParams: true,
            params: {
              LocationID: DepartmentID,
            },
          }}
          StaticWidth
          dynamicCode={{
            tbName: 'ms_Safety',
            codeCol: 'SafetyCode',
          }}
          tableHead={[
            {
              key: 'SafetyID',
            },
            {
              key: 'SafetyCode',
              label: HealthAndSafetyLang.SafetyCode[Lang],
              type: 'number',
              input: true,
              visible: true,
              width: 80,
            },
            {
              key: 'SafetyName',
              label: `${HealthAndSafetyLang.SafetyName[Lang]}`,
              lines: 50,
              input: true,
              visible: true,
              width: 200,
            },
            {
              key: 'SafetyInstructions',
              label: `${HealthAndSafetyLang.SafetyInstructions[Lang]}`,
              lines: 50,
              input: true,
              visible: true,
              width: 400,
            },
            {
              key: 'SafetyTools',
              label: `${HealthAndSafetyLang.SafetyTools[Lang]}`,
              lines: 4,
              input: true,
              visible: true,
              width: 200,
            },
            {
              key: 'CountDocuments',
              label: HealthAndSafetyLang.CountDocuments[Lang],
              type: 'number',
              input: false,
              visible: true,
              width: 120,
            },
          ]}
        />
      </View>
    </MainLayout>
  );
};

export default HealthAndSafety;
