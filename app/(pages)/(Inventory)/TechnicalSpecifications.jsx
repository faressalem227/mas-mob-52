import { StyleSheet, View, Dimensions, Text } from "react-native";
import { router, useLocalSearchParams, useRouter } from "expo-router";
// import { colors, roles } from "../../../constants";
import { useDropDown } from "../../../hooks/useDropDownData";
import { Dropdown } from "../../../components";
import icons from "../../../constants";
import { useGlobalContext } from "../../../context/GlobalProvider";
import MainGrid from "../../../components/grid/MainGrid";
import { MainLayout } from "../../../components";
import { useEffect, useState } from "react";
import MainDataLang from "../../../constants/Lang/Invintory/MainDataLang";
const TechnicalSpecifications = ({
  title,
  hasLeftComponent = false,
  onDrawerPress,
}) => {
  const screenHeight = Dimensions.get("window").height;
  const { ItemID,GroupID } = useLocalSearchParams();
  const row = useLocalSearchParams();
  const router = useRouter();
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
  const { DepartmentID,Lang , Rtl} = useGlobalContext();
  const { data: Specification, loading: SpecificationLoader } = useDropDown(
    "api_sc_item_group_spec_list",
    {GroupID: GroupID, LangID: Lang},
    "GroupSpecID",
    "GroupAttribute"
  );
  return (
    <View style={styles.container}>
      <MainLayout title={MainDataLang.TechnicalSpecifications[Lang]}>
      <View className={`flex flex-col ${Rtl ? "rtl" : "ltr"} bg-[#F6F6F6] rounded-sm p-4 m-4`}>
      <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
      <Text className="w-[122px] text-base font-tmedium">{MainDataLang.ItemCode[Lang]}</Text>
            <Text className={`${width} text-basefont-tmedium`}>
              {row.ItemCode}
            </Text>
          </View>
					<View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
            <Text className="w-[122px] text-base font-tmedium">{MainDataLang.ItemName[Lang]}</Text>
            <Text className={`${width} text-basefont-tmedium`}>
              {row.ItemName}
            </Text>
          </View>
					<View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}>
            <Text className="w-[122px] text-base font-tmedium">{MainDataLang.Unit[Lang]}</Text>
            <Text className={`${width} text-basefont-tmedium text-left`}>
              {row.UnitName}
            </Text>
          </View>
        </View>
        <View style={[styles.assetsGrid, { height: screenHeight - 155 }]}>
          <MainGrid
            const
            tableHead={[
              {
                key: "ItemSpecID",
                label: MainDataLang.Code[Lang],
                type: "number",
                input: "false",
                visible: "false",
                width: 50,
              },
              {
                key: "GroupSpecID",
                label: MainDataLang.Specifications[Lang],
                type: "dropdown",
                options: Specification,
                input: "true",
                visible: "false",
              },
              {
                key: "GroupAttributeName",
                label: MainDataLang.Specifications[Lang],
                input: "false",
                visible: "true",
               
              },
              {
                key: "SpecValue",
                label: MainDataLang.Value[Lang],
                input: "true",
                visible: "true",
              },
              // {
              //   key: "Desc",
              //   label: MainDataLang.Statement[Lang],
              //   input: "true",
              //   visible: "true",
              // },
            ]}
            mixedWidth={true}
            pk={"ItemSpecID"}
            spTrx={"api_sc_item_specs_trx"}
            spIns={"api_Sc_Items_Spec_Ins"}
            spUpd={"api_Sc_Items_Spec_Upd"}
            spDel={"api_Sc_Items_Spec_Del"}
            TrxParam={[
              { name: "ItemID", value: ItemID },
              { name: "LangID", value: Lang },
            ]}
            DelParam={[
              { name: "ItemID", value: ItemID },
              { rowData: true, name: "ItemSpecID", value: "ItemSpecID" },
            ]}
            UpdBody={{ ItemID: ItemID }}
            InsBody={{ ItemID: ItemID }}
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

export default TechnicalSpecifications;
