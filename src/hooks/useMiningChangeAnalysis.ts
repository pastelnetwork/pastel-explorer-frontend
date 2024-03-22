import useSWRInfinite from 'swr/infinite';
import Papa from 'papaparse';

import { axiosGet } from '@utils/helpers/useFetch/useFetch';
import * as URLS from '@utils/constants/urls';
import { SWR_OPTIONS } from '@utils/constants/statistics';

export type TRows = {
  hash: string;
  confirmations: number;
  size: number;
  height: number;
  version: string;
  merkleroot: string;
  finalsaplingroot: string;
  time: number;
  nonce: string;
  solution: string;
  bits: string;
  difficulty: number;
  chainwork: string;
  anchor: string;
  pastelid: string;
  prevMerkleRootSignature: string;
  valuePools: string;
  previousblockhash: string;
  nextblockhash: string;
  mined_with_pool: number;
  datetime: string;
  time_between_blocks_in_minutes: number;
  probability_of_block_time_assuming_stable_hashrate: number;
  triggered_everyone_is_eligible: number;
  mining_difficulty_change: number;
  log_of_mining_bits_target: number;
  change_in_log_of_mining_bits_target: number;
  blocks_since_same_pastelid_signed: number;
  trailing_10_block_difficulty_mean: number;
  trailing_50_block_difficulty_mean: number;
  trailing_100_block_difficulty_mean: number;
  trailing_10_block_average_block_time: number;
  trailing_50_block_average_block_time: number;
  trailing_10_block_st_deviation_of_block_time: number;
  trailing_50_block_st_deviation_of_block_time: number;
  trailing_50_block_average_blocks_since_same_pastelid_signed: number;
};

type TRowItems = {
  [key: string]: string | number;
};

const getData = (value: string) => {
  const parseData = Papa.parse(value).data;
  if (parseData.length) {
    const header: string[] = parseData[0] as string[];
    const newParseData = parseData.slice(1, parseData.length - 1) as Array<string[]>;
    const results: TRows[] = [];
    for (let j = 0; j < newParseData.length; j += 1) {
      const items: TRowItems = {};
      const rowValues = newParseData[j];
      for (let i = 0; i < rowValues.length; i += 1) {
        switch (header[i]) {
          case 'confirmations':
          case 'size':
          case 'height':
          case 'time':
          case 'difficulty':
          case 'mined_with_pool':
          case 'time_between_blocks_in_minutes':
          case 'probability_of_block_time_assuming_stable_hashrate':
          case 'triggered_everyone_is_eligible':
          case 'mining_difficulty_change':
          case 'log_of_mining_bits_target':
          case 'change_in_log_of_mining_bits_target':
          case 'blocks_since_same_pastelid_signed':
          case 'trailing_10_block_difficulty_mean':
          case 'trailing_50_block_difficulty_mean':
          case 'trailing_100_block_difficulty_mean':
          case 'trailing_10_block_average_block_time':
          case 'trailing_50_block_average_block_time':
          case 'trailing_10_block_st_deviation_of_block_time':
          case 'trailing_50_block_st_deviation_of_block_time':
          case 'trailing_50_block_average_blocks_since_same_pastelid_signed':
            items[header[i]] = Number(rowValues[i]) || 0;
            break;
          default:
            items[header[i]] = rowValues[i] || '';
            break;
        }
      }
      results.push(items as TRows);
    }
    return results;
  }

  return [];
};

export const URL = `${process.env.REACT_APP_EXPLORER_MINING_ANALYSIS_API_URL}/${URLS.DO_MINING_CHANGE_ANALYSIS}/1000/`;

export default function useMiningChangeAnalysis() {
  const { data, isLoading } = useSWRInfinite(() => URL, axiosGet, SWR_OPTIONS);

  return {
    data: data ? getData(data[0]) : null,
    isLoading,
  };
}
