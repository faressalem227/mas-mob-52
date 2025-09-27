// app/screens/StoresPage.jsx
import { useState, useEffect, useMemo } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';

import api from '../../../../utilities/api';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import { useDropDown } from '../../../../hooks/useDropDownData';

import { MainLayout, MainGrid } from '../../../../components';

import { useLocalSearchParams } from 'expo-router';

const StoresPageLang = {
  InventoryTransaction: {
    1: 'حركه المخزن',
    2: 'Inventory Transaction',
  },
};

const StoresPage = () => {
  const router = useRouter();
  const { SectionID, ProcessID, YearID, MonthID } = useLocalSearchParams();
  const { DepartmentID, Lang, company, user } = useGlobalContext();

  const [AssetClassID, setAssetClassID] = useState(null);
  const [colsData, setColsData] = useState({});
  const [loader, setLoader] = useState('');
  const [defaultOrderNo, setDefaultOrderNo] = useState(0);
  const [selectdepartmentID, setSelectDepartmentID] = useState(false);

  const { data: supplierList } = useDropDown(
    'api_Sc_Suppliers_List',
    { CompanyID: company, LangID: Lang, UserName: user?.username },
    'SupplierID',
    'SupplierName',
    [colsData],
    colsData?.UseSupplierID || 0
  );

  const { data: contractorList } = useDropDown(
    'api_Sc_Contractor_List',
    { CompanyID: company, LangID: Lang, UserName: user?.username },
    'ContractorID',
    'ContractorName',
    [colsData],
    colsData?.UseContractorID || 0
  );

  const { data: employeeList } = useDropDown(
    'api_Sc_Employee_List',
    { CompanyID: company, LangID: Lang, UserName: user?.username },
    'EmployeeID',
    'EmployeeName',
    [colsData],
    colsData?.UseEmployeeID || 0
  );

  const { data: workOrderList } = useDropDown(
    'api_Sc_Workorder_List',
    {
      CompanyID: company,
      LangID: Lang,
      UserName: user?.username,
      DepartmentID: selectdepartmentID,
    },
    'WorkorderID',
    'WorkorderName',
    [selectdepartmentID, colsData],
    colsData?.UseWorkorderID || 0
  );

  const { data: parityList } = useDropDown(
    'api_Sc_Parity_List',
    { CompanyID: company, LangID: Lang, UserName: user?.username },
    'ParityID',
    'ParityName',
    [colsData],
    colsData?.UseParityID || 0
  );

  const { data: departmentList } = useDropDown(
    'api_Sc_Department_List',
    { CompanyID: company, LangID: Lang, UserName: user?.username },
    'DepartmentID',
    'DepartmentName',
    [colsData],
    colsData?.UseWorkorderID || 0
  );

  // console.log('depa', departmentList);
  // console.log('cols', colsData?.UseDepartmentID);

  const { data: assetList } = useDropDown(
    'api_Sc_Asset_List',
    {
      CompanyID: company,
      LangID: Lang,
      UserName: user?.username,
      ProcessID: ProcessID,
      AssetClassID: AssetClassID || 0,
    },
    'AssetID',
    'AssetName',
    [colsData],
    colsData?.UseAssetID || 0
  );

  const { data: assetClassList } = useDropDown(
    'api_asset_classes_List3',
    { CompanyID: company, LangID: Lang, UserName: user?.username },
    'AssetClassID',
    'FullAssetClassName',
    [colsData],
    colsData?.UseAssetClassID || 0
  );

  const { data: projects } = useDropDown(
    'api_sc_projects_list',
    { CompanyID: company },
    'value',
    'label',
    [colsData],
    colsData?.UseProjects || 0
  );

  const { data: clientList } = useDropDown(
    'api_Sc_Clients_list',
    { CompanyID: company },
    'value',
    'label',
    [colsData],
    colsData?.UseClient || 0
  );

  // --- COL FLAGS ---
  const getCols = async () => {
    try {
      const res = await api.get('table/filter?sp=api_sc_process_cols&ProcessID=' + ProcessID);
      const data = res?.data?.data || [];
      const flags = data.reduce((acc, curr) => ({ ...acc, [curr.FlagName]: curr.Flag }), {});
      console.log(flags, 'flags');
      setColsData(flags);
    } catch (err) {
      console.log(err);
    }
  };

  console.log('ProcessID', ProcessID);

  // --- ORDER NO ---
  const generateOrderNumber = async () => {
    setLoader('generateOrderNumber');
    try {
      const req = await api.post('table/', {
        sp: 'generate_order_number',
        ProcessID: ProcessID,
        YearID: YearID,
        DepartmentID: DepartmentID,
        SectionID: SectionID,
      });
      setDefaultOrderNo(req?.data?.data?.[0]?.OrderNo ?? 0);
    } catch (err) {
      console.log(err?.response?.data || err?.message);
    } finally {
      setLoader('');
    }
  };

  useEffect(() => {
    if (ProcessID) getCols();
  }, [ProcessID]);

  useEffect(() => {
    if (ProcessID && YearID && SectionID) {
      generateOrderNumber();
    }
  }, [ProcessID, YearID, SectionID, DepartmentID]);

  const tableHead = useMemo(
    () => [
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
        key: 'DepartmentID',
        visible: !!colsData.UseWorkorderID,
        input: colsData.UseWorkorderID,
        label: Lang === 2 ? 'Department' : 'الادارة',
        type: 'dropdown',
        width: 200,
        options: departmentList,
        onChange: (val) => setSelectDepartmentID(val),
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
    ],
    [
      Lang,
      colsData,
      supplierList,
      contractorList,
      employeeList,
      workOrderList,
      parityList,
      projects,
      departmentList,
      assetList,
      assetClassList,
      defaultOrderNo,
      loader,
    ]
  );

  const trxParams = useMemo(
    () => [
      { name: 'CompanyID', value: company },
      { name: 'DepartmentID', value: DepartmentID },
      { name: 'YearID', value: YearID || 0 },
      { name: 'MonthID', value: MonthID || 0 },
      { name: 'SectionID', value: SectionID || 0 },
      { name: 'ProcessID', value: ProcessID || 0 },
      { name: 'UserName', value: user?.username || '' },
      { name: 'LangID', value: Lang },
    ],
    []
  );

  console.log(SectionID, ProcessID, YearID, MonthID, user.username, DepartmentID, company, Lang);

  return (
    <MainLayout title={Lang === 2 ? 'Stores Transactions' : 'حركات المخازن'}>
      <View className="flex-1">
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
            YearID: YearID,
            SectionID: SectionID,
            ProcessID: ProcessID,
            MonthID: MonthID,
          }}
          mixedWidth
          TrxDependency={[SectionID, ProcessID, YearID, MonthID]}
          routeTo={{
            path: 'OrderDetails',
            hasParams: true,
            params: {
              ProcessID,
            },
          }}
        />
      </View>
    </MainLayout>
  );
};

export default StoresPage;
