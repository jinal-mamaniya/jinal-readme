"use client";

import { useState, useRef, useEffect } from "react";
import {
  ATLAS_LINES,
  ATLAS_STATIONS,
  type AtlasLine,
  type AtlasStation,
  type LineId,
} from "@/data/stackAtlas";

/**
 * StackAtlas — Jinal's stack as a 6-line craft atlas.
 *
 *   - Desktop: subway-style map (StackSubwayMap inside this file)
 *   - Mobile:  vertical chapters with chip clouds (StackChapters)
 *
 * Same data, two artifacts — form follows device. Both views render in
 * the DOM, CSS shows/hides per viewport. No JS-side viewport detection.
 *
 * Pattern citation: subway-map convention as engineering-doc register
 * (Vignelli NYC; London Tube). Color carries categorization
 * information here — not decoration.
 */

/* SVG canvas dimensions for the vertical layout.
 *
 * 6 lines run top-to-bottom as columns spaced 180px apart. Stations
 * descend along each column. Labels render to the right of each station
 * — column spacing (180px) is wider than max label width (~140px) so
 * labels stay within their column.
 *
 * Map renders at intended size; horizontal scroll kicks in only on
 * containers narrower than 1100px. */
const MAP_WIDTH = 1100;
const MAP_HEIGHT = 820;
const Y_MARGIN_TOP = 60; // room for line-label headers
const Y_MARGIN_BOTTOM = 24;
const STATION_RADIUS = 7;
const JUNCTION_RADIUS = 10;
const TERMINAL_RADIUS = 11;
/* Label sits to the right of the station center */
const LABEL_OFFSET_RIGHT = 16;
const STATION_FONT_SIZE = 11;
const LINE_LABEL_FONT_SIZE = 13;

function yCoord(stationY: number): number {
  /* stationY is 0–100 (normalized along the line); maps to SVG y with
     top margin reserved for line-label headers. */
  return (
    Y_MARGIN_TOP +
    (stationY / 100) * (MAP_HEIGHT - Y_MARGIN_TOP - Y_MARGIN_BOTTOM)
  );
}

export function StackAtlas() {
  const [selectedStationId, setSelectedStationId] = useState<string | null>(
    null,
  );

  const selectedStation = selectedStationId
    ? ATLAS_STATIONS.find((s) => s.id === selectedStationId)
    : null;

  /* Bug fix — the detail panel renders below an 820px-tall map, so clicking
     a station near the top of the map placed the feedback far below the
     fold (a click that looked like nothing happened). Scroll the panel
     into view on selection. block:"nearest" means no scroll when it's
     already visible, so re-selecting nearby stations doesn't yank the
     viewport. */
  const detailRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (selectedStationId && detailRef.current) {
      detailRef.current.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [selectedStationId]);

  return (
    <div>
      {/* Caption + intro — 2-column at md+ so the right space carries the
          line legend (color key + station counts) instead of sitting
          empty. Mobile collapses to one column. */}
      <div className="md:flex md:items-start md:gap-12 mb-8">
        <div className="md:flex-1 md:min-w-0 mb-6 md:mb-0">
          <p
            className="font-mono-label mb-2"
            style={{ color: "var(--color-accent)" }}
          >
            Stack atlas
          </p>
          <h3
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(1.5rem, 2.4vw, 2rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              color: "var(--color-foreground)",
              marginBottom: "0.75rem",
            }}
          >
            Six lines, one map of the work.
          </h3>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "1rem",
              lineHeight: 1.55,
              color: "var(--color-text-muted)",
              fontStyle: "italic",
              maxWidth: "56ch",
            }}
          >
            Stack organized by what makes the work senior — discipline, data
            craft, AI-augmented practice, the multiplier work, judgment. The
            runtime sits at the bottom; it&apos;s the supporting layer, not
            the headline. Click any station for context.
          </p>
        </div>

        {/* Line legend — desktop only; mobile uses the chapter headers */}
        <div className="hidden md:block md:w-72 md:flex-shrink-0">
          <p
            className="font-mono-label mb-3 pb-2 border-b"
            style={{
              color: "var(--color-foreground)",
              borderColor: "var(--color-foreground)",
            }}
          >
            6 lines · {ATLAS_STATIONS.length} stations
          </p>
          <ul className="space-y-2">
            {ATLAS_LINES.map((line) => {
              const count = ATLAS_STATIONS.filter((s) =>
                s.lines.includes(line.id),
              ).length;
              return (
                <li
                  key={line.id}
                  className="grid grid-cols-[auto_1fr_auto] items-center gap-3"
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: "20px",
                      height: "4px",
                      borderRadius: "2px",
                      background: line.color,
                      display: "inline-block",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.9375rem",
                      fontWeight: 600,
                      color: "var(--color-foreground)",
                      lineHeight: 1.3,
                    }}
                  >
                    {line.label}
                  </span>
                  <span
                    className="font-mono-label tabular-nums"
                    style={{
                      color: "var(--color-cool-meta)",
                      fontSize: "0.75rem",
                    }}
                  >
                    {String(count).padStart(2, "0")}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Desktop: subway map */}
      <div className="hidden md:block">
        <StackSubwayMap
          selectedStationId={selectedStationId}
          onSelectStation={setSelectedStationId}
        />
      </div>

      {/* Mobile: vertical chapters */}
      <div className="md:hidden">
        <StackChapters
          selectedStationId={selectedStationId}
          onSelectStation={setSelectedStationId}
        />
      </div>

      {/* Detail panel (shared across both views) */}
      <div ref={detailRef}>
        {selectedStation && (
          <StationDetailPanel
            station={selectedStation}
            onClose={() => setSelectedStationId(null)}
          />
        )}
      </div>
    </div>
  );
}

