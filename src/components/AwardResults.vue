<script setup lang="ts">
import { useLocale } from '../useLocale'
import { entries, dimensions, type Entry } from '../leaderboardData'
const { locale, t } = useLocale()
const nameOf = (e: Entry) => (locale.value === 'en' ? e.name.en : e.name.zh)
const issues = 'https://github.com/OctoSense-org/OctoSense-App-Hub/issues'

type Winner = { issue: number; by: string; showcase?: boolean; reason: string }
type Shown = Winner & { entry: Entry }

// Prizes follow the five-dimension leaderboard: the top six totals win.
const byIssue = new Map(entries.map((e) => [e.n, e]))
const withEntry = (w: Winner): Shown => {
  const entry = byIssue.get(w.issue)
  if (!entry) throw new Error(`leaderboard has no entry #${w.issue}`)
  return { ...w, entry }
}

const champion = withEntry({
  issue: 78, by: 'codezzzsleep', showcase: true,
  reason: 'Agent 起草群聊措辞，程序逐条核对，人两步确认后才发送；发出后读回房间、继续观察反响。完整闭环在官方 Rinx 1.3.0 上实机复核通过，另一账号在服务端核实收到消息。团队还把在 OnCue 中打磨出的场景式界面测试与失败注入工具贡献给 App Flow（#192），所有脚本应用开发者都能使用。',
})

const tiers: { title: string; prize: string; winners: Shown[] }[] = [
  {
    title: '二等奖', prize: '¥9,000',
    winners: [
      withEntry({
        issue: 166, by: 'leoniaodo', showcase: true,
        reason: '模型只负责提议：建议必须通过结构校验和库存核对才能写入，再由用户确认执行。在官方 OctoSense rc.6 上实机复核全流程通过：约 45 秒生成三餐菜单，按实际用量扣减库存，存储核实、重启后数据保留。团队为 Windows 宿主补上相机、视觉输入、录音转写与可信输入能力（OctoSense#533、#534）。',
      }),
      withEntry({
        issue: 97, by: 'tyreseluo', showcase: true,
        reason: '原生编码应用：外环规划，内环编码 Agent 执行，OctoBuddy 自己运行检查、读回提交才算完成。实机复核一次编码闭环用时 39 秒、花费 0.28 美元；本机缺少测试工具时拒绝验收，并区分「Agent 自称通过」与「自己核实」，交给人决定。团队通过 OctoSense#344 把编码 Agent 编入系统并开放调用接口，并为 App Hub 关卡加上错误码与修复建议（#219）。',
      }),
    ],
  },
  {
    title: '三等奖', prize: '¥4,000',
    winners: [
      withEntry({
        issue: 100, by: 'jscjscjscjscjsc',
        reason: '把每天看新闻做成一份报纸：主编先问方向，列出取数计划等你批准；三位编辑背靠背初审，主编终审，并说明没上版的理由。在官方 rc.6 上实机复核：批准后 43 秒出刊，从当天 80 条真实新闻中选出 10 条，每条可追溯来源与可信度分级。团队还修复了 Script VM 分支栈失衡问题（makepad#126）。',
      }),
      withEntry({
        issue: 94, by: 'yuandhsh-lang',
        reason: '主动式计划 Agent：一句话生成计划，接入实时天气，安排冲突时提出改期方案，经用户批准后执行并读回核验。在官方 rc.6 上实机复核：两项计划撞期时约 9 秒给出方案，把骑车移到用户允许的 9–11 点窗口、会议保持不动；评审直接读取存储文件核对，与批准的方案一致。',
      }),
      withEntry({
        issue: 95, by: 'chrislearn',
        reason: '用多轮只读工具查询挑礼，写入后读回、可幂等恢复、日历去重，接入公网后端与宿主托管的凭据。演示模式全流程在官方 rc.6 上实机复核通过。团队向 OctoSense 提交了一组宿主修复（#459–#465）：后端 OAuth 证书信任、请求传输复用、日历全天事件回读与 WebView 残留。',
      }),
    ],
  },
]
// Single-dimension honours for entries outside the top six; one per entry.
const specials: (Shown & { title: string; basis: string })[] = [
  { ...withEntry({ issue: 177, by: 'SuperLeilei2026', reason: '把毕业择城做成「两城上同一站台、三幕对局」的决策实验：不给总相合分，只摆出证据、反例和未知；系统 Agent 只提一个能改变决定的关键问题。实机复核中，Agent 约 31 秒指出用户自设的「冬天太冷」红线在杭州尚未核实，并给出具体核验办法，确认后才写入核验清单。' }), title: '最佳创意奖', basis: 'creativity' },
  { ...withEntry({ issue: 76, by: 'sansanyixyz331', reason: '生态贡献最扎实：三个已合并的 App Hub 工具链修复（Windows 路径与摘要、盖章前先读清单、card-host 显示拒绝原因），以及经过四轮评审的 L0 卡片契约检查器（App-Flow#151）。作品在官方 Rinx 上读取群聊、生成待确认卡片，确认后真正发回群里。' }), title: '最佳生态贡献奖', basis: 'tech' },
  { ...withEntry({ issue: 103, by: 'Jasonsu22', reason: '面向大众的邮件秘书：数秒内给出总结与钓鱼检查，提出待办并在你同意后入库，AI 起草回信、发送前检查，最后交给宿主审阅页由你亲手批准。团队还修复了 macOS 上日历授权从不弹窗的宿主缺陷（OctoSense#499）。' }), title: '最佳社会价值奖', basis: 'social' },
  { ...withEntry({ issue: 71, by: 'prettygirlisnotme', reason: '数据诚实与结果核验做得最严：预算调整和保存草稿各需宿主单独批准，写入后逐字段读回比对，条件一变旧提案即作废。实机复核中，Agent 明确说明「安静」这一偏好在目录里没有证据、不能声称，并列出带静音证据但超预算的型号供你取舍。' }), title: '最佳可靠性奖', basis: 'completeness' },
]
const short: Record<string, string> = { creativity: '创意', completeness: '完整度', tech: '技术', social: '社会价值', performance: '性能' }
</script>

