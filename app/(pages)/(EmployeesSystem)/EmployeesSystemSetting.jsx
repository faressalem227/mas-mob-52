import { View } from 'react-native';
import { MainLayout } from '../../../components';
import SmallButton from '../../../components/UI/SmallButton';
import { useRouter } from 'expo-router';
import InvintorySystemSettingLang from '../../../constants/Lang/Invintory/InvintorySystemSettingLang';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { useGlobalContext } from '../../../context/GlobalProvider';
function EmployeesSystemSetting() {
  const router = useRouter();
  const { Lang } = useGlobalContext();

  return (
    <>
      <MainLayout title={InvintorySystemSettingLang.EmployeeSettings[Lang]}>
        <View
          className="m-auto flex flex-row-reverse flex-wrap items-center justify-center "
          style={{ gap: hp('1.5%') }}>
          {/* <SmallButton
            title={InvintorySystemSettingLang.AdministrationCoding[Lang]}
            handlePress={() => router.navigate("/AdministrationCoding")}
          /> */}
          <SmallButton
            title={InvintorySystemSettingLang.SocialStatusCoding[Lang]}
            handlePress={() => router.navigate('/SocialStatusCoding')}
          />
          <SmallButton
            title={InvintorySystemSettingLang.QualificationCoding[Lang]}
            handlePress={() => router.navigate('/QualificationCoding')}
          />
          <SmallButton
            title={InvintorySystemSettingLang.JObCoding[Lang]}
            handlePress={() => router.navigate('/JobsCoding')}
          />
          <SmallButton
            title={InvintorySystemSettingLang.DegreeCoding[Lang]}
            handlePress={() => router.navigate('/DegreeCoding')}
          />
          <SmallButton
            title={InvintorySystemSettingLang.EmploymentTypeCoding[Lang]}
            handlePress={() => router.navigate('/EmploymentTypeCoding')}
          />
          <SmallButton
            title={InvintorySystemSettingLang.FunctionalStatusCoding[Lang]}
            handlePress={() => router.navigate('/JobStatusCoding')}
          />
        </View>
      </MainLayout>
    </>
  );
}

export default EmployeesSystemSetting;
