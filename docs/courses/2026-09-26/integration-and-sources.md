# 源码依据与 Octos → OctoSense 整合路线

检查日期：2026-09-25。本文是课程备课与后续整合的依据。**源码存在、历史测试描述、此次实际运行是三类证据，分别记录。** 本轮没有修改这些项目的产品代码。

## 固定源码与更新记录

| 项目 | 本轮检查提交 | 更新处理 |
|---|---|---|
| OctoSense | `c3b8e14dd32fdfda08581798a3cb02a984d535e6` | fetch 后发现上游重写历史，保留原目录；独立检出最新 main |
| Octoscript-AppCard | `9e8e4898b8a7c03dbcb62993e7826577411e489d` | 原目录保留；最新 main 浅克隆用于检查，避免继续获取庞大历史 |
| octoscode | `90ed8d02eecd6ebae016b88d6b6fa3631de78cec` | 原目录有未提交内容，保留；fetch 后独立检出最新 main |
| Octoscript | `ed1d3a80e133ad1191ff660412838636e52e96a9` | 新建浅克隆，检查最新 main；不是本次宿主的锁定运行时 |
| Octos | `a484ae120baed083e3085b5aba74d5e5a199b62d` | 原目录干净，已 fast-forward 到最新 main |
| 官网 | 基于 `f6fb9c14493c2b366881226556e16f02b04c1fad` | 新独立仓库，本课程文件与网页文案在课程分支修改 |

“最新 main”指本次 fetch / clone 时取得的状态，不是永远移动的课堂依赖。

**推荐预演的依赖组合，以 OctoSense 锁文件为准：**

| 依赖 | 精确版本 |
|---|---|
| Octoscript-Makepad | `c4c9682219d5bb549856e35086adf1b354844dc3` |
| Makepad | `1d3d383e84a66dbb18a4a860f505430c9d5b20f4` |
| Octoscript（宿主使用） | `68f6a9df55692b5d8ef8873a12721e279a3f40d6` |
| AppCard（宿主使用） | `9e8e4898b8a7c03dbcb62993e7826577411e489d` |

