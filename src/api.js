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