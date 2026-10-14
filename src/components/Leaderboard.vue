<script setup lang="ts">
import { computed, ref } from 'vue'
import { useLocale } from '../useLocale'
import { entries, dimensions } from '../leaderboardData'
const { locale, t } = useLocale()
const base = import.meta.env.BASE_URL
const issues = 'https://github.com/OctoSense-org/OctoSense-App-Hub/issues'

type Filter = 'all' | 'live' | 'awarded'
const filter = ref<Filter>('all')
const filters: [Filter, string][] = [['all', '全部作品'], ['live', '实机复核'], ['awarded', '获奖作品']]

// Competition ranking by total; the judge's own entry is listed but not ranked.
const ranked = computed(() => {
  let rank = 0
  let last = -1
  let seen = 0
  return entries.map((e) => {
    if (e.conflict) return { ...e, rank: null as number | null }
    seen += 1
    if (e.total !== last) { rank = seen; last = e.total }
    return { ...e, rank: rank as number | null }
  })
})
const shown = computed(() => ranked.value.filter((e) => filter.value === 'all' || (filter.value === 'live' ? e.live : !!(e.award || e.special))))
const liveCount = entries.filter((e) => e.live).length
const lang = computed(() => (locale.value === 'en' ? 'en' : 'zh'))
const hosts = 'OctoSense 0.1.0-rc.6, Rinx 1.3.0, OctoBuddy 0.3.2'
const liveLine = computed(() => locale.value === 'en'
  ? `${liveCount} of them were verified hands-on by the judges on unmodified official hosts (${hosts}).`
  : `其中 ${liveCount} 件在未修改的官方宿主（${hosts.replace(/, /g, '、')}）上做了实机复核。`)
const rankLabel = (rank: number | null) => rank === null ? t('不参与排名') : locale.value === 'en' ? `Rank ${rank}` : `第 ${rank} 名`
</script>

<template>
  <section id="leaderboard" class="section leaderboard" aria-labelledby="leaderboard-title">
    <div class="section-heading wide">
      <p class="eyebrow">{{ t('复赛排行榜 / LEADERBOARD') }}</p>
      <h2 id="leaderboard-title">{{ t('33 件复赛作品，五维总评。') }}</h2>
      <p>{{ t('评审组按创意、项目完整度、技术贡献度、应用社会价值与 App 性能五个维度为全部复赛作品评分，每项 20 分，满分 100。') }} {{ liveLine }}</p>
      <p class="lb-note">{{ t('总分前六名获奖：一等奖 1 名（MiniMax · 意创万象大奖），二等奖 2 名，三等奖 3 名。每件作品都附有五个维度的评审结论，供团队继续改进。') }} <a href="#winners">{{ t('查看获奖名单 →') }}</a></p>
    </div>

    <div class="lb-rubric" role="list" :aria-label="t('五维评分标准')">
      <article v-for="d in dimensions" :key="d.key" role="listitem">
        <p class="lb-rubric-name">{{ t(d.label) }} <span>20</span></p>
        <p>{{ t(d.description) }}</p>
      </article>
    </div>

    <div class="lb-toolbar">
      <div class="lb-filters" role="group" :aria-label="t('筛选')">
        <button v-for="[id, label] in filters" :key="id" type="button" :aria-pressed="filter === id" @click="filter = id">{{ t(label) }}</button>
      </div>
      <p>{{ t('截图来自各作品仓库；标注「评审实测截图」的由评审组复核时截取。') }}</p>
    </div>

    <ol class="lb-list">
      <li v-for="e in shown" :key="e.n" class="lb-row" :class="{ 'is-podium': e.rank !== null && e.rank <= 3 }">
        <div class="lb-rank" :aria-label="rankLabel(e.rank)">{{ e.rank === null ? '—' : String(e.rank).padStart(2, '0') }}</div>
        <a class="lb-shot" :href="`${base}leaderboard/${e.n}.webp`" target="_blank" rel="noopener noreferrer">
          <img :src="`${base}leaderboard/${e.n}.webp`" :alt="`${e.name[lang]} ${t('作品截图')}`" loading="lazy" decoding="async">
          <span v-if="e.shotByJudge" class="lb-shot-tag">{{ t('评审实测截图') }}</span>
        </a>
        <div class="lb-main">
          <p class="lb-meta">
            <a :href="`${issues}/${e.n}`" target="_blank" rel="noopener noreferrer">#{{ e.n }}</a>
            <span aria-hidden="true">·</span>
            <a :href="e.repo" target="_blank" rel="noopener noreferrer">{{ e.repo.replace('https://github.com/', '') }} ↗</a>
          </p>
          <h3>{{ e.name[lang] }}</h3>
          <p class="lb-badges">
            <span v-if="e.award" class="badge award">{{ t(e.award) }}</span>
            <span v-if="e.special" class="badge special">{{ t(e.special) }}</span>
            <span class="badge" :class="e.live ? 'live' : 'evidence'">{{ e.live ? t('实机复核') : t('按证据评审') }}</span>
            <span v-if="e.conflict" class="badge conflict">{{ t('评审方作品 · 不参评') }}</span>
          </p>
          <dl class="lb-dims">
            <div v-for="d in dimensions" :key="d.key">
              <dt>{{ t(d.label) }}</dt>
              <dd><span class="lb-bar" aria-hidden="true"><i :style="{ width: `${e.scores[d.key] * 5}%` }"></i></span><b>{{ e.scores[d.key] }}</b></dd>
            </div>
          </dl>
          <details class="lb-why">
            <summary>{{ t('评审结论') }}</summary>
            <dl>
              <template v-for="d in dimensions" :key="d.key">
                <dt>{{ t(d.label) }} <span>{{ e.scores[d.key] }}/20</span></dt>
                <dd>{{ e.why[lang][d.key] }}</dd>
              </template>
            </dl>
          </details>
        </div>
        <div class="lb-total"><span>{{ t('总分') }}</span><strong>{{ e.total }}</strong></div>
      </li>
    </ol>
    <p class="lb-foot">{{ t('分数为复赛评审组结论（2026 年 10 月 15 日）。实机复核记录了运行时长、失败处理与存储读回结果；未实测作品的性能分按发布包关卡与运行证据推定，最高 14 分。') }}</p>
  </section>
