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
export const taxStr = (value, isBoolen = true) => {
    switch (value) {
        case 1:
            return isBoolen ? '是' : '含税'
            break;
        case 2:
            return isBoolen ? '否' : '不含税'
            break;
        default:
            break;
    }
}

// js时间转化为几天前,几小时前，几分钟前
export const getDateDiff = (value, now) => {
    let nowTime = now ? now : new Date().getTime();
    let result = '';
    let minute = 1000 * 60;
    let hour = minute * 60;
    let day = hour * 24;
    let halfamonth = day * 15;
    let month = day * 30;
    let diffValue = nowTime - value;
    if (diffValue < 0) { return '刚刚'; }
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


//订单state转换
// 买家订单
export const bOrderState = (value) => {
    switch (Number(value)) {
        case 1:
            return '已完成'
            break;
        case 2:
            return '待确认'
            break;
        case 3:
            return '卖家未接单'
            break;
        case 4:
            return '已取消'
            break;
        default:
            break;
    }
}