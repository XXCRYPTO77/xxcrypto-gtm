'use client';

import { useEffect } from 'react';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  variant?: 'rectangular' | 'circular' | 'rounded';
  className?: string;
  animate?: boolean;
}

interface SkeletonTextProps {
  lines?: number;
  lastLineWidth?: string;
  spacing?: string;
  className?: string;
}

interface SkeletonCardProps {
  hasImage?: boolean;
  imageHeight?: string;
  lines?: number;
  className?: string;
}

const SKELETON_STYLE_ID = 'agentx-skeleton-shimmer-style';
let skeletonStylesInjected = false;

function useSkeletonStyles(shouldInject: boolean) {
  useEffect(() => {
    if (!shouldInject || skeletonStylesInjected) {
      return;
    }

    if (document.getElementById(SKELETON_STYLE_ID)) {
      skeletonStylesInjected = true;
      return;
    }

    const style = document.createElement('style');
    style.id = SKELETON_STYLE_ID;
    style.textContent = `
      @keyframes skeleton-shimmer {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }

      .skeleton-shimmer {
        background-color: var(--color-surface);
        background-image: linear-gradient(90deg, transparent 0%, var(--color-page) 50%, transparent 100%);
        background-size: 200% 100%;
        animation: skeleton-shimmer 1.5s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);
    skeletonStylesInjected = true;
  }, [shouldInject]);
}

function getVariantClass(variant: NonNullable<SkeletonProps['variant']>) {
  if (variant === 'circular') {
    return 'rounded-full';
  }

  if (variant === 'rounded') {
    return 'rounded-[var(--radius-lg)]';
  }

  return 'rounded-[var(--radius-sm)]';
}

function Skeleton({
  width = '100%',
  height = '1rem',
  variant = 'rectangular',
  className = '',
  animate = true,
}: SkeletonProps) {
  useSkeletonStyles(animate);

  const resolvedWidth = variant === 'circular' ? height : width;
  const cn = [
    'block',
    getVariantClass(variant),
    animate ? 'skeleton-shimmer' : 'bg-[var(--color-surface)]',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span
      aria-hidden="true"
      className={cn}
      style={{
        width: resolvedWidth,
        height,
        backgroundColor: 'var(--color-surface)',
      }}
    />
  );
}

function SkeletonText({
  lines = 3,
  lastLineWidth = '60%',
  spacing = '0.75rem',
  className = '',
}: SkeletonTextProps) {
  const safeLines = Math.max(0, Math.floor(lines));

  return (
    <div className={className}>
      {Array.from({ length: safeLines }, (_, index) => {
        const isLastLine = index === safeLines - 1;

        return (
          <div
            key={index}
            style={{ marginBottom: isLastLine ? undefined : spacing }}
          >
            <Skeleton
              width={isLastLine ? lastLineWidth : '100%'}
              height="0.875rem"
            />
          </div>
        );
      })}
    </div>
  );
}

function SkeletonCard({
  hasImage = true,
  imageHeight = '12rem',
  lines = 3,
  className = '',
}: SkeletonCardProps) {
  return (
    <div
      className={`overflow-hidden bg-[var(--color-page)] ${className}`}
      style={{
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
      }}
    >
      {hasImage ? (
        <Skeleton
          width="100%"
          height={imageHeight}
          variant="rectangular"
          className="[border-radius:0]"
        />
      ) : null}
      <div style={{ padding: '1rem' }}>
        <Skeleton
          width="70%"
          height="1.25rem"
          className="mb-4"
        />
        <SkeletonText lines={lines} />
      </div>
    </div>
  );
}

export default Skeleton;
export { SkeletonText, SkeletonCard };
export type { SkeletonProps, SkeletonTextProps, SkeletonCardProps };
