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
  if (diffValue < 0) {
    return '刚刚';
  }
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
      return '卖家取消'
      break;
    case 4:
      return '卖家未接单'
      break;
    case 5:
      return '买家取消'
      break;
    case 6:
      return '超管取消'
      break;
    default:
      break;
  }
}

// 0：实单求购 1:现货资源 2:定开计划 3.特价资源
export const storeTypeStr = (value) => {
  switch (Number(value)) {
    case 0:
      return '实单求购'
      break;
    case 1:
      return '现货资源'
      break;
    case 2:
      return '定开计划'
      break;
    case 3:
      return '特价资源'
      break;
    default:
      break;
  }
}

// 用户类型
export const userTypeStr = (value) => {
  switch (Number(value)) {
    case 1:
      return '个人'
      break;
    case 2:
      return '企业'
      break;
    case 3:
      return '平台'
      break;
    default:
      break;
  }
}

// 证件类型
export const certifyTypeStr = (value) => {
  switch (Number(value)) {
    case 1:
      return '身份证'
      break;
    case 2:
      return '护照'
      break;
    case 3:
      return '军官证'
      break;
    case 4:
      return '营业执照'
      break;
    case 5:
      return '组织机构代码证'
      break;
    case 6:
      return '社会统一信用代码'
      break;
    default:
      break;
  }
}

// 手机号隐藏4位
export const hidePhone = (value) => {
  var reg = /^(\d{3})\d{4}(\d{4})$/;
  return value.replace(reg, "$1****$2");
}

// 人民币金额转换
export const numToCny = (num) => {
  if (isNaN(num)) return "无效数值！";
  var strPrefix = "";
  if (num < 0) strPrefix = "(负)";
  num = Math.abs(num);
  if (num >= 1000000000000) return "无效数值！";
  var strOutput = "";
  var strUnit = '仟佰拾亿仟佰拾万仟佰拾元角分';
  var strCapDgt = '零壹贰叁肆伍陆柒捌玖';
  num += "00";
  var intPos = num.indexOf('.');
  if (intPos >= 0) {
    num = num.substring(0, intPos) + num.substr(intPos + 1, 2);
  }
  strUnit = strUnit.substr(strUnit.length - num.length);
  for (var i = 0; i < num.length; i++) {
    strOutput += strCapDgt.substr(num.substr(i, 1), 1) + strUnit.substr(i, 1);
  }
  return strPrefix + strOutput.replace(/零角零分$/, '整').replace(/零[仟佰拾]/g, '零').replace(/零{2,}/g, '零').replace(/零([亿|万])/g, '$1').replace(/零+元/, '元').replace(/亿零{0,3}万/, '亿').replace(/^元/, "零元");
}

// 拍卖状态转换
export const auctionSatateStr = (value) => {
  switch (Number(value)) {
    case 1:
      return '等待拍卖'
      break;
    case 2:
      return '正在拍卖'
      break;
    case 3:
      return '已经结束'
      break;
    default:
      break;
  }
}

// 毫秒转时分秒
export const formatDuring = (mss) => {
  let hours = parseInt(mss / (1000 * 60 * 60));
  let minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
  return hours + "小时" + minutes + "分";
}


export const toMoney = (num) => {
  num = num || 0;
  num = parseFloat(num);
  num = num.toFixed(2);
  num = num.toLocaleString();
  return num; //返回的是字符串23,245.12保留2位小数
}
