import { View } from 'react-native';
import { MainLayout, InfoDetailes, SmallButton } from '../../../../components';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import { useDropDown } from '../../../../hooks/useDropDownData';
import ReportBugsLang from '../../../../constants/Lang/Maintenance/ReportBugs';

const ReportFailureDetails = () => {
  const {
    FailureReportID,
    FailureReportCode,
    FailureReportStatusName,
    FailureReportDate,
    FailureDate,
    TradeID,
    FailureReportStatusID,
    SafetyID,
    SafetyInstructions,
    SafetyDetails,
    SafetyTools,
  } = useLocalSearchParams();

  const { Lang, Rtl } = useGlobalContext();

  const router = useRouter();

  const detailsData = [
    { label: ReportBugsLang.FailureReportCode[Lang], value: FailureReportCode },
    { label: ReportBugsLang.FailureReportStatusName[Lang], value: FailureReportStatusName },
    { label: ReportBugsLang.FailureReportDate[Lang], value: FailureReportDate },
    { label: ReportBugsLang.FailureReportDate[Lang], value: FailureDate },
  ];

  console.log('is', FailureReportID);

  return (
    <MainLayout title={ReportBugsLang.ReportDetails[Lang]}>
      <View className="flex-1">
        <InfoDetailes details={detailsData} />

        <View
          className={`flex-1 items-center justify-center gap-4 ${Rtl ? 'flex-row-reverse' : 'flex-row'}`}>
          <SmallButton
            title={ReportBugsLang.Assets[Lang]}
            handlePress={() => {
              router.navigate({
                pathname: './ReportAssets',
                params: {
                  FailureReportID,
                  FailureReportCode,
                  FailureReportStatusName,
                  FailureReportDate,
                  FailureDate,
                  TradeID,
                  FailureReportStatusID,
                  SafetyID,
                  SafetyInstructions,
                  SafetyDetails,
                  SafetyTools,
                },
              });
            }}
          />
          <SmallButton
            title={ReportBugsLang.Safety[Lang]}
            handlePress={() => {
              router.navigate({
                pathname: './ReportSafety',
                params: {
                  FailureReportID,
                  FailureReportCode,
                  FailureReportStatusName,
                  FailureReportDate,
                  FailureDate,
                  TradeID,
                  FailureReportStatusID,
                  SafetyID,
                  SafetyInstructions,
                  SafetyDetails,
                  SafetyTools,
                },
              });
            }}
          />
        </View>
      </View>
    </MainLayout>
  );
};

export default ReportFailureDetails;
