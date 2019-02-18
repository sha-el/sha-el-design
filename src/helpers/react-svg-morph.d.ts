
declare module 'react-svg-morph' {
  import * as React from 'react';

  export interface MorphReplaceProps {
    rotation?: 'clockwise' | 'counterclock' | 'none';
    width?: number;
    height?: number;
    duration?: number;
    children: React.ReactNode;
    viewBox?: string;
    preserveAspectRatio?: any;
  }

  export class MorphReplace extends React.Component<MorphReplaceProps, {}> {}
}