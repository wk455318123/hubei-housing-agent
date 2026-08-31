# 湖北省住房保障智能体｜MCP 接口设计

校准日期：2026-08-31

命名空间：`hubei_housing_security.*`

资源前缀：`hubei-housing://`

## 1. 设计原则

1. **先属地、后能力**：所有资格、项目、房态和办理请求必须带市州代码；县市区/功能区按场景补充。
2. **按产品隔离**：`public_rental | affordable_rental | talent_special_rental` 不共享资格谓词。
3. **按时效分层**：方向政策、市县/项目规则、当前可办分别存储和取证。
4. **模型不直连底库**：MCP 返回经版本化、复核和权限控制的数据，模型不得自行把公告拼成确定规则。
5. **可办状态唯一生成**：只有 actionability 服务可以写出 `current_actionability=true`。
6. **跳转最小授权**：只返回通过 HTTPS、精确主机、重定向终点和有效期校验的官方入口。

## 2. 统一请求上下文

```json
{
  "request_id": "req_01J...",
  "as_of": "2026-08-31T10:00:00+08:00",
  "locale": "zh-CN",
  "jurisdiction": {
    "province_code": "420000",
    "prefecture_code": "420100",
    "county_code": "420103",
    "functional_zone_code": null
  },
  "program_type": "public_rental",
  "consent_scope": ["session_precheck"]
}
```

`prefecture_code` 对资格、项目、办理和订阅为必填。只有政策浏览允许暂缺，但响应只能给省级方向，不能给个人结论。

## 3. 统一响应信封

```json
{
  "request_id": "req_01J...",
  "status": "ok",
  "data": {},
  "evidence": [
    {
      "source_id": "src_hb_001",
      "title": "关于加快发展保障性租赁住房的通知",
      "source_url": "https://zjt.hubei.gov.cn/...",
      "jurisdiction_codes": ["420000"],
      "temporal_level": "policy_direction",
      "published_at": "2021-11-08",
      "fetched_at": "2026-08-31T09:00:00+08:00",
      "effective_period": {"from": "2021-11-05", "to": null},
      "review_status": "approved"
    }
  ],
  "unknowns": [],
  "warnings": [],
  "generated_at": "2026-08-31T10:00:01+08:00"
}
```

任何资格、租金、材料或可办结论都必须能回溯 `source_id` 和规则版本。

## 4. Tools

### 4.1 `hubei_housing_security.jurisdiction_resolve`

把自然语言地名解析为行政区划或功能区，并识别跨城语境。

```json
{
  "text": "我在武汉光谷上班，想去宜昌申请",
  "province_code": "420000"
}
```

返回：

```json
{
  "target_prefecture_code": "420500",
  "employment_prefecture_code": "420100",
  "cross_city_context": true,
  "needs_confirmation": false
}
```

同名地点、多辖区或功能区不确定时返回候选并追问，不静默选择。

### 4.2 `hubei_housing_security.city_capability_get`

返回该市州已接入的政策、项目、实时房态、地图、订阅和办理能力，以及数据责任人和 SLA。

### 4.3 `hubei_housing_security.policy_search`

```json
{
  "prefecture_code": "420500",
  "program_type": "affordable_rental",
  "query": "就业条件",
  "temporal_levels": ["policy_direction", "local_project_rule"],
  "as_of": "2026-08-31"
}
```

只返回作用域覆盖目标辖区且在指定日期可用的文件。只有省级来源时，`warnings` 必须包含 `LOCAL_RULE_REQUIRED`。

### 4.4 `hubei_housing_security.notice_search`

按城市、产品、项目、批次和时间搜索公告，明确 `open | closed | historical | unknown`。页面“有效”只代表文件效力，不能覆盖公告登记截止时间。

### 4.5 `hubei_housing_security.eligibility_precheck`

```json
{
  "prefecture_code": "420100",
  "county_code": "420103",
  "program_type": "public_rental",
  "project_id": null,
  "batch_id": "jianghan-prh-2026",
  "profile": {
    "household_housing_state": "none_claimed",
    "qualification_certificate_state": "unknown",
    "employment_state": "employed",
    "talent_state": "not_applicable",
    "other_housing_benefit": "none_claimed"
  }
}
```

返回：

```json
{
  "result": "needs_verification",
  "satisfied": [],
  "unsatisfied": [],
  "unknown": [
    {
      "field": "qualification_certificate_state",
      "reason": "该历史批次要求指定日期前持有效江汉区资格证明"
    }
  ],
  "rule_set_ids": ["rule-420103-prh-20260615"],
  "current_actionability": false,
  "disclaimer": "预判不是正式审核，且该批次登记已结束"
}
```

三值逻辑：谓词返回 `true | false | unknown`；全真只能输出 `potential_match`，不得输出“资格通过”。

### 4.6 `hubei_housing_security.project_search`

```json
{
  "prefecture_code": "420600",
  "county_codes": [],
  "program_types": ["affordable_rental", "talent_special_rental"],
  "budget_max": 2000,
  "current_only": true,
  "limit": 20
}
```

`current_only=true` 时只返回 `current_actionability=true`。历史建设、交付和批次记录永不混入当前结果。

### 4.7 `hubei_housing_security.project_detail`

返回项目主数据、产品分类、运营主体、规则版本、最新库存、入口检查、未知项和证据。不因项目名含“人才/青年”自动修改产品类型。

### 4.8 `hubei_housing_security.inventory_status_get`

```json
{
  "prefecture_code": "420500",
  "project_id": "420527-yichang-quyuan-east",
  "required_freshness_minutes": 30
}
```

