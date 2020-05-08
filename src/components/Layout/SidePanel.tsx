import * as React from 'react';
import { stylesheet } from 'typestyle';

import { MdMenu, MdKeyboardArrowLeft } from 'react-icons/md';
import { styleEnum } from '../../helpers/constants';
import { Button } from '../../index';
import { shadow } from '../../helpers/style';
import { ThemeConsumer, Theme } from '../Theme/Theme';

const [OPEN_WIDTH, COLLAPSED_WIDTH] = [250, 50];

const ctx = React.createContext({ width: OPEN_WIDTH });

export const SidePanelContext = ctx;

// export class SidePanel extends React.Component<SidePanelProps, State> {

//   static defaultProps = {
//     width: OPEN_WIDTH,
//   };

//   private readonly theme = new ThemeService();
//   constructor(props: SidePanelProps) {
//     super(props);

//     this.state = {
//       theme: this.theme.selectedTheme$.getValue(),
//       width: this.props.width,
//     };
//   }

//   componentDidMount() {
//     this.theme.selectedTheme$.subscribe(
//       theme => this.setState({ theme }),
//     );
//   }

// switch = () => {
//   const width = this.state.width;
//   this.setState({ width: width > COLLAPSED_WIDTH ? COLLAPSED_WIDTH : OPEN_WIDTH });
// }

//   onDrag = (e: React.DragEvent<HTMLDivElement>) => {
//     e.persist();
//     window.requestAnimationFrame(() => {
//       document.addEventListener('dragover', (f) => f.preventDefault());
//       document.addEventListener('drop', (f) => f);
//       this.setState({ width: e.clientX });
//     });
//   }

//   render() {
// const styleSheet = this.css();
// const open = this.state.width > COLLAPSED_WIDTH;
// return (
//   <SidePanelContext.Provider value={{ width: this.state.width }}>
//     <div className={styleSheet.container} style={{ width: this.state.width + 'px' }}>
//       <div
//         className={styleSheet.resizer}
//         // TODO: proper implementation is required.
//         // draggable
//         // onDrag={this.onDrag}
//         // onDragStart={(e) => (e.target as HTMLDivElement).style.opacity = '0'}
//         // onDragEnd={(e) => (e.target as HTMLDivElement).style.opacity = '1'}
//       >
//         <div style={!open && { display: 'block' } || {}} className={styleSheet.arrow} onClick={this.switch}>
//           <Button shape='circle' icon={!open ? <MdMenu /> : <MdKeyboardArrowLeft />} />
//         </div>
//       </div>
//       <div className={styleSheet.line} />
//       <div className={styleSheet.top}>
//         {this.props.children}
//       </div>
//       <div className={styleSheet.bottom}>
//         {this.props.bottom}
//       </div>
//     </div>
//   </SidePanelContext.Provider>
// );
//   }
// }

export const SidePanel: React.FunctionComponent<SidePanelProps> = (props) => {
  const [width, updateWidth] = React.useState(props.width);

  const toggle = () => {
    updateWidth(width > COLLAPSED_WIDTH ? COLLAPSED_WIDTH : OPEN_WIDTH);
  };

  return (
    <ThemeConsumer>
      {(theme) => {
        const open = width > COLLAPSED_WIDTH;
        const css = style(open, theme, width);

        return (
          <SidePanelContext.Provider value={{ width }}>
            <div className={css.container}>
              <div
                className={css.resizer}
              // TODO: proper implementation is required.
              // draggable
              // onDrag={this.onDrag}
              // onDragStart={(e) => (e.target as HTMLDivElement).style.opacity = '0'}
              // onDragEnd={(e) => (e.target as HTMLDivElement).style.opacity = '1'}
              >
                <div style={!open && { display: 'block' } || {}} className={css.arrow} onClick={toggle}>
                  <Button shape='circle' icon={!open ? <MdMenu /> : <MdKeyboardArrowLeft />} />
                </div>
              </div>
              <div className={css.line} />
              <div className={css.top}>
                {props.children}
              </div>
              <div className={css.bottom}>
                {props.bottom}
              </div>
            </div>
          </SidePanelContext.Provider>
        );
      }}
    </ThemeConsumer>
  );
};

SidePanel.defaultProps = {
  width: OPEN_WIDTH,
};

const style = (open: boolean, theme: Theme, width: number) => {
  return stylesheet({
    container: {
      position: 'relative',
      flex: `0 1 ${width}px`,
      height: '100vh',
      maxHeight: '100%',
      background: open ? theme.background : 'none',
      boxShadow: open && shadow('2X', theme),
      transition: '1s all',
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
      boxShadow: !open && styleEnum.shadow_2x,
    },
  });
};

export interface SidePanelProps {
  children: React.ReactNode;
  bottom?: React.ReactNode;
  width?: number;
  // collapsed?: boolean;
}

interface State {
  // collapsed: boolean;
  width: number;
  theme: Theme;
}
