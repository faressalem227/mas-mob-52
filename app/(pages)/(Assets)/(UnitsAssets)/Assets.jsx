import { useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import AssetHomeLang from '../../../../constants/Lang/AssetManagment/AssetHomeLang';
import { useDropDown } from '../../../../hooks/useDropDownData';
import WorkOrdersLang from '../../../../constants/Lang/Maintenance/WorkOrders/WorkOrdersLang';
import api from '../../../../utilities/api';
import { MainLayout, MainGrid, Dropdown } from '../../../../components';
import Toast from 'react-native-toast-message';
import { useGlobalContext } from '../../../../context/GlobalProvider';

const AssetsLang = {
  AssetsData: {
    1: 'بيانات الأصول',
    2: 'Assets Data',
  },
  SubLocationName: {
    1: 'الموقع الفرعي',
    2: 'Sub Location Name',
  },
  DepartmentName: {
    1: 'اسم الإدارة',
    2: 'Department Name',
  },
  AssetID: {
    1: 'معرف الأصل',
    2: 'Asset ID',
  },
  AssetParentID: {
    1: 'الأصل الرئيسي',
    2: 'Parent Asset',
  },
  AssetCode: {
    1: 'الكود',
    2: 'Code',
  },
  AssetName: {
    1: 'اسم الأصل',
    2: 'Asset Name',
  },
  SubLocationID: {
    1: 'الموقع الفرعي',
    2: 'Sub Location',
  },
  AssetClassID: {
    1: 'التصنيف',
    2: 'Classification',
  },
  AssetClassName: {
    1: 'التصنيف',
    2: 'Classification',
  },
  AssetStatusID: {
    1: 'حالة الأصل',
    2: 'Asset Status',
  },
  AssetStatusNameAr: {
    1: 'حالة الأصل',
    2: 'Asset Status',
  },
  AssetImportance: {
    1: 'الأهمية',
    2: 'Importance',
  },
  IsActive: {
    1: 'فعال',
    2: 'Active',
  },

  AssetCopy: {
    1: 'نسخ الاصل',
    2: 'Asset copy',
  },
};

const Assets = () => {
  const { user, company, DepartmentID, Lang, Rtl } = useGlobalContext();
  const [loading, setLoading] = useState(false); // Ensure loading state is defined
  const [TradeID, setTradeID] = useState(16);
  const [isLoading, setIsLoading] = useState(false);
  const [activeRow, setActiveRow] = useState(null);

  const [assetsCounter, setAssetsCounter] = useState(2);

  const { data: sds_SubLocation } = useDropDown(
    'api_ms_SubLocation_List',
    {
      DepartmentID,
      UserName: user.username,
      LangID: Lang,
    },
    'SubLocationID',
    'SubLocationName'
  );

  const { data: sds_Asset_classes } = useDropDown(
    'api_asset_classes_List3_Trade',
    {
      CompanyID: company,
      TradeID,
    },
    'AssetClassID',
    'FullAssetClassName',
    [TradeID]
  );

  const { data: sds_AssetStatus } = useDropDown(
    'api_ms_AssetStatus_List',
    {
      DepartmentID,
      ComapnyID: company,
      UserName: user.username,
      LangID: Lang,
    },
    'AssetStatusID',
    'AssetStatusNameAr'
  );

  const { data: ms_Trade } = useDropDown(
    'api_ms_Trade_List_pm',
    {
      DepartmentID,
      UserName: user.username,
      LangID: Lang,
      CompanyID: company,
    },
    'TradeID',
    'TradeName'
  );

  const AssetCopyBtn = async () => {
    if (activeRow?.AssetID) {
      try {
        setIsLoading(true);
        const response = await api.post('table/', {
          sp: 'ms_Assets_Copy',
          AssetID: activeRow?.AssetID,
        });
        console.log(response);
        setAssetsCounter((prev) => prev + 2);
        Toast.show({
          type: 'success',
          text1: "'تم النسخ بنجاح'",
        });
      } catch (error) {
        Toast.show({ type: 'error', text1: 'حدث خطأ أثناء عملية النسخ' });
      } finally {
        setIsLoading(false);
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'يجب اختيار أصل أولا',
      });
    }
  };

  // console.log(TradeID, company);

  // console.log(activeRow.AssetID);

  return (
    <MainLayout title={AssetHomeLang.Assets[Lang]} loading={loading}>
      <View className="p-4">
        <Dropdown
          placeholder={WorkOrdersLang.TradeName[Lang]}
          label={WorkOrdersLang.TradeName[Lang]}
          initailOption={ms_Trade[0]?.key}
          data={ms_Trade}
          onChange={(e) => {
            setTradeID(e);
          }}
        />

        <View
          className={`my-4 ${Rtl ? 'flex-row-reverse' : 'flex-row'} items-center justify-center gap-3`}>
          <TouchableOpacity className="rounded-lg bg-primary p-2" onPress={AssetCopyBtn}>
            <Text className="font-tregular text-white">{AssetsLang.AssetCopy[Lang]}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex-1">
        <MainGrid
          onRowPress={(row) => setActiveRow(row)}
          pk={'AssetID'}
          spTrx={'api_ms_Assets__Trx'}
          spIns={'api_ms_Assets__Ins'}
          spUpd={'api_ms_Assets__Upd'}
          spDel={'api_ms_Assets__Del'}
          TrxParam={[
            { name: 'DepartmentID', value: DepartmentID },
            { name: 'CompanyID', value: company },
            { name: 'UserName', value: user.username },
            { name: 'LangID', value: Lang },
            { name: 'TradeID', value: TradeID },
          ]}
          InsBody={{
            DepartmentID,
            UserName: user.username,
            LangID: Lang,
            CompanyID: company,
            TradeID,
          }}
          UpdBody={{
            DepartmentID,
            UserName: user.username,
            LangID: Lang,
            CompanyID: company,
            TradeID,
          }}
          DelParam={[
            { rowData: true, name: 'AssetID', value: 'AssetID' },
            { name: 'DepartmentID', value: DepartmentID },
            { name: 'CompanyID', value: company },
            { name: 'UserName', value: user.username },
            { name: 'LangID', value: Lang },
          ]}
          TrxDependency={[TradeID, assetsCounter]}
          mixedWidth
          tableHead={[
            {
              key: 'DepartmentName',
              type: 'text',
              input: false,
              visible: false,
              required: false,
              width: 0,
              label: AssetsLang.DepartmentName[Lang],
            },
            {
              key: 'AssetID',
              type: 'number',
              input: false,
              visible: false,
              required: false,
              width: 0,
              label: AssetsLang.AssetID[Lang],
            },
            {
              key: 'AssetParentID',
              type: 'text',
              input: false,
              visible: false,
              required: false,
              width: 0,
              label: AssetsLang.AssetParentID[Lang],
            },
            {
              key: 'AssetCode',
              type: 'text',
              input: true,
              visible: true,
              required: false,
              width: 100,
              label: AssetsLang.AssetCode[Lang],
              required: true,
            },
            {
              key: 'AssetName',
              type: 'text',
              input: true,
              visible: true,
              required: true,
              width: 280,
              label: AssetsLang.AssetName[Lang],
            },
            {
              key: 'SubLocationID',
              type: 'dropdown',
              input: true,
              visible: false,
              required: true,
              width: 250,
              options: sds_SubLocation,
              label: AssetsLang.SubLocationID[Lang],
            },
            {
              key: 'SubLocationName',
              type: 'text',
              input: false,
              visible: true,
              required: false,
              width: 320,
              label: AssetsLang.SubLocationName[Lang],
            },
            {
              key: 'AssetClassID',
              type: 'dropdown',
              input: true,
              visible: false,
              required: false,
              width: 320,
              options: sds_Asset_classes,
              label: AssetsLang.AssetClassID[Lang],
            },
            {
              key: 'AssetClassName',
              type: 'text',
              input: false,
              visible: true,
              required: false,
              width: 320,
              label: AssetsLang.AssetClassName[Lang],
            },
            {
              key: 'AssetStatusID',
              type: 'dropdown',
              defaultValue: sds_AssetStatus[0]?.value,
              input: true,
              visible: false,
              required: false,
              width: 100,
              options: sds_AssetStatus,
              label: AssetsLang.AssetStatusID[Lang],
            },
            {
              key: 'AssetStatusNameAr',
              type: 'text',
              input: false,
              visible: true,
              required: false,
              width: 100,
              label: AssetsLang.AssetStatusNameAr[Lang],
            },
            {
              key: 'AssetImportance',
              type: 'number',
              input: false,
              visible: true,
              required: false,
              width: 100,
              label: AssetsLang.AssetImportance[Lang],
            },
            {
              key: 'IsActive',
              type: 'checkbox',
              input: true,
              visible: true,
              defaultValue: true,
              required: false,
              width: 100,
              label: AssetsLang.IsActive[Lang],
            },
          ]}
          routeTo={{
            path: 'AssetDetails',
            hasParams: true,
            params: {
              TradeID,
            },
          }}
        />
      </View>
    </MainLayout>
  );
};

export default Assets;
