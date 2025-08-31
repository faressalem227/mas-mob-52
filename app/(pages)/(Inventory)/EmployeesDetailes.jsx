import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { MainLayout } from "../../../components";
import { useLocalSearchParams } from "expo-router";
import { ScrollComponent } from "../../../components";
import { useGlobalContext } from "../../../context/GlobalProvider";
import MainDataLang from "../../../constants/Lang/Invintory/MainDataLang";
import api from "../../../utilities/api";
import InfoDetailes from "../../../components/UI/InfoDetailes";
const EmployeesDetailes = () => {
	const data = useLocalSearchParams();
	const { Lang, Rtl } = useGlobalContext();
	console.log(data);
	const detailsData = [
		{ label: MainDataLang.EmployeeCode[Lang], value: data?.EmployeeCode },
		{ label: MainDataLang.EmployeeName[Lang], value: data?.EmployeeName },
		{ label: MainDataLang.Management[Lang], value: data?.DepartmentName },
		{ label: MainDataLang.Job[Lang], value: data?.JobName },
		{ label: MainDataLang.CentralMaintenanceTeam[Lang], value: data?.Centralteam },
		{ label: MainDataLang.Grade[Lang], value: data?.DegreeName },
		{ label: MainDataLang.NationalID[Lang], value: data?.NationalID },
		{ label: MainDataLang.DateOfBirth[Lang], value: data?.BirthDate?.split("T")[0] },
		{ label: MainDataLang.Qualification[Lang], value: data?.EducationName },
		{ label: MainDataLang.MaritalStatus[Lang], value: data?.MaritalStatusName },
		{ label: MainDataLang.TypeOfEmployment[Lang], value: data?.JobTypeName },
		{ label: MainDataLang.EmploymentStatus[Lang], value: data?.JobStatusName },
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
			<MainLayout
				title={MainDataLang.EmployeeData[Lang]}
				className="bg-white">
				<ScrollComponent parentContainerStyle={"min-h-[100vh]"}>
					<View className="bg-white h-[100vh] flex flex-col ">
						<InfoDetailes
							details={detailsData}
							valueWidthClass="w-[60%]"
						/>
					</View>
				</ScrollComponent>
			</MainLayout>
		</ScrollView>
	);
};

export default EmployeesDetailes;
