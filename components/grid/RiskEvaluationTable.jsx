import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Checkbox from "../UI/CheckBox"; // Ensure you have a Checkbox component
import Loader from "../UI/Loader";
import api from "../../utilities/api";
import { ScrollView } from "react-native";
import AssetHomeLang from "../../constants/Lang/AssetManagment/AssetHomeLang";
import { useGlobalContext } from "../../context/GlobalProvider";
const RiskEvaluationTable = ({ RiskID, setToast, onSucsess }) => {
	const [selectedOptions, setSelectedOptions] = useState({});
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const {Lang}=useGlobalContext();
	const getData = async () => {
		// setLoading(true);
		try {
			console.log(RiskID);
						console.log("jgfahjkgfkgsgashfgjfkagujafbgbouafgauo");

			const res = await api.get(`/risk?RiskID=${RiskID}`);
			console.log("API Response:", JSON.parse(res.data.data)); // Log the entire response for inspection
			setData(JSON.parse(res.data.data));
		} catch (err) {
						console.log("API Response:",res.data); // Log the entire response for inspection

						console.error("teststtssttsstfstdf")
			console.error("Error fetching data:", err.response.data);
		} finally {
			setLoading(false);
		}
	};

	const handleCheckboxChange = async (
		LikelihoodLevelTypeID,
		AnswerID,
		Selected
	) => {
		// setLoading(true);
		try {
			const res = await api.post(
				`/table?sp=api_am_asset_Likelihood_items_Upd`,
				{
					RiskID: RiskID,
					LikelihoodLevelTypeID: LikelihoodLevelTypeID,
					AnswerID: AnswerID,
					Selected: Selected,
				}
			);
			await getData();
			await onSucsess();
			setToast((prev) => ({
				type: "success",
				text1: "تم تحديث البيانات بنجاح",
				text2: "تم تحديث البيانات بنجاح",
				counter: prev.counter + 1,
			}));

			console.log("API Response:", res.data); // Log the entire response for inspection
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
	const { height, width } = Dimensions.get("screen");

	return (
		<>
			{loading ? (
				<Loader isLoading={loading}></Loader>
			) : (
				<>
					<View style={{ flex: 1 }}>
						<View
							className="flex flex-row items-center justify-around"
							style={styles.headerRow}>
							<Text className="text-base flex-1 text-center font-tmedium">
								{AssetHomeLang.EvaluationValue[Lang]} 
							</Text>
							<Text className="text-base flex-1  text-center font-tmedium">
							{AssetHomeLang.Selection[Lang]} 
							</Text>
							<Text className="text-base  flex-1   text-center font-tmedium">
								{AssetHomeLang.Item[Lang]}
							</Text>
						</View>
						<ScrollView style={{ flex: 1 }}>
							<View style={styles.container}>
								{data.map((item, index) => (
									<View
										key={index}
										style={[
											styles.row,
											index % 2 === 0
												? { backgroundColor: "#E4EDF2" }
												: { backgroundColor: "#Ffff" },
										]}>
										<View className="flex flex-1 flex-col flex-grow-[2]  justify-center  items-center">
											{item.options.map((option) => (
												<View className="flex flex-row-reverse mt-2 justify-center   items-center">
													<View
														className="flex-1  justify-center items-center border-b-[1px] py-1 border-[#cececf]"
														key={option.AnswerID}
														style={styles.optionContainer}>
														<Text className="text-sm text-center font-tmedium">
															{option.Answer}
														</Text>
													</View>
													<View className="flex-1  justify-center items-center">
														<Checkbox
															checkboxShape="circle"
															isEditable={true}
															value={option.Selected}
															onChange={(val) =>
																handleCheckboxChange(
																	item.LikelihoodLevelTypeID,
																	option.AnswerID,
																	val
																)
															}
														/>
													</View>
												</View>
											))}
										</View>

										<View style={styles.labelContainer}>
											<Text className="text-sm text-center font-tmedium">
												{item.QuestionToAsk}
											</Text>
										</View>
									</View>
								))}
							</View>
						</ScrollView>
					</View>
				</>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		paddingBottom: 16,
		// marginTop: 16,
	},
	headerRow: {
		// flexDirection: "row",
		// justifyContent: "space-between",
		// borderBottomWidth: 1,
		// borderBottomColor: "#ccc",
		height: 51,
		padding: 10,
		backgroundColor: "#F6F6F6",
	},
	headerText: {
		color: "#333",
		flex: 1,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 10,
	},
	labelContainer: {
		flex: 1,
	},
	// optionsContainer: {
	// 	flex: 1,
	// 	flexDirection: "column",
	// 	justifyContent: "center",
	// 	alignItems: "center",
	// 	textAlign: "center",
	// },
	// optionContainer: {
	// 	alignItems: "center",
	// 	marginVertical: 5,
	// },
});

export default RiskEvaluationTable;
