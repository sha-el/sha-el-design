import { MarginClassNameInput } from '../helpers/margin';
import { PaddingClassNameInput } from '../helpers/padding';

export interface SurfaceProps {
  elevation?: number;
  border?: number;
  padding?: PaddingClassNameInput;
  margin?: MarginClassNameInput;
}
