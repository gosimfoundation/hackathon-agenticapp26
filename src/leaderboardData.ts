// Award-round leaderboard: five-dimension judging (creativity, completeness, technical contribution,
// social value, app performance; 20 points each). Generated from the judges' review notes, 2026-10-15.
// Screenshots live in public/leaderboard/<issue>.webp; they come from each entry's repository unless
// shotByJudge is set (captured by the judges during live verification).

export type Dimension = 'creativity' | 'completeness' | 'tech' | 'social' | 'performance'
type Text = Record<Dimension, string>
export type Entry = {
  n: number
  name: { zh: string; en: string }
  repo: string
  shotByJudge: boolean
  live: boolean
  conflict: boolean
  award?: string
  scores: Record<Dimension, number>
  total: number
  why: { zh: Text; en: Text }
}

export const dimensions: { key: Dimension; label: string; description: string }[] = [
  { key: 'creativity', label: '创意', description: '问题框定和 Agent 角色是否新颖、有洞察，是否找到别人没想到的切入点。' },
  { key: 'completeness', label: '项目完整度', description: '核心功能端到端是否完整，演示视频与复赛材料是否齐全；实机复核过的作品按实测结果调整。' },
  { key: 'tech', label: '技术贡献度', description: '参评最佳技术突破的作品按技术突破分折算；其余按作品自身可复用的工程成果计分，最高 8 分。' },
  { key: 'social', label: '应用社会价值', description: '受益人群有多广、问题有多重要，能否在真实生活中长期使用。' },
  { key: 'performance', label: 'App 性能', description: '实机复核作品按官方宿主上的实际表现评分；未实测作品按证据推定，最高 14 分；核心流程在官方宿主跑不通的最高 6 分。' },
]

