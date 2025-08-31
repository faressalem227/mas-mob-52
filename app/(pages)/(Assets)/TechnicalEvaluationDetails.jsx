import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	Alert,
	ScrollView,
	Dimensions,
	SafeAreaView,
	TouchableOpacity,
	TouchableWithoutFeedback,
	ActivityIndicator,
} from "react-native";
import { Table, Row } from "react-native-table-component";
import AssetHomeLang from "../../../constants/Lang/AssetManagment/AssetHomeLang";
import { useGlobalContext } from "../../../context/GlobalProvider";
import InfoDetailes from "../../../components/UI/InfoDetailes";
import {
	MainLayout,
	MainButton,
	DatePickerInput,
	CheckBox,
	Dropdown,
} from "../../../components";
import { useRouter, useLocalSearchParams } from "expo-router";
import api from "../../../utilities/api";
import {
	HandleDropdownFormat,
	useDropDown,
} from "../../../hooks/useDropDownData";
import TechnicalEvaluationTable from "../../../components/grid/TechnicalEvaluationTable";
const TechnicalEvaluationDetails = ({ route }) => {
	const [data, setData] = useState({
		AssetID: "",
		AssetName: "",
		ConditionDate: "",
		Eval_name: "",
		Remarks: "",
		ConditionIndex: "",
	});
	const { AssetConditionID, AssetID } = useLocalSearchParams();
	const { Lang, Rtl, company } = useGlobalContext();
	const router = useRouter();
	const [MaintenanceData, setMaintenanceData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const screenHeight = Dimensions.get("window").height; // Get screen height dynamically
	const [toast, setToast] = useState({ text: "", type: "", counter: 0 });
	// Handle input changes for two-way binding
	const getTechnicalEvaluationDetails = async () => {
		try {
			const response = await api.get(
				`/table?sp=api_am_asset_conditions_ByID&AssetConditionID=${AssetConditionID}&CompanyID=${company}`
			);
			const data = response.data.data[0];
			setData(data);
		} catch (err) {
			setError(err.message || "Failed to fetch data");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		setLoading(true);
		getTechnicalEvaluationDetails();
	}, []);
	// Save updated data to the API

	const [windowWidth, setWindowWidth] = useState(
		Dimensions.get("window").width
	);

	const [width, setWidth] = useState();
	useEffect(() => {
		if (windowWidth < 800) {
			setWidth("w-48"); // Set width to 250 px
		} else {
			setWidth("w-[80%]"); // Set width to 80%
		}
	}, [windowWidth]);
	const detailsData = [
		{ label: AssetHomeLang.AssetCode[Lang], value: data.AssetName },
		{ label: AssetHomeLang.RatingDate[Lang], value: data.ConditionDate?.split("T")?.[0] },
		{ label: AssetHomeLang.EvaluationBodies[Lang], value: data.Eval_name },
		{ label: AssetHomeLang.TechnicalEvaluation[Lang], value: data.ConditionIndex },
	];
	return (
		<MainLayout
			toast={toast}
			loading={loading}
			title={AssetHomeLang.TechnicalEvaluationDetailes[Lang]}
			className="">
			<View className="bg-white flex-1 flex flex-col">
				<InfoDetailes
					details={detailsData}
					valueWidthClass="w-[60%]"
				/>
				<TechnicalEvaluationTable
					onSucsess={getTechnicalEvaluationDetails}
					setToast={setToast}
					AssetID={AssetID}
					AssetConditionID={AssetConditionID}
				/>
				
			</View>
		</MainLayout>
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
	TechnicalEvaluationDetailsGrid: {
		marginTop: 4,
		marginBottom: 68,
	},
});

export default TechnicalEvaluationDetails;
