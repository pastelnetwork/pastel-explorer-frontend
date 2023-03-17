import * as URLS from '@utils/constants/urls';
import TelegramIcon from '@components/SvgIcon/TelegramIcon';
import TwitterIcon from '@components/SvgIcon/TwitterIcon';
import DiscordIcon from '@components/SvgIcon/DiscordIcon';
import Medium from '@components/SvgIcon/Medium';

export const footerIcons = [
  { id: 2, url: URLS.TELEGRAM_URL, icon: <TelegramIcon /> },
  { id: 1, url: URLS.TWITTER_URL, icon: <TwitterIcon /> },
  { id: 3, url: URLS.DISCORD_URL, icon: <DiscordIcon /> },
  { id: 4, url: URLS.MEDIUM_URL, icon: <Medium /> },
];
