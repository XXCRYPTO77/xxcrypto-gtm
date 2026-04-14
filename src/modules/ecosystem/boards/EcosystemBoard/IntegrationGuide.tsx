'use client';

import { useState } from 'react';
import { Copy, Check, UserPlus, Code2, Rocket } from 'lucide-react';

interface IntegrationGuideProps {
  isZh: boolean;
}

const CODE_CONTENT = `# MCP 协议接入示例
npx @coinw/agent-sdk connect \\
  --server https://mcp.coinw.com \\
  --key YOUR_APP_KEY \\
  --protocol mcp`;

export function IntegrationGuide({ isZh }: IntegrationGuideProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(CODE_CONTENT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const steps = [
    {
      icon: <UserPlus className="h-6 w-6" />,
      title: isZh ? '注册开发者账户' : 'Register Developer Account',
      desc: isZh ? '注册开发者账户，获取 App Key' : 'Sign up and get your App Key',
    },
    {
      icon: <Code2 className="h-6 w-6" />,
      title: isZh ? '选择接入协议' : 'Choose Protocol',
      desc: isZh ? '选择接入协议，添加 CoinW MCP Server' : 'Pick MCP / REST / WebSocket and connect',
      code: true,
    },
    {
      icon: <Rocket className="h-6 w-6" />,
      title: isZh ? '发布上线' : 'Go Live',
      desc: isZh ? '发布上线，进入 Agent 列表' : 'Publish and join the Agent directory',
    },
  ];

  return (
    <div className="rounded-2xl bg-gray-950 p-8 sm:p-12">
      <div className="mb-8 text-center">
        <h3 className="text-2xl font-bold text-white">
          {isZh ? '接入你的 Agent' : 'Integrate Your Agent'}
        </h3>
        <p className="mt-2 text-sm text-gray-400">
          {isZh ? '三步接入，支持 MCP / REST / WebSocket' : '3 steps — supports MCP / REST / WebSocket'}
        </p>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {steps.map((step, i) => (
          <div key={i} className="rounded-xl bg-white/5 p-6">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white">
              {step.icon}
            </div>
            <div className="mb-1 text-xs font-semibold text-gray-500">Step {i + 1}</div>
            <h4 className="mb-2 font-semibold text-white">{step.title}</h4>
            <p className="text-sm text-gray-400">{step.desc}</p>

            {step.code && (
              <div className="relative mt-4 rounded-lg bg-black/50 p-4">
                <pre className="overflow-x-auto text-xs text-green-400 leading-relaxed">
                  {CODE_CONTENT}
                </pre>
                <button
                  onClick={handleCopy}
                  className="absolute right-2 top-2 rounded bg-white/10 p-1.5 text-gray-400 hover:text-white transition-colors"
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-8 text-center">
        <button className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-100 transition-colors">
          {isZh ? '开始接入' : 'Get Started'}
        </button>
      </div>
    </div>
  );
}
