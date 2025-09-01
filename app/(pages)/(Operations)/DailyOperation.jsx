import { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import OperatingSystemLang from '../../../constants/Lang/OperatingSystem/OperatingSystemLang';
import {
  MainLayout,
  MainButton,
  DatePickerInput,
  ErrorMassege,
  ScrollComponent,
  Dropdown,
  Table,
} from '../../../components';
import { useRouter, useLocalSearchParams, useFocusEffect } from 'expo-router';
import MainGrid from '../../../components/grid/MainGrid';
import { HandleDropdownFormat, useDropDown } from '../../../hooks/useDropDownData';
import { cairoTimeConverter, formatDate } from '../../../utilities/dateFormater';

import { useGlobalContext } from '../../../context/GlobalProvider';
import api from '../../../utilities/api';

const OperatingData = () => {
  const [loader, setLoader] = useState(true);
  const { DepartmentID, Lang } = useGlobalContext();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState({
    type: '',
    text1: '',
    text2: '',
    counter: 0,
  });
  const [Class, setClass] = useState(false);
  const { data: ClassList, loading: ClassLoader } = useDropDown(
    'api_op_AssetClass_List',
    { LocationID: DepartmentID },
    'AssetClassID',
    'AssetClassName'
  );
  const assetsOperationHeader = [
    OperatingSystemLang.NumberOfOperatingHoursSinceStart[Lang],
    OperatingSystemLang.Stop[Lang],
    OperatingSystemLang.Start[Lang],
    OperatingSystemLang.EquipmentName[Lang],
  ];

  const getData = async () => {
    const response = await api.get(`/assets?LocationID=${DepartmentID}&AssetClassID=${Class}`);
    return response;
  };
  const fetchData = async () => {
    try {
      const data = await getData();
      console.log(';;;;;;;;;;;;;;');

      setData(data?.data?.machines);
      setLoader(false);
    } catch (error) {
      setToast({
        type: 'error',
        text2: error.response.data?.message ? error.response.data?.message : false,
        counter: toast.counter + 1,
      });
    }
  };

  const handleStart = async (id) => {
    try {
      const date = new Date();
      const currentDate = formatDate(new Date(cairoTimeConverter(date)));
      console.log(currentDate, id);

      const resp = api.put(`/assets/${id}`, {
        StatusID: 1,
        StatusDate: currentDate,
      });
      console.log(resp);

      return true;
    } catch (error) {
      setToast({
        type: 'error',
        text2: error.response.data?.message ? error.response.data?.message : false,
        counter: toast.counter + 1,
      });
      return false;
    }
  };

  const handleEnd = async (id) => {
    try {
      const date = new Date();
      const currentDate = formatDate(new Date(cairoTimeConverter(date)));
      api.put(`/assets/${id}`, {
        StatusID: 2,
        StatusDate: currentDate,
      });
      return true;
    } catch (error) {
      setToast({
        type: 'error',
        text2: error.response.data?.message ? error.response.data?.message : false,

        counter: 0,
      });
      return false;
    }
  };

  const formatDatee = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-indexed
    const year = date.getFullYear();

    // Ensure day and month are two digitsW
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${formattedDay}-${formattedMonth}-${year}`;
  };
  useFocusEffect(
    useCallback(() => {
      console.log('lllllllll');
      fetchData();
      return () => {
        console.log('This route is now unfocused.');
      };
    }, [Class])
  );
  useEffect(() => {
    console.log('lllllllll');
    fetchData();
    return () => {
      console.log('This route is now unfocused.');
    };
  }, [Class]);

  return (
    <>
      <MainLayout title={OperatingSystemLang.ManuallyEquipment[Lang]} className="">
        <View className="mt-2 flex justify-center">
          <Text className="text-center font-tmedium text-base">{formatDatee(new Date())}</Text>
          <View style={styles.dropdownContainer} className="">
            <Dropdown
              placeholder={OperatingSystemLang.Classification[Lang]}
              title={OperatingSystemLang.Classification[Lang]}
              data={ClassList}
              initailOption={ClassList[0]?.key}
              onChange={(e) => {
                setClass(e); // Update the TradeID state
              }}
            />
          </View>
        </View>
        {data.length ? (
          <ScrollComponent isLoading={loader} refreshingFunction={getData}>
            <Table
              assetsOperation={true}
              header={assetsOperationHeader}
              data={data}
              onStartMachine={handleStart}
              onCloseMachine={handleEnd}
              ClassID={Class}
            />
          </ScrollComponent>
        ) : (
          <ErrorMassege err={OperatingSystemLang.equipment[Lang]} />
        )}
      </MainLayout>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dropdownContainer: {
    marginHorizontal: 16,
    marginTop: 4,
    marginBottom: 16,
  },
  assetsGrid: {
    marginVertical: 16,
  },
});

export default OperatingData;
