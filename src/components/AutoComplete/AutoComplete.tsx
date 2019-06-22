import * as React from 'react';
import { FaCheck } from 'react-icons/fa';
import { MdClear } from 'react-icons/md';

import { Input } from '../Input';
import { InputProps } from '../Input/Input';
import { Popover } from '../Popover';
import { stylesheet } from 'typestyle';
import { styleEnum } from '../../helpers/constants';
import { ThemeService, Theme } from '../../helpers/theme';
import { getColor, nestedAccess } from '../../helpers';
import { color } from 'csx';
import { Row, Col } from '../Grid';

export class AutoComplete<T> extends React.Component<AutoCompleteProps<T>, State<T>> {
  css = css.bind(this);
  private readonly theme = new ThemeService();

  static defaultProps = {
    filterFunction: (inputValue, value) => value.name.toLowerCase().includes(inputValue.toLowerCase()),
    onChange: (value, obj) => { },
    onSearch: () => { },
    mode: 'single',
  };

  constructor(props: AutoCompleteProps<T>) {
    super(props);

    this.state = {
      displayValue: this.get_value(),
      theme: this.theme.selectedTheme$.value,
      data: props.data,
      totalData: this.props.data.length,
      focusedData: -1,
      selectedValues: props.mode === 'multiple' ? this.generateSelectedValues() : [],
    };
  }

  componentDidMount() {
    new ThemeService().selectedTheme$.subscribe(theme => this.setState({ theme }));
  }

  componentWillReceiveProps(nextProps: AutoCompleteProps<T>) {
    if (!(this.state.displayValue === this.get_value(nextProps))) {
      this.setState({ displayValue: this.get_value(nextProps) });
    }
    if (nextProps.mode === 'multiple') {
      this.setState({ selectedValues: this.generateSelectedValues(nextProps) });
    }
  }

  get_value = (props = this.props) => {
    if (props.mode === 'multiple') {
      return;
    }
    const value = props.value;
    if (typeof value !== 'object') {
      const obj = props.data.find(v => props.uniqueIdentifier(v) === value);
      return props.displayProp(obj) || '';
    } else if (!value) {
      return this.state.displayValue;
    }
    return props.displayProp(value as T) || '';
  }

  generateSelectedValues = (props = this.props) => {
    const selectedValues = props.data.filter(v => (props.value as T[keyof T][]).includes(props.uniqueIdentifier(v)));
    return selectedValues;
  }

  displayList = () => {
    const styleSheet = this.css();

    const {
      uniqueIdentifier,
    } = this.props;

    const colStyle = {
      padding: 0,
      margin: 0,
    };

    if (this.props.renderOptions) {
      return this.props.renderOptions.map((value, index, array) => {
        const selected = this.state.selectedValues.find(v => uniqueIdentifier(v) === uniqueIdentifier(this.props.data[index]));
        return (
          <div
            className={`${styleSheet.list} ${index === this.state.focusedData && styleSheet.focusedList}`}
            key={`${index}-auto`}
            onClick={() => !selected && this.onSelect(this.props.data, index)}
          >
            <Row>
              <Col span={23} style={colStyle}>
                {value}
              </Col>
              <Col span={1} style={colStyle}>
                {selected && <FaCheck />}
              </Col>
            </Row>
          </div>);
      });
    }

    return this.state.data.map((value, index) => {
      const selected = this.state.selectedValues.find(v => uniqueIdentifier(v) === uniqueIdentifier(value));
      return (
        <div
          className={`${styleSheet.list} ${index === this.state.focusedData && styleSheet.focusedList}`}
          key={String(this.props.uniqueIdentifier(value))}
          onClick={() => !selected && this.onSelect(this.state.data, index)}
        >
          <Row>
            <Col span={23} style={colStyle}>
              {this.props.displayProp(value)}
            </Col>
            <Col span={1} style={colStyle}>
              {selected && <FaCheck />}
            </Col>
          </Row>
        </div>
      );
    });
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
      selectedValues,
    } = this.state;