返回 `available | open_for_application | unavailable | closed | unknown`、`snapshot_at`、`available_count` 和来源。无实时接口时必须返回 `unknown`，不得把公告总套数当余房。

### 4.9 `hubei_housing_security.official_entry_validate`

校验入口运营主体、HTTPS、精确主机、端口、重定向链、项目/批次绑定、截止时间和最近检查时间。

```json
{
  "prefecture_code": "420500",
  "program_type": "affordable_rental",
  "project_id": "420527-yichang-quyuan-east",
  "entry_url": "https://ggzy.sc.yichang.gov.cn/..."
}
```

公告页可达但不是提交入口时，返回 `status=reference_only`。

### 4.10 `hubei_housing_security.actionability_evaluate`

```json
{
  "prefecture_code": "420500",
  "program_type": "affordable_rental",
  "project_id": "420527-yichang-quyuan-east"
}
```

```json
{
  "current_actionability": false,
  "reasons": ["LIVE_INVENTORY_MISSING", "ENTRY_RECHECK_REQUIRED"],
  "rule_set_id": "rule-420527-quyuan-20260302",
  "inventory_snapshot_id": null,
  "official_entry_check_id": "entry_check_..."
}
```

### 4.11 `hubei_housing_security.commute_estimate`

请求必须带同城目的地、交通方式和出发时段；跨城项目先阻断混排，再提示用户修改申请城市。返回区间、计算时间和地图提供方。

### 4.12 `hubei_housing_security.project_match`

硬过滤：同城、产品一致、规则有效、无明确资格冲突。软排序：资格线索、通勤、预算、户型、新鲜度。历史数据只能在 `mode=historical_demo` 下返回并强制显示免责声明。

### 4.13 `hubei_housing_security.subscription_upsert`

```json
{
  "prefecture_code": "420600",
  "filters": {
    "program_types": ["affordable_rental"],
    "budget_max": 2000,
    "workplace_poi_id": "poi_xy_hightech"
  },
  "event_types": ["new_batch", "inventory_available", "deadline_approaching"],
  "channel": "app_inbox",
  "consent": true,
  "expires_at": "2026-11-30T23:59:59+08:00"
}
```

城市切换时不复用原订阅，需用户确认新的属地条件。

### 4.14 `hubei_housing_security.official_handoff`

只有 `current_actionability=true` 或用户明确只要“政策/事项入口”时返回可操作链接。响应包含主体、适用城市/项目/批次、检查时间、截止时间、材料版本和离开提示；不代填、不代提交。

### 4.15 `hubei_housing_security.application_status_get`

仅在用户授权且官方系统支持时读取办理节点；返回可理解状态，不返回底层敏感审核明细。

## 5. Resources

- `hubei-housing://jurisdictions/{code}`：行政区划/功能区与能力状态。
- `hubei-housing://jurisdictions/{code}/policies/{policy_id}`：属地政策及结构化条款。
- `hubei-housing://jurisdictions/{code}/notices/{notice_id}`：项目/批次公告证据。
- `hubei-housing://projects/{project_id}`：项目主数据与官方产品分类。
- `hubei-housing://projects/{project_id}/inventory/latest`：最新房态。
- `hubei-housing://projects/{project_id}/entry-check/latest`：最新入口校验。
- `hubei-housing://projects/{project_id}/actionability/latest`：联合可办判断。
- `hubei-housing://rule-sets/{rule_set_id}`：版本化规则集。
- `hubei-housing://schemas/source-v1`：来源与时效字段。
- `hubei-housing://schemas/project-v2`：含行政区划代码的项目字段。

Resources 默认只读。公告解析、规则发布、房态同步和入口状态更新由受控后台完成，不由对话模型写入。

## 6. 错误码

| 错误码 | 含义 | 前端动作 |
|---|---|---|
| `JURISDICTION_REQUIRED` | 未指定目标市州 | 追问城市，不做资格判断 |
| `JURISDICTION_AMBIGUOUS` | 地名或功能区不明确 | 展示候选让用户确认 |
| `CROSS_CITY_RULE_BLOCKED` | 请求试图跨城套规则 | 阻断并解释 |
| `PROGRAM_TYPE_CONFLICT` | 公租房/保租房/人才住房混用 | 分拆请求 |
| `LOCAL_RULE_REQUIRED` | 只有省级方向，无属地规则 | 仅解释方向 |
| `RULE_STALE` | 规则过期或未复核 | 返回未知并转人工 |
| `INVENTORY_STALE` | 房态超过 SLA | 不输出当前有房 |
| `ENTRY_RECHECK_REQUIRED` | 入口可达但绑定/时效未确认 | 只作参考链接 |
| `OFFICIAL_LINK_BLOCKED` | 域名、协议或跳转不合规 | 阻止打开并记录 |
| `CONSENT_REQUIRED` | 缺少订阅/状态查询授权 | 请求最小授权 |
| `SENSITIVE_INPUT_REJECTED` | 用户提交不必要敏感信息 | 不落库并提示走官方入口 |

## 7. 审计与权限

- 政策、规则、房态、入口、可办判断分别记录版本、责任人和时间。
- 规则发布需双人复核；回滚不删除历史版本。
- 对话模型只有只读检索和预判权限；订阅、状态查询按用户授权最小开放。
- 日志只保留请求 ID、规则版本、来源 ID 和脱敏结果，不记录身份证号、验证码、银行卡或完整住址。
- 省级管理视图只展示聚合指标；市州只能访问授权辖区数据，项目运营方只访问自身项目。
