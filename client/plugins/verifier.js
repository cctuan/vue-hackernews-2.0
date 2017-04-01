
import * as types from 'config/constants/MISSING_FORM_TYPE'
/**
{
  result : Boolean // false ,
  type : Numbers
}
**/
export const quickPostVerify = (post) => {
  const verifiedResult = {
    result : true,
    type : {},
  }
  if (!post.thumb.original.secure_url) {
    verifiedResult.result = false
    verifiedResult.type[types.MISSING_PHOTO] = true
  }
  if (!post.rating) {
    verifiedResult.result = false
    verifiedResult.type[types.MISSING_RATING] = true
  }
  if (!post.name) {
    verifiedResult.result = false
    verifiedResult.type[types.MISSING_NAME] = true
  }
  if (!post.description_s) {
    verifiedResult.result = false
    verifiedResult.type[types.MISSING_DES_S] = true
  }
  if (!post.type) {
    verifiedResult.result = false
    verifiedResult.type[types.MISSING_TYPE] = true
  }
  return verifiedResult
}
