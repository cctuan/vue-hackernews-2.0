
const checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
export const isValidMongoId = (id) => {
  return checkForHexRegExp.test(id)
}
