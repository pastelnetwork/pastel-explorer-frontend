import * as React from 'react';
import { useHistory } from 'react-router-dom';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import SearchIcon from '@material-ui/icons/Search';
import MoneyIcon from '@material-ui/icons/Money';
import ShareIcon from '@material-ui/icons/Share';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import InfoIcon from '@material-ui/icons/Info';

import * as routes from '@utils/constants/routes';

import useStyles from './Menu.styles';

interface MenuProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

/* TODO Move routes urls to shared const file */
const menuItems = [
  {
    id: 1,
    url: routes.EXPLORER,
    name: 'Explorer',
    icon: <SearchIcon />,
  },
  {
    id: 2,
    url: routes.MOVEMENT,
    name: 'Movement',
    icon: <MoneyIcon />,
  },
  {
    id: 3,
    url: routes.NETWORK,
    name: 'Network',
    icon: <ShareIcon />,
  },
  {
    id: 4,
    url: routes.RICHLIST,
    name: 'Top 100',
    icon: <LocalAtmIcon />,
  },
  {
    id: 5,
    url: routes.INFO,
    name: 'API',
    icon: <InfoIcon />,
  },
];

const Menu: React.FC<MenuProps> = ({ isOpen, setIsOpen }) => {
  const classes = useStyles();
  const history = useHistory();

  const handleMenuClick = (url: string): void => {
    history.push(url);
  };

  return (
    <Drawer open={isOpen} onClose={() => setIsOpen(false)} anchor="right">
      <div
        className={classes.list}
        role="presentation"
        onClick={() => setIsOpen(false)}
        onKeyDown={() => setIsOpen(false)}
      >
        <List>
          {menuItems.map(({ id, url, name, icon }) => (
            <ListItem button key={id} onClick={() => handleMenuClick(url)}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={name} />
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
};

export default Menu;