<template>
  <section id="winners" class="section winners" aria-labelledby="winners-title">
    <div class="section-heading wide">
      <p class="eyebrow">{{ t('复赛结果 / AWARD RESULTS') }}</p>
      <h2 id="winners-title">{{ t('六个作品获奖。') }}</h2>
      <p>{{ t('复赛评审 33 件入围作品，按创意、项目完整度、技术贡献度、应用社会价值与 App 性能五个维度评分，每项 20 分、满分 100，总分前六名获奖。总排名前三名将于 10 月 17 日到 GOSIM 黑客松现场展示作品并参加颁奖。') }}</p>
    </div>

    <article class="champion-card">
      <div class="champion-head">
        <p class="tier-label">{{ t('一等奖 · FIRST PRIZE') }} <span>¥20,000</span></p>
        <h3 class="award-name">MiniMax · 意创万象大奖</h3>
        <p class="award-name-en">MiniMax · Boundless Creation Award</p>
      </div>
      <div class="champion-body">
        <div>
          <p class="winner-meta"><a :href="`${issues}/${champion.issue}`" target="_blank" rel="noopener noreferrer">#{{ champion.issue }}</a> · <a :href="champion.entry.repo" target="_blank" rel="noopener noreferrer">{{ champion.by }}</a><span v-if="champion.showcase" class="showcase-tag">{{ t('现场展示') }}</span></p>
          <h4>{{ nameOf(champion.entry) }}</h4>
          <p class="reason">{{ t(champion.reason) }}</p>
        </div>
        <div class="score-block">
          <p class="score-total"><span>{{ t('总分') }}</span><strong>{{ champion.entry.total }}</strong></p>
          <dl class="dims">
            <div v-for="d in dimensions" :key="d.key"><dt>{{ t(short[d.key]) }}</dt><dd>{{ champion.entry.scores[d.key] }}</dd></div>
          </dl>
        </div>
      </div>
    </article>

    <div v-for="tier in tiers" :key="tier.title" class="tier">
      <p class="tier-heading"><span>{{ t(tier.title) }}</span><span>{{ tier.prize }} {{ t('/ 名') }}</span></p>
      <div class="tier-grid" :class="`count-${tier.winners.length}`">
        <article v-for="w in tier.winners" :key="w.issue" class="winner-card">
          <p class="winner-meta"><a :href="`${issues}/${w.issue}`" target="_blank" rel="noopener noreferrer">#{{ w.issue }}</a> · <a :href="w.entry.repo" target="_blank" rel="noopener noreferrer">{{ w.by }}</a><span v-if="w.showcase" class="showcase-tag">{{ t('现场展示') }}</span></p>
          <h4>{{ nameOf(w.entry) }}</h4>
          <div class="score-block compact">
            <p class="score-total"><span>{{ t('总分') }}</span><strong>{{ w.entry.total }}</strong></p>
            <dl class="dims">
              <div v-for="d in dimensions" :key="d.key"><dt>{{ t(short[d.key]) }}</dt><dd>{{ w.entry.scores[d.key] }}</dd></div>
            </dl>
          </div>
          <p class="reason">{{ t(w.reason) }}</p>
        </article>
      </div>
    </div>

    <div class="tier specials">
      <p class="tier-heading"><span>{{ t('单项奖') }}</span><span>{{ t('表彰前六名之外、单项表现最突出的作品') }}</span></p>
      <div class="tier-grid count-4">
        <article v-for="w in specials" :key="w.issue" class="winner-card">
          <p class="special-title">{{ t(w.title) }}</p>
          <p class="winner-meta"><a :href="`${issues}/${w.issue}`" target="_blank" rel="noopener noreferrer">#{{ w.issue }}</a> · <a :href="w.entry.repo" target="_blank" rel="noopener noreferrer">{{ w.by }}</a></p>
          <h4>{{ nameOf(w.entry) }}</h4>
          <div class="score-block compact">
            <p class="score-total"><span>{{ t('总分') }}</span><strong>{{ w.entry.total }}</strong></p>
            <dl class="dims">
              <div v-for="d in dimensions" :key="d.key" :class="{ hit: d.key === w.basis }"><dt>{{ t(short[d.key]) }}</dt><dd>{{ w.entry.scores[d.key] }}</dd></div>
            </dl>
          </div>
          <p class="reason">{{ t(w.reason) }}</p>
        </article>
      </div>
    </div>

    <div class="award-method">
      <h3>{{ t('评分方式') }}</h3>
      <dl>
        <template v-for="d in dimensions" :key="d.key">
          <dt>{{ t(d.label) }}（20）</dt>
          <dd>{{ t(d.description) }}</dd>
        </template>
      </dl>
      <p>{{ t('评审组在未修改的官方宿主上对 17 件作品做了实机复核。每件作品的分数与评审结论见排行榜。') }} <a class="to-leaderboard" href="#leaderboard">{{ t('查看全部复赛作品排行榜 →') }}</a></p>
    </div>
  </section>
