import * as React from 'react';
import { style } from './style';
import { ThemeService } from '../../helpers/theme';
import posed from 'react-pose';
import { classes } from 'typestyle';
import { TabPanelProps } from './TabPanel';
import { uuidv4 } from '../../helpers';

export const TabHeader: React.FunctionComponent<TabHeaderProps> = (props) => {
  const themeService = new ThemeService();
  const [theme, setTheme] = React.useState(themeService.selectedTheme$.getValue());
  const css = style(theme);

  const [inkStyle, setInkStyle] = React.useState({ left: 0, width: 0 });

  const className = 'hello' + Math.random().toString().slice(4, 7);

  const onContainerClick = (target: HTMLDivElement) => {
    if (!target) {
      return;
    }
    if (target.offsetLeft === inkStyle.left && target.clientWidth === inkStyle.width) {
      return;
    }
    setInkStyle({ left: target.offsetLeft, width: target.clientWidth });
  };

  React.useEffect(() => {
    const x = themeService.selectedTheme$.subscribe(v => setTheme(v));
    (inkStyle.left === 0 && inkStyle.width === 0) && onContainerClick(document.body.querySelector(`.${className}0`));
    return () => {
      x.unsubscribe();
    };
  });

  return (
    <div className={css.tabHeaderContainer} onClick={(e) => onContainerClick(e.target as HTMLDivElement)}>
      <InkBar
        pose='active'
        className={css.inkBar}
        poseKey={`${inkStyle.left} ${inkStyle.width}`}
        {...inkStyle}
      />
      {props.titles.map((v, i) => (
        <div
          key={v.key}
          className={classes(`${className}${i}`, css.tabHeader)}
          style={{
            color: v.key === props.activeKey && theme.primary,
          }}
          onClick={() => props.onClick(v.key)}
        >
          {v.title}
        </div>
      ))}
    </div>
  );
};

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

interface TabHeaderProps {
  titles: TabPanelProps[];
  activeKey: string;
  onClick: (key: string) => void;
}