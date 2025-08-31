import { StyleSheet, View, Dimensions } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
// import { colors, roles } from "../../../constants";
import icons from "../../../constants";
import { useGlobalContext } from "../../../context/GlobalProvider";
import MainGrid from "../../../components/grid/MainGrid";
import { MainLayout } from "../../../components";
import { useDropDown } from "../../../hooks/useDropDownData";
import InvintorySystemSettingLang from "../../../constants/Lang/Invintory/InvintorySystemSettingLang";
const AdditionalData = ({ title, hasLeftComponent = false, onDrawerPress }) => {
	const screenHeight = Dimensions.get("window").height;
	const { ProcessID } = useLocalSearchParams();
	const {Lang, company}=useGlobalContext();
	const { data: DataType, loading: DataTypeLoader } = useDropDown(
		"sc_datatypes_trx",
		{LangID: Lang},
		"value",
		"label"
	);
	return (
	<View style={styles.container}>
			<MainLayout title={InvintorySystemSettingLang.AdditionalData[Lang]}>
				<View style={[styles.assetsGrid, { flex: 1 }]}>
					<MainGrid
						tableHead={[
							{
								key: "AdditionID",
								label: InvintorySystemSettingLang.Code[Lang],
								type: "number",
								input: "false",
								visible: "false",
								width: 80,
							},
							{
								key: "AdditionNo",
								label: InvintorySystemSettingLang.Code[Lang],
								type: "number",
								input: "true",
								visible: "true",
								width: 50,
							},
							{
								key: "AdditionName",
								label:  InvintorySystemSettingLang.AdditionalStatement[Lang],
								input: "true",
								visible: "true",
							},
							{
								key: "DataTypeID",
								label:  InvintorySystemSettingLang.StatementType[Lang],
								type: "dropdown",
								options: DataType,
								input: "true",
								visible: "false",
							},
							{
								key: "DataTypeName",
								label: InvintorySystemSettingLang.StatementType[Lang],
								input: "false",
								visible: "true",
							},
							{
								key: "IsRequired",
								label:InvintorySystemSettingLang.Required[Lang],
								type: "checkbox",
								input: "true",
								visible: "true", 
							},
						]}
						dynamicCode={{
							tbName: "sc_addition",
							codeCol: "AdditionNo",
						}}
						mixedWidth={true}
						pk={"AdditionID"}
						spTrx={"api_sc_addition__Trx"}
						spIns={"api_sc_addition__ins"}
						spUpd={"api_sc_addition__Upd"}
						highlight={{
							col: "DataTypeName",
							bgcolor: "#9be19b",
							value: "DropDown",
						}}
						routeTo={{
							path: "/DataInvSettingDetails",
							hasParams: true,
							params: {},
							hasSpecialVal: true,
							specialVal: { col: "DataTypeID", value: 6 },
						}}
						spDel={"api_sc_addition__Del"}
						TrxParam={[{ name: "ProcessID", value: ProcessID },{ name: 'CompanyID', value: company }]}
						DelParam={[
							// { name: 'LocationID', value: DepartmentID },
							{ name: 'CompanyID', value: company },
							{ rowData: true, name: "AdditionID", value: "AdditionID" },
						]}
						UpdBody={{ ProcessID: ProcessID }}
						InsBody={{ ProcessID: ProcessID }}
						TrxDependency={[]}
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

export default AdditionalData;
