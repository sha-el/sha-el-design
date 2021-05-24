import { arrayBetween } from '.';

export type ResponsiveBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type MarginValue = number | [number, number] | [number, number, number, number];
export type MarginClassNameInput = MarginValue | Partial<Record<ResponsiveBreakpoint, MarginValue>>;

const availableMarginLevel = arrayBetween(0, 25);

const multiValueMargin = (margin: [number, number] | [number, number, number, number]) => {
  return `
  .margin-${margin.join('-')} {
    margin: ${margin.map((v) => v + 'px').join(' ')};
  }

  @media (max-width: 576px) {
    .margin-${margin.join('-')}-xs {
      margin: ${margin.map((v) => v + 'px').join(' ')};
    }
  }

  @media (min-width: 576px) {
    .margin-${margin.join('-')}-sm {
      margin: ${margin.map((v) => v + 'px').join(' ')};
    }
  }

  @media (min-width: 768px) {
    .margin-${margin.join('-')}-md {
      margin: ${margin.map((v) => v + 'px').join(' ')};
    }
  }

  @media (min-width: 992px) {
    .margin-${margin.join('-')}-lg {
      margin: ${margin.map((v) => v + 'px').join(' ')};
    }
  }

  @media (min-width: 1200px) {
    .margin-${margin.join('-')}-xl {
      margin: ${margin.map((v) => v + 'px').join(' ')};
    }
  }
  `;
};

export const initMargins = () => {
  let values = '';
  availableMarginLevel.map(
    (margin) =>
      (values += `
    .margin-${margin} {
      margin: ${margin}px;
    }

    @media (max-width: 576px) {
      .margin-${margin}-xs {
        margin: ${margin}px;
      }
    }

    @media (min-width: 576px) {
      .margin-${margin}-sm {
        margin: ${margin}px;
      }
    }

    @media (min-width: 768px) {
      .margin-${margin}-md {
        margin: ${margin}px;
      }
    }

    @media (min-width: 992px) {
      .margin-${margin}-lg {
        margin: ${margin}px;
      }
    }

    @media (min-width: 1200px) {
      .margin-${margin}-xl {
        margin: ${margin}px;
      }
    }
  `),
  );

  values += `
    ${multiValueMargin([0, 5])}
    ${multiValueMargin([0, 10])}
    ${multiValueMargin([0, 15])}
    ${multiValueMargin([0, 20])}
    ${multiValueMargin([0, 25])}

    ${multiValueMargin([5, 0])}
    ${multiValueMargin([10, 0])}
    ${multiValueMargin([15, 0])}
    ${multiValueMargin([20, 0])}
    ${multiValueMargin([25, 0])}

    ${multiValueMargin([10, 5])}
    ${multiValueMargin([15, 5])}
    ${multiValueMargin([20, 5])}
    ${multiValueMargin([25, 5])}

    ${multiValueMargin([5, 10])}
    ${multiValueMargin([15, 10])}
    ${multiValueMargin([20, 10])}
    ${multiValueMargin([25, 10])}

    ${multiValueMargin([5, 15])}
    ${multiValueMargin([10, 15])}
    ${multiValueMargin([20, 15])}
    ${multiValueMargin([25, 15])}

    ${multiValueMargin([5, 20])}
    ${multiValueMargin([10, 20])}
    ${multiValueMargin([15, 20])}
    ${multiValueMargin([25, 20])}

    ${multiValueMargin([5, 25])}
    ${multiValueMargin([10, 25])}
    ${multiValueMargin([15, 25])}
    ${multiValueMargin([20, 25])}

    ${multiValueMargin([5, 0, 0, 0])}
    ${multiValueMargin([10, 0, 0, 0])}
    ${multiValueMargin([15, 0, 0, 0])}
    ${multiValueMargin([20, 0, 0, 0])}
    ${multiValueMargin([25, 0, 0, 0])}
    
    ${multiValueMargin([0, 5, 0, 0])}
    ${multiValueMargin([0, 10, 0, 0])}
    ${multiValueMargin([0, 15, 0, 0])}
    ${multiValueMargin([0, 20, 0, 0])}
    ${multiValueMargin([0, 25, 0, 0])}
    
    ${multiValueMargin([0, 0, 5, 0])}
    ${multiValueMargin([0, 0, 10, 0])}
    ${multiValueMargin([0, 0, 15, 0])}
    ${multiValueMargin([0, 0, 20, 0])}
    ${multiValueMargin([0, 0, 25, 0])}
    
    ${multiValueMargin([0, 0, 0, 5])}
    ${multiValueMargin([0, 0, 0, 10])}
    ${multiValueMargin([0, 0, 0, 15])}
    ${multiValueMargin([0, 0, 0, 20])}
    ${multiValueMargin([0, 0, 0, 25])}

    ${multiValueMargin([4, 0])}
    ${multiValueMargin([2, 0])}
  `;
  return values;
};

export const marginCss = (value: MarginClassNameInput) => {
  if (Array.isArray(value)) {
    return `margin-${value.join('-')}`;
  }

  if (typeof value === 'number') {
    return `margin-${value}`;
  }

  if (typeof value === 'object') {
    return Object.keys(value).reduce((pv, cv) => (pv += marginCss(value[cv]) + '-' + cv) + ' ', '');
  }
};
