import { MouseEvent, useState, FC } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  Node,
  useReactFlow,
  ReactFlowProvider,
  EdgeProps,
  // getBezierPath,
  getSmoothStepPath,
  EdgeLabelRenderer,
  BaseEdge,
  EdgeTypes,
  MarkerType,
} from 'reactflow';
import { Typography, Popper } from '@mui/material';
import parse from 'html-react-parser';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line import/no-extraneous-dependencies
import 'reactflow/dist/style.css';

import { getCurrencyName } from '@utils/appInfo';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { IBlock } from '@utils/types/IBlocks';
import * as TableStyles from '@components/Table/Table.styles';
import * as PastelIdStyles from '@pages/Details/PastelIdDetails/PastelIdDetails.styles';
import * as SupernodesStyles from '@pages/Supernodes/Supernodes.styles';
import { ITransactionAddress } from '@utils/types/IAddress';
import { getThemeState } from '@redux/reducers/appThemeReducer';
import { translate } from '@utils/helpers/i18n';
import * as ROUTES from '@utils/constants/routes';

import * as Styles from './BlockDetails.styles';
import { getGraphChartData } from './BlockDetails.helpers';

const CustomEdge: FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  markerEnd,
  style,
}) => {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: 0,
  });

  let transform = `translate(-50%, -55%) translate(${labelX}px,${labelY}px)`;
  if (data?.type === 'address') {
    transform = `translateX(-30%) translate(${labelX + 10}px,${targetY - 5}px)`;
  }
  if (!data.isHorizontal) {
    transform = `translateX(-50%) translate(${targetX}px,${labelY - 5}px)`;
    if (data?.type === 'address') {
      transform = `translate(-50%, -50%) translate(${targetX}px,${labelY + 15}px)`;
    }
    if (data?.type === 'block') {
      transform = `translateX(-50%) translate(${targetX}px,${labelY + 20}px)`;
    }
  }
  const isDarkMode = useSelector(getThemeState).darkMode;

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <BaseEdge id={id} path={edgePath} markerEnd={MarkerType.Arrow} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform,
            background: isDarkMode ? '#2D3748' : '#fff',
            padding: `0 5px`,
            borderRadius: 0,
            fontSize: !data.isHorizontal ? '10px' : '8px',
            lineHeight: 1,
            fontWeight: 400,
            textAlign: 'left',
          }}
          className="nodrag nopan"
        >
          {data.label}
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

const edgeTypes: EdgeTypes = {
  custom: CustomEdge,
};

function ReactFlowChart({ block }: { block: IBlock }) {
  const navigate = useNavigate();
  const data = getGraphChartData(block);
  const [nodes] = useNodesState(data.nodes);
  const [edges] = useEdgesState(data.edges);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<ITransactionAddress | null>(null);
  const [isDefaultZoom, setDefaultZoom] = useState(false);
  const { setCenter, getZoom, getNode, getViewport } = useReactFlow();

  const handleNodeMouseEnter = (event: MouseEvent, node: Node) => {
    const isAddress = node.id.indexOf('address-detail-') !== -1;
    if (isAddress) {
      if (anchorEl) {
        setAnchorEl(null);
        setSelectedAddress(null);
      } else {
        setAnchorEl(event.currentTarget as HTMLButtonElement);
        const parseId = node.id.split('-');
        const currentAddress = block.addresses?.find(
          add =>
            add.address === parseId[parseId.length - 1] &&
            add.transactionHash === parseId[parseId.length - 2],
        );
        if (currentAddress) {
          setSelectedAddress(currentAddress);
        }
      }
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleZoom = () => {
    if (!isDefaultZoom && block.transactions.length > 2) {
      setTimeout(() => {
        const zoom = getZoom();
        const viewport = getViewport();
        const node = getNode(`block-${block.height}`);
        setCenter(node?.position?.x || 0, viewport.y + 90, {
          zoom: zoom + 0.5,
        });
        setDefaultZoom(true);
      }, 500);
    }
  };

  const handleNodeClick = (event: MouseEvent, node: Node) => {
    switch (node?.data?.type) {
      case 'transaction':
        navigate(`${ROUTES.TRANSACTION_DETAILS}/${node.data.label}`);
        break;
      case 'address':
        navigate(`${ROUTES.ADDRESS_DETAILS}/${node.data.label}`);
        break;
      default:
        break;
    }
  };

  return (
    <Styles.GridStyle item>
      <TableStyles.BlockWrapper className="mb-0">
        <PastelIdStyles.BlockWrapper className="ticket-title-wrapper">
          <SupernodesStyles.TitleWrapper>
            <strong>{parse(translate('pages.blockDetails.chartTransactions'))}</strong>
          </SupernodesStyles.TitleWrapper>
        </PastelIdStyles.BlockWrapper>
        <SupernodesStyles.ContentWrapper style={{ height: '500px' }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodeMouseEnter={handleNodeMouseEnter}
            onNodeMouseLeave={handleClose}
            onNodeClick={handleNodeClick}
            edgeTypes={edgeTypes}
            fitView
            onInit={handleZoom}
          />
          <Popper id={id} open={open} anchorEl={anchorEl}>
            {selectedAddress ? (
              <Styles.FlowNodeTooltip sx={{ p: 3 }}>
                <Typography sx={{ mb: 2 }}>
                  <strong>{parse(translate('pages.blockDetails.address'))}:</strong>{' '}
                  {selectedAddress.address}
                </Typography>
                <Typography sx={{ mb: 2 }}>
                  <strong>{parse(translate('pages.blockDetails.beforeTransactions'))}:</strong>{' '}
                  {formatNumber(selectedAddress.preTotal, { decimalsLength: 2 })}{' '}
                  {getCurrencyName()}
                </Typography>
                <Typography sx={{ mb: 2 }}>
                  <strong>{parse(translate('pages.blockDetails.afterTransactions'))}:</strong>{' '}
                  {formatNumber(selectedAddress.amount + selectedAddress.preTotal, {
                    decimalsLength: 2,
                  })}{' '}
                  {getCurrencyName()}
                </Typography>
                <Typography>
                  <strong>{parse(translate('pages.blockDetails.currentBalance'))}:</strong>{' '}
                  {formatNumber(selectedAddress.total, { decimalsLength: 2 })} {getCurrencyName()}
                </Typography>
              </Styles.FlowNodeTooltip>
            ) : null}
          </Popper>
        </SupernodesStyles.ContentWrapper>
      </TableStyles.BlockWrapper>
    </Styles.GridStyle>
  );
}

export default function GraphChart({ block }: { block: IBlock }) {
  return (
    <ReactFlowProvider>
      <ReactFlowChart block={block} />
    </ReactFlowProvider>
  );
}
