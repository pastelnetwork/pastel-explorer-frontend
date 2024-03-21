import Box from '@mui/material/Box';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import parse from 'html-react-parser';

import { translate } from '@utils/helpers/i18n';

export const getActivityType = (type: string) => {
  switch (type) {
    case 'offer':
      return (
        <Box className="event">
          <LocalGroceryStoreIcon className="offer" /> {parse(translate('pages.nftDetails.offer'))}
        </Box>
      );
    case 'accept':
      return (
        <Box className="event">
          <DoneAllIcon className="accept" /> {parse(translate('pages.nftDetails.accept'))}
        </Box>
      );
    case 'nft-reg':
      return (
        <Box className="event">
          <TouchAppIcon className="accept" /> {parse(translate('pages.nftDetails.registration'))}
        </Box>
      );
    case 'nft-act':
      return (
        <Box className="event">
          <AssignmentTurnedInIcon className="accept" />{' '}
          {parse(translate('pages.nftDetails.activation'))}
        </Box>
      );
    default:
      return (
        <Box className="event">
          <SwapHorizIcon className="transfer" /> {parse(translate('pages.nftDetails.transfer'))}
        </Box>
      );
  }
};

export const activityFakeData = [
  {
    type: 'nft-reg',
    transactionHash: '604b4dd613e896155be60ca33c47492afdfde265facc9ef3e81d9aa0683e87f8',
    timestamp: 1681631425000,
    pastelId:
      'jXYjBDCtQk6c77DxTFVM28Cwuy6JkRGgbrhvES9paHZQEyg4ocD4a7GBs9XBk9na3fs7zcmcgZv77ugU4aoU8d',
    version: 1,
  },
  {
    type: 'nft-act',
    transactionHash: '604b4dd613e896155be60ca33c47492afdfde265facc9ef3e81d9aa0683e87f8',
    timestamp: 1681635025000,
    pastelId:
      'jXYjBDCtQk6c77DxTFVM28Cwuy6JkRGgbrhvES9paHZQEyg4ocD4a7GBs9XBk9na3fs7zcmcgZv77ugU4aoU8d',
    version: 1,
  },
  {
    type: 'offer',
    transactionHash: 'f8df435175e4c16dfc92d8c04344a707ca500813ef38a335449cc214b6346225',
    timestamp: 1681980625000,
    pastelId:
      'jXYjBDCtQk6c77DxTFVM28Cwuy6JkRGgbrhvES9paHZQEyg4ocD4a7GBs9XBk9na3fs7zcmcgZv77ugU4aoU8d',
    version: 1,
  },
  {
    type: 'accept',
    transactionHash: '604b4dd613e896155be60ca33c47492afdfde265facc9ef3e81d9aa0683e87f8',
    timestamp: 1681991425000,
    pastelId:
      'jXYjBDCtQk6c77DxTFVM28Cwuy6JkRGgbrhvES9paHZQEyg4ocD4a7GBs9XBk9na3fs7zcmcgZv77ugU4aoU8d',
    version: 1,
  },
  {
    type: 'transfer',
    transactionHash: '604b4dd613e896155be60ca33c47492afdfde265facc9ef3e81d9aa0683e87f8',
    timestamp: 1681998625000,
    pastelId:
      'jXYjBDCtQk6c77DxTFVM28Cwuy6JkRGgbrhvES9paHZQEyg4ocD4a7GBs9XBk9na3fs7zcmcgZv77ugU4aoU8d',
    version: 1,
  },
];