</template>

<style scoped>
.lb-note { font-size: 15px !important; }
.lb-note a { color: var(--accent); white-space: nowrap; }

.lb-rubric { margin-top: 44px; display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); border-top: 1px solid var(--ink); }
.lb-rubric article { padding: 18px 18px 6px 0; }
.lb-rubric article + article { padding-left: 18px; border-left: 1px solid var(--border); }
.lb-rubric-name { margin: 0 0 8px; font-weight: 500; font-size: 17px; display: flex; justify-content: space-between; gap: 8px; }
.lb-rubric-name span { font: 12px/2 var(--mono); color: var(--accent); }
.lb-rubric p:not(.lb-rubric-name) { margin: 0; color: var(--muted); font-size: 13.5px; line-height: 1.75; }

.lb-toolbar { margin-top: 48px; display: flex; justify-content: space-between; align-items: center; gap: 12px 24px; flex-wrap: wrap; border-bottom: 1px solid var(--ink); padding-bottom: 14px; }
.lb-toolbar p { margin: 0; color: var(--muted); font-size: 13px; }
.lb-filters { display: flex; gap: 8px; flex-wrap: wrap; }
.lb-filters button { font: 13px/1 var(--mono); padding: 9px 14px; border: 1px solid var(--border); background: transparent; color: var(--ink); border-radius: 999px; cursor: pointer; }
.lb-filters button[aria-pressed='true'] { background: var(--ink); color: var(--paper); border-color: var(--ink); }

.lb-list { list-style: none; margin: 0; padding: 0; }
.lb-row { display: grid; grid-template-columns: 56px 220px minmax(0, 1fr) 96px; gap: 0 28px; padding: 28px 0; border-bottom: 1px solid var(--border); align-items: start; }
.lb-rank { font: 500 30px/1 var(--serif); font-variant-numeric: lining-nums tabular-nums; color: var(--muted); padding-top: 4px; }
.is-podium .lb-rank { color: var(--accent); font-size: 38px; }

