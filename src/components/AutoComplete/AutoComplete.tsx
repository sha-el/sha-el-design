import * as React from 'react';
import { Input } from '../Input';
import { InputProps } from '../Input/Input';
import { Popover } from '../Popover';
import { stylesheet } from 'typestyle';
import { styleEnum } from '../../helpers/constants';
import { ThemeService, Theme } from '../../helpers/theme';
import { nestedAccess, getColor } from '../../helpers';
import { color } from 'csx';

export class AutoComplete<T> extends React.Component<AutoCompleteProps<T>, State<T>> {
  css = css.bind(this);
  private readonly theme = new ThemeService();

  static defaultProps: Partial<AutoCompleteProps<any>> = {
    filterFunction: (inputValue, value) => value.name.toLowerCase().includes(inputValue.toLowerCase()),
    onChange: (value, obj) => { },
  };

  constructor(props: AutoCompleteProps<T>) {
    super(props);

    this.state = {
      displayValue: this.get_value(props.value),
      data: this.props.data,
      theme: this.theme.selectedTheme$.value,
      totalData: this.props.data.length,
      focusedData: -1,
    };
  }

  componentDidMount() {
    new ThemeService().selectedTheme$.subscribe(theme => this.setState({ theme }));
  }

  componentWillReceiveProps(props: AutoCompleteProps<T>) {
    this.setState({ displayValue: this.get_value(props.value) });
  }

  get_value(value: any) {
    if (typeof value !== 'object') {
      const obj = this.props.data.find(v => v[this.props.uniqueIdentifier] === value);
      return nestedAccess(obj, this.props.displayProp as string) || '';
    }
    return value[this.props.displayProp] || '';
  }

  displayList = () => {
    const styleSheet = this.css();
    if (typeof this.props.renderOptions === 'function') {
      return this.state.data.map((value, index, array) => (
        <div
          className={`${styleSheet.list} ${index === this.state.focusedData && styleSheet.focusedList}`}
          key={value[this.props.uniqueIdentifier] as unknown as string}
          onClick={() => this.onSelect(index)}
        >
          {this.props.renderOptions(value, index, array)}
        </div>
      ));
    }

    return this.state.data.map((value, index) => (
      <div
        className={`${styleSheet.list} ${index === this.state.focusedData && styleSheet.focusedList}`}
        key={value[this.props.uniqueIdentifier] as unknown as string}
        onClick={() => this.onSelect(index)}
      >
        {value[this.props.displayProp]}
      </div>
    ));
  }

  onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = this.props.data.filter((value, index, array) =>
      this.props.filterFunction(e.target.value, value, index, array));

    this.setState({
      displayValue: e.target.value,
      data,
    });
  }

  moveDown = () => {
    const {
      focusedData,
      totalData,
    } = this.state;

    if (focusedData === totalData - 1) {
      return this.setState({ focusedData: 0 });
    }
    return this.setState({ focusedData: focusedData + 1 });
  }

  moveUp = () => {
    const {
      focusedData,
      totalData,
    } = this.state;

    if (focusedData === 0) {
      return this.setState({ focusedData: totalData - 1 });
    }
    return this.setState({ focusedData: focusedData - 1 });
  }

  onSelect = (index?: number) => {
    const {
      focusedData,
      data,
    } = this.state;

    this.props.onChange(
      data[index > -1 ? index : focusedData][this.props.uniqueIdentifier],
      data[index > -1 ? index : focusedData],
    );
  }

  onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      case 40: {
        return this.moveDown();
      }
      case 38: {
        return this.moveUp();
      }
      case 13: {
        return this.onSelect();
      }
    }
  }

  render() {
    return (
      <div style={{ position: 'relative' }}>
        <Popover
          trigger='onClick'
          content={this.displayList()}
          hideArrow
          expand
          style={{
            content: {
              padding: 0,
            },
          }}
        >
          <Input
            value={this.state.displayValue}
            onChange={this.onInputChange}
            onKeyDown={this.onKeyDown}
            {...this.props.inputProps}
          />
        </Popover>
      </div>
    );
  }
}

export interface AutoCompleteProps<T> {
  data: T[];
  value: T[keyof T] | T;
  uniqueIdentifier: keyof T;
  displayProp: keyof T;
  inputProps?: InputProps;
  onChange: (value: T[keyof T], obj: T) => void;
  filterFunction?: (inputValue: string, value: T, index: number, array: T[]) => boolean;
  renderOptions?: (value: T, index: number, array: T[]) => React.ReactNode;
}

interface State<T> {
  displayValue: string;
  data: T[];
  theme: Theme;
  totalData: number;
  focusedData: number;
}

function css() {
  const hoverColor = color(this.state.theme.primary).lighten(.5);
  return stylesheet({
    list: {
      border: `1px solid ${styleEnum.borderColor}`,
      padding: '5px',
      cursor: 'pointer',
      $nest: {
        '&:hover': {
          background: hoverColor.toHexString(),
          color: getColor(hoverColor.toHexString()),
        },
      },
    },
    focusedList: {
      background: hoverColor.toHexString(),
    },
  });
}