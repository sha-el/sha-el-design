import { stylesheet } from 'typestyle';
import { styleEnum } from '../../helpers/constants';
import { color } from 'csx';
import { getColor } from '../../helpers';

export const css = (props: { active?: any; }, state: { theme: { primary: string; }; }) => stylesheet({
  menu: {
    padding: '10px',
    textAlign: 'center',
    fontSize: '14px',
    cursor: 'pointer',
    position: 'relative',
    background: 'white',
  },
  menuHover: {
    $nest: {
      '&:hover': {
        color: state.theme.primary,
        fontWeight: 500,
        $nest: {
          '&:before': {
            bottom: 0,
            width: '3px',
          },
        },
      },
      '&:active': {
        boxShadow: styleEnum.shadow_bot,
      },
      '&:before': {
        content: '" "',
        position: 'absolute',
        right: 0,
        top: 0,
        width: 0,
        background: state.theme.primary,
        transitionDuration: '.3s',
        transitionTimingFunction: 'ease',
      },
    },
  },
  active: {
    background: props.active && color(state.theme.primary).toString(),
    color: props.active && getColor(color(state.theme.primary).toString()),
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
    paddingLeft: '10px',
  },

  icon: {
    fontSize: '16px',
    flex: 0,
    display: 'flex',
    alignSelf: 'center',
  },

  popoverContent: {
    width: '150px',
  },
});