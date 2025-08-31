import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import { MainLayout, MainButton, Dropdown } from "../../../components";
import { useRouter, useLocalSearchParams } from "expo-router";
import MainGrid from "../../../components/grid/MainGrid";
import { DatePickerInput } from "../../../components";
import { useDropDown } from "../../../hooks/useDropDownData";
import OperatingSystemLang from "../../../constants/Lang/OperatingSystem/OperatingSystemLang";
import { useGlobalContext } from "../../../context/GlobalProvider";
const ExpenseInquiry = ({ route }) => {
  const { ItemID, SubLocationID, ...restParams } = useLocalSearchParams();
  const { DepartmentID, Lang } = useGlobalContext();
  const router = useRouter();
  const [ItemValue, setItemValue] = useState();
  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get("window").width
  );
  const { data: Item } = useDropDown(
    "api_ex_Items_Trx",
    { LocationID: DepartmentID },
    "ItemID",
    "ItemName"
  );
  const screenHeight = Dimensions.get("window").height;
  const [dateFrom, setDateFrom] = useState();
  const [dateTo, setDateTo] = useState();

  return (
    <MainLayout title={OperatingSystemLang.inquirye[Lang]} className="">
      <View className="bg-white h-[100vh] flex flex-col">
        <View className="mx-4">
          <View>
            <View>
              <DatePickerInput
                title={OperatingSystemLang.from[Lang]}
                defaultDate={dateFrom}
                setDate={setDateFrom}
              />
            </View>
          </View>
          <View className="mb-3">
            <DatePickerInput
              title={OperatingSystemLang.to[Lang]}
              defaultDate={dateTo}
              setDate={setDateTo}
            />
          </View>
          <Dropdown
            title={OperatingSystemLang.Item[Lang]}
            data={Item}
            placeholder={OperatingSystemLang.select[Lang]}
            value={ItemValue}
            onChange={(v) => setItemValue(v)}
          />
        </View>
        <View style={[styles.assetsGrid, { height: screenHeight-250 }]}>
          <MainGrid
            tableHead={[
              {
                key: "TrxID",
                label: "الكود",
                Type: "number",
                input: "false",
                visible: "false",
              },
              {
                key: "TrxDate",
                label: OperatingSystemLang.Date[Lang],
                type: "date",
                input: "true",
                visible: "true",
              },

              {
                key: "Cost",
                label: OperatingSystemLang.Cost[Lang],
                type: "number",
                input: "true",
                visible: "true",
                width: 100,
              },
              {
                key: "Settelment",
                label: OperatingSystemLang.Settlement[Lang],
                type: "number",
                input: "true",
                visible: "true",
              },
              {
                key: "TotalCost",
                label: OperatingSystemLang.TotalCost[Lang],
                type: "number",
                input: "true",
                visible: "true",
              },
              {
                key: "Remarks",
                label: OperatingSystemLang.Notes[Lang],
                type: "text",
                input: "true",
                required: "false",
                visible: "true",
              },
            ]}
            StaticWidth={true}
            pk={"TrxID"}
            spTrx={"api_ex_Inq_Trx"}
            TrxParam={[
              { name: "LocationID", value: DepartmentID },
              { name: "ItemID", value: ItemValue },
              { name: "DateFrom", value: dateFrom },
              { name: "DateTo", value: dateTo },
            ]}
            hasIns={false}
            hasDel={false}
            hasUpd={false}
            TrxDependency={[ItemValue, dateFrom, dateTo]}
          />
        </View>
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
  assetsGrid: {
    marginVertical: 16,
  },
});

export default ExpenseInquiry;
