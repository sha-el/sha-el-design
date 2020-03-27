import { stylesheet } from 'typestyle';
import { styleEnum } from '../../helpers/constants';
import { color } from 'csx';
import { getColor } from '../../helpers';

const itemColors = (active: boolean, state: { theme: { primary: string; }; }) => {
  if (active) {
    return [state.theme.primary, getColor(state.theme.primary)];
  }

  return ['white', '#3c4858'];
};

const itemPadding = (isBaropen: boolean) => isBaropen ? ['15px 20px', '10px 10px 0'] : ['15px', '0'];

export const css = (props: { active?: any; }, state: { theme: { primary: string; }; }, isOpen: boolean) => {
  const [bgColor, textColor] = itemColors(props.active, state);

  const [padding, margin] = itemPadding(isOpen);

  return stylesheet({
    menu: {
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
      $nest: {
        '&:hover': !props.active && {
          backgroundColor: 'hsla(0,0%,78%)',
          color: '#3c4858',
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