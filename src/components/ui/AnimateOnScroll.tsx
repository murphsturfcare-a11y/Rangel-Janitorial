'use client';

import { type ReactNode, useRef, useState, useEffect, useSyncExternalStore } from 'react';
import { motion, useInView, useReducedMotion, type Variants } from 'framer-motion';

const subscribeHydration = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

type Direction = 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale';

interface AnimateOnScrollProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  once?: boolean;
  amount?: number;
}

const getVariants = (
  direction: Direction,
  distance: number,
  duration: number,
): Variants => {
  const hidden: Record<string, number> = { opacity: 0 };
  const visible: Record<string, number> = { opacity: 1 };

  switch (direction) {
    case 'up':
      hidden.y = distance;
      visible.y = 0;
      break;
    case 'down':
      hidden.y = -distance;
      visible.y = 0;
      break;
    case 'left':
      hidden.x = distance;
      visible.x = 0;
      break;
    case 'right':
      hidden.x = -distance;
      visible.x = 0;
      break;
    case 'scale':
      hidden.scale = 0.9;
      visible.scale = 1;
      break;
    case 'fade':
    default:
      break;
  }

  return {
    hidden,
    visible: {
      ...visible,
      transition: {
        duration,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };
};

export function AnimateOnScroll({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 40,
  className = '',
  once = true,
  amount = 0.05,
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount });
  const [fallbackVisible, setFallbackVisible] = useState(false);
  const isVisible = isInView || fallbackVisible;
  const hydrated = useSyncExternalStore(subscribeHydration, clientSnapshot, serverSnapshot);
  const reducedMotion = useReducedMotion();
  const variants = getVariants(direction, distance, duration);

  // Fallback: ensure content becomes visible even if observer never fires
  useEffect(() => {
    const timer = setTimeout(() => setFallbackVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={!hydrated || reducedMotion || isVisible ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Stagger container — wrap a grid/list, each direct child staggers in */
/* ------------------------------------------------------------------ */

interface StaggerContainerProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
  once?: boolean;
  amount?: number;
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  className = '',
  once = true,
  amount = 0.05,
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount });
  const [fallbackVisible, setFallbackVisible] = useState(false);
  const isVisible = isInView || fallbackVisible;
  const hydrated = useSyncExternalStore(subscribeHydration, clientSnapshot, serverSnapshot);
  const reducedMotion = useReducedMotion();

  // Fallback: ensure content becomes visible even if observer never fires
  useEffect(() => {
    const timer = setTimeout(() => setFallbackVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={!hydrated || reducedMotion || isVisible ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: staggerDelay },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Stagger item — direct child of StaggerContainer                     */
/* ------------------------------------------------------------------ */

interface StaggerItemProps {
  children: ReactNode;
  direction?: Direction;
  distance?: number;
  duration?: number;
  className?: string;
}

export function StaggerItem({
  children,
  direction = 'up',
  distance = 30,
  duration = 0.5,
  className = '',
}: StaggerItemProps) {
  const variants = getVariants(direction, distance, duration);

  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Counter — animates a number counting up                             */
/* ------------------------------------------------------------------ */

interface CounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export function Counter({
  value,
  suffix = '',
  prefix = '',
  duration = 2,
  className = '',
}: CounterProps) {
  return (
    <span className={className}>
      {prefix}
      <CounterInner target={value} duration={duration} />
      {suffix}
    </span>
  );
}

function CounterInner({ target, duration }: { target: number; duration: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(target);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [isInView, target, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

/* ------------------------------------------------------------------ */
/* Reduced motion hook                                                 */
/* ------------------------------------------------------------------ */

export { containerVariants };
