import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AutoComplete } from '../../../src';

function autoComplete(
  value: string,
  onChange: (value: string) => void,
  onSearch?: (e: string) => void,
  disabled?: boolean,
) {
  render(
    <AutoComplete
      data={(e) => {
        onSearch?.(e);
        return ['bruce', 'clark', 'diana'];
      }}
      listDisplayProp={(e) => String(e)}
      uniqueIdentifier={(e) => String(e)}
      displayValue={(e) => String(e)}
      value={value}
      onChange={onChange}
      searchValue={(e) => e}
      disabled={disabled}
    />,
  );
}

function MultipleAutoComplete({ value, onChange }: { value: string[]; onChange: (value: string[]) => void }) {
  const [v, updateValue] = React.useState(value);
  return (
    <AutoComplete<string>
      mode="multiple"
      data={() => ['bruce', 'clark', 'diana']}
      listDisplayProp={(e) => e}
      uniqueIdentifier={(e) => e}
      displayValue={(e) => e}
      value={v}
      onChange={(e) => {
        onChange(e);
        updateValue(e);
      }}
      searchValue={(e) => e}
    />
  );
}

describe('Single AutoComplete', () => {
  it('should render a simple AutoComplete with selected value', async () => {
    await act(async () => {
      autoComplete('diana', () => ({}));
    });

    const input = document.querySelector('input');
    expect(input.value).toBe('diana');

    act(() => {
      fireEvent.click(input);
    });
    const selectedElement = document.querySelector('.list-item:nth-child(3)');
    expect(selectedElement).toHaveStyle(`
      background: rgb(83, 109, 254);
    `);
    expect(document.querySelector('input').value).toBe('');
  });

  it('should render a clear button if value is selected', async () => {
    let value = 'diana';
    await act(async () => {
      autoComplete('diana', (e) => (value = e));
    });
    expect(document.querySelector('.seudo').innerHTML).toContain(
      // Path for cross svg.
      'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',
    );

    act(() => {
      fireEvent.click(document.querySelector('.seudo').querySelector('button'));
    });

    expect(value).toBeNull();
  });

  it('should not open popup if disabled', async () => {
    await act(async () => {
      autoComplete('diana', jest.fn, jest.fn, true);
    });

    act(() => {
      fireEvent.click(document.querySelector('input'));
    });

    expect(document.querySelector('.list-item')).toBeNull();
  });

  it('should fetch data from a promise', async () => {
    await act(async () => {
      render(
        <AutoComplete<string>
          data={() => new Promise<string[]>((resolve) => resolve(['bruce', 'diana', 'clark']))}
          listDisplayProp={(e) => String(e)}
          uniqueIdentifier={(e) => String(e)}
          displayValue={(e) => String(e)}
          value="diana"
          onChange={jest.fn}
          searchValue={(e) => e}
        />,
      );
    });

    act(() => {
      fireEvent.click(document.querySelector('input'));
    });

    const data = ['bruce', 'diana', 'clark'];
    document
      .querySelectorAll('.list-item')
      .forEach((element, index) => expect(element.innerHTML).toContain(data[index]));
  });

  it('should update value on select', async () => {
    let value = 'diana';
    await act(async () => {
      autoComplete(value, (e) => (value = e));
    });

    const input = document.querySelector('input');
    act(() => {
      fireEvent.click(input);
    });
    act(() => {
      (document.querySelector('.list-item') as HTMLLIElement).click();
    });
    expect(value).toBe('bruce');
  });

  it('should update list on search', async () => {
    let search = '';
    await act(async () => {
      autoComplete(
        'diana',
        () => ({}),
        (e) => (search = e),
      );
    });

    act(() => {
      fireEvent.click(document.querySelector('input'));
    });

    act(() => {
      fireEvent.change(document.querySelector('input'), { target: { value: 'c' } });
    });

    expect(search).toBe('c');
    expect(document.querySelectorAll('.list-item').length).toBe(2);
    expect(document.querySelector('.list-item:nth-child(1)').innerHTML).toContain('bruce');
    expect(document.querySelector('.list-item:nth-child(2)').innerHTML).toContain('clark');
  });

  it('should navigate list with arrow keys and close popup with escape', async () => {
    let value = 'diana';
    await act(async () => {
      autoComplete(value, (e) => (value = e));
    });

    const input = document.querySelector('input');
    act(() => {
      fireEvent.click(input);
    });

    for (let i = 0; i < 5; i++) {
      act(() => {
        fireEvent.keyDown(document.querySelector('input'), { key: 'ArrowDown' });
      });
    }
    expect(document.querySelector('.list-item')).toHaveStyle(`
      background: rgb(83, 109, 254);
    `);
    expect(document.querySelector('.list-item').innerHTML).toContain('bruce');
    act(() => {
      fireEvent.keyDown(input, { key: 'Enter' });
    });
    expect(value).toBe('bruce');
    expect(document.querySelector('.sha-el-tooltip')).toHaveStyle(`opacity: 0;`);

    act(() => {
      fireEvent.keyDown(input, { key: 'ArrowDown' });
    });
    expect(document.querySelector('.sha-el-tooltip')).toHaveStyle(`opacity: 1;`);

    act(() => {
      fireEvent.keyDown(document.querySelector('input'), { key: 'Enter' });
    });
    expect(value).toBe('bruce');

    for (let i = 0; i < 5; i++) {
      act(() => {
        fireEvent.keyDown(document.querySelector('input'), { key: 'ArrowUp' });
      });
    }

    expect(document.querySelector('.list-item:nth-child(3)')).toHaveStyle(`
      background: rgb(83, 109, 254);
    `);

    act(() => {
      fireEvent.keyDown(input, { key: 'ArrowDown' });
    });
    act(() => {
      fireEvent.keyDown(input, { key: 'Enter' });
    });
    expect(document.querySelector('.list-item')).not.toBeNull();
    act(() => {
      fireEvent.keyDown(document.querySelector('input'), { key: 'Escape' });
    });
    expect(document.querySelector('.sha-el-tooltip')).toHaveStyle(`opacity: 0;`);
    act(() => {
      fireEvent.keyDown(document.querySelector('input'), { key: 'ArrowUp' });
    });
    expect(document.querySelector('.list-item')).not.toBeNull();
  });

  it('should not have any selected items on list if value is null', async () => {
    await act(async () => {
      autoComplete(null, () => ({}));
    });

    act(() => {
      fireEvent.click(document.querySelector('input'));
    });
    document.querySelectorAll('.list-item').forEach((element) =>
      expect(element).not.toHaveStyle(`
      background: rgb(83, 109, 254);
    `),
    );

    act(() => {
      fireEvent.mouseEnter(document.querySelector('.list-item'));
    });

    expect(document.querySelector('.list-item')).toHaveStyle(`
      background: rgb(83, 109, 254);
    `);
  });

  it('should clear input on search', async () => {
    await act(async () => {
      autoComplete(null, (e) => expect(e).toBe('bruce'));
    });
    act(() => {
      fireEvent.click(document.querySelector('input'));
    });
    act(() => {
      fireEvent.keyDown(document.querySelector('input'), { key: 'ArrowDown' });
    });
    act(() => {
      fireEvent.keyDown(document.querySelector('input'), { key: 'Enter' });
    });
    act(() => {
      fireEvent.change(document.querySelector('input'), { target: { value: 'dian' } });
    });

    expect(document.querySelector('.list-item').innerHTML).toContain('diana');
  });
});

