import { LabelKeyObject } from 'react-csv/components/CommonPropTypes';
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
};

export type TLineChartProps = {
  chartName: string;
  period?: PeriodTypes;
  dataX?: string[];
  dataY?: number[];
  dataY1?: number[];
  dataY2?: number[];
  title?: string;
  granularity?: TGranularity;
  info: TStatisticsInfo;
  granularities?: TGranularity[];
  offset: number;
  periods?: PeriodTypes[];
  handleGranularityFilterChange?: (_granularity: TGranularity) => void;
  handleBgColorChange: (_color: string) => void;
  handlePeriodFilterChange?: (_period: PeriodTypes) => void;
};

export type TCsvHeaderType = {
  [key: string]: LabelKeyObject[];
};

export type TScatterChartProps = {
  chartName: string;
  data: number[][];
  dataX: string[];
  title?: string;
  period?: PeriodTypes;
  info: TStatisticsInfo;
  offset: number;
  periods: PeriodTypes[];
  handleBgColorChange: (_color: string) => void;
  handlePeriodFilterChange?: (_period: PeriodTypes) => void;
  handleGranularityFilterChange?: (_granularity: TGranularity) => void;
};
