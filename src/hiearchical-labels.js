export function countLeafLabels(rawLabels) {
  return rawLabels
    .map(element => {
      if (isString(element)) {
        return 1;
      } else if (isObjectLabelElement(element)) {
        return countLeafLabels(element.children);
      } else {
        throw new Error();
      }
    })
    .reduce((sum, value) => sum + value, 0);
}

export function computeLeafLabels(rawLabels) {
  const arrayOfArrays = rawLabels.map(element => {
    if (isString(element)) {
      return [element];
    } else if (isObjectLabelElement(element)) {
      return computeLeafLabels(element.children);
    } else {
      throw new Error();
    }
  });
  return [].concat(...arrayOfArrays);
}

export function validateLabels(rawLabels) {
  if (!Array.isArray(rawLabels)) {
    throw new Error("labels must be an array but was not.", rawLabels);
  }
  validateElements("", rawLabels);

  function validateElements(path, children) {
    children.forEach((element, index) => {
      const newPath = path + "[" + index + "]";
      if (typeof element === "string") {
        return;
      } else if (isObjectLabelElement(element)) {
        return validateElements(newPath, element.children);
      } else {
        throw new Error(
          "Element " +
            newPath +
            " in labels is malformed it must be either a string or an object with label and children properties.",
          element
        );
      }
      ld;
    });
  }
}

function isString(element) {
  return typeof element === "string";
}

function isObjectLabelElement(element) {
  return (
    element.hasOwnProperty("label") &&
    typeof element.label === "string" &&
    element.hasOwnProperty("children") &&
    Array.isArray(element.children)
  );
}
