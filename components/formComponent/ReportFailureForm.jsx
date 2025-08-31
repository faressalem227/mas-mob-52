import { View } from "react-native";
import React from "react";
import { useState } from "react";
import Dropdown from "../UI/DropDown";
import FormField from "../UI/FormField";
import DatePickerInput from "../UI/DatePickerInput";
import MainButton from "../UI/MainButton";

import { useGlobalContext } from "../../context/GlobalProvider";
import { icons } from "../../constants";
import {
	getFormattedLocalDate,
	cairoTimeConverter,
} from "../../utils/dateFormater";
const ReportFailureForm = ({ submitData, options, assetsStatus }) => {
	const { user } = useGlobalContext();
	const [formdata, setFormData] = useState({
		DepartmentID: user.DepartmentID,
		StatusDate: `${getFormattedLocalDate(cairoTimeConverter(new Date()))}`,
		AssetID: "",
		FailureAction: "",
		FailureDescription: "",
		StatusID: "",
	});

	const [submitting, setSubmitting] = useState(false);
	return (
		<>
			<View className="p-4">
				<DatePickerInput
					setDate={(value) => {
						setFormData({ ...formdata, StatusDate: value });
					}}
				/>
			</View>

			<View className="p-4">
				<Dropdown
					title={"المعدة"}
					data={options}
					placeholder={"اختر المعدة"}
					onChange={(key) => {
						setFormData({ ...formdata, AssetID: key });
					}}></Dropdown>
			</View>
			<View className="p-4">
				<Dropdown
					title={"حالة المعدة"}
					data={assetsStatus}
					placeholder={"اختر الحالة  "}
					onChange={(optionid) => {
						setFormData({
							...formdata,
							StatusID: optionid,
						});
					}}></Dropdown>
			</View>

			<View className="p-4">
				<FormField
					value={formdata.FailureDescription}
					handleChangeText={(value) => {
						setFormData({ ...formdata, FailureDescription: value });
					}}
					title={"تفاصيل العطل"}
					placeholder={"ادخل التفاصيل"}></FormField>
			</View>
			<View className="p-4">
				<FormField
					value={formdata.FailureAction}
					handleChangeText={(value) => {
						setFormData({ ...formdata, FailureAction: value });
					}}
					title={"الاجراء المتخذ قبل الابلاغ"}
					placeholder={"ادخل الاجراء"}></FormField>
			</View>
			<View className="mt-8 p-4">
				<MainButton
					icon={icons.ArrowUp}
					iconStyles={"mr-4"}
					title={"ارسال"}
					handlePress={() => {
						submitData(formdata, setSubmitting);
					}}
					isLoading={submitting}></MainButton>
			</View>
		</>
	);
};

export default ReportFailureForm;
