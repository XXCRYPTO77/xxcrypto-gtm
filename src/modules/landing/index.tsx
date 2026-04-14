'use client';

import React from 'react';
import { Hero } from './components/Hero';
import { QuickStart } from './components/QuickStart';
import { InstallBlock } from './components/InstallBlock';
import { UseCaseCards } from './components/UseCaseCards';
import { CapabilityTabs } from './components/CapabilityTabs';
import { ComingSoon } from './components/ComingSoon';

function Divider() {
  return (
    <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
  );
}

export function LandingModule() {
  return (
    <section>
      {/* ① Hero — 品牌价值主张 */}
      <Hero />

      <Divider />

      {/* ② 快速开始 · 3 步 */}
      <QuickStart />

      <Divider />

      {/* ③ 一键安装命令块 */}
      <InstallBlock />

      <Divider />

      {/* ④ 常用场景 prompt 卡片 */}
      <UseCaseCards />

      <Divider />

      {/* ⑤ 能力概览 M1-M18 · Tab 切换 */}
      <CapabilityTabs />

      <Divider />

      {/* ⑥ Coming Soon · P1-P9 标签墙（视觉权重最低） */}
      <div className="bg-gray-50">
        <ComingSoon />
      </div>
    </section>
  );
}

export default LandingModule;
