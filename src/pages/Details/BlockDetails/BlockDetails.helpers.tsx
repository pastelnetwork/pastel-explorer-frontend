import { Grid, Typography } from '@mui/material';
import parse from 'html-react-parser';
import { Node, Edge, Position, MarkerType } from 'reactflow';
import dagre from 'dagre';

import { getCurrencyName } from '@utils/appInfo';
import { formatAddress } from '@utils/helpers/format';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { IBlock } from '@utils/types/IBlocks';
import { HeaderType } from '@components/Table/Table';

import * as Styles from './BlockDetails.styles';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

export const blockHeaders: Array<HeaderType> = [
  { id: 1, header: 'pages.blockDetails.height' },
  { id: 3, header: 'pages.blockDetails.confirmations' },
  { id: 4, header: 'pages.blockDetails.size' },
  { id: 6, header: 'pages.blockDetails.timestamp' },
];

export const transactionHeaders: Array<HeaderType> = [
  { id: 1, header: 'pages.blockDetails.txId', key: 'id' },
  { id: 2, header: 'pages.blockDetails.recipients', key: 'recipientCount' },
  { id: 3, header: 'pages.blockDetails.tickets', key: 'totalTickets' },
  { id: 4, header: 'pages.blockDetails.amount', key: 'totalAmount' },
];

export const generateDetailsElement = (name: string, value: string) => (
  <Styles.DetailsContainer container>
    <Styles.DetailsDescription item>
      <Typography>{parse(name)}</Typography>
    </Styles.DetailsDescription>
    <Grid item>
      <Styles.DetailsValueText>{value}</Styles.DetailsValueText>
    </Grid>
  </Styles.DetailsContainer>
);

export const getGraphChartData = (block: IBlock) => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const position = { x: 0, y: 0 };

  const isHorizontal = block.transactions?.length < 3;
  const nodeWidth = isHorizontal ? 110 : 50;
  const nodeHeight = isHorizontal ? 30 : 90;
  const edgeNodeWidth = isHorizontal ? 72 : 18;
  const edgeNodeHeight = isHorizontal ? 18 : 72;

  if (block.transactions?.length) {
    nodes.push({
      id: `block-${block.height}`,
      sourcePosition: 'right' as Position,
      data: { label: `${block.height}` },
      position,
      connectable: false,
      style: {
        borderRadius: '4px',
        width: '50px',
        height: '30px',
        padding: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '10px',
      },
      width: nodeWidth,
      height: nodeHeight,
    });

    let counter = 1;
    block.transactions.forEach(transaction => {
      const addresses = block.addresses?.filter(e => e.transactionHash === transaction.id);
      nodes.push({
        id: `node-block-trans-${counter}`,
        sourcePosition: 'right' as Position,
        targetPosition: 'left' as Position,
        data: { label: `${counter}` },
        position,
        style: {
          borderRadius: '4px',
          width: '18px',
          height: '18px',
          padding: '2px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#E8CD95',
          color: '#000',
          fontSize: '10px',
        },
        width: edgeNodeWidth,
        height: edgeNodeHeight,
      });
      edges.push({
        id: `edges-node-block-trans-${counter}`,
        source: `block-${block.height}`,
        target: `node-block-trans-${counter}`,
        data: {
          label: `${formatNumber(transaction.totalAmount, { decimalsLength: 2 })} ${getCurrencyName()}`,
          isHorizontal,
          type: 'block',
        },
        markerEnd: {
          type: MarkerType.Arrow,
        },
        type: 'custom',
        style: {
          fontSize: '10px',
        },
      });
      nodes.push({
        id: `trans-${transaction.id}`,
        sourcePosition: 'right' as Position,
        targetPosition: 'left' as Position,
        data: { label: `${formatAddress(transaction.id, 3, -3)}` },
        position,
        style: {
          borderRadius: '4px',
          width: '50px',
          height: '30px',
          padding: '5px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '10px',
        },
        width: nodeWidth,
        height: nodeHeight,
      });
      edges.push({
        id: `edges-node-block-trans-trans-2-${counter}`,
        source: `node-block-trans-${counter}`,
        target: `trans-${transaction.id}`,
        data: {
          label: `${formatNumber(transaction.totalAmount, { decimalsLength: 2 })} ${getCurrencyName()}`,
          isHorizontal,
        },
        markerEnd: {
          type: MarkerType.Arrow,
        },
        type: 'custom',
        style: {
          fontSize: '10px',
        },
      });
      counter += 1;
      if (addresses?.length) {
        nodes.push({
          id: `node-trans-address-${counter}`,
          sourcePosition: 'right' as Position,
          targetPosition: 'left' as Position,
          data: { label: `${counter}` },
          position,
          style: {
            borderRadius: '4px',
            width: '18px',
            height: '18px',
            padding: '2px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#E8CD95',
            color: '#000',
            fontSize: '10px',
          },
          width: edgeNodeWidth,
          height: edgeNodeHeight,
        });
        edges.push({
          id: `edges-node-trans-address-${counter}`,
          source: `trans-${transaction.id}`,
          target: `node-trans-address-${counter}`,
          data: {
            label: `${formatNumber(transaction.totalAmount, { decimalsLength: 2 })} ${getCurrencyName()}`,
            isHorizontal,
          },
          markerEnd: {
            type: MarkerType.Arrow,
          },
          type: 'custom',
          style: {
            fontSize: '10px',
          },
        });
        addresses.forEach((address, index) => {
          nodes.push({
            id: `address-detail-${index}-${transaction.id}-${address.address}`,
            sourcePosition: 'right' as Position,
            targetPosition: 'left' as Position,
            data: { label: `${formatAddress(address.address, 3, -3)}` },
            position,
            style: {
              borderRadius: '4px',
              width: '50px',
              height: '30px',
              padding: '5px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '10px',
            },
            width: nodeWidth,
            height: nodeHeight,
          });
          edges.push({
            id: `node-trans-address-end-${index}-${transaction.id}-${address.address}-${counter}`,
            source: `node-trans-address-${counter}`,
            target: `address-detail-${index}-${transaction.id}-${address.address}`,
            data: {
              label: `${formatNumber(address.amount, { decimalsLength: 2 })} ${getCurrencyName()}`,
              type: 'address',
              isHorizontal,
            },
            markerEnd: {
              type: MarkerType.Arrow,
            },
            type: 'custom',
            style: {
              fontSize: '10px',
            },
          });
        });
        counter += 1;
      }
    });
  }

  dagreGraph.setGraph({ rankdir: isHorizontal ? 'LR' : 'TB' });
  nodes.forEach(node => {
    dagreGraph.setNode(node.id, { width: node.width, height: node.height });
  });

  edges.forEach(edge => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach(node => {
    const newNode = node;
    const nodeWithPosition = dagreGraph.node(node.id);
    newNode.targetPosition = (isHorizontal ? 'left' : 'top') as Position;
    newNode.sourcePosition = (isHorizontal ? 'right' : 'bottom') as Position;

    const width = node.width || 0;
    const height = node.height || 0;
    newNode.position = {
      x: nodeWithPosition.x - width / 2,
      y: nodeWithPosition.y - height / 2,
    };

    return newNode;
  });

  return {
    nodes,
    edges,
  };
};
