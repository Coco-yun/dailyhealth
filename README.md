# DailyHealthy G4 健康打卡管理系统
> 项目代号：G4
> 技术栈：Vue3 + Vite + Pinia + Vant + Element‑Plus + json‑server
> 公网访问：https://coco‑yun.github.io/dailyhealth/
> 本地前端：[http://localhost:5173/dailyhealth/#/login](http://localhost:5173/dailyhealth/#/login)
> Mock接口服务：[http://localhost:3000](http://localhost:3000)

---

## 📖 产品简介
DailyHealthy G4 健康打卡管理系统是面向集体团队的线上健康上报管理工具。
使用 json‑server 模拟后端，基于 JSON 文件完成数据存储，无需搭建真实后端即可完成整套业务开发。

系统划分两类身份角色，权限相互隔离：
- 👤 普通成员：完成每日健康上报打卡，查看个人历史打卡记录，浏览系统公告
- 👔 管理员：查看全员打卡汇总记录，维护打卡数据，发布管理公告，支持打卡数据导出Excel

特性：同时适配移动端、PC端；登录状态本地持久化，刷新页面登录信息不丢失。

---

## 👥 用户角色与测试账号
| 角色 | 测试账号 | 测试密码 | 权限范围 |
| --- | --- | --- | --- |
| 普通成员（member） | student1 | 123456 | 打卡、查看个人记录、浏览公告，无管理员功能 |
| 管理员（admin） | admin | admin123 | 拥有普通成员全部能力；全员打卡管理、公告增删改、数据导出 |

---

## 🎯 核心产品功能

### 🔐 登录模块
- 账号密码表单非空校验，账号错误给出友好提示
- 登录成功保存用户身份，自动跳转打卡首页
- 路由守卫鉴权：未登录拦截跳转登录页；普通成员禁止访问管理员页面
- 支持退出登录，清空用户状态，返回登录页面
- Pinia持久化，浏览器刷新登录状态不丢失

### 📝 成员打卡模块
- 页面自动查询当日打卡记录，判断用户是否已经打卡
- 未打卡：填写体温、健康状态、备注，提交打卡上报
  - 表单校验：体温必填，体温合法范围 35‑42℃
- ✅ 已打卡：表单全部禁用，展示“今日已完成打卡”，禁止重复提交
- 日期统一规范：yyyy‑MM‑dd 字符串格式

### 🧾 个人中心模块
- 展示当前登录用户：姓名、账号、角色身份
- 展示个人全部打卡记录，按日期倒序排列
- 统计并展示连续打卡天数
- 提供退出登录操作入口

### 📊 管理员汇总模块
- 获取全部用户与全部打卡数据
- 全员打卡表格展示，当日未打卡人员高亮标记
- 弹窗查看打卡详情、编辑纠错打卡记录、删除错误记录
- 一键导出全员打卡数据为 Excel 文件

### 📢 公告管理模块
- 全部用户可浏览公告列表，置顶公告优先展示在列表顶部
- 管理员权限：新增公告、编辑公告内容、删除公告
- 公告字段：标题、正文内容、是否置顶、创建日期

---

## ⚙️ 非功能需求
| 类别 | 说明 |
| --- | --- |
| 📱 多端兼容 | 同时适配手机移动端、PC浏览器 |
| 💡 用户体验 | 请求展示Loading加载；网络异常统一弹窗提示 |
| 📅 数据规范 | 全部日期统一使用 yyyy‑MM‑dd 字符串 |
| 💾 状态持久化 | Pinia持久化插件存储登录用户信息 |
| 🚀 部署 | 支持本地开发；支持 GitHub Pages公网静态部署 |

---

## 🚀 运行 & 部署指南

### 本地开发运行
> 需要开启两个终端窗口，分别启动前端与mock后端
```bash
# 安装全部项目依赖
npm install

## 终端A：启动模拟后端服务
npm run mock

## 终端B：启动Vue前端开发服务
npm run dev
```

### GitHub Pages公网部署
```bash
# 打包生成静态dist资源
npm run build

# 发布部署到gh‑pages分支
npm run deploy
```

---

## 🔁 业务流程
```
访问系统
    ├─未登录 → 登录页
    │    ├─登录成功 → 打卡首页
    │    └─登录失败 → 留在登录页，弹出错误提示
    └─已登录
         ├─打卡首页：提交打卡、查看公告
         ├─个人中心：查看资料、历史打卡、退出登录
         ├─公告页面：浏览/管理公告
         └─管理员汇总页（仅admin）：全员打卡、数据导出
```

---

## 🗃 数据模型

### users 用户表
| 字段 | 类型 | 说明 |
| --- | --- | --- |
| id | number | 主键，用户唯一标识 |
| username | string | 登录账号 |
| password | string | 登录密码（演示明文，正式项目需要加密） |
| role | string | 用户角色：member / admin |
| name | string | 用户真实姓名 |

### punches 打卡记录表
| 字段 | 类型 | 说明 |
| --- | --- | --- |
| id | number | 主键，打卡记录唯一ID |
| userId | number | 关联users用户id（外键） |
| date | string | 打卡日期 yyyy‑MM‑dd |
| temp | number | 体温（摄氏度） |
| status | string | 健康状态：正常 / 发热 |
| note | string | 症状备注信息 |

### notices 公告表
| 字段 | 类型 | 说明 |
| --- | --- | --- |
| id | number | 公告主键 |
| title | string | 公告标题 |
| content | string | 公告正文 |
| top | boolean | 是否置顶 true/false |
| createTime | string | 创建日期 yyyy‑MM‑dd |

---

## 📡 接口总览
> 接口基础地址：[http://localhost:3000](http://localhost:3000)

| 功能 | 请求方法 | 接口地址 |
| --- | --- | --- |
| 登录校验 | GET | /users?username=&password= |
| 获取单个用户信息 | GET | /users/:id |
| 查询该用户全部打卡记录 | GET | /punches?userId= |
| 查询用户某一天打卡记录 | GET | /punches?userId=&date= |
| 提交新增打卡 | POST | /punches |
| 修改打卡记录 | PUT | /punches/:id |
| 删除打卡记录 | DELETE | /punches/:id |
| 获取全部公告列表 | GET | /notices |
| 新增公告 | POST | /notices |
| 修改公告 | PUT | /notices/:id |
| 删除公告 | DELETE | /notices/:id |

