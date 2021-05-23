import { Theme } from '@emotion/react';
import * as React from 'react';
import { MdClear } from 'react-icons/md';
import { useTheme } from '../Theme/Theme';
import { style } from './style';

export const Tag: React.FC<TagProps> = (props) => {
  const theme = useTheme();
  const { tag: tagCss, chipIcon, icon: iconCss } = style({ props, theme });

  return (
    <span className={tagCss} onClick={(e) => props?.onClick(e)} style={props.style}>
      {props.icon && <span className={iconCss}>{props.icon}</span>}
      <span>{props.children}</span>
      {props.chips && (
        <span className={chipIcon}>
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
  icon?: React.ReactNode;
}

Tag.defaultProps = {
  style: {},
  color: '#aaa',
};
