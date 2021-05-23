import { arrayBetween } from '.';

export type ResponsiveBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type PaddingValue = number | [number, number] | [number, number, number, number];
export type PaddingClassNameInput = PaddingValue | Partial<Record<ResponsiveBreakpoint, PaddingValue>>;

const availablePaddingLevel = arrayBetween(0, 25);

const multiValuePadding = (padding: [number, number] | [number, number, number, number]) => {
  return `
  .padding-${padding.join('-')}
  {
    padding: ${padding.map((v) => v + 'px').join(' ')};
  }

  @media (max-width: 576px) {
    .padding-${padding.join('-')}-xs {
      padding: ${padding.map((v) => v + 'px').join(' ')};
    }
  }

  @media (min-width: 576px) {
    .padding-${padding.join('-')}-sm {
      padding: ${padding.map((v) => v + 'px').join(' ')};
    }
  }

  @media (min-width: 768px) {
    .padding-${padding.join('-')}-md {
      padding: ${padding.map((v) => v + 'px').join(' ')};
    }
  }

  @media (min-width: 992px) {
    .padding-${padding.join('-')}-lg {
      padding: ${padding.map((v) => v + 'px').join(' ')};
    }
  }

  @media (min-width: 1200px) {
    .padding-${padding.join('-')}-xl {
      padding: ${padding.map((v) => v + 'px').join(' ')};
    }
  }
  `;
};

export const initPaddings = () => {
  let values = '';
  availablePaddingLevel.map(
    (padding) =>
      (values += `
    .padding-${padding} {
      padding: ${padding}px;
    }

    @media (max-width: 576px) {
      .padding-${padding}-xs {
        padding: ${padding}px;
      }
    }

    @media (min-width: 576px) {
      .padding-${padding}-sm {
        padding: ${padding}px;
      }
    }

    @media (min-width: 768px) {
      .padding-${padding}-md {
        padding: ${padding}px;
      }
    }

    @media (min-width: 992px) {
      .padding-${padding}-lg {
        padding: ${padding}px;
      }
    }

    @media (min-width: 1200px) {
      .padding-${padding}-xl {
        padding: ${padding}px;
      }
    }
  `),
  );

  values += `
    ${multiValuePadding([0, 5])}
    ${multiValuePadding([0, 10])}
    ${multiValuePadding([0, 15])}
    ${multiValuePadding([0, 20])}
    ${multiValuePadding([0, 25])}

    ${multiValuePadding([5, 0])}
    ${multiValuePadding([10, 0])}
    ${multiValuePadding([15, 0])}
    ${multiValuePadding([20, 0])}
    ${multiValuePadding([25, 0])}

    ${multiValuePadding([10, 5])}
    ${multiValuePadding([15, 5])}
    ${multiValuePadding([20, 5])}
    ${multiValuePadding([25, 5])}

    ${multiValuePadding([5, 10])}
    ${multiValuePadding([15, 10])}
    ${multiValuePadding([20, 10])}
    ${multiValuePadding([25, 10])}

    ${multiValuePadding([5, 15])}
    ${multiValuePadding([10, 15])}
    ${multiValuePadding([20, 15])}
    ${multiValuePadding([25, 15])}

    ${multiValuePadding([5, 20])}
    ${multiValuePadding([10, 20])}
    ${multiValuePadding([15, 20])}
    ${multiValuePadding([25, 20])}

    ${multiValuePadding([5, 25])}
    ${multiValuePadding([10, 25])}
    ${multiValuePadding([15, 25])}
    ${multiValuePadding([20, 25])}

    ${multiValuePadding([5, 0, 0, 0])}
    ${multiValuePadding([10, 0, 0, 0])}
    ${multiValuePadding([15, 0, 0, 0])}
    ${multiValuePadding([20, 0, 0, 0])}
    ${multiValuePadding([25, 0, 0, 0])}
    
    ${multiValuePadding([0, 5, 0, 0])}
    ${multiValuePadding([0, 10, 0, 0])}
    ${multiValuePadding([0, 15, 0, 0])}
    ${multiValuePadding([0, 20, 0, 0])}
    ${multiValuePadding([0, 25, 0, 0])}
    
    ${multiValuePadding([0, 0, 5, 0])}
    ${multiValuePadding([0, 0, 10, 0])}
    ${multiValuePadding([0, 0, 15, 0])}
    ${multiValuePadding([0, 0, 20, 0])}
    ${multiValuePadding([0, 0, 25, 0])}
    
    ${multiValuePadding([0, 0, 0, 5])}
    ${multiValuePadding([0, 0, 0, 10])}
    ${multiValuePadding([0, 0, 0, 15])}
    ${multiValuePadding([0, 0, 0, 20])}
    ${multiValuePadding([0, 0, 0, 25])}

    ${multiValuePadding([8, 0])}
    ${multiValuePadding([4, 0])}
    ${multiValuePadding([6, 8, 6, 9])}
    ${multiValuePadding([6, 8, 6, 28])}
    ${multiValuePadding([12, 16, 12, 18])}
    ${multiValuePadding([12, 16, 12, 38])}
  `;
  return values;
};

export const paddingCss = (value: PaddingClassNameInput) => {
  if (Array.isArray(value)) {
    return `padding-${value.join('-')}`;
  }

  if (typeof value === 'number') {
    return `padding-${value}`;
  }

  if (typeof value === 'object') {
    return Object.keys(value).reduce((pv, cv) => (pv += paddingCss(value[cv]) + '-' + cv) + ' ', '');
  }
};
