const formDataToObject = (e) => {
  return Object.fromEntries(new FormData(e.target));
};

const validateData = (data) => {
  const requiredInputs = ["title", "time", "date"];
  const isInvalid = requiredInputs.some(
    (input) =>
      data[input] === "" || data[input] === undefined || data[input] === null
  );

  return isInvalid ? {} : data;
};

const formUtil = (e) => validateData(formDataToObject(e));
export default formUtil;
