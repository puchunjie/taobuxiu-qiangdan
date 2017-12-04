export let ws = '';
let uploadHost = '';
if (process.env.NODE_ENV == 'development') {
    ws = 'ws://192.168.0.251:8080/websocket';
    uploadHost = 'http://192.168.0.251'
} else {
    ws = 'ws://120.55.63.70:8080/websocket';
    uploadHost = ''
}

export const excelDownloadUrl = 'http://tbxoss.oss-cn-hangzhou.aliyuncs.com/'

/**
 * 获取用户信息
 */
export const getUser = '/api/user/findCurrentUser';

/**
 * 获取求购报价数量统计
 */
export const getNums = '/demands/ironBuy/queryIronBuyInfoNum'

/**
 * 登录
 * path: /login/userLogin
 * method: POST
 * params: {
 *      mobile: String
 *      password: String
 * }
 */
export const login = '/login/userLogin';

// 重置密码
/**
 * 图形验证码
 */
export const pic_code = '/login/picCode'

/**
 * 短信验证码
 */
export const msg_code = '/login/smsCode'

/**
 * 检验验证码
 */
export const validateFirst = '/login/validateFirst'

/**
 * 修改密码
 */
export const validateSecond = '/login/validateSecond'

// =================================发布求购页面=================================
/**
 * 查询地区信息
 * @params name - 可选
 */
export const G_getArea = '/api/query/findArea'

/**
 * 查询省信息
 */
export const G_getProvince = '/api/query/findProvince'

/**
 * 查询市信息 
 */
export const G_getCity = '/api/query/findCity'

/**
 * 查询品类信息
 * @params name - 可选
 */
export const G_getTypes = '/api/query/findIronTypes'

/**
 * 查询材质信息
 * @params name - 可选
 */
export const G_getMaterials = '/api/query/findMaterials'

/**
 * 查询表面信息
 * @params name - 可选
 */
export const G_getSurFace = '/api/query/findSurFace'

/**
 * 查询产地信息
 * @params name - 可选
 */
export const G_getProPlaces = '/api/query/findProPlaces'

/**
 * 查询品类计量单位信息
 * @params ironId
 */
export const findUnitById = '/api/query/findIronAndUnitByIronId'

/**
 * 查询关联规格
 * @params surface ironType
 */
export const G_queryGG = '/api/query/findIronAndSurfaceAndSpecificationlist'

/**
 * 查询关联宽长
 * @params surface ironType
 */
export const G_queryWL = '/api/query/findIronAndSurfaceAndSpecificationHeightAndLength'


/**
 * 发布单个求购
 * @params
 */
export const publish_one = '/demands/ironBuy/saveAndUpdateIronBuy'

/**
 * 批量发布
 */
export const publishSome = '/demands/ironBuy/saveIronBuyList'

/**
 * 发布历史
 */
export const publishHistory = '/demands/ironBuy/queryIronBuyInfo'


// =================================买家求购管理=================================
/**
 * 买家基本信息
 */
export const userBuyInfo = '/demands/userIronInfo/userBuyInfo'

/**
 * 求购列表
 * @params currentPage,pageSize,buyStatus(选填)
 */
export const getIronBuys = '/demands/ironBuy/queryIronBuyInfoPage'

/**
 * 求购报价列表
 * @params ironBuyId
 */
export const getOfferList = '/demands/ironBuy/queryIronSellInfoPage'

/**
 * 点击中标
 * @params ironBuyId ironSellId
 */
export const bidOffer = '/demands/ironBuy/getIronSell'


// =================================卖家报价管理=================================

/**
 * 卖家基本信息
 */
export const userSellerInfo = '/demands/userIronInfo/userSellInfo';

/**
 * 卖家报价求购列表
 */
export const sellerQueryIrons = '/demands/ironBuy/queryIronSellerInfoPage'

/**
 * 报价
 * @params   flag: 1报价0忽略
 */
export const doOffer = '/demands/ironBuy/saveIronSellInfo'


