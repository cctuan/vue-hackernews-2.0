
const fs = require('fs')
const http = require('http')
const items = ["wood_z43odo", "wheat-1843490_1920_rgliwc", "mint-1549247_1920_ac17mx", "Vegeoil_uee0cm", "red-rose-320892_1920_nqlbxl", "violet-292367_1920_qfphd5", "tea_xm0izu", "peppercorns-1992412_1920_h7c3wr", "vanilla-589820_1280_daijxm", "the-malt-377031_1920_pjun24", "Tabacco_cspjkx", "Sherry_vqgfz8", "fruit-1220367_1920_yi6bme", "raisins-617416_1920_rd9dfk", "plum-550699_1920_b1rvlx", "melon-1370265_1920_yxumbi", "Pineapple_tvreq9", "Pear_sxbsr8", "Peach_ybhxel", "olives-1800313_1920_j7prxa", "orange-15046_1920_pd2xbi", "Oak_ak4b5z", "Nuts_nvafdp", "nutmeg-390318_1920_pkyaka", "Leather_q7rfue", "milk_choch_llfytp", "kiwifruit-400143_1920_vukum0", "cherry-167341_1920_gvybyr", "lump-sugar-549096_1920_ektyt5", "herb_wm2759", "LIME_gxseat", "lemon_ioifvt", "honey-1006972_1920_vajzvf", "date_bsxj0v", "Hay_jijtgb", "hazelnuts-73940_1920_eniyvg", "Grass_qlbwq2", "green_apple_ksy7te", "grapes-690977_1920_qauksy", "ginger-1960613_1920_brlwbp", "figs-1620590_1920_auqfjg", "coffee-beans-399479_1920_fdlxsb", "Dark_choco_gagene", "coconut-1771527_1280_fxnthl", "clove-1326474_1920_nlpo3d", "cinnamon-92594_1920_upjsrx", "caramel-480814_1920_dgzlgh", "chili-pepper-621890_1920_t8ed5d", "bananas-1642706_1920_m7xtfd", "barley-1498412_1920_mpe7u2", "blackberries-1546147_1920_ilnu9h", "butter-1449453_1920_bz2ms1", "apple-1506119_1920_hijqen", "almonds-1768792_1920_h494xn"]
// http://res.cloudinary.com/beer/image/upload/c_thumb,h_100,w_10/v1491301440/wood_z43odo.png
const targetFolder = '/Users/george/code/drink/drink-vue/_data'
items.forEach(item => {
  http.get(`http://res.cloudinary.com/beer/image/upload/c_thumb,h_100,w_100/v1491301440/${item}.png`, res => {
    var imagedata = ''
    let newName = item.split('_')[0].split('-')
    let lastName = newName.slice(-1)
    if (/\d+/g.test(lastName)){
      newName.pop()
    }
    newName = newName.join('-').toLowerCase()
    res.setEncoding('binary')
    res.on('data', chunk => {
      imagedata += chunk
    })
    res.on('end', () => {
      fs.writeFile(targetFolder + '/' + newName + '.png', imagedata, 'binary')
    })
  })
})
