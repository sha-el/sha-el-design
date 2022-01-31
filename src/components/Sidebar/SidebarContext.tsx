import React from 'react';

interface SidepanelState {
  sidebarOpen: boolean;
  updateSidebarOpen: (e: boolean) => void;
}

const ctx = React.createContext<SidepanelState>({
  sidebarOpen: undefined,
  updateSidebarOpen: undefined,
});

export const SidePanelContext = ctx;
