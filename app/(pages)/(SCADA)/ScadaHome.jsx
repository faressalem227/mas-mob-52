import React, { useContext, useEffect } from "react";
import { useGlobalContext } from "../../../context/GlobalProvider";
import { useState } from "react";
import { SafeAreaView, View } from "react-native";
import SCADALang from "../../../constants/Lang/SCADA/SCADALang";
import {
	MainButton,
	WelcomeCard,
	Dropdown,
	MainLayout,
} from "../../../components";
import { useRouter } from "expo-router";
import { icons } from "../../../constants";
import BarcodeScannerComponent from "../../../components/BarcodeScan";

const ScadaHome = () => {
	const { DepartmentID,Lang } =
		useGlobalContext();
	const router = useRouter();
	return (
		<MainLayout title={SCADALang.PageTitle[Lang]}>
			<View className="bg-transparent ">
				<View className="flex flex-col mx-[16px] h-full justify-center ">
					<View className="mb-6">
						<MainButton
							title={SCADALang.SCADAAlerts[Lang]}
							icon={icons.ArrowCircleLeft}
							iconStyles={"w-8 h-8"}
							textStyles={"w-52 p-2"}
							handlePress={() => {
								router.navigate({
									pathname: "SCADA_Alerts",
									params: {
										DepartmentID: DepartmentID,
									},
								});
							}}
						/>
					</View>
					<View className="mb-9">
						<MainButton
							title={SCADALang.Tages[Lang]}
							icon={icons.ArrowCircleLeft}
							iconStyles={"w-8 h-8"}
							textStyles={"w-52 p-2"}
							handlePress={() => {
								router.navigate({
									pathname: "Tags",
									params: {
										DepartmentID: DepartmentID,
									},
								});
							}}
						/>
					</View>
					<View className="mb-10">
						<MainButton
							title={SCADALang.HistoricalData[Lang]}
							icon={icons.ArrowCircleLeft}
							iconStyles={"w-8 h-8"}
							textStyles={"w-52 p-2"}
							handlePress={() => {
								router.navigate({
									pathname: "HistoricalData",
									params: {
										DepartmentID: DepartmentID,
									},
								});
							}}
						/>
					</View>
				</View>
				<BarcodeScannerComponent onScan={(v) => {}} />
			</View>
		</MainLayout>
	);
};

export default ScadaHome;
