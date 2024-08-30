import * as echarts from 'echarts';
import { EChartsOption } from 'echarts-for-react';
import { format } from 'date-fns';

// aplication
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { getCurrencyName } from '@utils/appInfo';
import { TThemeInitOption } from '@utils/constants/types';
import { periods } from '@utils/constants/statistics';
import {
  PeriodTypes,
  generateXAxisInterval,
  generateXAxisIntervalForScatterChart,
  balanceHistoryXAxisInterval,
  TGranularity,
  getYAxisLabel,
  convertYAxisLabel,
  generateXAxisIntervalSmallChart,
} from '@utils/helpers/statisticsLib';
import { TChartParams } from '@utils/types/IStatistics';
import { translateDropdown } from '@utils/helpers/i18n';

type TAxisPointerProps = {
  axisDimension: string;
  value: number;
};

type TChartOption = {
  [index: string]: EChartsOption;
};

type TTxInBlock = {
  value: string[][];
};

export const generateXAxisLabel = (
  value: Date,
  period?: PeriodTypes,
  isShowMinutesFor24h?: boolean,
) => {
  if (!value) {
    return '';
  }

  if (!period) {
    return value;
  }
  return period === '24h'
    ? format(value, `hh:${isShowMinutesFor24h ? 'mm' : '00'} aa`)
    : format(value, 'MM/dd/yyyy');
};

export const generateTooltipLabel = (value: Date, granularity: TGranularity | undefined) => {
  if (granularity && granularity !== 'none') {
    return format(value, 'MM/dd/yyyy');
  }
  return format(value, 'MM/dd/yyyy hh:mm aa');
};

