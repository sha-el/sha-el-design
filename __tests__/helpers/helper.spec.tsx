import { initialize } from '../../src/helpers';

let container: HTMLDivElement;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe('Raw Style', () => {
  it('should add base styles to the document', () => {
    initialize();
    const style = document.querySelector('#sha-el-design-base-style');
    expect(style).not.toBeNull();
  });
});
