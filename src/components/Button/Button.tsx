import * as React from "react";
import { stylesheet, classes } from "typestyle";
import { removeObjectProperties } from "../../helpers";
import { Theme, ThemeConsumer } from "../Theme/Theme";
import { buttonColor, colorShades } from "../../helpers/color";
import { Loading } from "../Loading";

export const Button: React.FunctionComponent<ButtonProps> = (props) => {
  const {
    type,
    size,
    shape,
    displayBlock,
    icon,
    flat,
    className,
    loading,
    component,
    onClick,
    ...rest
  } = props;

  const BaseElement = (
    p:
      | React.AnchorHTMLAttributes<HTMLAnchorElement>
      | React.ButtonHTMLAttributes<HTMLButtonElement>
  ) => {
    if (component) {
      return React.cloneElement(props.component, p);
    }
    if (rest.href !== undefined || type === "link") {
      return React.cloneElement(
        <a {...(p as React.AnchorHTMLAttributes<HTMLAnchorElement>)} />
      );
    }

    return React.cloneElement(
      <button {...(p as React.ButtonHTMLAttributes<HTMLButtonElement>)} />
    );
  };

  const linkButtonRestProps = removeObjectProperties(
    rest as AnchorButtonProps,
    "type"
  );
  if (rest.href !== undefined || type === "link") {
    return (
      <ThemeConsumer>
        {(theme) => {
          const css = style(props, theme);
          return (
            <BaseElement
              className={classes(css.anchor, css.default, className)}
              onClick={(e) => !loading && onClick(e)}
              {...linkButtonRestProps}
            >
              {icon}
              <Loading
                color="white"
                isLoading={loading}
                size="small"
                render={() => <span>{props.children}</span>}
              />
            </BaseElement>
          );
        }}
      </ThemeConsumer>
    );
  }

  const buttonProps = rest as NativeButtonProps;
  return (
    <ThemeConsumer>
      {(theme) => {
        const css = style(props, theme);
        return (
          <BaseElement
            className={classes(css.default, css.button, className)}
            onClick={(e) => !loading && onClick(e)}
            {...buttonProps}
          >
            {icon}
            <Loading
              color="white"
              isLoading={loading}
              size="small"
              render={() => <span>{props.children}</span>}
            />
          </BaseElement>
        );
      }}
    </ThemeConsumer>
  );
};

Button.defaultProps = {
  type: "default",
  size: "default",
  shape: "default",
};

function getSize(size: sizeTypes, shape: shapeTypes, block: boolean) {
  let buttonStyles = {
    padding: "0 20px",
    height: "36px",
    fontSize: "14px",
    width: block ? "100%" : "auto",
    borderRadius: "4px",
    lineHeight: "36px",
  };
  switch (size) {
    case "big": {
      buttonStyles = {
        ...buttonStyles,
        padding: "0 30px",
        height: "40px",
        fontSize: "16px",
      };
    }
  }
  if (shape === "circle") {
    buttonStyles.width = buttonStyles.height;
    buttonStyles.borderRadius = "50%";
    buttonStyles.padding = "0px";
    buttonStyles.lineHeight =
      Number(buttonStyles.height.replace("px", "")) + 5 + "px";
  }
  return buttonStyles;
}

export function style(props: ButtonProps, theme: Theme) {
  const { disabled, children } = props;

  const [bgColor, textColor, hoverBgColor] = buttonColor(props, theme);

  const loadingColor = colorShades(bgColor)[4];

  return stylesheet({
    default: {
      ...getSize(props.size, props.shape, props.displayBlock),
      display: "inline-flex",
      alignItems: "center",
      border: "none",
      cursor: props.loading ? "wait" : "pointer",
      textDecoration: "none",
      boxSizing: "border-box",
      letterSpacing: ".0892857143em",
      fontWeight: 500,
      textAlign: "center",
      justifyContent: "center",
      background: props.loading ? loadingColor : bgColor,
      $nest: {
        "&:focus": {
          outline: "none",
        },
        "&:active": {
          transform: "translate(0, 2px)",
        },
        "&:disabled": {
          background: bgColor,
          cursor: "not-allowed",
          color: textColor,
        },
        svg: {
          display: "inline-block",
          verticalAlign: "middle",
          fontSize: "17px",
          marginLeft: children && "-4px",
          marginRight: children && "8px",
        },
      },
    },
    button: {
      boxShadow: props.flat
        ? "none"
        : "0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)",
      textAlign: "center",
      color: textColor,
      $nest: {
        "&:hover": !disabled && {
          background: hoverBgColor,
          color: textColor,
        },
      },
    },
    anchor: {
      color: textColor,
      textAlign: "left",
      cursor: "pointer",
      $nest: {
        "&[disabled]": {
          cursor: "not-allowed",
        },
      },
    },
  });
}

declare type sizeTypes = "default" | "big";
declare type shapeTypes = "default" | "circle";

export interface BaseButtonProps {
  type?: "default" | "primary" | "secondary" | "danger" | "link";
  size?: sizeTypes;
  shape?: shapeTypes;
  className?: string;
  displayBlock?: boolean;
  flat?: boolean;
  icon?: React.ReactNode;
  loading?: boolean;
  component?: React.ReactElement;

  // For anchor tag
  href?: string;
  target?: string;
  disabled?: boolean;
}

export type AnchorButtonProps = {
  href?: string;
  target?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
} & BaseButtonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

export type NativeButtonProps = {
  link?: false;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
} & BaseButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonProps = AnchorButtonProps | NativeButtonProps;

interface State {
  theme: Theme;
}
