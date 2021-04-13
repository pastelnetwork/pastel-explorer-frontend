export interface ISummaryResponse {
  data: {
    blockcount: number;
    connections: number;
    difficulty: number;
    difficultyHybrid: string;
    hashrate: string;
    lastPrice: number;
    supply: number;
  }[];
}
