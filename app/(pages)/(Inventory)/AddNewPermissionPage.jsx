import { View, Text, Image, Alert, Pressable } from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import CrudButton from "../../../components/UI/CrudButton";
import { icons } from "../../../constants";
import { MainLayout } from "../../../components";
import Dropdown from "../../../components/UI/DropDown";
import { DatePickerInput } from "../../../components";
import { ScrollView } from "react-native";
import { MainButton } from "../../../components";
import { ScrollComponent } from "../../../components";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { FormField } from "../../../components";
import api from "../../../utilities/api";
import trashh from "../../../assets/images/trashh.png";
import AddNewPermission from "../../../constants/Lang/Invintory/AddNewPermission";
import { use } from "react";
import {
	HandleDropdownFormat,
	useDropDown,
} from "../../../hooks/useDropDownData";
import { useGlobalContext } from "../../../context/GlobalProvider";

const ItemComponent = ({
	i,
	num,
	orderItems,
	setOrderItems,
	GroupList,
	scProcess,
	processTypeID,
}) => {
	const [itemList, setItemList] = useState([]);
	const [UnitList, setUnitList] = useState([]);
	const {Rtl, Lang, company} = useGlobalContext()
	const [loading, setLoading] = useState(false);
	const fetchDropdownData = useCallback(async () => {
		try {
			setLoading(true);
			const response = await api.get(
				`/table?sp=api_Sc_Items__list2&GroupID=${i.GroupID}&CompanyID=${company}`
			);
			//("API Response:", response.data); // Log the entire response for inspection

			// Assuming response.data.data contains the array of sub-locations
			const subLocationList = response.data.data || [];

			if (Array.isArray(subLocationList)) {
				const list = HandleDropdownFormat(
					subLocationList,
					"ItemID",
					"ItemName"
				);
				//("5555", list);
				setItemList(list);
			} else {
				console.error(
					"Expected subLocationList to be an array, but got:",
					subLocationList
				);
			}
		} catch (err) {
			console.error("Error fetching dropdown data:", err);
		} finally {
			setLoading(false);
		}
	}, [i.GroupID]);

	const fetchDropdownDataUnit = useCallback(async () => {
		try {
			setLoading(true);
			const response = await api.get(
				`/table?sp=api_Sc_Items_Units_list&ItemID=${i.ItemID}&CompanyID=${company}`
			);
			//("API Response:", response.data); // Log the entire response for inspection

			// Assuming response.data.data contains the array of sub-locations
			const subLocationList = response.data.data || [];

			if (Array.isArray(subLocationList)) {
				const list = HandleDropdownFormat(subLocationList, "value", "label");
				//("5555", list);
				setUnitList(list);
			} else {
				console.error(
					"Expected subLocationList to be an array, but got:",
					subLocationList
				);
			}
		} catch (err) {
			console.error("Error fetching dropdown data:", err);
		} finally {
			setLoading(false);
		}
	}, [i.ItemID]);

	useEffect(() => {
		fetchDropdownData();
		fetchDropdownDataUnit();
	}, [fetchDropdownData, fetchDropdownDataUnit]);

    return (
        <View
            key={i?.ItemID}
            className="bg-[#fafafa] p-2 mb-4 rounded-lg m-3"
        >
					<View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
					<Text className="font-tbold text-lg mb-2">
                   {AddNewPermission.ItemDataTitle[Lang]} {i?.ItemID}
                </Text>
                <Pressable className="flex items-center justify-center p-2" onPress={() => { setOrderItems(orderItems.filter((item, index) => index !== num)) }}>
                    <Image
                        className="w-5 h-5"
                        source={trashh}
                    />
                </Pressable>
            </View>
            <View className="mb-4">
                <Dropdown
                    // parentStyle={"w-[62%]"}
                    title={AddNewPermission.Classification[Lang]}
                    placeholder={AddNewPermission.SelectClassification[Lang]}
                    value={i?.GroupID}
                    initailOption={i?.GroupID}
                    data={GroupList}
                    onChange={(v) => {
                        const updatedOrderDetails = orderItems.map((item, index) => {
                            if (index === num) {
                                return { ...item, GroupID: v };
                            }
                            //(item);

							return item;
						});
						//(updatedOrderDetails, "8888888888");

                        setOrderItems(updatedOrderDetails);
                    }}
                />
            </View>
            <View className="mb-4">
                <Dropdown
                    title={AddNewPermission.ItemName[Lang]}
                    data={itemList}
                    value={i?.ItemID}
                    initailOption={i?.ItemID}
                    // defaultOption={{ key: i?.ItemID ? parseInt(i?.ItemID) : "", value: i?.ItemName ? i?.ItemName : "" }}
                    placeholder={AddNewPermission.SelectItem[Lang]}
                    onChange={
                        (v) => {
                            const updatedOrderDetails = orderItems.map((item, index) => {
                                if (index === num) {
                                    return { ...item, ItemID: v, ItemName: itemList.find((i) => i.key == v)?.value };
                                }
                                //(item);

							return item;
						});
						//(updatedOrderDetails, "8888888888");

                            setOrderItems(updatedOrderDetails);
                        }
                    }
                />

            </View>
            <View className="mb-4">
                <Dropdown
                    title={AddNewPermission.Unit[Lang]}
                    data={UnitList}
                    value={i?.UnitID}
                    // initailOption={parseInt(i?.ItemID)}
                    defaultOption={{ key: i?.UnitID ? i?.UnitID : "", value: i?.UnitName ? i?.UnitName : "" }}
                    placeholder={AddNewPermission.SelectUnit[Lang]}
                    onChange={
                        (v) => {
                            const updatedOrderDetails = orderItems.map((item, index) => {
                                if (index === num) {
                                    return { ...item, UnitID: v, UnitName: itemList.find((i) => i.key == v)?.value };
                                }
                                console.log(v);
                                
                                //(item);

							return item;
						});
						//(updatedOrderDetails, "8888888888");

						setOrderItems(updatedOrderDetails);
					}}
				/>
			</View>
			{/* <View className="flex-row gap-1 justify-between items-center p-2 mr-2">
            <MainButton
                containerStyles="w-24"
                icon={icons.Scan}
            />
            <Text>أو قم بتصوير الصنف</Text>
            </View> */}
			{/* <View className="mb-4">
            <FormField
                value={i?.ItemCode}
                title={"كود الصنف"}
                handleChangeText={(v) => {
                    //(v);
                    
                }}
                placeholder={"ادخل الكود"}
            />
            </View> */}
			{/* <View className="mb-4">
            {/* <Dropdown
                title={"حالة الصنف"}
                // data={classificationStatus}
                placeholder={"اختر حالة الصنف"}
            /> 
            </View> */}
			<View className="mb-4">
				<FormField
					value={`${i?.Qty}`}
					title={AddNewPermission.Quantity[Lang]}
					placeholder={AddNewPermission.EnterQuantity[Lang]}
					numeric="numeric"
					handleChangeText={(v) => {
						const updatedOrderDetails = orderItems.map((item, index) => {
							if (index === num) {
								return { ...item, Qty: v };
							}
							//(item);

							return item;
						});
						//(updatedOrderDetails, "8888888888");

						setOrderItems(updatedOrderDetails);
					}}
					//placeholder={"ادخل الكمية"}
				/>
			</View>
			{scProcess.UseGard && processTypeID && (
				<View className="mb-4">
					<FormField
						value={`${i?.Qty2 ? i?.Qty2 : ""}`}
						title={AddNewPermission.Quantity2[Lang]}
						keyboardType="numeric"
						numeric={true}
						handleChangeText={(v) => {
							const updatedOrderDetails = orderItems.map((item, index) => {
								if (index === num) {
									return { ...item, Qty2: v };
								}
								//(item);

								return item;
							});
							//(updatedOrderDetails, "8888888888");

							setOrderItems(updatedOrderDetails);
						}}
						placeholder={AddNewPermission.EnterQuantity2[Lang]}
					/>
				</View>
			)}
			<View className="mb-4">
				<FormField
					value={`${i?.UnitCost}`}
					title={AddNewPermission.Unit[Lang]}
					keyboardType="numeric"
					numeric={true}
					handleChangeText={(v) => {
						const updatedOrderDetails = orderItems.map((item, index) => {
							if (index === num) {
								return { ...item, UnitCost: v };
							}
							//(item);

							return item;
						});
						//(updatedOrderDetails, "8888888888");

						setOrderItems(updatedOrderDetails);
					}}
					placeholder={AddNewPermission.EnterUnitPrice[Lang]}
				/>
			</View>
			{/* <View className="mb-4"></View> */}
			<FormField
				value={`${i?.UnitCost * i?.Qty}`}
				title={AddNewPermission.Total[Lang]}
				handleChangeText={(e) => {
					//(e);
				}}
				editable={false}
				placeholder={AddNewPermission.EnterUnitPrice[Lang]}
			/>
		</View>
	);
};

