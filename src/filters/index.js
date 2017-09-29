import df from 'dateformat-util'

// //接口类型转换图标
export const dateformat = (value, fromatStr = 'yyyy-MM-dd hh:mm') => {
    return df.format(new Date(value), fromatStr)
}