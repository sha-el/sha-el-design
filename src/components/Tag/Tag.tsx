import * as React from 'react';
import { MdClear } from 'react-icons/md';
import { useTheme } from '../Theme/Theme';
import { chipIconCss, style } from './style';

export const Tag: React.StatelessComponent<TagProps> = (props) => {
  const theme = useTheme();
  const css = style({ props, theme });

  return (
    <span className={css.tag} onClick={() => props?.onClick()} style={props.style}>
      {props.children}
      {props.chips && (
        <span className={chipIconCss().chipIcon}>
          <MdClear />
        </span>
      )}
    </span>
  );
};

export interface TagProps {
  color: string;
  children: React.ReactNode;
  onClick?: () => void;
  textColor?: string;
  style?: React.CSSProperties;
  outline?: boolean;
  chips?: boolean;
  size?: 'DEFAULT' | 'SMALL';
}

Tag.defaultProps = {
  style: {},
  size: 'DEFAULT',
};