function AddNewPermissionPage() {
	const { processTypeID, type, processID, processLabel } =
		useLocalSearchParams();
	const { DepartmentID, user, company } = useGlobalContext();
	const [orderItems, SetOrderItems] = useState([]);
	const [date, setDate] = useState(null);
	const Order = useLocalSearchParams();
	const [scProcess, setSCProcess] = useState({});
	const [loading, setLoading] = useState(false);
	const [assetClassList, setAssetClassList] = useState(false);
	const [assetList, setAssetList] = useState(false);
	const [contractorList, setContractorList] = useState(false);
	const [processValue, setProcessValue] = useState(false);
	const [employeeList, setEmployeeList] = useState(false);
	const [ParityList, setParityList] = useState(false);
	const [DepartmentList, setDepartmentList] = useState(false);
	const [SupplierList, setSupplierList] = useState(false);
	const [WorkorderList, setWorkorderList] = useState(false);
	const {Lang, Rtl} = useGlobalContext()

	const [data, setData] = useState(
		Order.OrderID
			? {
					OrderID: Order.OrderID,
					OrderNo: Order.OrderNo,
					OrderDate: Order.OrderDate,
					OrderDescription: Order.OrderDescription,
					ProcessID: Order.ProcessID,
					EntityID: Order.EntityID,
					ParityID: Order.ParityID,
					EmployeeID: Order.EmployeeID,
					AssetID: Order.AssetID,
					AssetClassID: Order.AssetClassID,
					SupplierID: Order.SupplierID,
					WorkorderID: Order.WorkorderID,
					DepartmentID: Order.DepartmentID,
					ContractorID: Order.ContractorID,
					UserName: user.username,
			  }
			: {
					OrderID: "",
					OrderNo: "",
					OrderDate: "",
					OrderDescription: "",
					ProcessID: processID,
					EntityID: 3,
					ParityID: "",
					EmployeeID: "",
					AssetID: "",
					AssetClassID: "",
					SupplierID: "",
					WorkorderID: "",
					DepartmentID: "",
					ContractorID: "",
			  }
	);

	//(Order.SectionID, "7777777777777");

	//(data.OrderDate?.split("T")[0]);

	const handleAddNewItem = () => {
		SetOrderItems([
			...orderItems,
			{
				ItemID: "",
				Qty: "",
				UnitCost: "",
				UnitName: "",
				GroupID: "",
				SectionID: Order.SectionID,
			},
		]);
	};

	const handleInsData = async () => {
		try {
			//(data);
			const response = await api.post(
				"/table?sp=api_Sc_Order__Order_Details_ins",
				{
					...data,
					LocationID: DepartmentID,
					SectionID: Order.SectionID,
					CompanyID:company,
					OrderDetails: JSON.stringify(orderItems),
				}
			);
			//(response.data);
			router.back();
			// Alert.alert("تم الإضافة بنجاح");
		} catch (err) {
			console.error("Error fetching order items data:", err);
		}
	};
	const handleUpdData = async () => {
		try {
			//(data);
			const response = await api.put(
				`/table?sp=api_Sc_Order__Order_Details_upd`,
				{
					...data,
					LocationID: DepartmentID,
					SectionID: Order.SectionID,
					CompanyID:company,
					OrderDetails: JSON.stringify(orderItems),
				}
			);
			//(response.data);
			router.back();
		} catch (err) {
			console.error("Error fetching order items data:", err);
		}
	};

	const fetchOrderItems = useCallback(async () => {
		try {
			//(Order);

			//(Order.OrderID);

			const response = await api.get(
				`/table?sp=api_Sc_Orders_Details_Trx&OrderID=${Order.OrderID}`
			);
			const orderItems = response.data.data || [];
			//(orderItems);

			SetOrderItems(orderItems);
		} catch (err) {
			console.error("Error fetching order items data:", err);
		}
	});

	if (type == 2) {
		useEffect(() => {
			fetchOrderItems();
		}, []);
	}
	// const { data: ProcessList, loading: ProcessListLoader } = useDropDown(
	//     "api_Sc_Process_List2",
	//     { CompanyID: 1, ProcessTypeID: processTypeID },
	//     "ProcessID",
	//     "ProcessName"
	// );
	const { data: GroupList, loading: GroupListLoader } = useDropDown(
		"api_ms_Item_Group_List2",
		{  SectionID: Order.SectionID },
		"GroupID",
		"GroupName"
	);
	//(Order.SectionID);

	//(GroupList);

	const titles = {
		1: " إذن رصيد أول المدة",
		2: " إذن إضافة",
		3: " إذن صرف",
		4: " إذن تحويل",
		5: " إذن جرد",
	};

	const pageTitle = `إذن ${processLabel}`;

	const getSCProcess = async () => {
		const res = await api.get(
			`/table?sp=api_sc_process_optoins_List&LangID=2&ProcessID=${data.ProcessID}`
		);
		//console.log(res.data.data[0].value);

		setSCProcess(res.data.data[0]);
	};
	const getProcessList = async () => {
		if (scProcess) {
			//console.log(scProcess.value);
			// if (scProcess.UseAssetClassID) {
			// 	try {
			// 		setLoading(true);
			// 		const response = await api.get(`/table?sp=am_AssetClass_List`);
			// 		//("API Response:", response.data); // Log the entire response for inspection

			// 		// Assuming response.data.data contains the array of sub-locations
			// 		const subLocationList = response.data.data || [];

			// 		if (Array.isArray(subLocationList)) {
			// 			const list = HandleDropdownFormat(
			// 				subLocationList,
			// 				"AssetClassID",
			// 				"AssetClassNameEn"
			// 			);
			// 			//("5555", list);
			// 			setAssetClassList(list);
			// 		} else {
			// 			console.error(
			// 				"Expected subLocationList to be an array, but got:",
			// 				subLocationList
			// 			);
			// 		}
			// 	} catch (err) {
			// 		console.error("Error fetching dropdown data:", err);
			// 	} finally {
			// 		setLoading(false);
			// 	}
			// }
			if (scProcess.value==14) {
				try {
					setLoading(true);
					const response = await api.get(`/table?sp=api_Sc_Asset_List2&CompanyID=${company}`);
					const subLocationList = response.data.data || [];

					if (Array.isArray(subLocationList)) {
						const list = HandleDropdownFormat(
							subLocationList,
							"AssetID",
							"AssetName"
						);
						setAssetList(list);
					} else {
						console.error(
							"Expected subLocationList to be an array, but got:",
							subLocationList
						);
					}
				} catch (err) {
					console.error("Error fetching dropdown data:", err);
				} finally {
					setLoading(false);
				}
			}
			if (scProcess.value==4) {
				try {
					setLoading(true);
					const response = await api.get(`/table?sp=Sc_Contractor_List&CompanyID=${company}`);
					//   console.log("API Response:", response.data); // Log the entire response for inspection

					// Assuming response.data.data contains the array of sub-locations
					const subLocationList = response.data.data || [];

					if (Array.isArray(subLocationList)) {
						const list = HandleDropdownFormat(
							subLocationList,
							"ContractorID",
							"ContractorName"
						);
						// console.log(list, 5555555555555555555555);

						// console.log("5555", list);
						setContractorList(list);
					} else {
						console.error(
							"Expected subLocationList to be an array, but got:",
							subLocationList
						);
					}
				} catch (err) {
					console.error("Error fetching dropdown data:", err);
				} finally {
					setLoading(false);
				}
			}
			if (scProcess.value==5) {
				try {
					setLoading(true);
					const response = await api.get(`/table?sp=Sc_Employee_List&CompanyID=${company}`);
					//   console.log("API Response:", response.data); // Log the entire response for inspection

					// Assuming response.data.data contains the array of sub-locations
					const subLocationList = response.data.data || [];

					if (Array.isArray(subLocationList)) {
						const list = HandleDropdownFormat(
							subLocationList,
							"EmployeeID",
							"EmployeeName"
						);
						// console.log(list, 5555555555555555555555);

						// console.log("5555", list);
						setEmployeeList(list);
					} else {
						console.error(
							"Expected subLocationList to be an array, but got:",
							subLocationList
						);
					}
				} catch (err) {
					console.error("Error fetching dropdown data:", err);
				} finally {
					setLoading(false);
				}
			}
			if (scProcess.value==8) {
				try {
					setLoading(true);
					const response = await api.get(`/table?sp=Sc_Parity_List&CompanyID=${company}`);
					//   console.log("API Response:", response.data); // Log the entire response for inspection

					// Assuming response.data.data contains the array of sub-locations
					const subLocationList = response.data.data || [];

					if (Array.isArray(subLocationList)) {
						const list = HandleDropdownFormat(
							subLocationList,
							"ParityID",
							"ParityName"
						);
						// console.log(list, 5555555555555555555555);

						// console.log("5555", list);
						setParityList(list);
					} else {
						console.error(
							"Expected subLocationList to be an array, but got:",
							subLocationList
						);
					}
				} catch (err) {
					console.error("Error fetching dropdown data:", err);
				} finally {
					setLoading(false);
				}
			}
			if (scProcess.value==13) {
				try {
					setLoading(true);
					const response = await api.get(`/table?sp=Sc_Department_List&CompanyID=${company}`);
					//   console.log("API Response:", response.data); // Log the entire response for inspection

					// Assuming response.data.data contains the array of sub-locations
					const subLocationList = response.data.data || [];

					if (Array.isArray(subLocationList)) {
						const list = HandleDropdownFormat(
							subLocationList,
							"DepartmentID",
							"DepartmentName"
						);
						// console.log(list, 5555555555555555555555);

						// console.log("5555", list);
						setDepartmentList(list);
					} else {
						console.error(
							"Expected subLocationList to be an array, but got:",
							subLocationList
						);
					}
				} catch (err) {
					console.error("Error fetching dropdown data:", err);
				} finally {
					setLoading(false);
				}
			}
			if (scProcess.value==2) {
				try {
					setLoading(true);
					const response = await api.get(`/table?sp=Sc_Suppliers_List&CompanyID=${company}`);
					//   console.log("API Response:", response.data); // Log the entire response for inspection

					// Assuming response.data.data contains the array of sub-locations
					const subLocationList = response.data.data || [];

					if (Array.isArray(subLocationList)) {
						const list = HandleDropdownFormat(
							subLocationList,
							"SupplierID",
							"SupplierName"
						);
						// console.log(list, 5555555555555555555555);

						// console.log("5555", list);
						setSupplierList(list);
					} else {
						console.error(
							"Expected subLocationList to be an array, but got:",
							subLocationList
						);
					}
				} catch (err) {
					console.error("Error fetching dropdown data:", err);
				} finally {
					setLoading(false);
				}
			}
			if (scProcess.value==6) {
				try {
					setLoading(true);
					const response = await api.get(`/table?sp=api_Sc_Workorder_List&LocationID=${DepartmentID}&CompanyID=${company}`);
					//   console.log("API Response:", response.data); // Log the entire response for inspection

					// Assuming response.data.data contains the array of sub-locations
					const subLocationList = response.data.data || [];

					if (Array.isArray(subLocationList)) {
						const list = HandleDropdownFormat(
							subLocationList,
							"WorkorderID",
							"WorkorderName"
						);
						// console.log(list, 5555555555555555555555);

						// console.log("5555", list);
						setWorkorderList(list);
					} else {
						console.error(
							"Expected subLocationList to be an array, but got:",
							subLocationList
						);
					}
				} catch (err) {
					console.error("Error fetching dropdown data:", err);
				} finally {
					setLoading(false);
				}
			}
		}
	};

	//   useFocusEffect(
	//     useCallback(() => {
	//       setRefetch((prevRefetch) => prevRefetch + 1);
	//     }, [])
	//   );

	useEffect(() => {
		if (data.ProcessID) {
			getSCProcess();
		}
	}, [data.ProcessID]);

	useEffect(() => {
		if (scProcess) {
			getProcessList();
		}
	}, [scProcess]);

	const getNextCode = async () => {
		try {
			if (type != 2) {
				setLoading(true);
				//();

				const response = await api.get(
					`/table?sp=GetNextCodeForTable&TableName=Sc_Orders&CodeFieldName=OrderNo`
				);
				//(response, "999");
				let Code = response.data.data[0].NextCode;
				//(Code,"7777");

				setData({ ...data, OrderNo: Code });
			}
		} catch (err) {
			setError(err.message || "Failed to fetch data");
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		getNextCode();
	}, []);
	return (
		<MainLayout
			title={`${processLabel}`}
			loading={loading}>
			<ScrollView className="mb-6">
				<View className="bg-[#fafafa] p-2 mb-4 rounded-lg m-3">
					<Text className="font-tbold text-lg mb-2" ا>{AddNewPermission.permissionDataTitle[Lang]}</Text>
					<View className="mb-4">
						<FormField
							value={`${data?.OrderNo}`}
							editable={false}
							title={AddNewPermission.PermissionNumber[Lang]}
							handleChangeText={(e) => {
								//(e);
							}}
							placeholder={AddNewPermission.EnterPermissionNumber[Lang]}
						/>
					</View>
					{/* <View className="mb-4">
                        {/* <Dropdown
                            // parentStyle={"w-[62%]"}
                            title={"نوع الإذن"}
                            placeholder={"اختر نوع الإذن"}
                            data={ProcessList}
                            value={processID}
                            onChange={(v) => setData({ ...data, ProcessID: v })}
                            initailOption={parseInt(data.ProcessID)}
                        /> */}
					{/* </View> */}
					{/* {scProcess.UseAssetClassID && assetClassList && (
						<View className="mb-4">
							<Dropdown
								// parentStyle={"w-[62%]"}
								title={"تصنيف الأصول"}
								placeholder={"تصنيف الأصول"}
								data={assetClassList}
								value={data.AssetClassID}
								onChange={(v) => setData({ ...data, AssetClassID: v })}
								initailOption={parseInt(data.AssetClassID)}
							/>
						</View>
					)} */}
					{scProcess.value==14 && assetList && (
						<View className="mb-4">
							<Dropdown
								// parentStyle={"w-[62%]"}
								title={AddNewPermission.Asset[Lang]}
								placeholder={AddNewPermission.Asset[Lang]}
								data={assetList}
								value={data.AssetID}
								onChange={(v) => setData({ ...data, AssetID: v })}
								initailOption={parseInt(data.AssetID)}
							/>
						</View>
					)}
					{scProcess.value==2 && SupplierList && (
						<View className="mb-4">
							<Dropdown
								// parentStyle={"w-[62%]"}
								title={AddNewPermission.Supplier[Lang]}
								placeholder={AddNewPermission.Supplier[Lang]}
								data={SupplierList}
								value={data.SupplierID}
								onChange={(v) => setData({ ...data, SupplierID: v })}
								initailOption={parseInt(data.SupplierID)}
							/>
						</View>
					)}
					{scProcess.value==4 && contractorList && (
						<View className="mb-4">
							<Dropdown
								// parentStyle={"w-[62%]"}
								title={AddNewPermission.Contractor[Lang]}
								placeholder={AddNewPermission.Contractor[Lang]}
								data={contractorList}
								value={data.ContractorID}
								onChange={(v) => setData({ ...data, ContractorID: v })}
								initailOption={parseInt(data.ContractorID)}
							/>
						</View>
					)}
					{scProcess.value==5 && employeeList && (
						<View className="mb-4">
							<Dropdown
								// parentStyle={"w-[62%]"}
								title={AddNewPermission.Employee[Lang]}
								placeholder={AddNewPermission.Employee[Lang]}
								data={employeeList}
								value={data.EmployeeID}
								onChange={(v) => setData({ ...data, EmployeeID: v })}
								initailOption={parseInt(data.EmployeeID)}
							/>
						</View>
					)}
					{scProcess.value==8 && ParityList && (
						<View className="mb-4">
							<Dropdown
								// parentStyle={"w-[62%]"}
								title={AddNewPermission.Parity[Lang]}
								placeholder={AddNewPermission.Parity[Lang]}
								data={ParityList}
								value={data.ParityID}
								onChange={(v) => setData({ ...data, ParityID: v })}
								initailOption={parseInt(data.ParityID)}
							/>
						</View>
					)}
					{scProcess.value==13 && DepartmentList && (
						<View className="mb-4">
							<Dropdown
								// parentStyle={"w-[62%]"}
								title={AddNewPermission.Department[Lang]}
								placeholder={AddNewPermission.Department[Lang]}
								data={DepartmentList}
								value={data.DepartmentID}
								onChange={(v) => setData({ ...data, DepartmentID: v })}
								initailOption={parseInt(data.DepartmentID)}
							/>
						</View>
					)}
					{scProcess.value==6 && WorkorderList && (
						<View className="mb-4">
							<Dropdown
								// parentStyle={"w-[62%]"}
								title={AddNewPermission.Workorder[Lang]}
								placeholder={AddNewPermission.Workorder[Lang]}
								data={WorkorderList}
								value={data.WorkorderID}
								onChange={(v) => setData({ ...data, WorkorderID: v })}
								initailOption={parseInt(data.WorkorderID)}
							/>
						</View>
					)}
					<View className="mb-4">
						<DatePickerInput
							setDate={(v) => setData({ ...data, OrderDate: v })}
							title={AddNewPermission.PermissionDate[Lang]}
							defaultDate={data.OrderDate?.split("T")[0]}
						/>
						{/* {processTypeID != 1 && <Dropdown
                        // parentStyle={"w-[62%]"}
                        title={" الجهة"}
                        placeholder={"اختر الجهة"}
                        data={[]}
                        value={data.ParityID}
                        onChange={(v) => setData({...data, ParityID: v})}
                    />} */}
					</View>
					<View>
						<FormField
							value={data.OrderDescription}
							title={AddNewPermission.Description[Lang]}
							handleChangeText={(e) => {
								setData({ ...data, OrderDescription: e });
							}}
							placeholder={AddNewPermission.EnterDescription[Lang]}
						/>
					</View>
				</View>

				{/* Dynamic Boxes */}
				{orderItems.map((i, num) => {
					return (
						<ItemComponent
							processTypeID={processTypeID}
							scProcess={scProcess}
							i={i}
							num={num}
							orderItems={orderItems}
							GroupList={GroupList}
							setOrderItems={SetOrderItems}
						/>
					);
				})}

				<View className="px-4 mb-4">
					<CrudButton
						title={AddNewPermission.CrudButtonLabel[Lang]}
						Icon={icons.AddOutline}
						width={140}
						onPress={handleAddNewItem}
						Rtl={Rtl}
					/>
				</View>

				<View className="px-4 mb-6">
					<MainButton
						icon={icons.ArrowCircleLeft}
						iconStyles={"mr-2 mt-1"}
						title={type == 1 ? AddNewPermission.MainBtnLblIns[Lang] : AddNewPermission.MainBtnLblUpd[Lang]}
						handlePress={type == 1 ? handleInsData : handleUpdData}
					/>
				</View>
			</ScrollView>
		</MainLayout>
	);
}

export default AddNewPermissionPage;
