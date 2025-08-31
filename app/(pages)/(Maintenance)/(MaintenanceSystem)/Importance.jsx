import React, { useState, useCallback, useEffect } from "react";
import { View, Dimensions, Text, StyleSheet } from "react-native";
import { useGlobalContext } from "../../../../context/GlobalProvider";
import MainLayout from "../../../../components/layout/MainLayout";
import { useLocalSearchParams } from "expo-router";
import MainGrid from "../../../../components/grid/MainGrid";
import ImportanceLang from "../../../../constants/Lang/Maintenance/MaintenanceSystem/Importance";
const Importance = () => {
  const { user,Lang } = useGlobalContext();
  const screenHeight = Dimensions.get("window").height; // Get screen height dynamically
  const { DepartmentID } = useGlobalContext();
  
  return (
    <MainLayout title={ImportanceLang.pageTitle[Lang]} className="">
      
      <View className="bg-white py-4 h-[100vh] flex flex-col">
      <View style={[styles.ImportanceGrid, { height: screenHeight }]}>
            <MainGrid 
                    tableHead={
                      [
                        {
                          key: "PriorityID",
                          label: " الكود  ",
                          type: "number",
                          input: "false",
                          visible: "false",
                          width: 80
                        },
                        {
                          key: "PriorityCode",
                          label:`${ImportanceLang.PriorityCode[Lang]}`,
                          type: "number",
                          input: "true",
                          visible: "true",
                          width: 100
                        },
                        {
                          key: "PriorityName",
                          label:`${ImportanceLang.PriorityName[Lang]}`,
                          type: "",
                          input: "true",
                          visible: "true",
                    
                        },
                      
                      ]
                    }
                    mixedWidth={true}
                    pk={'PriorityID'}
                    spTrx={'api_ms_Priority_Trx'}
                    spIns={'api_ms_Priority_Ins'}
                    spUpd={'api_ms_Priority_Upd'}
                    spDel={'api_ms_Priority_Del'}
                    dynamicCode={
                      {
                        tbName:'ms_Priority',
                        codeCol:'PriorityCode'
                      }
                    }
                    TrxParam={[
                        {name: 'LocationID', value: DepartmentID},
                    ]}
                    DelParam={[
                        {rowData: true, name: 'PriorityID', value: 'PriorityID'},
                        {name: 'LocationID', value: DepartmentID},
                    ]}
                    UpdBody={{LocationID: DepartmentID}}
                    // ,PriorityID:PriorityID
                    InsBody={{LocationID: DepartmentID }}
                    TrxDependency={[DepartmentID]}
                    // routeTo={
                    //   {
                    //     path:'/ImportanceDetails',
                    //     hasParams:true,
                    //     params:{
                    //       LocationID: DepartmentID,
                    //     }
                    //   }
                    // }
                  
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
  ImportanceGrid: {
    marginVertical: 8,
  },
});

export default Importance;