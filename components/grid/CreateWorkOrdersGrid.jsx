import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, ScrollView, Dimensions, TouchableOpacity, Modal, Text, Image } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import { CustomButton, Loader } from '../index';
import add_outline from '../../assets/images/add_outline.png';
import Done from '../../assets/images/Done.png';
import api from '../../utilities/api';
import { useGlobalContext } from '../../context/GlobalProvider';
import { TouchableWithoutFeedback } from 'react-native-web';
import ScheduleAndWorkOrdersLang from '../../constants/Lang/Maintenance/PreventiveMaintenanceHome/SchedulePreventiveMaintenance/ScheduleAndWorkOrdersLang';

const CreateWorkOrdersGrid = ({ TradeID, DateFrom, DateTo, setToast, toast, ProcedureTypeID }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [buttonLoader, setButtonLoader] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const { DepartmentID, user, Lang, Rtl, company } = useGlobalContext();

  // Define table headers dynamically based on language
  const tableHead = [
    // {
    //   key: "ScheduleCode",
    //   label: ScheduleAndWorkOrdersLang.TableHeaders.ScheduleCode[Lang],
    //   input: "false",
    //   visible: "false",
    //   width: 100,
    // },
    {
      key: 'ScheduleName',
      label: ScheduleAndWorkOrdersLang.TableHeaders.ScheduleName[Lang],
      input: 'false',
      visible: 'true',
      width: 200,
    },
    {
      key: 'PeriodDays',
      label: ScheduleAndWorkOrdersLang.TableHeaders.PeriodDays[Lang],
      input: 'false',
      visible: 'true',
      width: 110,
    },
    {
      key: 'PlannedStartDate',
      label: ScheduleAndWorkOrdersLang.TableHeaders.PlannedStartDate[Lang],
      input: 'false',
      type: 'date',
      visible: 'true',
      width: 150,
    },
    {
      key: 'PlannedEndDate',
      label: ScheduleAndWorkOrdersLang.TableHeaders.PlannedEndDate[Lang],
      input: 'false',
      type: 'date',
      visible: 'true',
      width: 150,
    },

    {
      key: 'WorkorderCounter',
      label: 'عداد',
      input: 'false',
      type: 'number',
      visible: 'true',
      width: 150,
    },
    {
      key: 'LabourCost',
      label: 'تكلفه العماله',
      input: 'false',
      type: 'number',
      visible: 'true',
      width: 150,
    },
    {
      key: 'MaterialCost',
      label: 'تكلفه قطع الغيار',
      input: 'false',
      type: 'number',
      visible: 'true',
      width: 150,
    },
    {
      key: 'GenerateWODateStart',
      label: 'فتره الانشاء من',
      input: 'false',
      type: 'date',
      visible: 'true',
      width: 150,
    },
    {
      key: 'GenerateWODateEnd',
      label: 'فتره الانشاء الي',
      input: 'false',
      type: 'date',
      visible: 'true',
      width: 150,
    },
    {
      key: 'GenerateWOUserName',
      label: 'اسم المنشئ',
      type: 'text',
      input: 'false',
      visible: 'true',
      width: 120,
    },
    {
      key: 'ServiceCost',
      label: 'تكلفه خدمات',
      input: 'false',
      type: 'number',
      visible: 'true',
      width: 150,
    },
    {
      key: 'ContractorsCost',
      label: 'تكلفه مقاولات',
      input: 'false',
      type: 'number',
      visible: 'true',
      width: 150,
    },
    {
      key: 'Excluded',
      label: 'مستبعد',
      input: 'true',
      type: 'checkbox',
      visible: 'true',
      width: 150,
    },
    {
      key: 'ExcludeReason',
      label: 'سبب الاستبعاد',
      input: 'true',
      type: 'text',
      visible: 'true',
      width: 150,
    },

    {
      key: 'WorkorderID',
      label: ScheduleAndWorkOrdersLang.TableHeaders.WorkorderID[Lang],
      input: 'false',
      type: 'text',
      visible: 'true',
      width: 120,
    },
    {
      key: 'AssetStatusName',
      label: ScheduleAndWorkOrdersLang.TableHeaders.AssetStatusName[Lang],
      type: 'text',
      input: 'false',
      visible: 'true',
      width: 120,
    },
  ];

  const filteredTableHead = tableHead.filter((header) => header.visible === 'true');
  const state = {
    tableHead: filteredTableHead.map((col) => col.label),
  };
  const scrollViewRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current?.scrollToEnd({ animated: false });
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [scrollViewRef, data]);

  useEffect(() => {
    let timer;
    if (modalVisible) {
      timer = setTimeout(() => {
        setModalVisible(false);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [modalVisible]);

  const staticWidthArr = filteredTableHead.map((col) => col.width);

  const handleRowPress = (index) => {
    setSelectedRow(index);
  };

  const getTableData = useCallback(async () => {
    setLoading(true);
    if (!DepartmentID || !DateFrom || !DateTo || !TradeID) {
      return;
    }

    try {
      const data = await api.get(
        `table?IsSm=0&CompanyID=${company}&DepartmentID=${DepartmentID}&DateFrom=${DateFrom}&DateTo=${DateTo}&sp=api_ms_Schedule_Details_Trx&TradeID=${TradeID}&ProcedureTypeID=${ProcedureTypeID}`
      );
      setData(data.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 200);
    }
  }, [DepartmentID, DateFrom, DateTo, TradeID]);

  useEffect(() => {
    getTableData();
  }, [getTableData]);

  const generateWorkOrder = async () => {
    setButtonLoader('generate');
    if (!TradeID || !DateFrom || !DateTo) {
      alert('Missing required fields');
      return;
    }

    try {
      const response = await api.post('/table?sp=api_ms_sp_pm_GenerateWorkorders22', {
        LocationID: DepartmentID,
        PeriodFrom: DateFrom,
        PeriodTo: DateTo,
        TradeID1: TradeID,
        UserName: user.username,
      });
      await getTableData();
      setToast({
        counter: toast.counter + 1,
        type: 'success',
        text2: response.data.data.message,
      });
      setModalMessage(ScheduleAndWorkOrdersLang.ModalMessages.WorkOrderCreated[Lang]);
      setModalVisible(true);
    } catch (error) {
      console.error('Error generating work order:', error);
      setToast({
        counter: toast.counter + 1,
        type: 'error',
        text2: ScheduleAndWorkOrdersLang.ModalMessages.TimelineGeneratedErr1[Lang],
      });
    } finally {
      setButtonLoader('');
    }
  };

  const GenerateTimeLine2 = async () => {
    setButtonLoader('timeTable');
    try {
      const response = await api.post('/table?sp=api_ms_sp_pm_GenerateTimeLine22', {
        DepartmentID: DepartmentID,
        DateFrom: DateFrom,
        DateTo: DateTo,
        TradeID: TradeID,
      });

      await getTableData();
      setToast({
        counter: toast.counter + 1,
        type: 'success',
        text2: response.data.data.message,
      });
      setModalMessage(ScheduleAndWorkOrdersLang.ModalMessages.TimelineGenerated[Lang]);
      setModalVisible(true);
    } catch (error) {
      console.error('Error generating timeline:', error);
      setToast({
        counter: toast.counter + 1,
        type: 'error',
        text2: ScheduleAndWorkOrdersLang.ModalMessages.TimelineGeneratedErr[Lang],
      });
    } finally {
      setButtonLoader('');
    }
  };

  const { height, width } = Dimensions.get('window');

  return (
    <>
      {loading ? (
        <Loader minus={'400'} isLoading={loading} />
      ) : (
        <>
          <View
            style={[
              Rtl
                ? {
                    flexDirection: 'row-reverse',
                  }
                : { flexDirection: 'row' },
              ,
              { marginBottom: 16 },
            ]}
            className="mt-1">
            <CustomButton
              Loading={buttonLoader === 'generate'}
              Icon={add_outline}
              title={ScheduleAndWorkOrdersLang.Buttons.CreateWorkOrder[Lang]}
              onPress={generateWorkOrder}
            />
          </View>
          <ScrollView
            horizontal={true}
            style={{ height: height - 500 }}
            contentContainerStyle={{ flexGrow: 1 }}
            ref={scrollViewRef}>
            <View>
              <Table>
                <Row
                  className={`flex ${Rtl ? 'flex-row-reverse' : 'flex-row'}  font-tbold text-base font-bold`}
                  data={state.tableHead}
                  widthArr={staticWidthArr}
                  style={styles.head}
                  textStyle={styles.text}
                />
              </Table>

              {data.length > 0 && (
                <ScrollView>
                  <Table>
                    {data.map((dataRow, index) => (
                      <TouchableOpacity key={index} onPress={() => handleRowPress(dataRow, index)}>
                        <Row
                          className={`flex ${Rtl ? 'flex-row-reverse' : 'flex-row'} py-2`}
                          style={[
                            styles.row,
                            index % 2 === 0
                              ? { backgroundColor: '#ffffff' }
                              : { backgroundColor: '#f9f9f9' },
                          ]}
                          textStyle={styles.text}
                          widthArr={staticWidthArr}
                          data={filteredTableHead.map((col, idx) => {
                            const item = dataRow[col.key];
                            if (col?.type === 'date') {
                              return (
                                <View
                                  key={idx}
                                  style={{
                                    width: staticWidthArr[idx],
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                  }}>
                                  <Text
                                    key={idx}
                                    style={[
                                      styles.text,
                                      {
                                        width: staticWidthArr[idx],
                                        textAlign: 'center',
                                      },
                                    ]}>
                                    {item?.split('T')[0]}
                                  </Text>
                                </View>
                              );
                            }
                            return (
                              <Text
                                key={idx}
                                style={[
                                  styles.text,
                                  {
                                    width: staticWidthArr[idx],
                                    textAlign: 'center',
                                  },
                                ]}>
                                {item}
                              </Text>
                            );
                          })}
                        />
                      </TouchableOpacity>
                    ))}
                  </Table>
                </ScrollView>
              )}

              <Modal
                animationType="fade"
                visible={modalVisible}
                transparent={true}
                onRequestClose={() => setModalVisible(false)}>
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                  <View style={styles.modalOverlay}>
                    <TouchableWithoutFeedback>
                      <View style={styles.modalContent}>
                        <View className="py-4 text-center">
                          <Image source={Done} className="mx-auto h-10 w-10" />
                          <Text className="mt-9 text-center font-tbold text-base">
                            {modalMessage}
                          </Text>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                </TouchableWithoutFeedback>
              </Modal>
            </View>
          </ScrollView>
        </>
      )}
    </>
  );
};

const styles = {
  buttonContainer: {
    flexDirection: 'row-reverse',
    marginBottom: 16,
  },
  head: {
    height: 50,
    backgroundColor: '#F6F6F6',
  },
  text: {
    textAlign: 'center',
    fontFamily: 'Tajawal-Medium',
    fontSize: 16,
  },
  row: {
    height: 'fit-content',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
  },
};

export default CreateWorkOrdersGrid;
