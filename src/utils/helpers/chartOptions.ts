import * as echarts from 'echarts';
import { EChartsOption } from 'echarts-for-react';
import format from 'date-fns/format';

// aplication
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { getCurrencyName } from '@utils/appInfo';
import { TThemeInitOption } from '@utils/constants/types';
import { periods } from '@utils/constants/statistics';
import {
  PeriodTypes,
  generateXAxisInterval,
  generateXAxisIntervalForScatterChart,
  TGranularity,
  getYAxisLabel,
  convertYAxisLabel,
} from '@utils/helpers/statisticsLib';
import { TChartParams } from '@utils/types/IStatistics';

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
  } = args;
  let firstDay = '';
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
      color: ['#5470c6', '#91cc75', '#fac858'],
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
          )} MSol/S</div>
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
              color: '#5470C6',
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
      color: ['#cd6661', '#37A2FF'],
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
                <div class="item-value">${formatNumber(item.value)} bytes</div>
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
        data: ['Traffic received', 'Traffic sent'],
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
          name: 'Traffic received',
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
          name: 'Traffic sent',
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
          })} kB</div>
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
          color: '#176987',
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
      color: ['#5470c6', '#91cc75', '#fac858'],
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
          let label = 'Average per hour: ';
          switch (granularity) {
            case '1d':
              label = 'Average per day: ';
              break;
            case '30d':
              label = 'Average per month: ';
              break;
            case '1y':
              label = 'Average per year: ';
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
          )} MB</div>
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
      color: ['#5470c6', '#91cc75', '#fac858'],
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
          })} MB</div>
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
      color: ['#5470c6', '#91cc75', '#fac858'],
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
        areaStyle: {},
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
      color: ['#5470c6', '#91cc75', '#fac858'],
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
        areaStyle: {},
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
      color: ['#5470c6', '#91cc75', '#fac858'],
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
        areaStyle: {},
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
                  <div class="item-label">block id: ${params.value[0]}</div>
                  <div class="tooltip-data-date">count: ${params.value[1]}</div>
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
      color: ['#5470c6', '#91cc75', '#fac858'],
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
        name: 'Accounts',
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
        name: `Total Supply (${getCurrencyName()})`,
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
      color: ['#5470c6', '#91cc75', '#fac858'],
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
        name: `Circulating Supply (${getCurrencyName()})`,
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
        name: `% of ${getCurrencyName()} Staked`,
        data: dataY?.map((d: number) => parseFloat((d * 100).toString())),
        showSymbol: false,
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
  const { theme, dataX, dataY, dataY1, chartName, minY, maxY, darkMode } = args;
  const chartOptions: TChartOption = {
    gigaHashPerSec: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      color: ['#5470c6', '#91cc75', '#fac858'],
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
        name: 'Network (MH/s): ',
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
        name: 'Difficulty: ',
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
        name: `Coin Supply (${getCurrencyName()}): `,
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
      color: ['#5470c6', '#91cc75', '#fac858'],
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
        name: 'Accounts: ',
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
    avgTransactionsPerSecond: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      color: ['#5470c6', '#91cc75', '#fac858'],
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
        name: `Transactions (avg/s): `,
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
        name: 'Average Block Size (Bytes): ',
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
        name: 'Transactions (avg/block): ',
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
        name: 'Transaction Fee (in USD): ',
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
        name: 'Mempool Size (kB): ',
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
      color: ['#5470c6', '#91cc75', '#fac858'],
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
        name: `Circulating Supply (${getCurrencyName()}): `,
        type: 'line',
        sampling: 'lttb',
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
      },
      series: {
        name: `% of ${getCurrencyName()} Staked: `,
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
        right: 0,
        bottom: 0,
        left: 0,
        show: false,
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: TToolTipParamsProps[]) => {
          return `<div style="text-align: left">${params[0].axisValue}</div>${
            params[0].marker
          } Average size of NFT stored:&nbsp;${formatNumber(params[0].data)} MB/NFT`;
        },
      },
      xAxis: {
        type: 'category',
        data: dataX,
        axisLabel: {
          show: false,
        },
      },
      yAxis: {
        type: 'value',
        min: minY,
        max: maxY,
        axisLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        splitLine: {
          show: false,
        },
      },
      series: {
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
      stateAnimation: {
        duration: 300,
        easing: 'cubicOut',
      },
    },
    averageRarenessScoreOfNFTsOnSense: {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999',
          },
        },
      },
      grid: {
        top: 9,
        right: 0,
        bottom: 0,
        left: 0,
        show: false,
      },
      xAxis: [
        {
          type: 'category',
          data: dataX,
          axisLabel: {
            show: false,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          max: maxY,
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        },
      ],
      series: [
        {
          name: 'Highest rareness score',
          type: 'bar',
          data: dataY,
          color: '#5470C6',
        },
        {
          name: 'Average rareness score',
          type: 'line',
          data: dataY1,
          color: '#2f2a03',
          showSymbol: false,
        },
      ],
      stateAnimation: {
        duration: 300,
        easing: 'cubicOut',
      },
    },
    totalOfCascadeRequests: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      color: ['#cd6661'],
      grid: {
        top: 9,
        right: 0,
        bottom: 0,
        left: 0,
        show: false,
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: TToolTipParamsProps[]) => {
          return `<div style="text-align: left">${params[0].axisValue}</div>${
            params[0].marker
          } Total:&nbsp;${formatNumber(params[0].data)} requests`;
        },
      },
      xAxis: {
        type: 'category',
        data: dataX,
        axisLabel: {
          show: false,
        },
        boundaryGap: false,
      },
      yAxis: {
        type: 'value',
        max: maxY,
        axisLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        splitLine: {
          show: false,
        },
      },
      series: {
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
      stateAnimation: {
        duration: 300,
        easing: 'cubicOut',
      },
    },
    totalOfSenseRequests: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      color: ['#5470c6', '#91cc75', '#fac858'],
      grid: {
        top: 9,
        right: 0,
        bottom: 0,
        left: 0,
        show: false,
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: TToolTipParamsProps[]) => {
          return `<div style="text-align: left">${params[0].axisValue}</div>${
            params[0].marker
          } Total:&nbsp;${formatNumber(params[0].data)} requests`;
        },
      },
      xAxis: {
        type: 'category',
        data: dataX,
        axisLabel: {
          show: false,
        },
      },
      yAxis: {
        type: 'value',
        max: maxY,
        axisLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        splitLine: {
          show: false,
        },
      },
      series: {
        type: 'line',
        sampling: 'lttb',
        data: dataY,
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
        showSymbol: false,
      },
      stateAnimation: {
        duration: 300,
        easing: 'cubicOut',
      },
    },
    totalSizeOfDataStored: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      color: ['#cd6661'],
      grid: {
        top: 9,
        right: 0,
        bottom: 0,
        left: 0,
        show: false,
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: TToolTipParamsProps[]) => {
          return `<div style="text-align: left">${params[0].axisValue}</div>${
            params[0].marker
          } Total:&nbsp;${formatNumber(params[0].data)} MB`;
        },
      },
      xAxis: {
        type: 'category',
        data: dataX,
        axisLabel: {
          show: false,
        },
      },
      yAxis: {
        type: 'value',
        max: maxY,
        axisLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        splitLine: {
          show: false,
        },
      },
      series: {
        type: 'bar',
        sampling: 'lttb',
        data: dataY,
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
    totalFingerprintsOnSense: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      color: ['#5470c6', '#91cc75', '#fac858'],
      grid: {
        top: 9,
        right: 0,
        bottom: 0,
        left: 0,
        show: false,
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: TToolTipParamsProps[]) => {
          return `<div style="text-align: left">${params[0].axisValue}</div>${
            params[0].marker
          } Total:&nbsp;${formatNumber(params[0].data)}`;
        },
      },
      xAxis: {
        type: 'category',
        data: dataX,
        axisLabel: {
          show: false,
        },
      },
      yAxis: {
        type: 'value',
        max: maxY,
        axisLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        splitLine: {
          show: false,
        },
      },
      series: {
        type: 'bar',
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
      stateAnimation: {
        duration: 300,
        easing: 'cubicOut',
      },
    },
    blockSizesStatistics: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      color: ['#cd6661'],
      grid: {
        top: 9,
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
        splitLine: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        data: dataX,
      },
      yAxis: {
        type: 'value',
        min: minY,
        max: maxY,
        splitLine: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisLabel: {
          show: false,
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
            shadowColor: darkMode ? 'rgba(160, 174, 192, 0.5)' : 'rgba(0, 0, 0, 0.5)',
            shadowBlur: 10,
            shadowOffsetY: 12,
          },
        },
      ],
      stateAnimation: {
        duration: 300,
        easing: 'cubicOut',
      },
    },
    networkStatistics: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      grid: {
        top: 9,
        right: 0,
        bottom: 0,
        left: 0,
        show: false,
      },
      tooltip: {
        trigger: 'axis',
      },
      color: ['#5470c6', '#91cc75', '#fac858'],
      xAxis: {
        type: 'category',
        boundaryGap: false,
        splitLine: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        data: dataX,
      },
      yAxis: {
        type: 'value',
        min: minY,
        max: maxY,
        splitLine: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
      },
      series: [
        {
          data: dataY,
          type: 'line',
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
      ],
      stateAnimation: {
        duration: 300,
        easing: 'cubicOut',
      },
    },
    incomingTransactions: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      color: ['#cd6661'],
      grid: {
        top: 9,
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
        data: dataX,
        splitLine: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: maxY,
        splitLine: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
      },
      series: {
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
  };
  return chartOptions[chartName];
}
