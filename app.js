const OFFICIAL_LIST_URL = "https://zwfw.hubei.gov.cn/";
const OFFICIAL_HOSTS = new Set([
  "zjt.hubei.gov.cn",
  "www.hubei.gov.cn",
  "zwfw.hubei.gov.cn",
  "rst.hubei.gov.cn",
  "www.whrcgz.gov.cn",
  "www.wuhan.gov.cn",
  "zgj.wuhan.gov.cn",
  "www.jianghan.gov.cn",
  "ggzy.sc.yichang.gov.cn",
  "www.yichang.gov.cn",
  "www.xyrczhfw.cn"
]);

const sources = [
  {
    level: "一级·湖北省政策方向",
    title: "关于加快发展保障性租赁住房的通知（鄂建文〔2021〕45号）",
    date: "2021-11-08 · 官网标注有效",
    url: "https://zjt.hubei.gov.cn/zfxxgk/zc/gfxwj/202111/t20211108_3852362.shtml",
    note: "确认全省发展方向与重点城市；具体准入、租金、分配和监管由城市制定。"
  },
  {
    level: "一级·专项政策方向",
    title: "关于加快解决从事基本公共服务人员住房困难问题的实施意见（鄂建〔2022〕1号）",
    date: "2022-06-22 · 官网标注有效",
    url: "https://zjt.hubei.gov.cn/zfxxgk/zc/gfxwj/202206/t20220622_4188431.shtml",
    note: "70%租金口径只适用于该专项方向，不得泛化为全省所有保租房。"
  },
  {
    level: "一级·公租房制度方向",
    title: "湖北省城镇保障性住房管理办法（省政府令第398号）",
    date: "2018-04-01施行",
    url: "https://www.hubei.gov.cn/xxgk/gz/202112/W020230829609052128236.pdf",
    note: "申请住房、收入财产和就业年限等具体条件由市、县政府制定并公布。"
  },
  {
    level: "一级·人才住房方向",
    title: "关于做好人才住房保障工作的指导意见（鄂建〔2017〕8号）",
    date: "2017-11-01 · 官网标注有效",
    url: "https://zjt.hubei.gov.cn/zfxxgk/zc/qtzdgkwj/202011/t20201103_2996661.shtml",
    note: "人才标准、保障方式、面积和补贴由市县制定；历史规划目标不作当前门槛。"
  },
  {
    level: "三级·省级政务入口",
    title: "湖北政务服务网",
    date: "动态入口 · 使用时选择实际市县",
    url: OFFICIAL_LIST_URL,
    note: "可检索公租房承租资格确认等属地事项；入口可打开不等于当前批次有房。"
  },
  {
    level: "三级·属地平台发现",
    title: "湖北17市州住房供应链平台上线情况",
    date: "2024-08-29 · 平台能力说明",
    url: "https://zjt.hubei.gov.cn/bmdt/dtyw/gzdt/202408/t20240829_5319049.shtml",
    note: "证明各地存在数字化服务场景，不代表有一个覆盖全省所有项目的个人申请深链。"
  },
  {
    level: "二级·武汉市政策方向",
    title: "武汉市关于加快发展保障性租赁住房的意见解读",
    date: "2021-11-15 · 城市政策时点",
    url: "https://zjt.hubei.gov.cn/bmdt/dtyw/szsm/202111/t20211115_3862385.shtml",
    note: "武汉保障对象和85%租金口径不得套到宜昌、襄阳或湖北全省。"
  },
  {
    level: "二级·武汉历史项目快照",
    title: "武汉安家·空港新城保障性租赁住房投入试运营",
    date: "2025-01-01 · 非当前房态",
    url: "https://www.wuhan.gov.cn/ztzl/24zt/szfhcsgx/bzxzf/202501/t20250114_2517547.shtml",
    note: "168套、户型和85折均为报道时点；当前库存、价格和入口必须重查。"
  },
  {
    level: "二级·武汉公租房历史批次",
    title: "2026年江汉区公共租赁住房腾退房源登记公告",
    date: "2026-06-15 · 登记已于06-29结束",
    url: "https://www.jianghan.gov.cn/zfxxgk/fdzdgknr/ggzypz/shbz/bzxzfpz/202606/t20260615_2777414.shtml",
    note: "仅适用于持有效江汉区资格证明的实物配租轮候家庭；网页标注有效不等于仍受理。"
  },
  {
    level: "二级·宜昌当前入口候选",
    title: "秭归县屈原东路保障性租赁住房招租公告",
    date: "2026-03-02 · 使用时复核",
    url: "https://ggzy.sc.yichang.gov.cn/zgweb/jyxx/003003/003003002/20260302/0ea2138e-a9f5-48c0-b092-a81929c4771a.html",
    note: "原公告写工作日常态化受理，但仍须确认公告未调整、窗口仍受理及实时房态。"
  },
  {
    level: "二级·宜昌历史建设案例",
    title: "保租房运营服务及配套设施建设项目（一期）第三批",
    date: "2025-10-28 · 建设/招标信息",
    url: "https://ggzy.sc.yichang.gov.cn/jyxx/003001/003001002/20251028/e54e4d8f-d64b-42d3-a34c-e8fa711fcde1.html",
    note: "建设进度不是招租公告、房态或申请入口。"
  },
  {
    level: "二级·襄阳历史批次",
    title: "襄阳市区2024年第一批保障性租赁住房申报",
    date: "2024-10-08 · 申请期已结束",
    url: "https://zjt.hubei.gov.cn/bmdt/dtyw/szsm/202410/t20241008_5359748.shtml",
    note: "先租后售/只租不售只属于该批次；历史“常态化”不得自动外推到当前。"
  },
  {
    level: "二级·襄阳人才住房快照",
    title: "青隽城人才社区交付运营报道",
    date: "2025-01-01 · 非当前房态",
    url: "https://zjt.hubei.gov.cn/bmdt/dtyw/szsm/202501/t20250102_5486779.shtml",
    note: "交付规模只反映报道时点；当前房态、人才条件与办理入口须实时核验。"
  }
];

