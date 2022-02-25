import React from 'react';
import { IconButton } from '@material-ui/core';

import { footerIcons } from './Social.helpers';
import * as Styles from './Social.styles';

export default function Social(): JSX.Element {
  return (
    <Styles.Items>
      {footerIcons.map(({ id, url, icon }) => (
        <Styles.Item key={id}>
          <IconButton target="_blank" href={url} className="social-icon">
            {icon}
          </IconButton>
        </Styles.Item>
      ))}
    </Styles.Items>
  );
}
