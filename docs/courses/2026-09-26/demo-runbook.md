# 讲师演示与准备手册

本文件是课前执行手册。**截至 2026-09-25，本轮已核对启动入口与源代码，尚未运行这组最新 GUI 构建。以下命令为源码支持的预演入口，不是已经通过的实机报告。** 课程负责人应在开课前填写下列检查结果。

## 环境与演示准入

主演示选择一台已准备好的桌面设备。Android 作为通过实际预演后的附加展示；不把桌面手机样式当成 Android / iOS 运行证明。讲师、环境助教、课堂助教各负责讲解、运行故障、收集学员反馈，可由两人兼任。

| 项目 | 准入条件 | 本轮状态 |
|---|---|---|
| 源码与版本 | 按整合文档锁定 Makepad / Octoscript / AppCard，不混用 main | 已核对依赖声明 |
| 安装与启动 | OctoSense 打开 AppCard，关闭后所属内核正常退出 | 待预演 |
| 模型与会话 | 隔离教学配置能够真实请求模型，错误可观察 | 内环 octoscode 已执行真实任务；GUI 路径待预演 |
| 真实数据 | 深圳天气与预报日期可核对，单位切换有效 | 待预演 |
| 学员副本 | 修改后的卡片能在同一宿主加载 | 待预演 |
| 故障练习 | 数据不可用有可复现路径，恢复后能正常使用 | 待准备并预演 |
| 备用材料 | 同版本的正常/失败截图和录屏，标注时间与模式 | 待录制 |

在课堂前完成安装与编译。未通过模型检查时，仍可使用经验证的预置卡片讲交互，但必须注明未进行现场 Agent 生成；宿主也未通过时，使用已验证旧版本回放或任务设计练习，不能标为最新版本演示。

## 讲师启动依据

