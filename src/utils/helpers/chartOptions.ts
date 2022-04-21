import * as echarts from 'echarts';
import { EChartsOption } from 'echarts-for-react';

// aplication
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { getCurrencyName } from '@utils/appInfo';
import { TThemeInitOption } from '@utils/constants/types';
import { convertYAxisLabel } from '@utils/helpers/statisticsLib';

type TChartOption = {
  [index: string]: EChartsOption;
};

type TTxInBlock = {
  value: string[][];
};

export function getThemeInitOption(args: TThemeInitOption): EChartsOption {
  const { theme, data, dataX, dataY, dataY1, dataY2, chartName, minY, maxY } = args;
  const chartOptions: TChartOption = {
    difficulty: {
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
      },
      yAxis: {
        type: 'value',
        min: minY,
        max: maxY,
        splitLine: {
          lineStyle: {
            color: theme?.splitLineColor,
          },
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
        showSymbol: false,
        data: dataY,
        lineStyle: {
          width: 3,
          shadowColor: 'rgba(0,0,0,0.5)',
          shadowBlur: 10,
          shadowOffsetY: 12,
        },
      },
      stateAnimation: {
        duration: 300,
        easing: 'cubicOut',
      },
    },
    hashrate: {
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
      },
      yAxis: {
        type: 'value',
        min: minY,
        max: maxY,
        splitLine: {
          lineStyle: {
            color: theme?.splitLineColor,
          },
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
        smooth: true,
        symbol: false,
        showSymbol: false,
        lineStyle: {
          width: 3,
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
              color: '#000',
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
        left: 50,
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
      },
      yAxis: {
        type: 'value',
        splitLine: {
          lineStyle: {
            color: theme?.splitLineColor,
          },
        },
        axisLabel: {
          formatter(value: string) {
            const val = Number.parseFloat(value);
            return `${val / 1000000} M`;
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
      stateAnimation: {
        duration: 300,
        easing: 'cubicOut',
      },
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
      },
      yAxis: {
        type: 'value',
        min: minY,
        max: maxY,
        splitLine: {
          lineStyle: {
            color: theme?.splitLineColor,
          },
        },
        axisLine: {
          show: true,
        },
        axisLabel: {
          formatter(value: string) {
            if (maxY > 1000000) {
              return `${Math.round(Number(value) / 1000000)} M`;
            }
            if (maxY > 1000) {
              return `${Math.round(Number(value) / 1000)} K`;
            }
            return `${Number(value)} k`;
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
      stateAnimation: {
        duration: 300,
        easing: 'cubicOut',
      },
    },
    averageblocksize: {
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
      },
      yAxis: {
        type: 'value',
        min: minY,
        max: maxY,
        splitLine: {
          lineStyle: {
            color: theme?.splitLineColor,
          },
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
      stateAnimation: {
        duration: 300,
        easing: 'cubicOut',
      },
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
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: maxY,
        splitLine: {
          lineStyle: {
            color: theme?.splitLineColor,
          },
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
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: maxY,
        splitLine: {
          lineStyle: {
            color: theme?.splitLineColor,
          },
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
      },
      stateAnimation: {
        duration: 300,
        easing: 'cubicOut',
      },
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
          axisLabel: {
            formatter: '{value}',
          },
          splitLine: {
            show: false,
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
            lineStyle: {
              color: theme?.splitLineColor,
            },
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
        },
      ],
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
    yAxis: {
      splitLine: {
        lineStyle: {
          color: theme?.splitLineColor,
        },
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
          width: 3,
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
          lineStyle: {
            color: theme?.splitLineColor,
          },
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
          lineStyle: {
            color: theme?.splitLineColor,
          },
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
    difficulty: defaultOption,
    hashrate: defaultOption,
    networktotals: {
      backgroundColor: theme?.backgroundColor,
      textStyle: {
        color: theme?.color,
      },
      yAxis: {
        splitLine: {
          lineStyle: {
            color: theme?.splitLineColor,
          },
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
          lineStyle: {
            color: theme?.splitLineColor,
          },
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
          lineStyle: {
            color: theme?.splitLineColor,
          },
        },
      },
      yAxis: {
        splitLine: {
          show: false,
          lineStyle: {
            color: theme?.splitLineColor,
          },
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
            width: 3,
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
          lineStyle: {
            color: theme?.splitLineColor,
          },
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
            width: 3,
            shadowColor: 'rgba(0,0,0,0.5)',
            shadowBlur: 10,
            shadowOffsetY: 8,
          },
        },
      ],
    },
  };
  return chartOptions[chartName];
}

type TToolTipParamsProps = {
  axisValue: string;
  marker: string;
  seriesName: string;
  data: number;
};

export function getSummaryThemeUpdateOption(args: TThemeInitOption): EChartsOption {
  const { theme, dataX, dataY, chartName, minY, maxY } = args;

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
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#5470C6',
            },
            {
              offset: 1,
              color: '#fff',
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
          width: 3,
          shadowColor: 'rgba(0,0,0,0.5)',
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
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#cd6661',
            },
            {
              offset: 1,
              color: '#fff',
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
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#5470C6',
            },
            {
              offset: 1,
              color: '#fff',
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
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#5470C6',
            },
            {
              offset: 1,
              color: '#fff',
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
        name: 'Block Size (avg): ',
        type: 'line',
        sampling: 'lttb',
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
              color: '#fff',
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
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#cd6661',
            },
            {
              offset: 1,
              color: '#fff',
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
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#cd6661',
            },
            {
              offset: 1,
              color: '#fff',
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
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#1A4369',
            },
            {
              offset: 1,
              color: '#fff',
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
  };
  return chartOptions[chartName];
}
