/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import { LogoBar, MainButton, UserInfo } from '../../components';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import SmallButton from '../../components/UI/SmallButton';
import { useRouter } from 'expo-router';
import { icons } from '../../constants';
import Dropdown from '../../components/UI/DropDown';
import HomeLang from '../../constants/Lang/Home';
import { useGlobalContext } from '../../context/GlobalProvider';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
function HomePage() {
  const {
    user,
    DepartmentID,
    setDepartmentID,
    departmentTypeData,
    setDepartmentTypeID,
    departmentData,
    Lang,
    Rtl,
  } = useGlobalContext();
  const router = useRouter();
  const [fontSize, setFontSize] = useState(wp('2.5%')); // Default font size
  const [width, setWidth] = useState();
  const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);
  useEffect(() => {
    if (windowWidth < 800) {
      setFontSize(wp('5%'));
      setWidth('w-48'); // Set width to 250 px
    } else {
      setFontSize(wp('3%'));
      setWidth('w-[80%]'); // Set width to 80%
    }
  }, [windowWidth]);

  const handleDepartmentChange = (value) => {
    setDepartmentID(value);
  };

  return (
    <>
      <MainLayout title={Lang == 1 ? 'الرئيسية' : 'Home'} hasLeftComponent>
        <View>
          <View
            style={{
              marginBottom: hp('4%'),
            }}>
            <UserInfo title={HomeLang.welcome[Lang]} Rtl={Rtl} />
          </View>
          <View
            style={{
              marginLeft: wp('4%'),
              marginRight: wp('4%'),
            }}
            className="gap-5">
            <Dropdown
              placeholder={HomeLang.stationTypeDropdown[Lang]}
              title={HomeLang.stationType[Lang]}
              initailOption={departmentTypeData?.[0]?.key}
              onChange={(v) => setDepartmentTypeID(v)}
              data={departmentTypeData}
            />

            <Dropdown
              placeholder={HomeLang.stationNameDropdown[Lang]}
              title={HomeLang.stationName[Lang]}
              initailOption={DepartmentID || 1}
              onChange={(v) => handleDepartmentChange(v)}
              data={departmentData}
            />
          </View>
        </View>
        <View
          className="m-auto flex flex-row-reverse flex-wrap items-center justify-center px-4"
          style={{ gap: hp('4.5%'), marginTop: hp('5%') }}>
          {/* <SmallButton
            title={HomeLang.CentralData[Lang]}
            icon={icons.manage}
            textStyles={'w-52'}
            handlePress={() => router.navigate('/AssetHome')}
          />  <SmallButton
            title={HomeLang.UnitMaintenance[Lang]}
            icon={icons.manage}
            textStyles={'w-52'}
            handlePress={() => router.navigate('/AssetHome')}
          /> */}
          <MainButton
            title={HomeLang.CentralData[Lang]}
            handlePress={() => {
              router.navigate({
                pathname: 'CentralData',
                params: { DepartmentID },
              });
            }}
            icon={icons.ArrowCircleLeft}
            iconStyles={'w-8 h-8'}
            textStyles={'w-52 p-2'}
          />
          <MainButton
            title={HomeLang.UnitMaintenance[Lang]}
            handlePress={() => {
              router.navigate({
                pathname: 'UnitMaintenance',
                params: { DepartmentID },
              });
            }}
            icon={icons.ArrowCircleLeft}
            iconStyles={'w-8 h-8'}
            textStyles={'w-52 p-2'}
          />
        </View>
      </MainLayout>
    </>
  );
}

export default HomePage;

const styles = StyleSheet.create({
  smlBtn: {
    fontSize: hp('5%'),
    width: wp('40%'),
  },
});
