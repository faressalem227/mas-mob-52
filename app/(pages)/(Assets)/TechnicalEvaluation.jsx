import { useCallback, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { MainLayout } from '../../../components';
import { useGlobalContext } from '../../../context/GlobalProvider';

import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import MainGrid from '../../../components/grid/MainGrid';
import { useDropDown } from '../../../hooks/useDropDownData';

import AssetHomeLang from '../../../constants/Lang/AssetManagment/AssetHomeLang';
const TechnicalEvaluation = () => {
  const [SubLocationID, setSubLocationID] = useState(null);
  const { user, Lang, company } = useGlobalContext();
  const screenHeight = Dimensions.get('window').height; // Get screen height dynamically
  const { DepartmentID } = useLocalSearchParams();
  const [loading, setLoading] = useState(false); // Ensure loading state is defined
  const [rerender, setRerender] = useState(0);
  useFocusEffect(
    useCallback(() => {
      setRerender((perv) => perv + 1);
    }, [])
  );
  const {
    data: evaluatorData,
    loading: evaluatorLoader,
    error: evaluatorError,
  } = useDropDown(
    'api_am_Evaluator_trx',
    {
      LocationID: DepartmentID,
    },
    'EvaluatorID',
    'Eval_name'
  );

  const {
    data: assetlist,
    loading: assetLoader,
    error: assetError,
  } = useDropDown(
    'api_ms_Assets_ListBySubLocation',
    { SubLocationID: SubLocationID, LocationID: DepartmentID },
    'value',
    'label'
  );
  const {
    data: subLocation,
    loading: subLocationloader,
    error: subLocationerr,
  } = useDropDown('api_ms_SubLocation_List', { LocationID: DepartmentID }, 'value', 'label');

  return (
    <View style={styles.container}>
      <MainLayout title={AssetHomeLang.TechnicalEvaluation[Lang]} loading={loading}>
        <View style={[styles.TechnicalEvaluationGrid, { height: screenHeight }]}>
          <MainGrid
            handleDropDownChange={(key, val) => {
              if (key == 'SubLocationID') {
                setSubLocationID(val);
              }
            }}
            pk={'AssetConditionID'}
            tableHead={[
              {
                label: ' ',
                visible: 'false',
                input: 'false',
                key: 'AssetConditionID',
                width: 100,
              },
              {
                label: AssetHomeLang.Location[Lang],
                visible: 'false',
                input: 'true',
                key: 'SubLocationID',
                width: 100,
                type: 'dropdown',
                options: subLocation,
              },
              {
                label: AssetHomeLang.Asset[Lang],
                visible: 'false',
                input: 'true',
                type: 'dropdown',
                key: 'AssetID',
                options: assetlist,
                width: 100,
              },
              {
                label: AssetHomeLang.Asset[Lang],
                visible: 'true',
                input: 'false',
                type: 'text',
                key: 'AssetName',
                width: 200,
              },

              {
                label: AssetHomeLang.RatingDate[Lang],
                input: 'true',
                type: 'date',
                visible: 'true',
                key: 'ConditionDate',
                width: 100,
              },
              {
                label: AssetHomeLang.Evaluator[Lang],
                type: 'dropdown',
                input: 'true',
                visible: 'false',
                key: 'EvaluatorID',
                width: 100,
                options: evaluatorData,
              },
              {
                label: AssetHomeLang.Rating[Lang],
                type: 'text',
                input: 'false',
                visible: 'true',
                key: 'ConditionIndex',
                width: 100,
              },
              {
                label: AssetHomeLang.Evaluator[Lang],
                type: 'text',
                input: 'false',
                visible: 'true',
                key: 'Eval_name',
                width: 100,
              },
              {
                label: AssetHomeLang.Remarks[Lang],
                type: 'text',
                input: 'true',
                visible: 'true',
                key: 'Remarks',
                required: 'false',
                width: 200,
              },
            ]}
            spTrx={'api_am_asset_conditions_Trx'}
            spIns={'api_am_asset_conditions_ins'}
            spUpd={'api_am_asset_conditions_upd'}
            spDel={'api_am_asset_conditions_del'}
            TrxParam={[
              { name: 'LocationID', value: DepartmentID },
              { name: 'CompanyID', value: company },
            ]}
            DelParam={[
              {
                rowData: true,
                name: 'AssetConditionID',
                value: 'AssetConditionID',
              },
            ]}
            UpdBody={{ LocationID: DepartmentID }}
            InsBody={{ LocationID: DepartmentID }}
            routeTo={{
              path: '/TechnicalEvaluationDetails',
              hasParams: true,
              params: {
                LocationID: DepartmentID,
                CompnayID: company,
              },
            }}
            TrxDependency={[rerender]}
            StaticWidth={true}
            //mixedWidth={true}
          />
        </View>
      </MainLayout>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  TechnicalEvaluationGrid: {
    marginTop: 16,
    marginBottom: 68,
  },
});

export default TechnicalEvaluation;
