import { MainLayout, MainGrid } from '../../../../components';
import AssetHomeLang from '../../../../constants/Lang/AssetManagment/AssetHomeLang';
import { useGlobalContext } from '../../../../context/GlobalProvider';

const RiskLikelihood = () => {
  const { Lang, company } = useGlobalContext();
  return (
    <MainLayout title={AssetHomeLang.RiskLikelihood[Lang]}>
      <MainGrid
        pk={'LikelihoodLevelTypeID'}
        spTrx={'api_am_likelihood_leveltype_Trx'}
        spIns={'api_am_likelihood_leveltype_Ins'}
        spUpd={'api_am_likelihood_leveltype_Upd'}
        spDel={'api_am_likelihood_leveltype_Del'}
        TrxParam={[{ name: 'CompanyID', value: company }]}
        InsBody={{
          CompanyID: company,
        }}
        UpdBody={{
          CompanyID: company,
        }}
        DelParam={[
          {
            rowData: true,
            name: 'LikelihoodLevelTypeID',
            value: 'LikelihoodLevelTypeID',
          },
        ]}
        TrxDependency={[]}
        StaticWidth
        tableHead={[
          {
            key: 'LikelihoodLevelTypeID',
          },
          {
            key: 'Category',
            label: AssetHomeLang.RiskGroup[Lang],
            input: true,
            visible: true,
            required: true,
            width: 250,
          },
          {
            key: 'NormWt',
            label: AssetHomeLang.RiskNormW[Lang],
            type: 'number',
            input: true,
            visible: true,
            width: 100,
            required: true,
          },
          {
            key: 'QuestionToAsk',
            label: AssetHomeLang.RiskQu[Lang],
            input: true,
            visible: true,
            width: 350,
            required: true,
          },
        ]}
        routeTo={{
          path: '/RiskLiklihoodDetails',
          hasParams: true,
          params: {},
        }}
      />
    </MainLayout>
  );
};

export default RiskLikelihood;
