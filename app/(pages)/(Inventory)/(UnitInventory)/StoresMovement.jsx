// app/screens/StoresPage.jsx
import { useState, useEffect, useMemo } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';

import api from '../../../../utilities/api';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import { useDropDown } from '../../../../hooks/useDropDownData';

import { MainLayout, MainGrid } from '../../../../components';

import { useLocalSearchParams } from 'expo-router';
import Toast from 'react-native-toast-message';

const StoresPage = () => {
  const router = useRouter();
  const { SectionID, ProcessID, YearID, MonthID } = useLocalSearchParams();
  const { DepartmentID, Lang, company, user } = useGlobalContext();
  const [AssetClassID, setAssetClassID] = useState(null);
  const [colsData, setColsData] = useState({});
  const [loader, setLoader] = useState('');
  const [defaultOrderNo, setDefaultOrderNo] = useState(0);
  const [counter, setCounter] = useState(0);
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
        ProcessID,
        YearID,
        DepartmentID,
        SectionID,
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
  }, [ProcessID, YearID, SectionID, DepartmentID, counter]);

  const currentDay = new Date().getDate();
  const currentYear = new Date().getFullYear();

  const Month = parseInt(MonthID) ? parseInt(MonthID) : new Date().getMonth() + 1;

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
        defaultValue: defaultOrderNo.toString(),
      },
      {
        key: 'OrderDate',
        visible: true,
        input: true,
        label: Lang === 2 ? 'Order Date' : 'تاريخ الإذن',
        type: 'date',
        width: 120,
        defaultValue: new Date(parseInt(currentYear), parseInt(Month) - 1, currentDay),
      },
      {
        key: 'SupplierID',
        input: colsData.UseSupplierID,
        label: Lang === 2 ? 'Supplier' : 'المورد',
        type: 'dropdown',
        width: 200,
        options: supplierList,
      },
      {
        key: 'SupplierName',
        visible: colsData.UseSupplierID,
        label: Lang === 2 ? 'Supplier' : 'المورد',
        width: 200,
      },
      {
        key: 'ClientID',
        input: colsData.UseClient,
        label: Lang === 2 ? 'Client' : 'العميل',
        type: 'dropdown',
        width: 200,
        options: clientList,
      },
      {
        key: 'ClientName',
        visible: colsData.UseClient,
        label: Lang === 2 ? 'Client' : 'العميل',
        width: 200,
      },
      {
        key: 'Discount',
        visible: colsData.UseDiscount,
        input: colsData.UseDiscount,
        label: Lang === 2 ? 'Discount' : 'الخصم',
        type: 'number',
        width: 140,
      },
      {
        key: 'ContractorID',
        input: colsData.UseContractorID,
        label: Lang === 2 ? 'Contractor' : 'المقاول',
        type: 'dropdown',
        options: contractorList,
      },
      {
        key: 'ContractorName',
        visible: !!colsData.UseContractorID,
        label: Lang === 2 ? 'Contractor' : 'المقاول',
        width: 200,
      },
      {
        key: 'EmployeeID',
        input: !!colsData.UseEmployeeID,
        label: Lang === 2 ? 'Employee' : 'الموظف',
        type: 'dropdown',
        options: employeeList,
      },
      {
        key: 'EmployeeName',
        visible: !!colsData.UseEmployeeID,
        label: Lang === 2 ? 'Employee' : 'الموظف',
        width: 200,
      },
      {
        key: 'SubDepartmentID',
        input: colsData.UseWorkorderID,
        label: Lang === 2 ? 'Department' : 'الادارة',
        type: 'dropdown',
        options: departmentList,
        onChange: (val) => setSelectDepartmentID(val),
      },
      {
        key: 'SubDepartmentName',
        visible: colsData.UseWorkorderID,
        label: Lang === 2 ? 'Department' : 'الادارة',
        width: 200,
      },
      {
        key: 'WorkorderID',
        input: colsData.UseWorkorderID,
        label: Lang === 2 ? 'Workorder' : 'أمر الشغل',
        type: 'dropdown',
        options: workOrderList,
      },
      {
        key: 'WorkorderName',
        visible: colsData.UseWorkorderID,
        label: Lang === 2 ? 'Workorder' : 'أمر الشغل',
        width: 250,
      },
      {
        key: 'ParityID',
        input: colsData.UseParityID,
        label: Lang === 2 ? 'Parity' : 'الجهة',
        type: 'dropdown',
        options: parityList,
      },
      {
        key: 'ParityName',
        visible: colsData.UseParityID,
        label: Lang === 2 ? 'Parity' : 'الجهة',
        width: 140,
      },
      {
        key: 'ProjectID',
        input: colsData.UseProjects,
        label: Lang === 2 ? 'Project' : 'المشروع',
        type: 'dropdown',
        options: projects,
      },
      {
        key: 'ProjectName',
        visible: colsData.UseProjects,
        label: Lang === 2 ? 'Project' : 'المشروع',
        width: 160,
      },
      {
        key: 'SubDepartmentID',
        input: colsData.UseDepartmentID,
        label: Lang === 2 ? 'Department' : 'الإدارة',
        type: 'dropdown',
        options: departmentList,
      },
      {
        key: 'SubDepartmentName',
        visible: colsData.UseDepartmentID,
        label: Lang === 2 ? 'Department' : 'الإدارة',
        width: 160,
      },
      {
        key: 'AssetClassID',
        input: colsData.UseAssetClassID,
        label: Lang === 2 ? 'Classification' : 'التصنيف',
        type: 'dropdown',
        options: assetClassList,
        onChange: (value, handle) => {
          setAssetClassID(value);
          handle('AssetID', null);
        },
      },
      {
        key: 'FullAssetClassName',
        visible: colsData.UseAssetClassID,
        label: Lang === 2 ? 'Classification' : 'التصنيف',
        width: 200,
      },
      {
        key: 'AssetID',
        input: colsData.UseAssetID,
        label: Lang === 2 ? 'Asset' : 'الأصل',
        type: 'dropdown',
        options: assetList,
      },
      {
        key: 'AssetName',
        visible: colsData.UseAssetID,
        label: Lang === 2 ? 'Asset' : 'الأصل',
        width: 300,
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
      company,
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
    <MainLayout title={Lang === 2 ? 'Store Transaction' : 'حركة المخزن'}>
      <View className="flex-1">
        <MainGrid
          rowStyle={(row) => {
            return row.Color;
          }}
          onRowPress={(row) => console.log('row', row)}
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
            YearID: YearID,
            SectionID: SectionID,
            ProcessID: ProcessID,
            MonthID: MonthID,
          }}
          mixedWidth
          TrxDependency={[SectionID, ProcessID, YearID, MonthID]}
          tableHead={tableHead}
          routeTo={{
            path: 'OrderDetails',
            hasParams: true,
            params: {
              ProcessID,
            },
          }}
          // hasSpecialButton
          // specialButton={[
          //   {
          //     title: Lang === 2 ? 'Orders List Report' : 'تقرير قائمة الأذون',
          //     backgroundColor: 'green',
          //     textColor: 'white',
          //     action: () =>
          //       router.navigate({
          //         pathname: '/ReportWebView',
          //         params: {
          //           ReportId: '3367',
          //           SectionID: String(SectionID || 0),
          //           YearID: String(YearID || 0),
          //           ProcessID: String(ProcessID),
          //         },
          //       }),
          //   },
          //   {
          //     title: Lang === 2 ? 'Order Report' : ' تقرير الاذن',
          //     backgroundColor: 'green',
          //     textColor: 'white',
          //     action: () => {
          //       if (!activeRow) {
          //         Toast.show({
          //           type: 'error',
          //           text1: Lang === 2 ? 'A record must be selected' : 'يجب اختيار حقل اولا',
          //         });
          //       } else {
          //         router.push({
          //           pathname: '/ReportWebView',
          //           params: {
          //             ReportId: '3359',
          //             Value: String(activeRow?.OrderID),
          //           },
          //         });
          //       }
          //     },
          //   },
          // ]}
        />
      </View>
    </MainLayout>
  );
};

export default StoresPage;

{
  /* <TouchableOpacity
  className="rounded-lg bg-green-500 p-3"
  onPress={() => {
    const reportId = '3367';
    router.navigate({
      pathname: '/ReportWebView',
      params: {
        ReportId: reportId,
        SectionID: String(detail?.SectionID || 0),
        YearID: String(detail?.YearID || 0),
        ProcessID: String(detail?.ProcessID || ProcessID),
      },
    });
  }}>
  <Text className="text-center font-tregular text-white">
    {Lang === 2 ? 'Orders List Report' : 'تقرير قائمة الأذون'}
  </Text>
</TouchableOpacity>; */
}

// <TouchableOpacity
//   className="rounded-lg bg-green-500 p-3"
//   onPress={() => {
//     const reportId = '3359';
//     router.push({
//       pathname: '/ReportWebView',
//       params: { ReportId: reportId, Value: String(OrderID) },
//     });
//   }}>
//   <Text className="text-center font-tregular text-white">
//     {Lang === 2 ? 'Order Report' : ' تقرير الاذن'}
//   </Text>
// </TouchableOpacity>
