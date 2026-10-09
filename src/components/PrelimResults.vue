<script setup lang="ts">
import { useLocale } from '../useLocale'
const { t } = useLocale()
const issues = 'https://github.com/OctoSense-org/OctoSense-App-Hub/issues'

type Entry = { issue: number; name: string; by: string; native?: boolean }

// Shortlisted works, by submission issue number. Scores and feedback are in each issue.
const entries: Entry[] = [
  { issue: 71, name: 'TraceShop 采购助手', by: 'prettygirlisnotme' },
  { issue: 73, name: 'OctoStudio', by: 'amosarc' },
  { issue: 74, name: 'no-reminder-agent', by: 'nineanswerer' },
  { issue: 76, name: '拾意 Pickup', by: 'sansanyixyz331' },
  { issue: 77, name: 'OMA 日历', by: 'ody-cai' },
  { issue: 78, name: 'OnCue 台词排练', by: 'codezzzsleep' },
  { issue: 84, name: 'VibeMail', by: 'yzbtdiy' },
  { issue: 89, name: '听见 TrendyHear', by: 'shaokaiyuan0513-dotcom' },
  { issue: 90, name: 'Loom 项目日历', by: 'dyingforge' },
  { issue: 94, name: 'Ripple', by: 'yuandhsh-lang' },
  { issue: 95, name: '礼遇 LIYU', by: 'chrislearn' },
  { issue: 97, name: 'OctoBuddy', by: 'tyreseluo', native: true },
  { issue: 98, name: '牵线', by: 'kkkkikun' },
  { issue: 100, name: 'Morning Brief', by: 'jscjscjscjscjsc' },
  { issue: 101, name: 'Context DJ', by: 'peterdlick-stack' },
  { issue: 103, name: 'AgentMail', by: 'Jasonsu22' },
  { issue: 104, name: '豆豆家庭财务', by: 'jessicaruan6688-byte' },
  { issue: 105, name: 'Study Watchlist', by: 'scbz4learning' },
  { issue: 106, name: '知信邮件', by: '2892480843' },
  { issue: 107, name: 'Writing Studio', by: 'lin00xxx' },
  { issue: 108, name: 'OctoParcel', by: 'DitingZhang' },
  { issue: 109, name: '行程天气', by: 'ZhangHanDong' },
  { issue: 110, name: '补位 BuWei', by: 'WeiR-h', native: true },
  { issue: 111, name: '天气助手', by: 'buqizixv' },
  { issue: 112, name: 'Muse Goals', by: '9tuore' },
  { issue: 113, name: 'DailyFlow', by: 'KumaYuriPool' },
  { issue: 114, name: 'CFAW 新闻', by: 'V-Giotto' },
  { issue: 115, name: 'Music Cue', by: 'Mingyy21' },
  { issue: 116, name: 'Agentic26 导航', by: 'xiaoland' },
  { issue: 117, name: 'OctoDining 学生食堂', by: 'windy664' },
  { issue: 149, name: 'OctoSense Repair', by: 'Abarm009' },
  { issue: 166, name: 'Pantry Steward 食材管家', by: 'leoniaodo' },
  { issue: 177, name: '城市配对', by: 'SuperLeilei2026' },
]

const criteria = [
  ['需求与任务价值', '场景真实具体，Agent 完成可以核对的事，而不只是生成界面或摘要。'],
  ['核心流程可用性', '声称的核心流程在代码中端到端可追踪，有授权确认、执行与结果核验，作品能启动运行。'],
  ['数据来源与失败状态', '权限与网络主机最小且如实披露；拒绝授权、无网络、无 Agent、空数据都有诚实的状态。'],
  ['复现与材料', '固定提交或标签、开源许可证、启动说明、截图与演示，以及与代码一致的应用资料。'],
]
</script>

