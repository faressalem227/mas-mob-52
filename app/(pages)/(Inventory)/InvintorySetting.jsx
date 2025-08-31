import { View } from 'react-native';
import { MainLayout } from '../../../components';
import SmallButton from '../../../components/UI/SmallButton';
import { useRouter } from 'expo-router';
import InvintorySettingLang from '../../../constants/Lang/Invintory/InvintorySettingLang';
import { useGlobalContext } from '../../../context/GlobalProvider';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

function InvintorySetting() {
  const router = useRouter();
  const { Lang } = useGlobalContext();
  return (
    <>
      <MainLayout title={InvintorySettingLang.pageTitle[Lang]}>
        <View
          className="m-auto flex flex-row-reverse flex-wrap items-center justify-center py-3"
          style={{ gap: hp('1.5%') }}>
          {/* <SmallButton
            title={InvintorySettingLang.technicalSpecifications[Lang]}
            handlePress={() => router.navigate("/SpecificationDefinition")}
          /> */}
          <SmallButton
            title={InvintorySettingLang.DefinitionUnits[Lang]}
            handlePress={() => router.navigate('/UnitDefinition')}
          />
          {/* <SmallButton
            title={InvintorySettingLang.UnitType[Lang]}
            handlePress={() => router.navigate("/UnitTypeDefinition")}
          /> */}
          {/* <SmallButton
            title={InvintorySettingLang.ImageSize[Lang]}
            handlePress={() => router.navigate("/ImageSizeDefinition")}
          /> */}
          {/* <SmallButton
            title={InvintorySettingLang.SupplierTypes[Lang]}
            handlePress={() => router.navigate("/ResourceType")}
          /> */}
          {/* <SmallButton
            title={InvintorySettingLang.ItemStatus[Lang]}
            handlePress={() => router.navigate("/ItemStatus")}
          /> */}
          <SmallButton
            title={InvintorySettingLang.SpecificInvintory[Lang]}
            handlePress={() => router.navigate('/SpecificInventory')}
          />
          <SmallButton
            title={InvintorySettingLang.ItemsClassifications[Lang]}
            handlePress={() => router.navigate('/Classification')}
          />
          {/* <SmallButton
            title={InvintorySettingLang.InvintoryOperations[Lang]}
            handlePress={() => router.navigate("/InvintoryOperations")}
          />
          <SmallButton
            title={InvintorySettingLang.EmployeesSetting[Lang]}
            handlePress={() => router.navigate("/EmployeesSystemSetting")}
          /> */}
        </View>
      </MainLayout>
    </>
  );
}

export default InvintorySetting;
