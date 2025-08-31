import { View } from "react-native";
import React from "react";
import Dropdown from "../UI/DropDown";
import FormField from "../UI/FormField";
import icons from "../../constants/icons";
import MainButton from "../UI/MainButton";
export default function ChatBotStartUp({
	setAssets,
	dropdownOptions,
	failureDescription,
	setfailureDescription,
	startChatBot,
}) {
	return (
		<View className=" flex  gap-6  p-4 pt-6">
			<View>
				<Dropdown
					title={"المعدة"}
					data={dropdownOptions}
					placeholder={"اختر المعدة"}
					onChange={(key) => {
						setAssets(key);
					}}></Dropdown>
			</View>

			<View>
				<FormField
					inputStyle={"leading-7"}
					value={failureDescription}
					handleChangeText={(value) => {
						setfailureDescription(value);
					}}
					title={"وصف العطل"}
					placeholder={"ادخل وصف العطل"}></FormField>
			</View>

			<View>
				<MainButton
					icon={icons.ArrowUp}
					iconStyles={"mr-4"}
					containerStyles={"mt-8"}
					title={"ارسال"}
					handlePress={startChatBot}></MainButton>
			</View>
		</View>
	);
}