const fallbackListings = [
  {
    id: "420116-wuhan-anjia-airport",
    province: "湖北省",
    provinceCode: "420000",
    city: "武汉市",
    cityCode: "420100",
    district: "黄陂区",
    districtCode: "420116",
    jurisdictionType: "county_district",
    name: "武汉安家·空港新城保租房",
    address: "临空经济示范区空港中心三期2号楼",
    type: "保障性租赁住房",
    program_type: "affordable_rental",
    status: "2025-01-01 试运营报道（非当前房态）",
    availabilityMode: "historical-context",
    rentMode: "text",
    rentLabel: "周边市场价85折（来源时点）",
    rentMin: null,
    rentMax: null,
    unit: "38–69㎡多种户型",
    operator: "武汉城投悦家运营公司（来源时点）",
    ruleSetId: "rule-420116-airport-20250101",
    eligibilityTag: "报道未形成可用于当前审核的完整准入规则，须回到当前项目公告核验",
    ruleMode: "project-specific",
    statusAsOf: "2025-01-01",
    inventoryCheckedAt: null,
    officialEntryStatus: "unknown",
    currentActionability: false,
    sourceDate: "2025-01-01 项目运营快照",
    sourceUrl: "https://www.wuhan.gov.cn/ztzl/24zt/szfhcsgx/bzxzf/202501/t20250114_2517547.shtml",
    sourceTitle: "武汉市政府：武汉安家·空港新城保租房投入试运营",
    highlights: ["报道时点168套", "报道时点租金为周边市场价85折", "不代表当前价格或房态"],
    commute: { "光谷广场": 68, "武汉站": 45, "汉口站": 42, "临空港产业区": 20 },
    cover: "green"
  },
  {
    id: "420103-wuhan-jianghan-prh-2026",
    province: "湖北省",
    provinceCode: "420000",
    city: "武汉市",
    cityCode: "420100",
    district: "江汉区",
    districtCode: "420103",
    jurisdictionType: "county_district",
    name: "江汉区公租房腾退房源批次",
    address: "江汉区等10个小区（以公告清册为准）",
    type: "公共租赁住房 / 实物配租批次",
    program_type: "public_rental",
    status: "2026-06-29 登记已结束（非当前房态）",
    availabilityMode: "historical-context",
    rentMode: "text",
    rentLabel: "按公租房批次规则计租",
    rentMin: null,
    rentMax: null,
    unit: "10个小区腾退房源",
    operator: "公告列明的多家公租房运营单位",
    ruleSetId: "rule-420103-prh-20260615",
    eligibilityTag: "仅面向2026-06-12前持有效江汉区资格证明的实物配租轮候家庭；该登记期已结束",
    ruleMode: "historical-rule-case",
    statusAsOf: "2026-06-29",
    inventoryCheckedAt: null,
    officialEntryStatus: "closed",
    currentActionability: false,
    sourceDate: "2026-06-15 批次公告；2026-06-29截止",
    sourceUrl: "https://www.jianghan.gov.cn/zfxxgk/fdzdgknr/ggzypz/shbz/bzxzfpz/202606/t20260615_2777414.shtml",
    sourceTitle: "江汉区住更局：2026年公共租赁住房腾退房源登记公告",
    highlights: ["公告时点846套、10个小区", "属地—批次—轮候时间", "登记已结束，不代表仍有余房"],
    commute: { "光谷广场": 36, "武汉站": 31, "汉口站": 18, "临空港产业区": 42 },
    cover: "blue"
  },
  {
    id: "420527-yichang-quyuan-east",
    province: "湖北省",
    provinceCode: "420000",
    city: "宜昌市",
    cityCode: "420500",
    district: "秭归县",
    districtCode: "420527",
    jurisdictionType: "county",
    name: "秭归县屈原东路保租房",
    address: "秭归县茅坪镇屈原东路8号",
    type: "保障性租赁住房",
    program_type: "affordable_rental",
    status: "2026-03-02 公告载明常态受理；当前房态待复核",
    availabilityMode: "official-reference",
    rentMode: "text",
    rentLabel: "12元/㎡/月（公告时点）",
    rentMin: null,
    rentMax: null,
    unit: "51.53–72.63㎡",
    operator: "秭归县住房保障运营有限公司（公告时点）",
    ruleSetId: "rule-420527-quyuan-20260302",
    eligibilityTag: "公告时点优先茅坪镇就业创业且无房人员；当前规则、窗口和房态须再次确认",
    ruleMode: "project-specific",
    statusAsOf: "2026-03-02",
    inventoryCheckedAt: null,
    officialEntryStatus: "needs-recheck",
    currentActionability: false,
    sourceDate: "2026-03-02 项目公告时点",
    sourceUrl: "https://ggzy.sc.yichang.gov.cn/zgweb/jyxx/003003/003003002/20260302/0ea2138e-a9f5-48c0-b092-a81929c4771a.html",
    sourceTitle: "宜昌公共资源交易电子服务系统：屈原东路保租房招租公告",
    highlights: ["公告时点84套", "公告写工作日常态受理", "仍须确认窗口有效与实时房态"],
    commute: { "宜昌东站": 72, "西陵中心": 64, "伍家岗": 68, "茅坪镇": 12 },
    cover: "purple"
  },
  {
    id: "420500-yichang-phase1-batch3",
    province: "湖北省",
    provinceCode: "420000",
    city: "宜昌市",
    cityCode: "420500",
    district: "西陵区 / 伍家岗区",
    districtCode: null,
    jurisdictionType: "multi_district",
    name: "保租房运营服务一期第三批",
    address: "听涛苑、领尚、新街坊（建设信息所列）",
    type: "保障性租赁住房建设案例",
    program_type: "affordable_rental",
    status: "2025-10-28 建设/招标案例（不是招租房态）",
    availabilityMode: "historical-rule-case",
    rentMode: "text",
    rentLabel: "建设信息未披露租金",
    rentMin: null,
    rentMax: null,
    unit: "约9200㎡装修及配套改造",
    operator: "以竣工后运营公告为准",
    ruleSetId: null,
    eligibilityTag: "建设招标信息不能用于资格、租金、材料或当前可办判断",
    ruleMode: "construction-only",
    statusAsOf: "2025-10-28",
    inventoryCheckedAt: null,
    officialEntryStatus: "not-an-entry",
    currentActionability: false,
    sourceDate: "2025-10-28 建设招标时点",
    sourceUrl: "https://ggzy.sc.yichang.gov.cn/jyxx/003001/003001002/20251028/e54e4d8f-d64b-42d3-a34c-e8fa711fcde1.html",
    sourceTitle: "宜昌公共资源交易电子服务系统：保租房运营服务一期第三批",
    highlights: ["历史建设案例", "不是招租公告", "建设进度不能推断当前可租"],
    commute: { "宜昌东站": 26, "西陵中心": 18, "伍家岗": 20, "茅坪镇": 68 },
    cover: "orange"
  },
  {
    id: "420600-xiangyang-brh-2024-batch1",
    province: "湖北省",
    provinceCode: "420000",
    city: "襄阳市",
    cityCode: "420600",
    district: "市区多辖区",
    districtCode: null,
    jurisdictionType: "prefecture_batch",
    name: "襄阳市区2024年第一批保租房",
    address: "源墅等14个小区（以历史公告清单为准）",
    type: "保障性租赁住房 / 历史批次",
    program_type: "affordable_rental",
    status: "2024-10-28 只租不售申请期已结束",
    availabilityMode: "historical-context",
    rentMode: "text",
    rentLabel: "按小区/批次公告核验",
    rentMin: null,
    rentMax: null,
    unit: "14个小区、1049套（公告时点）",
    operator: "襄阳市住房保障运营管理主体（公告时点）",
    ruleSetId: "rule-420600-brh-20241008",
    eligibilityTag: "先租后售和只租不售是该批次子类型，不得外推为湖北统一保租房规则",
    ruleMode: "historical-rule-case",
    statusAsOf: "2024-10-28",
    inventoryCheckedAt: null,
    officialEntryStatus: "closed",
    currentActionability: false,
    sourceDate: "2024-10-08 公告；2024-10-28截止",
    sourceUrl: "https://zjt.hubei.gov.cn/bmdt/dtyw/szsm/202410/t20241008_5359748.shtml",
    sourceTitle: "湖北省住建厅：襄阳市区第一批保租房申报",
    highlights: ["公告时点14个小区1049套", "批次规则仅适用于襄阳市区", "历史“常态化”不代表当前可办"],
    commute: { "襄阳东站": 28, "高新区": 24, "东津新区": 30, "樊城中心": 20 },
    cover: "green"
  },
  {
    id: "420600gx-xiangyang-qingjuncheng",
    province: "湖北省",
    provinceCode: "420000",
    city: "襄阳市",
    cityCode: "420600",
    district: "高新区",
    districtCode: null,
    functionalZoneCode: "420600GX",
    jurisdictionType: "functional_zone",
    name: "青隽城人才社区",
    address: "襄阳高新区（具体楼栋以人才平台为准）",
    type: "人才专项租赁住房样例",
    program_type: "talent_special_rental",
    status: "2025-01-01 交付运营报道（非当前房态）",
    availabilityMode: "historical-context",
    rentMode: "text",
    rentLabel: "人才政策与项目价格待核验",
    rentMin: null,
    rentMax: null,
    unit: "19栋人才公寓、4389套（报道规模）",
    operator: "襄阳市人才住房相关运营主体",
    ruleSetId: null,
    eligibilityTag: "人才认定、单位范围、住房核查与优惠按襄阳当前人才政策和项目公告核验",
    ruleMode: "project-specific",
    statusAsOf: "2025-01-01",
    inventoryCheckedAt: null,
    officialEntryStatus: "needs-recheck",
    currentActionability: false,
    sourceDate: "2025-01-01 交付运营快照",
    sourceUrl: "https://zjt.hubei.gov.cn/bmdt/dtyw/szsm/202501/t20250102_5486779.shtml",
    sourceTitle: "湖北省住建厅：青隽城人才社区交付运营报道",
    highlights: ["报道时点19栋、4389套", "人才住房规则独立核验", "平台可达也不代表当前有房"],
    commute: { "襄阳东站": 24, "高新区": 12, "东津新区": 30, "樊城中心": 28 },
    cover: "blue"
  }
];

