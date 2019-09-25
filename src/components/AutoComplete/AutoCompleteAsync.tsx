import * as React from 'react';
import { MdCheck, MdClear } from 'react-icons/md';
import { color } from 'csx';
import { stylesheet } from 'typestyle';

import { Popover } from '../Popover';
import { Row, Col } from '../Grid';
import { InputProps, Input } from '../Input/Input';
import { ThemeService, Theme } from '../../helpers/theme';
import { nestedAccess, getColor } from '../../helpers';
import { styleEnum } from '../../helpers/constants';
import { Tag } from '../Tag';

export class AutoCompleteAsync<T> extends React.Component<AutoCompleteAsyncProps<T>, State<T>> {
  css = css.bind(this);
  private readonly theme = new ThemeService();
  private listContainerEl: HTMLDivElement = null;

  static defaultProps = {
    filterFunction: (inputValue, value) => value.toLowerCase().includes(inputValue.toLowerCase()),
    onChange: (value, obj) => { },
    onSearch: () => { },
    mode: 'single',
  };

  constructor(props: AutoCompleteAsyncProps<T>) {
    super(props);

    this.state = {
      data: [],
      theme: this.theme.selectedTheme$.value,
      focusedData: -1,
      searchValue: '',
      isOpen: false,
    };
  }

  componentDidMount() {
    new ThemeService().selectedTheme$.subscribe(theme => this.setState({ theme }));
  }

  generateSelectedValues = (props = this.props) => {
    return (props.value as T[]).map(v => this.props.displayProp(v));
  }