// =================================卖家经营范围=================================

/**
 * 查询用户经营范围
 */
export const userScope = '/demands/businessScope/findBusinessScope'

/**
 * 用户保存经营范围
 */
export const saveScope = '/demands/businessScope/saveBusinessScope';


/**
 * 获取优惠信息模板
 */
export const getDiscount = '/demands/query/findAllPro'

/**
 * 发布优惠信息
 */
export const saveDiscount = '/demands/bInfo/updateBuserProInfo'

// =================================用户基本信息=================================
/**
 * 查询仓库数据
 */
export const getStores = '/api/query/findStoreHouse'

/**
 * 查询所有地址信息
 */
export const getArea = '/api/query/findAllArea'

/**
 * 修改商户信息
 */
export const updateBuserInfo = '/demands/bInfo/updateBInfo'

/**
 * 修改密码
 */
export const updatePsd = '/demands/baseUsers/updateBaseUsersSafeInfo'


// =================================首页=================================
/**
 * 卖家排行榜
 */
export const sellerRanking = '/api/main/countSellActive'

/**
 * 最新求购信息
 */
export const newIronList = '/api/main/queryIronInfo'

/**
 * 板卷市价
 */
export const ironNew = '/api/main/queryIronNew'

/**
 * lem数据
 */
export const lme = '/api/main/photoLME'

export const threeMonth = '/api/main/threeMonthLME'

/**
 * 申请质检
 */
export const applyQuality = '/api/main/applyQualityControl'



// =================================超管代发页面=================================
/**
 * 超管查询商户信息（超管代法求购）
 */
export const isShop = '/api/ironBuySubstitute/findUserByLogin'

/**
 * 发布单条
 */
export const superPublishOne = '/api/ironBuySubstitute/ironBuySaveSimple'

/**
 * 发布多条
 */
export const superPublishAll = '/api/ironBuySubstitute/ironBuySaveList'


// =================================定开资源管理=================================
/**
 * 定开计划列表
 */
export const dingKaiList = '/demands/dingkai/findDingKaiList'

/**
 * 开平时间
 */
export const findAllKaiping = '/api/query/findAllKaiping'

/**
 * 批量发布、修改、上架定开资源
 */
export const saveAndUpdateDingKaiList = '/demands/dingkai/saveAndUpdateDingKaiList'

/**
 * 刷新单个定开
 */
export const flushDingKaiSimple = '/demands/dingkai/flushDingKaiSimple'

/**
 * 批量刷新定开
 */
export const flushDingKai = '/demands/dingkai/flushDingKai'

/**
 * 下架单个定开
 */
export const downDingKaiSimple = '/demands/dingkai/downDingKaiSimple'

/**
 * 批量下架定开
 */
export const downDingKai = '/demands/dingkai/downDingKai'

/**
 * 单个删除定开
 */
export const deleteDingKaiSimple = '/demands/dingkai/deleteDingKaiSimple'

/**
 * 批量删除定开
 */
export const deleteDingKai = '/demands/dingkai/deleteDingKai'

/**
 * 批量调价定开
 */
export const modifyDingKaiPrice = '/demands/dingkai/modifyDingKaiPrice'

/**
 * 查询定开上传记录
 */
export const queryDingKaiExcel = '/demands/dingkai/queryDingKaiExcel'

/**
 * 定开上传EXCEL路径
 */
export const saveDingKaiListByExcel = uploadHost + '/demands/dingkai/saveDingKaiListByExcel'

// =================================现货资源管理=================================
/**
 * 现货计划列表
 */
export const findSpotGoodsPage = '/demands/spotGoods/findSpotGoodsPage'

/**
 * 批量发布、修改、上架现货资源
 */
export const saveAndUpdateSpotGoods = '/demands/spotGoods/saveAndUpdateSpotGoods'

/**
 * 刷新单个现货
 */
export const refreshSingleSpotGoods = '/demands/spotGoods/refreshSingleSpotGoods'

