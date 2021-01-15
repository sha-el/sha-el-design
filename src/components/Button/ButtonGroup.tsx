import * as React from 'react';
import { buttonGroupStyle as style } from './style';

export const ButtonGroup: React.FC<unknown> = (props) => {
  const css = style();
  return <div className={css.buttonGroup}>{props.children}</div>;
};
