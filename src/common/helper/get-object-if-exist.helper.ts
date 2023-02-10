const GetObjectOfExistHelper = <T>(obj: T, field: keyof T) => {
  return (
    obj &&
    obj[field] && {
      field: obj[field],
    }
  );
};

export default GetObjectOfExistHelper;