/**
 * 批量刷新现货
 */
export const refreshSpotGoods = '/demands/spotGoods/refreshSpotGoods'

/**
 * 下架单个现货
 */
export const removeSingleSpotGoods = '/demands/spotGoods/removeSingleSpotGoods'

/**
 * 批量下架现货
 */
export const removeSpotGoods = '/demands/spotGoods/removeSpotGoods'

/**
 * 单个删除现货
 */
export const deleteSingleSpotGoods = '/demands/spotGoods/deleteSingleSpotGoods'

/**
 * 批量删除现货
 */
export const deleteSpotGoods = '/demands/spotGoods/deleteSpotGoods'

/**
 * 批量调价现货
 */
export const changePriceSpotGoods = '/demands/spotGoods/changePriceSpotGoods'

/**
 * 查询定开上传记录
 */
export const findSpotGoodsExcel = '/demands/spotGoods/findSpotGoodsExcel'

/**
 * 现货上传EXCEL路径
 */
export const saveSpotGoodsByExcel = uploadHost + '/demands/spotGoods/saveSpotGoodsByExcel'

// =================================特价资源管理=================================
/**
 * 特价计划列表
 */
export const findSpecialPricePage = '/demands/specialPrice/findSpecialPricePage'

/**
 * 批量发布、修改、上架特价资源
 */
export const saveAndUpdateSpecialPrice = '/demands/specialPrice/saveAndUpdateSpecialPrice'

/**
 * 刷新单个特价
 */
export const refreshSingleSpecialPrice = '/demands/specialPrice/refreshSingleSpecialPrice'

/**
 * 批量刷新特价
 */
export const refreshSpecialPrice = '/demands/specialPrice/refreshSpecialPrice'

/**
 * 下架单个特价
 */
export const removeSingleSpecialPrice = '/demands/specialPrice/removeSingleSpecialPrice'

/**
 * 批量下架特价
 */
export const removeSpecialPrice = '/demands/specialPrice/removeSpecialPrice'

/**
 * 单个删除特价
 */
export const deleteSingleSpecialPrice = '/demands/specialPrice/deleteSingleSpecialPrice'

/**
 * 批量删除特价
 */
export const deleteSpecialPrice = '/demands/specialPrice/deleteSpecialPrice'

/**
 * 批量调价特价
 */
export const changePriceSpecialPrice = '/demands/specialPrice/changePriceSpecialPrice'

/**
 * 查询定开上传记录
 */
export const findSpecialPriceExcel = '/demands/specialPrice/findSpecialPriceExcel'

/**
 * 特价上传EXCEL路径
 */
export const saveSpecialPriceByExcel = uploadHost + '/demands/specialPrice/saveSpecialPriceByExcel'


// 获取EXCEL模板地址
export const selectExecleUrlByType = '/demands/resourcedown/selectExecleUrlByType'

// 下载Excel,并且保存数据
export const downloadExcel = '/demands/resourcedown/downloadExcel'


// =================================现货市场=================================
/**
 * 现货资源商家查询
 */
export const findAllSpotGoodsPage = '/api/dingkai/findAllSpotGoodsPage'

/**
 * 特价资源商户查询
 */
export const findAllSpecialPricePage = '/api/dingkai/findAllSpecialPricePage'

/**
 * 定开商家查询
 */
export const findDingKaiAll = '/api/dingkai/findDingKaiAll'

/**
 *  采购卖家信息查询
 */
export const queryUserInfo = '/demands/userIronInfo/queryUserInfo'

/**
 * 获取订单有效确认时间选项
 */
export const selectStorerSubOrderName = '/api/ad/selectStorerSubOrderName'



// =================================订单=================================
/**
 * 用户下订单
 */
export const saveStoreOrder = '/demands/storeOrder/saveStoreOrder'

/**
 * 订单买家查询
 */
export const findBuyerStoreOrder = '/demands/storeOrder/findBuyerStoreOrder'