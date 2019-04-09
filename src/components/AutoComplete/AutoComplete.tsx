import * as React from 'react';
import { Input } from '../Input';
import { InputProps } from '../Input/Input';
import { Popover } from '../Popover';
import { stylesheet } from 'typestyle';
import { styleEnum } from '../../helpers/constants';
import { ThemeService, Theme } from '../../helpers/theme';
import { getColor } from '../../helpers';
import { color } from 'csx';
import { FaTimes } from 'react-icons/fa';

export class AutoComplete<T> extends React.Component<AutoCompleteProps<T>, State<T>> {
  css = css.bind(this);
  private readonly theme = new ThemeService();

  static defaultProps = {
    filterFunction: (inputValue, value) => value.name.toLowerCase().includes(inputValue.toLowerCase()),
    onChange: (value, obj) => { },
    onSearch: () => { },
  };

  constructor(props: AutoCompleteProps<T>) {
    super(props);

    this.state = {
      displayValue: this.get_value(),
      theme: this.theme.selectedTheme$.value,
      data: props.data,
      totalData: this.props.data.length,
      focusedData: -1,
    };
  }

  componentDidMount() {
    new ThemeService().selectedTheme$.subscribe(theme => this.setState({ theme }));
  }

  componentWillReceiveProps(nextProps: AutoCompleteProps<T>) {
    this.setState({ displayValue: this.get_value(nextProps) });
  }

  get_value(props = this.props) {
    const value = props.value;
    if (typeof value !== 'object') {
      const obj = props.data.find(v => props.uniqueIdentifier(v) === value);
      return props.displayProp(obj) || '';
    } else if (!value) {
      return this.state.displayValue;
    }
    return props.displayProp(value as T) || '';
  }

  displayList = () => {
    const styleSheet = this.css();
    if (this.props.renderOptions) {
      return this.props.renderOptions.map((value, index, array) => (
        <div
          className={`${styleSheet.list} ${index === this.state.focusedData && styleSheet.focusedList}`}
          key={`${index}-auto`}
          onClick={() => this.onSelect(this.props.data, index)}
        >
          {value}
        </div>
      ));
    }

    return this.state.data.map((value, index) => (
      <div
        className={`${styleSheet.list} ${index === this.state.focusedData && styleSheet.focusedList}`}
        key={String(this.props.uniqueIdentifier(value))}
        onClick={() => this.onSelect(this.state.data, index)}
      >
        {this.props.displayProp(value)}
      </div>
    ));
  }

  onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = this.props.data.filter((value, index, array) =>
      this.props.filterFunction(e.target.value, value, index, array));

    this.props.onSearch(e);

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

  onSelect = (data = this.state.data, index?: number) => {
    const {
      focusedData,
    } = this.state;

    const obj = data[index > -1 ? index : focusedData];

    this.setState({ displayValue: this.props.displayProp(obj) });

    this.props.onChange(
      this.props.uniqueIdentifier(obj),
      obj,
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

  renderClear() {
    if (!this.props.allowClear) {
      return null;
    }
    return (
      <div
        onClick={() => {
          this.setState({ displayValue: '' });
          this.props.onChange(null, null);
        }}
      >
        <FaTimes />
      </div>
    );
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
            after={this.renderClear()}
          />
        </Popover>
      </div>
    );
  }
}

export interface AutoCompleteProps<T> {
  data: T[];
  value: T[keyof T] | T;
  uniqueIdentifier: (v: T) => T[keyof T];
  displayProp: (v: T | null) => string;
  inputProps?: InputProps;
  onChange: (value: T[keyof T], obj: T) => void;
  filterFunction?: (inputValue: string, value: T, index: number, array: T[]) => boolean;
  renderOptions?: React.ReactNode[];
  onSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  allowClear?: boolean;
}

interface State<T> {
  displayValue: string;
  theme: Theme;
  data: T[];
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