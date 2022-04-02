import * as React from 'react';
import { MdClear } from 'react-icons/md';
import { classes } from '../../helpers';
import { elevationCss } from '../../helpers/elevations';
import { ColorChoices } from '../../typings/color';
import { style } from './style';

export const Tag: React.FC<TagProps> = (props) => {
  const { tag: tagCss, chipIcon, icon: iconCss } = style(props);

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
  color: ColorChoices;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  textColor?: ColorChoices;
  style?: React.CSSProperties;
  outline?: boolean;
  chips?: boolean;
  icon?: React.ReactNode;
  elevation?: number;
}

Tag.defaultProps = {
  style: {},
  color: 'primary',
  elevation: 2,
};
