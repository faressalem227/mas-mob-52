import { StyleSheet, View, Dimensions } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
// import { colors, roles } from "../../../constants";
import icons from "../../../constants";
import { useGlobalContext } from "../../../context/GlobalProvider";
import MainGrid from "../../../components/grid/MainGrid";
import { MainLayout } from "../../../components";
import { useDropDown } from "../../../hooks/useDropDownData";
import { MainButton } from "../../../components";
import SCADALang from "../../../constants/Lang/SCADA/SCADALang";
const HistoricalData = ({ title, hasLeftComponent = false, onDrawerPress }) => {
  const screenHeight = Dimensions.get("window").height;
  const { ItemID } = useLocalSearchParams();
  const { Lang,DepartmentID } = useGlobalContext();
  return (
  
      <MainLayout title={SCADALang.HistoricalData[Lang]}>
        <View className="flex-1">
          <MainGrid
            const
            tableHead={[
              {
                key: "SubLocationName",
                label: SCADALang.Subsite[Lang],
                input: "true",
                visible: "true",
                width: 100,
              },
              {
                key: "AssetTagID",
                label: SCADALang.AssetCode[Lang],
                type: "number",
                input: "true",
                visible: "false",
                width: 100,
              },
              // {
              //   key: "AssetName",
              //   label: SCADALang.AssetCode[Lang],
              //   type: "text",
              //   input: "true",
              //   visible: "true",
              //   width: 100,
              // },
              {
                key: "AssetName",
                label: SCADALang.AssetName[Lang],
                input: "true",
                visible: "true",
                width: 100,
              },
              {
                key: "TagName",
                label: SCADALang.TageName[Lang],
                input: "true",
                visible: "true",
                width: 120,
              },
              {
                key: "TagValue",
                label: SCADALang.TageValue[Lang],
                type: "number",
                input: "true",
                visible: "true",
                width: 100,
              },
              {
                key: "quality",
                label: "الجوده",
                input: "true",
                visible: "true",
                width: 120,
              },
              {
                key: "t",
                label: SCADALang.MaximumActualTime[Lang],
                type: "text",
                input: "true",
                visible: "true",
                width: 150,
              },
            ]}
            //mixedWidth={true}
            StaticWidth={true}
            pk={"AssetTagID"}
            spTrx={"api_Scada_Tag_Class_Trx1"}
            TrxParam={[{ name: "DepartmentID", value: DepartmentID }]}
            hasCrud={false}
            TrxDependency={[DepartmentID]}
            // routeTo={{
            //   path: "/HistoricalDataDetails",
            //   hasParams: true,
            //   params: {
            //     LocationID: DepartmentID,
            //   },
            // }}
          />
        </View>
      </MainLayout>
   
  );
};



export default HistoricalData;
