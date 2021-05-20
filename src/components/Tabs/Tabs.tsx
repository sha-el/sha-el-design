import * as React from 'react';
import { TabPanelProps } from './TabPanel';
import { TabHeader, TabPanelContainer } from '.';

export class Tabs extends React.Component<TabsProps, State> {
  constructor(props: TabsProps) {
    super(props);

    this.state = {
      titles: [],
      activeKey: '1',
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
  };

  render() {
    const { titles, activeKey } = this.state;
    return (
      <div>
        <TabHeader titles={titles} activeKey={activeKey} onClick={(key) => this.setState({ activeKey: key })} />
        <TabPanelContainer titles={titles} activeKey={activeKey} unMountOnChange={this.props.unMountOnChange || false}>
          {this.props.children}
        </TabPanelContainer>
      </div>
    );
  }
}

export interface TabsProps {
  children: React.ReactElement<TabPanelProps> | React.ReactElement<TabPanelProps>[];
  unMountOnChange?: boolean;
}

interface State {
  titles: TabPanelProps[];
  activeKey: string;
  inkStyle: {
    top: number;
    width: number;
    left: number;
  };
}
