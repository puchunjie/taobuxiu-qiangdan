import df from 'dateformat-util'

// //接口类型转换图标
export const dateformat = (value, fromatStr = 'yyyy-MM-dd hh:mm') => {
    return df.format(new Date(value), fromatStr)
}

//空值转换
export const emptyHlod = (value, payload = '—') => {
    if (value != '') {
        return value
    } else {
        return payload
    }
}

// 计量方式转义
export const measuringStr = (value) => {
    switch (value) {
        case 1:
            return '过磅'
            break;
        case 2:
            return '理计'
            break;
        default:
            break;
    }
}