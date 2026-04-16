'use client';

import { useEffect, useRef, useState } from 'react';

interface CountdownTimerProps {
  targetDate: string;
  onComplete?: () => void;
  variant?: 'default' | 'compact';
  className?: string;
}

type TimeUnit = 'days' | 'hours' | 'minutes' | 'seconds';

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
}

const TIME_UNITS: TimeUnit[] = ['days', 'hours', 'minutes', 'seconds'];

const LABELS: Record<TimeUnit, string> = {
  days: 'Days',
  hours: 'Hrs',
  minutes: 'Min',
  seconds: 'Sec',
};

function calculateTimeRemaining(targetDate: string): TimeRemaining {
  const targetTime = new Date(targetDate).getTime();

  if (!Number.isFinite(targetTime)) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isComplete: true,
    };
  }

  const totalSeconds = Math.max(0, Math.floor((targetTime - Date.now()) / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
    isComplete: totalSeconds <= 0,
  };
}

function formatUnit(value: number) {
  return value < 10 ? `0${value}` : String(value);
}

function getDisplayValues(remaining: TimeRemaining): Record<TimeUnit, string> {
  return {
    days: formatUnit(remaining.days),
    hours: formatUnit(remaining.hours),
    minutes: formatUnit(remaining.minutes),
    seconds: formatUnit(remaining.seconds),
  };
}

function CountdownTimer({
  targetDate,
  onComplete,
  variant = 'default',
  className = '',
}: CountdownTimerProps) {
  const [remaining, setRemaining] = useState<TimeRemaining>(() =>
    calculateTimeRemaining(targetDate),
  );
  const [tickingUnits, setTickingUnits] = useState<TimeUnit[]>([]);
  const previousValuesRef = useRef<Record<TimeUnit, string>>(
    getDisplayValues(remaining),
  );
  const completeRef = useRef(false);

  useEffect(() => {
    completeRef.current = false;

    const updateRemaining = () => {
      const nextRemaining = calculateTimeRemaining(targetDate);
      setRemaining(nextRemaining);

      if (nextRemaining.isComplete && !completeRef.current) {
        completeRef.current = true;
        onComplete?.();
        return true;
      }

      return false;
    };

    if (updateRemaining()) {
      return;
    }

    const intervalId = window.setInterval(() => {
      if (updateRemaining()) {
        window.clearInterval(intervalId);
      }
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [onComplete, targetDate]);

  useEffect(() => {
    const nextValues = getDisplayValues(remaining);
    const changedUnits = TIME_UNITS.filter(
      (unit) => previousValuesRef.current[unit] !== nextValues[unit],
    );

    previousValuesRef.current = nextValues;

    if (changedUnits.length === 0) {
      return;
    }

    setTickingUnits(changedUnits);
    const timeoutId = window.setTimeout(() => {
      setTickingUnits([]);
    }, 200);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [remaining]);

  const displayValues = getDisplayValues(remaining);

  if (variant === 'compact') {
    if (remaining.isComplete) {
      return (
        <>
          <style>{`
            @keyframes countdown-tick {
              0% { transform: scale(1); }
              50% { transform: scale(1.1); }
              100% { transform: scale(1); }
            }

            .animate-tick {
              animation: countdown-tick 200ms ease-out;
            }
          `}</style>
          <span className={`text-sm font-mono text-[var(--color-muted)] ${className}`}>
            Ended
          </span>
        </>
      );
    }

    return (
      <>
        <style>{`
          @keyframes countdown-tick {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }

          .animate-tick {
            animation: countdown-tick 200ms ease-out;
          }
        `}</style>
        <span className={`text-sm font-mono text-[var(--color-muted)] ${className}`}>
          {TIME_UNITS.map((unit, index) => (
            <span key={unit}>
              {index > 0 ? ' ' : ''}
              <span
                className={`inline-block font-medium text-[var(--color-ink)] ${
                  tickingUnits.includes(unit) ? 'animate-tick' : ''
                }`}
              >
                {displayValues[unit]}
              </span>
              {unit === 'days'
                ? 'd'
                : unit === 'hours'
                  ? 'h'
                  : unit === 'minutes'
                    ? 'm'
                    : 's'}
            </span>
          ))}
        </span>
      </>
    );
  }

  return (
    <>
      <style>{`
        @keyframes countdown-tick {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        .animate-tick {
          animation: countdown-tick 200ms ease-out;
        }
      `}</style>
      <div className={`flex items-center justify-center gap-2 ${className}`}>
        {TIME_UNITS.map((unit, index) => (
          <div key={unit} className="flex items-center gap-2">
            {index > 0 ? (
              <span className="text-2xl font-mono text-[var(--color-muted)]">:</span>
            ) : null}
            <div className="min-w-[4.5rem] rounded-lg bg-[var(--color-surface)] px-4 py-3 text-center">
              <span
                className={`inline-block font-mono text-3xl font-bold text-[var(--color-ink)] ${
                  tickingUnits.includes(unit) ? 'animate-tick' : ''
                }`}
              >
                {displayValues[unit]}
              </span>
              <span className="block text-xs uppercase tracking-wider text-[var(--color-muted)]">
                {LABELS[unit]}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default CountdownTimer;
export type { CountdownTimerProps };
