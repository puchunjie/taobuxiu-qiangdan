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

// 是否含税转义
export const taxStr = (value) => {
    switch (value) {
        case 1:
            return '是'
            break;
        case 2:
            return '否'
            break;
        default:
            break;
    }
}

// js时间转化为几天前,几小时前，几分钟前
export const getDateDiff = (value, now) => {
    let result = '';
    let minute = 1000 * 60;
    let hour = minute * 60;
    let day = hour * 24;
    let halfamonth = day * 15;
    let month = day * 30;
    let diffValue = now - value;
    if (diffValue < 0) { return; }
    let monthC = diffValue / month;
    let weekC = diffValue / (7 * day);
    let dayC = diffValue / day;
    let hourC = diffValue / hour;
    let minC = diffValue / minute;
    if (monthC >= 1) {
        result = "" + parseInt(monthC) + "月前";
    } else if (weekC >= 1) {
        result = "" + parseInt(weekC) + "周前";
    } else if (dayC >= 1) {
        result = "" + parseInt(dayC) + "天前";
    } else if (hourC >= 1) {
        result = "" + parseInt(hourC) + "小时前";
    } else if (minC >= 1) {
        result = "" + parseInt(minC) + "分钟前";
    } else
        result = "刚刚";
    return result;
}