describe('Multiple AutoComplete', () => {
  it('should render autocomplete with multiple values', async () => {
    await act(async () => {
      render(<MultipleAutoComplete value={['diana', 'clark']} onChange={() => ({})} />);
    });

    expect(document.querySelector('.seudo').innerHTML).toContain('clark');
    expect(document.querySelector('.seudo').innerHTML).toContain('diana');

    act(() => {
      fireEvent.click(document.querySelector('input'));
    });

    expect(document.querySelector('.list-item:nth-child(2)')).toHaveStyle(`
      background: rgb(83, 109, 254);
    `);
    expect(document.querySelector('.list-item:nth-child(3)')).toHaveStyle(`
      background: rgb(83, 109, 254);
    `);
  });

  it('should update value on select', async () => {
    let value = [];
    await act(async () => {
      render(<MultipleAutoComplete value={['diana', 'clark']} onChange={(e) => (value = e)} />);
    });

    act(() => {
      fireEvent.click(document.querySelector('input'));
    });

    act(() => {
      fireEvent.click(document.querySelector('.list-item'));
      fireEvent.keyDown(document.querySelector('input'), { key: 'Escape' });
    });

    expect(value).toStrictEqual(['diana', 'clark', 'bruce']);

    act(() => {
      fireEvent.click(document.querySelector('.seudo').querySelector('span'));
    });

    expect(value).toStrictEqual(['clark', 'bruce']);

    act(() => {
      fireEvent.click(document.querySelector('button'));
    });

    expect(value).toStrictEqual([]);

    act(() => {
      fireEvent.click(document.querySelector('input'));
    });
  });
});