使用专门的课堂工作区，按 [固定源码版本](integration-and-sources.md#固定源码与更新记录) 准备相邻的 OctoSense、Octoscript-AppCard、octoscript-makepad、makepad、octoscript。`tools/setup-native.py` 会准备共享依赖，先确认父目录和现有文件；不要在学员的日常项目树里临时改依赖。

OctoSense 官方入口：

```sh
# 在隔离课堂工作区的 OctoSense 目录执行。
python3 tools/setup-native.py
python3 tools/setup-native.py --check --cargo-manifest Cargo.toml
cargo build --features app-appcard
```

桌面本地内核入口：下列路径须由讲师替换，先准备专用配置与模型账号。AppCard 源码会传入该目录内的 `config.json`，仅设置目录不等于已完成模型配置。

```sh
OCTOS_APP_CORE_BIN=/absolute/path/to/octos \
OCTOS_APP_CORE_DIR=/absolute/path/to/classroom/app-runtime \
cargo run --features app-appcard -- --module appcard
```

两个环境变量需同时提供。AppCard 自己启动 `octos serve --stdio`，不要再替同一实例启动第二个内核。没有这组变量时桌面走服务连接路径，需要另行配置。二进制版本要实际核验；拉取最新源码不会更新本机已安装命令。

开发协作入口，在隔离的学员副本中启动已配置的 octoscode：

```sh
octoscode --version
octos --version
octoscode --cwd /absolute/path/to/classroom/my-entry
```

如需显式使用一个经预演的本地内核，使用 CLI 支持的 `--stdio-command` 指定 `octos serve --stdio` 及独立数据目录，核对该版本帮助。`--prompt` 是交互式终端的启动提示，不是无界面执行模式。不要把两个客户端接到同一条 stdio 管道；多客户端共享服务属于单独配置的网络传输方案，不是本课前提。

## 演示 A：意图生成与数据结果

1. 显示课堂版本记录，打开 OctoSense 中的 AppCard。
2. 输入：“查看深圳今天和明天的天气，保留温度单位切换；拿不到数据时说明无法获取。”这是教学意图，不保证任意模型一次生成成功。
3. 观察请求、路由、生成与数据到达，记录实际行为。只显示“已提交”时继续等待或检查错误。
4. 核对城市、日期、来源和获取时间。点击单位或城市操作，确认状态和数据一起变化。
5. 展示已在隔离环境复现的失败状态；没有准备好失败注入时，用明确标记版本的失败回放讲解，不现场随意改系统网络。

教师只解释可观察的环节，深层源码问题交给课后工程材料。预演时分别记录“生成成功”和“用户任务成功”。

## 演示 B：开发 Agent 修改卡片

从**课堂锁定的 Octoscript** 的 `crates/octoscript-ui-l0/tests/fixtures/weather.card` 复制练习副本，先用当前宿主验证原版，再让 Agent 修改该副本。初始任务只改一项信息表达或现有状态，不现场发明新服务。

AppCard 源码提供 `MAKEPAD_SEED_L0_FILE` / `MAKEPAD_SEED_L0_DATA`。以下入口可用于预演宿主加载；它是教学种子注入，不是面向最终用户的应用安装或分发接口：

```sh
# 使用 AppCard 内置卡片，仍需检查其实时服务是否可达。
MAKEPAD_SEED_L0_FILE=builtin:weather \
cargo run --features app-appcard -- --module appcard

# 使用学员副本：必须提供可读 JSON 数据文件；内容按匹配卡片准备。
MAKEPAD_SEED_L0_FILE=/absolute/path/to/classroom/my-entry/app/weather.card \
MAKEPAD_SEED_L0_DATA=/absolute/path/to/classroom/my-entry/data.json \
cargo run --features app-appcard -- --module appcard
```

自定义数据文件可以从预演所用卡片的实际数据约定准备，不能凭空假设 JSON 字段。空对象不等于断网 fixture，也不保证所有来源会得到值。是否需要本地 Octos 配置取决于是否同时演示 Agent 生成；将其与单纯种子卡片渲染分开记录。

该入口注入 L0 源卡片而非预先降低后的画面，目的是保留事件和重绘路径；仍要执行真实点击检查。普通 `MAKEPAD_SEED_CARD_FILE` 不是等价替代。启动新实例前关闭本次练习自己的旧实例，避免演示错误窗口。

## 演示 C：服务卡片流水线的机制概览

使用 AppCard 中 `lab/image-to-appcard-flow/README.md` 与一个已有服务项目，讲清“设计状态 → 语义映射 → 原生控件 → 服务规则 → 真实点击 → 验证材料”。不在四小时内重新生成 8–12 屏图集、安装工具链或现场打包 WASM。

准备环境后，可用下列只规划入口查看阶段与参数，**输出计划不等于已经执行阶段**：

```sh
# 在 Octoscript-AppCard 根目录执行，先按该项目说明准备 Python 环境。
bash tools/image-to-appcard-flow.sh plan \
  --project /absolute/path/to/Octoscript-AppCard/apps/aircon \
  --manifest /absolute/path/to/Octoscript-AppCard/apps/aircon/image-to-appcard-flow.json
```

最新 `lab/core/NATIVE-INSTRUMENT.md` 推荐使用独立 release 程序及 Makepad 内置 HTTP instrument；旧 `capture/gate` 阶段仍有 Studio 兼容边界。按具体阶段和二进制协议预演，不把旧命令改名后宣称已支持新路径。命令执行成功、视觉合格、服务行为正确分别核验。

## 截图与演示素材清单

| 画面 | 要证明什么 | 使用位置 |
|---|---|---|
| OctoSense 中的 AppCard 与请求 | 真实宿主及意图入口 | 第一堂开场 |
| 请求处理中的状态 | 用户知道任务尚未完成 | 第一堂生成流程 |
| 正常数据与实际操作后的结果 | 操作产生正确变化 | 两堂课的核心演示 |
| 数据不可用的界面 | 不编造结果，有明确反馈 | 失败案例 |
| octoscode 任务与关键修改 | 开发 Agent 如何参与 | 第二堂协作流程 |
| 同一任务的前后对照 | 改动带来可核验改善 | 第二堂总结与作品材料 |

每份素材记录宿主、AppCard、运行时、内核版本及数据模式。录屏与现场演示标识清楚；本课程包未附新截图，不把历史截图标成此次新版本运行结果。拍摄账号、模型配置和开发终端时避开凭据。

结束后退出本次创建的应用和内核，保留学员文件与证据。不要关闭其他人正在运行的应用或服务。
