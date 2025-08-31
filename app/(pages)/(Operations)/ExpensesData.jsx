import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { MainLayout } from "../../../components";
import { useLocalSearchParams } from "expo-router";
import ExpensesDataLang from "../../../constants/Lang/OperatingSystem/ExpensesDataLang"; // Import language constants
import { useGlobalContext } from "../../../context/GlobalProvider";

const ExpensesData = () => {
    const data = useLocalSearchParams();
    const { Lang, Rtl } = useGlobalContext(); // Add Lang and Rtl from global context
    const [windowWidth, setWindowWidth] = useState(Dimensions.get("window").width);
    const [width, setWidth] = useState();

    useEffect(() => {
        if (windowWidth < 800) {
            setWidth("w-48"); // Set width to 250 px
        } else {
            setWidth("w-[80%]"); // Set width to 80%
        }
    }, [windowWidth]);

    return (
        <MainLayout title={ExpensesDataLang.PageTitle[Lang]}>
            <View className="bg-white h-[100vh] flex flex-col">
                <View className={`flex flex-col ${Rtl ? "rtl" : "ltr"} bg-[#F6F6F6] rounded-sm p-4 m-4`}>
                    {/* Date */}
                    <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between items-center border-b-[1px] py-1 border-[#E4E7EC]`}>
                        <Text className="w-[122px] text-base font-tmedium">
                            {ExpensesDataLang.Labels.Date[Lang]} {/* Translated label */}
                        </Text>
                        <Text className={`w-${width} text-base font-tmedium`}>
                            {data.TrxDate?.split("T")?.[0]}
                        </Text>
                    </View>

                    {/* Expense Item */}
                    <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between items-center border-b-[1px] py-1 border-[#E4E7EC]`}>
                        <Text className="w-[122px] text-base font-tmedium">
                            {ExpensesDataLang.Labels.ExpenseItem[Lang]} {/* Translated label */}
                        </Text>
                        <Text className={`${width} text-base font-tmedium`}>
                            {data.ItemName}
                        </Text>
                    </View>

                    {/* Value */}
                    <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between items-center border-b-[1px] py-1 border-[#E4E7EC]`}>
                        <Text className="w-[122px] text-base font-tmedium">
                            {ExpensesDataLang.Labels.Value[Lang]} {/* Translated label */}
                        </Text>
                        <Text className={`w-${width} text-base font-tmedium`}>
                            {data.Cost}
                        </Text>
                    </View>

                    {/* Settlement */}
                    <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between items-center border-b-[1px] py-1 border-[#E4E7EC]`}>
                        <Text className="w-[122px] text-base font-tmedium">
                            {ExpensesDataLang.Labels.Settlement[Lang]} {/* Translated label */}
                        </Text>
                        <Text className={`w-${width} text-base font-tmedium`}>
                            {data.Settelment}
                        </Text>
                    </View>

                    {/* Total Cost */}
                    <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between items-center border-b-[1px] py-1 border-[#E4E7EC]`}>
                        <Text className="w-[122px] text-base font-tmedium">
                            {ExpensesDataLang.Labels.TotalCost[Lang]} {/* Translated label */}
                        </Text>
                        <Text className={`w-${width} text-base font-tmedium`}>
                            {data.TotalCost}
                        </Text>
                    </View>

                    {/* Remarks */}
                    <View className={`flex flex-row ${Rtl ? "flex-row-reverse" : ""} justify-between items-center border-b-[1px] py-1 border-[#E4E7EC]`}>
                        <Text className="w-[122px] text-base font-tmedium">
                            {ExpensesDataLang.Labels.Remarks[Lang]} {/* Translated label */}
                        </Text>
                        <Text className={`w-${width} text-base font-tmedium`}>
                            {data.Remarks}
                        </Text>
                    </View>
                </View>
            </View>
        </MainLayout>
    );
};

export default ExpensesData;