export function getThemeInitOption(args: TThemeInitOption): EChartsOption {
  const {
    theme,
    data,
    dataX,
    dataY,
    dataY1,
    dataY2,
    chartName,
    minY,
    maxY,
    period,
    granularity,
    width,
    darkMode,
  } = args;
  let firstDay = '';
  const blueColor = darkMode ? '#1fbfff' : '#5470c6';
  const chartOptions: TChartOption = {
    difficulty: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      color: ['#cd6661'],
      grid: {
        top: 8,
        right: 40,
        bottom: 70,
        left: 55,
        show: false,
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 100,
        },
        {
          start: 0,
          end: 100,
        },
      ],
      tooltip: {
        trigger: 'axis',
        formatter(params: TChartParams[]) {
          return `
            <div class="tooltip-item-wrapper">
              <div class="item-label">${generateTooltipLabel(
                new Date(params[0].axisValue),
                granularity,
              )}</div>
              <div class="tooltip-value">${params[0].marker} ${formatNumber(params[0].value, {
                decimalsLength: 5,
              })}</div>
            </div>
          `;
        },
      },
      xAxis: {
        type: 'category',
        data: dataX,
        boundaryGap: false,
        axisLabel: {
          formatter(value: string, index: number) {
            let isShowMinutesFor24h = false;
            if (period === '24h' && dataX && (index === 0 || dataX.length - 1 === index)) {
              isShowMinutesFor24h = true;
            }
            if (period && periods[9].indexOf(period) !== -1) {
              const date = format(new Date(value), 'MM/dd/yyyy');
              if (firstDay !== date) {
                firstDay = date;
                return generateXAxisLabel(new Date(value), period, isShowMinutesFor24h);
              }

              return null;
            }
            return value ? generateXAxisLabel(new Date(value), period, isShowMinutesFor24h) : null;
          },
          showMaxLabel: true,
          interval: generateXAxisInterval('1d', period, dataX, width),
        },
      },
      yAxis: {
        type: 'value',
        min: minY,
        max: maxY,
        interval: (maxY - minY) / 5,
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
        },
        axisLabel: {
          formatter(value: string) {
            return getYAxisLabel(Number(value), minY, maxY);
          },
        },
      },
      series: {
        type: 'line',
        showSymbol: false,
        data: dataY,
        emphasis: {
          lineStyle: {
            width: 2,
          },
        },
      },
      animation: false,
    },
    hashrate: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      color: [blueColor],
      grid: {
        top: 8,
        right: 40,
        bottom: 70,
        left: 60,
        show: false,
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 100,
        },
        {
          start: 0,
          end: 100,
        },
      ],
      tooltip: {
        trigger: 'axis',
        formatter(params: TChartParams[]) {
          return `
            <div class="tooltip-item-wrapper">
              <div class="item-label">${generateTooltipLabel(
                new Date(params[0].axisValue),
                granularity,
              )}</div>
              <div class="tooltip-value">${params[0].marker} ${formatNumber(
                params[0].value / 1000000,
                { decimalsLength: 2 },
              )} ${translateDropdown('chartOptions.mSolS')}</div>
            </div>
          `;
        },
      },
      xAxis: {
        type: 'category',
        data: dataX,
        boundaryGap: false,
        axisLabel: {
          formatter(value: string, index: number) {
            let isShowMinutesFor24h = false;
            if (period === '24h' && dataX && (index === 0 || dataX.length - 1 === index)) {
              isShowMinutesFor24h = true;
            }
            if (dataX?.length && dataX?.length > 4 && period && periods[9].indexOf(period) !== -1) {
              const date = format(new Date(value), 'MM/dd/yyyy');
              if (firstDay !== date) {
                firstDay = date;
                return generateXAxisLabel(new Date(value), period, isShowMinutesFor24h);
              }

              return null;
            }
            return value ? generateXAxisLabel(new Date(value), period, isShowMinutesFor24h) : null;
          },
          showMaxLabel: true,
          interval: generateXAxisInterval('1d', period, dataX, width),
        },
      },
      yAxis: {
        type: 'value',
        min: minY,
        max: maxY,
        interval: (maxY - minY) / 5,
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
        },
        axisLabel: {
          formatter(value: string) {
            return getYAxisLabel(Number(value), minY, maxY);
          },
        },
      },
      series: {
        type: 'line',
        symbol: false,
        showSymbol: false,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: blueColor,
            },
            {
              offset: 1,
              color: theme?.backgroundColor || '#fff',
            },
          ]),
        },
        data: dataY,
        emphasis: {
          lineStyle: {
            width: 2,
          },
        },
      },
      animation: false,
    },
    networktotals: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      color: ['#cd6661', blueColor],
      grid: {
        top: 30,
        right: 40,
        bottom: 70,
        left: 60,
        show: false,
      },
      tooltip: {
        trigger: 'axis',
        formatter(params: TChartParams[]) {
          let html = '';
          params.forEach(item => {
            html += `
              <div class="tooltip-item">
                <div class="item-label">${item.marker} ${item.seriesName}:</div>
                <div class="item-value">${formatNumber(item.value, { decimalsLength: 2 })}
                ${translateDropdown('chartOptions.kBS')}</div>
              </div>
            `;
          });
          return `
            <div class="tooltip-container">
              <div class="tooltip-data-date">${params[0].name}</div>
              <div>${html}</div>
            </div>
          `;
        },
      },
      legend: {
        top: 10,
        right: 10,
        data: [
          translateDropdown('chartOptions.trafficReceived'),
          translateDropdown('chartOptions.trafficSent'),
        ],
        textStyle: {
          color: theme?.color,
        },
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 100,
        },
        {
          start: 0,
          end: 100,
        },
      ],
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: dataX,
        axisLabel: {
          formatter(value: string, index: number) {
            let isShowMinutesFor24h = false;
            if (period === '24h' && dataX && (index === 0 || dataX.length - 1 === index)) {
              isShowMinutesFor24h = true;
            }
            if (dataX?.length && dataX?.length > 4 && period && periods[9].indexOf(period) !== -1) {
              const date = format(new Date(value), 'MM/dd/yyyy');
              if (firstDay !== date) {
                firstDay = date;
                return generateXAxisLabel(new Date(value), period, isShowMinutesFor24h);
              }

              return null;
            }
            return value ? generateXAxisLabel(new Date(value), period, isShowMinutesFor24h) : null;
          },
          showMaxLabel: true,
          interval: generateXAxisInterval('1d', period, dataX, width),
        },
      },
      yAxis: {
        type: 'value',
        splitLine: {
          show: false,
        },
        axisLabel: {
          formatter(value: string) {
            return convertYAxisLabel(Number(value), maxY, 2);
          },
        },
        axisLine: {
          show: true,
        },
      },
      series: [
        {
          name: translateDropdown('chartOptions.trafficReceived'),
          type: 'line',
          lineStyle: {
            width: 2,
          },
          showSymbol: false,
          emphasis: {
            focus: 'series',
          },
          data: dataY1,
          zlevel: 2,
        },
        {
          name: translateDropdown('chartOptions.trafficSent'),
          type: 'line',
          lineStyle: {
            width: 2,
          },
          showSymbol: false,
          emphasis: {
            focus: 'series',
          },
          data: dataY2,
          zlevel: 1,
        },
      ],
      animation: false,
    },
    mempoolsize: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      grid: {
        top: 8,
        right: 40,
        bottom: 70,
        left: 60,
        show: false,
      },
      tooltip: {
        trigger: 'axis',
        formatter(params: TChartParams[]) {
          return `
            <div class="tooltip-item-wrapper">
              <div class="item-label">${generateTooltipLabel(
                new Date(params[0].axisValue),
                granularity,
              )}</div>
              <div class="item-value">${params[0].marker} ${formatNumber(params[0].value, {
                decimalsLength: 2,
              })} ${translateDropdown('chartOptions.kB')}</div>
            </div>
          `;
        },
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 100,
        },
        {
          start: 0,
          end: 100,
        },
      ],
      xAxis: {
        type: 'category',
        data: dataX,
        axisLabel: {
          formatter(value: string, index: number) {
            let isShowMinutesFor24h = false;
            if (period === '24h' && dataX && (index === 0 || dataX.length - 1 === index)) {
              isShowMinutesFor24h = true;
            }
            return generateXAxisLabel(new Date(value), period, isShowMinutesFor24h);
          },
          showMaxLabel: true,
          interval: generateXAxisInterval('1d', period, dataX, width),
        },
      },
      yAxis: {
        type: 'value',
        min: minY,
        max: maxY,
        interval: (maxY - minY) / 5,
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
        },
        axisLabel: {
          formatter(value: string) {
            return getYAxisLabel(Number(value), minY, maxY);
          },
        },
      },
      series: {
        type: 'line',
        lineStyle: {
          color: blueColor,
        },
        symbol: false,
        showSymbol: false,
        data: dataY,
        emphasis: {
          lineStyle: {
            width: 2,
          },
        },
      },
      animation: false,
    },
    averageblocksize: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      color: [blueColor],
      grid: {
        top: 8,
        right: 40,
        bottom: 70,
        left: 60,
        show: false,
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 100,
        },
        {
          start: 0,
          end: 100,
        },
      ],
      tooltip: {
        trigger: 'axis',
        formatter(params: TChartParams[]) {
          let label = translateDropdown('chartOptions.averagePerHour');
          switch (granularity) {
            case '1d':
              label = translateDropdown('chartOptions.averagePerDay');
              break;
            case '30d':
              label = translateDropdown('chartOptions.averagePerMonth');
              break;
            case '1y':
              label = translateDropdown('chartOptions.averagePerYear');
              break;
            default:
              break;
          }
          return `
            <div class="tooltip-item-wrapper">
              <div class="item-label">${generateTooltipLabel(
                new Date(params[0].axisValue),
                granularity,
              )}</div>
              <div class="tooltip-value">${params[0].marker} ${label}${formatNumber(
                params[0].value,
                {
                  decimalsLength: 5,
                },
              )} ${translateDropdown('chartOptions.mb')}</div>
            </div>
          `;
        },
      },
      xAxis: {
        type: 'category',
        data: dataX,
        boundaryGap: false,
        axisLabel: {
          formatter(value: string, index: number) {
            let isShowMinutesFor24h = false;
            if (period === '24h' && dataX && (index === 0 || dataX.length - 1 === index)) {
              isShowMinutesFor24h = true;
            }
            if (period && periods[9].indexOf(period) !== -1) {
              const date = format(new Date(value), 'MM/dd/yyyy');
              if (firstDay !== date) {
                firstDay = date;
                return generateXAxisLabel(new Date(value), period, isShowMinutesFor24h);
              }

              return null;
            }
            return value ? generateXAxisLabel(new Date(value), period, isShowMinutesFor24h) : null;
          },
          showMaxLabel: true,
          interval: generateXAxisInterval(granularity || '1d', period, dataX, width),
        },
      },
      yAxis: {
        type: 'value',
        min: minY,
        max: maxY,
        interval: (maxY - minY) / 5,
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
        },
        axisLabel: {
          formatter(value: string) {
            return getYAxisLabel(Number(value), minY, maxY);
          },
        },
      },
      series: {
        type: 'line',
        showSymbol: false,
        data: dataY,
        emphasis: {
          lineStyle: {
            width: 2,
          },
        },
      },
      animation: false,
    },
    totalTransactionFees: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      color: [blueColor],
      grid: {
        top: 8,
        right: 40,
        bottom: 70,
        left: 66,
        show: false,
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 100,
        },
        {
          start: 0,
          end: 100,
        },
      ],
      tooltip: {
        trigger: 'axis',
        formatter(params: TChartParams[]) {
          return `
            <div class="tooltip-item-wrapper">
              <div class="item-label">${generateTooltipLabel(
                new Date(params[0].axisValue),
                granularity,
              )}</div>
              <div class="item-value">${params[0].marker} ${formatNumber(params[0].value, {
                decimalsLength: 4,
              })}</div>
            </div>
          `;
        },
      },
      xAxis: {
        type: 'category',
        data: dataX,
        boundaryGap: false,
        axisLabel: {
          formatter(value: string, index: number) {
            let isShowMinutesFor24h = false;
            if (period === '24h' && dataX && (index === 0 || dataX.length - 1 === index)) {
              isShowMinutesFor24h = true;
            }
            return value ? generateXAxisLabel(new Date(value), period, isShowMinutesFor24h) : null;
          },
          showMaxLabel: true,
          interval: generateXAxisInterval('1d', period, dataX, width),
        },
      },
      yAxis: {
        type: 'value',
        min: minY,
        max: maxY,
        interval: (maxY - minY) / 5,
        splitLine: {
          show: false,
        },
        axisLabel: {
          formatter(value: string) {
            return getYAxisLabel(Number(value), minY, maxY);
          },
        },
        axisLine: {
          show: true,
        },
      },
      series: {
        type: 'line',
        showSymbol: false,
        data: dataY,
        emphasis: {
          lineStyle: {
            width: 2,
          },
        },
      },
      animation: false,
    },
    transactionfee: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      color: ['#cd6661'],
      grid: {
        top: 30,
        right: 40,
        bottom: 70,
        left: 60,
        show: false,
      },
      tooltip: {
        trigger: 'axis',
        formatter(params: TChartParams[]) {
          return `
            <div class="tooltip-item-wrapper">
              <div class="item-label">${generateTooltipLabel(
                new Date(params[0].axisValue),
                granularity,
              )}</div>
              <div class="item-value">${params[0].marker} ${params[0].value}</div>
            </div>
          `;
        },
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 100,
        },
        {
          start: 0,
          end: 100,
        },
      ],
      xAxis: {
        type: 'category',
        data: dataX,
        boundaryGap: false,
        axisLabel: {
          formatter(value: string, index: number) {
            let isShowMinutesFor24h = false;
            if (period === '24h' && dataX && (index === 0 || dataX.length - 1 === index)) {
              isShowMinutesFor24h = true;
            }
            if (dataX?.length && dataX?.length > 4 && period && periods[9].indexOf(period) !== -1) {
              const date = format(new Date(value), 'MM/dd/yyyy');
              if (firstDay !== date) {
                firstDay = date;
                return generateXAxisLabel(new Date(value), period, isShowMinutesFor24h);
              }

              return null;
            }
            return value ? generateXAxisLabel(new Date(value), period, isShowMinutesFor24h) : null;
          },
          showMaxLabel: true,
          interval: generateXAxisInterval('1d', period, dataX, width),
        },
      },
      yAxis: {
        type: 'value',
        min: minY,
        max: maxY,
        interval: (maxY - minY) / 5,
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
        },
        axisLabel: {
          formatter(value: string) {
            return getYAxisLabel(Number(value), minY, maxY);
          },
        },
      },
      series: {
        type: 'line',
        data: dataY,
        showSymbol: false,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#cd6661',
            },
            {
              offset: 1,
              color: theme?.backgroundColor ?? '#F4F4F4',
            },
          ]),
        },
        emphasis: {
          lineStyle: {
            width: 2,
          },
        },
      },
      animation: false,
    },
    averageTransactionsPerBlock: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      color: ['#cd6661'],
      grid: {
        top: 30,
        right: 40,
        bottom: 70,
        left: 40,
        show: false,
      },
      tooltip: {
        trigger: 'axis',
        formatter(params: TChartParams[]) {
          return `
            <div class="tooltip-item-wrapper">
              <div class="tooltip-date">${generateTooltipLabel(
                new Date(params[0].axisValue),
                granularity,
              )}</div>
              <div class="tooltip-value">${params[0].marker} ${params[0].value}</div>
            </div>
          `;
        },
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 100,
        },
        {
          start: 0,
          end: 100,
        },
      ],
      xAxis: {
        type: 'category',
        data: dataX,
        boundaryGap: false,
        axisLabel: {
          formatter(value: string, index: number) {
            let isShowMinutesFor24h = false;
            if (period === '24h' && dataX && (index === 0 || dataX.length - 1 === index)) {
              isShowMinutesFor24h = true;
            }
            if (dataX?.length && dataX?.length > 4 && period && periods[9].indexOf(period) !== -1) {
              const date = format(new Date(value), 'MM/dd/yyyy');
              if (firstDay !== date) {
                firstDay = date;
                return generateXAxisLabel(new Date(value), period, isShowMinutesFor24h);
              }

              return null;
            }
            return value ? generateXAxisLabel(new Date(value), period, isShowMinutesFor24h) : null;
          },
          showMaxLabel: true,
          interval: generateXAxisInterval('1d', period, dataX, width),
        },
      },
      yAxis: {
        type: 'value',
        min: minY,
        max: maxY,
        interval: (maxY - minY) / 5,
        splitLine: {
          show: false,
        },
        axisLabel: {
          formatter(value: string) {
            return getYAxisLabel(Number(value), minY, maxY);
          },
        },
        axisLine: {
          show: true,
        },
      },
      series: {
        type: 'line',
        data: dataY,
        showSymbol: false,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#cd6661',
            },
            {
              offset: 1,
              color: theme?.backgroundColor ?? '#F4F4F4',
            },
          ]),
        },
        emphasis: {
          lineStyle: {
            width: 2,
          },
        },
      },
      animation: false,
    },
    totalTransactionCount: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      color: ['#cd6661'],
      grid: {
        top: 8,
        right: 40,
        bottom: 70,
        left: 60,
        show: false,
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 100,
        },
        {
          start: 0,
          end: 100,
        },
      ],
      tooltip: {
        trigger: 'axis',
        formatter(params: TChartParams[]) {
          return `
            <div class="tooltip-item-wrapper">
              <div class="item-label">${generateTooltipLabel(
                new Date(params[0].axisValue),
                granularity,
              )}</div>
              <div class="item-value">${params[0].marker} ${formatNumber(params[0].value)}</div>
            </div>
          `;
        },
      },
      xAxis: {
        type: 'category',
        data: dataX,
        boundaryGap: false,
        axisLabel: {
          formatter(value: string, index: number) {
            let isShowMinutesFor24h = false;
            if (period === '24h' && dataX && (index === 0 || dataX.length - 1 === index)) {
              isShowMinutesFor24h = true;
            }
            if (period && periods[9].indexOf(period) !== -1) {
              const date = format(new Date(value), 'MM/dd/yyyy');
              if (firstDay !== date) {
                firstDay = date;
                return generateXAxisLabel(new Date(value), period, isShowMinutesFor24h);
              }
              return null;
            }
            return value ? generateXAxisLabel(new Date(value), period, isShowMinutesFor24h) : null;
          },
          showMaxLabel: true,
          interval: generateXAxisInterval('1d', period, dataX, width),
        },
      },
      yAxis: {
        type: 'value',
        min: minY,
        max: maxY,
        interval: (maxY - minY) / 5,
        splitLine: {
          show: false,
        },
        axisLabel: {
          formatter(value: string) {
            return getYAxisLabel(Number(value), minY, maxY);
          },
        },
        axisLine: {
          show: true,
        },
      },
      series: {
        type: 'line',
        data: dataY,
        showSymbol: false,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#cd6661',
            },
            {
              offset: 1,
              color: theme?.backgroundColor ?? '#F4F4F4',
            },
          ]),
        },
        emphasis: {
          lineStyle: {
            width: 2,
          },
        },
      },
      animation: false,
    },
    blockchainSize: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      color: ['#cd6661'],
      grid: {
        top: 8,
        right: 40,
        bottom: 70,
        left: 50,
        show: false,
        containerLabel: true,
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 100,
        },
        {
          start: 0,
          end: 100,
        },
      ],
      tooltip: {
        trigger: 'axis',
        formatter(params: TChartParams[]) {
          return `
            <div class="tooltip-item-wrapper">
              <div class="item-label">${generateTooltipLabel(
                new Date(params[0].axisValue),
                granularity,
              )}</div>
              <div class="tooltip-value">${params[0].marker} ${formatNumber(params[0].value, {
                decimalsLength: 2,
              })} ${translateDropdown('chartOptions.mb')}</div>
            </div>
          `;
        },
      },
      xAxis: {
        type: 'category',
        data: dataX,
        boundaryGap: false,
        axisLabel: {
          formatter(value: string, index: number) {
            let isShowMinutesFor24h = false;
            if (period === '24h' && dataX && (index === 0 || dataX.length - 1 === index)) {
              isShowMinutesFor24h = true;
            }
            if (period && periods[9].indexOf(period) !== -1) {
              const date = format(new Date(value), 'MM/dd/yyyy');
              if (firstDay !== date) {
                firstDay = date;
                return generateXAxisLabel(new Date(value), period, isShowMinutesFor24h);
              }

              return null;
            }
            return value ? generateXAxisLabel(new Date(value), period, isShowMinutesFor24h) : null;
          },
          showMaxLabel: true,
          interval: generateXAxisInterval('1d', period, dataX, width),
        },
      },
      yAxis: {
        type: 'value',
        min: minY,
        max: maxY,
        interval: (maxY - minY) / 5,
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
        },
        axisLabel: {
          formatter(value: string) {
            return getYAxisLabel(Number(value), minY, maxY);
          },
        },
      },
      series: {
        type: 'line',
        data: dataY,
        showSymbol: false,
        emphasis: {
          lineStyle: {
            width: 2,
          },
        },
      },
      animation: false,
    },
    transactionspersecond: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      color: [blueColor],
      grid: {
        top: 8,
        right: 40,
        bottom: 70,
        left: 60,
        show: false,
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 100,
        },
        {
          start: 0,
          end: 100,
        },
      ],
      tooltip: {
        trigger: 'axis',
        formatter(params: TChartParams[]) {
          return `
            <div class="tooltip-item-wrapper">
              <div class="item-label">${generateTooltipLabel(
                new Date(params[0].axisValue),
                granularity,
              )}</div>
              <div class="item-value">${params[0].marker} ${params[0].value}</div>
            </div>
          `;
        },
      },
      xAxis: {
        type: 'category',
        data: dataX,
        boundaryGap: false,
        axisLabel: {
          formatter(value: string, index: number) {
            let isShowMinutesFor24h = false;
            if (period === '24h' && dataX && (index === 0 || dataX.length - 1 === index)) {
              isShowMinutesFor24h = true;
            }
            if (period && periods[9].indexOf(period) !== -1) {
              const date = format(new Date(value), 'MM/dd/yyyy');
              if (firstDay !== date) {
                firstDay = date;
                return generateXAxisLabel(new Date(value), period, isShowMinutesFor24h);
              }

              return null;
            }
            return value ? generateXAxisLabel(new Date(value), period, isShowMinutesFor24h) : null;
          },
          showMaxLabel: true,
          interval: generateXAxisInterval('1d', period, dataX, width),
        },
      },
      yAxis: {
        type: 'value',
        min: minY,
        max: maxY,
        interval: (maxY - minY) / 5,
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
        },
        axisLabel: {
          formatter(value: string) {
            return getYAxisLabel(Number(value), minY, maxY);
          },
        },
      },
      series: {
        type: 'line',
        data: dataY,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: blueColor,
            },
            {
              offset: 1,
              color: theme?.backgroundColor || '#fff',
            },
          ]),
        },
        showSymbol: false,
        emphasis: {
          lineStyle: {
            width: 2,
          },
        },
      },
      animation: false,
    },
    totalTransactionsPerDay: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      color: [blueColor],
      grid: {
        top: 8,
        right: 40,
        bottom: 70,
        left: 60,
        show: false,
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 100,
        },
        {
          start: 0,
          end: 100,
        },
      ],
      tooltip: {
        trigger: 'axis',
        formatter(params: TChartParams[]) {
          return `
          <div class="tooltip-item-wrapper">
            <div class="item-label">${generateTooltipLabel(
              new Date(params[0].axisValue),
              period === '24h' ? 'none' : '1d',
            )}</div>
            <div class="item-value">${params[0].marker} ${params[0].value}</div>
          </div>
        `;
        },
      },
      xAxis: {
        type: 'category',
        data: dataX,
        boundaryGap: false,
        axisLabel: {
          formatter(value: string, index: number) {
            let isShowMinutesFor24h = false;
            if (period === '24h' && dataX && (index === 0 || dataX.length - 1 === index)) {
              isShowMinutesFor24h = true;
            }
            if (period && periods[9].indexOf(period) !== -1) {
              const date = format(new Date(value), 'MM/dd/yyyy');
              if (firstDay !== date) {
                firstDay = date;
                return generateXAxisLabel(new Date(value), period, isShowMinutesFor24h);
              }

              return null;
            }
            return value ? generateXAxisLabel(new Date(value), period, isShowMinutesFor24h) : null;
          },
          showMaxLabel: true,
          interval: generateXAxisInterval('1d', period, dataX, width),
        },
      },
      yAxis: {
        type: 'value',
        min: minY,
        max: maxY,
        interval: (maxY - minY) / 5,
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
        },
        axisLabel: {
          formatter(value: string) {
            return getYAxisLabel(Number(value), minY, maxY);
          },
        },
      },
      series: {
        type: 'line',
        data: dataY,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: blueColor,
            },
            {
              offset: 1,
              color: theme?.backgroundColor || '#fff',
            },
          ]),
        },
        showSymbol: false,
        emphasis: {
          lineStyle: {
            width: 2,
          },
        },
      },
      animation: false,
    },
    transactionCount: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      color: [blueColor],
      grid: {
        top: 8,
        right: 40,
        bottom: 70,
        left: 60,
        show: false,
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 100,
        },
        {
          start: 0,
          end: 100,
        },
      ],
      tooltip: {
        trigger: 'axis',
        formatter(params: TChartParams[]) {
          return `
            <div class="tooltip-item-wrapper">
              <div class="item-label">${generateTooltipLabel(
                new Date(params[0].axisValue),
                granularity,
              )}</div>
              <div class="item-value">${params[0].marker} ${params[0].value}</div>
            </div>
          `;
        },
      },
      xAxis: {
        type: 'category',
        data: dataX,
        boundaryGap: false,
        axisLabel: {
          formatter(value: string, index: number) {
            let isShowMinutesFor24h = false;
            if (period === '24h' && dataX && (index === 0 || dataX.length - 1 === index)) {
              isShowMinutesFor24h = true;
            }
            if (period && periods[9].indexOf(period) !== -1) {
              const date = format(new Date(value), 'MM/dd/yyyy');
              if (firstDay !== date) {
                firstDay = date;
                return generateXAxisLabel(new Date(value), period, isShowMinutesFor24h);
              }

              return null;
            }
            return value ? generateXAxisLabel(new Date(value), period, isShowMinutesFor24h) : null;
          },
          showMaxLabel: true,
          interval: generateXAxisInterval('1d', period, dataX, width),
        },
      },
      yAxis: {
        type: 'value',
        min: minY,
        max: maxY,
        interval: (maxY - minY) / 5,
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
        },
        axisLabel: {
          formatter(value: string) {
            return getYAxisLabel(Number(value), minY, maxY);
          },
        },
      },
      series: {
        type: 'line',
        data: dataY,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: blueColor,
            },
            {
              offset: 1,
              color: theme?.backgroundColor || '#fff',
            },
          ]),
        },
        showSymbol: false,
        emphasis: {
          lineStyle: {
            width: 2,
          },
        },
      },
      animation: false,
    },
    transactionsinblock: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      grid: {
        top: 8,
        right: 40,
        bottom: 70,
        left: 42,
        show: false,
      },
      tooltip: {
        trigger: 'axis',
        showDelay: 0,
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 100,
        },
        {
          start: 0,
          end: 100,
        },
      ],
      xAxis: [
        {
          type: 'category',
          scale: true,
          boundaryGap: false,
          axisLabel: {
            showMaxLabel: true,
            interval: generateXAxisIntervalForScatterChart(period, dataX, width),
            formatter: (value: number) => {
              return formatNumber(value);
            },
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          min: minY,
          max: maxY,
          interval: (maxY - minY) / 5,
          splitLine: {
            show: false,
          },
          axisLine: {
            show: true,
          },
          axisLabel: {
            formatter(value: string) {
              return getYAxisLabel(Number(value), minY, maxY);
            },
            margin: 12,
          },
        },
      ],
      series: [
        {
          name: 'transactions : block',
          type: 'scatter',
          symbolSize: 15,
          itemStyle: {
            color: '#FF5500',
            borderColor: '#000000',
          },
          tooltip: {
            trigger: 'item',
            formatter(params: TTxInBlock) {
              return `
                <div class="tooltip-item-wrapper">
                  <div class="item-label">${translateDropdown('chartOptions.blockId')}: ${
                    params.value[0]
                  }</div>
                  <div class="tooltip-data-date">${translateDropdown('chartOptions.count')}: ${
                    params.value[1]
                  }</div>
                </div>
              `;
            },
          },
          data,
          showSymbol: false,
        },
      ],
      animation: false,
    },
    accounts: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      color: [blueColor],
      grid: {
        top: 8,
        right: 40,
        bottom: 70,
        left: 50,
        show: false,
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 100,
        },
        {
          start: 0,
          end: 100,
        },
      ],
      tooltip: {
        trigger: 'axis',
        formatter(params: TChartParams[]) {
          return `
            <div class="tooltip-item-wrapper">
              <div class="item-label">${generateTooltipLabel(
                new Date(params[0].axisValue),
                granularity,
              )}</div>
              <div class="tooltip-value">${params[0].marker} ${formatNumber(params[0].value)}</div>
            </div>
          `;
        },
      },
      xAxis: {
        type: 'category',
        data: dataX,
        axisLabel: {
          formatter(value: string, index: number) {
            let isShowMinutesFor24h = false;
            if (period === '24h' && dataX && (index === 0 || dataX.length - 1 === index)) {
              isShowMinutesFor24h = true;
            }
            return generateXAxisLabel(new Date(value), period, isShowMinutesFor24h);
          },
          showMaxLabel: true,
          interval: generateXAxisInterval('1d', period, dataX, width),
        },
      },
      yAxis: {
        type: 'value',
        min: minY,
        max: maxY,
        interval: (maxY - minY) / 5,
        axisLabel: {
          formatter(value: string) {
            return getYAxisLabel(Number(value), minY, maxY);
          },
        },
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
        },
      },
      series: {
        type: 'line',
        name: translateDropdown('chartOptions.accounts'),
        data: dataY,
        showSymbol: false,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: blueColor,
            },
            {
              offset: 1,
              color: theme?.backgroundColor || '#fff',
            },
          ]),
        },
      },
      animation: false,
    },
    totalSupply: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      color: ['#cd6661'],
      grid: {
        top: 8,
        right: 40,
        bottom: 70,
        left: 60,
        show: false,
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 100,
        },
        {
          start: 0,
          end: 100,
        },
      ],
      tooltip: {
        trigger: 'axis',
        formatter(params: TChartParams[]) {
          return `
            <div class="tooltip-item-wrapper">
              <div class="item-label">${generateTooltipLabel(
                new Date(params[0].axisValue),
                granularity,
              )}</div>
              <div class="item-value">${params[0].marker} ${formatNumber(params[0].value)}</div>
            </div>
          `;
        },
      },
      xAxis: {
        type: 'category',
        data: dataX,
        boundaryGap: false,
        axisLabel: {
          formatter(value: string, index: number) {
            let isShowMinutesFor24h = false;
            if (period === '24h' && dataX && (index === 0 || dataX.length - 1 === index)) {
              isShowMinutesFor24h = true;
            }
            return generateXAxisLabel(new Date(value), period, isShowMinutesFor24h);
          },
          showMaxLabel: true,
          interval: generateXAxisInterval('1d', period, dataX, width),
        },
      },
      yAxis: {
        type: 'value',
        min: minY,
        max: maxY,
        interval: (maxY - minY) / 5,
        splitLine: {
          show: false,
        },
        axisLabel: {
          formatter(value: string) {
            return getYAxisLabel(Number(value), minY, maxY);
          },
        },
        axisLine: {
          show: true,
        },
      },
      series: {
        type: 'line',
        name: translateDropdown('chartOptions.totalSupply', { currency: getCurrencyName() }),
        data: dataY,
        showSymbol: false,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#cd6661',
            },
            {
              offset: 1,
              color: theme?.backgroundColor ?? '#F4F4F4',
            },
          ]),
        },
      },
      animation: false,
    },
    totalSupplySmallChart: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      color: ['#cd6661'],
      grid: {
        top: 8,
        right: 40,
        bottom: 70,
        left: 60,
        show: false,
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 100,
        },
        {
          start: 0,
          end: 100,
        },
      ],
      tooltip: {
        trigger: 'axis',
        formatter(params: TChartParams[]) {
          return `
            <div class="tooltip-item-wrapper">
              <div class="item-label">${generateTooltipLabel(
                new Date(params[0].axisValue),
                granularity,
              )}</div>
              <div class="item-value">${params[0].marker} ${formatNumber(params[0].value)}</div>
            </div>
          `;
        },
      },
      xAxis: {
        type: 'category',
        data: dataX,
        boundaryGap: false,
        axisLabel: {
          formatter(value: string, index: number) {
            let isShowMinutesFor24h = false;
            if (period === '24h' && dataX && (index === 0 || dataX.length - 1 === index)) {
              isShowMinutesFor24h = true;
            }
            return generateXAxisLabel(new Date(value), period, isShowMinutesFor24h);
          },
          showMaxLabel: true,
          interval: generateXAxisIntervalSmallChart('1d', period, dataX, width),
        },
      },
      yAxis: {
        type: 'value',
        min: minY,
        max: maxY,
        interval: (maxY - minY) / 5,
        splitLine: {
          show: false,
        },
        axisLabel: {
          formatter(value: string) {
            return getYAxisLabel(Number(value), minY, maxY);
          },
        },
        axisLine: {
          show: true,
        },
      },
      series: {
        type: 'line',
        name: translateDropdown('chartOptions.totalSupply', { currency: getCurrencyName() }),
        data: dataY,
        showSymbol: false,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#cd6661',
            },
            {
              offset: 1,
              color: theme?.backgroundColor ?? '#F4F4F4',
            },
          ]),
        },
      },
      animation: false,
    },
    circulatingSupply: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      color: [blueColor],
      grid: {
        top: 8,
        right: 40,
        bottom: 70,
        left: 60,
        show: false,
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 100,
        },
        {
          start: 0,
          end: 100,
        },
      ],
      tooltip: {
        trigger: 'axis',
        formatter(params: TChartParams[]) {
          return `<div>
            <div>${generateTooltipLabel(new Date(params[0].axisValue), granularity)}</div>
            <div>${params[0].marker} ${formatNumber(params[0].value)}</div>
          </div>`;
        },
      },
      xAxis: {
        type: 'category',
        data: dataX,
        boundaryGap: false,
        axisLabel: {
          formatter(value: string, index: number) {
            let isShowMinutesFor24h = false;
            if (period === '24h' && dataX && (index === 0 || dataX.length - 1 === index)) {
              isShowMinutesFor24h = true;
            }
            if (period && periods[9].indexOf(period) !== -1) {
              const date = format(new Date(value), 'MM/dd/yyyy');
              if (firstDay !== date) {
                firstDay = date;
                return generateXAxisLabel(new Date(value), period, isShowMinutesFor24h);
              }

              return null;
            }
            return value ? generateXAxisLabel(new Date(value), period, isShowMinutesFor24h) : null;
          },
          showMaxLabel: true,
          interval: generateXAxisInterval('1d', period, dataX, width),
        },
      },
      yAxis: {
        type: 'value',
        min: minY,
        max: maxY,
        interval: (maxY - minY) / 5,
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
        },
        axisLabel: {
          formatter(value: string) {
            return getYAxisLabel(Number(value), minY, maxY);
          },
        },
      },
      series: {
        type: 'line',
        name: translateDropdown('chartOptions.circulatingSupply', { currency: getCurrencyName() }),
        data: dataY,
        showSymbol: false,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: blueColor,
            },
            {
              offset: 1,
              color: theme?.backgroundColor || '#fff',
            },
          ]),
        },
        emphasis: {
          lineStyle: {
            width: 2,
          },
        },
      },
      animation: false,
    },
    circulatingSupplySmallChart: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      color: [blueColor],
      grid: {
        top: 8,
        right: 40,
        bottom: 70,
        left: 60,
        show: false,
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 100,
        },
        {
          start: 0,
          end: 100,
        },
      ],
      tooltip: {
        trigger: 'axis',
        formatter(params: TChartParams[]) {
          return `<div>
            <div>${generateTooltipLabel(new Date(params[0].axisValue), granularity)}</div>
            <div>${params[0].marker} ${formatNumber(params[0].value)}</div>
          </div>`;
        },
      },
      xAxis: {
        type: 'category',
        data: dataX,
        boundaryGap: false,
        axisLabel: {
          formatter(value: string, index: number) {
            let isShowMinutesFor24h = false;
            if (period === '24h' && dataX && (index === 0 || dataX.length - 1 === index)) {
              isShowMinutesFor24h = true;
            }
            if (period && periods[9].indexOf(period) !== -1) {
              const date = format(new Date(value), 'MM/dd/yyyy');
              if (firstDay !== date) {
                firstDay = date;
                return generateXAxisLabel(new Date(value), period, isShowMinutesFor24h);
              }

              return null;
            }
            return value ? generateXAxisLabel(new Date(value), period, isShowMinutesFor24h) : null;
          },
          showMaxLabel: true,
          interval: generateXAxisIntervalSmallChart('1d', period, dataX, width),
        },
      },
      yAxis: {
        type: 'value',
        min: minY,
        max: maxY,
        interval: (maxY - minY) / 5,
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
        },
        axisLabel: {
          formatter(value: string) {
            return getYAxisLabel(Number(value), minY, maxY);
          },
        },
      },
      series: {
        type: 'line',
        name: translateDropdown('chartOptions.circulatingSupply', { currency: getCurrencyName() }),
        data: dataY,
        showSymbol: false,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: blueColor,
            },
            {
              offset: 1,
              color: theme?.backgroundColor || '#fff',
            },
          ]),
        },
        emphasis: {
          lineStyle: {
            width: 2,
          },
        },
      },
      animation: false,
    },
    percentOfPSLStaked: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      color: ['#cd6661'],
      grid: {
        top: 8,
        right: 20,
        bottom: 70,
        left: 50,
        show: false,
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 100,
        },
        {
          start: 0,
          end: 100,
        },
      ],
      tooltip: {
        trigger: 'axis',
        formatter: (params: TToolTipParamsProps[]) => {
          return `
            <div class="tooltip-item-wrapper">
              <div class="item-label">${generateTooltipLabel(
                new Date(params[0].axisValue),
                period !== '24h' ? '1d' : 'none',
              )}</div>
              <div class="item-value">${params[0].marker} ${formatNumber(
                dataY?.length ? dataY[params[0].dataIndex] * 100 : 0,
                {
                  decimalsLength: 2,
                },
              )}</div>
            </div>
          `;
        },
      },
      xAxis: {
        type: 'category',
        data: dataX,
        axisLabel: {
          formatter(value: string, index: number) {
            let isShowMinutesFor24h = false;
            if (period === '24h' && dataX && (index === 0 || dataX.length - 1 === index)) {
              isShowMinutesFor24h = true;
            }
            return generateXAxisLabel(new Date(value), period, isShowMinutesFor24h);
          },
          showMaxLabel: true,
          interval: generateXAxisInterval('1d', period, dataX, width),
        },
      },
      yAxis: {
        type: 'value',
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
        },
        axisLabel: {
          formatter(value: string) {
            return convertYAxisLabel(Number(value), maxY);
          },
        },
      },
      series: {
        type: 'bar',
        sampling: 'lttb',
        name: translateDropdown('chartOptions.percentOfPSLStaked', { currency: getCurrencyName() }),
        data: dataY?.map((d: number) => parseFloat((d * 100).toString())),
        showSymbol: false,
      },
      animation: false,
    },
    feeSchedule: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      color: ['#cd6661'],
      grid: {
        top: 8,
        right: 40,
        bottom: 70,
        left: 60,
        show: false,
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 100,
        },
        {
          start: 0,
          end: 100,
        },
      ],
      tooltip: {
        trigger: 'axis',
        formatter(params: TChartParams[]) {
          return `
            <div class="tooltip-item-wrapper">
              <div class="item-label">${generateTooltipLabel(
                new Date(params[0].axisValue),
                granularity,
              )}</div>
              <div class="item-value">${params[0].marker} ${formatNumber(params[0].value, {
                decimalsLength: 2,
              })}</div>
            </div>
          `;
        },
      },
      xAxis: {
        type: 'category',
        data: dataX,
        boundaryGap: false,
        axisLabel: {
          formatter(value: string, index: number) {
            let isShowMinutesFor24h = false;
            if (period === '24h' && dataX && (index === 0 || dataX.length - 1 === index)) {
              isShowMinutesFor24h = true;
            }
            if (period && periods[9].indexOf(period) !== -1) {
              const date = format(new Date(value), 'MM/dd/yyyy');
              if (firstDay !== date) {
                firstDay = date;
                return generateXAxisLabel(new Date(value), period, isShowMinutesFor24h);
              }
              return null;
            }
            return value ? generateXAxisLabel(new Date(value), period, isShowMinutesFor24h) : null;
          },
          showMaxLabel: true,
          interval: generateXAxisInterval('1d', period, dataX, width),
        },
      },
      yAxis: {
        type: 'value',
        min: minY,
        max: maxY,
        interval: (maxY - minY) / 5,
        splitLine: {
          show: false,
        },
        axisLabel: {
          formatter(value: string) {
            return getYAxisLabel(Number(value), minY, maxY);
          },
        },
        axisLine: {
          show: true,
        },
      },
      series: {
        type: 'line',
        data: dataY,
        showSymbol: false,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#cd6661',
            },
            {
              offset: 1,
              color: theme?.backgroundColor ?? '#F4F4F4',
            },
          ]),
        },
        emphasis: {
          lineStyle: {
            width: 2,
          },
        },
      },
      animation: false,
    },
    pslBurnt: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      color: ['#cd6661'],
      grid: {
        top: 8,
        right: 40,
        bottom: 70,
        left: 80,
        show: false,
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 100,
        },
        {
          start: 0,
          end: 100,
        },
      ],
      tooltip: {
        trigger: 'axis',
        formatter(params: TChartParams[]) {
          return `
            <div class="tooltip-item-wrapper">
              <div class="item-label">${generateTooltipLabel(
                new Date(params[0].axisValue),
                granularity,
              )}</div>
              <div class="item-value">${params[0].marker} ${formatNumber(params[0].value, {
                decimalsLength: 1,
              })} ${getCurrencyName()}</div>
            </div>
          `;
        },
      },
      xAxis: {
        type: 'category',
        data: dataX,
        boundaryGap: false,
        axisLabel: {
          formatter(value: string, index: number) {
            let isShowMinutesFor24h = false;
            if (period === '24h' && dataX && (index === 0 || dataX.length - 1 === index)) {
              isShowMinutesFor24h = true;
            }
            if (period && periods[9].indexOf(period) !== -1) {
              const date = format(new Date(value), 'MM/dd/yyyy');
              if (firstDay !== date) {
                firstDay = date;
                return generateXAxisLabel(new Date(value), period, isShowMinutesFor24h);
              }
              return null;
            }
            return value ? generateXAxisLabel(new Date(value), period, isShowMinutesFor24h) : null;
          },
          showMaxLabel: true,
          interval: generateXAxisInterval('1d', period, dataX, width),
        },
      },
      yAxis: {
        type: 'value',
        min: minY,
        max: maxY,
        interval: (maxY - minY) / 5,
        splitLine: {
          show: false,
        },
        axisLabel: {
          formatter(value: string) {
            return getYAxisLabel(Number(value), minY, maxY);
          },
        },
        axisLine: {
          show: true,
        },
      },
      series: {
        type: 'line',
        name: translateDropdown('chartOptions.pslBurnt', { currency: getCurrencyName() }),
        data: dataY,
        showSymbol: false,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#cd6661',
            },
            {
              offset: 1,
              color: theme?.backgroundColor ?? '#F4F4F4',
            },
          ]),
        },
      },
      animation: false,
    },
  };

  return chartOptions[chartName];
}

