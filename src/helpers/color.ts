import Color from 'color';
import { Theme } from '../components/Theme/Theme';
import { ButtonProps } from '../components/Button/Button';

export function getColor(clr: string, black = '#555555', white = '#ffffff') {
  return Color(clr).lightness() > 70 ? black : white;
}

export const lightText = (theme: Theme) => {
  return getColor(theme.background, 'rgba(0, 0, 0, 0.54)', 'rgb(118, 118, 123)');
};

export const shadowColor = (theme: Theme) => {
  const color = Color(theme.bodyBg);

  if (color.lightness() > 70) {
    return ['#E8EAFC', '#B2B2B21A', '#9A9A9A1A'];
  }

  return ['rgba(0, 0, 0, 0.103475)', 'rgba(0, 0, 0, 0.0988309)', 'rgba(0, 0, 0, 0.10301)'];
};

export const hoverColor = (bgColor: string) => {
  const color = Color(bgColor);
  return color.lightness() > 70 ? 'brightness(90%)' : 'brightness(130%)';
};

export const borderColor = (bodyBg: string) => {
  const color = Color(bodyBg);
  return color.lightness() > 70 ? 'hsla(0,0%,0%,.2)' : 'hsla(0,0%,100%,.2)';
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
  primary: boolean,
  secondary: boolean,
  danger: boolean,
  link: boolean,
): [string, string, string, string] => {
  let backgroundColor = 'transparent';
  let textColor = '';
  let hoverBgColor = 'none';
  let border = 'none';

  const type = primary ? 'primary' : secondary ? 'secondary' : danger ? 'danger' : link ? 'link' : 'default';

  const defaultColor = () => (type === 'default' ? getColor(theme.background) : theme[type]);

  if (type === 'link') {
    textColor = getColor(theme.background, theme.primary, Color(theme.primary).lighten(0.7).toString());
  } else if (props.flat) {
    textColor = defaultColor();
    hoverBgColor = Color(textColor).fade(0.7).toString();
  } else if (props.outline) {
    border = `1px solid ${defaultColor()}`;
    textColor = defaultColor();
    hoverBgColor = Color(theme[type]).fade(0.6).toString();
  }

  if (!(props.flat || props.outline || type === 'link' || link)) {
    backgroundColor = type === 'default' ? colorShades(theme.background)[1] : theme[type];
    textColor = getColor(backgroundColor);
    hoverBgColor = Color(backgroundColor).lighten(0.2).hex().toString();
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
        : Color(backgroundColor).lighten(0.2).hex().toString();
  }

  return [backgroundColor, textColor, hoverBgColor, border];
};

export const colorShades = (color: string, type?: 'light' | 'dark') => {
  const darkShades = [
    Color(color).darken(0.05).toString(),
    Color(color).darken(0.08).toString(),
    Color(color).darken(0.1).toString(),
    Color(color).darken(0.13).toString(),
    Color(color).darken(0.15).toString(),
    Color(color).darken(0.2).toString(),
  ];

  const lightShades = [
    Color(color).lighten(0.05).toString(),
    Color(color).lighten(0.08).toString(),
    Color(color).lighten(0.1).toString(),
    Color(color).lighten(0.13).toString(),
    Color(color).lighten(0.15).toString(),
    Color(color).lighten(0.2).toString(),
  ];

  if (type && type === 'dark') {
    return darkShades;
  }

  if (type && type === 'light') {
    return lightShades;
  }

  if (Color(color).lightness() > 0.6) {
    return darkShades;
  }

  return lightShades;
};
