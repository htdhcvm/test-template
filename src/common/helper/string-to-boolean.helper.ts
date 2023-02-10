const stringToBooleanHelper = (val: string): boolean => {
  if (val === 'false') {
    return false;
  }
  if (val === 'true') {
    return true;
  }

  return false;
};

export default stringToBooleanHelper;
