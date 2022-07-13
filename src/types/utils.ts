import { ReactElement } from 'react';
export interface RoutesList {
  path: string;
  component: any;
  isPublic?: boolean;
  title: string;
  visibleRole?: string[];
  id: number;
  visibleMenu?: boolean;
}