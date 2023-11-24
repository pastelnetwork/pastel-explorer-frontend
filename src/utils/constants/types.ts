import { ReactNode } from 'react';
import { PeriodTypes, TGranularity } from '@utils/helpers/statisticsLib';
import { TStatisticsInfo } from '@utils/types/IStatistics';

export type TThemeColor = {
  name: string;
  backgroundColor: string;
  lineColor?: string;
  splitLineColor: string;
  color: string;
  stack?: string;
  smooth?: boolean;
};

export type TThemeInitOption = {
  theme?: TThemeColor | null;
  data?: number[][];
  dataX?: string[];
  dataY?: number[];
  dataY1?: number[];
  dataY2?: number[];
  chartName: string;
  minY: number;
  maxY: number;
  darkMode?: boolean;
  gaugeValue?: number;
  minGaugeValue?: number;
  maxGaugeValue?: number;
  period?: PeriodTypes;
  granularity?: TGranularity;
  height?: number;
  width?: number;
  seriesName?: string;
  chartColor?: string;
};

export type TLineChartProps = {
  chartName: string;
  period?: PeriodTypes;
  dataX?: string[];
  dataY?: number[];
  dataY1?: number[];
  dataY2?: number[];
  title?: string | ReactNode;
  granularity?: TGranularity;
  info: TStatisticsInfo;
  granularities?: TGranularity[];
  offset: number;
  periods?: PeriodTypes[];
  yaxisName?: string;
  yaxisName1?: string;
  seriesName?: string;
  seriesName1?: string;
  fixedNum?: number;
  fixedNum1?: number;
  handleGranularityFilterChange?: (_granularity: TGranularity) => void;
  handleBgColorChange: (_color: string) => void;
  handlePeriodFilterChange?: (_period: PeriodTypes) => void;
  setHeaderBackground?: boolean;
  isDynamicTitleColor?: boolean;
  hideLineHeader?: boolean;
  gaugeValue?: number;
  minGaugeValue?: number;
  maxGaugeValue?: number;
  subTitle?: string;
  customHtml?: ReactNode;
  isLoading?: boolean;
  seriesName1Type?: string;
  color?: string[];
  showLegend?: boolean;
  symbol?: string;
  symbol1?: string;
};

type LabelKeyObject = {
  [key: string]: string | number;
};

export type TCsvHeaderType = {
  [key: string]: LabelKeyObject[];
};

export type TScatterChartProps = {
  chartName: string;
  data?: number[][];
  dataX?: string[];
  title?: string | ReactNode;
  period?: PeriodTypes;
  info: TStatisticsInfo;
  offset: number;
  periods: PeriodTypes[];
  handleBgColorChange: (_color: string) => void;
  handlePeriodFilterChange?: (_period: PeriodTypes) => void;
  handleGranularityFilterChange?: (_granularity: TGranularity) => void;
  setHeaderBackground?: boolean;
  isDynamicTitleColor?: boolean;
  isLoading?: boolean;
};
