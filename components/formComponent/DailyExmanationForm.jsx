import { View, Text } from "react-native";
import React from "react";
import { useState } from "react";
import FormField from "../UI/FormField";
import MainButton from "../UI/MainButton";
import Dropdown from "../UI/DropDown";
import DatePickerInput from "../UI/DatePickerInput";
import {
	getFormattedLocalDate,
	cairoTimeConverter,
} from "../../utils/dateFormater";
import { icons } from "../../constants";
export default function DailyExmanationForm({
	options,

	submitData,
}) {
	const [formdata, setFormData] = useState({
		CheckDate: `${getFormattedLocalDate(cairoTimeConverter(new Date()))}`,
		AssetID: "",
		WorksDone: "",
		CheckRemarks: "",
	});
	const [buttonLoading, setButtonLoading] = useState(false);

	return (
		<>
			<View className="pt-4 pb-6 px-4 mx-auto">
				<DatePickerInput
					setDate={(value) => {
						setFormData({ ...formdata, CheckDate: value });
					}}
				/>
			</View>
			<View className="pb-6 px-4 ">
				<Dropdown
					title={"المعدة"}
					data={options}
					placeholder={"اختر المعدة"}
					onChange={(key) => {
						setFormData({ ...formdata, AssetID: key });
					}}></Dropdown>
			</View>
			<View className="pb-6 px-4 ">
				<FormField
					value={formdata.ch_done}
					handleChangeText={(value) => {
						setFormData({ ...formdata, WorksDone: value });
					}}
					title={"الاعمال التي تمت"}
					placeholder={"ادخل الاعمال التي تمت"}></FormField>
			</View>
			<View className="pb-6 px-4">
				<FormField
					value={formdata.notes}
					handleChangeText={(value) => {
						setFormData({ ...formdata, CheckRemarks: value });
					}}
					title={"الملاحظات"}
					placeholder={"ادخل الملاحظات"}></FormField>
			</View>

			<View className="pb-6 px-3">
				<MainButton
					isLoading={buttonLoading}
					icon={icons.ArrowUpRight}
					iconStyles={"mr-4"}
					containerStyles={"mt-4  "}
					title={"حفظ"}
					handlePress={() => {
						submitData(formdata, setButtonLoading);
					}}></MainButton>
			</View>
		</>
	);
}
