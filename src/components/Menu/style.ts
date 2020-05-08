import { stylesheet } from 'typestyle';
import { getColor } from '../../helpers';
import { Theme } from '../../components/Theme/Theme';
import { hoverColor } from '../../helpers/color';

const itemColors = (active: boolean, theme: Theme) => {
  if (active) {
    return [theme.primary, getColor(theme.primary)];
  }

  return [theme.background, theme.textColor];
};

const itemPadding = (isBaropen: boolean) => isBaropen ? ['15px 10px', '10px 0'] : ['15px', '0'];

export const css = (active: boolean, theme: Theme, isOpen: boolean) => {
  const [bgColor, textColor] = itemColors(active, theme);

  const [padding, margin] = itemPadding(isOpen);

  return stylesheet({
    menu: {
      width: 'auto',
      padding: '5px 0',
      background: bgColor,
    },
    menuItem: {
      padding,
      textAlign: 'center',
      fontSize: '14px',
      cursor: 'pointer',
      position: 'relative',
      background: bgColor,
      color: textColor,
      listStyle: 'none',
      lineHeight: '1.5rem',
      margin,
      borderRadius: '3px',
      textTransform: 'capitalize',
      textOverflow: 'clip',
      whiteSpace: 'nowrap',
      $nest: {
        '&:hover': !active && {
          backgroundColor: hoverColor(bgColor),
          color: getColor(hoverColor(bgColor)),
          boxShadow: 'none',
        },
      },
    },
    flexEnd: {
      display: 'flex',
      alignSelf: 'flex-end',
      flex: 0,
    },
    flex_1: {
      display: 'flex',
      alignSelf: 'center',
      flex: 1,
    },
    groupTitle: {
      fontSize: '16px',
      fontWeight: 'bolder',
    },
    flex: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
    },
    groupContainer: {
      overflow: 'hidden',
      paddingBottom: '3px',
    },
    icon: {
      fontSize: '17px',
      flex: 0,
      display: 'flex',
      alignSelf: 'center',
    },
    popoverContent: {
      width: '150px',
    },
  });
};