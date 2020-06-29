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
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      data: [],
      open: false,
      loading: false,
    };
  }

  static defaultProps = {
    children: <Input />,
    mode: 'single',
    searchValue: (e) => String(e),
    clearable: true,
  };

  fetchData = async () => {
    const { data } = this.props;
    const { search } = this.state;

    let items = data(search);

    if (!Array.isArray(items)) {
      this.setState({ loading: true });
      items = (await items);
      this.setState({ loading: false });
    }

    this.setState({ data: items });
  }

  onOpen = (open: boolean) => {
    open && this.fetchData();
    this.setState({ open });
  }

  displayList = () => {
    const { data, search, loading } = this.state;
    const { listDisplayProp, uniqueIdentifier, searchValue } = this.props;

    return (
      <Skeleton
        isLoading={loading}
        render={() => (
          <List style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {
              data.filter(v => searchValue(v).toLowerCase().includes(search)).map(
                (v) => (
                  <ListItem
                    key={uniqueIdentifier(v)}
                    selected={this.isItemSelected(v)}
                    onClick={() => this.onChange(v)}
                  >
                    {listDisplayProp(v)}
                  </ListItem>
                ),
              )
            }
          </List>
        )}
      />
    );
  }

  isItemSelected = (current: T) => {
    const { uniqueIdentifier, value } = this.props;

    if (!value) {
      return false;
    }

    if (Array.isArray(value)) {
      return !!value.find((v) => uniqueIdentifier(v) === uniqueIdentifier(current));
    }

    return uniqueIdentifier(current) === uniqueIdentifier(value);
  }

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
  }

  renderBefore = (): any => {
    const { mode, displayValue, before, value, uniqueIdentifier } = this.props;

    if (mode === 'single') {
      return before;
    }

    return [before, ...(value as T[]).map(v => (
      <ThemeConsumer>
        {(theme) => (
          <Tag
            color='#aaa'
            textColor={lightText(theme)}
            onClick={() => this.onChange(v)}
            outline
            chips
            size='SMALL'
            key={uniqueIdentifier(v)}
          >
            {displayValue(v)}
          </Tag>
        )}
      </ThemeConsumer>
    ))];
  }

  renderAfter = () => {
    const { open } = this.state;
    const { value, clearable } = this.props;
    const afters = [<Button key='expand' flat shape='circle' icon={open ? <MdExpandLess key='expand' /> : <MdExpandMore key='expand' />} />];

    if (value && clearable) {
      afters.push(
        <Button
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            this.onChange(null);
          }}
          key='clear'
          flat
          shape='circle'
          icon={<MdClose />}
        />,
      );
    }

    return afters.reverse();
  }

  onSearch = (search: string) => {
    this.setState({ search }, this.fetchData);
  }

  onChange = (selected: T) => {
    const { mode, value, onChange, uniqueIdentifier } = this.props;
    if (mode === 'single') {
      onChange(selected as any);
      this.setState({ open: false, search: '' });
      return;
    }

    if (!selected) {
      return onChange([] as any);
    }

    const selectedValues = [...(value as T[])];
    const index = selectedValues.findIndex((v) => uniqueIdentifier(v) === uniqueIdentifier(selected));
    index === -1 ? selectedValues.push(selected) : selectedValues.splice(index, 1);
    onChange(selectedValues as any);
    this.setState({ search: '' });
  }

  onKeyUp = (e: React.KeyboardEvent) => {
    switch (e.which) {
      case 27: {
        return this.onOpen(false);
      }
      case 9: {
        return this.onOpen(true);
      }
    }
  }

  render() {
    const {
      children,
      label,
      error,
      hint,
      required,
    } = this.props;

    const { open } = this.state;

    const inputElem = React.cloneElement(children, {
      label, error, hint,
      after: this.renderAfter(),
      value: this.displayValue(),
      before: this.renderBefore(),
      onChange: (e) => this.onSearch(e.target.value),
      onKeyUp: this.onKeyUp,
      required,
    });

    return (
      <Popover
        trigger='onClick'
        position='bottomLeft'
        content={this.displayList()}
        onVisibleChange={(v) => this.onOpen(v)}
        visible={open}
        expand
        hideArrow
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
  displayValue?: (value: T) => string;
  searchValue?: (value: T) => string;

  clearable?: boolean;
  children?: React.ReactElement;

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
}