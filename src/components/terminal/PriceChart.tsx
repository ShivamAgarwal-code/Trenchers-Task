"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TIMEFRAMES = ["1m", "5m", "15m", "1H", "4H", "1D"] as const;

interface Candle {
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  time: string;
}

function generateCandleData(count: number): Candle[] {
  const data: Candle[] = [];
  let price = 0.00045;
  const baseTime = Date.now() - count * 5 * 60 * 1000;
  for (let i = 0; i < count; i++) {
    const change = (Math.random() - 0.48) * 0.00004;
    const open = price;
    const close = price + change;
    const high = Math.max(open, close) + Math.random() * 0.00002;
    const low = Math.min(open, close) - Math.random() * 0.00002;
    const volume = 50000 + Math.random() * 200000;
    const t = new Date(baseTime + i * 5 * 60 * 1000);
    const time = `${t.getHours().toString().padStart(2, "0")}:${t.getMinutes().toString().padStart(2, "0")}`;
    data.push({ open, high, low, close, volume, time });
    price = close;
  }
  return data;
}

export default function PriceChart() {
  const [activeTimeframe, setActiveTimeframe] = useState<string>("5m");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const candles = useMemo(() => generateCandleData(60), []);

  const maxPrice = Math.max(...candles.map((c) => c.high));
  const minPrice = Math.min(...candles.map((c) => c.low));
  const priceRange = maxPrice - minPrice;
  const maxVolume = Math.max(...candles.map((c) => c.volume));

  const chartWidth = 100;
  const chartHeight = 100;
  const candleWidth = chartWidth / candles.length;

  const hovered = hoveredIndex !== null ? candles[hoveredIndex] : null;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const index = Math.floor((x / rect.width) * candles.length);
      if (index >= 0 && index < candles.length) {
        setHoveredIndex(index);
      }
    },
    [candles.length]
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="border border-border rounded-xl bg-surface p-3 sm:p-4 flex flex-col"
    >
      {/* Top bar: timeframes + OHLC tooltip */}
      <div className="flex items-center justify-between mb-3 gap-2">
        <div className="flex items-center gap-0.5 sm:gap-1 overflow-x-auto scrollbar-hide">
          {TIMEFRAMES.map((tf) => (
            <button
              key={tf}
              onClick={() => setActiveTimeframe(tf)}
              className={`px-2 sm:px-2.5 py-1 rounded text-xs font-mono font-medium transition-colors shrink-0 ${
                activeTimeframe === tf
                  ? "bg-accent/15 text-accent"
                  : "text-muted hover:text-foreground hover:bg-surface-light"
              }`}
            >
              {tf}
            </button>
          ))}
        </div>

        {/* OHLC tooltip on hover */}
        {hovered ? (
          <div className="hidden sm:flex items-center gap-3 text-[10px] font-mono text-muted">
            <span>O <span className="text-foreground">{hovered.open.toFixed(6)}</span></span>
            <span>H <span className="text-foreground">{hovered.high.toFixed(6)}</span></span>
            <span>L <span className="text-foreground">{hovered.low.toFixed(6)}</span></span>
            <span>C <span className={hovered.close >= hovered.open ? "text-accent-green" : "text-accent-red"}>{hovered.close.toFixed(6)}</span></span>
            <span>V <span className="text-foreground">{(hovered.volume / 1000).toFixed(0)}K</span></span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-accent-green animate-live-pulse" />
            <span className="text-xs font-mono text-muted">LIVE</span>
          </div>
        )}
      </div>

      {/* Chart area */}
      <div className="relative flex-1 min-h-[220px] sm:min-h-[300px] md:min-h-[350px]">
        {/* Price scale */}
        <div className="absolute right-0 top-0 bottom-8 w-14 sm:w-16 flex flex-col justify-between text-[9px] sm:text-[10px] font-mono text-muted/60 text-right z-10">
          {[0, 0.25, 0.5, 0.75, 1].map((pct) => (
            <span key={pct}>
              {(maxPrice - priceRange * pct).toFixed(6)}
            </span>
          ))}
        </div>

        {/* Grid lines */}
        <svg
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
        >
          {[0, 25, 50, 75, 100].map((y) => (
            <line
              key={y}
              x1="0"
              y1={`${y}%`}
              x2="100%"
              y2={`${y}%`}
              stroke="var(--border)"
              strokeWidth="0.5"
              strokeDasharray="4 4"
            />
          ))}
        </svg>

        {/* Candles SVG */}
        <AnimatePresence mode="wait">
          <motion.svg
            key={activeTimeframe}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-[calc(100%-56px)] sm:w-[calc(100%-64px)] h-[calc(100%-32px)] cursor-crosshair"
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            preserveAspectRatio="none"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {candles.map((candle, i) => {
              const x = i * candleWidth + candleWidth * 0.2;
              const bodyWidth = candleWidth * 0.6;
              const isGreen = candle.close >= candle.open;

              const highY =
                ((maxPrice - candle.high) / priceRange) * chartHeight;
              const lowY =
                ((maxPrice - candle.low) / priceRange) * chartHeight;
              const openY =
                ((maxPrice - candle.open) / priceRange) * chartHeight;
              const closeY =
                ((maxPrice - candle.close) / priceRange) * chartHeight;

              const bodyTop = Math.min(openY, closeY);
              const bodyHeight = Math.max(Math.abs(closeY - openY), 0.3);
              const isHovered = hoveredIndex === i;

              return (
                <g key={i}>
                  {/* Wick */}
                  <line
                    x1={x + bodyWidth / 2}
                    y1={highY}
                    x2={x + bodyWidth / 2}
                    y2={lowY}
                    stroke={isGreen ? "var(--accent-green)" : "var(--accent-red)"}
                    strokeWidth={0.15}
                    opacity={isHovered ? 1 : 0.7}
                  />
                  {/* Body */}
                  <rect
                    x={x}
                    y={bodyTop}
                    width={bodyWidth}
                    height={bodyHeight}
                    fill={isGreen ? "var(--accent-green)" : "var(--accent-red)"}
                    opacity={isHovered ? 1 : 0.85}
                    rx={0.1}
                  />
                  {/* Hover highlight column */}
                  {isHovered && (
                    <rect
                      x={i * candleWidth}
                      y={0}
                      width={candleWidth}
                      height={chartHeight}
                      fill="var(--accent)"
                      opacity={0.04}
                    />
                  )}
                </g>
              );
            })}

            {/* Crosshair horizontal line */}
            {hoveredIndex !== null && hovered && (
              <line
                x1={0}
                y1={((maxPrice - hovered.close) / priceRange) * chartHeight}
                x2={chartWidth}
                y2={((maxPrice - hovered.close) / priceRange) * chartHeight}
                stroke="var(--accent)"
                strokeWidth={0.15}
                strokeDasharray="1 1"
                opacity={0.5}
              />
            )}
          </motion.svg>
        </AnimatePresence>

        {/* Volume bars */}
        <div className="absolute bottom-0 left-0 right-14 sm:right-16 h-8 flex items-end gap-px">
          {candles.map((candle, i) => {
            const heightPct = (candle.volume / maxVolume) * 100;
            const isGreen = candle.close >= candle.open;
            const isHovered = hoveredIndex === i;
            return (
              <div
                key={i}
                className="flex-1 transition-opacity"
                style={{
                  height: `${heightPct}%`,
                  backgroundColor: isGreen
                    ? `rgba(0, 230, 118, ${isHovered ? 0.35 : 0.15})`
                    : `rgba(255, 61, 87, ${isHovered ? 0.35 : 0.15})`,
                }}
              />
            );
          })}
        </div>

        {/* Time label on hover */}
        {hoveredIndex !== null && hovered && (
          <div
            className="absolute bottom-0 text-[9px] font-mono text-accent bg-surface-light px-1.5 py-0.5 rounded -translate-x-1/2 pointer-events-none"
            style={{
              left: `${((hoveredIndex + 0.5) / candles.length) * (100 - 10)}%`,
            }}
          >
            {hovered.time}
          </div>
        )}
      </div>
    </motion.div>
  );
}
