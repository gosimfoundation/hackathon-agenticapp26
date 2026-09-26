# 相关项目与仓库

本届黑客松涉及的项目、仓库地址和各自的角色。9/26 演示中每个仓库都在本地检出并被实际阅读或运行过,「演示中的用法」一列说明当天用它做了什么。

## 比赛本身

| 项目 | 仓库 | 角色 | 演示中的用法 |
|---|---|---|---|
| 比赛官网与课程书 | [gosimfoundation/hackathon-agenticapp26](https://github.com/gosimfoundation/hackathon-agenticapp26) | 赛程、规则、评审标准、12 个场景、悬赏榜、课程讲稿 | 读取规则与评审框架,作为参赛分析的唯一依据 |

官网:<https://create.gosim.org/agenticapp26/>

## OctoSense:应用宿主

| 项目 | 仓库 | 角色 | 演示中的用法 |
|---|---|---|---|
| OctoSense | [OctoSense-org/OctoSense-Desktop](https://github.com/OctoSense-org/OctoSense-Desktop)(原名 OctoSense,旧地址会自动跳转) | 基于 Makepad 的桌面 / 移动应用宿主,用 tile 托管应用 | 本地编译运行,带上 AppCard 模块打开天气卡 |
| OctoSense-AppCard | [OctoSense-org/OctoSense-AppCard](https://github.com/OctoSense-org/OctoSense-AppCard) | 「一句话生成卡片」的运行时:路由大脑、应用 agent、校验与修复;**生态里唯一接通 octos 的仓库** | 通过本地 `octos serve` 生成天气卡;它的 Rust 传输层被天气 app 复用来连接 octos |
| OctoSense-ROM | [OctoSense-org/OctoSense-ROM](https://github.com/OctoSense-org/OctoSense-ROM) | Android 系统镜像与内置 launcher | 阅读分析 |
| OctoSense-App-Hub | [OctoSense-org/OctoSense-App-Hub](https://github.com/OctoSense-org/OctoSense-App-Hub) | 卡片包规范、预检 CLI、签名目录 | 未在本地检出;比赛期间商店入口未接通 |

## Octoscript:语言与渲染

| 项目 | 仓库 | 角色 | 演示中的用法 |
|---|---|---|---|
| OctoScript | [OctoSense-org/OctoScript](https://github.com/OctoSense-org/OctoScript) | capability-first 脚本语言:工作流 profile 与 UI Profile L0 | 阅读语言契约、L0 校验器与实例化器 |
| OctoScript-Makepad | [OctoSense-org/OctoScript-Makepad](https://github.com/OctoSense-org/OctoScript-Makepad) | 把 L0 卡片翻译成 Makepad 原生组件的渲染层 | 阅读渲染链与版本锁 |
| OctoScript-App-Design-Flow | [OctoSense-org/OctoScript-App-Design-Flow](https://github.com/OctoSense-org/OctoScript-App-Design-Flow) | 设计方法、从草图 / 图片生成原生卡的 `lab/` 流水线;AppCard 运行时于 9/25 从这里拆出 | 阅读设计文档与拆分历史 |
| makepad(fork) | [OctoSense-org/makepad](https://github.com/OctoSense-org/makepad) | Rust GPU UI 框架;`apps/weather` 是一个完整的原生天气 app | 编译运行 `apps/weather`,并以它为起点做独立天气 app;用 app remote 接口远程驱动界面 |

## 宿主与协作

| 项目 | 仓库 | 角色 | 演示中的用法 |
|---|---|---|---|
| Rinx | [hagency-org/Rinx](https://github.com/hagency-org/Rinx) | 本届**主要小程序宿主**:Matrix 即时消息客户端,支持网页小程序卡片与原生文章编辑器 | 阅读宿主机制、授权模型与 L0 文章编辑器 |
| hagency | [hagency-org/hagency](https://github.com/hagency-org/hagency) | 软件工厂;悬赏第 1 题的协作对象 | 未在本地分析 |

## Agent 与开发工具

| 项目 | 仓库 | 角色 | 演示中的用法 |
|---|---|---|---|
| octos | [octos-org/octos](https://github.com/octos-org/octos) | Agent 内核:`octos serve` 提供会话、模型、工具、goal 与 peer | 为三路调研内环、AppCard、天气 app 提供 agent 会话 |
| octoscode | [octos-org/octoscode](https://github.com/octos-org/octoscode) | octos 的终端客户端;OctoLoop 双环(外环审查、内环执行)的载体 | 作为全部内环;OctoLoop skill 与黑板脚本来自这里 |
| herdr | [hagency-org/herdr](https://github.com/hagency-org/herdr)(octoscode 窗格识别在 `feat/octoscode-agent` 分支;上游 [herdrdev/herdr](https://github.com/herdrdev/herdr)) | 终端工作区管理器,外环用它启动、观察、驱动内环窗格 | 每个内环都开在可见的 herdr 标签页里 |

## 版本锁定

比赛课程要求按锁定版本组合使用,不混用最新 main:

| 组件 | 锁定提交 | 依据 |
|---|---|---|
| makepad | `1d3d383` | OctoSense 与 OctoScript-Makepad 的 `runtime.json` |
| Octoscript | `68f6a9d` | 同上 |
| Octoscript-Makepad | `c4c9682` | OctoSense 的 `native-runtime.lock.json` |
| Rinx(比赛核查基线) | `05daf9b` | [Rinx 小程序基线](../../rinx-miniapps.md) |

## 演示项目

`octo-weather`:以 makepad `apps/weather` 为起点的独立原生天气 app,演示当天在本地开发,尚未发布仓库。设计见 [行程守护设计蓝图](octo-weather-guardian.md)。
