// export const ws = 'ws://192.168.0.132:8080/websocket/'

/**
 * 获取用户信息
 */
export const getUser = '/api/user/findCurrentUser';


// =================================发布求购页面=================================
/**
 * 查询地区信息
 * @params name - 可选
 */
export const G_getArea = '/demands/query/findArea'

/**
 * 查询省信息
 */
export const G_getProvince = '/demands/query/findProvince'

/**
 * 查询市信息 
 */
export const G_getCity = '/demands/query/findCity'

/**
 * 查询品类信息
 * @params name - 可选
 */
export const G_getTypes = '/demands/query/findIronTypes'

/**
 * 查询材质信息
 * @params name - 可选
 */
export const G_getMaterials = '/demands/query/findMaterials'

/**
 * 查询表面信息
 * @params name - 可选
 */
export const G_getSurFace = '/demands/query/findSurFace'

/**
 * 查询产地信息
 * @params name - 可选
 */
export const G_getProPlaces = '/demands/query/findProPlaces'

/**
 * 查询品类计量单位信息
 * @params ironId
 */
export const findUnitById = '/demands/query/findIronAndUnitByIronId'

/**
 * 查询关联规格
 * @params surface ironType
 */
export const G_queryGG = '/demands/query/findIronAndSurfaceAndSpecificationlist'

/**
 * 查询关联宽长
 * @params surface ironType
 */
export const G_queryWL = '/demands/query/findIronAndSurfaceAndSpecificationHeightAndLength'


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
export const userScope = '/demands/query/findBusinessScope'

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
export const getStores = '/demands/query/findStoreHouse'

/**
 * 查询所有地址信息
 */
export const getArea = '/demands/query/findAllArea'

/**
 * 修改商户信息
 */
export const updateBuserInfo = '/demands/bInfo/updateBInfo'

/**
 * 修改密码
 */
export const updatePsd = '/demands/baseUsers/updateBaseUsersSafeInfo'