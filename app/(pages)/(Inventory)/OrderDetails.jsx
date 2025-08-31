// app/(whatever)/OrderDetails.tsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  TextInput,
  Modal,
  Pressable,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { useGlobalContext } from '../../../context/GlobalProvider';
import api, { post } from '../../../utilities/api';
import { MainLayout, MainButton ,InfoDetailes} from '../../../components';
import MainGrid from '../../../components/grid/MainGrid';
import { useDropDown } from '../../../hooks/useDropDownData';

const OrderDetails = () => {
  const { OrderID: orderIdParam, ProcessID: processIdParam } = useLocalSearchParams();
  const OrderID = Number(orderIdParam);
  const ProcessID = Number(processIdParam);

  const router = useRouter();
  const { Lang, user ,company,DepartmentID} = useGlobalContext();

 const [detail, setDetail] = useState(null);
  const [colsData, setColsData] = useState({});
  const [loader, setLoader] = useState('');
  const [barcodeFocused, setBarcodeFocused] = useState(false);
  const [barcodeValue, setBarcodeValue] = useState('');
  const [itemsKey, setItemsKey] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [SelctedSectionID, setSelctedSectionID] = useState("");
  const [selectedGroup, setSelectedGroup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(false);

  const inputRef = useRef<TextInput | null>(null);

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
    if (!detail?.NextApprovalID) return;
    setLoader('confirm');
    try {
      await post('table/', {
        sp: 'sc_order_approvals_ins',
        OrderID,
        UserName: user.username,
        ApprovalID: detail?.NextApprovalID,
      });
      await fetchDetails(true);
    } catch (e) {
      console.log(e);
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
    "api_Sc_all_Section_List",
    {
      LangID: Lang,
      UserName: user.username,
      CompanyID: company,
    },
    "value",
    "label",
    [],
    colsData?.UseSection || 0
  );

  const { data: groupData, loading: groupDataloader } = useDropDown(
    "Sc_Item_Group_List2",
    {
      CompanyID: company,
      LangID: Lang,
      UserName: user.username,
      SectionID: SelctedSectionID,
      SelectedSectionID: SelctedSectionID,
      useSelectedSection: colsData.UseSection,
    },
    "GroupID",
    "GroupName"
  );
   const { data: filterdItemData, loading: filterdItemDataLoding } = useDropDown(
    "Sc_Items_List_trx",
    {
      UserName: user.username,
      LangID: Lang,
      GroupID: selectedGroup,
      DepartmentID: DepartmentID,
      OrderID:OrderID,
    },
    "ItemID",
    "FullItemName",
    [],
    selectedGroup || 0
  );
  const { data: unitData, loading: unitDataLoading } = useDropDown(
    "Sc_Item_Unit_ListByItem",
    {
      ItemID: selectedItem,
      UserName: user.username,
      LangID: Lang,
    },
    "UnitID",
    "UnitName",
    [],
    selectedItem || 0
  );
  const { data: statusData } = useDropDown(
    "Sc_Item_Status_List",
    { LangID: Lang },
    "StatusID",
    "StatusName",
    [],
    colsData?.UseStatusID || 0
  );
  const { data: assetListWo, loading: assetListWoLoader } = useDropDown(
    "Sc_Workorders_Asset_List",
    {
      CompanyID:company,
      LangID: Lang,
      UserName: user.username,
     // WorkorderID: activeRow?.WorkorderID,
    },
    "AssetID",
    "AssetName",
    [],
    colsData?.UseAssetID1 || 0
  );

  const itemsHead = useMemo(
    () => [
                    { keyName: "OrderDetailsID", visible: true },
                    { keyName: "OrderID", visible: true },
                    {
                      keyName: "SectionID",
                      label: Lang === 2 ? 'Section' : 'المخزن',
                      input: colsData.UseSection,
                      visible: false,
                      width: 110,
                      type: "dropdown",
                      options: sectionlist,
                      onChange: (value) => {
                        setSelctedSectionID(value);
                      },
                     // firstOption: true,
                    },
                    {
                      keyName: "SectionName",
                      label: Lang === 2 ? 'Section' : 'المخزن',
                      type: "text",
                      input: false,
                      visible: !!colsData.UseSection,
                      width: 110,
                    },

                    {
                      keyName: "GroupID",
                      label: Lang === 2 ? 'Group' : 'المجموعة',
                      width: 110,
                      type: "dropdown",
                      options: groupData,
                      onChange: (value) => {
                        setSelectedGroup(value);
                      },
                      input: true,
                      visible: false,
                    },
                    {
                      keyName: "GroupName",
                      label: Lang === 2 ? 'Group' : 'المجموعة',
                      width: 110,
                      type: "text",
                      input: false,
                      visible: true,
                    },

                    {
                      keyName: "ItemName",
                      label: Lang === 2 ? 'Item' : 'الصنف',
                      width: 200,
                      type: "text",
                      input: false,
                      visible: true,
                    },
                    {
                      keyName: "ItemID",
                      label: Lang === 2 ? 'Item' : 'الصنف',
                      onChange: (value) => {
                        setSelectedItem(value);
                      },
                      width: 200,
                      type: "dropdown",
                      options: filterdItemData,
                      loading: filterdItemDataLoding,
                      visible: false,
                      input: true,
                    },
                    {
                      keyName: "UnitID",
                      label: Lang === 2 ? 'Unit' : 'الوحدة',
                      width: 90,
                      type: "dropdown",
                      loading: unitDataLoading,
                      options: unitData,
                      visible: false,
                      input: true,
                    },
                    {
                      keyName: "UnitName",
                      label: Lang === 2 ? 'Unit' : 'الوحدة',
                      width: 90,
                      type: "text",
                      input: false,
                      visible: true,
                    },
                    {
                      keyName: "itembalance",
                      label: Lang === 2 ? 'Balance' : 'الرصيد',
                      width: 140,
                      //value: `${itembalance}`,
                      //notinput: true,
                      loading: loader == "itembalance",
                      type: "counter",
                      input: true,
                      visible: false,
                    },

                    {
                      keyName: "Balance",
                      label: Lang === 2 ? 'Balance' : 'الرصيد',
                      width: 140,
                      input: false,
                      visible: true,
                      type: 'number',
                      //format: formatNumber,
                    },

                    {
                      keyName: "UnitCost",
                      label: Lang === 2 ? 'Unit Cost' : 'تكلفة الوحدة',
                      width: 140,
                      input: colsData.UseCost,
                      visible: colsData.UseCost,
                      type: "number",
                    },
                    {
                      keyName: "UnitPrice",
                      label: Lang === 2 ? 'Unit Price' : 'سعر الوحدة',
                      width: 140,
                      input: colsData.UsePrice,
                      visible: colsData.UsePrice,
                      type: "number",
                    },
                    {
                      keyName: "StatusID",
                      label: Lang === 2 ? 'Status' : 'الحالة',
                      width: 90,
                      type: "dropdown",
                      input: colsData.Usestatues,
                      visible: colsData.Usestatues,
                      options: statusData,
                    },
                    {
                      keyName: "IsAssembly",
                      label: Lang === 2 ? 'Is Assembly' : 'مجموعة',
                      type: "checkbox",
                      input: false,
                      visible: false,
                    },
                    {
                      keyName: "IsVariable",
                      type: "checkbox",
                      input: false,
                      visible: false,
                    },

                    {
                      keyName: "Qty",
                      label: Lang === 2 ? 'Quantity' : 'الكمية',
                      width: 90,
                      isRequired: true,
                      type: "number",
                      input: true,
                    },
                    {
                      keyName: "Qty2",
                      label: Lang === 2 ? 'Quantity 2' : 'الكمية 2',
                      width: 90,
                      input: colsData.UseGard,
                      visible: colsData.UseGard,
                      type: "number",
                    },
                    {
                      keyName: "Discount",
                      visible: colsData.UseDiscount1,
                      input: colsData.UseDiscount1,
                      label: Lang === 2 ? 'Discount' : 'الخصم',
                      type: "number",
                      width: 200,
                    },

                    {
                      keyName: "TotalCost",
                      label: Lang === 2 ? 'Total Cost' : 'اجمالي التكلفة',
                      input: false,
                      visible: colsData.UseCost,
                      width: 120,
                    },
                    {
                      keyName: "TotalPrice",
                      label: Lang === 2 ? 'Total Price' : 'اجمالي السعر',
                      input: false,
                      visible: colsData.UsePrice,
                      width: 120,
                    },
                    {
                      keyName: "SerialNo",
                      label: Lang === 2 ? 'Serial No' : 'السيريال',
                      width: 90,
                      input: colsData.UseSerial,
                      visible: colsData.UseSerial,
                      type: "text",
                    },
                    {
                      keyName: "AssetID",
                      label: Lang === 2 ? 'Asset' : 'الاصل',
                      width: 350,
                      input: colsData.UseAssetID1,
                      visible: colsData.UseAssetID1,
                      type: "dropdown",
                      loading: assetListWoLoader,
                      options: assetListWo,
                    },
                    {
                      keyName: "Result",
                      label: Lang === 2 ? 'Result' : 'النتيجة',
                      width: 200,
                      input: colsData.UseResult,
                      visible: colsData.UseResult,
                      type: "number",
                    },
                    {
                      keyName: "Description",
                      label: Lang === 2 ? 'Description' : 'الوصف',
                      width: 200,
                      input: true,
                      visible: true,
                    },
    ],
    [Lang, colsData],
  );
  const detailsData = [
      { label: Lang === 2 ? 'Order No' : 'رقم الإذن', value: detail?.OrderNo ?? '-' },
      { label: Lang === 2 ? 'Order Date' : 'تاريخ الإذن', value: detail?.OrderDate ?? '-' },
      { label: Lang === 2 ? 'Status' : 'الحالة', value: detail?.StatusName ?? '-' },
      { label: Lang === 2 ? 'Total' : 'الإجمالي', value: detail?.TotalCost ?? 0 },
    ];

  return (
    <MainLayout title={Lang === 2 ? 'Order Details' : 'تفاصيل الإذن'}>
      {/* Info (الجزء الرمادي) */}
      <View
        style={{
          paddingHorizontal: 12,
          paddingVertical: 10,
          backgroundColor: '#f7f7f7',
          borderBottomWidth: 1,
          borderBottomColor: '#eee',
        }}
      >
        <InfoDetailes details={detailsData}/>

        {/* Actions - صف أفقي تحت الجزء الرمادي */}
        <View
          style={{
            backgroundColor: '#f0f0f0',
            borderRadius: 8,
            paddingVertical: 8,
            paddingHorizontal: 8,
            marginTop: 10,
          }}
        >
          <ScrollView  showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
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
            {/* يفتح صفحة خصائص الإذن (Attributes) */}
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
          </ScrollView>
        </View>
      </View>

      {/* Barcode */}
      <View style={{ paddingHorizontal: 12, paddingTop: 8 }}>
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
      </View>

      {/* Items */}
      <View style={{ height: 260, paddingHorizontal: 12, marginTop: 8 }}>
        <MainGrid
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
        <MainLayout title={Lang === 2 ? 'Order Transactions' : 'حركات الإذن'}>
          <View style={{ height: 520 }}>
            <MainGrid
              haveCrud={false}
              pk="OrderStatusID"
              tableHead={[
                { key: 'ApprovalID', visible: false },
                { key: 'TrxDate', visible: true, label: Lang === 2 ? 'Transaction Date' : 'تاريخ الحركة', width: 150 },
                { key: 'TrxType', visible: true, label: Lang === 2 ? 'Type' : 'النوع', width: 90 },
                { key: 'TrxName', visible: true, label: Lang === 2 ? 'Transaction' : 'الحركة', width: 150 },
                { key: 'UserName', visible: true, label: Lang === 2 ? 'User' : 'المستخدم', width: 120 },
                { key: 'Days', visible: true, label: Lang === 2 ? 'Days' : 'الأيام', width: 90 },
                { key: 'ActualDays', visible: true, label: Lang === 2 ? 'Actual Days' : 'الأيام الفعلية', width: 110 },
              ]}
              spTrx="Sc_Orders__trx"
              TrxParam={[
                { name: 'OrderID', value: OrderID },
                { name: 'UserName', value: user.username || '' },
                { name: 'LangID', value: Lang },
              ]}
               onRowPress={(row) => {
                router.push({
                pathname: '/OrderAttributes',
                params: {
                    OrderID: String(row?.OrderID),
                    ProcessID: String(row?.ProcessID),
                },
                });
          }}
            />
          </View>
         
        </MainLayout>
      </Modal>
    </MainLayout>
  );
};

export default OrderDetails;