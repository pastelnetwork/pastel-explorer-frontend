import {
  Twitter as TwitterIcon,
  Telegram as TelegramIcon,
  GitHub as GitHubIcon,
} from '@material-ui/icons';

import * as URLS from '@utils/constants/urls';

export const footerIcons = [
  { id: 1, url: URLS.TWITTER_URL, icon: <TwitterIcon /> },
  { id: 2, url: URLS.TELEGRAM_URL, icon: <TelegramIcon /> },
  { id: 3, url: URLS.GITHUB_URL, icon: <GitHubIcon /> },
];