const CITY_CONFIG = {
  "武汉市": {
    cityCode: "420100",
    workplaces: ["光谷广场", "武汉站", "汉口站", "临空港产业区"],
    districts: ["全部", "黄陂区", "江汉区"]
  },
  "宜昌市": {
    cityCode: "420500",
    workplaces: ["宜昌东站", "西陵中心", "伍家岗", "茅坪镇"],
    districts: ["全部", "秭归县", "西陵区 / 伍家岗区"]
  },
  "襄阳市": {
    cityCode: "420600",
    workplaces: ["襄阳东站", "高新区", "东津新区", "樊城中心"],
    districts: ["全部", "市区多辖区", "高新区"]
  },
  "其他市州": {
    cityCode: null,
    workplaces: ["属地工作地"],
    districts: ["全部"]
  }
};

const questions = [
  {
    key: "serviceCity",
    icon: "城",
    title: "你准备在哪个城市申请或找房？",
    hint: "先确定属地，后续只调用该城市及其项目规则。",
    why: "湖北省政策只定方向，具体资格、租金、材料和办理入口由市县及项目/批次确定。",
    options: [
      ["汉", "武汉市", "演示武汉保租房与公租房分流", "武汉市"],
      ["宜", "宜昌市", "演示城区与县域项目差异", "宜昌市"],
      ["襄", "襄阳市", "演示保租房与人才住房分流", "襄阳市"],
      ["他", "其他市州", "原型先提示回到属地官方渠道", "其他市州"]
    ]
  },
  {
    key: "identity",
    icon: "人",
    title: "你更接近哪类申请人？",
    hint: "先做项目类型分流，再按拟申请项目/批次公告核验。",
    why: "公租房、保租房、人才专项等制度和项目规则不同，不能互相套用。",
    options: [
      ["青", "新市民 / 青年人", "在目标城市就业、创业或稳定生活", "young"],
      ["才", "人才类别 / 高校毕业生", "大专及以上或已获人才认定", "talent"],
      ["产", "产业工人 / 新就业群体", "制造、物流、骑手等就业人群", "worker"],
      ["他", "暂不确定", "先看通用房源，再逐项目核验", "unknown"]
    ]
  },
  {
    key: "housing",
    icon: "房",
    title: "你和家庭成员在相关区域有住房吗？",
    hint: "相关区域会随项目、单位所在地和户籍地变化。",
    why: "省市政策只给出保障方向；具体住房核查范围、家庭口径与转让年限必须按项目/批次公告判断。",
    options: [
      ["无", "确认无房", "本人、配偶及未成年子女均无房", "none"],
      ["有", "有房或近期转让过", "需要逐项目判断是否纳入核查", "has"],
      ["?", "不清楚核查范围", "先标记待核验，不直接否定", "unknown"]
    ]
  },
  {
    key: "employmentStatus",
    icon: "岗",
    title: "你目前的就业或求职状态？",
    hint: "只用于定位待核验规则，不直接判断通过或不通过。",
    why: "不同城市和项目对就业、社保、劳动合同或创业证明的要求可能不同；宜昌近期调整也不能套到其他城市。",
    options: [
      ["职", "单位就业", "有劳动关系，材料以项目要求为准", "employed"],
      ["活", "灵活就业 / 新就业形态", "骑手、网约、自由职业等", "flexible"],
      ["求", "求职 / 待就业", "可先看青年驿站或无就业限制项目", "seeking"],
      ["?", "暂不确定", "作为待核验项保留", "unknown"]
    ]
  },
  {
    key: "education",
    icon: "证",
    title: "你的学历或人才情况？",
    hint: "用于判断人才专项租赁住房，不影响浏览其他项目。",
    why: "部分人才专项公告会设置人才类别或学历条件，但该条件不得泛化到全市或其他住房类型。",
    options: [
      ["才", "已有人才认定", "具体类别与适用范围按项目公告核验", "recognized"],
      ["毕", "全日制大专及以上", "尚未认定人才类别", "college"],
      ["普", "其他 / 不适用", "优先看社会型或产业型项目", "other"]
    ]
  },
  {
    key: "benefit",
    icon: "惠",
    title: "承租期间是否享受其他政府租房优惠？",
    hint: "如正在承租公租房、入住人才专项住房，或领取人才租房补贴等。",
    why: "是否可叠加或需退出，以拟申请项目/批次公告为准；单个项目的处理方式不能泛化。",
    options: [
      ["否", "没有", "未享受或申请前可按规定注销", "none"],
      ["有", "正在享受", "需要核验是否可叠加或调整租金", "active"],
      ["?", "不确定", "列入正式申请前核验清单", "unknown"]
    ]
  }
];

