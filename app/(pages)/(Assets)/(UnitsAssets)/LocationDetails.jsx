import { View } from 'react-native';
import { MainLayout, MainGrid, InfoDetailes, SmallButton } from '../../../../components';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import AssetHomeLang from '../../../../constants/Lang/AssetManagment/AssetHomeLang';

const LocationDetailsLang = {
  LocationsData: {
    1: 'بيانات المواقع',
    2: 'Locations Data',
  },
  SubLocationID: {
    1: ' ',
    2: '',
  },
  SubLocationCode: {
    1: 'الكود',
    2: 'Code',
  },
  SubLocationName: {
    1: 'اسم الموقع الفرعي',
    2: 'Sub Location Name',
  },
  DepartmentCode: {
    1: 'كود الإدارة',
    2: 'Department Code',
  },
  SubDepartmentID: {
    1: 'اسم الإدارة الفرعية',
    2: 'Sub Department Name',
  },
  CountAssetID: {
    1: 'عدد الأصول',
    2: 'Assets Count',
  },
  Instructions: {
    1: 'تعليمات وملاحظات',
    2: 'Instructions',
  },

  SubLocationAssets: {
    1: 'الأصول بالموقع الفرعي',
    2: 'SubLocation Assets',
  },

  AdditionalData: {
    1: 'البيانات الاضافية',
    2: 'Additional Data',
  },
};

const LocationDetails = () => {
  const { SubLocationID, SubLocationName, SubLocationCode, DepartmentName, Instructions } =
    useLocalSearchParams();

  const { Lang, Rtl } = useGlobalContext();

  const router = useRouter();

  const infoData = [
    { label: LocationDetailsLang.SubLocationCode[Lang], value: SubLocationCode },
    { label: LocationDetailsLang.SubLocationName[Lang], value: SubLocationName },
    { label: LocationDetailsLang.SubDepartmentID[Lang], value: DepartmentName },
    { label: LocationDetailsLang.Instructions[Lang], value: Instructions },
  ];

  return (
    <MainLayout title={AssetHomeLang.SiteDetails[Lang]}>
      <View className="flex-1 p-4">
        <InfoDetailes details={infoData} />
        <View
          className={`m-auto ${Rtl ? 'flex-row-reverse' : 'flex-row'} flex-wrap items-center justify-center gap-3`}>
          <SmallButton
            title={LocationDetailsLang.SubLocationAssets[Lang]}
            handlePress={() =>
              router.navigate({
                pathname: 'SubLocationAssets',
                params: {
                  SubLocationID,
                  SubLocationName,
                  SubLocationCode,
                  DepartmentName,
                  Instructions,
                },
              })
            }
          />

          <SmallButton
            title={LocationDetailsLang.AdditionalData[Lang]}
            handlePress={() =>
              router.navigate({
                pathname: 'SubLocationAdditions',
                params: {
                  SubLocationID,
                  SubLocationName,
                  SubLocationCode,
                  DepartmentName,
                  Instructions,
                },
              })
            }
          />
        </View>
      </View>
    </MainLayout>
  );
};

export default LocationDetails;
