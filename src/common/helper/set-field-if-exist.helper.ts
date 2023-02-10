const setFieldIfExistHelper = <T>(obj: T, field: keyof T, value) => {
  if (value || value === 0 || value === false) {
    obj[field] = value;
  }
};

export default setFieldIfExistHelper;
