import { useEffect, useState } from "react";

interface UseCounterProps {
  target: number;
  duration?: number;
  start?: boolean;
}

export function useCounter({ target, duration = 2000, start = true }: UseCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number;
    const startVal = Math.max(0, target - 1500);

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(startVal + ease * (target - startVal)));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);

  return count;
}
