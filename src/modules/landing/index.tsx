'use client';

import React from 'react';
import { Hero } from './components/Hero';
import { MarketPreview } from './components/MarketPreview';
import { WhatIsSection } from './components/WhatIsSection';
import { WhySection } from './components/WhySection';
import { InstallBlock } from './components/InstallBlock';
import { UseCaseCards } from './components/UseCaseCards';
import { UserStoryCards } from './components/UserStoryCards';

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

      {/* ② 实时市场数据（灰底） */}
      <MarketPreview />

      <Divider />

      {/* ③ 什么是 Agent Skills（白底） */}
      <WhatIsSection />

      <Divider />

      {/* ④ 为什么选 CoinW Agent Skills（灰底） */}
      <WhySection />

      <Divider />

      {/* ⑤ 一键安装（白底） */}
      <InstallBlock />

      <Divider />

      {/* ⑥ 常用场景 prompt 卡片（白底） */}
      <UseCaseCards />

      <Divider />

      {/* ⑦ 用户故事（灰底，补充性质） */}
      <div className="bg-gray-50">
        <UserStoryCards />
      </div>
    </section>
  );
}

export default LandingModule;
