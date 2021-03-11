import { Theme } from '@emotion/react';
import * as React from 'react';
import { MdClear } from 'react-icons/md';
import { useTheme } from '../Theme/Theme';
import { chipIconCss, style } from './style';

export const Tag: React.FC<TagProps> = (props) => {
  const theme = useTheme();
  const tagCss = style({ props, theme });

  return (
    <span className={tagCss} onClick={(e) => props?.onClick(e)} style={props.style}>
      {props.children}
      {props.chips && (
        <span className={chipIconCss}>
          <MdClear />
        </span>
      )}
    </span>
  );
};

export interface TagProps {
  color: keyof Theme | 'light' | string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  textColor?: keyof Theme | 'light' | string;
  style?: React.CSSProperties;
  outline?: boolean;
  chips?: boolean;
  size?: 'DEFAULT' | 'SMALL';
}

Tag.defaultProps = {
  style: {},
  size: 'DEFAULT',
};
