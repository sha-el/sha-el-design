import { color, color as csxColor } from 'csx';
import { getColor } from './../helpers';
import { Theme } from '../components/Theme/Theme';
import { ButtonProps } from '../components/Button/Button';

export const lightText = (theme: Theme) => {
  return getColor(theme.background, 'rgba(0, 0, 0, 0.54)', 'rgb(118, 118, 123)');
};

export const shadowColor = (theme: Theme) => {
  const color = csxColor(theme.bodyBg);

  if (color.lightness() > 0.7) {
    return ['#E8EAFC', '#B2B2B21A', '#9A9A9A1A'];
  }

  return ['rgba(0, 0, 0, 0.103475)', 'rgba(0, 0, 0, 0.0988309)', 'rgba(0, 0, 0, 0.10301)'];
};

export const hoverColor = (bgColor: string) => {
  const color = csxColor(bgColor);
  return color.lightness() > 0.7 ? 'brightness(90%)' : 'brightness(130%)';
};

export const borderColor = (bodyBg: string) => {
  const color = csxColor(bodyBg);
  return color.lightness() > 0.7 ? 'hsla(0,0%,0%,.2)' : 'hsla(0,0%,100%,.2)';
};

export const disabledColor = (theme: Theme) => {
  return getColor(theme.background, 'rgba(0, 0, 0, 0.20)', 'rgba(255,255,255,0.20)');
};

export const disabledText = (theme: Theme) => {
  return getColor(theme.background, 'rgba(0, 0, 0, 0.38)', 'rgba(255, 255, 255, 0.5)');
};

/**
 * @param props: ButtonProps,
 * @param theme: Theme
 * @returns [backgroundColor, textColor, hoverBgColor, border],
 */
export const buttonColor = (
  props: ButtonProps,
  theme: Theme,
  primary,
  secondary: boolean,
  danger: boolean,
  link: boolean,
): [string, string, string, string] => {
  let backgroundColor = 'transparent';
  let textColor = '';
  let hoverBgColor = 'none';
  let border = 'none';

  const type = primary
    ? 'primary'
    : secondary
    ? 'secondary'
    : danger
    ? 'danger'
    : link
    ? 'link'
    : props.type || 'default';

  const defaultColor = () => (type === 'default' ? getColor(theme.background) : theme[type]);

  if (type === 'link') {
    textColor = getColor(theme.background, theme.primary, csxColor(theme.primary).lighten(0.7).toString());
  } else if (props.flat) {
    textColor = defaultColor();
    hoverBgColor = csxColor(textColor).fade(0.2).toString();
  } else if (props.outline) {
    border = `1px solid ${defaultColor()}`;
    textColor = defaultColor();
    hoverBgColor = csxColor(theme[type]).fade(0.2).toString();
  }

  if (!(props.flat || props.outline || type === 'link' || link)) {
    backgroundColor = type === 'default' ? colorShades(theme.background)[1] : theme[type];
    textColor = getColor(backgroundColor);
    hoverBgColor = csxColor(backgroundColor).lighten(0.1).toHexString();
  }

  if (props.disabled && props.outline) {
    border = `1px solid ${disabledColor(theme)}`;
    textColor = disabledColor(theme);
  } else if (props.disabled && !(type === 'link' || link || props.flat) && !props.outline) {
    backgroundColor = disabledColor(theme);
    textColor = getColor(disabledColor(theme));
  } else if (props.disabled && !props.outline) {
    backgroundColor = 'transparent';
    textColor = disabledColor(theme);
  }

  if (props.loading) {
    backgroundColor =
      backgroundColor === 'transparent' || type === 'default'
        ? 'transparent'
        : color(backgroundColor).lighten(0.1).toHexString();
  }

  return [backgroundColor, textColor, hoverBgColor, border];
};

export const colorShades = (color: string) => {
  if (csxColor(color).lightness() > 0.7) {
    return [
      csxColor(color).darken(0.05).toString(),
      csxColor(color).darken(0.08).toString(),
      csxColor(color).darken(0.1).toString(),
      csxColor(color).darken(0.13).toString(),
      csxColor(color).darken(0.15).toString(),
    ];
  }

  return [
    csxColor(color).lighten(0.05).toString(),
    csxColor(color).lighten(0.08).toString(),
    csxColor(color).lighten(0.1).toString(),
    csxColor(color).lighten(0.13).toString(),
    csxColor(color).lighten(0.15).toString(),
  ];
};
