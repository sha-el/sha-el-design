import React from 'react';

interface SidepanelState {
  sidebarOpen: boolean;
  updateSidebarOpen: (e: boolean) => void;
  mobileView: boolean;
}

const ctx = React.createContext<SidepanelState>({
  sidebarOpen: undefined,
  updateSidebarOpen: undefined,
  mobileView: false,
});

export const SidePanelContext = ctx;
