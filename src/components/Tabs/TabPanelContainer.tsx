import * as React from 'react';
import posed from 'react-pose';
import { style } from './style';
import { TabPanelProps } from './TabPanel';

export const TabPanelContainer: React.FC<TabPanelContainerProps> = (props) => {
  const { titles, activeKey, children, unMountOnChange } = props;
  const activeKeyIndex = titles.findIndex((v) => v.key === activeKey);

  const displayList = () => {
    if (Array.isArray(children)) {
      return [].map.call(children, (child: React.ReactChild, index: number) => {
        const isActive = index === activeKeyIndex;
        return (
          <Container
            key={index}
            pose={isActive ? 'active' : 'inActive'}
            x={index - activeKeyIndex}
            poseKey={index - activeKeyIndex}
          >
            <div style={{ display: isActive ? 'block' : 'none' }}>{unMountOnChange ? isActive && child : child}</div>
          </Container>
        );
      });
    }
    return (
      <Container key={0} pose={'active'} x={0} poseKey={0}>
        {children}
      </Container>
    );
  };

  const css = style();
  return <div className={css.tabPanelContainer}>{displayList()}</div>;
};

interface TabPanelContainerProps {
  titles: TabPanelProps[];
  activeKey: string;
  children: React.ReactNode;
  unMountOnChange?: boolean;
}

const Container = posed.div({
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