.lb-shot { position: relative; display: block; aspect-ratio: 4 / 3; overflow: hidden; border: 1px solid var(--border); background: color-mix(in srgb, var(--border) 35%, var(--paper)); }
.lb-shot img { width: 100%; height: 100%; object-fit: cover; object-position: top center; display: block; transition: transform .4s ease; }
.lb-shot:hover img { transform: scale(1.03); }
.lb-shot-tag { position: absolute; left: 6px; bottom: 6px; font: 10.5px/1.6 var(--mono); padding: 1px 7px; background: #18242fd9; color: #f0e9dd; border-radius: 999px; }

.lb-meta { margin: 0; font: 12px/1.8 var(--mono); color: var(--muted); display: flex; flex-wrap: wrap; gap: 2px 8px; }
.lb-meta a { color: inherit; text-decoration: none; border-bottom: 1px solid transparent; overflow-wrap: anywhere; }
.lb-meta a:hover { border-bottom-color: currentColor; color: var(--accent); }
.lb-main h3 { font: 500 clamp(22px, 2.3vw, 28px)/1.25 var(--serif); margin: 4px 0 8px; }
.lb-badges { margin: 0 0 14px; display: flex; flex-wrap: wrap; gap: 6px; }
.badge { font: 11px/1.7 var(--mono); padding: 0 9px; border: 1px solid var(--border); border-radius: 999px; color: var(--muted); }
.badge.award { border-color: var(--accent); background: var(--accent); color: var(--paper); }
.badge.special { border-color: var(--ink); background: var(--ink); color: var(--paper); }
.badge.live { border-color: var(--accent); color: var(--accent); }
.badge.conflict { border-style: dashed; }

.lb-dims { margin: 0; display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 6px 16px; }
.lb-dims dt { font-size: 12px; color: var(--muted); white-space: nowrap; }
.lb-dims dd { margin: 4px 0 0; display: flex; align-items: center; gap: 8px; }
.lb-dims b { font: 500 15px/1 var(--mono); font-variant-numeric: tabular-nums; min-width: 2ch; }
.lb-bar { flex: 1; height: 4px; background: var(--border); border-radius: 2px; overflow: hidden; }
.lb-bar i { display: block; height: 100%; background: var(--accent); }

.lb-why { margin-top: 16px; }
.lb-why summary { cursor: pointer; font-size: 14px; color: var(--accent); list-style: none; display: inline-flex; gap: 6px; align-items: center; }
.lb-why summary::-webkit-details-marker { display: none; }
.lb-why summary::after { content: '+'; font-family: var(--mono); }
.lb-why[open] summary::after { content: '−'; }
.lb-why dl { margin: 14px 0 0; display: grid; grid-template-columns: max-content minmax(0, 1fr); gap: 10px 20px; }
.lb-why dt { font-weight: 500; font-size: 14px; white-space: nowrap; }
.lb-why dt span { font: 12px var(--mono); color: var(--muted); margin-left: 6px; }
.lb-why dd { margin: 0; color: var(--muted); font-size: 14.5px; line-height: 1.8; }

.lb-total { text-align: right; }
.lb-total span { display: block; font: 11px/1.6 var(--mono); letter-spacing: .08em; text-transform: uppercase; color: var(--muted); }
.lb-total strong { font: 500 48px/1 var(--serif); font-variant-numeric: lining-nums tabular-nums; }
.is-podium .lb-total strong { color: var(--accent); }

.lb-foot { margin: 28px 0 0; color: var(--muted); font-size: 13px; max-width: 880px; }

@media (max-width: 1100px) {
  .lb-rubric { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .lb-rubric article, .lb-rubric article + article { padding: 16px 16px 10px 0; border-left: 0; border-bottom: 1px solid var(--border); }
  .lb-row { grid-template-columns: 44px 180px minmax(0, 1fr) 72px; gap: 0 20px; }
  .lb-dims { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .lb-total strong { font-size: 40px; }
}
@media (max-width: 720px) {
  .lb-rubric { grid-template-columns: 1fr; }
  .lb-row { grid-template-columns: 40px minmax(0, 1fr) 64px; grid-template-areas: 'rank shot total' 'main main main'; gap: 14px 14px; }
  .lb-rank { grid-area: rank; font-size: 24px; }
  .is-podium .lb-rank { font-size: 28px; }
  .lb-shot { grid-area: shot; }
  .lb-total { grid-area: total; }
  .lb-total strong { font-size: 34px; }
  .lb-main { grid-area: main; }
  .lb-dims { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .lb-why dl { grid-template-columns: 1fr; gap: 2px; }
  .lb-why dd { margin-bottom: 10px; }
}
</style>
