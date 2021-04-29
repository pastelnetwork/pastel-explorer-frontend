/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';

export type RouteType = {
  id: string;
  path: string;
  icon?: JSX.Element;
  children: null | Array<RouteChildType>;
  component: React.FunctionComponent<any> | React.ComponentClass<any> | null;
  badge?: string | number;
  containsHome?: boolean;
  open?: boolean;
  header?: string;
  guard?: any;
  seoTitle?: string;
};

export type RouteChildType = {
  path: string;
  name: string;
  component: React.FunctionComponent<any> | React.ComponentClass<any>;
  icon?: JSX.Element;
  badge?: string | number;
  guard?: any;
};
