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
  },
  menuHover: {
    $nest: {
      '&:hover': {
        color: state.theme.primary,
        boxShadow: styleEnum.shadow_bot_white_2x,
        transform: 'scale(1.01)',
      },
      '&:active': {
        boxShadow: styleEnum.shadow_bot,
      },
    },
  },
  active: {
    background: props.active && color(state.theme.primary).lighten(0.55).toString(),
    color: props.active && getColor(color(state.theme.primary).lighten(0.55).toString()),
    $nest: {
      '&::after': {
        content: `' '`,
        position: 'absolute',
        right: '0',
        top: '0',
        bottom: '0',
        borderRight: props.active && '3px solid ' + state.theme.primary,
        transition: `transform .15s cubic-bezier(.215, .61, .355, 1),
          opacity .15s cubic-bezier(.215, .61, .355, 1),
          -webkit-transform .15s cubic-bezier(.215, .61, .355, 1)`,
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