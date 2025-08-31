import React, { useState,useEffect } from 'react';
  import { StyleSheet, View } from 'react-native';
  import { MultiSelect } from 'react-native-element-dropdown';
  import AntDesign from '@expo/vector-icons/AntDesign';
import { useGlobalContext } from '../../context/GlobalProvider';
import { useDropDown } from '../../hooks/useDropDownData';

  const MultiSelectComponent = ({FilterFieldName,ValueField,title,TextField, spName,value,params=[],onChange}) => {
    const [selected, setSelected] = useState([]);

    const handleChange = (selectedOptions) => {
        console.log(selectedOptions);
        
        const values = selectedOptions
          ? selectedOptions.map((option) => option)
          : [];
        setSelected(values);
      };
    
      useEffect(() => {
        if (onChange) {
          onChange(selected.join(';'));
        }
      }, [selected]);

    const {DepartmentID, company, user, Lang} = useGlobalContext()
        console.log(DepartmentID,spName, params);
        
        
        const{data: data, loading: dataLoader} = useDropDown(
            spName,
            {
                LocationID: DepartmentID,
                UserName: user.username,
                LangID: Lang,
                ...params
            },
            ValueField,
            TextField
        )
        
    

    return (
      <View style={styles.container}>
        <MultiSelect
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          search
          data={data}
          labelField="value"
          valueField="key"
          fontFamily='Tajawal-Medium'
          placeholder={title}
          searchPlaceholder="Search..."
          value={selected}
          onChange={handleChange}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color="black"
              name="Safety"
              size={20}
            />
          )}
          selectedStyle={styles.selectedStyle}
        />
      </View>
    );
  };

  export default MultiSelectComponent;

  const styles = StyleSheet.create({
    container: { padding: 16 },
    dropdown: {
      height: 50,
      backgroundColor: 'transparent',
      borderBottomColor: 'gray',
      borderBottomWidth: 0.5,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 14,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
    icon: {
      marginRight: 5,
    },
    selectedStyle: {
      borderRadius: 12,
    },
  });