/* ===== Desktop · Subway Map ============================================ */

function StackSubwayMap({
  selectedStationId,
  onSelectStation,
}: {
  selectedStationId: string | null;
  onSelectStation: (id: string | null) => void;
}) {
  /* Keyboard-focused station — drives the visible focus ring. Distinct from
     selectedStationId (click/Enter selection) so a keyboard user can tab
     across stations and see where they are before activating. */
  const [focusedStationId, setFocusedStationId] = useState<string | null>(null);

  return (
    /* width="100%" + viewBox lets the map scale to the container instead of
       forcing a fixed 1100px that horizontally scrolled (and cut off the
       Runtime line) at common widths. overflow-x-auto stays as a floor for
       very narrow desktop containers. */
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
        width="100%"
        style={{ display: "block", height: "auto", minWidth: "680px" }}
        /* role="group" (not "img") so the interactive station buttons inside
           stay in the accessibility tree — role="img" would expose the SVG
           as a single static graphic and hide every station from AT. */
        role="group"
        aria-label="Stack atlas — six craft dimensions; tab to a station and press Enter for detail"
      >
        {/* Line strokes — each line is a vertical track with stations descending */}
        {ATLAS_LINES.map((line) => {
          const stationsOnLine = ATLAS_STATIONS.filter((s) =>
            s.lines.includes(line.id),
          );
          if (stationsOnLine.length === 0) return null;
          const ys = stationsOnLine.map((s) => yCoord(s.y));
          const minY = Math.min(...ys);
          const maxY = Math.max(...ys);
          return (
            <g key={line.id}>
              {/* Vertical line stroke */}
              <line
                x1={line.xDesktop}
                y1={minY}
                x2={line.xDesktop}
                y2={maxY}
                stroke={line.color}
                strokeWidth={6}
                strokeLinecap="round"
                opacity={0.85}
              />
              {/* Line label — header at top of each column */}
              <text
                x={line.xDesktop}
                y={Y_MARGIN_TOP - 30}
                textAnchor="middle"
                style={{
                  fontFamily: "var(--font-mono, ui-monospace)",
                  fontSize: `${LINE_LABEL_FONT_SIZE}px`,
                  fontWeight: 600,
                  fill: line.color,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                {line.label}
              </text>
              {/* Small color-coded line tag below the label so the column
                  header has visual weight */}
              <line
                x1={line.xDesktop - 28}
                y1={Y_MARGIN_TOP - 18}
                x2={line.xDesktop + 28}
                y2={Y_MARGIN_TOP - 18}
                stroke={line.color}
                strokeWidth={3}
                strokeLinecap="round"
              />
            </g>
          );
        })}

        {/* Junction connectors — horizontal dashed segments linking a
            junction station to its secondary line(s) at the same y */}
        {ATLAS_STATIONS.filter((s) => s.lines.length > 1).map((station) => {
          const primaryLine = ATLAS_LINES.find(
            (l) => l.id === station.lines[0],
          );
          if (!primaryLine) return null;
          return station.lines.slice(1).map((secondaryLineId) => {
            const secondaryLine = ATLAS_LINES.find(
              (l) => l.id === secondaryLineId,
            );
            if (!secondaryLine) return null;
            const y = yCoord(station.y);
            return (
              <line
                key={`${station.id}-${secondaryLineId}`}
                x1={primaryLine.xDesktop}
                y1={y}
                x2={secondaryLine.xDesktop}
                y2={y}
                stroke={secondaryLine.color}
                strokeWidth={2}
                strokeLinecap="round"
                strokeDasharray="3,3"
                opacity={0.45}
              />
            );
          });
        })}

        {/* Stations */}
        {ATLAS_STATIONS.map((station) => {
          const primaryLine = ATLAS_LINES.find(
            (l) => l.id === station.lines[0],
          );
          if (!primaryLine) return null;
          const cx = primaryLine.xDesktop;
          const cy = yCoord(station.y);
          const radius =
            station.emphasis === "terminal"
              ? TERMINAL_RADIUS
              : station.emphasis === "junction" || station.lines.length > 1
                ? JUNCTION_RADIUS
                : STATION_RADIUS;
          const isSelected = station.id === selectedStationId;
          const isFocused = station.id === focusedStationId;
          /* Labels render to the right of every station. Column spacing
             (170px) accommodates max label width (~140px) without
             cross-column collision. */
          const labelX = cx + radius + LABEL_OFFSET_RIGHT;
          const labelTextAnchor: "start" | "end" = "start";
          const labelY = cy + 4; // baseline adjustment

          /* Accessible name — the station, the craft line(s) it sits on (so
             line membership reaches screen readers without relying on color),
             and the engineering context. */
          const lineNames = station.lines
            .map((id) => ATLAS_LINES.find((l) => l.id === id)?.label)
            .filter(Boolean)
            .join(", ");
          const ariaLabel = `${station.label}. ${lineNames}.${
            station.context ? ` ${station.context}` : ""
          }`;

          return (
            <g
              key={station.id}
              style={{ cursor: "pointer", outline: "none" }}
              tabIndex={0}
              role="button"
              aria-label={ariaLabel}
              aria-pressed={isSelected}
              onClick={() => onSelectStation(station.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelectStation(station.id);
                }
              }}
              onFocus={() => setFocusedStationId(station.id)}
              onBlur={() => setFocusedStationId(null)}
            >
              {/* Keyboard focus ring — dashed accent ring so a tabbing user
                  can see which station is focused before activating it. */}
              {isFocused && (
                <circle
                  cx={cx}
                  cy={cy}
                  r={radius + 7}
                  fill="none"
                  stroke="var(--color-accent)"
                  strokeWidth={2}
                  strokeDasharray="3,3"
                />
              )}
              {/* Station marker */}
              <circle
                cx={cx}
                cy={cy}
                r={radius + (isSelected ? 4 : 0)}
                fill="var(--color-background)"
                stroke={primaryLine.color}
                strokeWidth={isSelected ? 4 : 3}
              />
              {/* Junction interior — when station on multiple lines, fill with
                  secondary-line color ring */}
              {station.lines.length > 1 && (
                <circle
                  cx={cx}
                  cy={cy}
                  r={radius - 3}
                  fill={
                    ATLAS_LINES.find((l) => l.id === station.lines[1])?.color
                  }
                  opacity={0.6}
                />
              )}
              {/* Label — right of station (left-anchored) for all columns
                  except runtime (rightmost), which renders to the left. */}
              <text
                x={labelX}
                y={labelY}
                textAnchor={labelTextAnchor}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: `${STATION_FONT_SIZE}px`,
                  fontWeight: isSelected ? 700 : 500,
                  fill: isSelected
                    ? "var(--color-accent)"
                    : "var(--color-foreground)",
                  pointerEvents: "none",
                }}
              >
                {station.label}
              </text>
              {/* Larger invisible hit area for click */}
              <circle
                cx={cx}
                cy={cy}
                r={Math.max(radius + 6, 16)}
                fill="transparent"
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ===== Mobile · Vertical Chapters ====================================== */

function StackChapters({
  selectedStationId,
  onSelectStation,
}: {
  selectedStationId: string | null;
  onSelectStation: (id: string | null) => void;
}) {
  return (
    <div className="space-y-8">
      {ATLAS_LINES.map((line) => {
        const stationsOnLine = ATLAS_STATIONS.filter((s) =>
          s.lines.includes(line.id),
        );
        return (
          <section key={line.id}>
            {/* Line header — color stripe on left */}
            <div
              className="pl-4 mb-3"
              style={{
                borderLeft: `4px solid ${line.color}`,
              }}
            >
              <h4
                className="font-mono-label"
                style={{
                  color: line.color,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  fontSize: "0.875rem",
                  marginBottom: "0.5rem",
                }}
              >
                {line.label}
              </h4>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.9375rem",
                  lineHeight: 1.5,
                  color: "var(--color-text-muted)",
                  fontStyle: "italic",
                  maxWidth: "60ch",
                }}
              >
                {line.thesis}
              </p>
            </div>
            {/* Chip cloud */}
            <div className="flex flex-wrap gap-2 pl-4">
              {stationsOnLine.map((station) => {
                const isSelected = station.id === selectedStationId;
                const isJunction = station.lines.length > 1;
                return (
                  <button
                    key={station.id}
                    type="button"
                    onClick={() =>
                      onSelectStation(isSelected ? null : station.id)
                    }
                    className="font-mono-label rounded-sm transition-colors duration-100 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
                    style={{
                      padding: "0.5rem 0.75rem",
                      minHeight: "32px",
                      fontSize: "0.8125rem",
                      background: isSelected
                        ? line.color
                        : "var(--color-background)",
                      color: isSelected
                        ? "var(--color-background)"
                        : "var(--color-foreground)",
                      border: `1px solid ${
                        isJunction ? line.color : "var(--color-border)"
                      }`,
                      cursor: "pointer",
                    }}
                  >
                    {station.label}
                    {isJunction && (
                      <span
                        aria-hidden="true"
                        style={{
                          marginLeft: "0.375rem",
                          opacity: 0.6,
                          fontSize: "0.6875rem",
                        }}
                      >
                        ⇄
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}

/* ===== Station detail panel (shared) =================================== */

function StationDetailPanel({
  station,
  onClose,
}: {
  station: AtlasStation;
  onClose: () => void;
}) {
  const lineColors = station.lines
    .map((id) => ATLAS_LINES.find((l) => l.id === id))
    .filter((l): l is AtlasLine => !!l);

  return (
    <div
      className="mt-8 p-6 rounded-sm"
      style={{
        background: "var(--color-background)",
        border: "1px solid var(--color-border)",
      }}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            {lineColors.map((line) => (
              <span
                key={line.id}
                className="font-mono-label"
                style={{
                  color: line.color,
                  fontSize: "0.6875rem",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  padding: "2px 6px",
                  border: `1px solid ${line.color}`,
                  borderRadius: "2px",
                }}
              >
                {line.label}
              </span>
            ))}
          </div>
          <h4
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "1.25rem",
              fontWeight: 700,
              letterSpacing: "-0.01em",
              color: "var(--color-foreground)",
            }}
          >
            {station.label}
          </h4>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="font-mono-label transition-colors focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded-sm"
          style={{
            color: "var(--color-cool-meta)",
            cursor: "pointer",
            padding: "4px 8px",
            minHeight: "32px",
            fontSize: "0.75rem",
          }}
          aria-label="Close station detail"
        >
          close ✕
        </button>
      </div>
      {station.context && (
        <p
          className="mb-4"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.9375rem",
            lineHeight: 1.55,
            color: "var(--color-text)",
            maxWidth: "68ch",
          }}
        >
          {station.context}
        </p>
      )}
      {station.chapters && station.chapters.length > 0 && (
        <div className="flex flex-wrap gap-3">
          <span
            className="font-mono-label"
            style={{ color: "var(--color-cool-meta)", fontSize: "0.75rem" }}
          >
            chapters:
          </span>
          {station.chapters.map((c) => (
            <a
              key={c.href}
              href={c.href}
              className="font-mono-label transition-colors focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded-sm"
              style={{
                color: "var(--color-accent)",
                textDecoration: "underline",
                textUnderlineOffset: "2px",
                fontSize: "0.75rem",
              }}
            >
              {c.label} →
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

/* Helper export so EngineeringDecisionTree can detect line IDs if needed */
export type { LineId };
