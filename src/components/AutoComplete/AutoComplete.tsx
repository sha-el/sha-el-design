import * as React from 'react';

import { Popover } from '../Popover';
import { Input } from '../Input';
import { ListItem, List } from '../List';
import { Tag } from '../Tag';
import { MdExpandMore, MdExpandLess, MdClose } from 'react-icons/md';
import { Button } from '../Button';
import { InputProps } from '../Input/Input';
import { ThemeConsumer } from '../Theme/Theme';
import { lightText } from '../../helpers/color';
import { Skeleton } from '../Loading';

export class AutoComplete<T> extends React.Component<AutoCompleteProps<T>, State<T>> {
  dataActualLength = 0;

  constructor(props) {
    super(props);

    this.state = {
      search: '',
      data: [],
      open: false,
      loading: false,
      selected: -1,
    };
  }

  static defaultProps = {
    children: <Input />,
    mode: 'single',
    clearable: true,
  };

  fetchData = async () => {
    const { data } = this.props;
    const { search } = this.state;

    let items = data(search);

    if (!Array.isArray(items)) {
      this.setState({ loading: true });
      items = await items;
      this.setState({ loading: false });
    }
    this.dataActualLength = items.length;
    this.setState({ data: items });
  };

  onOpen = (open: boolean) => {
    if (this.props.disabled) {
      return;
    }
    if (!open) {
      return this.setState({ open, selected: -1, search: '' });
    }
    open && this.fetchData();
    this.setState({ open });
  };

  displayList = () => {
    const { data, search, loading, selected } = this.state;
    const { listDisplayProp, uniqueIdentifier, searchValue } = this.props;
    let filteredData = data;

    if (searchValue) {
      filteredData = data?.filter((v) => searchValue(v).toLowerCase().includes(search.toLowerCase()));
    }

    this.dataActualLength = filteredData.length;

    return (
      <Skeleton
        isLoading={loading}
        render={() => (
          <List densed style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {filteredData?.map((v, i) => (
              <ListItem
                key={uniqueIdentifier(v)}
                selected={this.isItemSelected(v) || selected === i}
                onClick={() => this.onChange(v)}
              >
                {listDisplayProp(v)}
              </ListItem>
            ))}
          </List>
        )}
      />
    );
  };

  isItemSelected = (current: T) => {
    const { uniqueIdentifier, value } = this.props;

    if (!value) {
      return false;
    }

    if (Array.isArray(value)) {
      return !!value.find((v) => uniqueIdentifier(v) === uniqueIdentifier(current));
    }

    return uniqueIdentifier(current) === uniqueIdentifier(value);
  };

  displayValue = (): string => {
    const { mode, displayValue, value } = this.props;
    const { open, search } = this.state;
    if (open) {
      return search;
    }

    if (mode === 'single') {
      return displayValue(value as T) || '';
    }

    return '';
  };

  renderBefore = () => {
    const { mode, displayValue, before, value, uniqueIdentifier } = this.props;

    if (mode === 'single') {
      return before;
    }

    return [
      before,
      ...(value as T[]).map((v) => (
        <ThemeConsumer key={uniqueIdentifier(v)}>
          {(theme) => (
            <Tag
              color="#aaa"
              textColor={lightText(theme)}
              onClick={() => this.onChange(v)}
              outline
              size="SMALL"
              key={uniqueIdentifier(v)}
            >
              {displayValue(v)}
            </Tag>
          )}
        </ThemeConsumer>
      )),
    ];
  };

  renderAfter = () => {
    const { open } = this.state;
    const { value, clearable, mode } = this.props;
    const afters = [
      <Button
        key="expand"
        flat
        shape="circle"
        icon={open ? <MdExpandLess key="expand" /> : <MdExpandMore key="expand" />}
      />,
    ];

    if ((mode === 'single' ? value : (value as T[]).length) && clearable) {
      afters.push(
        <Button
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            this.onChange(null);
          }}
          key="clear"
          flat
          shape="circle"
          icon={<MdClose />}
        />,
      );
    }

    return afters.reverse();
  };

  onSearch = (search: string) => {
    this.setState({ search }, this.fetchData);
  };

  onChange = (selected: T) => {
    const { mode, value, onChange, uniqueIdentifier } = this.props;
    if (mode === 'single') {
      onChange(selected as never);
      this.setState({ open: false, search: '' });
      return;
    }

    if (!selected) {
      return onChange([] as never);
    }

    const selectedValues = [...(value as T[])];
    const index = selectedValues.findIndex((v) => uniqueIdentifier(v) === uniqueIdentifier(selected as never));
    index === -1 ? selectedValues.push(selected as never) : selectedValues.splice(index, 1);
    onChange(selectedValues as never);
    this.setState({ search: '' });
  };

  onKeyDown = (e: React.KeyboardEvent) => {
    const { data, selected, open } = this.state;

    e.preventDefault();
    e.stopPropagation();

    switch (e.key) {
      case 'ArrowDown': {
        if (!open) {
          return this.onOpen(true);
        }

        if (selected === this.dataActualLength - 1) {
          return this.setState({ selected: -1 });
        }

        return this.setState({ selected: selected + 1 });
      }
      case 'ArrowUp': {
        if (!open) {
          return this.onOpen(true);
        }

        if (selected === -1) {
          return this.setState({ selected: this.dataActualLength - 1 });
        }

        return this.setState({ selected: selected - 1 });
      }
      case 'Enter': {
        if (selected === -1) {
          return;
        }

        return this.onChange(data[selected]);
      }
    }
  };

  render() {
    const { children, label, error, hint, required } = this.props;

    const { open } = this.state;

    const inputElem = React.cloneElement(children, {
      label,
      error,
      hint,
      after: this.renderAfter(),
      value: this.displayValue(),
      before: this.renderBefore(),
      onChange: (e) => this.onSearch(e.target.value),
      onKeyDown: this.onKeyDown,
      required,
      disabled: this.props.disabled,
    });

    return (
      <Popover
        trigger="onClick"
        position="bottom"
        content={this.displayList()}
        onVisibleChange={(v) => this.onOpen(v)}
        visible={open}
        expand
        hideArrow
        style={{ child: { display: 'block' } }}
      >
        <div>{inputElem}</div>
      </Popover>
    );
  }
}

export interface BaseAutoComplete<T> {
  listDisplayProp: (arg: T) => React.ReactNode;
  uniqueIdentifier: (arg: T) => string;
  required?: InputProps['required'];
  data?: (search: string) => Promise<T[]> | T[];
  displayValue: (value: T) => string;
  searchValue?: (value: T) => string;

  clearable?: boolean;
  children?: React.ReactElement;

  disabled?: boolean;
  label?: string;
  error?: string;
  hint?: string;
  after?: React.ReactNode;
  before?: React.ReactNode;
}

export interface SingleAutoComplete<T> extends BaseAutoComplete<T> {
  mode?: 'single';
  value?: T;
  onChange?: (value: T) => void;
}

export interface MultiAutoComplete<T> extends BaseAutoComplete<T> {
  mode?: 'multiple';
  value?: T[];
  onChange?: (value: T[]) => void;
}

export type AutoCompleteProps<T> = SingleAutoComplete<T> | MultiAutoComplete<T>;

interface State<T> {
  search: string;
  data: T[];
  open: boolean;
  loading: boolean;
  selected: number;
}
