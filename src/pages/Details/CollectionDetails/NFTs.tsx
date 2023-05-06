import { useState, ChangeEvent, ReactNode, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import * as Styles from './CollectionDetails.styles';

import { mockup } from './mockup';

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
}

const NFTCard: React.FC<INFTCard> = ({ src, title, type }) => {
  return (
    <Box className="card-item">
      <Box className="card-image">
        <Box className="image-box">
          <img src={src} alt={title} />
        </Box>
      </Box>
      <Box className="card-content">
        <Box className="card-title">{title}</Box>
        <Box className="card-price">{type}</Box>
      </Box>
    </Box>
  );
};

const NFTs = () => {
  const [value, setValue] = useState(0);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(true);

  const handleShowAdvanceSearch = () => {
    if (window.innerWidth < 1024 && showAdvancedSearch) {
      setShowAdvancedSearch(false);
    }
  };

  useEffect(() => {
    handleShowAdvanceSearch();
    window.addEventListener('resize', handleShowAdvanceSearch);
    return () => {
      window.removeEventListener('resize', handleShowAdvanceSearch);
    };
  }, []);

  const handleChange = (event: ChangeEvent<unknown>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Styles.NFTsWrapper>
      <Styles.ContentWrapper>
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
            <Tab label="Items" {...a11yProps(0)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <Box className="nft-content">
            <Box className={`nft-list ${showAdvancedSearch ? 'advanced-search' : ''}`}>
              {mockup.map(item => (
                <NFTCard key={item.id} src={item.src} title={item.title} type={item.type} />
              ))}
            </Box>
          </Box>
        </TabPanel>
      </Styles.ContentWrapper>
    </Styles.NFTsWrapper>
  );
};

export default NFTs;
