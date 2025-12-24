/**
 * @file 自动生成相关业务信息
 */

/**
 * 生成一个随机的、符合校验规则的统一社会信用代码。
 * @returns {string} 返回一个有效的统一社会信用代码。
 */
export function generateCreditCode() {
  // 定义有效的字符集合（不含I、O、S、V、Z）
  const BASE_CODE_ARRAY = "0123456789ABCDEFGHJKLMNPQRTUWXY".split('');
  const DIGITS_ONLY = "0123456789".split('');

  // 权重数组
  const WEIGHT = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28];

  // 构建字符到索引的映射
  const CODE_INDEX_MAP: { [key: string]: number } = {};
  for (let i = 0; i < BASE_CODE_ARRAY.length; i++) {
    CODE_INDEX_MAP[BASE_CODE_ARRAY[i]] = i;
  }

  /**
   * 计算给定信用代码前17位的校验位。
   * @param {string} creditCode - 待计算校验位的信用代码。
   * @returns {number} 返回计算得到的校验位，如果包含非法字符则返回-1。
   */
  function getParityBit(creditCode: string) {
    let sum = 0;
    for (let i = 0; i < 17; i++) {
      const codeIndex = CODE_INDEX_MAP[creditCode[i]];
      if (codeIndex === undefined) {
        return -1;
      }
      sum += codeIndex * WEIGHT[i];
    }
    const result = 31 - (sum % 31);
    return result === 31 ? 0 : result;
  }

  // ---- 开始生成逻辑 ----

  let prefix = '';

  // 第1位：随机字符
  prefix += BASE_CODE_ARRAY[Math.floor(Math.random() * BASE_CODE_ARRAY.length)];

  // 第2位：随机字符
  prefix += BASE_CODE_ARRAY[Math.floor(Math.random() * BASE_CODE_ARRAY.length)];

  // 第3~8位（6位）：必须是数字
  for (let i = 0; i < 6; i++) {
    prefix += DIGITS_ONLY[Math.floor(Math.random() * DIGITS_ONLY.length)];
  }

  // 第9~17位（9位）：随机字符
  for (let i = 0; i < 9; i++) {
    prefix += BASE_CODE_ARRAY[Math.floor(Math.random() * BASE_CODE_ARRAY.length)];
  }

  // 计算校验位
  const parityBit = getParityBit(prefix);
  const checkChar = BASE_CODE_ARRAY[parityBit];

  // 组合成完整的18位统一社会信用代码
  return prefix + checkChar;
}

/**
 * 生成随机中文人名
 * @param {boolean} allowDoubleSurname - 是否允许复姓（如：欧阳、慕容）
 * @returns {string} 返回一个随机生成的中文人名
 */
export function generateChineseName(allowDoubleSurname = false) {
  // 常见单姓
  const surnames = [
    "赵", "钱", "孙", "李", "周", "吴", "郑", "王", "冯", "陈",
    "褚", "卫", "蒋", "沈", "韩", "杨", "朱", "秦", "尤", "许",
    "何", "吕", "施", "张", "孔", "曹", "严", "华", "金", "魏",
    "陶", "姜", "戚", "谢", "邹", "喻", "柏", "水", "窦", "章"
  ];

  // 复姓列表
  const doubleSurnames = [
    "欧阳", "上官", "慕容", "司徒", "令狐", "诸葛", "南宫", "皇甫",
    "尉迟", "长孙", "段干", "百里", "东郭", "西门", "羊舌", "拓跋"
  ];

  // 名字常用字（中性/通用）
  const givenNameChars = [
    "伟", "芳", "娜", "敏", "静", "秀", "强", "磊", "洋", "勇",
    "艳", "杰", "娟", "涛", "明", "超", "琳", "佳", "雪", "峰",
    "丹", "平", "霞", "飞", "刚", "兰", "颖", "晶", "浩", "辉",
    "安", "宁", "阳", "天", "宇", "晨", "旭", "然", "哲", "轩"
  ];

  // 随机选择姓氏
  let surname = "";
  if (allowDoubleSurname && Math.random() < 0.15) {
    // 有一定概率使用复姓
    surname = doubleSurnames[Math.floor(Math.random() * doubleSurnames.length)];
  } else {
    surname = surnames[Math.floor(Math.random() * surnames.length)];
  }

  // 随机决定名字长度（1 或 2 个字）
  const nameLength = Math.random() < 0.5 ? 1 : 2;
  let givenName = "";

  for (let i = 0; i < nameLength; i++) {
    givenName += givenNameChars[Math.floor(Math.random() * givenNameChars.length)];
  }

  return surname + givenName;
}

