 // app/screens/StoresPage.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import {
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import api from '../../../utilities/api';
import { useGlobalContext } from '../../../context/GlobalProvider';
import { useDropDown } from '../../../hooks/useDropDownData';

import {
  MainLayout,
  Dropdown,
} from '../../../components';

import MainGrid from '../../../components/grid/MainGrid';

const StoresPage = () => {
  const router = useRouter();
  const { DepartmentID, Lang, company, user } = useGlobalContext();
  const [windowWidth] = useState(Dimensions.get('window').width);

  const [selectedProcessID, setSelectedProcessID] = useState(0);
  const [selectedSectionID, setSelectedSectionID] = useState(0);
  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(0);

  const [AssetClassID, setAssetClassID] = useState(null);
  const [colsData, setColsData] = useState({});
  const [loader, setLoader] = useState('');
  const [defaultOrderNo, setDefaultOrderNo] = useState(0);

  const screenHeight = Dimensions.get('window').height;

  // --- DROPDOWNS ---
  const { data: Months } = useDropDown(
    'api_ms_Months_List_all',
    { DepartmentID, CompanyID: company, UserName: user?.username, LangID: Lang },
    'MonthID',
    'MonthName'
  );

  const { data: Years } = useDropDown(
    'api_admin_Years_List',
    { DepartmentID, CompanyID: company, UserName: user?.username, LangID: Lang },
    'YearID',
    'YearName'
  );

  const { data: Section } = useDropDown(
    'api_Sc_Item_Section_List',
    { CompanyID: company, LangID: Lang },
    'SectionID',
    'SectionName'
  );

  const { data: processTypes } = useDropDown(
    'api_sc_Process_List_MS',
    {
      DepartmentID,
      CompanyID: company,
      IsPo: 0,
      SectionID: selectedSectionID,
      LangID: Lang,
    },
    'ProcessID',
    'ProcessName'
  );

  const { data: supplierList } = useDropDown(
    'api_Sc_Suppliers_List',
    { CompanyID: company, LangID: Lang, UserName: user?.username },
    'SupplierID',
    'SupplierName',
    [],
    colsData?.UseSupplierID || 0
  );

  const { data: contractorList } = useDropDown(
    'api_Sc_Contractor_List',
    { CompanyID: company, LangID: Lang, UserName: user?.username },
    'ContractorID',
    'ContractorName',
    [],
    colsData?.UseContractorID || 0
  );

  const { data: employeeList } = useDropDown(
    'api_Sc_Employee_List',
    { CompanyID: company, LangID: Lang, UserName: user?.username },
    'EmployeeID',
    'EmployeeName',
    [],
    colsData?.UseEmployeeID || 0
  );

  const { data: workOrderList } = useDropDown(
    'api_Sc_Workorder_List',
    { CompanyID: company, LangID: Lang, UserName: user?.username },
    'WorkorderID',
    'WorkorderName',
    [],
    colsData?.UseWorkorderID || 0
  );

  const { data: parityList } = useDropDown(
    'api_Sc_Parity_List',
    { CompanyID: company, LangID: Lang, UserName: user?.username },
    'ParityID',
    'ParityName',
    [],
    colsData?.UseParityID || 0
  );

  const { data: departmentList } = useDropDown(
    'api_Sc_Department_List',
    { CompanyID: company, LangID: Lang, UserName: user?.username },
    'DepartmentID',
    'DepartmentName',
    [],
    colsData?.UseDepartmentID || 0
  );

  const { data: assetList } = useDropDown(
    'api_Sc_Asset_List',
    {
      CompanyID: company,
      LangID: Lang,
      UserName: user?.username,
      ProcessID: selectedProcessID,
      AssetClassID: AssetClassID || 0,
    },
    'AssetID',
    'AssetName',
    [],
    colsData?.UseAssetID || 0
  );

  const { data: assetClassList } = useDropDown(
    'api_asset_classes_List3',
    { CompanyID: company, LangID: Lang, UserName: user?.username },
    'AssetClassID',
    'FullAssetClassName',
    [],
    colsData?.UseAssetClassID || 0
  );

  const { data: projects } = useDropDown(
    'api_sc_projects_list',
{ CompanyID: company },
    'value',
    'label',
    [],
    colsData?.UseProjects || 0
  );

  const { data: clientList } = useDropDown(
    'api_Sc_Clients_list',
    { CompanyID: company },
    'value',
    'label',
    [],
    colsData?.UseClient || 0
  );

  // --- COL FLAGS ---
  const getCols = async () => {
    try {
      const res = await api.get('table/filter?sp=api_sc_process_cols&ProcessID=' + selectedProcessID);
      const data = res?.data?.data || [];
      const flags = data.reduce((acc, curr) => ({ ...acc, [curr.FlagName]: curr.Flag }), {});
      console.log(flags.UseWorkorderID, 'flags');
      setColsData(flags);
    } catch (err) {
      console.log(err);
    }
  };

  // --- ORDER NO ---
  const generateOrderNumber = async () => {
    setLoader('generateOrderNumber');
    try {
      const req = await api.post('table/', {
        sp: 'generate_order_number',
        ProcessID: selectedProcessID,
        YearID: selectedYear,
        DepartmentID: DepartmentID,
        SectionID: selectedSectionID,
      });
      setDefaultOrderNo(req?.data?.data?.[0]?.OrderNo ?? 0);
    } catch (err) {
      console.log(err?.response?.data || err?.message);
    } finally {
      setLoader('');
    }
  };

  useEffect(() => {
    if (selectedProcessID) getCols();
  }, [selectedProcessID]);

  useEffect(() => {
    if (selectedProcessID && selectedYear && selectedSectionID) {
      generateOrderNumber();
    }
  }, [selectedProcessID, selectedYear, selectedSectionID, DepartmentID]);

  const tableHead = useMemo(() => ([
    { key: 'OrderID', visible: false, input: false },
    { key: 'CompanyID', visible: false, input: false },
    { key: 'LocationID', visible: false, input: false },
    { key: 'YearID', visible: false, input: false },
    { key: 'ProcessID', visible: false, input: false },
    {
      key: 'OrderNo',
      visible: true,
      label: Lang === 2 ? 'Order No' : 'رقم الإذن',
      input: true,
      width: 100,
      type: 'number',
      defaultValue: defaultOrderNo,
      loading: loader === 'generateOrderNumber',
    },
    {
      key: 'OrderDate',
      visible: true,
      input: true,
      label: Lang === 2 ? 'Order Date' : 'تاريخ الإذن',
      type: 'date',
      width: 120,
    },
    {
      key: 'SupplierID',
      visible: !!colsData.UseSupplierID,
      input: !!colsData.UseSupplierID,
      label: Lang === 2 ? 'Supplier' : 'المورد',
      type: 'dropdown',
      width: 200,
      options: supplierList,
    },
    {
      key: 'ClientID',
      visible: !!colsData.UseClient,
      input: !!colsData.UseClient,
      label: Lang === 2 ? 'Client' : 'العميل',
      type: 'dropdown',
      width: 200,
      options: clientList,
    },
    {
      key: 'Discount',
      visible: !!colsData.UseDiscount,
      input: !!colsData.UseDiscount,
      label: Lang === 2 ? 'Discount' : 'الخصم',
      type: 'number',
      width: 140,
    },
    {
      key: 'ContractorID',
      visible: !!colsData.UseContractorID,
      input: !!colsData.UseContractorID,
      label: Lang === 2 ? 'Contractor' : 'المقاول',
      type: 'dropdown',
      width: 200,
      options: contractorList,
    },
    {
      key: 'EmployeeID',
      visible: !!colsData.UseEmployeeID,
      input: !!colsData.UseEmployeeID,
      label: Lang === 2 ? 'Employee' : 'الموظف',
      type: 'dropdown',
      width: 200,
      options: employeeList,
    },
    {
      key: 'WorkorderID',
      visible: colsData.UseWorkorderID,
      input: colsData.UseWorkorderID,
      label: Lang === 2 ? 'Workorder' : 'أمر الشغل',
      type: 'dropdown',
      width: 200,
      options: workOrderList,
    },
    {
      key: 'ParityID',
      visible: !!colsData.UseParityID,
      input: !!colsData.UseParityID,
      label: Lang === 2 ? 'Parity' : 'الجهة',
      type: 'dropdown',
      width: 140,
      options: parityList,
    },
    {
      key: 'ProjectID',
      visible: !!colsData.UseProjects,
      input: !!colsData.UseProjects,
      label: Lang === 2 ? 'Project' : 'المشروع',
      type: 'dropdown',
      width: 160,
      options: projects,
    },
    {
      key: 'SubDepartmentID',
visible: !!colsData.UseDepartmentID,
      input: !!colsData.UseDepartmentID,
      label: Lang === 2 ? 'Department' : 'الإدارة',
      type: 'dropdown',
      width: 160,
      options: departmentList,
    },
    {
      key: 'AssetID',
      visible: !!colsData.UseAssetID,
      input: !!colsData.UseAssetID,
      label: Lang === 2 ? 'Asset' : 'الأصل',
      type: 'dropdown',
      width: 300,
      options: assetList,
    },
    {
      key: 'AssetClassID',
      visible: !!colsData.UseAssetClassID,
      input: !!colsData.UseAssetClassID,
      label: Lang === 2 ? 'Classification' : 'التصنيف',
      type: 'dropdown',
      width: 200,
      options: assetClassList,
      onChange: (value, handle) => {
        setAssetClassID(value);
        handle('AssetID', null);
      },
    },
    {
      key: 'SelectYearID',
      visible: !!colsData.UseYear,
      input: !!colsData.UseYear,
      type: 'number',
      label: Lang === 2 ? 'Years' : 'السنوات',
      width: 100,
    },
    {
      key: 'TotalCost',
      visible: true,
      label: Lang === 2 ? 'Total' : 'الإجمالي',
      type: 'number',
      width: 120,
    },
    {
      key: 'OrderDescription',
      visible: true,
      input: true,
      label: Lang === 2 ? 'Order Description' : 'وصف الإذن',
      type: 'text',
      width: 240,
    },
    {
      key: 'trx_user',
      visible: true,
      label: Lang === 2 ? 'User' : 'المستخدم',
      width: 120,
    },
    {
      key: 'trx_time',
      visible: true,
      type: 'date',
      label: Lang === 2 ? 'Time' : 'الوقت',
      width: 200,
    },
    {
      key: 'StatusName',
      visible: true,
      label: Lang === 2 ? 'Status' : 'الحالة',
      width: 140,
    },
  ]), [Lang, colsData, supplierList, contractorList, employeeList, workOrderList, parityList, projects, departmentList, assetList, assetClassList, defaultOrderNo, loader]);

  const trxParams = useMemo(() => ([
    { name: 'CompanyID', value: company },
    { name: 'DepartmentID', value: DepartmentID },
    { name: 'ProcessID', value: selectedProcessID || 0 },
    { name: 'YearID', value: selectedYear || 0 },
    { name: 'MonthID', value: selectedMonth || 0 },
    { name: 'SectionID', value: selectedSectionID || 0 },
    { name: 'UserName', value: user?.username || '' },
    { name: 'LangID', value: Lang },
  ]), [company, DepartmentID, selectedProcessID, selectedYear, selectedMonth, selectedSectionID, user?.username, Lang]);

  return (
    <MainLayout title={Lang === 2 ? 'Stores Transactions' : 'حركات المخازن'}>
      <View
        className="mt-2 flex flex-row-reverse flex-wrap items-center justify-center px-4"
        style={{ gap: wp('3.5%') }}
      >
        <View style={{ width: windowWidth > 400 ? wp('40%') : wp('90%') }}>
          <Dropdown
            placeholder={Lang === 2 ? 'Select' : 'اختر'}
            title={Lang === 2 ? 'Store' : 'المخزن'}
            onChange={(v) => setSelectedSectionID(v)}
            initailOption={selectedSectionID || Section?.[0]?.key}
            data={Section}
          />
        </View>

        <View style={{ width: windowWidth > 400 ? wp('40%') : wp('90%') }}>
          <Dropdown
            placeholder={Lang === 2 ? 'Select' : 'اختر'}
            title={Lang === 2 ? 'Process' : 'الإذن'}
            onChange={(v) => setSelectedProcessID(v)}
            initailOption={selectedProcessID || processTypes?.[0]?.key}
            data={processTypes}
          />
        </View>

        <View style={{ width: windowWidth > 400 ? wp('40%') : wp('90%') }}>
          <Dropdown
            placeholder={Lang === 2 ? 'Select' : 'اختر'}
            title={Lang === 2 ? 'Year' : 'العام'}
            onChange={(v) => setSelectedYear(v)}
            initailOption={selectedYear || Years?.[4]?.key}
            data={Years}
          />
        </View>

        <View style={{ width: windowWidth > 400 ? wp('40%') : wp('90%') }}>
          <Dropdown
            placeholder={Lang === 2 ? 'Select' : 'اختر'}
            title={Lang === 2 ? 'Month' : 'الشهر'}
            onChange={(v) => setSelectedMonth(v)}
            initailOption={selectedMonth || Months?.[13]?.key}
            data={Months}
          />
        </View>
      </View>

      <View style={[styles.assetsGrid, { height: screenHeight - 250 }]}>
        <MainGrid
          tableHead={tableHead}
          pk="OrderID"
          spTrx="api_Sc_Orders_Trx"
          spIns="api_Sc_Orders_Ins"
          spUpd="api_Sc_Orders_Upd"
          spDel="api_Sc_Orders_Del"
          TrxParam={trxParams}
          DelParam={[
            { rowData: true, name: 'OrderID', value: 'OrderID' },
            { name: 'CompanyID', value: company },
            { name: 'UserName', value: user?.username || '' },
            { name: 'LangID', value: Lang },
          ]}
          UpdBody={{
            DepartmentID,
            CompanyID: company,
            UserName: user?.username || '',
            LangID: Lang,
          }}
          InsBody={{
            DepartmentID,
            CompanyID: company,
            UserName: user?.username || '',
            LangID: Lang,
            OrderNo: defaultOrderNo,
            YearID: selectedYear,
            SectionID: selectedSectionID,
            ProcessID: selectedProcessID,
            MonthID: selectedMonth,

          }}
          StaticWidth
          mixedWidth
          TrxDependency={[selectedSectionID, selectedProcessID, selectedYear, selectedMonth]}
          onRowPress={(row) => {
            router.push({
              pathname: '/OrderDetails',
              params: {
                OrderID: String(row?.OrderID),
                ProcessID: String(row?.ProcessID),
              },
            });
          }}
        />
      </View>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  assetsGrid: {
    marginVertical: 8,
  },
});

export default StoresPage;

