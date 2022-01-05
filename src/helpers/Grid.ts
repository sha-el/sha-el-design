import React from 'react';

export function useWindowSize() {
  const [windowSize, setWindowSize] = React.useState({
    width: window?.innerWidth || 1200,
    height: window?.innerHeight || 800,
  });

  function changeWindowSize() {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }

  React.useEffect(() => {
    window.addEventListener('resize', changeWindowSize);

    return () => {
      window.removeEventListener('resize', changeWindowSize);
    };
  }, []);

  return windowSize;
}
