import * as React from 'react';
import { TabPanelProps } from './TabPanel';
import { style } from './style';
import { Theme, ThemeService } from '../../helpers/theme';
import posed from 'react-pose';
import { Portal } from './../Popover/Portal';

export class Tabs extends React.Component<TabsProps, State> {

  theme = new ThemeService();

  constructor(props: TabsProps) {
    super(props);

    this.state = {
      titles: [],
      theme: this.theme.selectedTheme$.value,
      activeKey: props.defaultActiveKey,
      inkStyle: {
        top: 0,
        left: 0,
        width: 50,
      },
    };
  }

  headerRefs: HTMLDivElement[] = [];

  componentDidMount() {
    this.findTitles();
    this.getInkStyle();
    this.theme.selectedTheme$.subscribe(theme => this.setState({ theme }));
  }

  findTitles = () => {
    if (Array.isArray(this.props.children)) {
      const titles = [].map.call(this.props.children, (child) => {
        return {
          title: child.props.title,
          key: child.props.name,
        };
      });

      return this.setState({ titles });
    }
    this.setState({ titles: [{ title: this.props.children.props.title, key: this.props.children.props.name }] });
  }

  getInkStyle = () => {
    const ref = this.headerRefs[this.state.titles.findIndex(v => v.key === this.state.activeKey)];
    if (!ref) {
      return setTimeout(this.getInkStyle, 500);
    }
    const rect = ref.getBoundingClientRect();
    this.setState({
      inkStyle: {
        left: rect.left,
        width: rect.width,
        top: ref.parentElement.getBoundingClientRect().top + ref.parentElement.getBoundingClientRect().height,
      },
    });
  }

  displayPanel = () => {
    const activeKeyIndex = this.state.titles.findIndex(v => v.key === this.state.activeKey);
    if (Array.isArray(this.props.children)) {
      return [].map.call(this.props.children, (child: any, index: number) => {
        const isActive = index === activeKeyIndex;
        return (
          <TabPanelContainer
            key={index}
            pose={isActive ? 'active' : 'inActive'}
            x={index - activeKeyIndex}
            poseKey={index - activeKeyIndex}
          >
            <div
              style={{ display: isActive ? 'block' : 'none' }}
            >
              {this.props.destroyOnChange ? isActive && child : child}
            </div>
          </TabPanelContainer>
        );
      });
    }
    return (
      <TabPanelContainer
        key={0}
        pose={'active'}
        x={0}
        poseKey={0}
      >
        {this.props.children}
      </TabPanelContainer>
    );
  }

  render() {
    const { theme, titles, activeKey } = this.state;
    const css = style(theme);
    return (
      <div>
        <div className={css.tabHeaderContainer}>
          <InkBar
            pose='active'
            className={css.inkBar}
            poseKey={`${this.state.inkStyle.left}`}
            {...this.state.inkStyle}
          />
          {titles.map((v, i) => (
            <div
              ref={el => this.headerRefs[i] = el}
              key={v.key}
              className={css.tabHeader}
              style={{
                color: v.key === activeKey && theme.primary,
              }}
              onClick={() => this.setState({ activeKey: v.key }, () => this.getInkStyle())}
            >
              {v.title}
            </div>
          ))}
        </div>
        <div className={css.tabPanelContainer}>
          {this.displayPanel()}
        </div>
      </div>
    );
  }
}

const InkBar = posed.div({
  active: {
    left: ({ left }) => left,
    width: ({ width }) => width,
    bottom: () => 0,
  },

  props: {
    left: 0,
    width: 50,
    bottom: 0,
  },
});

const TabPanelContainer = posed.div({
  active: {
    x: 0,
    opacity: 1,
    transition: {
      duraction: 5000,
    },
  },

  inActive: {
    x: ({ x }) => `${x}00%`,
    opacity: 0,
    transition: {
      duraction: 5000,
    },
  },
});

export interface TabsProps {
  children: React.ReactElement<TabPanelProps> | React.ReactElement<TabPanelProps>[];
  defaultActiveKey: string;
  destroyOnChange?: boolean;
}

interface State {
  titles: { key: string; title: string }[];
  activeKey: string;
  theme: Theme;
  inkStyle: {
    top: number;
    width: number;
    left: number;
  };
}