依据为 OctoSense 的 [原生运行时锁](https://github.com/OctoSense-org/OctoSense/blob/c3b8e14dd32fdfda08581798a3cb02a984d535e6/native-runtime.lock.json)、[AppCard 依赖声明](https://github.com/OctoSense-org/OctoSense/blob/c3b8e14dd32fdfda08581798a3cb02a984d535e6/apps/appcard/Cargo.toml) 与框架 [runtime.json](https://github.com/OctoSense-org/Octoscript-Makepad/blob/c4c9682219d5bb549856e35086adf1b354844dc3/runtime.json)。检查最新 Octoscript 的概念资料，不代表可以替换宿主所需版本。

本机命令检查得到 octoscode `0.3.0-rc.9`、Octos `2.0.3-rc.10`，均早于本次更新的源码。课堂发布包需另外记录实际二进制构建版本，并执行协议与启动预演。不能以 `git pull` 完成作为二进制升级证据。

## 已有整合机制

OctoSense 的 [AppCard 模块](https://github.com/OctoSense-org/OctoSense/blob/c3b8e14dd32fdfda08581798a3cb02a984d535e6/apps/appcard/src/lib.rs) 将 `octos_app::AppShell` 嵌入宿主隔离实例，复用路由、应用 Agent、卡片状态、传输、会话、输入与 L0 处理。模块还注册卡片需要的 `sys` / `agent` 引擎绑定。

AppCard 的 [运行与传输入口](https://github.com/OctoSense-org/Octoscript-AppCard/blob/9e8e4898b8a7c03dbcb62993e7826577411e489d/app/app/src/lib.rs) 在桌面读取 `OCTOS_APP_CORE_BIN` 和 `OCTOS_APP_CORE_DIR`，启动本地 Octos stdio 子进程；Android 可从应用包加载 `liboctos.so`。模块不另起第二个内核。未配置本地启动时有服务连接路径。

模块暴露 `ask` 工具，将文本交给 AppShell；成功返回 `submitted` 表示请求已提交。它本身不是卡片完成、数据获取成功或业务成功的凭证。因此课程观察完整任务，不把工具返回当作最终结果。

按 [OctoSense README](https://github.com/OctoSense-org/OctoSense/blob/c3b8e14dd32fdfda08581798a3cb02a984d535e6/README.md)，宿主版的通知、分享、WebView 覆盖层仍有接线缺口；GPS 依赖对应 Android 构建活动。iOS 完整构建还有锁定 Makepad 的限制，不能宣传全平台已经实测。

## 两条 AppCard 流程与 Octoscript 边界

运行时流程是意图 → 路由 / 应用 Agent → 卡片表达 → 校验与实例化 → 原生呈现、数据和事件。L0 源码需要保留下来供交互和重绘；先降低成一次性画面并不等价于保留可更新应用。实现可从上述 AppCard 入口的 `L0_APPS`、`MAKEPAD_SEED_L0_FILE`、`bundled_l0_source` 及 `app/l0_card.rs` 追踪。

设计制作流程由 [image-to-appcard-flow](https://github.com/OctoSense-org/Octoscript-AppCard/blob/9e8e4898b8a7c03dbcb62993e7826577411e489d/lab/image-to-appcard-flow/README.md) 组织图集、语义映射、原生控件、服务状态、验证与交付。图像生成器是外部输入，服务规则需要作者提供，不会从图片自动推断。新原生检查采用 [内置 instrument 手册](https://github.com/OctoSense-org/Octoscript-AppCard/blob/9e8e4898b8a7c03dbcb62993e7826577411e489d/lab/core/NATIVE-INSTRUMENT.md)；历史 Studio 阶段仍需按兼容边界处理。

Octoscript 的 [UI L0 实现](https://github.com/OctoSense-org/Octoscript/blob/ed1d3a80e133ad1191ff660412838636e52e96a9/crates/octoscript-ui-l0/src/lib.rs) 和工作流 profile 不可混用。L0 检查与实例化、宿主能力实现、操作系统隔离各有边界。独立仓库的 [Makepad 兼容 fixture](https://github.com/OctoSense-org/Octoscript/blob/ed1d3a80e133ad1191ff660412838636e52e96a9/docs/makepad-ui-compatibility.md) 仅验证指定解析兼容性，不提供完整控件宿主；普通工作流 CLI 检查不能替代卡片运行。

AppCard README 混有早期分支与工作区说明，`app/README.md` 还保留“规划阶段”历史文字。本课程优先依据当前代码、锁文件与 [统一原生工作区文档](https://github.com/OctoSense-org/Octoscript-AppCard/blob/9e8e4898b8a7c03db62993e7826577411e489d/docs/NATIVE-WORKSPACE.md)，不直接照搬旧安装步骤。

## 后续整合任务：验证并补齐已有路径

以下是工程建议，不是本轮已实现内容，也不要求四小时全部完成。

| 阶段 | 工作 | 验收证据 |
|---|---|---|
| 1. 可重复启动 | 锁定源码与内核二进制，隔离配置；使用已有 AppCard 模块 | 冷启动、关闭重开、模型失败、退出后进程检查 |
| 2. 用户任务闭环 | 用天气等已有能力，追踪请求到卡片和结果；记录取消、失败与重试 | 实际操作、来源时间、正常/失败证据，避免把 submitted 当完成 |
| 3. 能力与授权 | 核查宿主声明的 storage/net 如何落实到各路径；按选题补能力适配 | 拒绝、超时、权限变化和服务失效测试；不从工作流安全机制直接推断宿主保证 |
| 4. 开发到运行交付 | 固定卡片产物、版本与加载方式，建立可复现验证包 | 另一台支持设备或独立环境复现；源码与运行证据对应 |
| 5. 跨平台及生态贡献 | 按价值选择 Android 生命周期、分享等缺口；技术突破另议 ROM | 平台分别验证，提交可复用改动与任务效果前后对照 |

9/26 课堂覆盖阶段 1–2 的机制、准备好的演示和一个小迭代；阶段 3–5 作为参赛方向，不作为上课前必须重做的架构。

## 本轮内环使用与证据等级

使用已安装 octoscode，通过隔离目录和真实 Octos stdio 会话整理 Octoscript 事实。内环交付了文档审查；外环对照源码复核，未直接采用“局部材料未检索到 Splash 就可断言项目没有 Splash”等过度结论，也没有把历史测试数量说成本轮通过数量。

本轮事实核对依据为本地源码与固定版本文档；本轮真实模型运行仅证明该内环协作任务执行。新 GUI 版本的编译、天气数据、交互和跨平台表现仍需按演示手册预演。课程文件、网站构建和文案检查的验证与应用产品验证分开记录。
