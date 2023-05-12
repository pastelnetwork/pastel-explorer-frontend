import { useState, ChangeEvent, ReactNode } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import format from 'date-fns/format';

import { translate } from '@utils/helpers/i18n';
import { formatAddress } from '@utils/helpers/format';
import RouterLink from '@components/RouterLink/RouterLink';
import Pagination from '@components/Pagination/Pagination';
import * as ROUTES from '@utils/constants/routes';

import * as Styles from './CollectionDetails.styles';

interface ITabPanel {
  value: number;
  index: number;
  children: ReactNode;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const TabPanel: React.FC<ITabPanel> = ({ value, index, children }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

interface INFTCard {
  src: string;
  title: string;
  type: string;
  txid: string;
  timestamp: number;
}

type TNft = {
  id: string;
  src: string;
  title: string;
  type: string;
  txid: string;
  timestamp: number;
};

interface INFTs {
  data: TNft[];
}

const NFTCard: React.FC<INFTCard> = ({ src, title, type, txid, timestamp }) => {
  const getCard = () => {
    return (
      <Box className="card-item">
        <Box className="card-image">
          <Box className="image-box">
            <img src={src} alt={title} />
          </Box>
        </Box>
        <Box className="card-content">
          <Box className="card-title">{title}</Box>
          <Box className="card-price">
            <span className={`label-box ${type?.toLocaleLowerCase()}`}>{type}</span>
          </Box>
          <Box className="card-price">
            <span className="bold">{translate('pages.collection.txID')}:</span>{' '}
            <RouterLink
              route={`${ROUTES.TRANSACTION_DETAILS}/${txid}`}
              value={formatAddress(txid, 5, -5)}
              className="nft-link"
            />
          </Box>
          <Box className="card-last-sale">
            <span className="bold">{translate('pages.collection.created')}:</span>{' '}
            {format(timestamp, 'dd MMM yyyy')}
          </Box>
        </Box>
      </Box>
    );
  };
  const route =
    type === 'Sense'
      ? `${ROUTES.SENSE_DETAILS}?txid=${txid}`
      : `${ROUTES.NFT_DETAILS}?txid=${txid}`;
  return <RouterLink route={route} value={getCard()} className="nft-link" />;
};

export const NFTsContent: React.FC<INFTs> = ({ data }) => {
  return (
    <Styles.NFTsMainContent>
      <Box className="nft-content">
        <Box className="nft-list">
          {data?.map(item => (
            <NFTCard
              key={item.id}
              src={item.src}
              title={item.title}
              type={item.type}
              txid={item.txid}
              timestamp={item.timestamp}
            />
          ))}
        </Box>
      </Box>
    </Styles.NFTsMainContent>
  );
};

const NFTs: React.FC<INFTs> = ({ data }) => {
  const [value, setValue] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const handleTabChange = (event: ChangeEvent<unknown>, newValue: number) => {
    setValue(newValue);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPage = Math.ceil((data.length * 5) / 18);

  return (
    <Styles.NFTsWrapper>
      <Styles.ContentWrapper>
        <AppBar position="static">
          <Tabs value={value} onChange={handleTabChange} aria-label="Items">
            <Tab label="Items" {...a11yProps(0)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <Box>
            <NFTsContent data={data} />
            <Styles.PaginationWrapper>
              <Pagination
                totalPage={totalPage}
                onPageChange={handlePageChange}
                defaultPage={currentPage}
              />
            </Styles.PaginationWrapper>
          </Box>
        </TabPanel>
      </Styles.ContentWrapper>
    </Styles.NFTsWrapper>
  );
};

export default NFTs;
