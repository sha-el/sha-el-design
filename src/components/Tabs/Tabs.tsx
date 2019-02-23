import * as React from 'react';
import { TabPanelProps } from './TabPanel';
import { style } from './style';
import { Theme, ThemeService } from '../../helpers/theme';
import posed, { PoseGroup } from 'react-pose';
import { styleEnum } from '../../helpers/constants';
import { TabPanel } from '.';

export class Tabs extends React.Component<TabsProps, State> {

  theme = new ThemeService();

  constructor(props: TabsProps) {
    super(props);

    this.state = {
      titles: [],
      theme: this.theme.selectedTheme$.value,
      activeKey: props.defaultActiveKey,
    };
  }

  headerRefs: HTMLDivElement[] = [];

  componentDidMount() {
    this.findTitles();

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

    this.setState({ titles: [(this.props.children as any).props.title] });
  }

  getInkStyle = () => {
    const ref = this.headerRefs[this.state.titles.findIndex(v => v.key === this.state.activeKey)];
    if (!ref) {
      return {
        left: 0,
        width: 50,
      };
    }
    const rect = ref.getBoundingClientRect();
    return {
      left: rect.left,
      width: rect.width,
    };
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
    return this.props.children;
  }

  render() {
    const { theme } = this.state;
    const { defaultActiveKey, children } = this.props;
    const css = style(theme);
    return (
      <div>
        <div className={css.tabHeaderContainer}>
          {this.state.titles.map((v, i) => (
            <div
              ref={el => this.headerRefs[i] = el}
              key={v.key}
              className={css.tabHeader}
              style={{
                color: v.key === defaultActiveKey && theme.primary,
                fontWeight: v.key === defaultActiveKey ? 500 : 100,
              }}
              onClick={() => this.setState({ activeKey: v.key })}
            >
              {v.title}
            </div>
          ))}
        </div>
        <InkBar
          pose='active'
          className={css.inkBar}
          poseKey={`${this.getInkStyle().left}`}
          {...this.getInkStyle()}
        />
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
  },

  props: {
    left: 0,
    width: 50,
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
}