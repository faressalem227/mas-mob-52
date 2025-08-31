import { StyleSheet, View, Dimensions } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import MainGrid from '../../../components/grid/MainGrid';
import { useGlobalContext } from '../../../context/GlobalProvider';
import { MainButton, WelcomeCard, Dropdown } from '../../../components';
import { HandleDropdownFormat, useDropDown } from '../../../hooks/useDropDownData';
// import Icon from "react-native-vector-icons/MaterialIcons";
import React, { useState, useCallback, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import StockItemsTable from '../../../components/grid/StockItemsTable';
import { MainLayout } from '../../../components';
import api from '../../../utilities/api';
import MainDataLang from '../../../constants/Lang/Invintory/MainDataLang';
const StockItems = ({ title, hasLeftComponent = false, onDrawerPress }) => {
  const screenHeight = Dimensions.get('window').height;
  const { WorkorderID } = useGlobalContext();
  const [loadimg, setLoading] = useState(false);
  const { DepartmentID, Lang, company, user } = useGlobalContext();
  const [storesData, setStoresData] = useState([]);
  const [storeValue, setStoreValue] = useState(null);
  const [storesItems, setStoresItems] = useState([]);
  const [storeItems, setStoreItems] = useState(null);
  const [unitList, setUnitList] = useState([]);
  const [selectedClassification, setSelectedClassification] = useState(null);
  //console.log(DepartmentID)
  const fetchDropdownData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get(`/table?sp=api_Sc_Item_Section_List&CompanyID=${company}`);
      //console.log("API Response:", response.data); // Log the entire response for inspection

      // Assuming response.data.data contains the array of sub-locations
      const subLocationList = response.data.data || [];

      if (Array.isArray(subLocationList)) {
        const list = HandleDropdownFormat(subLocationList, 'SectionID', 'SectionName');
        //console.log("5555", list);
        setStoresData(list);
      } else {
        console.error('Expected subLocationList to be an array, but got:', subLocationList);
      }
    } catch (err) {
      console.error('Error fetching dropdown data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDropdownData();
  }, [fetchDropdownData]);
  const fetchItemsData = useCallback(async () => {
    try {
      if (storeValue) {
        //console.log(storeValue);

        setLoading(true);
        const response = await api.get(
          `/table?sp=api_Sc_Item_Group_List2&CompanyID=${company}&SectionID=${storeValue}`
        );
        //console.log("API Response:", response.data); // Log the entire response for inspection

        // Assuming response.data.data contains the array of sub-locations
        const subLocationList = response.data.data || [];

        if (Array.isArray(subLocationList)) {
          const list = HandleDropdownFormat(subLocationList, 'GroupID', 'GroupName');
          //console.log("55555555", list);
          setStoresItems(list);
        } else {
          console.error('Expected subLocationList to be an array, but got:', subLocationList);
        }
      }
    } catch (err) {
      console.error('Error fetching dropdown data:', err);
    } finally {
      setLoading(false);
    }
  }, [storeValue]);

  const fetchDropdownData2 = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get(`/table?sp=api_Sc_Item_Unit_List&CompanyID=${company}`);
      console.log('API Response:', response.data); // Log the entire response for inspection

      // Assuming response.data.data contains the array of sub-locations
      const subLocationList = response.data.data || [];

      if (Array.isArray(subLocationList)) {
        const list = HandleDropdownFormat(subLocationList, 'UnitID', 'UnitName');
        console.log('5555', list);
        setUnitList(list);
      } else {
        console.error('Expected subLocationList to be an array, but got:', subLocationList);
      }
    } catch (err) {
      console.error('Error fetching dropdown data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDropdownData2();
  }, [fetchDropdownData2]);

  useEffect(() => {
    fetchItemsData();
  }, [fetchItemsData]);

  useEffect(() => {}, [storeItems]);
  
  return (
    <View style={styles.container}>
      <MainLayout title={MainDataLang.InventoryItemData[Lang]}>
        <View className="mx-[16px] mt-6">
          <Dropdown
            placeholder={MainDataLang.Select[Lang]}
            title={MainDataLang.QualitativeStore[Lang]}
            onChange={(v) => setStoreValue(v)}
            value={storeValue}
            initailOption={storesData[0]?.key}
            data={storesData}
          />
        </View>
        <View className="mx-[16px] my-6">
          <Dropdown
            title={MainDataLang.Classification[Lang]}
            data={storesItems}
            placeholder={MainDataLang.Select[Lang]}
            value={storeValue}
            initailOption={storesItems[0]?.key}
            onChange={(value) => {
              setStoreItems(value);
            }}
          />
        </View>
        <View style={[styles.assetsGrid, { height: screenHeight - 250 }]}>
          <MainGrid
            const
            tableHead={[
              {
                key: 'ItemCode',
                label: MainDataLang.ItemCode[Lang],
                type: 'number',
                input: 'true',
                visible: 'true',
                width: 120,
              },
              {
                key: 'ItemName',
                label: MainDataLang.ItemName[Lang],
                input: 'true',
                visible: 'true',
                width: 200,
              },
              {
                key: 'GroupID',
                label: MainDataLang.Classification[Lang],
                type: 'dropdown',
                options: storesItems ,
                input: 'true',
                visible: 'false',
              },
              {
                key: 'GroupName',
                label: MainDataLang.Classification[Lang],
                type: 'text',
                input: 'false',
                visible: 'true',
                width: 120,
              },
              {
                key: 'UnitID',
                label: MainDataLang.Unit[Lang],
                type: 'dropdown',
                options: unitList,
                input: 'true',
                visible: 'false',
              },
              {
                key: 'UnitName',
                label: MainDataLang.Unit[Lang],
                type: 'text',
                input: 'false',
                visible: 'true',
                width: 120,
              },
              {
                key: 'UnitCost',
                label: MainDataLang.Price[Lang],
                type: 'number',
                input: 'true',
                visible: 'true',
                width: 120,
              },
              {
                key: 'DepartmentBalance',
                label: MainDataLang.DepartmentBalance[Lang],
                input: 'false',
                visible: 'true',
                width: 120,
              },
              {
                key: 'CompanyBalance',
                label: MainDataLang.CompanyBalance[Lang],
                input: 'false',
                visible: 'true',
                width: 130,
              },
              {
                key: 'CountDocuments',
                label: MainDataLang.Documents[Lang],
                input: 'false',
                visible: 'true',
                width: 120,
              },
            ]}
            pk={'ItemID'}
            spTrx={'api_Sc_Items__Trx_ms'}
            spIns={'api_Sc_Items__Ins'}
            spUpd={'api_Sc_Items__Upd'}
            spDel={'api_Sc_Items__Del'}
            TrxParam={[
              { name: 'CompanyID', value: company },
              { name: 'GroupID', value: storeItems },
              {name:'DepartmentID', value: DepartmentID},
            ]}
            DelParam={[
              { rowData: true, name: 'ItemID', value: 'ItemID' },
              { name: 'CompanyID', value: company },
            ]}
            UpdBody={{
              DepartmentID: DepartmentID,
              CompanyID: company,
              GroupID: storeItems,
            }}
            InsBody={{
              DepartmentID: DepartmentID,
              CompanyID: company,
              GroupID: storeItems,
            }}
            StaticWidth={true}
            mixedWidth
            TrxDependency={[storeItems]}
            routeTo={{
              path: '/TechnicalSpecifications',
              hasParams: true,
              params: {
                DepartmentID: DepartmentID,
                GroupID: storeItems,
              },
            }}
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

export default StockItems;
