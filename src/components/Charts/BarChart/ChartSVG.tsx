import React from 'react';

import {
  lines,
  tspan,
  barLabel,
  barsChart,
  generateCountries,
  transform,
  transformValue,
  percentPosition,
  percentLine,
} from './ChartSVG.helper';
import * as Styles from './BarChartstyles';

interface ChartSVGProps {
  data: number[];
  labels?: string[];
}

type TLinearGradientProps = {
  y1: number;
  y2: number;
};

const VIEW_BOX_HEIGHT = 322;

const percentRange = [0, 20, 40, 60, 80, 100];

export default function ChartSVG({ data, labels }: ChartSVGProps) {
  if (!labels?.length || !data.length) {
    return null;
  }
  const sum = data.reduce((a, b) => a + b);
  const showTooltip = (evt: React.MouseEvent<SVGRectElement, MouseEvent>, index: number) => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const tooltip = document.getElementById('tooltip');
    if (tooltip) {
      const item = data[index];
      tooltip.innerHTML = `<div class="tooltip-wrapper"><div class="tooltip-country">${
        labels[index]
      }</div><div class="tooltip-info">Quantity: ${item}(${((item * 100) / sum).toFixed(
        2,
      )}%)</div></div>`;
      tooltip.style.display = 'block';
      tooltip.style.left = `${evt.pageX + 10}px`;
      tooltip.style.top = `${evt.pageY - scrollTop + 10}px`;
    }
  };

  const hideTooltip = () => {
    const tooltip = document.getElementById('tooltip');
    if (tooltip) {
      tooltip.style.display = 'none';
    }
  };
  const shortLabels = generateCountries(labels);
  const linearGradient: TLinearGradientProps[] = [];

  return (
    <Styles.ChartSVGWrapper>
      <Styles.ChartSVGTooltip id="tooltip" />
      <svg width="100%" viewBox="0 0 610 322" fill="none" xmlns="http://www.w3.org/2000/svg">
        {shortLabels.map((label, index) => (
          <g key={label}>
            <text
              xmlSpace="preserve"
              letterSpacing="0em"
              style={{ transform: `translateX(${transform[index]}px)` }}
              className="chart-label"
            >
              <tspan x={tspan[index]?.x} y={tspan[index]?.y}>
                {label}
              </tspan>
            </text>
            <path
              d={lines[index]}
              stroke="#718EBF"
              style={{ transform: `translateX(${transform[index]}px)` }}
            />
          </g>
        ))}

        {percentRange.map((item, index) => (
          <g key={item}>
            <path
              d="M35.9395 278.968H42.3271"
              stroke="#718EBF"
              style={{ transform: `translateY(${percentLine[index]}px)` }}
            />
            <text xmlSpace="preserve" letterSpacing="0em" className="chart-label-percent">
              <tspan x={percentPosition[index].x} y={percentPosition[index].y}>
                {item}%
              </tspan>
            </text>
            <path
              d="M43 278.967H610"
              stroke="#DFE5EE"
              strokeDasharray="4 4"
              style={{ transform: `translateY(${percentLine[index]}px)` }}
            />
          </g>
        ))}

        {data.map((item, index) => {
          const percent = Math.floor((item * 100) / sum);
          const height = (percent * VIEW_BOX_HEIGHT) / 100 - 15;
          linearGradient.push({
            y1: VIEW_BOX_HEIGHT - height - 42,
            y2: VIEW_BOX_HEIGHT,
          });
          return (
            <rect
              key={item}
              width="44"
              height={height}
              y={VIEW_BOX_HEIGHT - height - 42}
              x={barsChart[index].x}
              fill={barsChart[index].fill}
              rx="5"
              onMouseMove={e => showTooltip(e, index)}
              onMouseOut={hideTooltip}
            />
          );
        })}

        {data.map((item, index) => (
          <text
            xmlSpace="preserve"
            fontSize="12"
            letterSpacing="0em"
            key={item}
            style={{ transform: `translateX(${transformValue[index]}px)` }}
            className="chart-label-value"
          >
            <tspan x={barLabel[index].x} y={barLabel[index].y}>
              {item}
            </tspan>
          </text>
        ))}

        <defs>
          <linearGradient
            id="paint0_linear_8260_41311"
            x1="16.5"
            y1={linearGradient[0].y1 || 0}
            x2="16.5"
            y2={linearGradient[0].y2 || VIEW_BOX_HEIGHT}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.29913" stopColor="#D4B9FF" />
            <stop offset="1" stopColor="#FF82AC" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_8260_41311"
            x1="240.5"
            y1={linearGradient[1].y1 || 0}
            x2="240.5"
            y2={linearGradient[1].y2 || VIEW_BOX_HEIGHT}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.29913" stopColor="#D4B9FF" />
            <stop offset="1" stopColor="#FF82AC" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id="paint2_linear_8260_41311"
            x1="480.5"
            y1={linearGradient[2].y1 || 0}
            x2="480.5"
            y2={linearGradient[2].y2 || VIEW_BOX_HEIGHT}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.29913" stopColor="#D4B9FF" />
            <stop offset="1" stopColor="#FF82AC" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id="paint3_linear_8260_41311"
            x1="160.5"
            y1={linearGradient[3].y1 || 0}
            x2="160.5"
            y2={linearGradient[3].y2 || VIEW_BOX_HEIGHT}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.29913" stopColor="#D4B9FF" />
            <stop offset="1" stopColor="#FF82AC" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id="paint4_linear_8260_41311"
            x1="400.5"
            y1={linearGradient[4].y1 || 0}
            x2="400.5"
            y2={linearGradient[4].y2 || VIEW_BOX_HEIGHT}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.29913" stopColor="#D4B9FF" />
            <stop offset="1" stopColor="#FF82AC" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id="paint5_linear_8260_41311"
            x1="320.5"
            y1={linearGradient[5]?.y1 || 0}
            x2="320.5"
            y2={linearGradient[5]?.y2 || VIEW_BOX_HEIGHT}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.29913" stopColor="#D4B9FF" />
            <stop offset="1" stopColor="#FF82AC" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id="paint6_linear_8260_41311"
            x1="560.5"
            y1={linearGradient[6]?.y1 || 0}
            x2="560.5"
            y2={linearGradient[6]?.y2 || VIEW_BOX_HEIGHT}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.29913" stopColor="#D4B9FF" />
            <stop offset="1" stopColor="#FF82AC" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </Styles.ChartSVGWrapper>
  );
}

ChartSVG.defaultProps = {
  labels: [],
};
