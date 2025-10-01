import React, { useState } from 'react';
import MainLayout from '../../../../components/layout/MainLayout';
import { ScrollView, StyleSheet, View } from 'react-native';
import SmallButton from '../../../../components/UI/SmallButton';
import { useRouter } from 'expo-router';
import AssetHomeLang from '../../../../constants/Lang/AssetManagment/AssetHomeLang';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

function CentralDataAssetsSettingsHome() {
  const router = useRouter();
  const { Lang, Rtl } = useGlobalContext();
  return (
    <>
      <MainLayout title={AssetHomeLang.AssetSystemSettingss[Lang]}>
        <View
          className={`m-auto flex ${Rtl ? 'flex-row-reverse' : 'flex-row'} flex-wrap items-center justify-center px-4`}
          style={{ gap: hp('1%') }}>
          <SmallButton
            style={styles.smlBtn}
            title={AssetHomeLang.AssetCondition[Lang]}
            handlePress={() => router.navigate('/AssetStatus')}
          />
          <SmallButton
            style={styles.smlBtn}
            title={AssetHomeLang.Manufacturers[Lang]}
            handlePress={() => router.navigate('/Manufacturers')}
          />

          <SmallButton
            style={styles.smlBtn}
            title={AssetHomeLang.ManufacturersCountry[Lang]}
            handlePress={() => router.navigate('/ManufacturersCountry')}
          />
          <SmallButton
            style={styles.smlBtn}
            title={AssetHomeLang.StationCriticality[Lang]}
            handlePress={() => router.navigate('/StationImportance')}
          />
          <SmallButton
            style={styles.smlBtn}
            title={AssetHomeLang.EvaluationBodies[Lang]}
            handlePress={() => router.navigate('/Evaluations')}
          />
          <SmallButton
            style={styles.smlBtn}
            title={AssetHomeLang.AdditionData[Lang]}
            handlePress={() => router.navigate('/AdditionData')}
          />
          {/* <SmallButton
              style={styles.smlBtn}
              title={AssetHomeLang.OperatingCondition[Lang]}
              handlePress={() => router.navigate('/OperationStatus')}
            /> */}
          {/* <SmallButton
              style={styles.smlBtn}
              title={AssetHomeLang.AssetClassification[Lang]}
              handlePress={() => router.navigate('/AssetsClassification')}
            /> */}
          {/* <SmallButton
              style={styles.smlBtn}
              title={AssetHomeLang.RequiredActions[Lang]}
              handlePress={() => router.navigate('/RequiredProcedures')}
            /> */}
          {/* <SmallButton
            style={styles.smlBtn}
            title={AssetHomeLang.TechnicalCondition[Lang]}
            handlePress={() => router.navigate('/TechnicalCondition')}
          /> */}
          {/* <SmallButton
              style={styles.smlBtn}
              title={AssetHomeLang.RiskScore[Lang]}
              handlePress={() => router.navigate('/RiskDegree')}
            /> */}

          {/* <SmallButton
              style={styles.smlBtn}
              title={AssetHomeLang.AssetFailureProbability[Lang]}
              handlePress={() => router.navigate('/AssetFailureProbability')}
            /> */}
          {/* <SmallButton
            style={styles.smlBtn}
            title={AssetHomeLang.TechnicalSpecifications[Lang]}
            handlePress={() => router.navigate('/TechnicalSpecifications')}
          /> */}
          {/* <SmallButton
              style={styles.smlBtn}
              title={AssetHomeLang.DataSettings[Lang]}
              handlePress={() => router.navigate('/DataSettings')}
            /> */}
          {/* <SmallButton
              style={styles.smlBtn}
              title={AssetHomeLang.TechnicalEvaluation[Lang]}
              handlePress={() => router.navigate('/TechnicalEvaluation')}
            /> */}
        </View>
      </MainLayout>
    </>
  );
}

const styles = StyleSheet.create({
  smlBtn: {
    fontSize: hp('5%'),
    width: wp('40%'),
  },
});

export default CentralDataAssetsSettingsHome;
