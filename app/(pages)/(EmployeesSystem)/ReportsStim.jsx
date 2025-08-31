import React, { useState } from "react";
import { ActivityIndicator, Dimensions, SafeAreaView, StyleSheet, View } from "react-native";
import { MainButton, MainLayout, ScrollComponent } from "../../../components";
import WebView from "react-native-webview";
import { useLocalSearchParams } from "expo-router";
import { REPORT_SERVER_URL } from "../../../utilities/api";
import { useGlobalContext } from "../../../context/GlobalProvider";
const ReportsStim = () => {
    const {user, Lang, company, DepartmentID} = useGlobalContext()
    const { ReportName, ReportID, ...filters } = useLocalSearchParams()
    
    console.log(filters);

    let params = Object.keys(filters)
      .map((key) => `${key}=${filters[key]}`)
      .join("&");
    let url = `${REPORT_SERVER_URL}/report/Viewer?LangID=${Lang}&CompanyID=${company}&UserName=${user.username}&DepartmentID=${DepartmentID}&ReportID=${ReportID}&mob=1&` + params 
    console.log(url);
    
    const [loading ,setLoading] = useState(false)
	const { height, width } = Dimensions.get("screen");
	return (
		<SafeAreaView>
        <MainLayout title={ReportName}>
            {loading && (
        <ActivityIndicator
                            size="large"
                            color="#0000ff"
                        />
      )}
			
               <View style={{width:width,height:height-100}}>
               <WebView
                scalesPageToFit
                style={{height:height-70,width:width}}
                originWhitelist={["*"]}
                source={{ uri: url}} // 🔹 Load the web link
                onLoadStart={() => setLoading(true)} // 🔹 Show loader when loading starts
                onLoadEnd={() => setLoading(false)} // 🔹 Hide loader when loading ends
               />
       
               </View>

        </MainLayout>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		height: "100%",
		width: "100%",
	},
});

export default ReportsStim;
