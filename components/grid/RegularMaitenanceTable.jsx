import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import Checkbox from "../UI/CheckBox"; // Ensure you have a Checkbox component
import Loader from "../UI/Loader";
import api from "../../utilities/api";

const RegularMaitenanceTable = ({ WorkorderID, LocationID, onSucsess }) => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true); // Indicate loading state
    try {
      console.log("LocationID", WorkorderID);
      const res = await api.get(
        `/table?sp=api_ms_WorkorderInfoPm&WorkorderID=${WorkorderID}&LocationID=${LocationID}`
      );
      const responseData =
        typeof res.data.data === "string"
          ? JSON.parse(res.data.data)
          : res.data.data;

      console.log("API Response:", responseData);
      setData(responseData);
    } catch (err) {
      console.error(
        "Error fetching data:",
        err.response ? err.response.data : err.message
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = async (WorksDone, PreventionDone, Selected) => {
    setLoading(true);
    try {
      if (!data.ScheduleID) {
        console.error("ScheduleID is not defined.");
        return;
      }
      const res = await api.post(
        `/table?sp=api_am_asset_Likelihood_items_Upd`,
        {
          ScheduleID: data.ScheduleID,
          WorksDone,
          PreventionDone,
          Selected,
        }
      );
      await getData();
      await onSucsess();
      console.log("API Response:", res.data);
    } catch (err) {
      console.error("Error updating checkbox:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const { height } = Dimensions.get("screen");

  return (
    <>
      {loading ? (
        <Loader isLoading={loading} />
      ) : (
        <View style={{ height: height - 300 }}>
          <View style={styles.headerRow} className="flex flex-row-reverse">
            <Text style={styles.headerText}>الكود</Text>
            <Text style={styles.headerText}>المهام المطلوبة</Text>
            <Text style={styles.headerText}>تم</Text>
          </View>
          {/* <ScrollView>
            <View style={styles.container}>
              {data.map((item, index) => (
                <View
                  key={index}
                  style={[
                    styles.row,
                    {
                      backgroundColor: index % 2 === 0 ? "#E4EDF2" : "#FFFFFF",
                    },
                  ]}
                >
                  {item.map((option) => (
                    <View
                      key={option.PreventionDone}
                      style={styles.optionContainer}
                    >
                      <Text style={styles.optionText}>{option.Answer}</Text>
                      <Checkbox
                        checkboxShape="circle"
                        isEditable={true}
                        value={option.Selected}
                        onChange={(val) =>
                          handleCheckboxChange(
                            item.WorksDone,
                            option.PreventionDone,
                            val
                          )
                        }
                      />
                    </View>
                  ))}
                  <Text style={styles.questionText}>{item.QuestionToAsk}</Text>
                </View>
              ))}
            </View>
          </ScrollView> */}
          <ScrollView>
            <View style={styles.container}>
              {data.map((item, index) => (
                <View
                  key={index}
                  style={[
                    styles.row,
                    {
                      backgroundColor: index % 2 === 0 ? "#E4EDF2" : "#FFFFFF",
                    },
                  ]}
                >
                  {Array.isArray(item.options) ? (
                    item.options.map((option) => (
                      <View
                        key={option.PreventionDone}
                        style={styles.optionContainer}
                      >
                        <Text style={styles.optionText}>{option.Answer}</Text>
                        <Checkbox
                          checkboxShape="circle"
                          isEditable={true}
                          value={option.Selected}
                          onChange={(val) =>
                            handleCheckboxChange(
                              item.WorksDone,
                              option.PreventionDone,
                              val
                            )
                          }
                        />
                      </View>
                    ))
                  ) : (
                    <Text>No options available</Text>
                  )}
                  <Text style={styles.questionText}>{item.QuestionToAsk}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  headerRow: {
    height: 51,
    padding: 10,
    backgroundColor: "#F6F6F6",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    color: "#333",
    flex: 1,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  optionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  optionText: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "bold",
  },
  questionText: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default RegularMaitenanceTable;
