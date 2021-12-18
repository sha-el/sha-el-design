import topography from './typography.css';
import { initializeNotification } from './../components/Notification/Notification';
import { initMargins } from './margin';
import { initPaddings } from './padding';

export function nestedAccess<T, P1 extends keyof NonNullable<T>>(obj: T, prop1: P1): NonNullable<T>[P1] | undefined;

export function nestedAccess<T, P1 extends keyof NonNullable<T>, P2 extends keyof NonNullable<NonNullable<T>[P1]>>(
  obj: T,
  prop1: P1,
  prop2: P2,
): NonNullable<NonNullable<T>[P1]>[P2] | undefined;

export function nestedAccess<
  T,
  P1 extends keyof NonNullable<T>,
  P2 extends keyof NonNullable<NonNullable<T>[P1]>,
  P3 extends keyof NonNullable<NonNullable<NonNullable<T>[P1]>[P2]>,
>(obj: T, prop1: P1, prop2: P2, prop3: P3): NonNullable<NonNullable<NonNullable<T>[P1]>[P2]>[P3] | undefined;

export function nestedAccess<
  T,
  P1 extends keyof NonNullable<T>,
  P2 extends keyof NonNullable<NonNullable<T>[P1]>,
  P3 extends keyof NonNullable<NonNullable<NonNullable<T>[P1]>[P2]>,
  P4 extends keyof NonNullable<NonNullable<NonNullable<NonNullable<T>[P1]>[P2]>[P3]>,
>(
  obj: T,
  prop1: P1,
  prop2: P2,
  prop3: P3,
): NonNullable<NonNullable<NonNullable<NonNullable<T>[P1]>[P2]>[P3]>[P4] | undefined;

export function nestedAccess<T>(obj: T, ...props: string[]): unknown {
  return obj && props.reduce((result, prop) => (result == null ? undefined : result[prop]), obj);
}

export function initialize() {
  const style = document.createElement('style');
  style.id = 'sha-el-design-base-style';
  style.innerHTML = `
    body {
      background: var(--background);
      color: var(--color);
      margin: 0;
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
    @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,400&display=swap');
    @import url('https://fonts.googleapis.com/css?family=Fira+Code:300,400,500,600,700&display=swap');
    ${topography}
    ${initMargins()}
    ${initPaddings()}
    
  `;
  document.getElementsByTagName('head')[0].appendChild(style);
  initializeNotification();
}

export function getChildIndex(node: HTMLElement) {
  return Array.prototype.indexOf.call(node.parentNode.childNodes, node);
}

export const isBrowser = () => typeof window !== 'undefined' && typeof window.document !== 'undefined';

export const classes = (...args: string[]) => args.filter((v) => !!v).join(' ');
