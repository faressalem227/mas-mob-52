import { Dimensions, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { MainLayout } from '../../../components';
import MainGrid from '../../../components/grid/MainGrid';
import { useGlobalContext } from '../../../context/GlobalProvider';
import AssetHomeLang from '../../../constants/Lang/AssetManagment/AssetHomeLang';
import { useDropDown } from '../../../hooks/useDropDownData';
const Locations = () => {
  const { DepartmentID, Lang, company, user } = useGlobalContext();
  console.log(DepartmentID, 'DepartmentID');
  const screenHeight = Dimensions.get('window').height; // Get screen height dynamically
  const { data: DepartmentList, loading: DepartmentListLoader } = useDropDown(
    'api_ms_SubDepartment_List',
    { DepartmentID: DepartmentID, UserName: user.username, LangID: Lang, CompanyID: company },
    'SubDepartmentID',
    'DepartmentName'
  );
  return (
    <View style={{ height: screenHeight - 10 }} className="">
      <MainLayout title={AssetHomeLang.Locations[Lang]}>
        <MainGrid
          tableHead={[
            {
              key: 'SubLocationID',
              label: AssetHomeLang.SiteName[Lang],
              type: 'number',
              input: 'false',
              visible: 'false',
              width: 90,
            },
            {
              key: 'SubLocationCode',
              label: AssetHomeLang.SiteCode[Lang],
              type: 'number',
              input: 'true',
              visible: 'true',
              width: 120,
            },
            {
              key: 'SubLocationName',
              label: AssetHomeLang.SiteName[Lang],
              type: '',
              input: 'true',
              visible: 'true',
              width: 200,
            },
            {
              key: 'CountAssetID',
              label: AssetHomeLang.Numberofassets[Lang],
              type: 'number',
              input: 'false',
              visible: 'true',
              width: 120,
            },
            {
              key: 'SubDepartmentID',
              label: AssetHomeLang.DepartmentName[Lang],
              type: 'dropdown',
              options: DepartmentList,
              input: 'true',
              visible: 'false',
              width: 120,
            },
            {
              key: 'DepartmentCode',
              label: AssetHomeLang.DepartmentCode[Lang],
              type: 'number',
              input: 'false',
              visible: 'true',
              width: 120,
            },
            {
              key: 'DepartmentName',
              label: AssetHomeLang.DepartmentName[Lang],
              type: '',
              input: 'false',
              visible: 'true',
              width: 200,
            },
            {
              key: 'Instructions',
              label: AssetHomeLang.Instructions[Lang],
              type: '',
              input: 'true',
              visible: 'true',
              width: 200,
            },
          ]}
          mixedWidth
          StaticWidth
          pk={'SubLocationID'}
          spTrx={'api_ms_SubLocation_Trx'}
          spIns={'api_ms_SubLocation_Ins'}
          spUpd={'api_ms_SubLocation_Upd'}
          spDel={'api_ms_SubLocation_Del'}
          dynamicCode={{
            tbName: 'ms_SubLocation',
            codeCol: 'SubLocationCode',
            CompanyID: company,
          }}
          TrxParam={[
            { name: 'DepartmentID', value: DepartmentID },
            { name: 'CompanyID', value: company },
            { name: 'UserName', value: user.username },
            { name: 'LangID', value: Lang },
          ]}
          DelParam={[
            { rowData: true, name: 'SubLocationID', value: 'SubLocationID' },
            { name: 'DepartmentID', value: DepartmentID },
            { name: 'CompanyID', value: company },
            { name: 'UserName', value: user.username },
            { name: 'LangID', value: Lang },
          ]}
          UpdBody={{
            DepartmentID: DepartmentID,
            UserName: user.username,
            LangID: Lang,
            CompanyID: company,
          }}
          InsBody={{
            DepartmentID: DepartmentID,
            UserName: user.username,
            LangID: Lang,
            CompanyID: company,
          }}
          routeTo={{
            path: '/LocationDetails',
            hasParams: true,
            params: {
              DepartmentID: DepartmentID,
            },
          }}
        />
      </MainLayout>
    </View>
  );
};

export default Locations;
