import { ShellNavbar } from '@/shell/Navbar';
import { ShellFooter } from '@/shell/Footer';
import SkillsModule from '@/modules/skills';

export const metadata = {
  title: 'Claw 42 Skills · 功能对照表',
  description: '18 项核心 Skill，覆盖信息获取、交易执行、账号安全、平台对接四个维度。',
};

export default function SkillsPage() {
  return (
    <>
      <ShellNavbar />
      <main className="pt-16 min-h-screen bg-page">
        <SkillsModule />
      </main>
      <ShellFooter />
    </>
  );
}
