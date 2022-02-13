import topography from './typography.css';
import { initializeNotification } from './../components/Notification/Notification';
import { initMargins } from './margin';
import { initPaddings } from './padding';
import { useTheme } from '../components/Theme/Theme';

function createLink(href: string, rel?: string, crossOrigin?: boolean) {
  const link = document.createElement('link');
  link.href = href;
  link.rel = rel;
  if (crossOrigin) {
    link.crossOrigin = 'crossOrigin';
  }
  document.querySelector('head').appendChild(link);
}

export function initialize() {
  const style = document.createElement('style');
  style.id = 'sha-el-design-base-style';
  style.innerHTML = `
    body {
      background: var(--neutral-neutralKeyColor-background);
      color: var(--neutral-neutralKeyColor-onBackground);
      margin: 0;
      min-height: 100vh;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      -webkit-tap-highlight-color: rgba(0,0,0,0);
      -webkit-overflow-scrolling: touch;
    }
    a, a:hover, a:focus, a:active {
      text-decoration: none;
      color: var(--color);
    }
    svg {
      display: flex;
    }
    ${topography}
    ${initMargins()}
    ${initPaddings()}
  `;
  const headerEl = document.getElementsByTagName('head');
  headerEl[0].appendChild(style);
  createLink('https://fonts.googleapis.com', 'preconnect');
  createLink('https://fonts.gstatic.com', 'preconnect', true);
  createLink(
    'https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;500;700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,400&display=swap',
    'stylesheet',
  );
  useTheme();
  initializeNotification();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function flattenObj(obj: { [x: string]: any }, parent: string, res = {}) {
  for (const key in obj) {
    const propName = parent ? parent + '-' + key : key;
    if (typeof obj[key] == 'object') {
      flattenObj(obj[key], propName, res);
    } else {
      res[propName] = obj[key];
    }
  }
}

// export function getChildIndex(node: HTMLElement) {
//   return Array.prototype.indexOf.call(node.parentNode.childNodes, node);
// }

export const isBrowser = () => typeof window !== 'undefined' && typeof window.document !== 'undefined';

export const classes = (...args: string[]) => args.filter((v) => !!v).join(' ');
