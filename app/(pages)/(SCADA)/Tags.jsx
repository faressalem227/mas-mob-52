import { StyleSheet, View, Dimensions } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
// import { colors, roles } from "../../../constants";
import icons from "../../../constants";
import { useGlobalContext } from "../../../context/GlobalProvider";
import MainGrid from "../../../components/grid/MainGrid";
import { MainLayout } from "../../../components";
import { useDropDown } from "../../../hooks/useDropDownData";
import { MainButton } from "../../../components";
import { Dropdown } from "../../../components";
import { useState } from "react";
import TagsGrid from "../../../components/grid/TagsGrid";
import SCADLang from "../../../constants/Lang/SCADA/SCADALang";
const Tags = ({ title, hasLeftComponent = false, onDrawerPress }) => {
  const screenHeight = Dimensions.get("window").height;
  const { ItemID } = useLocalSearchParams();
  const [TagGroup, setTagGroup] = useState();
  const [TagClass, setTagClass] = useState();
  const {Lang, DepartmentID} = useGlobalContext();
  const { data: GroupTagList, loading: GroupTagLoader } = useDropDown(
    "Scada_Tag_Group_List",
    {LocationID: DepartmentID},
    "TagGroupID",
    "TagGroupName"
  );
  console.log(GroupTagList[1],"jjjjjjjjjjjjjjjjjjjjjjjjj");
  
  const { data: ClassTagList, loading: ClassTagLoader } = useDropDown(
    "api_Scada_Tag_Class_List",
    {LocationID: DepartmentID},
    "TagClassID",
    "TagClassName"
  );

  // const { data: SubLocationList, loading: SubLocationLoader } = useDropDown(
  //   "api_ms_SubLocation_List",
  //   {},
  //   "value",
  //   "label"
  // );

  return (
    <View style={styles.container}>
      <MainLayout title={SCADLang.TagesData[Lang]}>
        <View style={[styles.assetsGrid, { height: screenHeight-280 }]}>
          <View className="mx-[16px] my-5">
            <Dropdown
              placeholder={SCADLang.PlaceHolder1[Lang]}
              title={SCADLang.Group[Lang]}
              onChange={(e) => setTagGroup(e)}
              value={TagGroup}
              initailOption={GroupTagList[1]?.key}
              data={GroupTagList}
            />
            <View className="mb-2"></View>
            <Dropdown
              placeholder={SCADLang.PlaceHolder2[Lang]}
              title={SCADLang.Classification[Lang]}
              onChange={(e) => setTagClass(e)}
              value={TagClass}
              initailOption={ClassTagList[0]?.key}
              data={ClassTagList}
            />
          </View>
          <TagsGrid LocationID={DepartmentID} TagGroup={TagGroup} TagClass={TagClass}/>
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

export default Tags;
