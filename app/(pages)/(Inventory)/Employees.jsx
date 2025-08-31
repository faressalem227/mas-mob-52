import { StyleSheet, View, Dimensions } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
// import { colors, roles } from "../../../constants";
// import icons from "../../../constants";
import { useGlobalContext } from "../../../context/GlobalProvider";
import { useDropDown } from "../../../hooks/useDropDownData";
import MainGrid from "../../../components/grid/MainGrid";
// import Icon from "react-native-vector-icons/MaterialIcons";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import EmployeesGrid from "../../../components/grid/EmployeesGrid";
import { MainLayout } from "../../../components";
import MainDataLang from "../../../constants/Lang/Invintory/MainDataLang";
const Employees = ({ title, hasLeftComponent = false, onDrawerPress }) => {
	const screenHeight = Dimensions.get("window").height;
	const { DepartmentID,Lang, company} = useGlobalContext();
	console.log(DepartmentID);
	
	
	const { data: JobList, loading: JobListLoader } = useDropDown(
		"api_ms_Jobs_List",
		{ LocationID: 5 },
		"JobID",
		"JobName"
	);
	const { data: EducationList, loading: EducationListLoader } = useDropDown(
		"api_ms_Education_List",
		{ LocationID: 5 },
		"EducationID",
		"EducationName"
	);
	const { data: MaritalStatusList, loading: MaritalStatusListLoader } =
		useDropDown(
			"api_ms_MaritalStatus_List",
			{ LocationID: 5 },
			"MaritalStatusID",
			"MaritalStatusName"
		);
	const { data: JobTypeList, loading: JobTypeListLoader } = useDropDown(
		"api_ms_JobTypes_List",
		{ LocationID: 5 },
		"JobTypeID",
		"JobTypeName"
	);
	const { data: TypeList, loading: TypeListLoader } = useDropDown(
		"api_ms_Gender_List",
		{LocationID: 5},
		"GenderID",
		"GenderName"
	);
	const { data: JobStatus, loading: JobStatusLoader } = useDropDown(
		"api_ms_JobStatus_List",
		{ LocationID: 5 },
		"JobStatusID",
		"JobStatusName"
	);
	const { data: DegreeList, loading: DegreeListLoader } = useDropDown(
		"api_ms_Degrees_List",
		{ LocationID: 5 },
		"DegreeID",
		"DegreeName"
	);
	const { data: DepartmentList, loading: DepartmentListLoader } = useDropDown(
		"api_ms_Department_List",
		{ LocationID: 5 },
		"DepartmentID",
		"DepartmentNameAr"
	);
	console.log(DepartmentList, "DepartmentList");
	return (
	<View style={styles.container}>
			<MainLayout title={MainDataLang.Employees[Lang]}>
				<View style={[styles.assetsGrid, { height: screenHeight - 20 }]}>
					<MainGrid
						const
						tableHead={[
							{
								key: "EmployeeID",
								label: MainDataLang.EmployeeCode[Lang],
								type: "number",
								input: "false",
								visible: "false",

							},
							{
								key: "EmployeeCode",
								label: MainDataLang.EmployeeCode[Lang],
								type: "number",
								input: "true",
								visible: "true",
								width: 150
							},
							{
								key: "EmployeeName",
								label: MainDataLang.EmployeeName[Lang],
								input: "true",
								visible: "true",
								width: 200
							},
							{},
							{
								key: "DepartmentID",
								label: "الإدارة",
								type: "dropdown",
								options: DepartmentList,
								input: "true",
								visible: "false",
							},
							{
								key: "DepartmentNameAr",
								label: MainDataLang.Management[Lang],
								input: "false",
								visible: "true",
								width: 150
							},
							{
								key: "JobID",
								label: MainDataLang.Job[Lang],
								type: "dropdown",
								options: JobList,
								input: "true",
								visible: "false",
							},
							{
								key: "Phone",
								label: MainDataLang.Telephone[Lang],
								type: "number",
								input: "true",
								visible: "true",
								width: 120
							},
							{
								key: "Centralteam",
								label: MainDataLang.CentralMaintenanceTeam[Lang],
								type: "checkbox",
								input: "true",
								visible: "true",
								width: 150
							},
							{
								key: "DegreeID",
								label: MainDataLang.Grade[Lang],
								type: "dropdown",
								options: DegreeList,
								input: "true",
								visible: "false",
							},
							{
								key: "NationalID",
								label: MainDataLang.NationalID[Lang],
								type: "number",
								input: "true",
								visible: "false",
							},
							{
								key: "BirthDate",
								label: MainDataLang.DateOfBirth[Lang],
								type: "date",
								input: "true",
								visible: "false",
							},
							{
								key: "EducationID",
								label: MainDataLang.Qualification[Lang],
								type: "dropdown",
								options: EducationList,
								input: "true",
								visible: "false",
							},
							{
								key: "MaritalStatusID",
								label: MainDataLang.MaritalStatus[Lang],
								type: "dropdown",
								options: MaritalStatusList,
								input: "true",
								visible: "false",
							},
							{
								key: "JobTypeID",
								label: MainDataLang.TypeOfEmployment[Lang],
								type: "dropdown",
								options: JobTypeList,
								input: "true",
								visible: "false",
							},
							{
								key: "GenderID",
								label: MainDataLang.Gender[Lang],
								type: "dropdown",
								options: TypeList,
								input: "true",
								visible: "false",
							},
							{
								key: "JobStatusID",
								label: MainDataLang.EmploymentStatus[Lang],
								type: "dropdown",
								options: JobStatus,
								input: "true",
								visible: "false",
							},
							{
								key: "MonthlySalary",
								label: MainDataLang.MonthlySalary[Lang],
								type: "number",
								input: "true",
								visible: "false",
							},
							{
								key: "HourlySalary",
								label: MainDataLang.HourlyWage[Lang],
								type: "number",
								input: "true",
								visible: "false",
							},
							{
								key: "OverTime1",
								label: MainDataLang.DaytimeOvertime[Lang],
								type: "number",
								input: "true",
								visible: "false",
							},
							{
								key: "OverTime2",
								label: MainDataLang.NighttimeOvertime[Lang],
								type: "number",
								input: "true",
								visible: "false",
							},
							{
								key: "Mobile",
								label: MainDataLang.Mobile[Lang],
								type: "number",
								input: "true",
								visible: "false",
							},
							{
								key: "Address",
								label: MainDataLang.Address[Lang],
								type: "text",
								input: "true",
								visible: "false",
							},
							{
								key: "Email",
								label: MainDataLang.Email[Lang],
								type: "text",
								input: "true",
								visible: "false",
							},
						]}
						mixedWidth={true}
						pk={"EmployeeID"}
						spTrx={"api_ms_Employees_trx"}
						spIns={"api_ms_Employees_Ins"}
						spUpd={"api_ms_Employees_Upd"}
						spDel={"api_ms_Employees_Del"}
						dynamicCode={{
							tbName: "ms_Employees",
							codeCol: "EmployeeCode",
						}}
						TrxParam={[{ name: "LocationID", value: DepartmentID }, { name: "CompanyID", value: company }]}
						DelParam={[
							{ name: "LocationID", value: DepartmentID },
							{ rowData: true, name: "EmployeeID", value: "EmployeeID" },
						]}
						UpdBody={{ LocationID: DepartmentID }}
						InsBody={{ LocationID: DepartmentID }}
						TrxDependency={[]}
						routeTo={{
							path: "/EmployeesDetailes",
							hasParams: true,
							params: {
								LocationID: DepartmentID,
							},
						}}
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
	dropdownContainer: {
		marginHorizontal: 16,
		marginVertical: 24,
	},
	assetsGrid: {
		marginVertical: 8,
	},
});

export default Employees;
