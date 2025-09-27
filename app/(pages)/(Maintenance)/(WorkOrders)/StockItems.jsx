/* eslint-disable eqeqeq */
import { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from 'react-native';
import { MainLayout, MainGrid, MainButton, InputModal } from '../../../../components';
import { useLocalSearchParams } from 'expo-router';
import { useDropDown } from '../../../../hooks/useDropDownData';
import StockItemsLang from '../../../../constants/Lang/Maintenance/WorkOrders/StockItemsLang';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import Toast from 'react-native-toast-message';
import api from '../../../../utilities/api';
import { RenderInput } from '../../../../utilities';

const StockItems = () => {
  const {
    TradeID,
    LocationID,
    WorkorderID,
    FailureDescription,
    WorkorderCode,
    WorkorderName,
    WorkorderTypeID,
    WorkorderTypeName,
    WorkorderStatusName,
    WorkorderStatusID,
    ...restParams
  } = useLocalSearchParams();

  const { Lang, user, company, DepartmentID, Rtl } = useGlobalContext(); // Get the current language from global context
  const [SectionID, setSectionID] = useState(null);
  const [GroupID, setGroupID] = useState(null);
  const [ItemID, setItemID] = useState(null);
  const [row, setRow] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [reqLoading, setreqLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [manipulatedRow, setManipulatedRow] = useState({});

  const { data: Section } = useDropDown(
    'api_ms_MaterialServices_List',
    {
      IsServices: 0,
      UserName: user.username,
      LangID: Lang,
      CompanyID: company,
    },
    'SectionID',
    'SectionName'
  );

  const { data: Group } = useDropDown(
    'api_Sc_Item_Group_List',
    {
      CompanyID: company,
      SectionID,
      UserName: user.username,
      LangID: Lang,
    },
    'GroupID',
    'GroupName',
    [SectionID]
  );

  const { data: Items } = useDropDown(
    'api_Sc_Items_List4',
    {
      GroupID,
      UserName: user.username,
      LangID: Lang,
    },
    'ItemID',
    'FullItemName',
    [GroupID]
  );

  const { data: UnitList } = useDropDown(
    'api_Sc_Units_List2',
    {
      ItemID,
      UserName: user.username,
      LangID: Lang,
    },
    'UnitID',
    'UnitName',
    [ItemID]
  );

  const { data: Asset } = useDropDown(
    'api_ms_Workorder_Assets_Trx',
    { LocationID: LocationID, WorkorderID: WorkorderID },
    'AssetID',
    'AssetName'
  );

  const { data: groupData, loading: groupDataloader } = useDropDown(
    'api_Sc_Item_Group_List2',
    {
      CompanyID: company,
      LangID: Lang,
      UserName: user.username,
      SectionID: 1022,
    },
    'GroupID',
    'GroupName'
  );

  const { data: unitList, loading: unitListLoading } = useDropDown(
    'api_Sc_Item_Unit_List',
    {
      UserName: user.username,
      LangID: Lang,
      CompanyID: company,
    },
    'UnitID',
    'UnitName'
  );

  const handleConfirmIssue = async () => {
    if (!row) {
      Toast.show({
        type: 'error',
        ...StockItemsLang.NoMaterialSelected[Lang],
      });
      return;
    }

    if (row?.IssueDate) {
      Toast.show({
        type: 'error',
        ...StockItemsLang.AlreadyIssued[Lang],
      });
      return;
    }

    if (row?.IsInStores == 0) {
      Toast.show({
        type: 'error',
        ...StockItemsLang.NotInStores[Lang],
      });
      return;
    }

    setConfirmLoading(true);

    try {
      await api.post('table/', {
        sp: 'api_ms_WorkOrders_Materials_ConfirmIssue',
        WorkorderMaterialID: row?.WorkorderMaterialID,
        UserName: user.username,
        LangID: Lang,
      });

      Toast.show({
        type: 'success',
        ...StockItemsLang.Confirmed[Lang],
      });
    } catch (error) {
      console.error(error);
      Toast.show({
        type: 'error',
        ...StockItemsLang.Failed[Lang],
      });
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleChange = (key, val) => {
    setManipulatedRow((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  const itemCreation = [
    {
      key: 'ItemCode',
      label: StockItemsLang.ItemCode[Lang],
      type: 'number',
      input: true,
      required: true,
      onChange: (val) => handleChange('ItemCode', val),
    },
    {
      key: 'ItemName',
      label: StockItemsLang.ItemName[Lang],
      type: 'text',
      span: 2,
      onChange: (val) => handleChange('ItemName', val),
    },
    {
      key: 'GroupID',
      label: StockItemsLang.GroupID[Lang],
      type: 'dropdown',
      options: groupData,
      input: true,
      required: true,
      onChange: (val) => handleChange('GroupID', val),
    },
    {
      key: 'UnitID',
      label: StockItemsLang.UnitID[Lang],
      type: 'dropdown',
      options: unitList,
      required: true,
      input: true,
      onChange: (val) => handleChange('UnitID', val),
    },
    {
      key: 'UnitCost',
      label: StockItemsLang.UnitCost[Lang],
      type: 'number',
      required: true,
      input: true,
      onChange: (val) => handleChange('UnitCost', val),
    },
    {
      key: 'Qty',
      label: StockItemsLang.Qty[Lang],
      type: 'number',
      required: true,
      input: true,
      onChange: (val) => handleChange('Qty', val),
    },
  ];

  const handleRequestNewItem = async () => {
    const requiredFields = ['ItemCode', 'GroupID', 'UnitID', 'UnitCost', 'Qty'];

    const isMissing = requiredFields.some((field) => !manipulatedRow?.[field]);
    if (isMissing) {
      Toast.show({
        type: 'error',
        text1: StockItemsLang.fillMandatoryInputs[Lang],
      });
      setShowModal(false);
      return;
    }

    setreqLoading(true);

    try {
      await api.post('table/', {
        sp: 'api_ms_create_item_from_workOrder',
        CompanyID: company,
        DepartmentID,
        WorkorderID,
        ...manipulatedRow,
      });

      setShowModal(false);

      Toast.show({
        type: 'success',
        text1: StockItemsLang.newItemSuccess[Lang],
      });
    } catch (error) {
      console.error(error);

      Toast.show({
        type: 'error',
        text1: StockItemsLang.newItemfailed[Lang],
      });
    } finally {
      setreqLoading(false);
    }
  };

  return (
    <>
      <MainLayout title={StockItemsLang.PageTitle[Lang]} className="">
        <View className="flex-1">
          <View className={`my-3 gap-3 px-4 ${Rtl ? 'flex-row-reverse' : 'flex-row'} items-center`}>
            <TouchableOpacity
              onPress={() => setShowModal(true)}
              className={`rounded-lg bg-[#E8F0EE] p-3`}>
              <Text className={'text-[#428C71]'}>{StockItemsLang.RequestNewItem[Lang]}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleConfirmIssue}
              className={`rounded-lg ${!row || row?.IssueDate || row?.IsInStores == 0 ? 'bg-slate-600' : 'bg-[#E8F0EE]'} p-3`}>
              <Text
                className={` ${!row || row?.IssueDate || row?.IsInStores == 0 ? 'text-white' : 'text-[#428C71]'}`}>
                {`${StockItemsLang.TableHeaders.ConfirmIssue[Lang]}${confirmLoading ? '...' : ''}`}
              </Text>
            </TouchableOpacity>
          </View>
          <MainGrid
            onRowPress={(row) => setRow(row)}
            pk={'WorkorderMaterialID'}
            spTrx={'api_ms_WorkOrders_Materials_Trx7'}
            spIns={'api_ms_WorkOrders_Materials_Ins'}
            spDel={'api_ms_WorkOrders_Materials_Del'}
            spUpd={'api_ms_WorkOrders_Materials_Upd'}
            TrxParam={[
              { name: 'DepartmentID', value: DepartmentID },
              { name: 'LangID', value: Lang },
              { name: 'UserName', value: user.username },
              { name: 'WorkorderID', value: WorkorderID },
            ]}
            UpdBody={{ WorkorderID, DepartmentID, LangID: Lang, UserName: user.username }}
            InsBody={{ WorkorderID, DepartmentID, LangID: Lang, UserName: user.username }}
            DelParam={[
              {
                rowData: true,
                name: 'WorkorderMaterialID',
                value: 'WorkorderMaterialID',
              },
              { name: 'DepartmentID', value: DepartmentID },
              { name: 'WorkorderID', value: WorkorderID },
            ]}
            TrxDependency={[WorkorderID]}
            mixedWidth
            hasCrud={parseInt(WorkorderStatusID) < 3 || parseInt(WorkorderStatusID) == 5}
            tableHead={[
              {
                key: 'SectionID',
                label: StockItemsLang.TableHeaders.Section[Lang],
                type: 'dropdown',
                options: Section,
                input: 'true',
                required: true,
                onChange: (val) => setSectionID(val),
              },
              {
                key: 'SectionName',
                label: StockItemsLang.TableHeaders.Section[Lang],
                input: 'false',
                visible: true,
                width: 150,
              },
              {
                key: 'GroupID',
                label: StockItemsLang.TableHeaders.Group[Lang],
                type: 'dropdown',
                options: Group,
                input: 'true',
                onChange: (val) => setGroupID(val),
                required: true,
              },
              {
                key: 'GroupName',
                label: StockItemsLang.TableHeaders.Group[Lang],
                type: 'dropdown',
                options: Group,
                visible: 'true',
                width: 150,
              },
              {
                key: 'ItemID',
                label: StockItemsLang.TableHeaders.Item[Lang],
                type: 'dropdown',
                options: Items,
                input: 'true',
                onChange: (val) => setItemID(val),
                required: true,
              },
              {
                key: 'ItemName',
                label: StockItemsLang.TableHeaders.Item[Lang],
                visible: 'true',
                width: 150,
              },
              {
                key: 'UnitID',
                label: StockItemsLang.TableHeaders.Unit[Lang],
                type: 'dropdown',
                options: UnitList,
                input: 'true',
              },
              {
                key: 'UnitName',
                label: StockItemsLang.TableHeaders.Unit[Lang],
                visible: 'true',
                width: 150,
              },
              {
                key: 'Quantity',
                label: StockItemsLang.TableHeaders.Quantity[Lang],
                type: 'number',
                input: 'true',
                visible: 'true',
                width: 150,
                required: true,
              },
              {
                key: 'TotalCost',
                label: StockItemsLang.TableHeaders.TotalCost[Lang],
                type: 'number',
                visible: true,
                width: 125,
              },
              {
                key: 'OrderNo',
                label: StockItemsLang.TableHeaders.OrderNo[Lang],
                type: 'number',
                visible: true,
                width: 125,
              },
              {
                key: 'OrderDate',
                label: StockItemsLang.TableHeaders.OrderDate[Lang],
                type: 'date',
                visible: true,
                width: 125,
                preventDefault: true,
              },
              {
                key: 'IsRequired',
                label: StockItemsLang.TableHeaders.IsRequired[Lang],
                type: 'checkbox',
                input: 'true',
                visible: 'true',
                width: 130,
              },
              {
                key: 'IssueDate',
                label: StockItemsLang.TableHeaders.IssueDate[Lang],
                type: 'date',
                input: 'true',
                visible: 'true',
                width: 200,
                preventDefault: true,
              },
              // {
              //   key: 'GroupName',
              //   label: StockItemsLang.TableHeaders.GroupName[Lang],
              //   visible: 'true',
              //   width: 100,
              // },
              {
                key: 'AssetCode',
                label: StockItemsLang.TableHeaders.AssetCode[Lang],
                visible: 'true',
                width: 150,
              },
              {
                key: 'AssetID',
                label: StockItemsLang.TableHeaders.Asset[Lang],
                type: 'dropdown',
                options: Asset,
                input: 'true',
                width: 150,
              },
              {
                key: 'AssetName',
                label: StockItemsLang.TableHeaders.AssetName[Lang],
                visible: 'true',
                width: 150,
              },
              {
                key: 'Repeated',
                label: StockItemsLang.TableHeaders.Repeated[Lang],
                type: 'checkbox',
                input: true,
                visible: true,
                width: 110,
              },
              {
                key: 'LoanNo',
                label: StockItemsLang.TableHeaders.LoanNo[Lang],
                visible: true,
                width: 110,
              },
              {
                key: 'DirectPurchase',
                label: StockItemsLang.TableHeaders.DirectPurchase[Lang],
                type: 'checkbox',
                visible: true,
                width: 110,
              },
              {
                key: 'IsInStores',
                label: StockItemsLang.TableHeaders.IsInStores[Lang],
                type: 'checkbox',
                visible: true,
                width: 110,
              },
              {
                key: 'Confirm Issue',
                label: StockItemsLang.TableHeaders.ConfirmIssue[Lang],
                type: 'checkbox',
                visible: true,
                width: 110,
              },
            ]}
          />
        </View>
      </MainLayout>

      <InputModal
        title={StockItemsLang.RequestNewItem[Lang]}
        visible={showModal}
        onClose={() => setShowModal(false)}
        data={itemCreation}
        manipulatedRow={manipulatedRow}
        loading={reqLoading}
        buttonTitle={StockItemsLang.RequestNewItem[Lang]}
        onButtonPress={handleRequestNewItem}
      />
    </>
  );
};

export default StockItems;
