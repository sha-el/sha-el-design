export const zIndexBase = 0;
const above = 1; // use this for all values above the base
// const below = -1; // and this for all values below the base

// Page Layout
export const zAboveBase = above + zIndexBase;
export const zLayoutFooter = above + zIndexBase;
export const zLayoutModal = above + zAboveBase;
export const zLayoutModalBackDrop = above + zAboveBase + zIndexBase;
export const zLayoutPopUp = above + zLayoutModal;

export const zBelowBase = zIndexBase - above;