<template>
  <section id="results" class="section prelim-results" aria-labelledby="results-title">
    <div class="section-heading wide">
      <p class="eyebrow">{{ t('初赛结果 / QUALIFYING RESULTS') }}</p>
      <h2 id="results-title">{{ t('33 件作品入围。') }}</h2>
      <p>{{ t('初赛共评审 35 件作品，得分 60 分及以上的 33 件入围。评审以 2026 年 10 月 9 日前作者在 App Hub 提交 issue 中声明的最新版本为准，Rust 原生应用同样参评。') }}</p>
      <p>{{ t('每件作品的得分与改进意见已回复在各自的提交 issue 中。入围团队的成员以报名信息为准。') }}</p>
    </div>

    <ul class="results-list">
      <li v-for="entry in entries" :key="entry.issue">
        <a :href="`${issues}/${entry.issue}`" target="_blank" rel="noopener noreferrer">
          <span class="results-issue">#{{ entry.issue }}</span>
          <strong>{{ t(entry.name) }}</strong>
          <span class="results-by">{{ entry.by }}</span>
          <span v-if="entry.native" class="results-tag">{{ t('原生应用') }}</span>
        </a>
      </li>
    </ul>

    <div class="results-criteria">
      <h3>{{ t('评分细则') }}</h3>
      <p>{{ t('满分 100 分，四个维度各 25 分。代码中没有任何 Agent 或模型调用的作品，「需求与任务价值」最高 13 分。App Hub 工具自身的问题不计入作者扣分；原生应用不能进入 App Hub，同样不扣分。') }}</p>
      <dl>
        <template v-for="[name, detail] in criteria" :key="name">
          <dt>{{ t(name) }}</dt>
          <dd>{{ t(detail) }}</dd>
        </template>
      </dl>
    </div>

    <div class="results-next">
      <h3>{{ t('入围后的改进重点') }}</h3>
      <ul>
        <li>{{ t('改用 GitHub 发布流程（tools/octo publish-github），提高版本号并推送新标签；无需发布者私钥。') }}</li>
        <li>{{ t('把 bundle/ 放在仓库根目录，一个仓库对应一个应用。') }}</li>
        <li>{{ t('发送邮件使用 mail.review_send；发布速览卡片时带上 card_id、title 以及 source 或 script。') }}</li>
      </ul>
      <a class="inline-link" href="#schedule">{{ t('复赛安排见赛程 ↓') }}</a>
    </div>
  </section>
</template>

<style scoped>
.results-list { list-style: none; margin: 40px 0 0; padding: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 12px; }
.results-list a { display: grid; grid-template-columns: auto 1fr; gap: 2px 12px; align-items: baseline; padding: 14px 16px; border: 1px solid var(--border); border-radius: 10px; color: inherit; text-decoration: none; }
.results-list a:hover { border-color: var(--accent); }
.results-issue { grid-row: span 2; font: 400 12px/1.6 var(--mono); color: var(--accent); }
.results-list strong { font-weight: 500; }
.results-by { font: 400 12px/1.6 var(--mono); color: var(--muted); overflow-wrap: anywhere; }
.results-tag { grid-column: 2; justify-self: start; font: 400 11px/1.6 var(--mono); padding: 0 6px; border-radius: 4px; border: 1px solid var(--accent); color: var(--accent); }
.results-criteria, .results-next { margin-top: 48px; max-width: 820px; }
.results-criteria h3, .results-next h3 { font-weight: 500; margin: 0 0 12px; }
.results-criteria p, .results-next li { color: var(--muted); }
.results-criteria dl { display: grid; grid-template-columns: max-content 1fr; gap: 10px 20px; margin: 20px 0 0; }
.results-criteria dt { font-weight: 500; }
.results-criteria dd { margin: 0; color: var(--muted); }
@media (max-width: 640px) { .results-criteria dl { grid-template-columns: 1fr; gap: 4px; } .results-criteria dd { margin-bottom: 10px; } }
</style>
