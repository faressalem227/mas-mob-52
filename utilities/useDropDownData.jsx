export const HandleDropdownFormat = (data, key, label) => {
	return data.map((item) => {
		return {
			key: parseInt(item[key]),
			value: item[label],
		};
	});
};