export const entries: Entry[] = [
  {
    "n": 78,
    "award": "一等奖 · MiniMax · 意创万象大奖",
    "name": {
      "zh": "OnCue 试映间",
      "en": "OnCue Screening Room"
    },
    "repo": "https://github.com/codezzzsleep/OnCue",
    "shotByJudge": false,
    "live": true,
    "conflict": false,
    "scores": {
      "creativity": 15,
      "completeness": 18,
      "tech": 16,
      "social": 15,
      "performance": 16
    },
    "total": 80,
    "why": {
      "zh": {
        "creativity": "把群聊发言做成「试映—发送—看反响」四幕，Agent 先在私下预演群友反应再发，交互比喻新。",
        "completeness": "实测：官方 Rinx 1.3.0 四幕全通过，发送后另一账号在服务端核实收到；在 OctoSense 上如实提示需要 Rinx。",
        "tech": "技术突破 80 分折算：向 OctoSense-App-Flow 提交 card-host 场景式界面测试工具 splash-app-verify（#192），可注入宿主失败路径，所有卡片应用都能用。",
        "social": "面向群聊里说话前犹豫的人，降低社交摩擦，场景高频但偏个人体验。",
        "performance": "实测：读群 4 条即时；试映首次 150 秒超时、重试 84 秒；发送加读回 4 秒；看反响 53 秒。"
      },
      "en": {
        "creativity": "Turns posting in a group chat into four acts (screen, send, watch the reaction); the Agent privately rehearses how group members will react before sending. A fresh interaction metaphor.",
        "completeness": "Live-tested: all four acts pass on the official Rinx 1.3.0, and after sending, a second account verified receipt on the server; on OctoSense it honestly says Rinx is required.",
        "tech": "Converted from the 80-point Technical Breakthrough score: contributed splash-app-verify (#192), a scenario-based card-host UI testing tool, to OctoSense-App-Flow; it can inject host failure paths and works for every card app.",
        "social": "For people who hesitate before speaking in group chats; reduces social friction. A high-frequency scenario, though mostly a personal experience.",
        "performance": "Live-tested: reading 4 group messages is instant; the first screening timed out at 150 s, the retry took 84 s; send plus read-back takes 4 s; watching the reaction takes 53 s."
      }
    }
  },
  {
    "n": 166,
    "award": "二等奖",
    "name": {
      "zh": "冰箱管家",
      "en": "Pantry Steward"
    },
    "repo": "https://github.com/woshuoduijiushidui/pantry-steward",
    "shotByJudge": false,
    "live": true,
    "conflict": false,
    "scores": {
      "creativity": 14,
      "completeness": 17,
      "tech": 13,
      "social": 16,
      "performance": 17
    },
    "total": 77,
    "why": {
      "zh": {
        "creativity": "冰箱库存加三餐规划，常见场景里做到「按实际用量扣库存」的闭环。",
        "completeness": "实测：建档、入库、出菜单、接受、扣库存、重启保留全通，存储文件核实。",
        "tech": "技术突破 66 分折算：OctoSense#533/#534 补上 Windows 相机、视觉、录音转写与可信输入，两个 PR 含同一补丁、均未合并。",
        "social": "减少食物浪费、家庭日常刚需，受众广。",
        "performance": "实测（rc.6）：真实模型约 45 秒出三餐菜单，扣减正确，无阻断问题。"
      },
      "en": {
        "creativity": "Fridge inventory plus three-meal planning; in a common scenario it closes the loop by deducting stock based on actual usage.",
        "completeness": "Live-tested: profile setup, stocking, menu generation, acceptance, stock deduction and persistence across restart all pass; storage file verified.",
        "tech": "Converted from the 66-point Technical Breakthrough score: OctoSense#533/#534 add Windows camera, vision, audio transcription and trusted input; both PRs contain the same patch and neither is merged.",
        "social": "Reduces food waste; an everyday household need with a broad audience.",
        "performance": "Live-tested (rc.6): the real model produces a three-meal menu in about 45 s, deductions are correct, no blocking issues."
      }
    }
  },
  {
    "n": 97,
    "award": "二等奖",
    "name": {
      "zh": "OctoBuddy",
      "en": "OctoBuddy"
    },
    "repo": "https://github.com/tyreseluo/OctoBuddy",
    "shotByJudge": true,
    "live": true,
    "conflict": false,
    "scores": {
      "creativity": 17,
      "completeness": 14,
      "tech": 14,
      "social": 12,
      "performance": 17
    },
    "total": 74,
    "why": {
      "zh": {
        "creativity": "外环计划、内环编码 Agent、独立验收闸门，把「Agent 自称通过」和「自己核实」分开。",
        "completeness": "实测：独立 DMG 闭环通过；嵌入 OctoSense 的形态依赖未合并的 #344，未测。",
        "tech": "技术突破 60 分，按评委规则 J1 调整为 68 分后折算：App-Hub#219 关卡错误码与修复建议；OctoSense#344 把原生 Agent 应用编入系统并开放调用接口（草稿）。",
        "social": "面向开发者，受众窄但价值清楚。",
        "performance": "实测：编码 39 秒、15 次调用、0.28 美元；缺 pytest 时拒绝验收。"
      },
      "en": {
        "creativity": "Outer-loop planning, an inner-loop coding Agent and an independent acceptance gate separate \"the Agent claims it passed\" from \"verify it yourself\".",
        "completeness": "Live-tested: the standalone DMG loop passes; the form embedded in OctoSense depends on the unmerged #344 and was not tested.",
        "tech": "Technical Breakthrough score of 60, adjusted to 68 under judges' rule J1 and then converted: App-Hub#219 adds gate error codes and fix suggestions; OctoSense#344 integrates native Agent apps into the system and exposes a call interface (draft).",
        "social": "For developers; a narrow audience but clear value.",
        "performance": "Live-tested: coding took 39 s, 15 calls, US$0.28; it refuses acceptance when pytest is missing."
      }
    }
  },
  {
    "n": 100,
    "award": "三等奖",
    "name": {
      "zh": "晨报卡 Morning Brief",
      "en": "Morning Brief"
    },
    "repo": "https://github.com/jscjscjscjscjsc/morning-brief",
    "shotByJudge": false,
    "live": true,
    "conflict": false,
    "scores": {
      "creativity": 17,
      "completeness": 15,
      "tech": 13,
      "social": 13,
      "performance": 15
    },
    "total": 73,
    "why": {
      "zh": {
        "creativity": "把看新闻做成一份报纸：三位编辑背靠背初审、主编终审，可以拒刊，下一期自动登更正，产品比喻完整。",
        "completeness": "实测 +2：此前只在补丁宿主上验证，这次在官方 rc.6 跑通「提问→取数计划审批→三编辑初审→主编终审→出刊落地」；条数意图没生效，出刊后有一块渲染被宿主保护拦下。",
        "tech": "技术突破 66 分折算；修了 Script VM 分支栈失衡和 octo 在中文 Windows 下的编码问题，5 个 PR 均未合并。",
        "social": "面向每天看科技新闻的读者，限制传闻、更正旧报道，有助信息质量；受众偏科技圈，不算刚需。",
        "performance": "已实测（rc.6）：批准后 43 秒出刊，4 家来源全取到，80 选 10，内容为当天真实新闻并可追溯；一位编辑未答复已如实披露；选的方向（开源技术）没贯彻好。"
      },
      "en": {
        "creativity": "Turns reading the news into a newspaper: three editors review independently, an editor-in-chief makes the final call, stories can be rejected, and corrections run automatically in the next issue. A complete product metaphor.",
        "completeness": "Live-tested +2: previously verified only on a patched host; this time the full flow (question → data-fetch plan approval → three-editor review → editor-in-chief review → issue published) ran on the official rc.6. The item-count intent did not take effect, and one block was stopped by host protection when rendering after publication.",
        "tech": "Converted from the 66-point Technical Breakthrough score; fixed a Script VM branch stack imbalance and an octo encoding issue on Chinese Windows; none of the 5 PRs are merged.",
        "social": "For daily tech-news readers; limits rumors and corrects earlier stories, which helps information quality. The audience leans toward the tech community and it is not an essential need.",
        "performance": "Live-tested (rc.6): issue published 43 s after approval; all 4 sources fetched, 10 picked from 80; content is real, traceable news from that day. One editor not replying was honestly disclosed; the chosen focus (open-source tech) was not followed well."
      }
    }
  },
  {
    "n": 94,
    "award": "三等奖",
    "name": {
      "zh": "Ripple",
      "en": "Ripple"
    },
    "repo": "https://github.com/yuandhsh-lang/ripple",
    "shotByJudge": false,
    "live": true,
    "conflict": false,
    "scores": {
      "creativity": 15,
      "completeness": 18,
      "tech": 7,
      "social": 13,
      "performance": 17
    },
    "total": 70,
    "why": {
      "zh": {
        "creativity": "日程场景里让降雨和外部占用触发改期，Agent 用只读工具出方案，无解时先协商条件，再由用户整组审批。",
        "completeness": "实测 +2：意图→草稿→城市确认→保存读回→冲突识别→AI 改期方案→批准执行→读回核验，整条闭环在官方 rc.6 跑通，历史记录完整。",
        "tech": "未参评技术突破，按 「复现与工程」项 9 折算；有 CI、锁文件和带来源证明的发布流程，但 CI 主要测早期 Web 工程。",
        "social": "帮个人安排户外活动避开下雨和日程冲突，需求实际；限同城同日、最多移动两项，只管应用内计划。",
        "performance": "已实测（rc.6）：草稿 14–20 秒、重新分析约 9 秒，方案落在用户给的 9–11 点窗口内；我直接读存储文件核对与批准方案一致；首次授权需再点一次。"
      },
      "en": {
        "creativity": "In a scheduling scenario, rain and outside commitments trigger rescheduling; the Agent drafts plans with read-only tools, negotiates conditions first when there is no solution, and the user approves the whole set.",
        "completeness": "Live-tested +2: the full loop (intent → draft → city confirmation → save and read back → conflict detection → AI rescheduling plan → approve and execute → read-back verification) ran on the official rc.6, with a complete history.",
        "tech": "Did not enter Technical Breakthrough; converted from reproducibility & engineering score 9. Has CI, lock files and a release pipeline with provenance attestation, but CI mainly tests the early web project.",
        "social": "Helps individuals schedule outdoor activities around rain and calendar conflicts; a practical need. Limited to the same city and day, moves at most two items, and only manages in-app plans.",
        "performance": "Live-tested (rc.6): drafts in 14–20 s, re-analysis in about 9 s, and the plan falls within the user's 9–11 o'clock window; I read the storage file directly and it matched the approved plan; first-time authorization needs a second click."
      }
    }
  },
  {
    "n": 95,
    "award": "三等奖",
    "name": {
      "zh": "礼遇",
      "en": "LIYU Gifting"
    },
    "repo": "https://github.com/chrislearn/liyu-mini",
    "shotByJudge": false,
    "live": true,
    "conflict": false,
    "scores": {
      "creativity": 14,
      "completeness": 14,
      "tech": 15,
      "social": 13,
      "performance": 14
    },
    "total": 70,
    "why": {
      "zh": {
        "creativity": "送礼场景由 AI 挑礼、设礼盒、下单，熟悉场景里串起完整购买链。",
        "completeness": "实测：1.0.46 审阅页稳定报错；1.0.47 修复后演示模式全流程通过；登录模式未测。",
        "tech": "技术突破 76 分折算：OctoSense#459–#465 宿主修复（OAuth 信任、后端传输、日历全天回读、WebView）。",
        "social": "送礼是常见需求，但偏商业场景。",
        "performance": "实测：1.0.47 预览请求 5/5 进入审阅页，冷启动 3 秒；修复晚于冻结，由赛务定。"
      },
      "en": {
        "creativity": "For gift-giving, AI picks the gift, designs the gift box and places the order, linking a complete purchase chain in a familiar scenario.",
        "completeness": "Live-tested: the review page consistently errored on 1.0.46; after the fix in 1.0.47 the full demo-mode flow passes; logged-in mode not tested.",
        "tech": "Converted from the 76-point Technical Breakthrough score: OctoSense#459–#465 host fixes (OAuth trust, backend transport, all-day calendar read-back, WebView).",
        "social": "Gift-giving is a common need, but the scenario is fairly commercial.",
        "performance": "Live-tested: on 1.0.47, 5/5 preview requests reached the review page; cold start 3 s. The fix came after the freeze; organizers will decide."
      }
    }
  },
  {
    "n": 177,
    "name": {
      "zh": "毕业第一站 城市配对",
      "en": "First Stop After Graduation"
    },
    "repo": "https://github.com/SuperLeilei2026/city-matchmaker",
    "shotByJudge": false,
    "live": true,
    "conflict": false,
    "scores": {
      "creativity": 17,
      "completeness": 16,
      "tech": 7,
      "social": 13,
      "performance": 16
    },
    "total": 69,
    "why": {
      "zh": {
        "creativity": "把毕业择城做成三幕配对，Agent只找一个能改变决定的关键问题，用户确认才保存，交互比喻和角色都少见。",
        "completeness": "实测 +2：五步流程完整，预算和气候红线判定诚实；系统 Agent 决胜提问经确认后写入，存储文件核实；确认后提示语没更新。",
        "tech": "无上游贡献，按「复现与工程」项9/10折算；有GitHub发布流程、9个测试文件和原生smoke脚本。",
        "social": "面向每年人数众多的应届毕业生，择城影响大，但一人只用几次，属低频决策；城市数据只有8个。",
        "performance": "已实测（rc.6）：Agent 约 31 秒给出切中用户红线的关键问题；首次授权时如实回退本地规则，需再点一次；全程无报错。"
      },
      "en": {
        "creativity": "Turns choosing a city after graduation into a three-act match; the Agent looks for just one key question that could change the decision and saves only after user confirmation. Both the interaction metaphor and the role are uncommon.",
        "completeness": "Live-tested +2: the five-step flow is complete and budget and climate red-line judgments are honest; the system Agent's deciding question is written after confirmation, storage file verified; the prompt text does not update after confirmation.",
        "tech": "No upstream contributions; converted from reproducibility & engineering score 9/10. Has a GitHub release pipeline, 9 test files and a native smoke script.",
        "social": "For the large number of new graduates each year; choosing a city matters a lot, but each person uses it only a few times, so it is a low-frequency decision; city data covers only 8 cities.",
        "performance": "Live-tested (rc.6): the Agent produces a key question that hits the user's red line in about 31 s; on first authorization it honestly falls back to local rules and needs a second click; no errors throughout."
      }
    }
  },
  {
    "n": 103,
    "name": {
      "zh": "AgentMail",
      "en": "AgentMail"
    },
    "repo": "https://github.com/Jasonsu22/AgentMail",
    "shotByJudge": false,
    "live": true,
    "conflict": false,
    "scores": {
      "creativity": 12,
      "completeness": 14,
      "tech": 13,
      "social": 16,
      "performance": 14
    },
    "total": 69,
    "why": {
      "zh": {
        "creativity": "常见的邮件助手，加了发送前比对草稿与原文引文、识别钓鱼、写系统日历，Agent 用 ReAct 串起多步工具。",
        "completeness": "实测 +1：官方 rc.6 上总结、待办入库、AI 写信、发送前检查、宿主发信审阅全链可走；助手把「周六七点」判成没有日程，没生成日历候选。",
        "tech": "技术突破 66 分折算；修复 macOS 上 device_calendar 授权从不弹窗的宿主缺陷，PR #499 未合并。",
        "social": "面向大量邮件用户，Agent 当邮件秘书，提取日程待办、提示钓鱼；需求高频，还涉及账户安全。",
        "performance": "已实测（rc.6）：AI 总结数秒、写信约 8 秒、检查约 13 秒，待办持久化可回原邮件；助手对话一次回复要 100–170 秒，偏慢；日历未触发。"
      },
      "en": {
        "creativity": "A common email assistant, plus pre-send comparison of the draft against quotes from the original, phishing detection and writing to the system calendar; the Agent chains multi-step tools with ReAct.",
        "completeness": "Live-tested +1: on the official rc.6 the full chain works (summary, saving to-dos, AI drafting, pre-send check, host send review); the assistant judged \"Saturday at seven\" as not an event and produced no calendar candidate.",
        "tech": "Converted from the 66-point Technical Breakthrough score; fixed a host defect where device_calendar authorization never prompted on macOS; PR #499 not merged.",
        "social": "For the many email users; the Agent acts as an email secretary, extracting events and to-dos and flagging phishing. A high-frequency need that also touches account security.",
        "performance": "Live-tested (rc.6): AI summary in seconds, drafting about 8 s, checking about 13 s; to-dos persist and link back to the original email; each assistant chat reply takes 100–170 s, which is slow; calendar not triggered."
      }
    }
  },
  {
    "n": 76,
    "name": {
      "zh": "拾意",
      "en": "Shiyi Pickup"
    },
    "repo": "https://github.com/sansanyixyz331/shiyi",
    "shotByJudge": false,
    "live": true,
    "conflict": false,
    "scores": {
      "creativity": 15,
      "completeness": 11,
      "tech": 16,
      "social": 14,
      "performance": 12
    },
    "total": 68,
    "why": {
      "zh": {
        "creativity": "从群聊里拾取约定，Agent 造卡、确认后回执到群，角色清楚。",
        "completeness": "实测：官方 Rinx 闭环通过，但宿主不授予 model.complete，AI 理解只能降级为本机规则。",
        "tech": "技术突破 80 分折算：App Hub 三个已合并修复（Windows 路径与摘要、stamp、card-host 拒绝原因），加经四轮评审的 L0 契约检查器。",
        "social": "群聊约定容易漏，需求真实。",
        "performance": "实测：读群→造卡→确认→回执发出并服务端核实；AI 部分在官方宿主不可用。"
      },
      "en": {
        "creativity": "Picks up plans made in group chats; the Agent creates a card and, after confirmation, posts a receipt back to the group. Clear roles.",
        "completeness": "Live-tested: the loop passes on official Rinx, but the host does not grant model.complete, so AI understanding can only degrade to local rules.",
        "tech": "Converted from the 80-point Technical Breakthrough score: three merged App Hub fixes (Windows paths and digests, stamp, card-host rejection reasons), plus an L0 contract checker that went through four rounds of review.",
        "social": "Plans made in group chats are easy to miss; a real need.",
        "performance": "Live-tested: read group → create card → confirm → receipt sent and verified on the server; the AI part is unavailable on the official host."
      }
    }
  },
  {
    "n": 98,
    "name": {
      "zh": "牵线",
      "en": "Qianxian"
    },
    "repo": "https://github.com/kkkkikun/qianxian-guardian",
    "shotByJudge": false,
    "live": true,
    "conflict": false,
    "scores": {
      "creativity": 15,
      "completeness": 12,
      "tech": 14,
      "social": 13,
      "performance": 12
    },
    "total": 66,
    "why": {
      "zh": {
        "creativity": "群里约饭约活动，Agent 抽取时间地点人员和 AA，拍板后写入守护。",
        "completeness": "实测：提案、拍板、写入守护通过，存储核实；首次授权不等待、回复漏出原始协议文本。",
        "tech": "技术突破 72 分折算：makepad#125 修复 isolate 任务队列不排空导致回调不投递，另有 App-Hub#230、Rinx#91。",
        "social": "多人约定协调是常见需求。",
        "performance": "实测（rc.6）：真实模型约 16 秒给出提案，抽取正确。"
      },
      "en": {
        "creativity": "For arranging meals and activities in a group, the Agent extracts time, place, people and bill-splitting, then writes to a watcher once the decision is made.",
        "completeness": "Live-tested: proposal, decision and writing the watcher pass, storage verified; first-time authorization does not wait, and the reply leaks raw protocol text.",
        "tech": "Converted from the 72-point Technical Breakthrough score: makepad#125 fixes undelivered callbacks caused by the isolate task queue not draining; also App-Hub#230 and Rinx#91.",
        "social": "Coordinating plans among several people is a common need.",
        "performance": "Live-tested (rc.6): the real model gives a proposal in about 16 s, with correct extraction."
      }
    }
  },
  {
    "n": 106,
    "name": {
      "zh": "知信 zhixin-mail",
      "en": "Zhixin Mail"
    },
    "repo": "https://github.com/2892480843/zhixin-mail",
    "shotByJudge": false,
    "live": true,
    "conflict": false,
    "scores": {
      "creativity": 14,
      "completeness": 15,
      "tech": 5,
      "social": 15,
      "performance": 14
    },
    "total": 63,
    "why": {
      "zh": {
        "creativity": "邮件里的事项变更做成新旧对比卡，引用逐字核对原文，后续来信合并到同一张卡，经宿主审阅回复",
        "completeness": "实测 +1：分类、待办、提案（注明已核对原文）、回复草稿、宿主审阅都通；取消审阅后草稿与提案保留；抽取漏了「Saturday」。",
        "tech": "技术突破 27 分：只有一个开放未合并的邮件文档示例 PR，与自身发信路径关系间接",
        "social": "上班族处理来信里的改期、订单、通知是高频需求，Agent 帮人抽取变化并起草回复",
        "performance": "已实测（rc.6）：首次同步加模型识别 3 封约 44 秒，分类全对；宿主审阅与取消路径正确；真实发送需物理点击未代点。"
      },
      "en": {
        "creativity": "Turns changes mentioned in email into old-vs-new comparison cards, checks quotes word for word against the original, merges follow-up emails into the same card, and replies through host review.",
        "completeness": "Live-tested +1: classification, to-dos, proposals (marked as checked against the original), reply drafts and host review all work; drafts and proposals are kept after cancelling review; extraction missed \"Saturday\".",
        "tech": "Technical Breakthrough score of 27: only one open, unmerged email documentation example PR, only indirectly related to its own sending path.",
        "social": "Handling reschedules, orders and notices in incoming mail is a high-frequency need for office workers; the Agent extracts changes and drafts replies.",
        "performance": "Live-tested (rc.6): first sync plus model recognition of 3 emails took about 44 s, all classified correctly; host review and cancel paths are correct; real sending requires a physical click, which was not done on the user's behalf."
      }
    }
  },
  {
    "n": 71,
    "name": {
      "zh": "TraceShop 采购助手",
      "en": "TraceShop Purchasing Assistant"
    },
    "repo": "https://github.com/prettygirlisnotme/TraceShop",
    "shotByJudge": false,
    "live": true,
    "conflict": false,
    "scores": {
      "creativity": 14,
      "completeness": 16,
      "tech": 6,
      "social": 13,
      "performance": 13
    },
    "total": 62,
    "why": {
      "zh": {
        "creativity": "采购场景里让 Agent 在预算不足时提出取舍，改预算和存草稿各需宿主批准，条件一变旧提案即作废。",
        "completeness": "实测维持：官方 rc.6 上研究→宿主工具审批→保存草稿→独立读回核验整条通过，存储文件核实；但 60 秒回调超时后要手动「同步回复」，预算调整工具这次没触发。",
        "tech": "未参评技术突破，按 「复现与工程」项 8 折算；有官方发布流程和摘要清单，但没有针对 main.splash 的测试。",
        "social": "帮普通消费者在预算内选购，Agent 当采购助理；但只产出本地草稿，商品是 14 条合成数据加 3 条快照。",
        "performance": "已实测（rc.6）：一次宿主模型通道报流式请求失败，如实显示；成功那次研究约 1 分钟，超时后 Agent 仍在后台继续，宿主弹出 draft.save 审批，批准后读回一致；最终回复对证据和取舍交代得很严谨。"
      },
      "en": {
        "creativity": "In a purchasing scenario, the Agent proposes trade-offs when the budget is short; changing the budget and saving drafts each need host approval, and old proposals are invalidated once conditions change.",
        "completeness": "Live-tested, score unchanged: on the official rc.6 the whole chain (research → host tool approval → save draft → independent read-back verification) passes, storage file verified; but after the 60 s callback timeout a manual \"sync reply\" is needed, and the budget-adjustment tool was not triggered this time.",
        "tech": "Did not enter Technical Breakthrough; converted from reproducibility & engineering score 8. Has an official release pipeline and digest manifest, but no tests for main.splash.",
        "social": "Helps ordinary consumers shop within budget, with the Agent as a purchasing assistant; but it only produces local drafts, and the products are 14 synthetic items plus 3 snapshots.",
        "performance": "Live-tested (rc.6): once the host model channel reported a streaming request failure, which was shown honestly; in the successful run research took about 1 minute, the Agent kept working in the background after the timeout, the host showed a draft.save approval, and the read-back matched after approval; the final reply explained evidence and trade-offs rigorously."
      }
    }
  },
  {
    "n": 117,
    "name": {
      "zh": "OctoDining 好好吃饭",
      "en": "OctoDining"
    },
    "repo": "https://github.com/windy664/OctoDining",
    "shotByJudge": false,
    "live": true,
    "conflict": false,
    "scores": {
      "creativity": 13,
      "completeness": 15,
      "tech": 6,
      "social": 16,
      "performance": 12
    },
    "total": 62,
    "why": {
      "zh": {
        "creativity": "Agent在真实菜单候选里按“清淡、省钱”调整一周餐表，用逐条diff卡呈现，场景熟悉，提议加确认的方式清楚。",
        "completeness": "实测 −1：设置、规则草案、Agent 提案、应用、确认、读回都通；但界面把 Agent 的理由截成「理由过长，已省略」，用户的周四聚餐要求看起来像被无视了。",
        "tech": "无上游贡献，按「复现与工程」项8/10折算；签名tag、Cargo.lock、10个测试脚本，未走GitHub发布流程。",
        "social": "帮上班族解决每天吃什么、控制餐费，大众高频；但菜单是单一商家的历史快照，长期使用受限。",
        "performance": "已实测（rc.6）：第二次 60 秒超时，应用拿不回结果，残留的回合又占了约 2.5 分钟，期间重试被拒；第三次 53 秒出提案，只改 1 餐；保存后读回与存储一致。"
      },
      "en": {
        "creativity": "The Agent adjusts a weekly meal plan for \"light and cheap\" from real menu candidates and presents it as line-by-line diff cards. A familiar scenario with a clear propose-then-confirm approach.",
        "completeness": "Live-tested −1: settings, rule draft, Agent proposal, apply, confirm and read-back all work; but the UI truncates the Agent's reasoning to \"reason too long, omitted\", so the user's Thursday dinner request looks ignored.",
        "tech": "No upstream contributions; converted from reproducibility & engineering score 8/10. Signed tags, Cargo.lock, 10 test scripts; does not use the GitHub release pipeline.",
        "social": "Helps office workers decide what to eat each day and control meal costs; broad and high-frequency. But the menu is a historical snapshot from a single merchant, which limits long-term use.",
        "performance": "Live-tested (rc.6): the second run timed out at 60 s and the app could not get the result back; the leftover turn occupied about 2.5 more minutes, during which retries were rejected; the third run produced a proposal in 53 s that changed only 1 meal; read-back after saving matched storage."
      }
    }
  },
  {
    "n": 110,
    "name": {
      "zh": "补位 BuWei",
      "en": "BuWei"
    },
    "repo": "https://github.com/WeiR-h/buwei",
    "shotByJudge": false,
    "live": false,
    "conflict": false,
    "scores": {
      "creativity": 17,
      "completeness": 14,
      "tech": 8,
      "social": 13,
      "performance": 10
    },
    "total": 62,
    "why": {
      "zh": {
        "creativity": "帮社群组织者处理报名候补，Agent 按授权规则自动邀请递补并核验回复，切入点少见",
        "completeness": "B21/D11：活动到补位全流程完整，失败场景覆盖全；演示是验收构建截图序列，验证结果未入库",
        "tech": "技术突破 39 分：两个上游 PR 均为草稿、无 CI 无评审；回执库和 WARP 回退未提交上游",
        "social": "羽毛球、桌游、读书会等小型活动的组织者受益，解决临时缺人，但仅限 Windows",
        "performance": "未实测：原生扩展，Windows CI 构建和启动 success；依赖补丁 Rinx，运行记录只有作者自述"
      },
      "en": {
        "creativity": "Helps community organizers handle sign-up waitlists; the Agent automatically invites replacements under authorized rules and verifies replies. An uncommon angle.",
        "completeness": "B21/D11: the flow from event to filling a spot is complete, with full coverage of failure scenarios; the demo is a screenshot sequence of the acceptance build, and verification results are not in the repo.",
        "tech": "Technical Breakthrough score of 39: both upstream PRs are drafts with no CI and no review; the receipt library and WARP fallback were not submitted upstream.",
        "social": "Benefits organizers of small events such as badminton, board games and book clubs by filling last-minute gaps, but Windows only.",
        "performance": "Not live-tested: native extension; Windows CI build and launch succeed; depends on a patched Rinx, and the only run records are the author's own account."
      }
    }
  },
  {
    "n": 74,
    "name": {
      "zh": "无提醒 Agent",
      "en": "No-Reminder Agent"
    },
    "repo": "https://github.com/nineanswerer/octo",
    "shotByJudge": false,
    "live": true,
    "conflict": false,
    "scores": {
      "creativity": 15,
      "completeness": 14,
      "tech": 7,
      "social": 14,
      "performance": 11
    },
    "total": 61,
    "why": {
      "zh": {
        "creativity": "不让用户设提醒，而是让 Agent 读收件箱找出本人承诺，自动建、改、撤事项，每项附原文证据。",
        "completeness": "实测后维持：官方 rc.6 上连接、授权、观察流程完整，超时如实停机；但正向抽取（建/改/撤事项）没能实测，来源标签地址重复显示。",
        "tech": "未参评技术突破，按 「复现与工程」项 9 折算；有官方发布流程和受控测试工件，缺可一键运行的测试。",
        "social": "面向靠邮件接任务的上班族和学生，防止漏掉答应过的事和期限；目前只看单邮箱最近 5 封。",
        "performance": "已实测（rc.6）：每轮 AI 判断约 6 秒，对演示邮件判「无需记录」正确；有一轮超过 100 秒超时并停用观察，处理如实；正向抽取未验证。"
      },
      "en": {
        "creativity": "Instead of having users set reminders, the Agent reads the inbox to find the user's own commitments and automatically creates, updates and cancels items, each with evidence from the original text.",
        "completeness": "Score unchanged after live testing: on the official rc.6 the connect, authorize and watch flows are complete and it stops honestly on timeout; but positive extraction (creating/updating/cancelling items) could not be live-tested, and source-label addresses are shown twice.",
        "tech": "Did not enter Technical Breakthrough; converted from reproducibility & engineering score 9. Has an official release pipeline and controlled test artifacts, but no one-click runnable tests.",
        "social": "For office workers and students who get tasks by email; prevents missing promises and deadlines. Currently looks only at the latest 5 emails in a single mailbox.",
        "performance": "Live-tested (rc.6): each AI judgment round takes about 6 s and correctly judged the demo emails as \"nothing to record\"; one round exceeded 100 s, timed out and disabled watching, handled honestly; positive extraction not verified."
      }
    }
  },
  {
    "n": 84,
    "name": {
      "zh": "VibeMail",
      "en": "VibeMail"
    },
    "repo": "https://github.com/yzbtdiy/VibeMail",
    "shotByJudge": false,
    "live": true,
    "conflict": false,
    "scores": {
      "creativity": 15,
      "completeness": 14,
      "tech": 7,
      "social": 11,
      "performance": 13
    },
    "total": 60,
    "why": {
      "zh": {
        "creativity": "给收件箱加情绪层，用 vibe 光环、星轨和语气滑杆处理邮件，交互比喻少见；Agent 只做分类和改写。",
        "completeness": "实测 +1：官方 rc.6（macOS）上连接邮箱、模型播报、三行摘要、语气改写、宿主发信审阅、取消可重发都通；改写稿反问信里已写明的时间地点。",
        "tech": "未参评技术突破，按 「复现与工程」项 9 折算；有官方发布流程、26 个状态机测试和 digest 复算脚本。",
        "social": "面向邮件多的个人用户，改善处理邮件的心情和回信语气；偏体验，归档不持久，实用面有限。",
        "performance": "已实测（rc.6）：摘要约 3 秒、改写约 6 秒，发送走宿主审阅、取消状态正确；草稿箱与「模拟发送失败」未测。"
      },
      "en": {
        "creativity": "Adds an emotional layer to the inbox, handling mail with vibe halos, star trails and a tone slider; an uncommon interaction metaphor. The Agent only classifies and rewrites.",
        "completeness": "Live-tested +1: on the official rc.6 (macOS), connecting the mailbox, model announcements, three-line summaries, tone rewriting, host send review and resending after cancel all work; a rewritten draft asked about the time and place already stated in the email.",
        "tech": "Did not enter Technical Breakthrough; converted from reproducibility & engineering score 9. Has an official release pipeline, 26 state-machine tests and a digest recomputation script.",
        "social": "For individuals with lots of email; improves mood when handling mail and the tone of replies. Experience-oriented, archiving does not persist, and practical scope is limited.",
        "performance": "Live-tested (rc.6): summary about 3 s, rewrite about 6 s; sending goes through host review and the cancel state is correct; drafts folder and \"simulate send failure\" not tested."
      }
    }
  },
  {
    "n": 114,
    "name": {
      "zh": "CFAW News",
      "en": "CFAW News"
    },
    "repo": "https://github.com/zhiguang127/cfaw-news-agent",
    "shotByJudge": false,
    "live": false,
    "conflict": false,
    "scores": {
      "creativity": 15,
      "completeness": 14,
      "tech": 6,
      "social": 14,
      "performance": 10
    },
    "total": 59,
    "why": {
      "zh": {
        "creativity": "新闻Agent只回答“这条消息是否该改变我的下一步”，把新闻与个人目标绑定，给出带原句证据的建议。",
        "completeness": "B 16/25：超时、中断、降级处理齐全，但依赖多处补丁的专用Rinx；D 15/20，视频无失败状态。",
        "tech": "无上游贡献，按「复现与工程」项8/10折算；有publisher-github-v1发布流程和组装脚本，仓库内测试较少。",
        "social": "面向有学习、工作目标的新闻读者，Agent判断新闻与其下一步的关系并排进日程，属较大人群的实用需求。",
        "performance": "未实测：发布包publisher-verify与hub check均通过；但运行要求打补丁的专用Rinx宿主，官方Rinx能否跑通待复核。"
      },
      "en": {
        "creativity": "The news Agent only answers \"should this story change my next step\", tying news to personal goals and giving advice backed by quoted evidence.",
        "completeness": "B 16/25: timeouts, interruptions and degradation are all handled, but it depends on a dedicated Rinx with several patches; D 15/20, the video shows no failure states.",
        "tech": "No upstream contributions; converted from reproducibility & engineering score 8/10. Has a publisher-github-v1 release pipeline and assembly scripts; few tests in the repo.",
        "social": "For news readers with study or work goals; the Agent judges how news relates to their next step and schedules it. A practical need for a fairly large group.",
        "performance": "Not live-tested: the release pack passes publisher-verify and hub check; but it requires a patched, dedicated Rinx host, and whether it runs on official Rinx is to be re-checked."
      }
    }
  },
  {
    "n": 104,
    "name": {
      "zh": "兜兜 doudou",
      "en": "Doudou"
    },
    "repo": "https://github.com/jessicaruan6688-byte/doudou-gosim",
    "shotByJudge": false,
    "live": false,
    "conflict": false,
    "scores": {
      "creativity": 13,
      "completeness": 12,
      "tech": 5,
      "social": 14,
      "performance": 11
    },
    "total": 55,
    "why": {
      "zh": {
        "creativity": "家庭遇到休息、买车等大事时推演存款能撑几个月，Agent 只把一句话转成事件草稿，数字由引擎算，角度清楚",
        "completeness": "B16/D12：首装建档已修好，降级覆盖全；模型成功路径未在宿主跑通，视频停在 v0.3.0",
        "tech": "无上游贡献，按 「复现与工程」项 6 分：126 个测试测的是 JS 镜像而非 main.splash，无 tag",
        "social": "面向普通家庭的重大财务决策，帮人看清安全底线，需求重要但不是天天用",
        "performance": "未实测：hub check PASSED，宿主有 model.complete；只验证了无服务降级，真实模型成功路径无证据"
      },
      "en": {
        "creativity": "When a family faces big events such as taking time off or buying a car, it projects how many months savings will last; the Agent only turns one sentence into an event draft and the engine does the math. A clear angle.",
        "completeness": "B16/D12: first-install profile setup is fixed and degradation is fully covered; the model success path has not run in the host, and the video stops at v0.3.0.",
        "tech": "No upstream contributions; reproducibility & engineering score 6: the 126 tests cover a JS mirror rather than main.splash; no tag.",
        "social": "For ordinary families making major financial decisions; helps people see their safety floor. An important need but not daily use.",
        "performance": "Not live-tested: hub check PASSED and the host has model.complete; only the no-service degradation was verified, with no evidence of the real model success path."
      }
    }
  },
  {
    "n": 109,
    "name": {
      "zh": "行程天气",
      "en": "Trip Weather"
    },
    "repo": "https://github.com/ZhangHanDong/weather-app",
    "shotByJudge": false,
    "live": false,
    "conflict": true,
    "scores": {
      "creativity": 12,
      "completeness": 12,
      "tech": 6,
      "social": 12,
      "performance": 12
    },
    "total": 54,
    "why": {
      "zh": {
        "creativity": "一句话描述行程，Agent 解析并出改期、室内等方案，执行后重新取数核验，场景常见（利益相关）",
        "completeness": "B20/D8：失败状态覆盖全、数据真实；无演示视频，未交复赛材料，验证锚点未更新",
        "tech": "无上游贡献，按 「复现与工程」项 7 分：GitHub 发布流程可复验，但回归脚本不在仓库里",
        "social": "出行前看天气调整计划的人很多，但属于低频使用，结果只写进本地行程簿",
        "performance": "未实测：GitHub 发布包验证 PASSED，宿主有 octos 服务；守护和核验取数无超时，rc.6 未重装验证"
      },
      "en": {
        "creativity": "Describe a trip in one sentence; the Agent parses it and offers options such as rescheduling or moving indoors, then re-fetches data to verify after execution. A common scenario (conflict of interest).",
        "completeness": "B20/D8: failure states fully covered and data is real; no demo video, award-round materials not submitted, and verification anchors not updated.",
        "tech": "No upstream contributions; reproducibility & engineering score 7: the GitHub release pipeline is reproducible, but the regression script is not in the repo.",
        "social": "Many people check the weather and adjust plans before a trip, but usage is low-frequency, and results are only written to a local itinerary book.",
        "performance": "Not live-tested: GitHub release pack verification PASSED and the host has the octos service; the watcher and verification fetches have no timeouts; not reinstalled and verified on rc.6."
      }
    }
  },
  {
    "n": 89,
    "name": {
      "zh": "听见 TrendyHear",
      "en": "TrendyHear"
    },
    "repo": "https://github.com/Leah698/TrendyHear",
    "shotByJudge": false,
    "live": false,
    "conflict": false,
    "scores": {
      "creativity": 13,
      "completeness": 13,
      "tech": 6,
      "social": 12,
      "performance": 8
    },
    "total": 52,
    "why": {
      "zh": {
        "creativity": "把新闻简报延伸到发现比赛和活动机会，Agent 当顾问，用官方页面逐字核验报名信息后再加入日历。",
        "completeness": "B 17：关卡全过，但正常运行截图待补、VALIDATION 未完成；D 12：视频里主链被拒、简报未加载完。",
        "tech": "未参评技术突破，按 「复现与工程」项 8 折算；有官方发布流程和自检脚本，但文档有过期和矛盾描述。",
        "social": "帮学生和年轻人跟踪关注领域、找可参加的机会；受众偏窄，定时任务只在应用打开时运行。",
        "performance": "未实测：发布包关卡 PASSED，视频在 OctoSense 上真实运行；但 goal_propose 被拒、机会走回退，简报和分析到结尾仍在加载。"
      },
      "en": {
        "creativity": "Extends news briefings to discovering competitions and event opportunities; the Agent acts as an advisor and checks sign-up details word for word against official pages before adding them to the calendar.",
        "completeness": "B 17: all gates pass, but normal-run screenshots are still missing and VALIDATION is incomplete; D 12: in the video the main chain is rejected and the briefing never finishes loading.",
        "tech": "Did not enter Technical Breakthrough; converted from reproducibility & engineering score 8. Has an official release pipeline and self-check script, but the docs contain outdated and contradictory descriptions.",
        "social": "Helps students and young people follow their fields and find opportunities to join; a fairly narrow audience, and scheduled tasks run only while the app is open.",
        "performance": "Not live-tested: release-pack gate PASSED, and the video shows it actually running on OctoSense; but goal_propose is rejected, opportunities go through the fallback, and the briefing and analysis are still loading at the end."
      }
    }
  },
  {
    "n": 116,
    "name": {
      "zh": "Navigation 出行目标守护",
      "en": "Navigation Trip Goal Guardian"
    },
    "repo": "https://github.com/xiaoland/gosim-agentic26",
    "shotByJudge": false,
    "live": false,
    "conflict": false,
    "scores": {
      "creativity": 17,
      "completeness": 10,
      "tech": 6,
      "social": 15,
      "performance": 4
    },
    "total": 52,
    "why": {
      "zh": {
        "creativity": "Agent当出行目标守护者：确认目标后按当前时刻重核行程，班次错过时给替代方案并等用户确认，角色设计新。",
        "completeness": "B 7/25：核心依赖官方宿主没有的model.chat和notes工具；D 15/20，视频含失效重核，但录的是0.16.1。",
        "tech": "无上游贡献，按「复现与工程」项7/10折算；工具链锁定、任务包齐全，但复现需构建补丁宿主。",
        "social": "面向赶车、跨城出行的普通人，Agent综合公交、铁路、打车查询并守住期限和预算；但需开发者手工放API key。",
        "performance": "未实测：hub check因notes.search被拒；核心走model.chat，官方宿主只有model.complete，跑不通。"
      },
      "en": {
        "creativity": "The Agent acts as a guardian of travel goals: after the goal is confirmed it re-checks the itinerary against the current time, and when a departure is missed it offers alternatives and waits for user confirmation. A new role design.",
        "completeness": "B 7/25: the core depends on model.chat and notes tools that the official host does not have; D 15/20, the video includes re-checking after a failure, but was recorded on 0.16.1.",
        "tech": "No upstream contributions; converted from reproducibility & engineering score 7/10. Toolchain pinned and task pack complete, but reproducing it requires building a patched host.",
        "social": "For ordinary people catching trains or traveling between cities; the Agent combines transit, rail and ride-hailing queries and guards deadlines and budget; but a developer has to add API keys by hand.",
        "performance": "Not live-tested: hub check rejected it because of notes.search; the core uses model.chat, while the official host only has model.complete, so it cannot run."
      }
    }
  },
  {
    "n": 113,
    "name": {
      "zh": "DailyFlow",
      "en": "DailyFlow"
    },
    "repo": "https://github.com/KumaYuriPool/DailyFlow",
    "shotByJudge": false,
    "live": false,
    "conflict": false,
    "scores": {
      "creativity": 15,
      "completeness": 7,
      "tech": 14,
      "social": 13,
      "performance": 3
    },
    "total": 52,
    "why": {
      "zh": {
        "creativity": "把账本、日历、笔记里散落的记录按问题串成经过，Agent受系统助手委派做跨App整理并逐字引用核验，切入点较新。",
        "completeness": "B 6/25：官方宿主拒装，声称的Ledger包不在仓库，清单版本0.1.1与声明0.2.0不符；D 10/20。",
        "tech": "技术突破 67 分，评委另加 1 分（共 68 分）折算：冷启动竞态、turn.start 超时两个宿主修复获 Approve；#529 的超时缺陷在复赛实测中被 #71、#117 独立印证；跨 App 读取 PR 被要求修改，均未合并。",
        "social": "面向想回看生活经过的普通用户，记账、日程、经期都是日常记录，但找回属低频需求，且当前包装不上。",
        "performance": "未实测：hub check报需cross-app-read-v1被拒，任何官方宿主都装不上；作者自述需本地修补运行时。"
      },
      "en": {
        "creativity": "Links records scattered across ledger, calendar and notes into a story around a question; the Agent, delegated by the system assistant, organizes across apps and verifies quotes word for word. A fairly new angle.",
        "completeness": "B 6/25: the official host refuses to install it, the claimed Ledger package is not in the repo, and manifest version 0.1.1 does not match the declared 0.2.0; D 10/20.",
        "tech": "Converted from the 67-point Technical Breakthrough score plus 1 point added by the judges (68 total): two host fixes (cold-start race, turn.start timeout) received Approve; the timeout defect in #529 was independently confirmed by #71 and #117 in award-round live testing; the cross-app read PR received change requests; none are merged.",
        "social": "For ordinary users who want to look back on their lives; bookkeeping, schedules and periods are everyday records, but retrieval is a low-frequency need, and the current package cannot be installed.",
        "performance": "Not live-tested: hub check reports it requires cross-app-read-v1 and rejects it, so no official host can install it; the author says it needs a locally patched runtime."
      }
    }
  },
  {
    "n": 105,
    "name": {
      "zh": "学习观看清单",
      "en": "Study Watchlist"
    },
    "repo": "https://github.com/scbz4learning/study-watchlist",
    "shotByJudge": false,
    "live": false,
    "conflict": false,
    "scores": {
      "creativity": 12,
      "completeness": 12,
      "tech": 4,
      "social": 12,
      "performance": 11
    },
    "total": 51,
    "why": {
      "zh": {
        "creativity": "把 B 站学习视频按分P切片装进时间预算，选片排序全靠规则，模型只起标题写理由",
        "completeness": "B17/D11：真实数据源链路完整无假数据；网络失败显示成空结果，视频是抓帧且无模型成功画面",
        "tech": "无上游贡献，按 「复现与工程」项 5 分：无 tag、无测试，发布工作流装了没跑",
        "social": "服务用 B 站自学的人控制学习时长，人群较窄，只支持单一视频源",
        "performance": "未实测：hub check PASSED，检索链路在 card-host 跑通；模型成功路径无宿主内证据，网络错误被当成空结果"
      },
      "en": {
        "creativity": "Fits Bilibili study videos, split by part, into a time budget; selection and ordering are entirely rule-based, and the model only writes titles and reasons.",
        "completeness": "B17/D11: the real data-source chain is complete with no fake data; network failures show as empty results, and the video is frame captures with no model success shown.",
        "tech": "No upstream contributions; reproducibility & engineering score 5: no tag, no tests, and the release workflow is installed but never run.",
        "social": "Serves people self-studying on Bilibili who want to control study time; a fairly narrow group, and only a single video source is supported.",
        "performance": "Not live-tested: hub check PASSED and the search chain runs in card-host; no in-host evidence of the model success path, and network errors are treated as empty results."
      }
    }
  },
  {
    "n": 90,
    "name": {
      "zh": "Loom 目标日历",
      "en": "Loom Goal Calendar"
    },
    "repo": "https://github.com/dyingforge/loom",
    "shotByJudge": false,
    "live": true,
    "conflict": false,
    "scores": {
      "creativity": 11,
      "completeness": 13,
      "tech": 7,
      "social": 13,
      "performance": 6
    },
    "total": 50,
    "why": {
      "zh": {
        "creativity": "目标拆解后排进月历是常见做法；新意在用确定性约束 C1–C7 校验模型计划，不过关就退回修正。",
        "completeness": "部分实测 −1（初赛后未更新，中途停测）：追问面板在默认窗口被裁到可视区外，需最大化才能回答。",
        "tech": "未参评技术突破，按 「复现与工程」项 9 折算；依赖锁定、约束向量自检和官方发布流程都齐全。",
        "social": "帮学生和职场人把有截止日期的目标拆成每日安排，需求普遍；但只写应用内日历，不进系统日历。",
        "performance": "部分实测（rc.6）：37 秒后追问，连续追问两次；第二次回答后超过 200 秒仍在「正在调整」，没拿到候选计划。"
      },
      "en": {
        "creativity": "Breaking goals down and placing them on a monthly calendar is common; the novelty is checking the model's plan with deterministic constraints C1–C7 and sending it back for correction if it fails.",
        "completeness": "Partially live-tested −1 (not updated since the qualifying round; testing stopped midway): the follow-up question panel is clipped out of view in the default window and can only be answered after maximizing.",
        "tech": "Did not enter Technical Breakthrough; converted from reproducibility & engineering score 9. Dependency locking, constraint-vector self-checks and the official release pipeline are all in place.",
        "social": "Helps students and professionals break deadline-bound goals into daily plans; a widespread need, but it only writes to the in-app calendar, not the system calendar.",
        "performance": "Partially live-tested (rc.6): follow-up question after 37 s, two follow-ups in a row; after the second answer it was still \"adjusting\" after more than 200 s, and no candidate plan was obtained."
      }
    }
  },
  {
    "n": 101,
    "name": {
      "zh": "情境 DJ",
      "en": "Context DJ"
    },
    "repo": "https://github.com/peterdlick-stack/agentic-app",
    "shotByJudge": false,
    "live": false,
    "conflict": false,
    "scores": {
      "creativity": 13,
      "completeness": 13,
      "tech": 5,
      "social": 10,
      "performance": 7
    },
    "total": 48,
    "why": {
      "zh": {
        "creativity": "情境歌单较常见，新角度是用定位、天气和时段先猜活动、请用户确认，再逐首说明选歌理由。",
        "completeness": "B 17：AI 与规则双通道、失败回退完整，但声明平台上「去听」不可用；D 12：未交复赛材料，视频无失败状态。",
        "tech": "未参评技术突破，按 「复现与工程」项 6 折算；仓库内没有测试或自检脚本，v0.3.4 也未走官方发布流程。",
        "social": "帮听歌的人按当下活动找合适的歌，属娱乐需求；曲库只有 46 首内置歌，长期使用价值有限。",
        "performance": "未实测：v0.3.4 仅源码 --allow-unsigned 检查通过；只在 Linux 桌面和 card-host 跑过，定位靠模拟，「去听」在 Linux 不可用。"
      },
      "en": {
        "creativity": "Context-based playlists are fairly common; the new angle is guessing the activity from location, weather and time of day, asking the user to confirm, then explaining the choice of each song.",
        "completeness": "B 17: AI and rule dual channels with complete failure fallback, but \"Listen\" is unavailable on the declared platform; D 12: award-round materials not submitted, and the video shows no failure states.",
        "tech": "Did not enter Technical Breakthrough; converted from reproducibility & engineering score 6. No tests or self-check scripts in the repo, and v0.3.4 did not go through the official release pipeline.",
        "social": "Helps listeners find songs that fit their current activity; an entertainment need. The library has only 46 built-in songs, which limits long-term value.",
        "performance": "Not live-tested: v0.3.4 passed only a source --allow-unsigned check; it has only run on Linux desktop and card-host, location is simulated, and \"Listen\" is unavailable on Linux."
      }
    }
  },
  {
    "n": 112,
    "name": {
      "zh": "Muse",
      "en": "Muse"
    },
    "repo": "https://github.com/9tuore/muse-agent",
    "shotByJudge": false,
    "live": false,
    "conflict": false,
    "scores": {
      "creativity": 14,
      "completeness": 9,
      "tech": 6,
      "social": 13,
      "performance": 6
    },
    "total": 48,
    "why": {
      "zh": {
        "creativity": "让记忆推动行动：Agent 从来信理解事项并自动排进日历，写后独立读回核验",
        "completeness": "B11/D10：日历链依赖配套宿主扩展，mail.send 发不出；视频是截图回放，作者自评全链未通过",
        "tech": "无上游贡献，按 「复现与工程」项 8 分：有依赖锁、fixture 和 clean_room 构建，单文件过万行",
        "social": "上班族把邮件里的约定转成日程是常见需求，但目前只能在作者自带宿主上用",
        "performance": "未实测：关卡 PASSED；日历服务只在作者扩展宿主上有，mail.send 恒返回 approval_required"
      },
      "en": {
        "creativity": "Lets memory drive action: the Agent understands items from incoming mail and automatically schedules them on the calendar, then independently reads back to verify after writing.",
        "completeness": "B11/D10: the calendar chain depends on a companion host extension and mail.send cannot send; the video is a screenshot replay, and the author's own assessment is that the full chain does not pass.",
        "tech": "No upstream contributions; reproducibility & engineering score 8: has dependency locks, fixtures and a clean_room build; a single file exceeds ten thousand lines.",
        "social": "Turning commitments in email into calendar events is a common need for office workers, but currently it only works on the author's own host.",
        "performance": "Not live-tested: gate PASSED; the calendar service exists only on the author's extended host, and mail.send always returns approval_required."
      }
    }
  },
  {
    "n": 77,
    "name": {
      "zh": "OctoSense 日历 OMA",
      "en": "OctoSense Calendar OMA"
    },
    "repo": "https://github.com/mark-liuzh/OctoSense-Calendar-OMA",
    "shotByJudge": false,
    "live": true,
    "conflict": false,
    "scores": {
      "creativity": 13,
      "completeness": 10,
      "tech": 6,
      "social": 15,
      "performance": 4
    },
    "total": 48,
    "why": {
      "zh": {
        "creativity": "日历冲突由模型给改期方案，经七道闸校验、用户采纳后写入，冲突没减少就自动回滚，熟悉场景里有新做法。",
        "completeness": "实测 −3：官方 rc.6 上月视图刷新超出宿主指令预算，导入后「写入」确认条不出现；冲突导入后同样超限，冲突改期主线走不到；邮件导入报 no such account。",
        "tech": "无上游贡献，按「复现与工程」项8/10折算；49个脚本含14道静态门禁和38条闸用例，未走GitHub发布流程。",
        "social": "日程冲突是上班族、学生常遇的高频问题，导入ICS即可用；但自动改期依赖尚未验证的模型路径。",
        "performance": "已实测（rc.6），核心流程跑不通（上限 6）：脚本指令超限阻断写入与冲突区；AI 排程因 schema 用了宿主不支持的 pattern 被拒，2 秒失败且只显示「暂不可用」。"
      },
      "en": {
        "creativity": "For calendar conflicts, the model proposes rescheduling, which passes seven gates and is written after the user adopts it, with automatic rollback if conflicts do not decrease. A new approach in a familiar scenario.",
        "completeness": "Live-tested −3: on the official rc.6 the month-view refresh exceeds the host instruction budget, so the \"write\" confirmation bar never appears after import; importing conflicts also exceeds the limit, so the main conflict-rescheduling flow cannot be reached; email import reports no such account.",
        "tech": "No upstream contributions; converted from reproducibility & engineering score 8/10. 49 scripts including 14 static gates and 38 gate test cases; does not use the GitHub release pipeline.",
        "social": "Calendar conflicts are a frequent problem for office workers and students, and importing an ICS file is enough to start; but automatic rescheduling depends on a model path not yet verified.",
        "performance": "Live-tested (rc.6), core flow does not run (capped at 6): script instruction overruns block writing and the conflict area; AI scheduling is rejected because the schema uses `pattern`, which the host does not support, failing in 2 s and showing only \"temporarily unavailable\"."
      }
    }
  },
  {
    "n": 111,
    "name": {
      "zh": "Daycast 天气助手",
      "en": "Daycast Weather Assistant"
    },
    "repo": "https://github.com/buqizixv/shaotangjiabing",
    "shotByJudge": false,
    "live": false,
    "conflict": false,
    "scores": {
      "creativity": 10,
      "completeness": 8,
      "tech": 11,
      "social": 13,
      "performance": 5
    },
    "total": 47,
    "why": {
      "zh": {
        "creativity": "天气加衣橱加日程，AI 从问答中抽取日程草案再确认写入，是常见天气助手做法",
        "completeness": "B14/D4：天气请求和确认卡完整；关卡 REFUSED，无视频，未交复赛材料",
        "tech": "技术突破 53 分：OctoSense#537 修复托管模块替换全局根致崩溃，有回归测试，但未合并",
        "social": "每天看天气穿衣出门是大众高频需求，但功能浅，主动提醒没有实现",
        "performance": "未实测：hub check REFUSED，digest 真实不符，提交包无法收录；octos 调用无超时"
      },
      "en": {
        "creativity": "Weather plus wardrobe plus calendar; AI extracts calendar drafts from Q&A and writes them after confirmation. A common weather-assistant approach.",
        "completeness": "B14/D4: weather requests and confirmation cards are complete; gate REFUSED, no video, award-round materials not submitted.",
        "tech": "Technical Breakthrough score of 53: OctoSense#537 fixes a crash caused by a hosted module replacing the global root, with a regression test, but not merged.",
        "social": "Checking the weather to dress and head out each day is a broad, high-frequency need, but the features are shallow and proactive reminders are not implemented.",
        "performance": "Not live-tested: hub check REFUSED, the digest genuinely does not match, and the submitted pack cannot be included; octos calls have no timeout."
      }
    }
  },
  {
    "n": 73,
    "name": {
      "zh": "OctoStudio",
      "en": "OctoStudio"
    },
    "repo": "https://github.com/aios-pub/OctoStudio",
    "shotByJudge": false,
    "live": false,
    "conflict": false,
    "scores": {
      "creativity": 10,
      "completeness": 9,
      "tech": 4,
      "social": 12,
      "performance": 9
    },
    "total": 44,
    "why": {
      "zh": {
        "creativity": "一句话生成图文、分镜、PPT、口播等内容的AI创作台，市面常见，Agent主要做生成。",
        "completeness": "B 14/25：关卡通过且签名，但glance发布参数错误会被宿主拒；D 6/20，无运行视频，未交复赛材料。",
        "tech": "技术突破22分：只有一篇被维护者订正的上手文档合并，另两个一行链接PR重复且已关闭。",
        "social": "面向自媒体和内容创作者，有实用价值，但同类工具多，生成结果只存本地，可替代性强。",
        "performance": "未实测：签名后hub check通过；glance.publish缺card_id等字段会被宿主拒，模型失败时填演示内容。"
      },
      "en": {
        "creativity": "An AI creation studio that generates illustrated posts, storyboards, slides, voice-over scripts and more from one sentence; common on the market, and the Agent mainly generates.",
        "completeness": "B 14/25: gates pass and it is signed, but wrong glance publish parameters will be rejected by the host; D 6/20, no running video, award-round materials not submitted.",
        "tech": "Technical Breakthrough score of 22: only one getting-started doc, corrected by maintainers, was merged; two other one-line link PRs were duplicates and are closed.",
        "social": "For self-publishers and content creators; has practical value, but there are many similar tools, results are stored only locally, and it is easily replaceable.",
        "performance": "Not live-tested: hub check passes after signing; glance.publish is missing fields such as card_id and will be rejected by the host, and demo content is filled in when the model fails."
      }
    }
  },
  {
    "n": 107,
    "name": {
      "zh": "Writing Studio",
      "en": "Writing Studio"
    },
    "repo": "https://github.com/hhyyzz-enda/bluemsun-2026AgentticApp",
    "shotByJudge": false,
    "live": false,
    "conflict": false,
    "scores": {
      "creativity": 9,
      "completeness": 9,
      "tech": 4,
      "social": 11,
      "performance": 8
    },
    "total": 41,
    "why": {
      "zh": {
        "creativity": "段落改写加审阅、确认、撤销，是常见写作助手做法，Agent 只做单段改写",
        "completeness": "B14/D7：主流程有实现但未交复赛材料；无设置页，README 流式、逐条接受与代码不符，视频是原生版",
        "tech": "无上游贡献，按 「复现与工程」项 5 分：脚本应用无测试，bundle 不在仓根，README 与代码不一致",
        "social": "服务写作者改稿和发布，人群中等，同类工具多，增量有限",
        "performance": "未实测：hub check PASSED；octos 调用无超时，失败静默落到 Mock 仍标宿主引擎，matrix 只在 Rinx 有"
      },
      "en": {
        "creativity": "Paragraph rewriting plus review, confirm and undo is a common writing-assistant approach; the Agent only rewrites a single paragraph.",
        "completeness": "B14/D7: the main flow is implemented but award-round materials were not submitted; no settings page, the README's streaming and per-item acceptance do not match the code, and the video shows the native version.",
        "tech": "No upstream contributions; reproducibility & engineering score 5: the script app has no tests, the bundle is not at the repo root, and the README does not match the code.",
        "social": "Serves writers revising and publishing; a medium-sized group, with many similar tools and limited added value.",
        "performance": "Not live-tested: hub check PASSED; octos calls have no timeout, failures silently fall back to Mock while still labeled as the host engine, and matrix exists only in Rinx."
      }
    }
  },
  {
    "n": 115,
    "name": {
      "zh": "情境音乐 music.cue",
      "en": "music.cue"
    },
    "repo": "https://github.com/Mingyy21/music-cue",
    "shotByJudge": false,
    "live": false,
    "conflict": false,
    "scores": {
      "creativity": 10,
      "completeness": 10,
      "tech": 3,
      "social": 9,
      "performance": 7
    },
    "total": 39,
    "why": {
      "zh": {
        "creativity": "一句话生成渐入、稳定、收尾三段播放卡，形式有小新意，但靠关键词规则匹配场景，没有Agent角色。",
        "completeness": "B 11/25：本地流程完整，但播放是模拟、曲库是示例，短时长会出负时长段；D 11/20，未交复赛材料。",
        "tech": "无上游贡献，按「复现与工程」项4/10折算；无LICENSE，测试脚本不在仓库，无法复现。",
        "social": "服务想按场景听音乐的个人用户，需求轻；曲库为示例、播放为本地模拟，目前不能真正放音乐。",
        "performance": "未实测：hub check因windows-path摘要问题REFUSED（不扣分）；本地规则流程能走完，但播放为模拟，短时长有负时长缺陷。"
      },
      "en": {
        "creativity": "Generates a three-part playback card (fade-in, steady, wind-down) from one sentence; a small novelty in form, but scenes are matched by keyword rules and there is no Agent role.",
        "completeness": "B 11/25: the local flow is complete, but playback is simulated, the library is a sample, and short durations produce negative-length segments; D 11/20, award-round materials not submitted.",
        "tech": "No upstream contributions; converted from reproducibility & engineering score 4/10. No LICENSE, test scripts are not in the repo, cannot be reproduced.",
        "social": "Serves individuals who want music matched to the moment; a light need. The library is a sample and playback is locally simulated, so it cannot actually play music yet.",
        "performance": "Not live-tested: hub check REFUSED because of the windows-path digest issue (no deduction); the local rule flow completes, but playback is simulated and short durations have a negative-length defect."
      }
    }
  },
  {
    "n": 108,
    "name": {
      "zh": "OctoParcel",
      "en": "OctoParcel"
    },
    "repo": "https://github.com/DitingZhang/OctoParcel",
    "shotByJudge": false,
    "live": false,
    "conflict": false,
    "scores": {
      "creativity": 8,
      "completeness": 9,
      "tech": 6,
      "social": 8,
      "performance": 7
    },
    "total": 38,
    "why": {
      "zh": {
        "creativity": "包裹管家主动挑出需处理的订单并给话术，但是 4 笔写死订单加规则查表，没有 Agent",
        "completeness": "B10/D11：确认、驳回、持久化链路完整，但核心数据是硬编码 Mock，未交复赛材料",
        "tech": "无上游贡献，按 「复现与工程」项 7 分：GitHub 发布流程钉住版本可复验，但无测试",
        "social": "网购用户人群大，但不能接入用户自己的订单，真实生活中无法使用",
        "performance": "未实测：GitHub 发布包验证 PASSED，card-host 能跑；只有 Mock 数据，已签收包裹可能误判为停滞，待复核"
      },
      "en": {
        "creativity": "A parcel manager that proactively flags orders needing action and suggests what to say, but it is 4 hard-coded orders plus rule lookups, with no Agent.",
        "completeness": "B10/D11: confirm, dismiss and persistence chains are complete, but the core data is hard-coded Mock, and award-round materials were not submitted.",
        "tech": "No upstream contributions; reproducibility & engineering score 7: the GitHub release pipeline pins versions and is reproducible, but there are no tests.",
        "social": "Online shoppers are a large group, but it cannot connect to users' own orders, so it cannot be used in real life.",
        "performance": "Not live-tested: GitHub release pack verification PASSED and it runs in card-host; only Mock data, and delivered parcels may be misjudged as stalled, to be re-checked."
      }
    }
  },
  {
    "n": 149,
    "name": {
      "zh": "知了 维修协作",
      "en": "Zhiliao Repair Collaboration"
    },
    "repo": "https://github.com/Abarm009/zhiliao",
    "shotByJudge": false,
    "live": false,
    "conflict": false,
    "scores": {
      "creativity": 8,
      "completeness": 7,
      "tech": 4,
      "social": 10,
      "performance": 5
    },
    "total": 34,
    "why": {
      "zh": {
        "creativity": "报修、接单、完工、验收的工单状态机，是常见业务形态，代码中没有任何Agent或模型调用。",
        "completeness": "B 9/25：证据只能登记占位，完工环节不可达；D 7/20，视频是A版步骤卡，未交复赛材料。",
        "tech": "无上游贡献，按「复现与工程」项5/10折算；后端190项测试属A版，不覆盖提交的bundle。",
        "social": "面向物业、维修团队和报修住户，需求真实但人群较窄；完工走不通，目前不能实际使用。",
        "performance": "未实测：hub check通过，可装可开；但证据只能占位，完工被拦，核心流程走不完；只在旧版card-host测过。"
      },
      "en": {
        "creativity": "A work-order state machine for reporting, accepting, completing and inspecting repairs; a common business pattern, with no Agent or model calls anywhere in the code.",
        "completeness": "B 9/25: evidence can only be registered as placeholders and the completion step is unreachable; D 7/20, the video shows version A's step cards, award-round materials not submitted.",
        "tech": "No upstream contributions; converted from reproducibility & engineering score 5/10. The backend's 190 tests belong to version A and do not cover the submitted bundle.",
        "social": "For property managers, repair teams and residents reporting repairs; a real need but a fairly narrow group; completion does not work, so it cannot actually be used yet.",
        "performance": "Not live-tested: hub check passes and it installs and opens; but evidence can only be placeholders, completion is blocked and the core flow cannot finish; only tested on an old card-host."
      }
    }
  }
]
