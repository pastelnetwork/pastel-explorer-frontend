import { MouseEvent, useState } from 'react';
import ReactFlow, { useNodesState, useEdgesState, Node } from 'reactflow';
import { Typography, Popover, Box } from '@mui/material';
import parse from 'html-react-parser';

// eslint-disable-next-line import/no-extraneous-dependencies
import 'reactflow/dist/style.css';

import { getCurrencyName } from '@utils/appInfo';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { IBlock } from '@utils/types/IBlocks';
import * as TableStyles from '@components/Table/Table.styles';
import * as PastelIdStyles from '@pages/Details/PastelIdDetails/PastelIdDetails.styles';
import * as SupernodesStyles from '@pages/Supernodes/Supernodes.styles';
import { ITransactionAddress } from '@utils/types/IAddress';
import { translate } from '@utils/helpers/i18n';

import * as Styles from './BlockDetails.styles';
import { getGraphChartData } from './BlockDetails.helpers';

export default function GraphChart({ block }: { block: IBlock }) {
  const data = getGraphChartData(block);
  const [nodes] = useNodesState(data.nodes);
  const [edges] = useEdgesState(data.edges);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<ITransactionAddress | null>(null);

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

  return (
    <Styles.GridStyle item>
      <TableStyles.BlockWrapper className="mb-0">
        <PastelIdStyles.BlockWrapper className="ticket-title-wrapper">
          <SupernodesStyles.TitleWrapper>
            <strong>{parse(translate('pages.blockDetails.chartTransactions'))}</strong>
          </SupernodesStyles.TitleWrapper>
        </PastelIdStyles.BlockWrapper>
        <SupernodesStyles.ContentWrapper style={{ height: '500px' }}>
          <ReactFlow nodes={nodes} edges={edges} fitView onNodeClick={handleNodeMouseEnter} />
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            {selectedAddress ? (
              <Box sx={{ p: 2 }}>
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
              </Box>
            ) : null}
          </Popover>
        </SupernodesStyles.ContentWrapper>
      </TableStyles.BlockWrapper>
    </Styles.GridStyle>
  );
}
