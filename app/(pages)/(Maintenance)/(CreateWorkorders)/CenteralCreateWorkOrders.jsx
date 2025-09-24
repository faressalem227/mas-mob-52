import { useState } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import { MainLayout, Dropdown, DatePickerInput, SmallButton } from '../../../../components';
import { useDropDown } from '../../../../hooks/useDropDownData';
import CreateWorkOrdersLang from '../../../../constants/Lang/Maintenance/PreventiveMaintenanceHome/CreateWorkOrders';
const CreateWorkOrders = () => {
  const { Rtl, DepartmentID, Lang, company, user } = useGlobalContext();
  const date = new Date();
  const [DateFrom, setDateFrom] = useState(date);
  const [DateTo, setDateTo] = useState(date);

  const [TradeID, setTradeID] = useState(1);
  const [ProcedureTypeID, setProcedureTypeID] = useState(1);

  const router = useRouter();

  const { data } = useDropDown(
    'api_ms_Trade_List',
    {
      DepartmentID: DepartmentID,
      CompanyID: company,
      LangID: Lang,
      UserName: user.username,
    },
    'TradeID',
    'TradeName'
  );
  const { data: ProcedureTypeData } = useDropDown(
    'api_ms_Procedures_Types_List',
    {
      CompanyID: company,
      LangID: Lang,
    },
    'ProcedureTypeID',
    'ProcedureTypeName'
  );

  console.log(data);

  return (
    <MainLayout title={CreateWorkOrdersLang.CenteralpageTitle[Lang]}>
      <View className="flex-1">
        <View className="my-4 gap-3 px-4">
          <DatePickerInput
            title={CreateWorkOrdersLang.StartDate[Lang]}
            setDate={(val) => setDateFrom(val)}
            def
          />

          <DatePickerInput
            title={CreateWorkOrdersLang.EndDate[Lang]}
            setDate={(val) => setDateTo(val)}
          />

          <Dropdown
            placeholder={CreateWorkOrdersLang.TradeChoose[Lang]}
            title={CreateWorkOrdersLang.Trade[Lang]}
          initailOption={data[0]?.key}
            data={data}
            onChange={(v) => {
              setTradeID(v);
            }}
          />

          <Dropdown
            placeholder={CreateWorkOrdersLang.ProcedureType[Lang]}
            title={CreateWorkOrdersLang.ProcedureType[Lang]}
            initailOption={1}
            data={ProcedureTypeData}
            onChange={(v) => {
              setProcedureTypeID(v);
            }}
          />
        </View>

        <View
          className={`flex-1 px-4 ${Rtl ? 'flex-row-reverse' : 'flex-row'} items-center justify-center gap-4`}>
          {/* <SmallButton
            title={CreateWorkOrdersLang.preventiveMs[Lang]}
            handlePress={() =>
              router.navigate({
                pathname: './Pm',
                params: {
                  DateTo,
                  DateFrom,
                  TradeID,
                  ProcedureTypeID,
                  TradeName: data.find((item) => item.key === TradeID)?.value,
                  IsSm: 1,
                },
              })
            }
          /> */}

          <SmallButton
            title={CreateWorkOrdersLang.automaticMs[Lang]}
            handlePress={() =>
              router.navigate({
                pathname: './CentralpmCreate',
                params: {
                  DateTo,
                  DateFrom,
                  TradeID,
                  ProcedureTypeID,
                  TradeName: data.find((item) => item.key === TradeID)?.value,
                  IsSm: 1,
                },
              })
            }
          />
        </View>
      </View>
    </MainLayout>
  );
};

export default CreateWorkOrders;
