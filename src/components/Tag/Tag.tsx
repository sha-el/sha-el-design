import { Theme } from '@emotion/react';
import * as React from 'react';
import { MdClear } from 'react-icons/md';
import { classes } from '../../helpers';
import { elevationCss } from '../../helpers/elevations';
import { useTheme } from '../Theme/Theme';
import { style } from './style';

export const Tag: React.FC<TagProps> = (props) => {
  const theme = useTheme();
  const { tag: tagCss, chipIcon, icon: iconCss } = style({ props, theme });

  return (
    <div
      className={classes(tagCss, elevationCss(props.elevation), 'sha-el-tag')}
      onClick={(e) => props?.onClick?.(e)}
      style={props.style}
    >
      {props.icon && <span className={iconCss}>{props.icon}</span>}
      <span>{props.children}</span>
      {props.chips && (
        <span className={chipIcon}>
          <MdClear />
        </span>
      )}
    </div>
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
  elevation?: number;
}

Tag.defaultProps = {
  style: {},
  color: '#aaa',
  elevation: 2,
};
