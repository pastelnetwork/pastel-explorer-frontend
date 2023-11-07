import { Box, Hidden } from '@material-ui/core';
import getYear from 'date-fns/getYear';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import parse from 'html-react-parser';

import Social from '@components/Social/Social';
import { currentDate } from '@utils/helpers/date/date';
import * as ROUTES from '@utils/constants/routes';
import { getThemeState } from '@redux/reducers/appThemeReducer';

import PastelLogoWhite from '@assets/images/pastel-logo-white.svg';
import PastelLogo from '@assets/images/pastel-logo.svg';

import { footerMenu } from './Footer.helpers';
import * as Styles from './Footer.styles';
import * as SidebarStyles from '../Sidebar/Sidebar.styles';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const isDarkMode = useSelector(getThemeState).darkMode;

  return (
    <Styles.Container>
      <div>
        <Hidden smUp implementation="js">
          <SidebarStyles.Brand
            component={NavLink}
            to={ROUTES.EXPLORER}
            button
            className="footer center"
          >
            <Box>
              <SidebarStyles.BrandLogo
                src={isDarkMode ? PastelLogoWhite : PastelLogo}
                alt={
                  t('components.footer.pastelLogo.message', {
                    defaultValue: '',
                  }) || ''
                }
              />
            </Box>
          </SidebarStyles.Brand>
        </Hidden>
        <Styles.FooterMenuWrapper>
          {footerMenu.map(menu => (
            <Styles.FooterMenuBlock key={menu.id}>
              <Styles.FooterMenuTitle>
                {parse(
                  t(`${menu.title}.message`, {
                    defaultValue: '<span class="skeleton-text"></span>',
                  }),
                )}
              </Styles.FooterMenuTitle>
              {menu.children.length ? (
                <Styles.FooterMenuList>
                  {menu.children.map(item => (
                    <Styles.FooterMenuItem key={item.path}>
                      <Styles.FooterMenuLink href={item.path} target={item.target}>
                        {parse(
                          t(`${item.name}.message`, {
                            defaultValue: '<span class="skeleton-text"></span>',
                          }),
                        )}
                      </Styles.FooterMenuLink>
                    </Styles.FooterMenuItem>
                  ))}
                </Styles.FooterMenuList>
              ) : null}
            </Styles.FooterMenuBlock>
          ))}
        </Styles.FooterMenuWrapper>
        <Hidden xsDown implementation="css">
          <Styles.GridStyle item>
            <Styles.Typography>
              {parse(
                t('components.footer.copyright.message', {
                  year: getYear(currentDate),
                  defaultValue: '<span class="skeleton-text"></span>',
                }),
              )}
            </Styles.Typography>
          </Styles.GridStyle>
        </Hidden>
      </div>
      <div>
        <Hidden xsDown implementation="css">
          <SidebarStyles.Brand component={NavLink} to={ROUTES.EXPLORER} button className="footer">
            <Box>
              <SidebarStyles.BrandLogo
                src={isDarkMode ? PastelLogoWhite : PastelLogo}
                alt={
                  t('components.footer.pastelLogo.message', {
                    defaultValue: '',
                  }) || ''
                }
              />
            </Box>
          </SidebarStyles.Brand>
        </Hidden>
        <Social />
      </div>
      <Hidden smUp implementation="js">
        <Styles.GridStyle item>
          <Styles.Typography>
            {parse(
              t('components.footer.copyright.message', {
                year: getYear(currentDate),
                defaultValue: '<span class="skeleton-text"></span>',
              }),
            )}
          </Styles.Typography>
        </Styles.GridStyle>
      </Hidden>
    </Styles.Container>
  );
};

export default Footer;
