import * as echarts from 'echarts';
import { EChartsOption } from 'echarts-for-react';
import format from 'date-fns/format';

// aplication
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { getCurrencyName } from '@utils/appInfo';
import { TThemeInitOption } from '@utils/constants/types';
import { periods } from '@utils/constants/statistics';
import { convertYAxisLabel, PeriodTypes, TGranularity } from '@utils/helpers/statisticsLib';
import { TChartParams } from '@utils/types/IStatistics';

type TChartOption = {
  [index: string]: EChartsOption;
};

type TTxInBlock = {
  value: string[][];
};

export const generateXAxisLabel = (value: Date, period?: PeriodTypes) => {
  if (!value) {
    return '';
  }

  if (!period) {
    return value;
  }

  return period === '24h' ? format(value, 'hh:00 aa') : format(value, 'MM/dd/yyyy');
};

export const generateTooltipLabel = (value: Date, period?: PeriodTypes) => {
  if (!period) {
    return value;
  }

  return periods[8].indexOf(period) !== -1
    ? format(value, 'MM/dd/yyyy hh:00 aa')
    : format(value, 'MM/dd/yyyy');
};

const generateAxisLabelInterval = (
  period: PeriodTypes,
  total: number,
  granularity: TGranularity,
) => {
  switch (period) {
    case '7d':
      return 1;
    case '14d':
      return 2;
    case '30d':
      if (granularity === 'none') {
        return Math.ceil(total / 12);
      }
      return 'auto';
    case '90d':
      if (granularity === 'none') {
        return Math.ceil(total / 12);
      }
      if (granularity === '30d') {
        return 'auto';
      }
      return 10;
    case '180d':
      if (granularity === 'none') {
        return Math.ceil(total / 12);
      }
      if (granularity === '30d') {
        return 'auto';
      }
      return 12;
    case '1y':
      if (granularity === 'none') {
        return Math.ceil(total / 12);
      }
      if (granularity === '30d' || granularity === '1y') {
        return 'auto';
      }
      return 26;
    case 'all':
    case 'max':
      if (granularity === '30d' || granularity === '1y') {
        return 'auto';
      }
      return Math.ceil(total / 12);
    default:
      return 1;
  }
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
  } = args;
  let firstDay = '';
  const chartOptions: TChartOption = {
    difficulty: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      grid: {
        top: 8,
        right: 40,
        bottom: 20,
        left: 50,
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
      },
      xAxis: {
        type: 'category',
        data: dataX,
        boundaryGap: false,
        axisLabel: {
          formatter(value: string) {
            if (period && periods[9].indexOf(period) !== -1) {
              const date = format(new Date(value), 'MM/dd/yyyy');
              if (firstDay !== date) {
                firstDay = date;
                return generateXAxisLabel(new Date(value), period);
              }

              return null;
            }
            return value ? generateXAxisLabel(new Date(value), period) : null;
          },
          interval:
            period && periods[9].indexOf(period) !== -1 && dataX?.length && dataX?.length > 48
              ? 22
              : 'auto',
        },
        splitLine: {
          interval:
            period && periods[9].indexOf(period) !== -1 && dataX?.length && dataX?.length > 48
              ? 22
              : 'auto',
        },
      },
      yAxis: {
        type: 'value',
        minInterval: period === '24h' && maxY < 1000000 ? 100000 : 1000000,
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
        },
        axisLabel: {
          formatter(value: string) {
            return convertYAxisLabel(Number(value), maxY, 0);
          },
        },
      },
      series: {
        type: 'line',
        showSymbol: false,
        data: dataY,
        lineStyle: {
          width: 2,
        },
      },
      animation: false,
    },
    hashrate: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      grid: {
        top: 8,
        right: 40,
        bottom: 20,
        left: 60,
        show: false,
      },
      tooltip: {
        trigger: 'axis',
        formatter(params: TChartParams[]) {
          return `
            <div class="tooltip-wrapper">
              <div class="tooltip-date">${generateTooltipLabel(
                new Date(params[0].axisValue),
                period,
              )}</div>
              <div class="tooltip-value">${params[0].marker} ${formatNumber(
            params[0].value,
          )} MH/s</div>
            </div>
          `;
        },
      },
      xAxis: {
        type: 'category',
        data: dataX,
        boundaryGap: false,
        axisLabel: {
          formatter(value: string) {
            if (dataX?.length && dataX?.length > 4 && period && periods[9].indexOf(period) !== -1) {
              const date = format(new Date(value), 'MM/dd/yyyy');
              if (firstDay !== date) {
                firstDay = date;
                return generateXAxisLabel(new Date(value), period);
              }

              return null;
            }
            return value ? generateXAxisLabel(new Date(value), period) : null;
          },
          interval:
            period && periods[9].indexOf(period) !== -1 && dataX?.length && dataX?.length > 48
              ? 22
              : 'auto',
        },
        splitLine: {
          interval:
            period && periods[9].indexOf(period) !== -1 && dataX?.length && dataX?.length > 48
              ? 22
              : 'auto',
        },
      },
      yAxis: {
        type: 'value',
        minInterval: maxY > 1000000000 ? 1000000000 : 100000000,
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
        },
        axisLabel: {
          formatter(value: string) {
            return convertYAxisLabel(Number(value), maxY, 0);
          },
        },
      },
      series: {
        type: 'line',
        sampling: 'lttb',
        smooth: true,
        symbol: false,
        showSymbol: false,
        lineStyle: {
          width: 2,
          color: '#ff5500',
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(255, 85, 0, 0.5)',
            },
            {
              offset: 1,
              color: theme?.backgroundColor || '#fff',
            },
          ]),
        },
        data: dataY,
      },
      animation: false,
    },
    networktotals: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      color: ['#80FFA5', '#37A2FF'],
      grid: {
        top: 8,
        right: 8,
        bottom: 20,
        left: 80,
        show: false,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985',
          },
        },
      },
      legend: {
        top: 10,
        right: 10,
        data: ['Traffic receive', 'Traffic sent'],
        textStyle: {
          color: theme?.color,
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: dataX,
        axisLabel: {
          formatter(value: string) {
            return generateXAxisLabel(new Date(value), period);
          },
        },
      },
      yAxis: {
        type: 'value',
        splitLine: {
          show: false,
        },
        axisLabel: {
          formatter(value: string) {
            const val = Number.parseFloat(value);
            return `${formatNumber(val / 1000000)}M`;
          },
        },
        axisLine: {
          show: true,
        },
      },
      series: [
        {
          name: 'Traffic receive',
          type: 'line',
          smooth: true,
          lineStyle: {
            width: 0,
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#80ffa5',
              },
              {
                offset: 1,
                color: '#00BFEC',
              },
            ]),
          },
          emphasis: {
            focus: 'series',
          },
          data: dataY1,
        },
        {
          name: 'Traffic sent',
          type: 'line',
          smooth: true,
          lineStyle: {
            width: 0,
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#37a2ff',
              },
              {
                offset: 1,
                color: '#7415db',
              },
            ]),
          },
          emphasis: {
            focus: 'series',
          },
          data: dataY2,
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
        right: 8,
        bottom: 20,
        left: 50,
        show: false,
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        data: dataX,
        axisLabel: {
          formatter(value: string) {
            return generateXAxisLabel(new Date(value), period);
          },
        },
      },
      yAxis: {
        type: 'value',
        min: minY,
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
        },
        axisLabel: {
          formatter(value: string) {
            if (maxY > 1000000) {
              return `${Math.round(Number(value) / 1000000)}M`;
            }
            if (maxY > 1000) {
              return `${Math.round(Number(value) / 1000)}K`;
            }
            return `${Number(value)}k`;
          },
        },
      },
      series: {
        type: 'line',
        sampling: 'lttb',
        lineStyle: {
          color: '#176987',
        },
        smooth: true,
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
              color: '#1A272A4D',
            },
          ]),
        },
        data: dataY,
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
        bottom: 20,
        left: 60,
        show: false,
      },
      tooltip: {
        trigger: 'axis',
        formatter(params: TChartParams[]) {
          return `<div>
            <div>${generateTooltipLabel(new Date(params[0].axisValue), period)}</div>
            <div>${params[0].marker} ${params[0].value.toFixed(5)} MB</div>
          </div>`;
        },
      },
      xAxis: {
        type: 'category',
        data: dataX,
        boundaryGap: false,
        axisLabel: {
          formatter(value: string) {
            if (period && periods[9].indexOf(period) !== -1) {
              const date = format(new Date(value), 'MM/dd/yyyy');
              if (firstDay !== date) {
                firstDay = date;
                return generateXAxisLabel(new Date(value), period);
              }

              return null;
            }
            return value ? generateXAxisLabel(new Date(value), period) : null;
          },
          showMinLabel: true,
          showMaxLabel: true,
          interval: period
            ? generateAxisLabelInterval(period, dataX?.length || 1, granularity || 'none')
            : 'auto',
        },
      },
      yAxis: {
        type: 'value',
        min: minY,
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
        type: 'line',
        smooth: true,
        showSymbol: false,
        data: dataY,
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
        right: 8,
        bottom: 20,
        left: 60,
        show: false,
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        data: dataX,
        axisLabel: {
          formatter(value: string) {
            return generateXAxisLabel(new Date(value), period);
          },
        },
      },
      yAxis: {
        type: 'value',
        min: minY,
        // max: maxY,
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
        type: 'line',
        smooth: true,
        showSymbol: false,
        data: dataY,
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
        top: 8,
        right: 8,
        bottom: 20,
        left: 50,
        show: false,
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        data: dataX,
        axisLabel: {
          formatter(value: string) {
            return generateXAxisLabel(new Date(value), period);
          },
        },
      },
      yAxis: {
        type: 'value',
        min: 0,
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
        type: 'line',
        sampling: 'lttb',
        data: dataY,
        smooth: true,
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
    totalTransactionCount: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      color: ['#cd6661'],
      grid: {
        top: 8,
        right: 8,
        bottom: 20,
        left: 50,
        show: false,
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        data: dataX,
      },
      yAxis: {
        type: 'value',
        min: 0,
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
        type: 'line',
        sampling: 'lttb',
        data: dataY,
        smooth: true,
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
    blockchainSize: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      color: ['#cd6661'],
      grid: {
        top: 8,
        right: 40,
        bottom: 20,
        left: 36,
        show: false,
        containerLabel: true,
      },
      tooltip: {
        trigger: 'axis',
        formatter(params: TChartParams[]) {
          return `<div>
            <div>${generateTooltipLabel(new Date(params[0].axisValue), period)}</div>
            <div>${params[0].marker} ${params[0].value.toFixed(2)} MB</div>
          </div>`;
        },
      },
      xAxis: {
        type: 'category',
        data: dataX,
        boundaryGap: false,
        axisLabel: {
          formatter(value: string) {
            if (period && periods[9].indexOf(period) !== -1) {
              const date = format(new Date(value), 'MM/dd/yyyy');
              if (firstDay !== date) {
                firstDay = date;
                return generateXAxisLabel(new Date(value), period);
              }

              return null;
            }
            return value ? generateXAxisLabel(new Date(value), period) : null;
          },
          interval:
            period && periods[9].indexOf(period) !== -1 && dataX?.length && dataX?.length > 48
              ? 24
              : 'auto',
        },
        splitLine: {
          interval:
            period && periods[9].indexOf(period) !== -1 && dataX?.length && dataX?.length > 48
              ? 22
              : 'auto',
        },
      },
      yAxis: {
        type: 'value',
        min: minY,
        minInterval: period === '24h' ? 0.2 : 1,
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
        },
      },
      series: {
        type: 'line',
        sampling: 'lttb',
        data: dataY,
        smooth: true,
        showSymbol: false,
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
        right: 8,
        bottom: 20,
        left: 50,
        show: false,
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        data: dataX,
        axisLabel: {
          formatter(value: string) {
            return generateXAxisLabel(new Date(value), period);
          },
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
        type: 'line',
        data: dataY,
        areaStyle: {},
        showSymbol: false,
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
        right: 8,
        bottom: 20,
        left: 50,
        show: false,
      },
      tooltip: {
        trigger: 'axis',
        showDelay: 0,
      },
      xAxis: [
        {
          type: 'value',
          scale: true,
          splitLine: {
            lineStyle: {
              color: theme?.splitLineColor,
            },
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          scale: true,
          axisLabel: {
            formatter: '{value}',
          },
          splitLine: {
            show: false,
          },
          min: minY,
          max: maxY,
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
              return `block id: ${params.value[0]}<br/>count: ${params.value[1]} `;
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
        right: 8,
        bottom: 20,
        left: 50,
        show: false,
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        data: dataX,
        axisLabel: {
          formatter(value: string) {
            return generateXAxisLabel(new Date(value), period);
          },
        },
      },
      yAxis: {
        type: 'value',
        min: minY,
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
        },
      },
      series: {
        type: 'line',
        sampling: 'lttb',
        name: 'Accounts',
        data: dataY,
        smooth: true,
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
        right: 8,
        bottom: 20,
        left: 50,
        show: false,
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        data: dataX,
        axisLabel: {
          formatter(value: string) {
            return generateXAxisLabel(new Date(value), period);
          },
        },
      },
      yAxis: {
        type: 'value',
        min: minY,
        max: maxY,
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
        },
        axisLabel: {
          formatter(value: string) {
            return convertYAxisLabel(Number(value), maxY, 3);
          },
        },
      },
      series: {
        type: 'line',
        sampling: 'lttb',
        name: `Total Supply (${getCurrencyName()})`,
        data: dataY,
        smooth: true,
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
        right: 8,
        bottom: 20,
        left: 50,
        show: false,
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        data: dataX,
        axisLabel: {
          formatter(value: string) {
            return generateXAxisLabel(new Date(value), period);
          },
        },
      },
      yAxis: {
        type: 'value',
        min: minY,
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
        },
        axisLabel: {
          formatter(value: string) {
            return convertYAxisLabel(Number(value), maxY, 3);
          },
        },
      },
      series: {
        type: 'line',
        sampling: 'lttb',
        name: `Circulating Supply (${getCurrencyName()})`,
        data: dataY,
        smooth: true,
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
    percentOfPSLStaked: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      color: ['#cd6661'],
      grid: {
        top: 8,
        right: 8,
        bottom: 20,
        left: 50,
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
        data: dataY?.map((d: number) => parseInt((d * 100).toString(), 10)),
        smooth: true,
        showSymbol: false,
      },
      animation: false,
    },
  };

  return chartOptions[chartName];
}