/**
 * 生成一个随机的详细中文地址
 * @returns {string} 返回一个完整的中文地址字符串
 */
export function generateRandomAddress() {
  const provinces = [
    "北京市", "上海市", "天津市", "重庆市",
    "河北省", "山西省", "辽宁省", "吉林省", "黑龙江省",
    "江苏省", "浙江省", "安徽省", "福建省", "江西省",
    "山东省", "河南省", "湖北省", "湖南省", "广东省",
    "海南省", "四川省", "贵州省", "云南省", "陕西省",
    "甘肃省", "青海省"
  ];

  const cities: { [key: string]: string[] } = {
    "北京市": ["北京市"],
    "上海市": ["上海市"],
    "天津市": ["天津市"],
    "重庆市": ["重庆市"],
    "河北省": ["石家庄市", "唐山市", "秦皇岛市"],
    "江苏省": ["南京市", "苏州市", "无锡市", "徐州市"],
    "广东省": ["广州市", "深圳市", "珠海市", "佛山市"],
    "浙江省": ["杭州市", "宁波市", "温州市"],
    "四川省": ["成都市", "绵阳市", "南充市"],
    "山东省": ["济南市", "青岛市", "烟台市"],
    "湖北省": ["武汉市", "宜昌市", "襄阳市"],
    "陕西省": ["西安市", "咸阳市", "宝鸡市"]
  };

  const districts: { [key: string]: string[] } = {
    "南京市": ["玄武区", "秦淮区", "建邺区", "鼓楼区"],
    "苏州市": ["姑苏区", "虎丘区", "吴中区", "相城区"],
    "广州市": ["天河区", "越秀区", "荔湾区", "海珠区"],
    "深圳市": ["福田区", "罗湖区", "南山区", "宝安区"],
    "杭州市": ["上城区", "下城区", "西湖区", "余杭区"],
    "成都市": ["锦江区", "青羊区", "金牛区", "武侯区"]
  };

  const streets = [
    "中山路", "解放路", "人民路", "建设路", "延安路",
    "长江路", "南京路", "花园路", "朝阳路", "洪武路",
    "天河北路", "珠江路", "科技大道", "和平街", "新华街"
  ];

  // 随机选择省份
  const province = provinces[Math.floor(Math.random() * provinces.length)];

  // 根据省份选城市
  const cityList = cities[province] || ["未知市"];
  const city = cityList[Math.floor(Math.random() * cityList.length)];

  // 根据城市选区
  const districtList = districts[city] || ["向阳区"];
  const district = districtList[Math.floor(Math.random() * districtList.length)];

  // 随机选择街道
  const street = streets[Math.floor(Math.random() * streets.length)];

  // 随机生成门牌号（数字 + 号/弄/室）
  const number = Math.floor(Math.random() * 1000) + 1;
  const suffixes = ["号", "弄", "室", "栋", "单元"];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];

  // return `${province}${city}${district}${street}${number}${suffix}`;
  return `${district}${street}${number}${suffix}`;
}

/**
 * 生成一个随机的中文公司名称
 * @param {boolean} [allowComplex=false] - 是否允许生成“集团”、“控股”等复杂类型
 * @returns {string} 返回一个随机生成的公司名称
 */
export function generateRandomCompanyName(allowComplex = false) {
  // 常见地名前缀（城市/区域）
  const locations = [
    "北京", "上海", "广州", "深圳", "南京", "杭州", "成都", "武汉",
    "西安", "长沙", "厦门", "苏州", "天津", "重庆", "青岛"
  ];

  // 行业关键词
  const industries = [
    "科技", "信息", "网络", "软件", "智能", "电子", "通信",
    "文化", "传媒", "广告", "设计", "商贸", "实业", "投资",
    "金融", "教育", "医疗", "健康", "环保", "能源", "物流"
  ];

  // 风格词（修饰词）
  const modifiers = [
    "创新", "时代", "未来", "智慧", "云", "星", "宏", "伟",
    "卓越", "远景", "前沿", "领航", "动力", "新", "天", "蓝海"
  ];

  // 公司类型后缀
  const suffixes = [
    "有限公司", "有限责任公司", "股份有限公司"
  ];

  if (allowComplex) {
    suffixes.push("控股集团", "科技集团", "投资控股", "发展有限公司");
  }

  // 随机选择地名
  const location = locations[Math.floor(Math.random() * locations.length)];

  // 随机选择1~2个行业或修饰词
  const wordCount = Math.floor(Math.random() * 2) + 1;
  const selectedWords = [];

  for (let i = 0; i < wordCount; i++) {
    const pool = Math.random() > 0.5 ? industries : modifiers;
    selectedWords.push(pool[Math.floor(Math.random() * pool.length)]);
  }

  // 拼接主体部分
  const companyNameBody = location + selectedWords.join("");

  // 随机选择公司后缀
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];

  return companyNameBody + suffix;
}

