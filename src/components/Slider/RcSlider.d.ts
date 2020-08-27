declare module 'rc-slider' {
  const Slider: React.ComponentType<Partial<import('rc-slider/lib/Slider').SliderProps>>;
  export const Range: React.ComponentType<Partial<import('rc-slider/lib/Range').RangeProps>>;
  export const Handle: React.ComponentType<Partial<import('rc-slider/lib/Handle').HandleProps>>;
  export const createSliderWithTooltip: typeof import('rc-slider/lib/createSliderWithTooltip').default;
  export default Slider;
}
