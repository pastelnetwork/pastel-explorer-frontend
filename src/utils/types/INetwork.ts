export interface INetworkPeers {
  city: string;
  country: string;
  id: string;
  ip: string;
  latitude: number;
  longitude: number;
  nodeId: number;
  protocol: string;
  version: number;
}

export interface INetworkSupernodes {
  address: string;
  city: string;
  country: string;
  id: string;
  ip: string;
  lastPaidBlock: number;
  lastPaidTime: number;
  latitude: number;
  longitude: number;
  port: string;
  status: string;
}

export interface INetwork {
  peers: Array<INetworkPeers>;
  masternodes: Array<INetworkSupernodes>;
}