/**
 * 生成一个身份证号
 * @param {number} [length=18] - 18 位或 15 位
 * @returns {string} 返回一个随机生成的身份证号
 */
export function generateRandomIdentifyCode(length:15|18 = 18):string {
  if (length !== 15 && length !== 18) {
    throw new Error('身份证长度只能是 15 或 18');
  }

  // 1. 随机选择一个合法的行政区划代码（前6位）
  // 这里使用一个简化的示例：北京市东城区（110101）
  // 实际中可从完整的行政区划码表中随机选取
  const areaCode = '110101'; // 示例：北京市东城区

  // 2. 随机生成出生日期（1900-2024）
  const year = Math.floor(Math.random() * (2024 - 1900 + 1)) + 1900;
  const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
  const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0'); // 简化处理，避免无效日期

  let birthStr;
  if (length === 15) {
    birthStr = String(year).slice(2) + month + day; // YYMMDD
  } else {
    birthStr = year + month + day; // YYYYMMDD
  }

  // 3. 顺序码（3位），最后一位奇数男，偶数女；这里随机
  const orderCode = String(Math.floor(Math.random() * 999)).padStart(3, '0');

  // 4. 组合前17位（15位时无校验码）
  let idWithoutCheck;
  if (length === 18) {
    idWithoutCheck = areaCode + birthStr + orderCode; // 6 + 8 + 3 = 17位
  } else {
    idWithoutCheck = areaCode + birthStr + orderCode; // 6 + 6 + 3 = 15位（本身就是完整ID）
  }

  if (length === 15) {
    return idWithoutCheck;
  }

  // 5. 计算第18位校验码
  const weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  const checkCodes = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];

  let sum = 0;
  for (let i = 0; i < 17; i++) {
    sum += parseInt(idWithoutCheck[i], 10) * weights[i];
  }
  const mod = sum % 11;
  const checkDigit = checkCodes[mod];

  return idWithoutCheck + checkDigit;
}

/**
 * 生成一个随机的中国大陆 11 位手机号
 * @returns {string} 返回一个格式合法的 11 位手机号（仅用于测试/模拟）
 */
export function generateRandomPhoneNumber() {
  // 中国大陆手机号段前三位（运营商号段，截至近年常见号段）
  const prefixes = [
    '130', '131', '132', '133', '134', '135', '136', '137', '138', '139',
    '145', '147', '149',
    '150', '151', '152', '153', '155', '156', '157', '158', '159',
    '166', '167',
    '170', '171', '172', '173', '175', '176', '177', '178',
    '180', '181', '182', '183', '184', '185', '186', '187', '188', '189',
    '190', '191', '192', '193', '195', '196', '197', '198', '199'
  ];

  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  // 后8位随机数字
  const suffix = String(Math.floor(Math.random() * 100000000)).padStart(8, '0');

  return prefix + suffix;
}

/**
 * 自动生成随机邮箱地址，格式为：[4小写字母][4数字]@[2小写字母].com
 * 无需传参，直接调用即可。
 * @returns 例如 "mnpq5678@kt.com"
 */
export function generateRandomEmail(): string {
  const randomChar = () => String.fromCharCode(Math.floor(Math.random() * 26) + 97); // a-z
  const randomDigit = () => Math.floor(Math.random() * 10).toString(); // 0-9

  let localPart = '';
  for (let i = 0; i < 4; i++) localPart += randomChar();
  for (let i = 0; i < 4; i++) localPart += randomDigit();

  let domainPrefix = '';
  for (let i = 0; i < 2; i++) domainPrefix += randomChar();

  return `${localPart}@${domainPrefix}.com`;
}

// 示例调用
console.log(generateRandomEmail()); // 如：kxrw3821@bj.com
console.log(generateRandomEmail()); // 如：qzmt0492@yn.com