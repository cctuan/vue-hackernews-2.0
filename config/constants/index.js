

const FLORAL_TYPE = require('./FLORAL_TYPE')
const FRUIT_TYPE = require('./FRUIT_TYPE')
const GRAIN_TYPE = require('./GRAIN_TYPE')

module.exports = {
  ACID : require('./ACID'),
  BEER_BODY : require('./BEER_BODY'),
  BUBBLE : require('./BUBBLE'),
  CLARITY : require('./CLARITY'),
  COLOR : require('./COLOR'),
  DRINK_TYPE : require('./DRINK_TYPE'),
  FLORAL_TYPE : FLORAL_TYPE,
  FRUIT_TYPE : FRUIT_TYPE,
  GRAIN_TYPE : GRAIN_TYPE,
  INTENSITY : require('./INTENSITY'),
  LENGTH : require('./LENGTH'),
  MATURE : require('./MATURE'),
  SWEETNESS : require('./SWEETNESS'),
  TANNIN : require('./TANNIN'),
  TASTE_TYPE : require('./TASTE_TYPE'),
  ALL_TASTE_TYPE : Object.assign(FLORAL_TYPE, FRUIT_TYPE, GRAIN_TYPE),
  WINE_BODY : require('./WINE_BODY'),
}
