import { themeVar } from '../components/Theme/helper';

function createBroder(px: number) {
  return `${px}px solid ${themeVar.neutral.neutralVariantKeyColor.outline}`;
}

const border = () => ['none', createBroder(0.5), createBroder(1), createBroder(1.5), createBroder(2)];

export const initBorders = () => {
  let values = ``;

  border().forEach((border, index) => {
    values += `
    .border-level-${index} {
      border: ${border};
    }
    `;
  });

  return values;
};

export const getBorder = (index: number) => border[index];

export const borderCss = (num: number) => num && `border-level-${num}`;

export enum Border {
  border_0 = 'border-level-0',
  border_1 = 'border-level-1',
  border_2 = 'border-level-2',
  border_3 = 'border-level-3',
  border_4 = 'border-level-4',
  border_5 = 'border-level-5',
}
