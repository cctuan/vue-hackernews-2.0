
const checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
export const isValidMongoId = (id) => {
  return checkForHexRegExp.test(id)
}

export const isObject = (item) => {
  return (item && typeof item === 'object' && !Array.isArray(item))
}

export const mergeDeep = (source, target) => {
  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} })
        mergeDeep(target[key], source[key])
      } else {
        Object.assign(target, { [key]: source[key] })
      }
    }
  }
  return target
}
