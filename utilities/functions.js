export const buildTree = (data, parentId = null, parentKeyName, keyName) => {
  return data
    .filter((item) => item[parentKeyName] === parentId)

    .map((item) => ({
      ...item,
      children: buildTree(data, item[keyName], parentKeyName, keyName),
    }));
};
