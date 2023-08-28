export const createOptionsFromConstantObject = (constantObject: object) =>
  Object.entries(constantObject).map(([value, label]) => ({ value, label }));
