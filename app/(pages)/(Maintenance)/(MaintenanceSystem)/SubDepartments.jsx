import React, { useState, useCallback, useEffect } from "react";
import { View, Dimensions, Text, StyleSheet } from "react-native";
import { useGlobalContext } from "../../../../context/GlobalProvider";
import MainLayout from "../../../../components/layout/MainLayout";
import { useLocalSearchParams } from "expo-router";
import MainGrid from "../../../../components/grid/MainGrid";
import SubDepartmentsLang from "../../../../constants/Lang/Maintenance/MaintenanceSystem/SubDepartments";
const SubDepartments = () => {
  const { user,Lang ,company} = useGlobalContext();
  const screenHeight = Dimensions.get("window").height; // Get screen height dynamically
  const { DepartmentID } = useGlobalContext();
  
  return (
    <MainLayout title={SubDepartmentsLang.pageTitle[Lang]} className="">
      
      <View className="bg-white py-4 h-[100vh] flex flex-col">
      <View style={[styles.SubDepartmentsGrid, { height: screenHeight }]}>
            <MainGrid 
                    tableHead={
                      [
                        {
                          key: "SubDepartmentID",
                          label: " الكود  ",
                          type: "number",
                          input: "false",
                          visible: "false",
                          width: 80
                        },
                        {
                          key: "DepartmentCode",
                          label: `${SubDepartmentsLang.DepartmentCode[Lang]}`,
                          type: "number",
                          input: "true",
                          visible: "true",
                          width: 100
                        },
                        {
                          key: "DepartmentName",
                          label: `${SubDepartmentsLang.DepartmentName[Lang]}`,
                          type: "",
                          input: "true",
                          visible: "true",
                    
                        },
                      ]
                    }
                    mixedWidth={true}
                    pk={'SubDepartmentID'}
                    spTrx={'api_ms_Department_Trx'}
                    spIns={'api_ms_Department_Ins'}
                    spUpd={'api_ms_Department_Upd'}
                    spDel={'api_ms_Department_Del'}
                    dynamicCode={
                      {
                        tbName:'ms_SubDepartment',
                        codeCol:'DepartmentCode',
                        CompanyID: company
                      }
                    }
                    TrxParam={[
                        {name: 'LocationID', value: DepartmentID},
                    ]}
                    DelParam={[
                        {rowData: true, name: 'SubDepartmentID', value: 'SubDepartmentID'},
                        {name: 'LocationID', value: DepartmentID},
                    ]}
                    UpdBody={{LocationID: DepartmentID}}
                    InsBody={{LocationID: DepartmentID }}
                    TrxDependency={[]}
                  
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
  SubDepartmentsGrid: {
    marginVertical: 8,
  },
});

export default SubDepartments;