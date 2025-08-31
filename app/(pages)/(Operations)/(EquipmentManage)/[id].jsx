import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import {
	ErrorMassege,
	MainLayout,
	ScrollComponent,
	Table,
} from "../../../../components";
import { PopUpOper } from "../../../../components";
import api from "../../../../utilities/api";
import OperatingSystemLang from "../../../../constants/Lang/OperatingSystem/OperatingSystemLang";
import { useGlobalContext } from "../../../../context/GlobalProvider";
const DailyOperationAsset = () => {
	const [data, setData] = useState({});
	const [loading, setLoading] = useState(true);
	const [header, setHeader] = useState([]);
	const [toast, setToast] = useState({
		type: "",
		text1: "",
		text2: "",
		counter: 0,
	});
		const { DepartmentID,Lang} = useGlobalContext();
	const [lastKey, setLastKey] = useState(0);
	const [model, setModel] = useState(false);
	const { id } = useLocalSearchParams("id");
	const [submitting, setSubmitting] = useState(false);
	const [hourID, setHourID] = useState(1);
	function getObjectsByAssetID(data, assetID) {
		return data.filter((item) => {
			return item.AssetID == assetID;
		});
	}

	function mergeDigitKeyValuesWithZero(arr) {
		return arr.reduce((merged, obj) => {
			Object.keys(obj).forEach((key) => {
				if (/^\d+$/.test(key)) {
					// Check if the key is numeric
					// Initialize the array if the key does not exist
					if (!merged[key]) {
						merged[key] = [];
					}
					// navigate null with 0 and add the value to the array
					merged[key].push(obj[key] === null ? null : obj[key]);
				}
			});
			return merged;
		}, {});
	}
	function sortObjectByNumericKeys(obj) {
		// Extract numeric keys and sort them
		const sortedKeys = Object.keys(obj)
			.filter((key) => /^\d+$/.test(key)) // Filter numeric keys
			.sort((a, b) => Number(a) - Number(b)); // Sort numerically

		// Rebuild the object with sorted keys
		const sortedObj = {};
		sortedKeys.forEach((key) => {
			sortedObj[key] = obj[key];
		});

		return sortedObj;
	}
	//console.log(lastKey);
	const getData = async () => {
		try {
			const response = await api.get("/operation/assets");
			const assets = response.data.assets;

			const AssetData = getObjectsByAssetID(assets, id);

			setHeader([
				...AssetData.map((item) => item.OperationItemName).reverse(),
				"س",
			]);
			setData(sortObjectByNumericKeys(mergeDigitKeyValuesWithZero(AssetData)));
		} catch (error) {
			setToast({
				type: "error",

				text2: error.response.data.message
					? error.response.data.message
					: false,
				counter: toast.counter + 1,
			});
		} finally {
			setLoading(false);
		}
	};
	const submitData = async (data) => {
		//console.log(data);
		try {
			setSubmitting(true);
			await api.put(`/operation/assets`, data);
			setToast({
				type: "success",
				text2: OperatingSystemLang.entered[Lang],
				counter: toast.counter + 1,
				modal: true,
			});
			getData();
			setTimeout(() => {
				setModel(false);
			}, 1500);
		} catch (error) {
			setToast({
				type: "error",
				text2: error.response.data.message
					? error.response.data.message
					: false,
				counter: toast.counter + 1,
				modal: true,
			});
		} finally {
			setSubmitting(false);
		}
	};
	useEffect(() => {
		if (Object.keys(data).length > 0) {
			Object.keys(data).some((key) => {
				if (data[key].includes(null)) {
					setLastKey(key);
					return true;
				}
			});
		} else {
			setLastKey(1);
		}
	}, [data]);
	useEffect(() => {
		getData();
	}, []);

	return (
		<MainLayout
			toast={toast}
			loading={loading}
			title={OperatingSystemLang.daily[Lang]}>
			<ScrollComponent parentContainerStyle={"h-[85vh]"}>
				{Object.keys(data).length > 0 ? (
					<>
						<PopUpOper
							data={data[hourID.toString()]}
							AssetID={id}
							toast={toast}
							isLoading={submitting}
							handleSubmit={submitData}
							hourID={hourID}
							setModalVisible={setModel}
							modalVisible={model}></PopUpOper>

						<Table
							handlePress={(hourID) => {
								if (hourID > lastKey + 2) {
									setToast({
										type: "error",
										text1: OperatingSystemLang.modErr[Lang],
										text2:OperatingSystemLang.modErr1[Lang],
										counter: toast.counter + 1,
									});
									return false;
								}
								if (hourID > new Date().getHours() + 1) {
									//console.log(hourID, new Date().getHours());
									setToast({
										type: "error",
										text1: OperatingSystemLang.modErr[Lang],
										text2:OperatingSystemLang.modErr1[Lang],
										counter: toast.counter + 1,
									});
									return false;
								}

								setHourID(hourID);
								setModel(true);
							}}
							header={header}
							DailyOperationAsset={true}
							data={data}
						/>
					</>
				) : (
					<ErrorMassege></ErrorMassege>
				)}
			</ScrollComponent>
		</MainLayout>
	);
};

export default DailyOperationAsset;
