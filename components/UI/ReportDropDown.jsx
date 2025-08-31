{/* <ReportDropDown
			  key={item.FilterFieldName} // Ensure a unique key for each element
			  FilterFieldName={item.FilterFieldName}
			  ValueField={item.ValueField}
			  title={item.TitleAr}
			  TextField={item.TextField}
			  spName={item.spName}
			  value={fillter[item.ValueField]}
			  params={
				item.Dependent == 1
				  ? Object.entries(fillter)
					  .filter(([key]) => key !== item.ValueField)
					  .reduce(
						(obj, [key, value]) => ({ ...obj, [key]: value }),
						{}
					  )
				  : []
			  }
			  onChange={(e) => {
				setFilters({
				  ...fillter,
				  [item.ValueField]: e,
				});
			  }}
			/> */}


import React, { useCallback, useEffect, useState } from "react";
import { useGlobalContext } from "../../context/GlobalProvider";
import Dropdown from "./DropDown";
import { useDropDown } from "../../hooks/useDropDownData";

const ReportDropDown = ({FilterFieldName,ValueField,title,TextField, spName,value,params=[],onChange}) => {
    const {DepartmentID, company, user, Lang} = useGlobalContext()
    console.log(DepartmentID,spName, params);
    
    
    const{data: dropdownData, loading: dropdownDataLoader} = useDropDown(
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

    console.log(dropdownData);
    


    return (
        <Dropdown
            placeholder={title} 
            data={dropdownData}
			value={value}
            onChange={(val) => onChange(val)}
        />
    );
    };

export default ReportDropDown;
            