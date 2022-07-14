import React from 'react';

import { footerIcons } from './Social.helpers';
import * as Styles from './Social.styles';

export default function Social(): JSX.Element {
  return (
    <Styles.Items>
      {footerIcons.map(({ id, url, icon }) => (
        <Styles.Item key={id}>
          <Styles.IconButtonLink target="_blank" href={url} className="social-icon">
            {icon}
          </Styles.IconButtonLink>
        </Styles.Item>
      ))}
    </Styles.Items>
  );
}
