import { createContext, Context } from 'react';

export interface RowContextState {
  colPadding: {
    paddingLeft: number;
    paddingRight: number;
  };
}

export const RowContext: Context<RowContextState> = createContext({ colPadding: { paddingLeft: 0, paddingRight: 0 } });
