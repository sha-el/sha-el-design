import { ColorChoices } from '../typings/color';
import { MarginClassNameInput } from '../helpers/margin';
import { PaddingClassNameInput } from '../helpers/padding';

export interface SurfaceProps {
  /**
   * Elevation for shadow
   */
  elevation?: number;
  border?: number;
  padding?: PaddingClassNameInput;
  margin?: MarginClassNameInput;

  /**
   * Background color
   * @accepts "primary", "secondary", "tertiary", 'neutral' or any color code
   */
  filled?: ColorChoices;
}
