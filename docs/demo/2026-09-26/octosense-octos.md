# OctoSense 与 octos 集成

OctoSense 上的应用怎样定义、加载、渲染和交互,以及整个生态目前有没有接入 octos、接到什么程度。代码基线为 2026-09-26 各仓库 HEAD 与 octos main(`a8ab5980`)。

## 结论

- **octos 集成真实且深入,但只在 OctoSense-AppCard 一个仓库里。** AppCard 通过 UI Protocol 把 octos 当作 agent 内核:桌面走 WebSocket,Android 走 `liboctos.so serve --stdio`。
- OctoSense 桌面和 ROM 只是通过 AppCard 模块间接获得 octos,**桌面默认构建还不含 AppCard**,要加 `--features app-appcard`。
- **Rinx、OctoScript、makepad 与 octos 没有协议级集成。** Rinx 文档原话:「Octos AppService and BotFather remain separate integrations」(`Rinx/docs/agent-chat.md:239`)。

## OctoSense 上的三种「应用」

| 形态 | 承载方式 | 从哪里定义 | 例子 |
|---|---|---|---|
| 进程应用 | 子进程,tile 呈现它的共享 swapchain | 应用目录 `apps.json` 的一行 | Reference、Terminal、Makepad 自带应用 |
| 链接模块 | 进程内独立的 Splash isolate | 代码里按 feature 收录的 `linked_modules()` | appcard、sheets、rinx |
| Hub 卡片应用 | 签名卡片包,由 `card` 模块托管 | 签名的 `manifest.json` 加 `listing.json` | 以 `hub:<id>` 启动的应用 |

- **应用目录**按优先级取第一个:启动参数 `--apps <JSON>` → `~/.octosense/apps.json` → 仓库内 `config/apps.json`(`OctoSense/src/octosense/catalog.rs`)。
- **进程应用**用 `cargo run --release … -- --stdin-loop` 启动,二进制过期会自动重建,构建进度显示在 tile 里。
- **链接模块**在桌面默认仍按进程启动;带 `--module <id>` 或在 `~/.octosense/wm/apps.splash` 写 `id: Module` 才进程内托管。移动端全部进程内托管(`OctoSense/src/apps.rs:1-12`)。
- 有仓库检出时,**启动器只列 `config/apps.json` 里的应用**,链接模块不会自动出现。演示中是用一份带 AppCard 行的临时目录 `--apps` 启动才看到 AppCard。

## 平台的 agentic 落点

- **应用即服务**:AI 总线上每个应用都能注册工具表。makepad 天气 app 就注册了一个只读工具 `current`。
- **窗口管理器本身是 `os` 服务**:agent 能列出、启动、聚焦、关闭应用,打开文件(`OctoSense/src/ai_bus.rs`)。
- **AppCard 的 `ask` 工具**:把一句话交给 AppCard,由路由大脑选择应用 agent 生成卡片。
- **注意**:OctoSense 桌面自带的 AI 面板走的是 makepad 自己的 AI 服务栈,和 octos 无关。

## 各仓库与 octos 的关系

| 仓库 | 与 octos 的关系 | 评级 |
|---|---|---|
| OctoSense-AppCard | 依赖 `octos-core`(钉在 `18fcd3f1`),自带 WebSocket、stdio、进程内三种传输 | 已集成 |
| OctoSense 桌面 / 移动 | 通过可选 feature `app-appcard` 装载 AppCard 模块;桌面默认不含 | 部分集成 |
| OctoSense-ROM | 内置 launcher 带同一个 AppCard 模块;ROM 自己的特权 agent 服务与 octos 无关 | 部分集成 |
| Rinx | 文档明写是独立集成,尚未接入 | 未集成 |
| OctoScript / OctoScript-Makepad / makepad | 零协议级引用 | 未集成 |

反过来看 octos:main 原生支持把 AppCard 的 `a2app/` 语料注入 agent 长期记忆(`octos-memory/src/memory_store.rs:445-505`);`send_app_card` 工具面向 Robrix 的 Matrix 卡片,不是 OctoSense。

## 让 OctoSense 应用调用 octos agent:零新代码的现成路径

1. 构建 octos main 的 `octos` 二进制,给一个 profile 配好模型。
2. 启动 `octos serve`(默认只绑本机),令牌放环境变量 `OCTOS_AUTH_TOKEN`。
3. 写 `~/.config/octos-app/server.json`:`{"server_url": "http://127.0.0.1:<端口>", "profile_id": "<id>"}`,客户端令牌放 `OCTOS_APP_TOKEN`。
4. 用 `cargo run --features app-appcard -- --module appcard` 运行 OctoSense。

演示中按这四步在本机跑通,AppCard 打开 11 个 octos 会话,输入「深圳天气」生成了带实时数据的天气卡。

## 值得做的集成缺口

- **让 Rinx 接上 octos**:Rinx 是比赛主要宿主,却和 octos 完全没打通。搭这座桥对应悬赏第 10 题「UI Protocol 最小客户端」,目前只有 AppCard 的 Rust 实现可参考。
- **让 octos agent 调用 OctoSense AI 总线上的应用工具**:应用已经注册了工具,octos agent 却调不到;接通后任何应用都能被 agent 使用。
- **补齐 Rinx 的 `ServiceExecutor`**:它目前一律返回不可用(`Rinx/src/module.rs:139-141`)。

## 风险

- `OctoSense-AppCard/octos/` 子模块默认未初始化;桌面 WebSocket 路径不受影响,Android 与 OpenHarmony 构建要先 `git submodule update --init`。
- OctoSense 与 ROM 用的 AppCard 钉在旧仓库版本 `9e8e4898`,它期望 octos 0.x/1.x,连接 2.0 版服务端时会出版本告警,但会话正常。
