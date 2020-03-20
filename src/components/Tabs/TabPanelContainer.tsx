import * as React from 'react';
import posed from 'react-pose';
import { ThemeService } from '../../helpers/theme';
import { style } from './style';
import { TabPanelProps } from './TabPanel';

export const TabPanelContainer: React.FunctionComponent<TabPanelContainerProps> = (props) => {
  const themeService = new ThemeService();
  const [theme, setTheme] = React.useState(themeService.selectedTheme$.getValue());
  const css = style(theme);

  const { titles, activeKey, children, destroyOnChange } = props;
  const activeKeyIndex = titles.findIndex(v => v.key === activeKey);

  const displayList = () => {
    if (Array.isArray(children)) {
      return [].map.call(children, (child: any, index: number) => {
        const isActive = index === activeKeyIndex;
        return (
            <Container
              key={index}
              pose={isActive ? 'active' : 'inActive'}
              x={index - activeKeyIndex}
              poseKey={index - activeKeyIndex}
            >
              <div
                style={{ display: isActive ? 'block' : 'none' }}
              >
                {destroyOnChange ? isActive && child : child}
              </div>
            </Container>
        );
      });
    }
    return (
      <Container
        key={0}
        pose={'active'}
        x={0}
        poseKey={0}
      >
        {children}
      </Container>
    );
  };

  return (
    <div className={css.tabPanelContainer}>
      {displayList()}
    </div>
  )
};

interface TabPanelContainerProps {
  titles: TabPanelProps[];
  activeKey: string;
  children: React.ReactNode;
  destroyOnChange: boolean;
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