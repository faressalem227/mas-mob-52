import { View, Text } from "react-native";
import React from "react";
import OperatingSystemLang from "../../constants/Lang/OperatingSystem/OperatingSystemLang";
import { useGlobalContext } from "../../context/GlobalProvider";
const ErrorMassege = ({ err, containerStyle }) => {
	const {Lang}=useGlobalContext
	return (
		<View className={`flex  items-center mt-4 h-[70vh] ${containerStyle}`}>
			<Text className="font-tbold text-center text-lg">
				{err ? err : OperatingSystemLang.NoData[Lang]}
			</Text>
		</View>
	);
};

export default ErrorMassege;
