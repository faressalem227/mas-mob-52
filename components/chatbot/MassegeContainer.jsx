import { View, Text } from "react-native";
import React from "react";
import { useGlobalContext } from "../../context/GlobalProvider";
import { Image } from "react-native";
import { icons } from "../../constants";
export default function MassegeContainer({ role, content, notfication }) {
	const { user } = useGlobalContext();

	return (
		<View className={`w-full m-0 mt-4 grid    `}>
			<View
				className={`${
					role == "assistant"
						? "bg-[#E3F2FF]"
						: notfication
						? "bg-[#F6F6F6]"
						: "bg-[#F6F6F6] self-end"
				} gap-2 w-2/3 p-2 m-0 rounded-md `}>
				<View className=" font-tmedium flex-row-reverse items-center ">
					<Image
						source={role == "assistant" ? icons.HandShake : icons.User}
						className="w-5 h-5 ml-2"
					/>
					<Text
						className={`font-tmedium text-base ${
							role == "assistant" ? "mb-[2px]" : ""
						}`}>
						{role == "assistant" ? "المساعد ف الصيانة" : `${user.username}`}
					</Text>
				</View>
				<Text className="font-tregular leading-6">{content}</Text>
			</View>
		</View>
	);
}