export function getThemeUpdateOption(args: TThemeInitOption): EChartsOption {
  const { theme, dataY, chartName, dataX, minY, maxY } = args;
  const defaultOption: EChartsOption = {
    backgroundColor: theme?.backgroundColor,
    textStyle: {
      color: theme?.color,
    },
    yAxis: {
      splitLine: {
        show: false,
      },
      axisLine: {
        show: true,
      },
    },
    series: [
      {
        type: 'line',
        showSymbol: false,
        data: dataY,
        smooth: theme?.smooth,
        lineStyle: {
          width: 2,
          shadowColor: 'rgba(0,0,0,0.5)',
          shadowBlur: 10,
          shadowOffsetY: 8,
        },
      },
    ],
  };
  const chartOptions: TChartOption = {
    averageblocksize: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      yAxis: {
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
        },
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
      yAxis: {
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
        },
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
      yAxis: {
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
        },
      },
      series: [
        {
          type: 'line',
          showSymbol: false,
          data: dataY,
          smooth: theme?.smooth,
        },
      ],
    },
    totalTransactionCount: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      yAxis: {
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
        },
      },
      series: [
        {
          type: 'line',
          showSymbol: false,
          data: dataY,
          smooth: theme?.smooth,
        },
      ],
    },
    blockchainSize: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      yAxis: {
        min: minY,
        max: maxY - 3,
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
      series: [
        {
          type: 'line',
          showSymbol: false,
          data: dataY,
          smooth: theme?.smooth,
        },
      ],
    },
    difficulty: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      yAxis: {
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
        },
      },
      series: [
        {
          type: 'line',
          showSymbol: false,
          data: dataY,
          smooth: theme?.smooth,
          lineStyle: {
            width: 2,
          },
        },
      ],
    },
    hashrate: defaultOption,
    networktotals: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      yAxis: {
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
        },
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
      yAxis: {
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
        },
      },
    },
    transactionspersecond: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      xAxis: {
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
        },
      },
      series: [
        {
          type: 'line',
          showSymbol: false,
          data: dataY,
          smooth: theme?.smooth,
          lineStyle: {
            width: 2,
            shadowColor: 'rgba(0,0,0,0.5)',
            shadowBlur: 10,
            shadowOffsetY: 8,
          },
        },
      ],
    },
    transactionsinblock: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      xAxis: {
        splitLine: {
          show: false,
          lineStyle: {
            color: theme?.splitLineColor,
          },
        },
      },
      yAxis: {
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
      series: [
        {
          type: 'line',
          showSymbol: false,
          data: dataY,
          smooth: theme?.smooth,
          lineStyle: {
            width: 2,
            shadowColor: 'rgba(0,0,0,0.5)',
            shadowBlur: 10,
            shadowOffsetY: 8,
          },
        },
      ],
    },
    accounts: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      color: ['#5470c6', '#91cc75', '#fac858'],
      grid: {
        top: 8,
        right: 8,
        bottom: 20,
        left: 50,
        show: false,
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
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
          show: true,
        },
        axisLabel: {
          formatter(value: string) {
            return convertYAxisLabel(Number(value), maxY);
          },
        },
      },
      series: {
        type: 'line',
        sampling: 'lttb',
        name: 'Accounts',
        data: dataY,
        smooth: true,
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
    totalSupply: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      color: ['#cd6661'],
      grid: {
        top: 8,
        right: 8,
        bottom: 20,
        left: 50,
        show: false,
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
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
          show: true,
        },
        axisLabel: {
          formatter(value: string) {
            return convertYAxisLabel(Number(value), maxY, 3);
          },
        },
      },
      series: {
        type: 'line',
        sampling: 'lttb',
        name: `Total Supply (${getCurrencyName()})`,
        data: dataY,
        smooth: true,
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
        right: 8,
        bottom: 20,
        left: 50,
        show: false,
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        data: dataX,
      },
      yAxis: {
        type: 'value',
        min: minY,
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
        },
        axisLabel: {
          formatter(value: string) {
            return convertYAxisLabel(Number(value), maxY, 3);
          },
        },
      },
      series: {
        type: 'line',
        sampling: 'lttb',
        name: `Circulating Supply (${getCurrencyName()})`,
        data: dataY,
        smooth: true,
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
    percentOfPSLStaked: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      color: ['#cd6661'],
      grid: {
        top: 8,
        right: 8,
        bottom: 20,
        left: 50,
        show: false,
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: TToolTipParamsProps[]) => {
          return `${params[0].axisValue.split(', ')[0]}<br />${params[0].marker}${
            params[0].seriesName
          }&nbsp;&nbsp;${formatNumber(params[0].data * 100, { decimalsLength: 2 })}`;
        },
      },
      xAxis: {
        type: 'category',
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
        data: dataY,
        smooth: true,
      },
      stateAnimation: {
        duration: 300,
        easing: 'cubicOut',
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
        smooth: true,
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
        smooth: true,
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
        smooth: true,
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
        smooth: true,
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
        smooth: true,
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
        smooth: true,
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
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        show: false,
      },
      series: {
        name: `% of ${getCurrencyName()} Staked: `,
        type: 'bar',
        data: dataY?.map((d: number) => parseInt((d * 100).toString(), 10)),
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
        smooth: false,
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
        smooth: false,
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
        smooth: false,
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
        smooth: true,
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
        smooth: false,
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
          smooth: true,
          showSymbol: false,
          lineStyle: {
            width: 2,
            color: '#ff5500',
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(255, 85, 0, 0.5)',
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
          smooth: true,
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
        smooth: true,
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
  };
  return chartOptions[chartName];
}
