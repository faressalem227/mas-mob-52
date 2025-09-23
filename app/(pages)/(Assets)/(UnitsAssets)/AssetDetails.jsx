import { View, ScrollView } from 'react-native';
import { MainLayout, SmallButton, InfoDetailes } from '../../../../components';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import AssetHomeLang from '../../../../constants/Lang/AssetManagment/AssetHomeLang';

const AssetsLang = {
  AssetsData: {
    1: 'بيانات الأصول',
    2: 'Assets Data',
  },
  SubLocationName: {
    1: 'الموقع الفرعي',
    2: 'Sub Location Name',
  },
  DepartmentName: {
    1: 'اسم الإدارة',
    2: 'Department Name',
  },
  AssetID: {
    1: 'معرف الأصل',
    2: 'Asset ID',
  },
  AssetParentID: {
    1: 'الأصل الرئيسي',
    2: 'Parent Asset',
  },
  AssetCode: {
    1: 'الكود',
    2: 'Code',
  },
  AssetName: {
    1: 'اسم الأصل',
    2: 'Asset Name',
  },
  SubLocationID: {
    1: 'الموقع الفرعي',
    2: 'Sub Location',
  },
  AssetClassID: {
    1: 'التصنيف',
    2: 'Classification',
  },
  AssetClassName: {
    1: 'التصنيف',
    2: 'Classification',
  },
  AssetStatusID: {
    1: 'حالة الأصل',
    2: 'Asset Status',
  },
  AssetStatusNameAr: {
    1: 'حالة الأصل',
    2: 'Asset Status',
  },
  AssetImportance: {
    1: 'الأهمية',
    2: 'Importance',
  },
  IsActive: {
    1: 'فعال',
    2: 'Active',
  },

  AssetCopy: {
    1: 'نسخ الاصل',
    2: 'Asset copy',
  },

  BasicData: {
    1: 'البيانت الاساسيه',
    2: 'Basic Data',
  },

  WarrantyData: {
    1: 'بيانات الضمان',
    2: 'Warranty Data',
  },

  MonthlyAssetMaintenance: {
    1: 'بيانات الصيانه الشهريه',
    2: 'Monthly Maintenance Data',
  },

  AssignedSpareParts: {
    1: 'قطع الغيار المخصصه',
    2: 'Assigned spare parts',
  },

  SparePartsTransactions: {
    1: 'حركة قطع الغيار',
    2: 'Spare Parts Transactions',
  },

  AssetEval: {
    1: 'تقييم الحاله الفنيه',
    2: 'Asset Evaluation',
  },

  UnitAssetRisk: {
    1: 'حساب المخاطرة',
    2: 'Asset Risk',
  },

  UnitAssetRisk: {
    1: 'حساب المخاطرة',
    2: 'Asset Risk',
  },
};

