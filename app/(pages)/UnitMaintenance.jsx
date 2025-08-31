import { useEffect, useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import { Dimensions, View } from 'react-native';
import SmallButton from '../../components/UI/SmallButton';
import { useRouter } from 'expo-router';
import { icons } from '../../constants';
import HomeLang from '../../constants/Lang/Home';
import { useGlobalContext } from '../../context/GlobalProvider';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
function UnitMaintenance() {
  const { DepartmentID, setDepartmentID, departmentData, Lang, Rtl } = useGlobalContext();
  const router = useRouter();
  const [fontSize, setFontSize] = useState(wp('2.5%')); // Default font size
  const [width, setWidth] = useState();
  const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);
  useEffect(() => {
    if (windowWidth < 800) {
      setFontSize(wp('5%'));
      setWidth('w-48'); // Set width to 250 px
    } else {
      setFontSize(wp('3%'));
      setWidth('w-[80%]'); // Set width to 80%
    }
  }, [windowWidth]);
  const handleDepartmentChange = (value) => {
    console.log('value', value);
    console.log('departmentID', DepartmentID);

    setDepartmentID(value);
  };
  return (
    <MainLayout title={HomeLang.UnitMaintenance[Lang]}>
      <View
        className="m-auto flex flex-row-reverse flex-wrap items-center justify-center py-3"
        style={{ gap: hp('1.5%') }}>
        <SmallButton
          title={HomeLang.assetManagement[Lang]}
          icon={icons.manage}
          textStyles={'w-52'}
          handlePress={() => router.navigate('/UnitMaintenanceAssetHome')}
        />
        <SmallButton
          title={HomeLang.employeeSystem[Lang]}
          icon={icons.persones}
          textStyles={'w-52'}
          handlePress={() => router.navigate('/EmployeesSystem')}
        />
        <SmallButton
          title={HomeLang.operatingSystem[Lang]}
          icon={icons.MechanicTime}
          handlePress={() => router.navigate('/OperationsHome')}
        />
        <SmallButton
          title={HomeLang.scada[Lang]}
          icon={icons.Vector}
          handlePress={() => router.navigate('/ScadaHome')}
        />
        <SmallButton
          title={HomeLang.maintenanceSystem[Lang]}
          icon={icons.Setting}
          handlePress={() => router.navigate('UnitMaintenanceHome')}
        />
      </View>
    </MainLayout>
  );
}

export default UnitMaintenance;

// import React, { useState, useEffect, useCallback } from 'react';
// import { View } from 'react-native';
// import DropDownPicker from 'react-native-dropdown-picker';
// import { API_BASE_URL } from '../../utilities/api';
// const HomePage = () => {
//   const [open, setOpen] = useState(false);
//   const [value, setValue] = useState(null);
//   const [items, setItems] = useState([]);
//   const [page, setPage] = useState(0);
//   const [hasMore, setHasMore] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');

//   const limit = 10;

//   const fetchItems = useCallback(async ({ reset = false } = {}) => {
//     if (loading || (!hasMore && !reset)) return;

//     setLoading(true);
//     const skip = reset ? 0 : page;

//     // Build query string
//     const params = new URLSearchParams({
//       sp: 'ms_Assets_List_PG',
//       DepartmentID: '5',
//       SubLocationID: '40',
//       UserName: '',
//       Skip: skip.toString(),
//       PageSize: limit.toString(),
//       CurrentPage: '1',
//     });
//     console.log("marnona",params)
//     const url = `${API_BASE_URL}/table?${params.toString()}`;
//     try {
//       const response = await fetch(url);
//       const data = await response.json();

// let newItems = [];
//   console.log("marnona",params)
// if (Array.isArray(data)) {
//   newItems = data.map((item) => ({
//     label: item.AssetName,
//     value: item.AssetID
//   }));
// } else {
//   console.error('Unexpected API response:', data);
// }
//       if (reset) {
//         setItems(newItems);
//         setPage(limit);
//       } else {
//         setItems((prev) => [...prev, ...newItems]);
//         setPage((prev) => prev + limit);
//       }

//       setHasMore(newItems.length === limit);
//     } catch (error) {
//       console.error('GET request error:', error);
//     } finally {
//       setLoading(false);
//     }
//   }, [loading, page, hasMore]);

//   const handleSearch = (text) => {
//     setSearchQuery(text);
//     setHasMore(true);
//     setPage(0);
//     fetchItems({ reset: true });
//   };

//   const handleScrollEndReached = () => {
//     if (hasMore && !loading) {
//       fetchItems();
//     }
//   };

//   useEffect(() => {
//     fetchItems({ reset: true });
//   }, []);

//   return (
//     <View style={{ margin: 20 }}>
//       <DropDownPicker
//         open={open}
//         value={value}
//         items={items}
//         setOpen={setOpen}
//         setValue={setValue}
//         setItems={setItems}
//         searchable
//         searchPlaceholder="Search assets..."
//         searchTextInputProps={{
//           value: searchQuery,
//           onChangeText: handleSearch,
//         }}
//         listMode="SCROLLVIEW"
//         onScrollEndReached={handleScrollEndReached}
//         onScrollEndReachedThreshold={0.5}
//         loading={loading}
//         placeholder="Select an asset"
//         ArrowDownIconComponent={() => null}
//         ArrowUpIconComponent={() => null}
//         CloseIconComponent={() => null}
//       />
//     </View>
//   );
// };

// export default HomePage;
