import * as React from 'react';
import { stylesheet, style } from 'typestyle';

import { ThemeService, Theme } from '../../helpers/theme';
import { MdKeyboardArrowRight, MdMenu, MdKeyboardArrowLeft } from 'react-icons/md';
import { styleEnum } from '../../helpers/constants';
import { Button } from '../../index';

const ctx = React.createContext({ width: 250 });

export const SidePanelContext = ctx;

export class SidePanel extends React.Component<SidePanelProps, State> {

  static defaultProps = {
    width: 250,
  };

  private readonly theme = new ThemeService();
  constructor(props: SidePanelProps) {
    super(props);

    this.state = {
      theme: this.theme.selectedTheme$.getValue(),
      collapsed: this.props.collapsed,
      width: this.props.width,
    };
  }

  componentDidMount() {
    this.theme.selectedTheme$.subscribe(
      theme => this.setState({ theme }),
    );
  }

  switch = () => {
    const width = this.state.width;
    this.setState({ collapsed: !this.state.collapsed, width: width > 50 ? 50 : 250 });
  }

  onDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.persist();
    window.requestAnimationFrame(() => {
      document.addEventListener('dragover', (f) => f.preventDefault());
      document.addEventListener('drop', (f) => f);
      this.setState({ width: e.clientX });
    });
  }

  render() {
    const styleSheet = this.css();
    const open = this.state.width > 100;
    return (
      <SidePanelContext.Provider value={{ width: this.state.width }}>
        <div className={styleSheet.container} style={{ width: this.state.width + 'px' }}>
          <div
            draggable
            onDrag={this.onDrag}
            className={styleSheet.resizer}
            onDragStart={(e) => (e.target as HTMLDivElement).style.opacity = '0'}
            onDragEnd={(e) => (e.target as HTMLDivElement).style.opacity = '1'}
          >
            <div style={!open && { display: 'block' } || {}} className={styleSheet.arrow} onClick={this.switch}>
              <Button shape='circle'>
                {this.state.collapsed ? <MdMenu /> : <MdKeyboardArrowLeft />}
              </Button>
            </div>
          </div>
          <div className={styleSheet.line} />
          <div className={styleSheet.top}>
            {this.props.children}
          </div>
          <div className={styleSheet.bottom}>
            {this.props.bottom}
          </div>
        </div>
      </SidePanelContext.Provider>
    );
  }

  css = () => {
    const open = this.state.width > 100;
    return stylesheet({
      container: {
        position: 'relative',
        height: '100vh',
        maxHeight: '100%',
        background: open ? 'white' : 'none',
        boxShadow: open && styleEnum.shadow_2x,
        transition: '1s width',
      },
      top: {
        boxShadow: !open && styleEnum.shadow_2x,
      },
      line: {
        width: !open && '3px',
        height: '100%',
        position: 'absolute',
        left: open ? '100%' : '23.5px',
        background: this.state.theme.primary,
        transition: '1s all',
      },
      arrow: {
        zIndex: 1000,
        display: 'none',
        position: 'absolute',
        right: '0',
        cursor: 'pointer',
        color: this.state.theme.secondary,
        fontSize: '30px',
        transition: '.2s',
        left: '0',
        top: '10px',
        $nest: {
          '&:hover': {
            color: this.state.theme.warning,
          },
        },
      },
      resizer: {
        position: 'absolute',
        right: '-12px',
        top: '0',
        bottom: '0',
        width: '30px',
        cursor: 'ew-resize',
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
  }
}

export interface SidePanelProps {
  children: React.ReactNode;
  bottom?: React.ReactNode;
  width?: number;
  collapsed?: boolean;
}

interface State {
  collapsed: boolean;
  width: number;
  theme: Theme;
}
