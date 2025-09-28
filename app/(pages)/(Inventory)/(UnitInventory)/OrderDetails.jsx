// app/(whatever)/OrderDetails.tsx
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { useGlobalContext } from '../../../../context/GlobalProvider';
import api from '../../../../utilities/api';
import { MainLayout, MainButton, InfoDetailes } from '../../../../components';
import MainGrid from '../../../../components/grid/MainGrid';
import { useDropDown } from '../../../../hooks/useDropDownData';
import Toast from 'react-native-toast-message';

const OrderDetails = () => {
  const {
    OrderID: orderIdParam,
    ProcessID: processIdParam,
    SectionID,
    WorkorderID,
  } = useLocalSearchParams();
  const OrderID = Number(orderIdParam);
  const ProcessID = Number(processIdParam);

  // console.log('ProcessID', ProcessID);
  // console.log(WorkorderID);

  const router = useRouter();

  const { Lang, user, company, DepartmentID, Rtl } = useGlobalContext();

  const [detail, setDetail] = useState(null);
  const [colsData, setColsData] = useState({});
  const [loader, setLoader] = useState('');
  const [barcodeFocused, setBarcodeFocused] = useState(false);
  const [barcodeValue, setBarcodeValue] = useState('');
  const [itemsKey, setItemsKey] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [SelctedSectionID, setSelctedSectionID] = useState('');
  const [selectedGroup, setSelectedGroup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(false);

  const inputRef = useRef(null);

  const getCols = async () => {
    try {
      const res = await api.get('table/filter?sp=api_sc_process_cols&ProcessID=' + ProcessID);
      const data = res?.data?.data || [];
      const flags = data.reduce((acc, curr) => ({ ...acc, [curr.FlagName]: curr.Flag }), {});
      setColsData(flags);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchDetails = async (silent = false) => {
    if (!silent) setLoader('fetchDetail');
    try {
      const res = await api.post('table/', {
        sp: 'Sc_Order_Info',
        OrderID,
        UserName: user.username,
        LangID: Lang,
      });
      setDetail(res?.data?.data?.[0] || null);
    } catch (e) {
      console.log(e);
    } finally {
      if (!silent) setLoader('');
    }
  };

  const handleConfirm = async () => {
    // console.log('NextApprovalID', detail?.NextApprovalID);

    if (!detail?.NextApprovalID) return;
    setLoader('confirm');
    try {
      const res = await api.post('table/', {
        sp: 'sc_order_approvals_ins',
        OrderID,
        UserName: user.username,
        ApprovalID: detail?.NextApprovalID,
      });

      await fetchDetails(true);

      Toast.show({
        type: 'success',
        text1: Lang === 2 ? 'Order Confirmed' : 'تم التاكيد الاذن',
      });
    } catch (e) {
      console.log(e);

      Toast.show({
        type: 'success',
        text1: Lang === 2 ? 'Confirmation Failed' : 'فشل التاكيد',
      });
    } finally {
      setLoader('');
    }
  };

  const insertBarcode = async () => {
    if (!barcodeValue) return;
    setLoader('barcode');
    try {
      await api.post('table/', {
        sp: 'order_details_items_Ins_Barcode',
        OrderID,
        BarCode: barcodeValue,
        SectionID: detail?.SectionID || 0,
      });
      setBarcodeValue('');
      setItemsKey((k) => k + 1);
      await fetchDetails(true);
    } catch (e) {
      console.log(e);
    } finally {
      setLoader('');
    }
  };

  useEffect(() => {
    getCols();
    fetchDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [OrderID]);

  const { data: sectionlist } = useDropDown(
    'api_Sc_all_Section_List',
    {
      LangID: Lang,
      UserName: user.username,
      CompanyID: company,
    },
    'value',
    'label',
    [colsData],
    colsData?.UseSection || 0
  );

  const { data: groupData, loading: groupDataloader } = useDropDown(
    'Sc_Item_Group_List2',
    {
      CompanyID: company,
      LangID: Lang,
      UserName: user.username,
      SectionID: SelctedSectionID || SectionID,
      SelectedSectionID: SelctedSectionID,
      useSelectedSection: colsData.UseSection,
    },
    'GroupID',
    'GroupName',
    [colsData]
  );

  console.log(SectionID);

  const { data: filterdItemData, loading: filterdItemDataLoding } = useDropDown(
    'Sc_Items_List_trx',
    {
      UserName: user.username,
      LangID: Lang,
      GroupID: selectedGroup,
      DepartmentID,
      IsMs: 1,
    },
    'ItemID',
    'FullItemName',
    [selectedGroup, colsData],
    selectedGroup || 0
  );

  const { data: unitData, loading: unitDataLoading } = useDropDown(
    'Sc_Item_Unit_ListByItem',
    {
      ItemID: selectedItem,
      UserName: user.username,
      LangID: Lang,
    },
    'UnitID',
    'UnitName',
    [selectedItem, colsData],
    selectedItem || 0
  );

  const { data: statusData } = useDropDown(
    'Sc_Item_Status_List',
    { LangID: Lang },
    'StatusID',
    'StatusName',
    [colsData],
    colsData?.UseStatusID || 0
  );
  const { data: assetListWo, loading: assetListWoLoader } = useDropDown(
    'Sc_Workorders_Asset_List',
    {
      CompanyID: company,
      LangID: Lang,
      UserName: user.username,
      WorkorderID,
    },
    'AssetID',
    'AssetName',
    [colsData],
    colsData?.UseAssetID1 || 0
  );

  const itemsHead = useMemo(
    () => [
      { key: 'OrderDetailsID', visible: false },
      { key: 'OrderID', visible: false },
      {
        key: 'SectionID',
        label: Lang === 2 ? 'Section' : 'المخزن',
        input: colsData.UseSection,
        visible: false,
        width: 110,
        type: 'dropdown',
        options: sectionlist,
        onChange: (value) => {
          setSelctedSectionID(value);
        },
      },
      {
        key: 'SectionName',
        label: Lang === 2 ? 'Section' : 'المخزن',
        type: 'text',
        input: false,
        visible: !!colsData.UseSection,
        width: 110,
      },
      {
        key: 'GroupID',
        label: Lang === 2 ? 'Group' : 'المجموعة',
        width: 110,
        type: 'dropdown',
        options: groupData,
        onChange: (value) => {
          setSelectedGroup(value);
        },
        input: true,
        visible: false,
      },
      {
        key: 'GroupName',
        label: Lang === 2 ? 'Group' : 'المجموعة',
        width: 110,
        type: 'text',
        input: false,
        visible: true,
      },
      {
        key: 'ItemID',
        label: Lang === 2 ? 'Item' : 'الصنف',
        onChange: (value) => {
          setSelectedItem(value);
        },
        width: 200,
        type: 'dropdown',
        options: filterdItemData,
        loading: filterdItemDataLoding,
        visible: false,
        input: true,
      },
      {
        key: 'ItemName',
        label: Lang === 2 ? 'Item' : 'الصنف',
        width: 200,
        type: 'text',
        input: false,
        visible: true,
      },
      {
        key: 'UnitID',
        label: Lang === 2 ? 'Unit' : 'الوحدة',
        width: 90,
        type: 'dropdown',
        loading: unitDataLoading,
        options: unitData,
        visible: false,
        input: true,
      },
      {
        key: 'UnitName',
        label: Lang === 2 ? 'Unit' : 'الوحدة',
        width: 90,
        type: 'text',
        input: false,
        visible: true,
      },
      {
        key: 'itembalance',
        label: Lang === 2 ? 'Balance' : 'الرصيد',
        width: 140,
        loading: loader == 'itembalance',
        type: 'counter',
        input: false,
        visible: false,
      },
      {
        key: 'Balance',
        label: Lang === 2 ? 'Balance' : 'الرصيد',
        width: 140,
        input: false,
        visible: true,
        type: 'number',
      },
      {
        key: 'UnitCost',
        label: Lang === 2 ? 'Unit Cost' : 'تكلفة الوحدة',
        width: 140,
        input: colsData.UseCost,
        visible: colsData.UseCost,
        type: 'number',
      },
      {
        key: 'UnitPrice',
        label: Lang === 2 ? 'Unit Price' : 'سعر الوحدة',
        width: 140,
        input: colsData.UsePrice,
        visible: colsData.UsePrice,
        type: 'number',
      },
      {
        key: 'StatusID',
        label: Lang === 2 ? 'Status' : 'الحالة',
        width: 90,
        type: 'dropdown',
        input: colsData.Usestatues,
        visible: colsData.Usestatues,
        options: statusData,
      },
      {
        key: 'IsAssembly',
        label: Lang === 2 ? 'Is Assembly' : 'مجموعة',
        type: 'checkbox',
        input: false,
        visible: false,
      },
      {
        key: 'IsVariable',
        type: 'checkbox',
        input: false,
        visible: false,
      },
      {
        key: 'Qty',
        label: Lang === 2 ? 'Quantity' : 'الكمية',
        width: 90,
        required: true,
        type: 'number',
        input: true,
        visible: true,
      },
      {
        key: 'Qty2',
        label: Lang === 2 ? 'Quantity 2' : 'الكمية 2',
        width: 90,
        input: colsData.UseGard,
        visible: colsData.UseGard,
        type: 'number',
      },
      {
        key: 'Discount',
        visible: colsData.UseDiscount1,
        input: colsData.UseDiscount1,
        label: Lang === 2 ? 'Discount' : 'الخصم',
        type: 'number',
        width: 200,
      },
      {
        key: 'TotalCost',
        label: Lang === 2 ? 'Total Cost' : 'اجمالي التكلفة',
        input: false,
        visible: colsData.UseCost,
        width: 120,
      },
      {
        key: 'TotalPrice',
        label: Lang === 2 ? 'Total Price' : 'اجمالي السعر',
        input: false,
        visible: colsData.UsePrice,
        width: 120,
      },
      {
        key: 'SerialNo',
        label: Lang === 2 ? 'Serial No' : 'السيريال',
        width: 90,
        input: colsData.UseSerial,
        visible: colsData.UseSerial,
        type: 'text',
      },
      {
        key: 'AssetID',
        label: Lang === 2 ? 'Asset' : 'الاصل',
        width: 350,
        input: colsData.UseAssetID1,
        visible: colsData.UseAssetID1,
        type: 'dropdown',
        loading: assetListWoLoader,
        options: assetListWo,
      },
      {
        key: 'Result',
        label: Lang === 2 ? 'Result' : 'النتيجة',
        width: 200,
        input: colsData.UseResult,
        visible: colsData.UseResult,
        type: 'number',
      },
      {
        key: 'Description',
        label: Lang === 2 ? 'Description' : 'ملاحظات',
        width: 200,
        input: true,
        visible: true,
      },
    ],
    [
      Lang,
      colsData,
      sectionlist,
      filterdItemData,
      groupData,
      statusData,
      assetListWo,
      selectedItem,
      selectedGroup,
      SelctedSectionID,
    ]
  );

  const detailsData = [
    { label: Lang === 2 ? 'Order No' : 'رقم الإذن', value: detail?.OrderNo ?? '-' },
    {
      label: Lang === 2 ? 'Order Date' : 'تاريخ الإذن',
      value: detail?.OrderDate?.split('T')[0] ?? '-',
    },
    {
      label: Lang === 2 ? 'Order Description' : 'وصف الإذن',
      value: detail?.OrderDescription ?? '-',
    },
    {
      label: Lang === 2 ? 'Order Details' : 'تفاصيل الاذن',
      value: detail?.OrderData,
    },
    {
      label: Lang === 2 ? 'Status' : 'الحالة',
      value: detail?.StatusName,
    },
    // {
    //   label: Lang === 2 ? 'time' : 'الوقت',
    //   value: detail?.trx_time,
    // },
    { label: Lang === 2 ? 'Total' : 'الإجمالي', value: detail?.TotalCost ?? 0 },
    {
      label: Lang === 2 ? 'Order Type' : ' نوع الاذن',
      value: detail?.ProcessName,
    },
  ];

  console.log(SectionID);

  return (
    <MainLayout title={Lang === 2 ? 'Order Details' : 'تفاصيل الإذن'}>
      <InfoDetailes details={detailsData} />

      {/* Actions - صف أفقي تحت الجزء الرمادي */}

      <View
        className={`my-3 ${Rtl ? 'flex-row-reverse' : 'flex-row'} flex-wrap items-center justify-center gap-3`}>
        {detail?.trx_statusID != 6 && (
          <TouchableOpacity
            className="rounded-lg bg-green-500 p-3"
            onPress={() => {
              handleConfirm();
            }}>
            <Text className="text-center font-tregular text-white">
              {detail?.ApprovalName || (Lang === 2 ? 'Approve' : 'اعتماد')}
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity className="rounded-lg bg-primary p-3" onPress={() => setShowModal(true)}>
          <Text className="text-center font-tregular text-white">
            {Lang === 2 ? 'Order Transactions' : 'حركات الاذن'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="rounded-lg bg-green-500 p-3"
          onPress={() => {
            const reportId = '3359';
            router.push({
              pathname: '/ReportWebView',
              params: { ReportId: reportId, Value: String(OrderID) },
            });
          }}>
          <Text className="text-center font-tregular text-white">
            {Lang === 2 ? 'Order Report' : ' تقرير الاذن'}
          </Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
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
        </TouchableOpacity> */}

        <TouchableOpacity
          className="rounded-lg bg-primary p-3"
          onPress={() =>
            router.navigate({
              pathname: '/OrderAttributes',
              params: { OrderID: String(OrderID), ProcessID: String(ProcessID) },
            })
          }>
          <Text className="text-center font-tregular text-white">
            {Lang === 2 ? 'Attributes' : 'الخصائص'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
        <MainButton
          title={detail?.ApprovalName || (Lang === 2 ? 'Approve' : 'اعتماد')}
          disabled={!detail?.CanApprove || loader === 'confirm'}
          onPress={handleConfirm}
          loading={loader === 'confirm'}
          style={{ height: 36, paddingHorizontal: 12, borderRadius: 6 }}
          textStyle={{ fontSize: 13, fontWeight: '600' }}
        />
        <MainButton
          title={Lang === 2 ? 'Transactions' : 'حركات الإذن'}
          onPress={() => setShowModal(true)}
          theme="secondary"
          style={{ height: 36, paddingHorizontal: 12, borderRadius: 6 }}
          textStyle={{ fontSize: 13, fontWeight: '600' }}
        />
        <MainButton
          title={Lang === 2 ? 'Order Report' : 'تقرير الإذن'}
          onPress={() => {
            const reportId = '3359';
            router.push({
              pathname: '/ReportWebView',
              params: { ReportId: reportId, Value: String(OrderID) },
            });
          }}
          theme="secondary"
          style={{ height: 36, paddingHorizontal: 12, borderRadius: 6 }}
          textStyle={{ fontSize: 13, fontWeight: '600' }}
        />
        <MainButton
          title={Lang === 2 ? 'Orders List Report' : 'تقرير قائمة الأذون'}
          onPress={() => {
            const reportId = '3367';
            router.push({
              pathname: '/ReportWebView',
              params: {
                ReportId: reportId,
                SectionID: String(detail?.SectionID || 0),
                YearID: String(detail?.YearID || 0),
                ProcessID: String(detail?.ProcessID || ProcessID),
              },
            });
          }}
          theme="secondary"
          style={{ height: 36, paddingHorizontal: 12, borderRadius: 6 }}
          textStyle={{ fontSize: 13, fontWeight: '600' }}
        />
        <MainButton
          title={Lang === 2 ? 'Attributes' : 'الخصائص'}
          onPress={() =>
            router.push({
              pathname: '/OrderAttributes',
              params: { OrderID: String(OrderID), ProcessID: String(ProcessID) },
            })
          }
          theme="secondary"
          style={{ height: 36, paddingHorizontal: 12, borderRadius: 6 }}
          textStyle={{ fontSize: 13, fontWeight: '600' }}
        />
      </ScrollView> */}

      {/* Barcode */}
      {/* <View style={{ paddingHorizontal: 12, paddingTop: 8 }}>
        <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', android: undefined })}>
          <View style={{ marginTop: 8, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <MainButton
              title={
                barcodeFocused
                  ? Lang === 2
                    ? 'Lock Input'
                    : 'قفل الإدخال'
                  : Lang === 2
                    ? 'Focus Barcode'
                    : 'تركيز الباركود'
              }
              theme={barcodeFocused ? 'danger' : 'primary'}
              onPress={() => {
                setBarcodeFocused((prev) => !prev);
                setTimeout(() => {
                  if (barcodeFocused && inputRef.current) inputRef.current.blur();
                  else if (inputRef.current) inputRef.current.focus();
                }, 10);
              }}
              style={{ height: 36, paddingHorizontal: 12, borderRadius: 6 }}
              textStyle={{ fontSize: 13, fontWeight: '600' }}
            />
            <TextInput
              ref={inputRef}
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: '#ddd',
                borderRadius: 6,
                paddingHorizontal: 10,
                paddingVertical: 8,
                height: 36,
              }}
              placeholder={Lang === 2 ? 'Scan/Enter barcode' : 'أدخل/امسح باركود'}
              value={barcodeValue}
              onChangeText={setBarcodeValue}
              onSubmitEditing={insertBarcode}
              onBlur={() => {
                if (!barcodeFocused && inputRef.current) inputRef.current.focus();
              }}
              onFocus={() => {
                if (barcodeFocused && inputRef.current) inputRef.current.blur();
              }}
              autoCorrect={false}
              autoCapitalize="none"
              inputMode="numeric"
            />
            <MainButton
              title={Lang === 2 ? 'Add' : 'إضافة'}
              onPress={insertBarcode}
              loading={loader === 'barcode'}
              style={{ height: 36, paddingHorizontal: 12, borderRadius: 6 }}
              textStyle={{ fontSize: 13, fontWeight: '600' }}
            />
          </View>
        </KeyboardAvoidingView>
      </View> */}

      {/* Items */}
      <View className="flex-1">
        <MainGrid
          hasCrud={detail?.trx_statusID != 6}
          key={itemsKey}
          tableHead={itemsHead}
          pk="OrderDetailsID"
          spTrx="Sc_Orders_Details_Trx"
          spIns="Sc_Orders_Details_Ins"
          spUpd="Sc_Orders_Details_Upd"
          spDel="Sc_Orders_Details_Del"
          TrxParam={[
            { name: 'UserName', value: user.username || '' },
            { name: 'OrderID', value: OrderID },
            { name: 'LangID', value: Lang },
          ]}
          UpdBody={{ UserName: user.username || '' }}
          InsBody={{ UserName: user.username || '', OrderID }}
          DelParam={[
            { rowData: true, name: 'OrderDetailsID', value: 'OrderDetailsID' },
            { name: 'UserName', value: user.username || '' },
          ]}
          onAfterCrud={() => fetchDetails(true)}
        />
      </View>

      {/* Transactions modal */}
      <Modal visible={showModal} animationType="slide" onRequestClose={() => setShowModal(false)}>
        <MainLayout
          title={Lang === 2 ? 'Order Transactions' : 'حركات الإذن'}
          onNavClick={() => setShowModal(false)}>
          <View style={{ height: 520 }}>
            <MainGrid
              hasCrud={false}
              mixedWidth
              pk="OrderStatusID"
              spTrx="Sc_Orders__trx"
              TrxParam={[
                { name: 'OrderID', value: OrderID },
                { name: 'UserName', value: user.username || '' },
                { name: 'LangID', value: Lang },
              ]}
              tableHead={[
                { key: 'ApprovalID', visible: false },
                {
                  key: 'TrxDate',
                  visible: true,
                  label: Lang === 2 ? 'Transaction Date' : 'تاريخ الحركة',
                  width: 150,
                  type: 'date',
                },
                { key: 'TrxType', visible: true, label: Lang === 2 ? 'Type' : 'النوع', width: 90 },
                {
                  key: 'TrxName',
                  visible: true,
                  label: Lang === 2 ? 'Transaction' : 'الحركة',
                  width: 150,
                },
                {
                  key: 'UserName',
                  visible: true,
                  label: Lang === 2 ? 'User' : 'المستخدم',
                  width: 120,
                },
                { key: 'Days', visible: true, label: Lang === 2 ? 'Days' : 'الأيام', width: 90 },
                {
                  key: 'ActualDays',
                  visible: true,
                  label: Lang === 2 ? 'Actual Days' : 'الأيام الفعلية',
                  width: 110,
                },
              ]}
              // onRowPress={(row) => {
              //   router.push({
              //     pathname: '/OrderAttributes',
              //     params: {
              //       OrderID: String(row?.OrderID),
              //       ProcessID: String(row?.ProcessID),
              //     },
              //   });
              // }}
            />
          </View>
        </MainLayout>
      </Modal>
    </MainLayout>
  );
};

export default OrderDetails;