  displayList = () => {
    const styleSheet = this.css();
    let selected = null;

    const {
      uniqueIdentifier,
    } = this.props;

    const colStyle = {
      padding: 0,
      margin: 0,
    };

    if (this.props.renderOptions) {
      return this.props.renderOptions.map((value, index, array) => {
        if (this.props.value) {
          selected = this.props.mode === 'single' ? uniqueIdentifier(this.props.value) === uniqueIdentifier(this.state.data[index])
            : this.props.value.find(v => uniqueIdentifier(v) === uniqueIdentifier(this.state.data[index]));
        }
        return (
          <div
            className={`${styleSheet.list} ${index === this.state.focusedData && styleSheet.focusedList}`}
            key={`${index}-auto`}
            onClick={() => !selected && this.onSelect(this.state.data, index)}
          >
            <Row>
              <Col span={23} style={colStyle}>
                {value}
              </Col>
              <Col span={1} style={colStyle}>
                {selected && <MdCheck />}
              </Col>
            </Row>
          </div>);
      });
    }

    return this.state.data.map((value, index) => {
      if (this.props.value) {
        selected = this.props.mode === 'single' ? uniqueIdentifier(this.props.value) === uniqueIdentifier(this.state.data[index])
          : this.props.value.find(v => uniqueIdentifier(v) === uniqueIdentifier(this.state.data[index]));
      }
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
              {selected && <MdCheck />}
            </Col>
          </Row>
        </div>
      );
    });
  }

  onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 3) {
      return this.setState({ searchValue: e.target.value });
    }

    this.props.data(e.target.value).then(
      (v) => {
        this.setState({ data: v });
      },
    );

    this.setState({ searchValue: e.target.value });
  }

  moveDown = () => {
    const {
      focusedData,
    } = this.state;

    const totalData = this.listContainerEl.children.length;

    if (focusedData === totalData - 1) {
      return this.setState({ focusedData: 0 });
    }
    return this.setState({ focusedData: focusedData + 1 });
  }

  moveUp = () => {
    const {
      focusedData,
    } = this.state;

    const totalData = this.listContainerEl.children.length;

    if (focusedData === 0) {
      return this.setState({ focusedData: totalData - 1 });
    }
    return this.setState({ focusedData: focusedData - 1 });
  }

  onSelect = (data: T[], index?: number) => {
    const {
      value,
    } = this.props;

    const obj = data[index];

    if (this.props.mode === 'multiple') {
      const newSelectedValues = (value as T[]).concat([obj]);
      this.props.onChange(newSelectedValues);
      return;
    }

    this.setState({ searchValue: '', isOpen: false });

    this.props.onChange(
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
        return this.onSelect(this.state.data, this.state.focusedData);
      }
    }
  }

  renderClear = () => {
    if (!this.props.allowClear) {
      return null;
    }
    return [(
      <div
        key='clear'
        onClick={() => {
          this.setState({ searchValue: '' });
          this.props.onChange(null);
        }}
      >
        <MdClear style={{ cursor: 'pointer' }} />
      </div>
    )];
  }

  removeSelected = (index: number) => {
    if (this.props.mode === 'single') {
      return;
    }

    this.props.onChange(this.props.value.filter((v, i) => i !== index));
  }

  renderSelectedOptions = () => {
    if (this.props.mode === 'single') {
      return null;
    }

    const selectedValues = (
      this.props.value.map(
        (v, index) => (
          <Tag
            key={`${this.props.uniqueIdentifier(v)}`}
            color={this.state.theme.secondary}
            onClose={() => this.removeSelected(index)}
          >
            {v && this.props.displayProp(v)}
          </Tag>
        ),
      )
    );

    return [nestedAccess(this.props.inputProps, 'before'), ...selectedValues];
  }

  updateListState = (isOpen: boolean) => this.setState({ isOpen });

  render() {
    const styleSheet = this.css();

    const { isOpen } = this.state;

    return (
      <div style={{ position: 'relative' }}>
        <Popover
          position='bottomLeft'
          trigger='onClick'
          content={<div className={styleSheet.listContainer}>
            <Input
              {...this.props.inputProps}
              value={this.state.searchValue}
              onChange={this.onInputChange}
              onKeyDown={this.onKeyDown}
              autoFocus
            />
            <div ref={(e) => this.listContainerEl = e}>
              {this.displayList()}
            </div>
          </div>}
          visible={isOpen}
          onVisibleChange={this.updateListState}
          align={{
            targetOffset: [0, 45],
          }}
          hideArrow
          expand
        >
          <div>
            <Input
              {...this.props.inputProps}
              value={this.props.mode === 'single' && this.props.value
                ? this.props.displayProp(this.props.value) : ''}
              before={this.renderSelectedOptions()}
              after={this.renderClear()}
              label={this.props.label}
              readOnly
            />
          </div>
        </Popover>
      </div>
    );
  }
}

interface BaseAutoCompleteProps<T> {
  data: (search: string) => Promise<T[]>;
  label: React.ReactNode;
  uniqueIdentifier: (v: T) => T[keyof T];
  displayProp: (v: T) => string;
  inputProps?: InputProps;
  renderOptions?: React.ReactNode[];
  onSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  allowClear?: boolean;
}

type SingleAutoCompleteProps<T> = {
  mode?: 'single';
  value: T;
  onChange: (value: T) => void;
} & BaseAutoCompleteProps<T>;

type MultiAutoCompleteProps<T> = {
  mode?: 'multiple';
  value: T[];
  onChange: (value: T[]) => void;
} & BaseAutoCompleteProps<T>;

export type AutoCompleteAsyncProps<T> = SingleAutoCompleteProps<T> | MultiAutoCompleteProps<T>;

interface State<T> {
  searchValue: string;
  theme: Theme;
  data: T[];
  focusedData: number;
  isOpen: boolean;
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
    listContainer: {
      maxHeight: '300px',
      overflowY: 'scroll',
    },
    focusedList: {
      background: hoverColor.toHexString(),
    },
    selectedOptions: {
      border: '1px solid ' + styleEnum.borderColor,
      fontSize: '10px',
      background: 'white',
    },
    clearIcon: {
      padding: '2px',
      fontSize: '12px',
      cursor: 'pointer',
    },
  });
}