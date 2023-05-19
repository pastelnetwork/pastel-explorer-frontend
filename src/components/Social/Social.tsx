import React from 'react';

import { footerIcons } from './Social.helpers';
import * as Styles from './Social.styles';

interface ISocial {
  className?: string;
}

export default function Social({ className = '' }: ISocial): JSX.Element {
  return (
    <Styles.Items className={className}>
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

Social.defaultProps = {
  className: '',
};
