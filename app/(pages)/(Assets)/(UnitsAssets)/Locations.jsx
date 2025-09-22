import { MainLayout } from '../../../../components';
import MainGrid from '../../../../components/grid/MainGrid';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import AssetHomeLang from '../../../../constants/Lang/AssetManagment/AssetHomeLang';
import { useDropDown } from '../../../../hooks/useDropDownData';

const LocationsLang = {
  LocationsData: {
    1: 'بيانات المواقع',
    2: 'Locations Data',
  },
  SubLocationID: {
    1: ' ',
    2: '',
  },
  SubLocationCode: {
    1: 'الكود',
    2: 'Code',
  },
  SubLocationName: {
    1: 'اسم الموقع الفرعي',
    2: 'Sub Location Name',
  },
  DepartmentCode: {
    1: 'كود الإدارة',
    2: 'Department Code',
  },
  SubDepartmentID: {
    1: 'اسم الإدارة الفرعية',
    2: 'Sub Department Name',
  },
  CountAssetID: {
    1: 'عدد الأصول',
    2: 'Assets Count',
  },
  Instructions: {
    1: 'تعليمات وملاحظات',
    2: 'Instructions',
  },
};

const Locations = () => {
  const { DepartmentID, Lang, company, user } = useGlobalContext();

  const { data: SubDepartmentsList } = useDropDown(
    'api_ms_SubDepartment_List',
    { DepartmentID, UserName: user.username, LangID: Lang, CompanyID: company },
    'SubDepartmentID',
    'DepartmentName'
  );

  return (
    <MainLayout title={LocationsLang.LocationsData[Lang]}>
      <MainGrid
        pk={'SubLocationID'}
        spTrx={'api_ms_SubLocation_Trx'}
        spIns={'api_ms_SubLocation_Ins'}
        spUpd={'api_ms_SubLocation_Upd'}
        spDel={'api_ms_SubLocation_Del'}
        TrxParam={[
          { name: 'DepartmentID', value: DepartmentID },
          { name: 'CompanyID', value: company },
          { name: 'UserName', value: user.username },
          { name: 'LangID', value: Lang },
        ]}
        InsBody={{
          DepartmentID: DepartmentID,
          UserName: user.username,
          LangID: Lang,
          CompanyID: company,
        }}
        UpdBody={{
          DepartmentID: DepartmentID,
          UserName: user.username,
          LangID: Lang,
          CompanyID: company,
        }}
        DelParam={[
          { rowData: true, name: 'SubLocationID', value: 'SubLocationID' },
          { name: 'DepartmentID', value: DepartmentID },
          { name: 'CompanyID', value: company },
          { name: 'UserName', value: user.username },
          { name: 'LangID', value: Lang },
        ]}
        tableHead={[
          {
            key: 'SubLocationID',
            type: 'number',
            input: false,
            visible: false,
            required: false,
            width: 120,
            label: LocationsLang.SubLocationID[Lang],
          },
          {
            key: 'SubLocationCode',
            type: 'text',
            input: true,
            visible: true,
            required: true,
            width: 120,
            label: LocationsLang.SubLocationCode[Lang],
          },
          {
            key: 'SubLocationName',
            type: 'text',
            input: true,
            visible: true,
            required: true,
            width: 250,
            label: LocationsLang.SubLocationName[Lang],
          },
          {
            key: 'DepartmentCode',
            type: 'text',
            input: false,
            visible: true,
            required: false,
            width: 120,
            label: LocationsLang.DepartmentCode[Lang],
          },
          {
            key: 'SubDepartmentID',
            input: true,
            required: false,
            visible: false,
            type: 'dropdown',
            width: 200,
            options: SubDepartmentsList,
            label: LocationsLang.SubDepartmentID[Lang],
          },
          {
            key: 'DepartmentName',
            visible: true,
            type: 'text',
            width: 200,
            label: LocationsLang.SubDepartmentID[Lang],
          },
          {
            key: 'CountAssetID',
            type: 'number',
            input: false,
            visible: true,
            required: false,
            width: 120,
            label: LocationsLang.CountAssetID[Lang],
          },
          {
            key: 'Instructions',
            type: 'text',
            input: true,
            visible: true,
            required: false,
            width: 200,
            label: LocationsLang.Instructions[Lang],
          },
        ]}
        mixedWidth
        routeTo={{
          path: '/LocationDetails',
          hasParams: true,
          params: {
            DepartmentID,
          },
        }}
      />
    </MainLayout>
  );
};

export default Locations;
