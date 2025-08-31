import { View } from "react-native";
import React from "react";
import { icons } from "../../constants";
import { useState } from "react";
import FormField from "../UI/FormField";
export default function SubmitFormAiChat({ buttonDisabled, sendMassege }) {
	const [query, setQuery] = useState("");
	return (
		<View className={` p-4 `}>
			<FormField
				disableChat={buttonDisabled}
				handlePress={() => {
					if (sendMassege(query)) {
						setQuery("");
					}
				}}
				placeholder={"ارسال"}
				inputIcon={icons.ArrowUp}
				haveTitle={false}
				value={query}
				handleChangeText={(value) => {
					setQuery(value);
				}}
			/>
		</View>
	);
}