</template>

<style scoped>
.champion-card { margin-top: 52px; background: #a95740; color: #fff2df; padding: clamp(28px, 4vw, 52px); position: relative; overflow: hidden; }
.champion-card::after { content: ''; position: absolute; right: -120px; top: -120px; width: 360px; height: 360px; border-radius: 50%; border: 1px solid #ffe2c433; pointer-events: none; }
.champion-head { border-bottom: 1px solid #ffe2c440; padding-bottom: 26px; }
.tier-label { font: 12px/1.8 var(--mono); letter-spacing: .14em; text-transform: uppercase; margin: 0 0 14px; color: #ffe7cc; display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
.tier-label span { letter-spacing: .04em; }
.award-name { font: 600 clamp(30px, 4.6vw, 54px)/1.15 'Noto Serif SC', var(--serif); margin: 0; letter-spacing: .02em; }
.award-name-en { font: 500 clamp(20px, 2.4vw, 30px)/1.3 var(--serif); font-style: italic; margin: 8px 0 0; color: #ffe7cc; }
.champion-body { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: clamp(24px, 5vw, 72px); padding-top: 28px; align-items: start; }
.champion-card h4 { font: 500 clamp(28px, 3.4vw, 40px)/1.2 var(--serif); margin: 6px 0 16px; }
.champion-card .winner-meta, .champion-card .winner-meta a { color: #ffe7cc; }
.champion-card .reason { color: #fff2df; font-size: 16px; line-height: 1.9; margin: 0; max-width: 760px; }
.champion-card .score-total span, .champion-card .dims dt { color: #ffe7cc; }
.champion-card .score-total strong, .champion-card .dims dd { color: #fff7ee; }
.champion-card .dims > div { border-color: #ffe2c440; }
.champion-card .showcase-tag { border-color: #ffe7cc; color: #ffe7cc; }

.winner-meta { font: 12px/1.8 var(--mono); color: var(--muted); margin: 0; display: flex; align-items: center; flex-wrap: wrap; gap: 4px 6px; }
.winner-meta a { color: inherit; text-decoration: none; border-bottom: 1px solid transparent; }
.winner-meta a:hover { border-bottom-color: currentColor; }
.showcase-tag { margin-left: 8px; font: 11px/1.6 var(--mono); padding: 0 8px; border: 1px solid var(--accent); color: var(--accent); border-radius: 999px; }

.score-total { margin: 0; }
.score-total span { display: block; font: 11px/1.6 var(--mono); letter-spacing: .08em; text-transform: uppercase; color: var(--muted); }
.score-total strong { display: block; margin-top: 4px; font: 500 56px/1 var(--serif); font-variant-numeric: lining-nums tabular-nums; }
.dims { margin: 16px 0 0; display: grid; grid-template-columns: repeat(5, auto); justify-content: start; }
.dims > div { padding: 2px 14px; border-left: 1px solid var(--border); }
.dims > div:first-child { border-left: 0; padding-left: 0; }
.dims dt { font: 11px/1.6 var(--mono); color: var(--muted); white-space: nowrap; }
.dims dd { margin: 2px 0 0; font: 500 22px/1.1 var(--serif); font-variant-numeric: lining-nums tabular-nums; }
.score-block.compact { display: flex; align-items: flex-end; gap: 22px; flex-wrap: wrap; margin: 8px 0 18px; }
.score-block.compact .score-total strong { font-size: 40px; color: var(--accent); }
.score-block.compact .dims { margin: 0; }
.score-block.compact .dims > div { padding: 0 10px; }
.score-block.compact .dims > div:first-child { padding-left: 0; }
.score-block.compact .dims dd { font-size: 18px; }

.tier { margin-top: 56px; }
.tier-heading { display: flex; justify-content: space-between; align-items: baseline; gap: 16px; border-bottom: 1px solid var(--ink); padding-bottom: 12px; margin: 0; }
.tier-heading span:first-child { font-size: 27px; font-weight: 500; }
.tier-heading span:last-child { font: 13px/1.7 var(--mono); color: var(--muted); }
.tier-grid { display: grid; gap: 0 clamp(28px, 4vw, 56px); }
.tier-grid.count-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.tier-grid.count-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.tier-grid.count-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.special-title { margin: 0 0 6px; font-size: 18px; font-weight: 500; color: var(--accent); }
.dims .hit dd { color: var(--accent); }
.winner-card { padding: 28px 0 8px; min-width: 0; }
.winner-card h4 { font: 500 clamp(24px, 2.6vw, 32px)/1.2 var(--serif); margin: 8px 0 10px; }
.winner-card .reason { color: var(--muted); font-size: 15px; line-height: 1.85; margin: 0; }

.award-method { margin-top: 64px; border-top: 1px solid var(--border); padding-top: 32px; max-width: 920px; }
.award-method h3 { font-weight: 500; margin: 0 0 16px; }
.award-method dl { display: grid; grid-template-columns: max-content 1fr; gap: 12px 24px; margin: 0; }
.award-method dt { font-weight: 500; }
.award-method dd { margin: 0; color: var(--muted); line-height: 1.8; }
.award-method p { color: var(--muted); font-size: 13px; margin: 20px 0 0; }
.to-leaderboard { color: var(--accent); white-space: nowrap; }

:global([data-theme='night']) .champion-card { background: #774331; }

@media (max-width: 1180px) {
  .tier-grid.count-3 { grid-template-columns: 1fr; }
  .tier-grid.count-4 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .champion-body { grid-template-columns: 1fr; }
}
@media (max-width: 760px) {
  .tier-grid.count-2, .tier-grid.count-4 { grid-template-columns: 1fr; }
  .dims > div { padding: 2px 10px; }
  .award-method dl { grid-template-columns: 1fr; gap: 4px; }
  .award-method dd { margin-bottom: 12px; }
}
</style>
