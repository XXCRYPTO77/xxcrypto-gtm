'use client';

import { type ArenaEntry, getArenaAgent } from '../../data/arena';

interface ArenaPodiumProps {
  entries: ArenaEntry[];
  isZh: boolean;
}

const RANK_EMOJI = ['🥇', '🥈', '🥉'];
const PODIUM_ORDER = [1, 0, 2]; // 2nd, 1st, 3rd

export function ArenaPodium({ entries, isZh }: ArenaPodiumProps) {
  const top3 = entries.filter((e) => e.rank <= 3).sort((a, b) => a.rank - b.rank);
  const rest = entries.filter((e) => e.rank >= 4 && e.rank <= 10);

  return (
    <section id="arena-leaderboard">
      <h3 className="text-2xl font-bold text-[var(--color-ink)] mb-2">
        {isZh ? '竞技排行榜' : 'Arena Leaderboard'}
      </h3>
      <p className="text-[var(--color-muted)] text-sm mb-8">
        {isZh ? '实时排名 · 按 7 日收益率排序' : 'Live rankings · sorted by 7-day return'}
      </p>

      {/* Podium — 2nd | 1st (taller) | 3rd */}
      <div className="flex items-end justify-center gap-4 mb-10">
        {PODIUM_ORDER.map((idx) => {
          const entry = top3[idx];
          if (!entry) return null;
          const agent = getArenaAgent(entry.agentId);
          if (!agent) return null;
          const isFirst = entry.rank === 1;
          const winRate = Math.round(
            (1 - entry.maxDrawdown / 100) * 100
          );

          return (
            <div
              key={entry.rank}
              className={`group rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/80 backdrop-blur-xl p-6 text-center transition-shadow hover:shadow-[0_0_30px_var(--color-brand)/20] ${
                isFirst ? 'w-48 py-10' : 'w-40'
              }`}
            >
              <div className="text-3xl mb-2">{RANK_EMOJI[entry.rank - 1]}</div>
              <div className="text-2xl mb-1">{agent.avatar}</div>
              <div className="font-semibold text-[var(--color-ink)] text-sm">
                {isZh ? agent.name : agent.nameEn}
              </div>
              <div className="mt-2 text-xl font-bold text-cw-green">
                +{entry.return7d}%
              </div>
              <div className="text-xs text-[var(--color-muted)] mt-1">
                {entry.prize?.toLocaleString()} Credit
              </div>
              {/* Win rate bar */}
              <div className="mt-3 mx-auto w-full rounded-full bg-[var(--color-border)] h-1.5 overflow-hidden">
                <div
                  className="h-full rounded-full bg-[var(--color-brand)]"
                  style={{ width: `${winRate}%` }}
                />
              </div>
              <div className="text-[10px] text-[var(--color-muted)] mt-1">
                {isZh ? '胜率' : 'Win'} {winRate}%
              </div>
            </div>
          );
        })}
      </div>

      {/* Ranks 4-10 table */}
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/80 backdrop-blur-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--color-border)] text-left text-xs text-[var(--color-muted)]">
              <th className="py-3 px-4 font-medium">#</th>
              <th className="py-3 px-4 font-medium">Agent</th>
              <th className="py-3 px-4 font-medium">{isZh ? '7日收益' : '7D Return'}</th>
              <th className="py-3 px-4 font-medium">{isZh ? '最大回撤' : 'Max DD'}</th>
              <th className="py-3 px-4 font-medium">{isZh ? '调用次数' : 'Calls'}</th>
            </tr>
          </thead>
          <tbody>
            {rest.map((entry) => {
              const agent = getArenaAgent(entry.agentId);
              if (!agent) return null;
              return (
                <tr
                  key={entry.rank}
                  className="border-b border-[var(--color-border)] last:border-b-0"
                >
                  <td className="py-3 px-4 font-semibold text-[var(--color-ink)]">
                    {entry.rank}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{agent.avatar}</span>
                      <span className="font-medium text-[var(--color-ink)]">
                        {isZh ? agent.name : agent.nameEn}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={
                        entry.return7d >= 0
                          ? 'font-semibold text-cw-green'
                          : 'font-semibold text-cw-red'
                      }
                    >
                      {entry.return7d >= 0 ? '+' : ''}
                      {entry.return7d}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[var(--color-muted)]">
                    -{entry.maxDrawdown}%
                  </td>
                  <td className="py-3 px-4 text-[var(--color-muted)]">
                    {entry.totalCalls.toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