export function getThemeUpdateOption(args: TThemeInitOption): EChartsOption {
  const { theme, dataY, chartName } = args;
  const defaultOption: EChartsOption = {
    backgroundColor: theme?.backgroundColor,
    textStyle: {
      color: theme?.color,
    },
    series: [
      {
        type: 'line',
        showSymbol: false,
        data: dataY,
      },
    ],
  };
  const chartOptions: TChartOption = {
    averageblocksize: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      series: [
        {
          type: 'line',
          showSymbol: false,
          data: dataY,
        },
      ],
    },
    totalTransactionFees: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      series: [
        {
          type: 'line',
          showSymbol: false,
          data: dataY,
        },
      ],
    },
    transactionfee: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      series: [
        {
          type: 'line',
          showSymbol: false,
          data: dataY,
        },
      ],
    },
    totalTransactionCount: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      series: [
        {
          type: 'line',
          showSymbol: false,
          data: dataY,
        },
      ],
    },
    blockchainSize: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      series: [
        {
          type: 'line',
          showSymbol: false,
          data: dataY,
        },
      ],
    },
    difficulty: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      series: [
        {
          type: 'line',
          showSymbol: false,
          data: dataY,
        },
      ],
    },
    hashrate: defaultOption,
    networktotals: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      legend: {
        textStyle: {
          color: theme?.color,
        },
      },
    },
    mempoolsize: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
    },
    transactionspersecond: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      series: [
        {
          type: 'line',
          showSymbol: false,
          data: dataY,
        },
      ],
    },
    transactionsinblock: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      series: [
        {
          type: 'line',
          showSymbol: false,
          data: dataY,
        },
      ],
    },
    accounts: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
    },
    totalSupply: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
    },
    pslBurnt: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
    },
    circulatingSupply: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
    },
    percentOfPSLStaked: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
    },
    averageTransactionsPerBlock: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
    },
    totalTransactionsPerDay: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
    },
    transactionCount: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
    },
  };
  return chartOptions[chartName];
}

