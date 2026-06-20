import React from 'react';

const SkeletonBox = ({ className }) => (
  <div className={`animate-pulse rounded-lg bg-[var(--color-surface-3)] ${className}`} />
);

const SkeletonLoader = () => {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1.5">
          <SkeletonBox className="h-5 w-32" />
          <SkeletonBox className="h-3.5 w-48" />
        </div>
        <SkeletonBox className="h-8 w-24" />
      </div>

      {/* Balance Hero */}
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6">
        <SkeletonBox className="h-3.5 w-24 mb-3" />
        <SkeletonBox className="h-10 w-48" />
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-5">
            <div className="flex justify-between mb-3">
              <SkeletonBox className="h-3 w-24" />
              <SkeletonBox className="h-8 w-8 rounded-lg" />
            </div>
            <SkeletonBox className="h-7 w-32" />
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6">
            <SkeletonBox className="h-4 w-36 mb-1" />
            <SkeletonBox className="h-3 w-24 mb-5" />
            <SkeletonBox className="h-48 w-full rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonLoader;