const state = {
  screen: "home",
  step: 0,
  answers: {},
  listings: fallbackListings,
  dataMode: "loading",
  filters: { city: "武汉市", workplace: "光谷广场", budget: 2200, district: "全部", type: "全部" }
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const escapeHtml = value => String(value ?? "").replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
const yuan = value => Number(value).toLocaleString("zh-CN");
const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
let sheetReturnFocus = null;

function safeOfficialUrl(value) {
  try {
    const url = new URL(String(value));
    const credentialsAbsent = !url.username && !url.password;
    const standardPort = !url.port || url.port === "443";
    const hostAllowed = OFFICIAL_HOSTS.has(url.hostname);
    const hasUnexpectedQuery = [...url.searchParams.keys()].length > 0;
    if (url.protocol !== "https:" || !credentialsAbsent || !standardPort || !hostAllowed || hasUnexpectedQuery) return null;
    url.hash = "";
    return url.href;
  } catch (_) {
    return null;
  }
}

function openOfficialUrl(value, successMessage) {
  const safeUrl = safeOfficialUrl(value);
  if (!safeUrl) {
    showToast("官方链接未通过安全校验，已阻止打开");
    return false;
  }
  window.open(safeUrl, "_blank", "noopener,noreferrer");
  if (successMessage) showToast(successMessage);
  return true;
}

function navigate(screen, { focusHeading = true, resetScroll = true } = {}) {
  const target = $(`.app-screen[data-screen="${screen}"]`);
  if (!target) return;
  state.screen = screen;
  $$(".app-screen").forEach(el => {
    const active = el.dataset.screen === screen;
    el.classList.toggle("active", active);
    el.setAttribute("aria-hidden", String(!active));
  });
  $$(".bottom-nav [data-nav]").forEach(el => {
    const active = el.dataset.nav === screen;
    el.classList.toggle("active", active);
    if (active) el.setAttribute("aria-current", "page");
    else el.removeAttribute("aria-current");
  });
  const backButton = $("[data-action='back']");
  backButton.disabled = screen === "home";
  backButton.setAttribute("aria-label", screen === "home" ? "当前已在首页" : "返回安居台");
  if (screen === "qualify" && Object.keys(state.answers).length === questions.length) renderResult();
  if (screen === "match") renderListings();
  if (screen === "track") syncSubscriptionView();
  if (resetScroll) target.querySelector(".screen-scroll, .listing-scroll")?.scrollTo({ top: 0, behavior: "auto" });
  if (focusHeading) requestAnimationFrame(() => target.querySelector("h2")?.focus({ preventScroll: true }));
}

function renderQuestion(focusQuestion = false) {
  const q = questions[state.step];
  const card = $("#questionCard");
  $("#stepCount").textContent = `${state.step + 1}/${questions.length}`;
  $("#whyText").textContent = q.why;
  $$("#stepTrack i").forEach((el, index) => el.classList.toggle("on", index <= state.step));
  card.innerHTML = `
    <div class="question-icon" aria-hidden="true">${q.icon}</div>
    <h3 id="questionTitle" tabindex="-1">${q.title}</h3>
    <p>${q.hint}</p>
    <div class="option-list">
      ${q.options.map(opt => `<button class="option-btn" type="button" data-answer="${opt[3]}" aria-pressed="false"><span class="option-symbol">${opt[0]}</span><span class="option-copy"><b>${opt[1]}</b><span>${opt[2]}</span></span><span class="option-arrow" aria-hidden="true">›</span></button>`).join("")}
    </div>
    ${state.step === 0 ? '<button class="example-fill" type="button" data-action="fill-example">一键带入示例：武汉就业的大专毕业生、家庭无房</button>' : ""}
  `;
  $$("[data-answer]", card).forEach(button => button.addEventListener("click", () => answerQuestion(q.key, button.dataset.answer, button)));
  $("[data-action='fill-example']", card)?.addEventListener("click", fillExample);
  card.setAttribute("aria-labelledby", "questionTitle");
  if (focusQuestion) requestAnimationFrame(() => $("#questionTitle", card)?.focus({ preventScroll: true }));
}

function answerQuestion(key, value, button) {
  state.answers[key] = value;
  if (key === "serviceCity") setCity(value);
  $$("[data-answer]", $("#questionCard")).forEach(option => {
    const selected = option === button;
    option.classList.toggle("selected", selected);
    option.setAttribute("aria-pressed", String(selected));
    option.disabled = true;
  });
  updateProfileSummary();
  setTimeout(() => {
    if (state.step < questions.length - 1) {
      state.step += 1;
      renderQuestion(true);
    } else {
      renderResult();
    }
  }, 150);
}

function fillExample() {
  state.answers = {
    serviceCity: "武汉市",
    identity: "talent",
    housing: "none",
    employmentStatus: "employed",
    education: "college",
    benefit: "none"
  };
  setCity("武汉市", "光谷广场");
  state.step = questions.length - 1;
  renderResult();
  showToast("已带入演示画像，结论仍需项目方核验");
}

function evaluateProfile() {
  const a = state.answers;
  let status = "可继续分流";
  let title = "建议将人才专项与保租房分别核验";
  const city = a.serviceCity || state.filters.city;
  const reasons = [`已锁定${city}作为服务属地；本结果只做候选分流，公租房、保租房、人才住房规则不互认，也不代表当前可办。`];
  if (a.housing === "has") {
    status = "待进一步核验";
    title = "住房情况可能影响部分项目匹配";
    reasons.push("不同城市、项目的住房核查范围和转让年限不同，不能只凭“湖北有房”直接判断。");
  } else if (a.housing === "none") {
    reasons.push("家庭无房自述可作为筛选线索；家庭口径、核查区域和年限仍以具体项目/批次公告为准。");
  } else {
    status = "待补充信息";
    reasons.push("需先确认项目所在地、单位所在地与户籍地对应的住房核查范围。");
  }
  if (a.identity === "talent" || ["recognized", "college"].includes(a.education)) reasons.push("具备人才专项的初步人群标签，仅支持进入该类候选；不等于满足保租房或公租房规则。");
  if (a.identity === "worker") reasons.push("可优先查看产业或蓝领类项目，但仍须逐项目核验用工关系、区域和材料要求。");
  if (a.employmentStatus === "seeking") reasons.push("当前为求职状态，可先查属地青年驿站或不设就业限制的项目；不能把宜昌近期调整外推到其他城市。");
  if (a.benefit === "active") {
    status = "待进一步核验";
    reasons.push("正在享受其他住房保障或租房优惠；是否可叠加、退出或调整租金须按拟申请项目公告核验。");
  } else if (a.benefit === "none") reasons.push("自述未发现优惠叠加线索；公租房、保租房、人才专项仍须分别完成项目审核。");
  reasons.push(`找房排序只使用${state.filters.city}内的样例项目，并以${state.filters.workplace}作为演示通勤点。`);
  return { status, title, reasons };
}

function renderResult() {
  const result = evaluateProfile();
  $("#questionCard").classList.add("hidden");
  $(".why-card").classList.add("hidden");
  $("#precheckResult").classList.remove("hidden");
  $("#resultLabel").textContent = result.status;
  $("#resultTitle").textContent = result.title;
  $("#resultConfidence").textContent = `依据 ${Object.keys(state.answers).length} 项自述条件`;
  $("#resultReasons").innerHTML = result.reasons.map(item => `<li>${escapeHtml(item)}</li>`).join("");
  $("#stepCount").textContent = "完成";
  $$("#stepTrack i").forEach(el => el.classList.add("on"));
  updateProfileSummary();
  requestAnimationFrame(() => $("#resultTitle")?.focus({ preventScroll: true }));
}

function restartQualify() {
  state.step = 0;
  state.answers = {};
  $("#questionCard").classList.remove("hidden");
  $(".why-card").classList.remove("hidden");
  $("#precheckResult").classList.add("hidden");
  renderQuestion(true);
  updateProfileSummary();
}

function updateProfileSummary() {
  const identityMap = { talent: "人才/毕业生", young: "新市民/青年", worker: "产业工人", unknown: "身份待确认" };
  const housingMap = { none: "无房自述", has: "住房待核验", unknown: "无房待确认" };
  const identity = identityMap[state.answers.identity] || "新市民";
  const housing = housingMap[state.answers.housing] || "无房待确认";
  $("#profileSummary").textContent = `${state.filters.city} · ${identity} · ${housing} · ${state.filters.workplace}`;
  const remaining = Math.max(0, questions.length - Object.keys(state.answers).length);
  $("#passportStatus").textContent = remaining ? `待完善 ${remaining} 项` : "预判已完成";
}

const isHistoricalRuleCase = item => ["historical-rule-case", "construction-only"].includes(item.ruleMode) || item.availabilityMode === "historical-rule-case";
const isNonCurrent = item => ["historical-context", "historical-rule-case"].includes(item.availabilityMode) || item.status.includes("非当前房态");
const hasNumericRent = item => Number.isFinite(item.rentMin) && Number.isFinite(item.rentMax);
const rentRangeText = item => hasNumericRent(item) ? `${yuan(item.rentMin)}-${yuan(item.rentMax)} 元/月` : `${item.rentLabel || "按项目规则计租"}`;
const budgetRelationText = item => {
  if (!hasNumericRent(item)) return "绝对金额待项目核验";
  if (item.rentMax <= state.filters.budget) return "整段租金在预算内";
  if (item.rentMin <= state.filters.budget) return `最低档在预算内，最高超 ${yuan(item.rentMax - state.filters.budget)} 元`;
  return `最低档超预算 ${yuan(item.rentMin - state.filters.budget)} 元`;
};
const PROGRAM_TYPE_LABELS = {
  public_rental: "公租房",
  affordable_rental: "保障性租赁住房",
  talent_special_rental: "人才专项租赁住房"
};

function setCity(city, workplace) {
  const config = CITY_CONFIG[city] || CITY_CONFIG["其他市州"];
  state.filters.city = city in CITY_CONFIG ? city : "其他市州";
  state.filters.workplace = config.workplaces.includes(workplace) ? workplace : config.workplaces[0];
  state.filters.district = "全部";
  if (Object.hasOwn(state.answers, "serviceCity")) state.answers.serviceCity = state.filters.city;
}

function syncQuickFilters() {
  $$('[data-quick-city]').forEach(button => {
    button.dataset.quickCity = state.filters.city;
    button.textContent = `城 ${state.filters.city}`;
    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");
  });
  $$("[data-quick-work]").forEach(button => {
    button.dataset.quickWork = state.filters.workplace;
    button.textContent = `⌖ ${state.filters.workplace}`;
    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");
  });
  $$("[data-quick-budget]").forEach(button => {
    const active = Number(button.dataset.quickBudget) === state.filters.budget;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function scoreListing(item) {
  const minutes = item.commute[state.filters.workplace] ?? 99;
  const budgetFit = hasNumericRent(item) && item.rentMin <= state.filters.budget;
  let score = Math.max(25, 100 - Math.round(minutes * .55));
  if (budgetFit) score += 15;
  if (item.city === state.answers.serviceCity) score += 9;
  if (state.answers.identity === "talent" && item.program_type === "talent_special_rental") score += 8;
  if (state.answers.identity === "worker" && (item.type.includes("产业") || item.type.includes("就业"))) score += 9;
  if (item.status.includes("复核") || item.status.includes("历史")) score -= 7;
  if (isNonCurrent(item)) score -= 18;
  if (isHistoricalRuleCase(item)) score -= 12;
  return Math.min(96, Math.max(34, score));
}

function filteredListings() {
  return state.listings
    .filter(item => item.city === state.filters.city)
    .filter(item => state.filters.district === "全部" || item.district === state.filters.district)
    .filter(item => state.filters.type === "全部" || item.type.includes(state.filters.type))
    .filter(item => !hasNumericRent(item) || item.rentMin <= state.filters.budget)
    .map(item => ({ ...item, matchScore: scoreListing(item) }))
    .sort((a, b) => Number(isNonCurrent(a)) - Number(isNonCurrent(b)) || b.matchScore - a.matchScore || (a.rentMin ?? Number.POSITIVE_INFINITY) - (b.rentMin ?? Number.POSITIVE_INFINITY));
}

function renderListings() {
  const items = filteredListings();
  const summary = `${state.filters.city} · ${state.filters.workplace} · ${yuan(state.filters.budget)} 元内`;
  $("#matchSummary").textContent = summary;
  $("#filterCount").textContent = [state.filters.city, state.filters.workplace, state.filters.budget, state.filters.district !== "全部" ? state.filters.district : null, state.filters.type !== "全部" ? state.filters.type : null].filter(Boolean).length;
  $("#homeMatchCount").textContent = items.length;
  $("#homeTaskMatchCount").textContent = `${items.length} 个同城样例`;
  if (!items.length) {
    $("#listingList").innerHTML = `<div class="empty-state"><b>样例排序中没有符合条件的项目</b><span>可放宽预算或区域；是否当前可办仍须查询实时房态与有效官方入口。</span><button class="text-btn" type="button" data-open-sheet="filters">调整条件</button></div>`;
  } else {
    $("#listingList").innerHTML = items.map(item => {
      const minutes = item.commute[state.filters.workplace];
      const numericRent = hasNumericRent(item);
      const budgetText = budgetRelationText(item);
      const matchBadge = isHistoricalRuleCase(item) ? "公告时点规则案例" : `${item.matchScore}% 通勤预算匹配`;
      const sourceBadge = item.availabilityMode === "official-reference" ? "入口候选 · 房态待核验" : "历史信息 · 非当前房态";
      const rentValue = numericRent ? yuan(item.rentMin) : item.rentLabel;
      const rentSuffix = numericRent ? (isNonCurrent(item) ? "元/月起（来源时点）" : "元/月起*") : "规则时点 · 金额待核验";
      const officialAvailable = Boolean(safeOfficialUrl(item.sourceUrl));
      const officialAction = !officialAvailable ? "官方链接不可用" : item.availabilityMode === "official-reference" ? "查看入口候选" : isHistoricalRuleCase(item) ? "查看边界案例" : "查看历史来源";
      return `<article class="property-card">
        <div class="property-cover ${escapeHtml(item.cover)}"><span class="match-badge">${matchBadge}</span><span class="source-badge">${sourceBadge}</span></div>
        <div class="property-body">
          <div class="property-head"><div><h3>${escapeHtml(item.name)}</h3><p>${escapeHtml(item.city)} · ${escapeHtml(item.district)} · ${escapeHtml(item.type)} · ${escapeHtml(item.unit)}</p></div><div class="rent${numericRent ? "" : " ratio"}"><b>${escapeHtml(rentValue)}</b><small>${escapeHtml(rentSuffix)}</small></div></div>
          <div class="reason-strip"><i>AI</i><span>${minutes} 分钟样例通勤；${budgetText}。仅做通勤预算排序，不包含资格或“当前可办”判断。</span></div>
          <div class="property-metrics"><div><span>到工作地</span><b>约 ${minutes} 分钟*</b></div><div><span>租金口径</span><b>${escapeHtml(rentRangeText(item))}</b></div><div><span>房源状态</span><b>${escapeHtml(item.status.replace("官方平台", "平台"))}</b></div></div>
          <div class="property-actions"><button type="button" data-detail="${escapeHtml(item.id)}">匹配依据</button><button type="button" data-official="${escapeHtml(item.id)}" ${officialAvailable ? "" : 'disabled aria-disabled="true"'}>${officialAction}</button></div>
        </div>
      </article>`;
    }).join("");
  }
  $$("[data-detail]", $("#listingList")).forEach(btn => btn.addEventListener("click", () => openListingDetail(btn.dataset.detail)));
  $$("[data-official]", $("#listingList")).forEach(btn => btn.addEventListener("click", () => openListingOfficial(btn.dataset.official)));
  $("[data-open-sheet='filters']", $("#listingList"))?.addEventListener("click", () => openSheet("filters"));
  syncQuickFilters();
  syncSubscriptionView();
}

function openListingDetail(id) {
  const item = state.listings.find(entry => entry.id === id);
  if (!item) return;
  const minutes = item.commute[state.filters.workplace];
  const officialAvailable = Boolean(safeOfficialUrl(item.sourceUrl));
  const programLabel = PROGRAM_TYPE_LABELS[item.program_type] || "项目类型待核验";
  const rentHeadline = hasNumericRent(item)
    ? `${yuan(item.rentMin)} ${isNonCurrent(item) ? "元/月起（来源时点）" : "元/月起*"}`
    : `${item.rentLabel || "按项目规则计租"}（规则时点；绝对金额待核验）`;
  openSheet("custom", {
    eyebrow: "匹配解释 · 预判不等于审核",
    title: item.name,
    body: `<div class="detail-hero"><span>${escapeHtml(item.status)} · ${escapeHtml(item.sourceDate)}</span><h3>${escapeHtml(rentHeadline)}</h3><p>${escapeHtml(item.city)} · ${escapeHtml(item.address)} · ${escapeHtml(item.type)}</p></div>
      <div class="detail-grid"><div><span>样例通勤</span><b>${minutes} 分钟*</b></div><div><span>预算关系</span><b>${escapeHtml(budgetRelationText(item))}</b></div><div><span>资格结论</span><b>${isHistoricalRuleCase(item) ? "仅规则案例" : "需项目核验"}</b></div></div>
      <div class="detail-block"><h4>为什么推荐</h4><ul>${item.highlights.map(x => `<li>${escapeHtml(x)}</li>`).join("")}</ul></div>
      <div class="detail-block"><h4>资格预判说明</h4><p>${escapeHtml(item.eligibilityTag)}。本条按“${escapeHtml(programLabel)}”规则族与“${escapeHtml(item.city)}”属地隔离；不得与其他住房类型串用，也不得外推到湖北其他市州。</p></div>
      <div class="official-notice">* 省级政策定方向；城市、项目和批次定准入、租金、材料与流程；实时房态与仍有效属地入口才决定“当前可办”。本样例 currentActionability=false，通勤为演示矩阵。</div>
      <button class="primary-btn" type="button" data-sheet-official="${escapeHtml(item.id)}" ${officialAvailable ? "" : 'disabled aria-disabled="true"'}>${officialAvailable ? "打开官方来源 ↗" : "官方链接未通过安全校验"}</button>`
  });
  $("[data-sheet-official]")?.addEventListener("click", () => openListingOfficial(id));
}

function openListingOfficial(id) {
  const item = state.listings.find(entry => entry.id === id);
  if (!item) return;
  openOfficialUrl(item.sourceUrl, item.availabilityMode === "official-reference" ? "已打开官方入口候选；请继续确认属地窗口、实时房态与规则是否有效" : "已打开官方历史来源，不代表当前房态或当前可办");
}

function openSheet(kind, custom = {}) {
  const layer = $("#sheetLayer");
  const eyebrow = $("#sheetEyebrow");
  const title = $("#sheetTitle");
  const body = $("#sheetBody");
  if (kind === "sources") {
    eyebrow.textContent = "官方公开信息 · 分层取证 · 使用时回源";
    title.textContent = "政策与房源依据";
    const sourceCards = sources.map(source => {
      const safeUrl = safeOfficialUrl(source.url);
      const link = safeUrl
        ? `<a href="${escapeHtml(safeUrl)}" target="_blank" rel="noopener noreferrer" aria-label="在新窗口查看：${escapeHtml(source.title)}">查看官方来源 ↗</a>`
        : '<span class="source-unavailable">来源链接未通过安全校验</span>';
      return `<article class="source-item"><span>${escapeHtml(source.level)}</span><b>${escapeHtml(source.title)}</b><small>${escapeHtml(source.date)}${source.note ? ` · ${escapeHtml(source.note)}` : ""}</small><br />${link}</article>`;
    }).join("");
    body.innerHTML = `<p class="sheet-intro">三级时效口径：省级政策定方向；市县实施规则与项目/批次公告定准入、租金、材料和流程；实时房态与仍有效属地入口才定“当前可办”。公租房、保租房、人才住房分别核验，一地规则不得外推到其他市州。</p><div class="source-list">${sourceCards}</div>`;
  } else if (kind === "filters") {
    eyebrow.textContent = "城市 × 通勤 × 预算 × 项目类型";
    title.textContent = "调整找房条件";
    const activeConfig = CITY_CONFIG[state.filters.city];
    body.innerHTML = `<form class="filter-form" id="filterForm">
      <div class="field-group"><label for="citySelect">申请 / 找房城市</label><select id="citySelect">${Object.keys(CITY_CONFIG).map(x => `<option ${x === state.filters.city ? "selected" : ""}>${x}</option>`).join("")}</select></div>
      <div class="field-group"><label for="workplaceSelect">主要工作地</label><select id="workplaceSelect">${activeConfig.workplaces.map(x => `<option ${x === state.filters.workplace ? "selected" : ""}>${x}</option>`).join("")}</select></div>
      <div class="field-group"><label for="budgetRange">月租预算上限</label><input class="range-field" id="budgetRange" type="range" min="500" max="4000" step="100" value="${state.filters.budget}" /><div class="range-output" id="budgetOutput">≤ ${yuan(state.filters.budget)} 元 / 月</div></div>
      <div class="field-group"><label for="districtSelect">优先区域</label><select id="districtSelect">${activeConfig.districts.map(x => `<option ${x === state.filters.district ? "selected" : ""}>${x}</option>`).join("")}</select></div>
      <div class="field-group"><label for="typeSelect">项目类型</label><select id="typeSelect">${["全部","公共租赁住房","保障性租赁住房","人才"].map(x => `<option ${x === state.filters.type ? "selected" : ""}>${x}</option>`).join("")}</select></div>
      <button class="primary-btn" type="submit">应用并重新排序</button>
      <p class="sheet-intro">切换城市会同时重置工作地和区域，避免跨城混排。通勤为样例矩阵；正式版本应调用合规地图能力并明确出发时段。</p>
    </form>`;
    $("#citySelect", body).addEventListener("change", event => {
      const config = CITY_CONFIG[event.target.value];
      $("#workplaceSelect", body).innerHTML = config.workplaces.map(x => `<option>${x}</option>`).join("");
      $("#districtSelect", body).innerHTML = config.districts.map(x => `<option>${x}</option>`).join("");
    });
    $("#budgetRange", body).addEventListener("input", e => $("#budgetOutput", body).textContent = `≤ ${yuan(e.target.value)} 元 / 月`);
    $("#filterForm", body).addEventListener("submit", e => {
      e.preventDefault();
      setCity($("#citySelect", body).value, $("#workplaceSelect", body).value);
      state.filters.budget = Number($("#budgetRange", body).value);
      state.filters.district = $("#districtSelect", body).value;
      state.filters.type = $("#typeSelect", body).value;
      updateProfileSummary();
      renderListings();
      closeSheet();
      navigate("match");
    });
  } else if (kind === "safety") {
    eyebrow.textContent = "通用租赁安全核验";
    title.textContent = "签约前安全清单";
    body.innerHTML = `<p class="sheet-intro">任何“智能推荐”都不能替代线下核验与合同审阅。</p><div class="safety-list">
      <div><i>1</i><p><b>正规渠道验真</b><span>只从本原型登记且通过 HTTPS 与官方域名校验的来源跳转；办理前再次核对主办方、项目和批次。</span></p></div>
      <div><i>2</i><p><b>务必实地看房</b><span>检查楼层、户型、家具家电、水压、门窗锁具等；不要只凭图片付款。</span></p></div>
      <div><i>3</i><p><b>签书面合同</b><span>明确租金、押金、费用、退租与违约责任；口头承诺应写入合同。</span></p></div>
      <div><i>!</i><p><b>警惕预付风险</b><span>高额或长期预付会放大资金风险；未核验主体、未看房和未读合同前不盲目支付。</span></p></div>
      </div>`;
  } else if (kind === "about") {
    eyebrow.textContent = "本地可交互原型";
    title.textContent = "楚小住的能力边界";
    body.innerHTML = `<div class="safety-list"><div><i>能</i><p><b>先按城市、再分类型</b><span>锁定申请城市后，按公租房、保租房、人才住房分流并提示缺失信息。</span></p></div><div><i>能</i><p><b>预算与通勤综合匹配</b><span>推荐理由可见，但排序不代表资格通过或当前可办。</span></p></div><div><i>不</i><p><b>不跨城、不串类</b><span>武汉规则不外推到宜昌或襄阳，人才住房规则不用于普通保租房或公租房。</span></p></div><div><i>不</i><p><b>不承诺房态与优惠</b><span>历史公告、建设进度和页面可达都不证明当前有房；办理前必须回源。</span></p></div></div>`;
  } else {
    eyebrow.textContent = custom.eyebrow || "详情";
    title.textContent = custom.title || "信息";
    body.innerHTML = custom.body || "";
  }
  if (!layer.classList.contains("open")) sheetReturnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  $(".demo-shell").inert = true;
  document.body.classList.add("sheet-open");
  layer.classList.add("open");
  layer.setAttribute("aria-hidden", "false");
  requestAnimationFrame(() => $(".bottom-sheet header [data-close-sheet]", layer)?.focus({ preventScroll: true }));
}

function closeSheet() {
  const layer = $("#sheetLayer");
  if (!layer.classList.contains("open")) return;
  layer.classList.remove("open");
  layer.setAttribute("aria-hidden", "true");
  $(".demo-shell").inert = false;
  document.body.classList.remove("sheet-open");
  const returnFocus = sheetReturnFocus;
  sheetReturnFocus = null;
  if (returnFocus?.isConnected && !returnFocus.disabled) requestAnimationFrame(() => returnFocus.focus({ preventScroll: true }));
}

function handleDocumentKeydown(event) {
  const layer = $("#sheetLayer");
  if (!layer.classList.contains("open")) return;
  if (event.key === "Escape") {
    event.preventDefault();
    closeSheet();
    return;
  }
  if (event.key !== "Tab") return;
  const sheet = $(".bottom-sheet", layer);
  const focusable = $$(FOCUSABLE_SELECTOR, sheet).filter(element => element.getClientRects().length > 0);
  if (!focusable.length) {
    event.preventDefault();
    return;
  }
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && (document.activeElement === first || !sheet.contains(document.activeElement))) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function syncSubscriptionView() {
  $("#subWorkplace").textContent = `${state.filters.city} · ${state.filters.workplace}`;
  $("#subBudget").textContent = `≤ ${yuan(state.filters.budget)} 元`;
}

let toastTimer;
function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function setDataState(mode, message) {
  state.dataMode = mode;
  const dataState = $("#dataState");
  if (!dataState) return;
  dataState.dataset.mode = mode;
  dataState.textContent = message;
}

function isValidListing(item) {
  const numericRentValid = Number.isFinite(item?.rentMin) && Number.isFinite(item?.rentMax) && item.rentMin >= 0 && item.rentMax >= item.rentMin;
  const textRentValid = ["ratio", "text"].includes(item?.rentMode) && typeof item.rentLabel === "string" && item.rentLabel.trim().length > 0 && item.rentMin == null && item.rentMax == null;
  return Boolean(
    item &&
    typeof item.id === "string" && item.id &&
    typeof item.name === "string" && item.name &&
    typeof item.type === "string" && item.type &&
    Object.hasOwn(PROGRAM_TYPE_LABELS, item.program_type) &&
    typeof item.status === "string" &&
    (numericRentValid || textRentValid) &&
    item.provinceCode === "420000" &&
    typeof item.cityCode === "string" &&
    typeof item.city === "string" && Object.hasOwn(CITY_CONFIG, item.city) &&
    typeof item.currentActionability === "boolean" &&
    item.commute && typeof item.commute === "object" &&
    Object.values(item.commute).every(value => Number.isFinite(value)) &&
    Array.isArray(item.highlights) && item.highlights.every(value => typeof value === "string") &&
    typeof item.sourceUrl === "string" && Boolean(safeOfficialUrl(item.sourceUrl))
  );
}

async function loadListings() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4500);
  setDataState("loading", "正在载入样例数据…");
  renderListings();
  try {
    const response = await fetch("data/listings.json", { cache: "no-store", signal: controller.signal });
    if (!response.ok) throw new Error("data unavailable");
    const data = await response.json();
    if (!Array.isArray(data.listings)) throw new Error("invalid data shape");
    const validListings = data.listings.filter(isValidListing);
    if (!validListings.length) throw new Error("no valid listings");
    state.listings = validListings;
    if (validListings.length === data.listings.length) {
      setDataState("success", `已载入 ${validListings.length} 个样例项目；非实时房态，办理前请回源。`);
    } else {
      setDataState("fallback", `已忽略 ${data.listings.length - validListings.length} 条字段不完整数据；其余样例仍需回源。`);
    }
  } catch (_) {
    state.listings = fallbackListings;
    setDataState("fallback", `外部样例载入失败，已使用 ${fallbackListings.length} 条内置样例；所有信息仍需回源。`);
  } finally {
    clearTimeout(timeout);
  }
  renderListings();
}

$$('[data-nav]').forEach(button => button.addEventListener("click", () => navigate(button.dataset.nav)));
$$('[data-open-sheet]').forEach(button => button.addEventListener("click", () => openSheet(button.dataset.openSheet)));
$$('[data-close-sheet]').forEach(button => button.addEventListener("click", closeSheet));
$("[data-action='restart-qualify']").addEventListener("click", restartQualify);
$("[data-action='back']").addEventListener("click", () => navigate("home"));
$("[data-open-official='list']").addEventListener("click", () => openOfficialUrl(OFFICIAL_LIST_URL, "已打开湖北政务服务网；请先选择实际市县，再核验当前事项、批次和房态"));
$("#subscribeBtn").addEventListener("click", event => {
  const button = event.currentTarget;
  const enabled = button.getAttribute("aria-pressed") !== "true";
  button.setAttribute("aria-pressed", String(enabled));
  button.classList.toggle("is-subscribed", enabled);
  button.textContent = enabled ? "样例订阅已开启 ✓" : "开启样例订阅";
  showToast(enabled ? "仅在当前会话模拟成功，不会收集手机号或发送消息" : "已关闭当前会话中的样例订阅");
});
$$('[data-quick-city]').forEach(button => button.addEventListener("click", () => openSheet("filters")));
$$('[data-quick-work]').forEach(button => button.addEventListener("click", () => { state.filters.workplace = button.dataset.quickWork; updateProfileSummary(); renderListings(); }));
$$('[data-quick-budget]').forEach(button => button.addEventListener("click", () => { state.filters.budget = Number(button.dataset.quickBudget); renderListings(); }));
document.addEventListener("keydown", handleDocumentKeydown);

renderQuestion(false);
updateProfileSummary();
syncSubscriptionView();
navigate("home", { focusHeading: false, resetScroll: false });
loadListings();
