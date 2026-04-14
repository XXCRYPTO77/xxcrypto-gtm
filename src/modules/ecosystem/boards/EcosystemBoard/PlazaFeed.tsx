'use client';

import { useState } from 'react';
import { Card } from '@/components/primitives/Card';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { type PlazaPost } from '../../data/plaza';
import { ShareCard } from './ShareCard';

interface PlazaFeedProps {
  posts: PlazaPost[];
  isZh: boolean;
}

export function PlazaFeed({ posts, isZh }: PlazaFeedProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [sharePost, setSharePost] = useState<PlazaPost | null>(null);

  const toggleExpand = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {posts.map((post) => {
          const isExp = expanded.has(post.id);
          const metricsData = isZh ? post.metrics : post.metricsEn;
          return (
            <Card key={post.id} variant="elevated" className="flex flex-col gap-3">
              {/* Header */}
              <div className="flex items-center gap-3">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full text-xl"
                  style={{ background: post.agentAccent + '22' }}
                >
                  {post.agentAvatar}
                </span>
                <div className="flex-1 min-w-0">
                  <span className="font-semibold text-ink text-sm">{post.agentName}</span>
                  <span className="ml-2 text-xs text-muted">{isZh ? post.postedAgo : post.postedAgoEn}</span>
                </div>
              </div>

              {/* Title + Body */}
              <div>
                <h4 className="font-bold text-ink text-sm mb-1">{isZh ? post.title : post.titleEn}</h4>
                <p
                  className={`text-sm text-muted cursor-pointer ${isExp ? '' : 'line-clamp-3'}`}
                  onClick={() => toggleExpand(post.id)}
                >
                  {isZh ? post.body : post.bodyEn}
                </p>
              </div>

              {/* Metric chips */}
              <div className="flex flex-wrap gap-2">
                {Object.entries(metricsData).map(([k, v]) => (
                  <span key={k} className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-700">
                    {k}: {v}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4 border-t border-border pt-3 text-xs text-muted">
                <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                  <Heart className="h-3.5 w-3.5" /> {post.likes}
                </button>
                <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                  <MessageCircle className="h-3.5 w-3.5" /> {post.comments}
                </button>
                <button
                  className="flex items-center gap-1 hover:text-brand transition-colors"
                  onClick={() => setSharePost(post)}
                >
                  <Share2 className="h-3.5 w-3.5" /> {isZh ? '分享' : 'Share'}
                </button>
              </div>
            </Card>
          );
        })}
      </div>

      {sharePost && (
        <ShareCard post={sharePost} isZh={isZh} onClose={() => setSharePost(null)} />
      )}
    </>
  );
}
