import * as React from 'react';
import { stylesheet } from 'typestyle';

import { MdMenu, MdKeyboardArrowLeft } from 'react-icons/md';
import { Button } from '../../index';
import { shadow } from '../../helpers/style';
import { ThemeConsumer, Theme } from '../Theme/Theme';
import { COLLAPSED_WIDTH, SidePanelContext } from './Container';

export const SidePanel: React.FunctionComponent<SidePanelProps> = (props) => {
  return (
    <ThemeConsumer>
      {(theme) => (
        <SidePanelContext.Consumer>
          {({ width, toggle }) => {
            const open = width > COLLAPSED_WIDTH;
            const css = style(open, theme, width);

            return (
              // <SidePanelContext.Provider value={{ width }}>
              <aside className={css.container}>
                <div
                  className={css.resizer}
                  // TODO: proper implementation is required.
                  // draggable
                  // onDrag={this.onDrag}
                  // onDragStart={(e) => (e.target as HTMLDivElement).style.opacity = '0'}
                  // onDragEnd={(e) => (e.target as HTMLDivElement).style.opacity = '1'}
                >
                  <div style={(!open && { display: 'block' }) || {}} className={css.arrow} onClick={toggle}>
                    <Button shape="circle" icon={!open ? <MdMenu /> : <MdKeyboardArrowLeft />} />
                  </div>
                </div>
                <div className={css.line} />
                <div className={css.top}>{props.children}</div>
                <div className={css.bottom}>{props.bottom}</div>
              </aside>
              // </SidePanelContext.Provider>
            );
          }}
        </SidePanelContext.Consumer>
      )}
    </ThemeConsumer>
  );
};

const style = (open: boolean, theme: Theme, width: number) => {
  return stylesheet({
    container: {
      position: 'fixed',
      width,
      flex: `0 1 ${width}px`,
      height: '100vh',
      maxHeight: '100%',
      background: open ? theme.background : 'none',
      boxShadow: open && shadow('2X', theme),
      transition: '.3s all',
      zIndex: 1,
      left: 0,
      top: 0,
    },
    top: {
      boxShadow: !open && shadow('2X', theme),
    },
    line: {
      width: !open && '3px',
      height: '100%',
      position: 'absolute',
      left: open ? '100%' : '23.5px',
      background: theme.primary,
      transition: '1s all',
      zIndex: -1,
    },
    arrow: {
      zIndex: 1000,
      display: 'none',
      position: 'absolute',
      right: '0',
      cursor: 'pointer',
      color: theme.secondary,
      fontSize: '30px',
      transition: '.2s',
      left: '0',
      top: '10px',
      $nest: {
        '&:hover': {
          color: theme.warning,
        },
      },
    },
    resizer: {
      position: 'absolute',
      right: '-12px',
      top: '0',
      bottom: '0',
      width: '30px',
      // TODO: activate once drag is fixed
      // cursor: 'ew-resize',
      zIndex: 1,
      $nest: {
        '&:hover': {
          $nest: {
            '& div': {
              display: 'block',
            },
          },
        },
      },
    },
    bottom: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      boxShadow: !open && shadow('2X', theme),
    },
  });
};

export interface SidePanelProps {
  children: React.ReactNode;
  bottom?: React.ReactNode;
  // collapsed?: boolean;
}
