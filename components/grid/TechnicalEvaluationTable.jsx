import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import Checkbox from "../UI/CheckBox"; // Ensure you have a Checkbox component
import Loader from "../UI/Loader";
import api from "../../utilities/api";
import AssetHomeLang from "../../constants/Lang/AssetManagment/AssetHomeLang";
import { useGlobalContext } from "../../context/GlobalProvider";
const TechnicalEvaluationTable = ({
	AssetID,
	AssetConditionID,
	setToast,
	onSucsess,
}) => {
	const [selectedOptions, setSelectedOptions] = useState({});
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
    const {Lang, company}=useGlobalContext();
	const getData = async () => {
		try {
			const res = await api.get(
				`/techeval?AssetID=${AssetID}&AssetConditionID=${AssetConditionID}&CompanyID=${company}`
			);
			console.log("API Response:", JSON.parse(res.data.data));
			setData(JSON.parse(res.data.data));
		} catch (err) {
			console.error("Error fetching data:", err.response.data);
		} finally {
			setLoading(false);
		}
	};

	const handleCheckboxChange = async (
		ConditionQuestionID,
		ConditionAnswerID,
		Selected
	) => {
		try {
			const res = await api.post(
				`/table?sp=api_am_asset_conditions_items_Upd`,
				{
					AssetConditionID: AssetConditionID,
					ConditionQuestionID: ConditionQuestionID,
					ConditionAnswerID: ConditionAnswerID,
					Selected: Selected,
					CompanyID:company
				}
			);
			await getData();
			await onSucsess();
			setToast((prev) => ({
				type: "success",
				text1: AssetHomeLang.success[Lang],
				text2: AssetHomeLang.success[Lang],
				counter: prev.counter + 1,
			}));

			console.log("API Response:", res.data);
		} catch (err) {
			console.error("Error updating checkbox:", err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		setLoading(true);
		getData();
	}, []);

	const { height } = Dimensions.get("screen");

	return (
		<>
			{loading ? (
				<Loader isLoading={loading} />
			) : (
				<View style={{ flex: 1 }}>
					{/* Fixed Header */}
					<View style={styles.headerRow}>
						<Text style={styles.headerText} className="font-tmedium">{AssetHomeLang.EvaluationValue[Lang]} </Text>
						<Text style={styles.headerText} className="font-tmedium">{AssetHomeLang.Selection[Lang]}</Text>
						<Text style={styles.headerText} className="font-tmedium">{AssetHomeLang.Item[Lang]}</Text>
					</View>

					{/* Scrollable Content */}
					<ScrollView style={{ flex: 1 }}>
						<View style={styles.container}>
							{data.map((item, index) => (
								<View
									key={index}
									style={[
										styles.row,
										index % 2 === 0
											? { backgroundColor: "#E4EDF2" }
											: { backgroundColor: "#FFF" },
									]}>
									<View style={styles.optionsContainer}>
										{item.options.map((option) => (
											<View
												key={option.ConditionAnswerID}
												style={styles.optionContainer}>
												<Checkbox
													checkboxShape="circle"
													isEditable={true}
													value={option.Selected}
													onChange={(val) =>
														handleCheckboxChange(
															item.ConditionQuestionID,
															option.ConditionAnswerID,
															val
														)
													}
												/>
											</View>
										))}
									</View>
									<View style={styles.optionsContainer}>
										{item.options.map((option) => (
											<View
												key={option.ConditionAnswerID}
												style={styles.optionContainer}
												className="flex-1  justify-center items-center border-b-[1px] py-1 border-[#cececf]">
												<Text style={styles.optionText} className="font-tmedium">{option.Answer}</Text>
											</View>
										))}
									</View>
									<View style={styles.labelContainer}>
										<Text style={styles.optionText} className="font-tmedium">{item.Question}</Text>
									</View>
								</View>
							))}
						</View>
					</ScrollView>
				</View>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		// marginTop: 16,
		paddingBottom: 20,
	},
	headerRow: {
		flexDirection: "row",
		height: 51,
		padding: 10,
		backgroundColor: "#F6F6F6",
		alignItems: "center",
	},
	headerText: {
		flex: 1,
		textAlign: "center",
		color: "#333",
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		padding: 10,
	},
	labelContainer: {
		flex: 1,
	},
	optionsContainer: {
		flex: 1,
		flexDirection: "column",
	},
	optionContainer: {
		alignItems: "center",
		marginVertical: 5,
	},
	optionText: {
		textAlign: "center",
	},
});

export default TechnicalEvaluationTable;