const AssetDetails = () => {
  const {
    AssetID,
    SubLocationID,
    SubLocationName,
    LocationID,
    AssetCode,
    AssetName,
    AssetClassName,
    AssetStatusName,
    AssetImportance,
    TradeID,
    ManufacturerID,
    AssetClassID,
    ...restParams
  } = useLocalSearchParams();

  const { Lang, Rtl } = useGlobalContext();

  const router = useRouter();

  const infoData = [
    { label: AssetsLang.AssetCode[Lang], value: AssetCode },
    { label: AssetsLang.AssetName[Lang], value: AssetName },
    { label: AssetsLang.SubLocationName[Lang], value: SubLocationName },
    { label: AssetsLang.AssetClassName[Lang], value: AssetClassName },
    { label: AssetsLang.AssetImportance[Lang], value: AssetImportance },
  ];

  return (
    <MainLayout title={AssetHomeLang.AssetDetailes[Lang]} className="">
      <InfoDetailes details={infoData} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          className={`flex-1 ${Rtl ? 'flex-row-reverse' : 'flex-row'} flex-wrap items-center justify-center gap-3`}>
          <SmallButton
            title={AssetsLang.BasicData[Lang]}
            handlePress={() => {
              router.navigate({
                pathname: 'AssetBasic',
                params: {
                  AssetID,
                  TradeID,
                  ManufacturerID,
                },
              });
            }}
          />

          <SmallButton
            title={AssetHomeLang.TechnicalSpecifications[Lang]}
            handlePress={() => {
              router.navigate({
                pathname: 'TechnicalAsset',
                params: {
                  SubLocationID,
                  AssetID,
                  AssetCode,
                  AssetName,
                  AssetClassName,
                  AssetStatusName,
                  TradeID,
                },
              });
            }}
          />

          <SmallButton
            title={AssetHomeLang.FinancialData[Lang]}
            handlePress={() => {
              router.navigate({
                pathname: 'FinancialAsset',
                params: {
                  AssetID,
                  SubLocationID,
                  AssetCode,
                  AssetName,
                  AssetClassName,
                  AssetStatusName,
                  TradeID,
                },
              });
            }}
          />

          {/* <SmallButton
            title={AssetHomeLang.OperatinData[Lang]}
            handlePress={() => {
              router.navigate({
                pathname: 'AssetOrders',
                params: {
                  SubLocationID: SubLocationID,
                  LocationID: LocationID,
                  AssetID: AssetID,
                  AssetCode: AssetCode,
                  AssetName: AssetName,
                  AssetClassName: AssetClassName,
                  AssetStatusName: AssetStatusName,
                },
              });
            }}
          /> */}

          <SmallButton
            title={AssetsLang.WarrantyData[Lang]}
            handlePress={() => {
              router.navigate({
                pathname: 'WarrantyInformation',
                params: {
                  SubLocationID: SubLocationID,
                  DepartmentID: LocationID,
                  AssetID: AssetID,
                  AssetCode: AssetCode,
                  AssetName: AssetName,
                  AssetClassName: AssetClassName,
                  AssetStatusName: AssetStatusName,
                },
              });
            }}
          />

          <SmallButton
            title={AssetsLang.MonthlyAssetMaintenance[Lang]}
            handlePress={() => {
              router.navigate({
                pathname: 'MonthlyAssetMaintenance',
                params: {
                  SubLocationID: SubLocationID,
                  LocationID: LocationID,
                  AssetID: AssetID,
                  AssetCode: AssetCode,
                  AssetName: AssetName,
                  AssetClassName: AssetClassName,
                  AssetStatusName: AssetStatusName,
                },
              });
            }}
          />

          <SmallButton
            title={AssetHomeLang.MaintenancePlan[Lang]}
            handlePress={() => {
              router.navigate({
                pathname: 'AssetMaintenance',
                params: {
                  AssetID,
                },
              });
            }}
          />

          <SmallButton
            title={AssetHomeLang.WorkOrders[Lang]}
            handlePress={() => {
              router.navigate({
                pathname: 'AssetsWorkOrder',
                params: {
                  SubLocationID: SubLocationID,
                  LocationID: LocationID,
                  AssetID: AssetID,
                  AssetCode: AssetCode,
                  AssetName: AssetName,
                  AssetClassName: AssetClassName,
                  AssetStatusName: AssetStatusName,
                },
              });
            }}
          />

          <SmallButton
            title={AssetHomeLang.Meters[Lang]}
            handlePress={() => {
              router.navigate({
                pathname: 'AssetCounters',
                params: {
                  AssetID,
                },
              });
            }}
          />

          <SmallButton
            title={AssetsLang.AssignedSpareParts[Lang]}
            handlePress={() => {
              router.navigate({
                pathname: 'AssetCategoriesDetails',
                params: {
                  AssetID,
                },
              });
            }}
          />

          <SmallButton
            title={AssetsLang.SparePartsTransactions[Lang]}
            handlePress={() => {
              router.navigate({
                pathname: 'SparePartsTransactions',
                params: {
                  AssetID: AssetID,
                },
              });
            }}
          />

          <SmallButton
            title={AssetHomeLang.AssetImportance[Lang]}
            handlePress={() => {
              router.navigate({
                pathname: 'AssetImportance',
                params: {
                  AssetID,
                },
              });
            }}
          />

          <SmallButton
            title={AssetsLang.AssetEval[Lang]}
            handlePress={() => {
              router.navigate({
                pathname: 'UnitAssetEvaluation',
                params: {
                  AssetID,
                  AssetClassID,
                },
              });
            }}
          />

          <SmallButton
            title={AssetsLang.UnitAssetRisk[Lang]}
            handlePress={() => {
              router.navigate({
                pathname: 'UnitAssetRisk',
                params: {
                  AssetID,
                  AssetClassID,
                },
              });
            }}
          />

          {/* <SmallButton
                title={AssetHomeLang.AdditionalData[Lang]}
                handlePress={() => {
                  router.navigate({
                    pathname: "AdditionalData",
                    params: {
                      SubLocationID: SubLocationID,
                      LocationID: LocationID,
                      AssetID: AssetID,
                      AssetCode: AssetCode,
                      AssetName: AssetName,
                      AssetClassName: AssetClassName,
                      AssetStatusName: AssetStatusName,
                    },
                  });
                }}
              /> */}
        </View>
      </ScrollView>
    </MainLayout>
  );
};

export default AssetDetails;
