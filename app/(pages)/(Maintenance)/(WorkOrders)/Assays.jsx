import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import { MainLayout, MainButton, DatePickerInput } from '../../../../components';
import { useRouter, useLocalSearchParams } from 'expo-router';
import MainGrid from '../../../../components/grid/MainGrid';
import AssaysLang from '../../../../constants/Lang/Maintenance/WorkOrders/Assays';
import { useGlobalContext } from '../../../../context/GlobalProvider';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import api from '../../../../utilities/api';
import Toast from 'react-native-toast-message';
const Assays = () => {
  const {
    TradeID,
    DepartmentID,
    WorkorderID,
    FailureDescription,
    WorkorderCode,
    WorkorderName,
    WorkorderTypeID,
    WorkorderTypeName,
    WorkorderStatusName,
    preventCrud,
    ...restParams
  } = useLocalSearchParams();

  const { Lang, Rtl, company } = useGlobalContext(); // Get the current language from global context

  const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);
  const [width, setWidth] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [modelLoader, setModelLoader] = useState(false);
  const [labelFontSize, setLabelFontSize] = useState(hp('2%'));

  const handleConfirm = async () => {
    try {
      const response = await api.post('/table?sp=api_ms_confirm_comparison', {
        DepartmentID,
        WorkorderID,
        LangID: Lang,
      });
      setModalVisible(false);
      Toast.show({
        type: 'success',
        text1: AssaysLang.Success[Lang],
        // position: 'bottom',
        visibilityTime: 3000,
      });
    } catch (error) {
      console.error('Confirmation error:', error);
    }
  };

  useEffect(() => {
    if (windowWidth < 800) {
      setWidth('w-48'); // Set width to 250 px
    } else {
      setWidth('w-[80%]'); // Set width to 80%
    }
  }, [windowWidth]);

  return (
    <MainLayout title={AssaysLang.PageTitle[Lang]} className="">
      <View className="flex-1">
        <TouchableOpacity
          className="my-3 flex flex-row-reverse px-4"
          onPress={() => {
            setModalVisible(true);
          }}>
          <View className="flex rounded-md bg-[#227099] px-3 py-2 text-center">
            <Text className="text-center font-tmedium text-base text-[#FEFEFE]">
              {AssaysLang.Create[Lang]}
            </Text>
          </View>
        </TouchableOpacity>
        <MainGrid
          tableHead={[
            {
              key: 'TaskCode',
              label: AssaysLang.TaskCode[Lang],
              type: 'number',
              input: 'true',
              visible: 'true',
              width: 100,
              required: true,
            },
            {
              key: 'TaskName',
              label: AssaysLang.TaskName[Lang],
              type: 'text',
              input: 'true',
              visible: 'true',
              width: 100,
              required: true,
            },
            {
              key: 'Quantity',
              label: AssaysLang.Quantity[Lang],
              type: 'number',
              input: 'true',
              visible: 'true',
              width: 100,
            },
            {
              key: 'Cost',
              label: AssaysLang.Cost[Lang],
              type: 'number',
              input: 'true',
              visible: 'true',
              width: 100,
            },
            {
              key: 'Unit',
              label: AssaysLang.Unit[Lang],
              type: 'text',
              input: 'true',
              visible: 'true',
              width: 100,
            },
            {
              key: 'PlannedStartDate',
              label: AssaysLang.PlannedStartDate[Lang],
              type: 'date',
              input: 'true',
              visible: 'true',
              width: 100,
            },
            {
              key: 'PlannedEndDate',
              label: AssaysLang.PlannedEndDate[Lang],
              type: 'date',
              input: 'true',
              visible: 'true',
              width: 100,
            },
            {
              key: 'ActualStartDate',
              label: AssaysLang.ActualStartDate[Lang],
              type: 'date',
              input: 'true',
              visible: 'true',
              width: 100,
            },
            {
              key: 'ActualEndDate',
              label: AssaysLang.ActualEndDate[Lang],
              type: 'date',
              input: 'true',
              visible: 'true',
              width: 100,
            },

            {
              key: 'SPI',
              label: '',
              type: '',
              input: 'false',
              visible: 'false',
              width: 100,
            },
            {
              key: 'CPI',
              label: '',
              type: '',
              input: 'false',
              visible: 'false',
              width: 100,
            },
            {
              key: 'TotalCost',
              label: AssaysLang.TotalCost[Lang],
              type: 'number',
              input: 'false',
              visible: 'true',
              width: 100,
            },
          ]}
          pk={'ComparisonID'}
          spTrx={'api_ms_workorder_Comparison_trx'}
          spIns={'api_ms_workorder_Comparison_Ins'}
          spDel={'api_ms_workorder_Comparison_Del'}
          spUpd={'api_ms_workorder_Comparison_Upd'}
          UpdBody={{
            WorkorderID: WorkorderID,
            DepartmentID: DepartmentID,
          }}
          InsBody={{
            WorkorderID: WorkorderID,
            DepartmentID: DepartmentID,
          }}
          hasCrud={preventCrud}
          TrxParam={[
            { name: 'DepartmentID', value: DepartmentID },
            { name: 'LangID', value: Lang },
            { name: 'UserName', value: 'host' },
            { name: 'WorkorderID', value: WorkorderID },
          ]}
          DelParam={[
            {
              rowData: true,
              name: 'ComparisonID',
              value: 'ComparisonID',
            },
            { name: 'DepartmentID', value: DepartmentID },
            { name: 'WorkorderID', value: WorkorderID },
          ]}
          TrxDependency={[WorkorderID]}
          mixedWidth
        />

        {/* Modal */}
        <Modal animationType="fade" visible={modalVisible} transparent={true}>
          <TouchableWithoutFeedback
            onPress={() => {
              setModalVisible(false);
            }}>
            <View style={styles.modalOverlay} dir={Rtl}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContent}>
                  <>
                    <View style={{ marginVertical: hp('3%') }}>
                      <Text
                        style={{
                          fontSize: labelFontSize * 1.2,
                          marginVertical: hp('.5%'),
                        }}
                        className="text-center font-tmedium text-[#227099]">
                        {' '}
                        {AssaysLang.Sure[Lang]}
                      </Text>
                    </View>
                    <View style={{ marginBottom: hp('1%') }}>
                      <View className="flex-row">
                        <TouchableOpacity
                          className="mx-1 flex flex-row-reverse"
                          onPress={() => {
                            setModalVisible(false);
                          }}>
                          <View className="flex rounded-md bg-red-600 px-3 py-2 text-center">
                            <Text className="text-center font-tmedium text-base text-[#FEFEFE]">
                              {AssaysLang.cancel[Lang]}
                            </Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                          className="mx-1 flex flex-row-reverse"
                          onPress={handleConfirm}>
                          <View className="flex rounded-md bg-[#227099] px-3 py-2 text-center">
                            <Text className="text-center font-tmedium text-base text-[#FEFEFE]">
                              {AssaysLang.accept[Lang]}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </MainLayout>
  );
};
const styles = {
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
  },
};
export default Assays;
