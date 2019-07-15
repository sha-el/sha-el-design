import * as React from 'react';
import { stylesheet } from 'typestyle';

import { ThemeService, Theme } from '../../helpers/theme';
import { getColor } from '../../helpers';
import { FaAngleLeft, FaAngleRight, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { styleEnum } from '../../helpers/constants';

const ctx = React.createContext({ width: 250 });

export const MenuContext = ctx;

export class Menu extends React.Component<MenuProps, State> {

  static defaultProps = {
    width: 250,
  };

  private readonly theme = new ThemeService();
  constructor(props: MenuProps) {
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
    return (
      <MenuContext.Provider value={{ width: this.state.width }}>
        <div className={styleSheet.container} style={{ width: this.state.width + 'px' }}>
          <div
            draggable
            onDrag={this.onDrag}
            className={styleSheet.resizer}
            onDragStart={(e) => (e.target as HTMLDivElement).style.opacity = '0'}
            onDragEnd={(e) => (e.target as HTMLDivElement).style.opacity = '1'}
          >
            <div className={styleSheet.arrow} onClick={this.switch}>
              {this.state.collapsed ? <FaAngleRight /> : <FaAngleLeft />}
            </div>
          </div>
          {this.props.children}
        </div>
      </MenuContext.Provider>
    );
  }

  css = () => {
    return stylesheet({
      container: {
        position: 'relative',
        background: this.state.theme.default,
        height: '100vh',
        maxHeight: '100%',
        color: getColor(this.state.theme.default, '#555555'),
        transition: '.1s',
        boxShadow: styleEnum.shadow,
      },
      arrow: {
        display: 'none',
        position: 'absolute',
        right: '0',
        top: 'calc(50% - 10px)',
        cursor: 'pointer',
        color: this.state.theme.secondary,
        fontSize: '16px',
        transition: '.2s',
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
        width: '10px',
        background: 'transparent',
        cursor: 'ew-resize',
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
    });
  }
}

export interface MenuProps {
  children: React.ReactNode;
  width?: number;
  collapsed?: boolean;
  showCollapsIcon?: boolean;
}

interface State {
  collapsed: boolean;
  width: number;
  theme: Theme;
}
