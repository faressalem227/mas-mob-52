import { View, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { MainLayout, ScrollComponent, SmallButton } from '../../../components';
import { useLocalSearchParams } from 'expo-router';
import { useGlobalContext } from '../../../context/GlobalProvider';
import MainDataLang from '../../../constants/Lang/Invintory/MainDataLang';
import InfoDetailes from '../../../components/UI/InfoDetailes';
import EmployeesText from '../../../constants/Lang/EmployeesSystem/EmployeesLang';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AssetHomeLang from '../../../constants/Lang/AssetManagment/AssetHomeLang';
const EmployeesDetailes = () => {
  const data = useLocalSearchParams();
  const { Lang, Rtl } = useGlobalContext();

  const router = useRouter();

  const detailsData = [
    { label: MainDataLang.EmployeeCode[Lang], value: data?.StaffCode },
    { label: MainDataLang.EmployeeName[Lang], value: data?.StaffName },
    { label: MainDataLang.Management[Lang], value: data?.DepartmentName },
    { label: MainDataLang.Job[Lang], value: data?.JobName },
    { label: MainDataLang.CentralMaintenanceTeam[Lang], value: data?.Centralteam },
    { label: MainDataLang.Grade[Lang], value: data?.DegreeName },
    { label: MainDataLang.NationalID[Lang], value: data?.NationalID },
    { label: MainDataLang.DateOfBirth[Lang], value: data?.BirthDate?.split('T')[0] },
    { label: MainDataLang.Qualification[Lang], value: data?.EducationName },
    { label: MainDataLang.MaritalStatus[Lang], value: data?.MaritalStatusName },
    { label: MainDataLang.TypeOfEmployment[Lang], value: data?.JobTypeName },
    { label: MainDataLang.MonthlySalary[Lang], value: data?.MonthlySalary },
    { label: MainDataLang.HourlyWage[Lang], value: data?.HourlySalary },
    { label: MainDataLang.HourlyWage[Lang], value: data?.OverTime1 },
    { label: MainDataLang.NighttimeOvertime[Lang], value: data?.OverTime2 },
    { label: MainDataLang.Telephone[Lang], value: data?.Phone },
    { label: MainDataLang.Mobile[Lang], value: data?.Mobile },
    { label: MainDataLang.Address[Lang], value: data?.Address },
    { label: MainDataLang.Email[Lang], value: data?.Email },
  ];
  return (
    <ScrollView>
      <MainLayout title={MainDataLang.EmployeeData[Lang]} className="bg-white">
        <ScrollComponent parentContainerStyle={'min-h-[95vh]'}>
          <InfoDetailes details={detailsData} />
          <View
            className={`m-auto mt-3 mb-7 flex gap-3 ${Rtl ? 'flex-row-reverse' : 'flex-row'} flex-wrap items-center justify-center px-4`}>
            <SmallButton
              style={styles.smlBtn}
              title={EmployeesText.EmployeeAsset[Lang]}
              handlePress={() =>
                router.navigate({
                  pathname: '/EmployessAssignedAssets',
                  params: { StaffID: data?.StaffID },
                })
              }
            />
            <SmallButton
              style={styles.smlBtn}
              title={EmployeesText.EmployeesWorkorder[Lang]}
              handlePress={() =>
                router.navigate({
                  pathname: './EmployeesWorkorder',
                  params: { StaffID: data?.StaffID },
                })
              }
            />
          </View>
        </ScrollComponent>
      </MainLayout>
    </ScrollView>
  );
};

export default EmployeesDetailes;

const styles = StyleSheet.create({
  smlBtn: {
    fontSize: hp('5%'),
    width: wp('40%'),
  },
});
