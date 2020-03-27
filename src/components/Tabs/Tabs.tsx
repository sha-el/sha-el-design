import * as React from 'react';
import { TabPanelProps } from './TabPanel';
import { style } from './style';
import { Theme, ThemeService } from '../../helpers/theme';
import { TabHeader, TabPanelContainer } from '.';

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
        width: 0,
      },
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
          key: child.key,
        };
      });

      return this.setState({ titles });
    }
    this.setState({ titles: [{ title: this.props.children.props.title, key: this.props.children.props.name }] });
  }

  render() {
    const { titles, activeKey } = this.state;
    return (
      <div>
        <TabHeader
          titles={titles}
          activeKey={activeKey}
          onClick={(key) => this.setState({ activeKey: key })}
        />
        <TabPanelContainer
          titles={titles}
          activeKey={activeKey}
          destroyOnChange={this.props.destroyOnChange}
        >
          {this.props.children}
        </TabPanelContainer>
      </div>
    );
  }
}

export interface TabsProps {
  children: React.ReactElement<TabPanelProps> | React.ReactElement<TabPanelProps>[];
  defaultActiveKey: string;
  destroyOnChange?: boolean;
}

interface State {
  titles: TabPanelProps[];
  activeKey: string;
  theme: Theme;
  inkStyle: {
    top: number;
    width: number;
    left: number;
  };
}