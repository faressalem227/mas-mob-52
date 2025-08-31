import { StyleSheet, View, Dimensions } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
// import { colors, roles } from "../../../constants";
import icons from "../../../constants";
import { useGlobalContext } from "../../../context/GlobalProvider";
import MainGrid from "../../../components/grid/MainGrid";
import { MainLayout } from "../../../components";
import InvintorySystemSettingLang from "../../../constants/Lang/Invintory/InvintorySystemSettingLang";
import { useDropDown } from "../../../hooks/useDropDownData";
const InvintoryOperations = ({
	title,
	hasLeftComponent = false,
	onDrawerPress,
}) => {
	const screenHeight = Dimensions.get("window").height;
	const { DepartmentID, Lang, company, user } = useGlobalContext();

	const { data: processList } = useDropDown(
		"api_sc_Process_List3",
		{ UserName: "host", LangID: 1 },
		"value",
		"label"
	);
	const { data: processtypelist } = useDropDown(
		"api_Sc_ProcessType_List1",
		{ j: "" },
		"value",
		"label"
	);

	return (
	<View style={styles.container}>
			<MainLayout title={InvintorySystemSettingLang.InvintoryOperations[Lang]}>
				<View style={[styles.assetsGrid, { height: screenHeight }]}>
					<MainGrid
						const
						tableHead={[
							{
								key: "ProcessID",
								label: InvintorySystemSettingLang.Code[Lang],
								type: "number",
								input: "false",
								visible: "false",
								width: 100,
							},
							{
								key: "ProcessCode",
								label: InvintorySystemSettingLang.Code[Lang],
								type: "number",
								input: "true",
								visible: "true",
								width: 100,
							},
							{
								key: "ProcessName",
								label: InvintorySystemSettingLang.OperationName[Lang],
								input: "true",
								visible: "true",
								width: 100,
							},
							{
								key: "ProcessTypeID",
								label: InvintorySystemSettingLang.OperationType[Lang],
								type: "dropdown",
								input: "true",
								options: processtypelist,
								visible: "false",
								width: 100,
							},
							{
								key: "ProcessTypeName",
								label: InvintorySystemSettingLang.OperationType[Lang],
								type: "dropdown",
								input: "false",
								visible: "true",
								width: 100,
							},
							{
								key: "NextProcessID",
								label: InvintorySystemSettingLang.NextOperation[Lang],
								type: "dropdown",
								input: "true",
								options: processList,
								visible: "false",
								width: 100,
							},
							{
								key: "NextProcessName",
								label: InvintorySystemSettingLang.NextOperation[Lang],
								type: "text",
								input: "false",
								visible: "true",
								width: 100,
							},
							{
								key: "NextProcessTitleAr",
								label: InvintorySystemSettingLang.NextOperationAr[Lang],
								input: "true",
								visible: "true",
								width: 150,
							},
							{
								key: "NextProcessTitleEn",
								label: InvintorySystemSettingLang.NextOperationEn[Lang],
								input: "true",
								visible: "true",
								width: 160,
							},
						]}
						dynamicCode={{
							tbName: "Sc_Process",
							codeCol: "ProcessCode",
						}}
						StaticWidth={true}
						pk={"ProcessID"}
						spTrx={"api_Sc_Process_Trx2"}
						spIns={"api_Sc_Process_Ins"}
						spUpd={"api_Sc_Process_Upd"}
						spDel={"api_Sc_Process_Del"}
						TrxParam={[{ name: "CompanyID", value: 1 }]}
						DelParam={[
							{ name: "LocationID", value: DepartmentID },
							{ name: "CompanyID", value: 1 },
							{ rowData: true, name: "ProcessID", value: "ProcessID" },
						]}
						UpdBody={{ LocationID: DepartmentID, CompanyID: 1 }}
						InsBody={{ LocationID: DepartmentID, CompanyID: 1 }}
						TrxDependency={[]}
						routeTo={{
							path: "/InvintoryOperationsDetailes",
							hasParams: true,
						}}
					/>
				</View>
			</MainLayout>
		</View>
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
	assetsGrid: {
		marginVertical: 8,
	},
});

export default InvintoryOperations;
