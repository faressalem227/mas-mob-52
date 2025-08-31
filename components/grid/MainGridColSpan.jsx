import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TableWithColspanAndRowspan = () => {
  return (
    <View style={styles.container}>
      {/* Header Row */}
      <View style={styles.row}>
        <View style={[styles.cell, styles.colspan]}>
          <Text style={styles.text}>Header 1 & 2 (Colspan)</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.text}>Header 3</Text>
        </View>
      </View>

      {/* Data Rows */}
      <View style={styles.row}>
        <View style={[styles.cell, styles.rowspan]}>
          <Text style={styles.text}>Rowspan</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.text}>Data 2</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.text}>Data 3</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style={styles.text}>Data 4</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.text}>Data 5</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={[styles.cell, styles.colspan]}>
          <Text style={styles.text}>Colspan Example</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.text}>Data 6</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#000",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  colspan: {
    flex: 2, // Merges two columns
  },
  rowspan: {
    flex: 1,
    height: 80, // Simulates rowspan by increasing height
  },
  text: {
    fontSize: 16,
  },
});

export default TableWithColspanAndRowspan;
