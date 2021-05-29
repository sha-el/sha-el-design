import * as React from 'react';
import { style } from './style';
import { TabPanelProps } from './TabPanel';
import { useTheme } from '../Theme/Theme';
import { classes } from '../../helpers';

export const TabHeader: React.FC<TabHeaderProps> = (props) => {
  const [inkStyle, setInkStyle] = React.useState({ left: 0, width: 0 });

  const className = 'hello' + Math.random().toString().slice(4, 7);

  const onContainerClick = (target: HTMLDivElement) => {
    if (!target) {
      return;
    }
    const left = target.offsetLeft;
    const width = target.getBoundingClientRect().width;

    if (![].find.call(target.classList, (v: string) => v.includes(className))) {
      return;
    }
    if (left === inkStyle.left && width === inkStyle.width) {
      return;
    }
    setInkStyle({ left, width });
  };

  React.useEffect(() => {
    inkStyle.left === 0 && inkStyle.width === 0 && onContainerClick(document.body.querySelector(`.${className}0`));
    return () => {
      // Blank
    };
  });

  const theme = useTheme();
  const css = style(theme);
  return (
    <div
      className={classes(css.tabHeaderContainer, 'sha-el-tab-header')}
      onClick={(e) => onContainerClick(e.target as HTMLDivElement)}
    >
      <div className={css.inkBar} style={{ ...inkStyle, bottom: '0' }} />
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

interface TabHeaderProps {
  titles: TabPanelProps[];
  activeKey: string;
  onClick: (key: string) => void;
}
