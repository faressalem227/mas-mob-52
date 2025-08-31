import { View } from 'react-native';
import React, { useState, useEffect } from 'react';
import api from '../../../utilities/api';
import {
  ErrorMassege,
  ScrollComponent,
  MainLayout,
  MainButton,
  Dropdown,
} from '../../../components';
import { useRouter } from 'expo-router';
import { useGlobalContext } from '../../../context/GlobalProvider';
import { icons } from '../../../constants';
import ThreeButtons from '../../../components/UI/ThreeButtons';
import ButtonWithoutIcons from '../../../components/UI/ButtonWithoutIcons';
import { useDropDown } from '../../../hooks/useDropDownData';
import StoresPageLang from '../../../constants/Lang/Invintory/StoresPageLang';

const StoresPage = () => {
  const router = useRouter();
  const { DepartmentID, Lang } = useGlobalContext();
  const [selectedGeographicStore, setSelectedGeographicStore] = useState(null);
  const [selectedTypeStore, setSelectedTypeStore] = useState(null);
  const [toast, setToast] = useState({
    text1: '',
    text2: '',
    counter: 0,
    type: '',
  });
  const handleNavigate = () => {
    router.navigate('/PurchasesPage');
  };

  const RouterFirstTermBalance = () => {
    router.navigate('/FirstTermBalance');
  };
  const RouterInventoryAddPage = () => {
    router.navigate('/InventoryAddPage');
  };

  const { data: GeoSt, loading: GeoLaoder } = useDropDown(
    'api_admin_department_trx',
    { LocationID: DepartmentID },
    'DepartmentID',
    'DepartmentNameAr'
  );
  const { data: typeStore, loading: typeLoader } = useDropDown(
    'api_Sc_Item_Section_List',
    { LocationID: DepartmentID },
    'SectionID',
    'SectionName'
  );
  const { data: processTypes, loading: processTypesLoader } = useDropDown(
    'api_Sc_ProcessType_List',
    { LocationID: DepartmentID },
    'ProcessTypeID',
    'ProcessTypeName'
  );

  const navivgation = (id) => {
    if (selectedTypeStore == null || selectedGeographicStore == null) {
      setToast({
        text2: StoresPageLang.SelectStoreError[Lang],
        counter: toast.counter + 1,
        type: 'error',
      });
      return;
    }
    router.navigate({
      pathname: 'FirstTermBalance',
      params: {
        SectionID: selectedTypeStore,
        LocationID: selectedGeographicStore,
        processTypeID: id,
      },
    });
  };
  return (
    <MainLayout
      toast={toast}
      loading={GeoLaoder || typeLoader}
      title={StoresPageLang.PageTitle[Lang]}>
      <View className="m-3  mt-14 h-[100%] p-4">
        <View className="mx-[16px]">
          <Dropdown
            placeholder={StoresPageLang.Select[Lang]}
            title={StoresPageLang.GeographicalStore[Lang]}
            onChange={(v) => setSelectedGeographicStore(v)}
            initailOption={DepartmentID}
            data={GeoSt}
          />
        </View>
        <View className="mx-[16px] my-6">
          <Dropdown
            title={StoresPageLang.QualitativeStore[Lang]}
            data={typeStore}
            initailOption={typeStore[0]?.key}
            placeholder={StoresPageLang.Select[Lang]}
            onChange={(value) => {
              setSelectedTypeStore(value);
            }}
          />
        </View>
        {processTypes.map((item, index) => {
          return (
            <View className="my-2 px-4">
              <MainButton
                key={index}
                title={item.value}
                handlePress={() => navivgation(item.key)}
              />
            </View>
          );
        })}
        {/* <View className="my-3 px-4"> 

						<MainButton
							title={StoresPageLang.BeginningBalance[Lang]}
							handlePress={() => navivgation(1)}
						/>
						</View> */}
      </View>
    </MainLayout>
  );
};

export default StoresPage;