    const {
      displayProp,
      uniqueIdentifier,
    } = this.props;

    const obj = data[index > -1 ? index : focusedData];

    if (this.props.mode === 'multiple') {
      const newSelectedValues = selectedValues.concat([obj]);
      this.setState({ selectedValues: newSelectedValues });
      this.props.onChange(newSelectedValues.map(uniqueIdentifier), newSelectedValues);
      return;
    }

    this.setState({ displayValue: displayProp(obj) });

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

  renderClear = () => {
    if (!this.props.allowClear) {
      return nestedAccess(this.props.inputProps, 'after');
    }
    return [(
      <div
        key='clear'
        onClick={() => {
          this.setState({ displayValue: '', selectedValues: [] });
          this.props.onChange(null, null);
        }}
      >
        <MdClear style={{ cursor: 'pointer' }} />
      </div>
    ),
    nestedAccess(this.props.inputProps, 'after'),
    ];
  }

  removeSelected = (index: number) => {
    if (this.props.mode === 'single') {
      return;
    }
    const { selectedValues } = this.state;
    const { uniqueIdentifier } = this.props;

    selectedValues.splice(index, 1);
    this.setState({ selectedValues });
    this.props.onChange(selectedValues.map(uniqueIdentifier), selectedValues);
  }

  renderSelectedOptions = () => {
    if (this.props.mode === 'single') {
      return nestedAccess(this.props.inputProps, 'before');
    }

    const styleSheet = this.css();

    const selectedValues = (
      this.state.selectedValues.map(
        (v, index) => (
          <div
            key={`${this.props.uniqueIdentifier(v)}`}
            className={styleSheet.selectedOptions}
          >
            <span>{this.props.displayProp(v)}</span>
            <MdClear className={styleSheet.clearIcon} onClick={() => this.removeSelected(index)} />
          </div>
        ),
      )
    );

    return [nestedAccess(this.props.inputProps, 'before'), ...selectedValues];
  }

  render() {
    return (
      <div style={{ position: 'relative' }}>
        <Popover
          trigger='onClick'
          content={this.displayList()}
          hideArrow
          expand
        >
          <Input
            value={this.state.displayValue || ''}
            onChange={this.onInputChange}
            onKeyDown={this.onKeyDown}
            {...this.props.inputProps}
            after={this.renderClear()}
            before={this.renderSelectedOptions()}
          />
        </Popover>
      </div>
    );
  }
}

interface BaseAutoCompleteProps<T> {
  data: T[];
  uniqueIdentifier: (v: T) => T[keyof T];
  displayProp: (v: T | null) => string;
  inputProps?: InputProps;
  filterFunction?: (inputValue: string, value: T, index: number, array: T[]) => boolean;
  renderOptions?: React.ReactNode[];
  onSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  allowClear?: boolean;
}

type SingleAutoCompleteProps<T> = {
  mode?: 'single';
  value: T[keyof T] | T;
  onChange: (value: T[keyof T], obj: T) => void;
} & BaseAutoCompleteProps<T>;

type MultiAutoCompleteProps<T> = {
  mode?: 'multiple';
  value: Array<T[keyof T] | T>;
  onChange: (value: Array<T[keyof T]>, obj: T[]) => void;
} & BaseAutoCompleteProps<T>;

export type AutoCompleteProps<T> = MultiAutoCompleteProps<T> | SingleAutoCompleteProps<T>;

interface State<T> {
  displayValue: string | string[];
  theme: Theme;
  data: T[];
  totalData: number;
  focusedData: number;
  selectedValues: T[];
}

function css() {
  const hoverColor = color(this.state.theme.primary).lighten(.5);
  return stylesheet({
    list: {
      cursor: 'pointer',
      padding: '8px 12px 7px',
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
    selectedOptions: {
      border: '1px solid ' + styleEnum.borderColor,
      padding: '5px 10px',
      fontSize: '10px',
      position: 'relative',
      margin: '0 2px',
    },
    clearIcon: {
      padding: '2px',
      fontSize: '12px',
      cursor: 'pointer',
    },
  });
}