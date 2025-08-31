import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ScrollView,
} from "react-native";
import { MainLayout, MainButton } from "../../../components";
import { useLocalSearchParams, useRouter, useSearchParams } from "expo-router";
import SmallButton from "../../../components/UI/SmallButton";
import { useGlobalContext } from "../../../context/GlobalProvider";
import AssetHomeLang from "../../../constants/Lang/AssetManagment/AssetHomeLang";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const AssetDetails = ({ route }) => {
  const {
    AssetID,
    SubLocationID,
    SubLocationName,
    LocationID,
    AssetCode,
    AssetName,
    AssetClassName,
    AssetStatusName,
    ...restParams
  } = useLocalSearchParams();
  const { Lang, Rtl } = useGlobalContext();
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

  //console.log("windowWidth", windowWidth);
  //console.log("computed width", width);
  return (
    <MainLayout title={AssetHomeLang.AssetDetailes[Lang]} className="">
      <ScrollView>
        <View className="bg-white h-[100vh] flex flex-col">
          <View
            className={`flex flex-col ${
              Rtl ? "rtl" : "ltr"
            } bg-[#F6F6F6] rounded-sm p-4 m-4`}
          >
            <View
              className={`flex flex-row ${
                Rtl ? "flex-row-reverse" : ""
              } justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}
            >
              <Text className="w-[109px] text-base font-tmedium">
                {" "}
                {AssetHomeLang.AssetCode[Lang]}
              </Text>
              <Text className={`${width} text-basefont-tmedium`}>
                {AssetCode}
              </Text>
            </View>
            <View
              className={`flex flex-row ${
                Rtl ? "flex-row-reverse" : ""
              } justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}
            >
              <Text className="w-[109px] text-base font-tmedium">
                {" "}
                {AssetHomeLang.AssetName[Lang]}
              </Text>
              <Text className={`${width} text-basefont-tmedium`}>
                {AssetName}
              </Text>
            </View>
            <View
              className={`flex flex-row ${
                Rtl ? "flex-row-reverse" : ""
              } justify-between  items-center  border-b-[1px] py-1 border-[#E4E7EC]`}
            >
              <Text className="w-[109px] text-base font-tmedium">
                {" "}
                {AssetHomeLang.Classification[Lang]}
              </Text>
              <Text className={`${width} text-basefont-tmedium`}>
                {AssetClassName}
              </Text>
            </View>
            <View
              className={`flex flex-row ${
                Rtl ? "flex-row-reverse" : ""
              } justify-between  items-center  py-1`}
            >
              {/* <Text className="w-[109px] text-base pt-1 font-tmedium">
                {AssetHomeLang.WorkOrderStatus[Lang]}
              </Text> */}
              {/* <Text className={`${width} text-basefont-tmedium`}>
                {AssetStatusName}
              </Text> */}
            </View>
          </View>
          <View className="flex flex-col">
            <View
              className="flex flex-wrap flex-row-reverse justify-center items-center"
              style={{ gap: hp("1.5%") }}
            >
              <SmallButton
                title={AssetHomeLang.TechnicalSpecifications[Lang]}
                handlePress={() => {
                  router.navigate({
                    pathname: "TechnicalAsset",
                    params: {
                      SubLocationID: SubLocationID,
                      LocationID: LocationID,
                      AssetID: AssetID,
                      AssetCode: AssetCode,
                      AssetName: AssetName,
                      AssetClassName: AssetClassName,
                      AssetStatusName: AssetStatusName,
                    },
                  });
                }}
              />
              <SmallButton
                title={AssetHomeLang.FinancialData[Lang]}
                handlePress={() => {
                  router.navigate({
                    pathname: "FinancialAsset",
                    params: {
                      SubLocationID: SubLocationID,
                      LocationID: LocationID,
                      AssetID: AssetID,
                      AssetCode: AssetCode,
                      AssetName: AssetName,
                      AssetClassName: AssetClassName,
                      AssetStatusName: AssetStatusName,
                    },
                  });
                }}
              />
              <SmallButton
                title={AssetHomeLang.OperatinData[Lang]}
                handlePress={() => {
                  router.navigate({
                    pathname: "AssetOrders",
                    params: {
                      SubLocationID: SubLocationID,
                      LocationID: LocationID,
                      AssetID: AssetID,
                      AssetCode: AssetCode,
                      AssetName: AssetName,
                      AssetClassName: AssetClassName,
                      AssetStatusName: AssetStatusName,
                    },
                  });
                }}
              />
              <SmallButton
                title={AssetHomeLang.Meters[Lang]}
                handlePress={() => {
                  router.navigate({
                    pathname: "AssetCounters",
                    params: {
                      SubLocationID: SubLocationID,
                      LocationID: LocationID,
                      AssetID: AssetID,
                      AssetCode: AssetCode,
                      AssetName: AssetName,
                      AssetClassName: AssetClassName,
                      AssetStatusName: AssetStatusName,
                    },
                  });
                }}
              />
               <SmallButton
                title="بيانات الضمان"
                handlePress={() => {
                  router.navigate({
                    pathname: "WarrantyInformation",
                    params: {
                      SubLocationID: SubLocationID,
                      DepartmentID: LocationID,
                      AssetID: AssetID,
                      AssetCode: AssetCode,
                      AssetName: AssetName,
                      AssetClassName: AssetClassName,
                      AssetStatusName: AssetStatusName,
                    },
                  });
                }}
              />
              <SmallButton
                title={AssetHomeLang.WorkOrders[Lang]}
                handlePress={() => {
                  router.navigate({
                    pathname: "AssetsWorkOrder",
                    params: {
                      SubLocationID: SubLocationID,
                      LocationID: LocationID,
                      AssetID: AssetID,
                      AssetCode: AssetCode,
                      AssetName: AssetName,
                      AssetClassName: AssetClassName,
                      AssetStatusName: AssetStatusName,
                    },
                  });
                }}
              />
              <SmallButton
                title={AssetHomeLang.MaintenancePlan[Lang]}
                handlePress={() => {
                  router.navigate({
                    pathname: "AssetMaintenance",
                    params: {
                      SubLocationID: SubLocationID,
                      LocationID: LocationID,
                      AssetID: AssetID,
                      AssetCode: AssetCode,
                      AssetName: AssetName,
                      AssetClassName: AssetClassName,
                      AssetStatusName: AssetStatusName,
                    },
                  });
                }}
              />
              <SmallButton
                title={AssetHomeLang.AssetCategories[Lang]}
                handlePress={() => {
                  router.navigate({
                    pathname: "AssetCategoriesDetails",
                    params: {
                      SubLocationID: SubLocationID,
                      SubLocationName: SubLocationName,
                      LocationID: LocationID,
                      AssetID: AssetID,
                      AssetCode: AssetCode,
                      AssetName: AssetName,
                      AssetClassName: AssetClassName,
                      AssetStatusName: AssetStatusName,
                    },
                  });
                }}
              />
              <SmallButton
                title={AssetHomeLang.AssetImportance[Lang]}
                handlePress={() => {
                  router.navigate({
                    pathname: "AssetImportance",
                    params: {
                      SubLocationID: SubLocationID,
                      LocationID: LocationID,
                      AssetID: AssetID,
                      AssetCode: AssetCode,
                      AssetName: AssetName,
                      AssetClassName: AssetClassName,
                      AssetStatusName: AssetStatusName,
                    },
                  });
                }}
              />
              <SmallButton
                title={AssetHomeLang.SparePartsMovement[Lang]}
                handlePress={() => {
                  router.navigate({
                    pathname: "SparePartsMovement",
                    params: {
                      SubLocationID: SubLocationID,
                      LocationID: LocationID,
                      AssetID: AssetID,
                      AssetCode: AssetCode,
                      AssetName: AssetName,
                      AssetClassName: AssetClassName,
                      AssetStatusName: AssetStatusName,
                    },
                  });
                }}
              />
              {/* <SmallButton
                title={AssetHomeLang.AdditionalData[Lang]}
                handlePress={() => {
                  router.navigate({
                    pathname: "AdditionalData",
                    params: {
                      SubLocationID: SubLocationID,
                      LocationID: LocationID,
                      AssetID: AssetID,
                      AssetCode: AssetCode,
                      AssetName: AssetName,
                      AssetClassName: AssetClassName,
                      AssetStatusName: AssetStatusName,
                    },
                  });
                }}
              /> */}
            </View>
          </View>
        </View>
      </ScrollView>
    </MainLayout>
  );
};

export default AssetDetails;
