import * as URLS from '@utils/constants/urls';

import { ReactComponent as TelegramIcon } from '@assets/icons/telegram.svg';
import { ReactComponent as TwitterIcon } from '@assets/icons/twitter.svg';
import { ReactComponent as DiscordIcon } from '@assets/icons/discord.svg';
import { ReactComponent as Medium } from '@assets/icons/medium.svg';

export const footerIcons = [
  { id: 2, url: URLS.TELEGRAM_URL, icon: <TelegramIcon /> },
  { id: 1, url: URLS.TWITTER_URL, icon: <TwitterIcon /> },
  { id: 3, url: URLS.DISCORD_URL, icon: <DiscordIcon /> },
  { id: 4, url: URLS.MEDIUM_URL, icon: <Medium /> },
];
