import { Box } from '@mui/material';
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
        <Box sx={{ display: { xs: 'flex', sm: 'none', justifyContent: 'center' } }}>
          <SidebarStyles.Brand
            component={NavLink}
            to={ROUTES.EXPLORER}
            button
            className="footer center"
          >
            <SidebarStyles.BrandLogo
              src={isDarkMode ? PastelLogoWhite : PastelLogo}
              alt={
                t('components.footer.pastelLogo.message', {
                  defaultValue: '',
                }) || ''
              }
            />
          </SidebarStyles.Brand>
        </Box>
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
        <Styles.GridStyle item sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Styles.Typography>
            {parse(
              t('components.footer.copyright.message', {
                year: getYear(currentDate),
                defaultValue: '<span class="skeleton-text"></span>',
              }),
            )}
          </Styles.Typography>
        </Styles.GridStyle>
      </div>
      <div>
        <Box sx={{ display: { xs: 'none', sm: 'flex', justifyContent: 'flex-end' } }}>
          <SidebarStyles.Brand component={NavLink} to={ROUTES.EXPLORER} button className="footer">
            <SidebarStyles.BrandLogo
              src={isDarkMode ? PastelLogoWhite : PastelLogo}
              alt={
                t('components.footer.pastelLogo.message', {
                  defaultValue: '',
                }) || ''
              }
            />
          </SidebarStyles.Brand>
        </Box>
        <Social />
      </div>
      <Styles.GridStyle item sx={{ display: { xs: 'block', sm: 'none' } }}>
        <Styles.Typography>
          {parse(
            t('components.footer.copyright.message', {
              year: getYear(currentDate),
              defaultValue: '<span class="skeleton-text"></span>',
            }),
          )}
        </Styles.Typography>
      </Styles.GridStyle>
    </Styles.Container>
  );
};

export default Footer;
