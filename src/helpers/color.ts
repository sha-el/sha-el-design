import { color as csxColor } from 'csx';
import { getColor } from './../helpers';
import { Theme, ThemeConsumer } from '../components/Theme/Theme';
import { ButtonProps } from '../components/Button/Button';

export const lightText = (theme: Theme) => {
  return getColor(theme.background, 'rgba(0, 0, 0, 0.54)', 'rgb(118, 118, 123)');
};

export const shadowColor = (theme: Theme) => {
  const color = csxColor(theme.bodyBg);

  if (color.lightness() > 0.7) {
    return ['#E8EAFC', '#B2B2B21A', '#9A9A9A1A'];
  }

  return [
    'rgba(0, 0, 0, 0.103475)',
    'rgba(0, 0, 0, 0.0988309)',
    'rgba(0, 0, 0, 0.10301)',
  ];
};

export const hoverColor = (bgColor: string) => {
  const color = csxColor(bgColor);
  return (color.lightness() > .7 ? color.darken(.1) : color.lighten(.1)).toString();
};

export const borderColor = (bodyBg: string) => {
  const color = csxColor(bodyBg);
  return (color.lightness() > .7) ? 'hsla(0,0%,0%,.2)' : 'hsla(0,0%,100%,.2)';
};

export const disabledColor = (theme: Theme) => {
  return getColor(theme.background, 'rgba(0, 0, 0, 0.25)', 'rgba(255,255,255,0.25)');
};

export const buttonColor = (props: ButtonProps, theme: Theme): [string, string, string] => {
  if (props.disabled && (props.type !== 'link' && !props.flat)) {
    return [disabledColor(theme), '#ffffff', 'none'];
  }

  if (props.disabled) {
    return ['rgba(255,255,255,0)', disabledColor(theme), 'none'];
  }

  if (props.type === 'link') {
    return [
      'rgba(255,255,255,0)',
      getColor(theme.background, theme.primary, csxColor(theme.primary).lighten(.7).toString()),
      'none',
    ];
  }
  if (props.flat) {
    const textColor = props.type === 'default' ? getColor(theme.background) : theme[props.type];
    return [
      'rgba(255,255,255,0)',
      textColor,
      csxColor(textColor).fade(.2).toString(),
    ];
  }

  let bgColor = {
    ...theme,
  }[props.type];

  if (props.type === 'default') {
    bgColor = colorShades(theme.background)[4];
  }
  return [bgColor, getColor(bgColor), csxColor(bgColor).lighten(.1).toHexString()];
};

export const colorShades = (color: string) => {
  if (csxColor(color).lightness() > .7) {
    return [
      csxColor(color).darken(.05).toString(),
      csxColor(color).darken(.08).toString(),
      csxColor(color).darken(.1).toString(),
      csxColor(color).darken(.13).toString(),
      csxColor(color).darken(.15).toString(),
    ];
  }

  return [
    csxColor(color).lighten(.05).toString(),
    csxColor(color).lighten(.08).toString(),
    csxColor(color).lighten(.1).toString(),
    csxColor(color).lighten(.13).toString(),
    csxColor(color).lighten(.15).toString(),
  ];
};