export type TToolTipParamsProps = {
  axisValue: string;
  marker: string;
  seriesName: string;
  data: number;
  dataIndex: number;
  value: number;
};

type TRectProps = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type TSizeProps = {
  contentSize: [number, number];
  viewSize: [number, number];
};

export function getSummaryThemeUpdateOption(args: TThemeInitOption): EChartsOption {
  const {
    theme,
    dataX,
    dataY,
    dataY1,
    chartName,
    minY,
    maxY,
    darkMode,
    period,
    width,
    seriesName,
    chartColor,
  } = args;
  const blueColor = darkMode ? '#1fbfff' : '#5470c6';
  const seriesLabelColor = darkMode ? '#fff' : '#000';
  const chartOptions: TChartOption = {
    gigaHashPerSec: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      color: [blueColor],
      grid: {
        top: 8,
        right: 0,
        bottom: 0,
        left: 0,
        show: false,
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: TToolTipParamsProps[]) => {
          return `${params[0].axisValue}<br />${params[0].marker}${
            params[0].seriesName
          }&nbsp;&nbsp;${formatNumber(params[0].data, { decimalsLength: 2 })}`;
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: dataX,
        axisLabel: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        show: false,
      },
      yAxis: {
        type: 'value',
        min: minY,
        max: maxY,
        axisLabel: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        show: false,
      },
      series: {
        name: translateDropdown('chartOptions.network'),
        type: 'line',
        data: dataY,
        showSymbol: false,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: blueColor,
            },
            {
              offset: 1,
              color: theme?.backgroundColor || '#fff',
            },
          ]),
        },
      },
      stateAnimation: {
        duration: 300,
        easing: 'cubicOut',
      },
    },
    difficulty: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      grid: {
        top: 8,
        right: 0,
        bottom: 0,
        left: 0,
        show: false,
      },
      legend: {
        show: false,
      },
      visualMap: {
        show: false,
        type: 'continuous',
        seriesIndex: 0,
        min: minY,
        max: maxY,
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: TToolTipParamsProps[]) => {
          return `${params[0].axisValue}<br />${params[0].marker}${
            params[0].seriesName
          }&nbsp;&nbsp;${formatNumber(params[0].data, { decimalsLength: 2 })}`;
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: dataX,
        axisLabel: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        show: false,
      },
      yAxis: {
        type: 'value',
        min: minY,
        max: maxY,
        axisLabel: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        show: false,
      },
      series: {
        name: translateDropdown('chartOptions.difficulty'),
        type: 'line',
        showSymbol: false,
        data: dataY,
        lineStyle: {
          width: 2,
          shadowColor: darkMode ? 'rgba(160, 174, 192, 0.5)' : 'rgba(0, 0, 0, 0.5)',
          shadowBlur: 10,
          shadowOffsetY: 12,
        },
      },
      stateAnimation: {
        duration: 300,
        easing: 'cubicOut',
      },
    },
    coinSupply: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      color: ['#cd6661'],
      grid: {
        top: 8,
        right: 0,
        bottom: 0,
        left: 0,
        show: false,
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: TToolTipParamsProps[]) => {
          return `${params[0].axisValue}<br />${params[0].marker}${
            params[0].seriesName
          }&nbsp;&nbsp;${formatNumber(params[0].data, { decimalsLength: 2 })}`;
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: dataX,
        axisLabel: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        show: false,
      },
      yAxis: {
        type: 'value',
        min: minY,
        max: maxY,
        axisLabel: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        show: false,
      },
      series: {
        name: translateDropdown('chartOptions.coinSupply', { currency: getCurrencyName() }),
        type: 'line',
        sampling: 'lttb',
        data: dataY,
        showSymbol: false,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#cd6661',
            },
            {
              offset: 1,
              color: theme?.backgroundColor || '#fff',
            },
          ]),
        },
      },
      stateAnimation: {
        duration: 300,
        easing: 'cubicOut',
      },
    },
    nonZeroAddressesCount: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      color: [blueColor],
      grid: {
        top: 8,
        right: 0,
        bottom: 0,
        left: 0,
        show: false,
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: dataX,
        axisLabel: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        show: false,
      },
      yAxis: {
        type: 'value',
        min: minY,
        max: maxY,
        axisLabel: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        show: false,
      },
      series: {
        name: translateDropdown('chartOptions.accountsSeriesName'),
        type: 'line',
        data: dataY,
        showSymbol: false,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: blueColor,
            },
            {
              offset: 1,
              color: theme?.backgroundColor || '#fff',
            },
          ]),
        },
      },
      stateAnimation: {
        duration: 300,
        easing: 'cubicOut',
      },
    },
    avgTransactionsPerSecond: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      color: [blueColor],
      grid: {
        top: 8,
        right: 0,
        bottom: 0,
        left: 0,
        show: false,
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: TToolTipParamsProps[]) => {
          return `${params[0].axisValue}<br />${params[0].marker}${
            params[0].seriesName
          }&nbsp;&nbsp;${formatNumber(params[0].data, { decimalsLength: 5 })}`;
        },
      },
      xAxis: {
        type: 'category',
        data: dataX,
        boundaryGap: false,
        axisLabel: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        show: false,
      },
      yAxis: {
        type: 'value',
        min: minY,
        axisLabel: {
          show: false,
        },
        splitNumber: 55,
        splitLine: {
          show: false,
        },
        show: false,
      },
      series: {
        name: translateDropdown('chartOptions.avgTransactionsPerSecond'),
        type: 'line',
        data: dataY,
        showSymbol: false,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#5470C6',
            },
            {
              offset: 1,
              color: theme?.backgroundColor || '#fff',
            },
          ]),
        },
      },
      stateAnimation: {
        duration: 300,
        easing: 'cubicOut',
      },
    },
    avgBlockSizeLast24Hour: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      color: ['#cd6661'],
      grid: {
        top: 8,
        right: 0,
        bottom: 0,
        left: 0,
        show: false,
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: TToolTipParamsProps[]) => {
          return `${params[0].axisValue}<br />${params[0].marker}${
            params[0].seriesName
          }&nbsp;&nbsp;${formatNumber(params[0].data, { decimalsLength: 2 })}`;
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: dataX,
        axisLabel: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        show: false,
      },
      yAxis: {
        type: 'value',
        min: minY,
        max: maxY,
        axisLabel: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        show: false,
      },
      series: {
        name: translateDropdown('chartOptions.avgBlockSizeLast24Hour'),
        type: 'line',
        sampling: 'lttb',
        data: dataY,
        showSymbol: false,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#cd6661',
            },
            {
              offset: 1,
              color: theme?.backgroundColor || '#fff',
            },
          ]),
        },
      },
      stateAnimation: {
        duration: 300,
        easing: 'cubicOut',
      },
    },
    avgTransactionPerBlockLast24Hour: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      color: ['#cd6661'],
      grid: {
        top: 8,
        right: 0,
        bottom: 0,
        left: 0,
        show: false,
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: TToolTipParamsProps[]) => {
          return `${params[0].axisValue}<br />${params[0].marker}${
            params[0].seriesName
          }&nbsp;&nbsp;${formatNumber(params[0].data, { decimalsLength: 2 })}`;
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: dataX,
        axisLabel: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        show: false,
      },
      yAxis: {
        type: 'value',
        min: minY,
        axisLabel: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        show: false,
      },
      series: {
        name: translateDropdown('chartOptions.avgTransactionPerBlockLast24Hour'),
        type: 'line',
        sampling: 'lttb',
        data: dataY,
        showSymbol: false,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#cd6661',
            },
            {
              offset: 1,
              color: theme?.backgroundColor || '#fff',
            },
          ]),
        },
      },
      stateAnimation: {
        duration: 300,
        easing: 'cubicOut',
      },
    },
    avgTransactionFeeLast24Hour: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      color: ['#cd6661'],
      grid: {
        top: 8,
        right: 0,
        bottom: 0,
        left: 0,
        show: false,
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: TToolTipParamsProps[]) => {
          return `${params[0].axisValue}<br />${params[0].marker}${
            params[0].seriesName
          }&nbsp;&nbsp;${formatNumber(params[0].data, { decimalsLength: 5 })}`;
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: dataX,
        axisLabel: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        show: false,
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: maxY,
        axisLabel: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        show: false,
      },
      series: {
        name: translateDropdown('chartOptions.avgTransactionFeeLast24Hour'),
        type: 'line',
        sampling: 'lttb',
        data: dataY,
        showSymbol: false,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#cd6661',
            },
            {
              offset: 1,
              color: theme?.backgroundColor || '#fff',
            },
          ]),
        },
      },
      stateAnimation: {
        duration: 300,
        easing: 'cubicOut',
      },
    },
    memPoolSize: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      grid: {
        top: 8,
        right: 0,
        bottom: 0,
        left: 0,
        show: false,
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: dataX,
        axisLabel: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        show: false,
      },
      yAxis: {
        type: 'value',
        min: minY,
        axisLabel: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        show: false,
      },
      series: {
        name: translateDropdown('chartOptions.memPoolSize'),
        type: 'line',
        sampling: 'lttb',
        lineStyle: {
          color: '#176987',
        },
        symbol: false,
        showSymbol: false,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#1A4369',
            },
            {
              offset: 1,
              color: theme?.backgroundColor || '#fff',
            },
          ]),
        },
        data: dataY,
      },
      stateAnimation: {
        duration: 300,
        easing: 'cubicOut',
      },
    },
    circulatingSupply: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      color: [blueColor],
      grid: {
        top: 8,
        right: 0,
        bottom: 0,
        left: 0,
        show: false,
      },
      tooltip: {
        trigger: 'axis',
        renderMode: 'html',
        formatter: (params: TToolTipParamsProps[]) => {
          return `${params[0].axisValue}<br />${params[0].marker}${
            params[0].seriesName
          }&nbsp;&nbsp;${formatNumber(params[0].data, { decimalsLength: 2 })}`;
        },
        position(
          pos: number[],
          params: TToolTipParamsProps[],
          dom: HTMLDivElement,
          rect: TRectProps,
          size: TSizeProps,
        ) {
          return [pos[0], pos[1] - size.contentSize[1]];
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: dataX,
        axisLabel: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        show: false,
      },
      yAxis: {
        type: 'value',
        min: minY,
        max: maxY,
        axisLabel: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        show: false,
      },
      series: {
        name: translateDropdown('chartOptions.circulatingSupplySeriesName', {
          currency: getCurrencyName(),
        }),
        type: 'line',
        sampling: 'lttb',
        data: dataY,
        showSymbol: false,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: blueColor,
            },
            {
              offset: 1,
              color: theme?.backgroundColor || '#fff',
            },
          ]),
        },
      },
      stateAnimation: {
        duration: 300,
        easing: 'cubicOut',
      },
    },
    percentPSLStaked: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      color: ['#cd6661'],
      grid: {
        top: 9,
        right: 5,
        bottom: 0,
        left: 5,
        show: false,
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: TToolTipParamsProps[]) => {
          return `${params[0].axisValue.split(', ')[0]}<br />${params[0].marker}${
            params[0].seriesName
          }&nbsp;&nbsp;${formatNumber(dataY?.length ? dataY[params[0].dataIndex] * 100 : 0, {
            decimalsLength: 2,
          })}`;
        },
      },
      xAxis: {
        type: 'category',
        data: dataX,
        axisLabel: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        show: false,
      },
      yAxis: {
        type: 'value',
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        show: false,
        max: maxY,
        min: 0,
      },
      series: {
        name: translateDropdown('chartOptions.percentPSLStaked', { currency: getCurrencyName() }),
        type: 'bar',
        data: dataY?.map((d: number) => parseFloat((d * 100).toString())),
      },
      stateAnimation: {
        duration: 300,
        easing: 'cubicOut',
      },
    },
    averageSizeOfNFTStoredOnCascade: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      color: ['#cd6661'],
      grid: {
        top: 9,
        right: 35,
        bottom: 20,
        left: 35,
        show: false,
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: TToolTipParamsProps[]) => {
          let html = '';
          for (let i = 0; i < params.length; i += 1) {
            html += `<div>${params[i].marker} ${params[i].seriesName}: ${
              params[i].value ? formatNumber(params[i].value, { decimalsLength: 2 }) : '0'
            } ${translateDropdown('chartOptions.mb')}</div>`;
          }
          return `
            <div>
              <div>${params[0].axisValue}</div>
              <div>${html}</div>
            </div>
          `;
        },
      },
      xAxis: [
        {
          type: 'category',
          data: dataX,
          boundaryGap: false,
          splitLine: {
            show: false,
          },
          axisLine: {
            show: true,
          },
          axisLabel: {
            formatter(value: string, index: number) {
              let isShowMinutesFor24h = false;
              if (period === '24h' && dataX && (index === 0 || dataX.length - 1 === index)) {
                isShowMinutesFor24h = true;
              }
              return value
                ? generateXAxisLabel(new Date(value), period, isShowMinutesFor24h)
                : null;
            },
            showMaxLabel: true,
            interval: dataX?.length ? Math.floor(dataX.length / 3) : 'auto',
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          min: 0,
          max: maxY,
          interval: maxY / 4,
          splitLine: {
            show: false,
          },
          axisLabel: {
            formatter(value: string) {
              return getYAxisLabel(Number(value), 0, maxY);
            },
          },
          axisLine: {
            show: true,
          },
        },
      ],
      series: [
        {
          name: translateDropdown('chartOptions.highestSizeOfNFTStored'),
          type: 'bar',
          data: dataY,
          color: '#cd6661',
        },
        {
          name: translateDropdown('chartOptions.averageSizeOfNFTStored'),
          type: 'line',
          data: dataY1,
          color: !darkMode ? '#2f2a03' : theme?.color,
          showSymbol: false,
        },
      ],
      animation: false,
    },
    averageRarenessScoreOfNFTsOnSense: {
      tooltip: {
        trigger: 'axis',
        formatter: (params: TToolTipParamsProps[]) => {
          let html = '';
          for (let i = 0; i < params.length; i += 1) {
            html += `<div>${params[i].marker} ${params[i].seriesName}: ${
              params[i].value ? formatNumber(params[i].value * 100, { decimalsLength: 2 }) : '0'
            }%</div>`;
          }
          return `
            <div>
              <div>${params[0].axisValue}</div>
              <div>${html}</div>
            </div>
          `;
        },
      },
      grid: {
        top: 9,
        right: 35,
        bottom: 20,
        left: 35,
        show: false,
      },
      xAxis: [
        {
          type: 'category',
          data: dataX,
          boundaryGap: false,
          splitLine: {
            show: false,
          },
          axisLine: {
            show: true,
          },
          axisLabel: {
            formatter(value: string, index: number) {
              let isShowMinutesFor24h = false;
              if (period === '24h' && dataX && (index === 0 || dataX.length - 1 === index)) {
                isShowMinutesFor24h = true;
              }
              return value
                ? generateXAxisLabel(new Date(value), period, isShowMinutesFor24h)
                : null;
            },
            showMaxLabel: true,
            interval: dataX?.length ? Math.floor(dataX.length / 3) : 'auto',
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          min: 0,
          max: maxY,
          interval: maxY / 4,
          splitLine: {
            show: false,
          },
          axisLabel: {
            formatter(value: string) {
              return getYAxisLabel(Number(value), 0, maxY);
            },
          },
          axisLine: {
            show: true,
          },
        },
      ],
      series: [
        {
          name: translateDropdown('chartOptions.HighestRarenessScore'),
          type: 'bar',
          data: dataY,
          color: blueColor,
        },
        {
          name: translateDropdown('chartOptions.averageRarenessScore'),
          type: 'line',
          data: dataY1,
          color: !darkMode ? '#2f2a03' : theme?.color,
          showSymbol: false,
        },
      ],
      animation: false,
    },
    totalOfCascadeRequests: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      color: ['#cd6661'],
      grid: {
        top: 9,
        right: 35,
        bottom: 20,
        left: 35,
        show: false,
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: TToolTipParamsProps[]) => {
          return `<div style="text-align: left">${params[0].axisValue}</div>${params[0].marker} ${
            params[0].seriesName
          }:&nbsp;${params[0].data ? formatNumber(params[0].data) : '0'} ${
            params[0].data > 1
              ? translateDropdown('chartOptions.requests')
              : translateDropdown('chartOptions.request')
          }`;
        },
      },
      xAxis: [
        {
          type: 'category',
          data: dataX,
          boundaryGap: false,
          splitLine: {
            show: false,
          },
          axisLine: {
            show: true,
          },
          axisLabel: {
            formatter(value: string, index: number) {
              let isShowMinutesFor24h = false;
              if (period === '24h' && dataX && (index === 0 || dataX.length - 1 === index)) {
                isShowMinutesFor24h = true;
              }
              return value
                ? generateXAxisLabel(new Date(value), period, isShowMinutesFor24h)
                : null;
            },
            showMaxLabel: true,
            interval: dataX?.length ? Math.floor(dataX.length / 3) : 'auto',
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          min: 0,
          max: maxY,
          interval: maxY / 4,
          splitLine: {
            show: false,
          },
          axisLabel: {
            formatter(value: string) {
              return getYAxisLabel(Number(value), 0, maxY);
            },
          },
          axisLine: {
            show: true,
          },
        },
      ],
      series: {
        name: translateDropdown('chartOptions.cascadeRequests'),
        type: 'line',
        sampling: 'lttb',
        data: dataY,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#cd6661',
            },
            {
              offset: 1,
              color: theme?.backgroundColor ?? '#F4F4F4',
            },
          ]),
        },
        showSymbol: false,
      },
      animation: false,
    },
    totalOfSenseRequests: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      color: [blueColor],
      grid: {
        top: 9,
        right: 35,
        bottom: 20,
        left: 35,
        show: false,
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: TToolTipParamsProps[]) => {
          return `<div style="text-align: left">${params[0].axisValue}</div>${params[0].marker} ${
            params[0].seriesName
          }:&nbsp;${params[0].data ? formatNumber(params[0].data) : '0'} ${
            params[0].data > 1
              ? translateDropdown('chartOptions.requests')
              : translateDropdown('chartOptions.request')
          }`;
        },
      },
      xAxis: {
        type: 'category',
        data: dataX,
        boundaryGap: false,
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
        },
        axisLabel: {
          formatter(value: string, index: number) {
            let isShowMinutesFor24h = false;
            if (period === '24h' && dataX && (index === 0 || dataX.length - 1 === index)) {
              isShowMinutesFor24h = true;
            }
            return value ? generateXAxisLabel(new Date(value), period, isShowMinutesFor24h) : null;
          },
          showMaxLabel: true,
          interval: dataX?.length ? Math.floor(dataX.length / 3) : 'auto',
        },
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: maxY,
        interval: maxY / 4,
        splitLine: {
          show: false,
        },
        axisLabel: {
          formatter(value: string) {
            return getYAxisLabel(Number(value), 0, maxY);
          },
        },
        axisLine: {
          show: true,
        },
      },
      series: {
        name: translateDropdown('chartOptions.senseRequests'),
        type: 'line',
        sampling: 'lttb',
        data: dataY,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: blueColor,
            },
            {
              offset: 1,
              color: theme?.backgroundColor || '#fff',
            },
          ]),
        },
        showSymbol: false,
      },
      animation: false,
    },
    totalSizeOfDataStored: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      color: ['#cd6661'],
      grid: {
        top: 9,
        right: 35,
        bottom: 20,
        left: 45,
        show: false,
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: TToolTipParamsProps[]) => {
          return `<div style="text-align: left">${params[0].axisValue}</div>${params[0].marker} ${
            params[0].seriesName
          }:&nbsp;${
            params[0].data ? formatNumber(params[0].data, { decimalsLength: 2 }) : '0'
          } ${translateDropdown('chartOptions.mb')}`;
        },
      },
      xAxis: {
        type: 'category',
        data: dataX,
        boundaryGap: false,
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
        },
        axisLabel: {
          formatter(value: string, index: number) {
            let isShowMinutesFor24h = false;
            if (period === '24h' && dataX && (index === 0 || dataX.length - 1 === index)) {
              isShowMinutesFor24h = true;
            }
            return value ? generateXAxisLabel(new Date(value), period, isShowMinutesFor24h) : null;
          },
          showMaxLabel: true,
          interval: dataX?.length ? Math.floor(dataX.length / 3) : 'auto',
        },
      },
      yAxis: {
        type: 'value',
        min: minY,
        max: maxY,
        interval: (maxY - minY) / 4,
        splitLine: {
          show: false,
        },
        axisLabel: {
          formatter(value: string) {
            return getYAxisLabel(Number(value), minY, maxY);
          },
        },
        axisLine: {
          show: true,
        },
      },
      series: {
        name: translateDropdown('chartOptions.totalDataStored'),
        type: 'line',
        sampling: 'lttb',
        data: dataY,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#cd6661',
            },
            {
              offset: 1,
              color: theme?.backgroundColor ?? '#F4F4F4',
            },
          ]),
        },
        showSymbol: false,
      },
      animation: false,
    },
    totalFingerprintsOnSense: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      color: [blueColor],
      grid: {
        top: 9,
        right: 35,
        bottom: 20,
        left: 45,
        show: false,
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: TToolTipParamsProps[]) => {
          return `<div style="text-align: left">${params[0].axisValue}</div>${params[0].marker} ${
            params[0].seriesName
          }:&nbsp;${params[0].data ? formatNumber(params[0].data) : 0}`;
        },
      },
      xAxis: {
        type: 'category',
        data: dataX,
        boundaryGap: false,
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
        },
        axisLabel: {
          formatter(value: string, index: number) {
            let isShowMinutesFor24h = false;
            if (period === '24h' && dataX && (index === 0 || dataX.length - 1 === index)) {
              isShowMinutesFor24h = true;
            }
            return value ? generateXAxisLabel(new Date(value), period, isShowMinutesFor24h) : null;
          },
          showMaxLabel: true,
          interval: dataX?.length ? Math.floor(dataX.length / 3) : 'auto',
        },
      },
      yAxis: {
        type: 'value',
        min: minY,
        max: maxY,
        interval: (maxY - minY) / 4,
        splitLine: {
          show: false,
        },
        axisLabel: {
          formatter(value: string) {
            return getYAxisLabel(Number(value), minY, maxY);
          },
        },
        axisLine: {
          show: true,
        },
      },
      series: {
        name: translateDropdown('chartOptions.totalFingerprints'),
        type: 'line',
        sampling: 'lttb',
        data: dataY,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: blueColor,
            },
            {
              offset: 1,
              color: theme?.backgroundColor || '#fff',
            },
          ]),
        },
        showSymbol: false,
      },
      animation: false,
    },
    blockSizesStatistics: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      color: ['#cd6661'],
      grid: {
        top: 120,
        right: 30,
        bottom: 20,
        left: 40,
        show: false,
      },
      tooltip: {
        trigger: 'axis',
        formatter(params: TChartParams[]) {
          return `
            <div class="tooltip-item-wrapper">
              <div class="item-label">${params[0].axisValue}</div>
              <div class="tooltip-value">${params[0].marker} ${formatNumber(params[0].value, {
                decimalsLength: 2,
              })} ${translateDropdown('chartOptions.kB')}</div>
            </div>
          `;
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
        },
        axisLabel: {
          formatter(value: string) {
            return generateXAxisLabel(new Date(value), '24h', true);
          },
          showMaxLabel: true,
          interval: generateXAxisInterval('1d', '24h', dataX, width),
        },
        data: dataX,
      },
      yAxis: {
        type: 'value',
        min: minY,
        max: maxY,
        interval: (maxY - minY) / 4,
        splitLine: {
          show: false,
        },
        axisLabel: {
          formatter(value: string) {
            return getYAxisLabel(Number(value), minY, maxY);
          },
        },
        axisLine: {
          show: true,
        },
      },
      series: [
        {
          data: dataY,
          type: 'line',
          showSymbol: false,
          emphasis: {
            lineStyle: {
              width: 2,
            },
          },
          lineStyle: {
            width: 2,
          },
        },
      ],
      animation: false,
    },
    networkStatistics: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      grid: {
        top: 100,
        right: 30,
        bottom: 20,
        left: 40,
        show: false,
      },
      tooltip: {
        trigger: 'axis',
        formatter(params: TChartParams[]) {
          return `
            <div class="tooltip-item-wrapper">
              <div class="item-label">${params[0].axisValue}</div>
              <div class="tooltip-value">${params[0].marker} ${formatNumber(params[0].value, {
                decimalsLength: 3,
              })} ${translateDropdown('chartOptions.mSolS')}</div>
            </div>
          `;
        },
      },
      color: [blueColor],
      xAxis: {
        type: 'category',
        boundaryGap: false,
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
        },
        axisLabel: {
          formatter(value: string) {
            return generateXAxisLabel(new Date(value), '24h', true);
          },
          showMaxLabel: true,
          interval: generateXAxisInterval('1d', '24h', dataX, width),
        },
        data: dataX,
      },
      yAxis: {
        type: 'value',
        min: minY,
        max: maxY,
        interval: (maxY - minY) / 4,
        splitLine: {
          show: false,
        },
        axisLabel: {
          formatter(value: string) {
            return getYAxisLabel(Number(value), minY, maxY);
          },
        },
        axisLine: {
          show: true,
        },
      },
      series: [
        {
          data: dataY,
          type: 'line',
          showSymbol: false,
          emphasis: {
            lineStyle: {
              width: 2,
            },
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: blueColor,
              },
              {
                offset: 1,
                color: theme?.backgroundColor || '#fff',
              },
            ]),
          },
        },
      ],
      animation: false,
    },
    volumeTransactions: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      grid: {
        top: 100,
        right: 30,
        bottom: 20,
        left: 40,
        show: false,
      },
      tooltip: {
        trigger: 'axis',
        formatter(params: TChartParams[]) {
          return `
            <div class="tooltip-item-wrapper">
              <div class="item-label">${params[0].axisValue}</div>
              <div class="tooltip-value">${params[0].marker} ${formatNumber(params[0].value, {
                decimalsLength: 2,
              })} ${getCurrencyName()}</div>
            </div>
          `;
        },
      },
      color: [blueColor],
      xAxis: {
        type: 'category',
        boundaryGap: false,
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
        },
        axisLabel: {
          formatter(value: string) {
            return generateXAxisLabel(new Date(value), '24h', true);
          },
          showMaxLabel: true,
          interval: generateXAxisInterval('1d', '24h', dataX, width),
        },
        data: dataX,
      },
      yAxis: {
        type: 'value',
        min: minY,
        max: maxY,
        interval: (maxY - minY) / 4,
        splitLine: {
          show: false,
        },
        axisLabel: {
          formatter(value: string) {
            return getYAxisLabel(Number(value), minY, maxY);
          },
        },
        axisLine: {
          show: true,
        },
      },
      series: [
        {
          data: dataY,
          type: 'line',
          showSymbol: false,
          emphasis: {
            lineStyle: {
              width: 2,
            },
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: blueColor,
              },
              {
                offset: 1,
                color: theme?.backgroundColor || '#fff',
              },
            ]),
          },
        },
      ],
      animation: false,
    },
    incomingTransactions: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      color: ['#cd6661'],
      grid: {
        top: 100,
        right: 30,
        bottom: 20,
        left: 40,
        show: false,
      },
      tooltip: {
        trigger: 'axis',
        formatter(params: TChartParams[]) {
          return `
            <div class="tooltip-item-wrapper">
              <div class="item-label">${params[0].axisValue}</div>
              <div class="tooltip-value">${params[0].marker} ${formatNumber(params[0].value, {
                decimalsLength: 2,
              })} ${getCurrencyName()}</div>
            </div>
          `;
        },
      },
      xAxis: {
        type: 'category',
        data: dataX,
        boundaryGap: false,
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
        },
        axisLabel: {
          formatter(value: string) {
            return generateXAxisLabel(new Date(value), '24h', true);
          },
          showMaxLabel: true,
          interval: generateXAxisInterval('1d', '24h', dataX, width),
        },
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: maxY,
        interval: maxY / 4,
        splitLine: {
          show: false,
        },
        axisLabel: {
          formatter(value: string) {
            return getYAxisLabel(Number(value), 0, maxY);
          },
        },
        axisLine: {
          show: true,
        },
      },
      series: {
        type: 'line',
        data: dataY,
        showSymbol: false,
        emphasis: {
          lineStyle: {
            width: 2,
          },
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#cd6661',
            },
            {
              offset: 1,
              color: theme?.backgroundColor || '#fff',
            },
          ]),
        },
      },
      animation: false,
    },
    balanceHistory: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      color: [chartColor || blueColor],
      grid: {
        top: 10,
        right: 0,
        bottom: 20,
        left: 0,
        show: false,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            formatter: (param: TAxisPointerProps) => {
              if (param.axisDimension === 'x') {
                return param.value;
              }

              return `${formatNumber(param.value, { decimalsLength: 2 })} ${getCurrencyName()}`;
            },
          },
        },
        formatter: (params: TToolTipParamsProps[]) => {
          return `<div style="text-align: left">${params[0].axisValue}</div>${params[0].marker} ${
            params[0].seriesName
          }:&nbsp;${
            params[0].data ? formatNumber(params[0].data, { decimalsLength: 2 }) : '0'
          } ${getCurrencyName()}`;
        },
      },
      xAxis: {
        type: 'category',
        data: dataX,
        boundaryGap: false,
        axisLabel: {
          show: true,
          formatter(value: string) {
            return value ? generateXAxisLabel(new Date(value), period, false) : null;
          },
          showMaxLabel: false,
          showMinLabel: true,
          interval: balanceHistoryXAxisInterval(dataX, width),
          align: 'left',
        },
        axisLine: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        name: dataX?.length
          ? generateXAxisLabel(new Date(dataX[dataX.length - 1]), period, false)
          : '',
        nameGap: 0,
        nameLocation: 'end',
        nameTextStyle: {
          align: 'right',
          verticalAlign: 'top',
          padding: [8, 2, 0, 0],
        },
      },
      yAxis: {
        type: 'value',
        min: minY,
        max: maxY,
        interval: (maxY - minY) / 5,
        splitLine: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
      },
      series: {
        name: translateDropdown(seriesName || 'pages.addressDetails.balanceHistory.balance') || '',
        type: 'line',
        sampling: 'lttb',
        data: dataY,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: chartColor || blueColor,
            },
            {
              offset: 1,
              color: theme?.backgroundColor || '#fff',
            },
          ]),
        },
        showSymbol: false,
      },
      animation: false,
    },
    directionOutgoing: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      color: ['#E94830'],
      grid: {
        top: 10,
        right: 0,
        bottom: 0,
        left: 0,
        show: false,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            formatter: (param: TAxisPointerProps) => {
              if (param.axisDimension === 'x') {
                return format(Number(param.value), 'MM/yyyy');
              }

              return `${formatNumber(param.value, { decimalsLength: 2 })} ${getCurrencyName()}`;
            },
          },
        },
        formatter: (params: TToolTipParamsProps[]) => {
          return `<div style="text-align: left">${format(
            Number(params[0].axisValue),
            'MM/yyyy',
          )}</div>${params[0].marker} ${params[0].seriesName}:&nbsp;${
            params[0].data ? formatNumber(params[0].value, { decimalsLength: 2 }) : '0'
          } ${getCurrencyName()}`;
        },
      },
      xAxis: {
        type: 'category',
        data: dataX,
        axisLabel: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: maxY,
        interval: maxY / 5,
        splitLine: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
      },
      series: {
        name: translateDropdown('pages.addressDetails.balanceHistory.sentByMonth') || '',
        type: 'bar',
        data: dataY?.map((d, index) => {
          return {
            value: d,
            label: {
              show: true,
              fontSize: 10,
              rotate: 90,
              position: 'insideBottom',
              align: 'left',
              verticalAlign: 'middle',
              distance: 10,
              color: seriesLabelColor,
              formatter: () => {
                return dataX ? format(Number(dataX[index]), 'MM/yyyy') : '';
              },
            },
          };
        }),
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)',
        },
      },
      animation: false,
    },
    directionIncoming: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      color: [chartColor || '#219653'],
      grid: {
        top: 10,
        right: 0,
        bottom: 0,
        left: 0,
        show: false,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            formatter: (param: TAxisPointerProps) => {
              if (param.axisDimension === 'x') {
                return format(Number(param.value), 'MM/yyyy');
              }

              return `${formatNumber(param.value, { decimalsLength: 2 })} ${getCurrencyName()}`;
            },
          },
        },
        formatter: (params: TToolTipParamsProps[]) => {
          return `<div style="text-align: left">${format(
            Number(params[0].axisValue),
            'MM/yyyy',
          )}</div>${params[0].marker} ${params[0].seriesName}:&nbsp;${
            params[0].data ? formatNumber(params[0].value, { decimalsLength: 2 }) : '0'
          } ${getCurrencyName()}`;
        },
      },
      xAxis: {
        type: 'category',
        data: dataX,
        axisLabel: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: maxY,
        interval: maxY / 5,
        splitLine: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
      },
      series: {
        name:
          translateDropdown(seriesName || 'pages.addressDetails.balanceHistory.receivedByMonth') ||
          '',
        type: 'bar',
        data: dataY?.map((d, index) => {
          return {
            value: d,
            label: {
              show: true,
              fontSize: 10,
              rotate: 90,
              position: 'insideBottom',
              align: 'left',
              verticalAlign: 'middle',
              distance: 10,
              color: seriesLabelColor,
              formatter: () => {
                return dataX ? format(Number(dataX[index]), 'MM/yyyy') : '';
              },
            },
          };
        }),
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)',
        },
      },
      animation: false,
    },
    totalBurned: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      color: [chartColor || blueColor],
      grid: {
        top: 10,
        right: 0,
        bottom: 20,
        left: 0,
        show: false,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            formatter: (param: TAxisPointerProps) => {
              if (param.axisDimension === 'x') {
                return param.value;
              }

              return `${formatNumber(param.value, { decimalsLength: 2 })} ${getCurrencyName()}`;
            },
          },
        },
        formatter: (params: TToolTipParamsProps[]) => {
          return `<div style="text-align: left">${params[0].axisValue}</div>${params[0].marker} ${
            params[0].seriesName
          }:&nbsp;${
            params[0].data ? formatNumber(params[0].data, { decimalsLength: 2 }) : '0'
          } ${getCurrencyName()}`;
        },
      },
      xAxis: {
        type: 'category',
        data: dataX,
        boundaryGap: false,
        axisLabel: {
          show: true,
          formatter(value: string) {
            return value ? generateXAxisLabel(new Date(value), period, false) : null;
          },
          showMaxLabel: false,
          showMinLabel: true,
          interval: balanceHistoryXAxisInterval(dataX, width),
          align: 'left',
        },
        axisLine: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        name: dataX?.length
          ? generateXAxisLabel(new Date(dataX[dataX.length - 1]), period, false)
          : '',
        nameGap: 0,
        nameLocation: 'end',
        nameTextStyle: {
          align: 'right',
          verticalAlign: 'top',
          padding: [8, 2, 0, 0],
        },
      },
      yAxis: {
        type: 'value',
        min: minY,
        max: maxY,
        interval: (maxY - minY) / 5,
        splitLine: {
          show: false,
        },
        axisLabel: {
          formatter(value: string) {
            return getYAxisLabel(Number(value), minY, maxY);
          },
        },
        axisLine: {
          show: true,
        },
      },
      series: {
        name: translateDropdown('pages.burned.totalBurned', { currency: getCurrencyName() }) || '',
        type: 'line',
        sampling: 'lttb',
        data: dataY,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: chartColor || blueColor,
            },
            {
              offset: 1,
              color: theme?.backgroundColor || '#fff',
            },
          ]),
        },
        showSymbol: false,
      },
      animation: false,
    },
  };
  return chartOptions[chartName];
}
