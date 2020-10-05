import * as React from 'react';
import { Row, Col } from '../Grid';
import { List, ListItem } from '../List';
import { Button } from '../Button';
import { CardHeader, Card } from '../Card';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import { Skeleton } from '../Loading';

export interface TransferProps<T> {
  listDisplayProp: (arg: T) => React.ReactNode;
  uniqueIdentifier: (arg: T) => string;
  data?: (search: string) => Promise<T[]> | T[];
  displayValue?: (value: T) => string;
  searchValue?: (value: T) => string;
  onChange?: (values: T[]) => void;
  values?: T[];
  elevation?: number;
}

interface State<T> {
  search: string;
  data: T[];
  selectedLeft: T[];
  selectedRight: T[];
  open: boolean;
  loading: boolean;
}

export class Transfer<T> extends React.Component<TransferProps<T>, State<T>> {
  constructor(props: TransferProps<T>) {
    super(props);

    this.state = {
      search: '',
      data: [],
      open: false,
      loading: false,
      selectedRight: [],
      selectedLeft: [],
    };
  }

  static defaultProps = {
    searchValue: (e) => String(e),
    elevation: 0,
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const { data } = this.props;
    const { search } = this.state;

    let items = data(search);

    if (!Array.isArray(items)) {
      this.setState({ loading: true });
      items = await items;
      this.setState({ loading: false });
    }

    this.setState({ data: items });
  };

  isItemMoved = (current: T) => {
    const { uniqueIdentifier, values } = this.props;

    if (!values) {
      return false;
    }

    return !!values.find((v) => uniqueIdentifier(v) === uniqueIdentifier(current));
  };

  isItemSelected = (current: T, selections: T[]) => {
    const { uniqueIdentifier } = this.props;

    if (!selections) {
      return false;
    }

    return !!selections.find((v) => uniqueIdentifier(v) === uniqueIdentifier(current));
  };

  makeSelection = (current: T, key: 'selectedRight' | 'selectedLeft') => {
    const { uniqueIdentifier } = this.props;

    let selections = this.state[key];

    if (this.isItemSelected(current, selections)) {
      selections = selections.filter((v) => uniqueIdentifier(v) !== uniqueIdentifier(current));
    } else {
      selections.push(current);
    }
    const state = { ...this.state, [key]: selections };
    this.setState(state);
  };

  displayList = () => {
    const { data, search, loading, selectedLeft } = this.state;
    const { listDisplayProp, uniqueIdentifier, searchValue } = this.props;

    return (
      <Skeleton
        isLoading={loading}
        render={() => (
          <List style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {data
              .filter((v) => searchValue(v).toLowerCase().includes(search))
              .map(
                (v) =>
                  !this.isItemMoved(v) && (
                    <ListItem
                      key={uniqueIdentifier(v)}
                      selected={this.isItemSelected(v, selectedLeft)}
                      onClick={() => this.makeSelection(v, 'selectedLeft')}
                    >
                      {listDisplayProp(v)}
                    </ListItem>
                  ),
              )}
          </List>
        )}
      />
    );
  };

  displayValue = () => {
    const { selectedRight } = this.state;
    const { listDisplayProp, uniqueIdentifier, values } = this.props;

    return (
      <List style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {values.map((v) => (
          <ListItem
            key={uniqueIdentifier(v)}
            selected={this.isItemSelected(v, selectedRight)}
            onClick={() => this.makeSelection(v, 'selectedRight')}
          >
            {listDisplayProp(v)}
          </ListItem>
        ))}
      </List>
    );
  };

  transfer = (to: 'right' | 'left') => {
    const { onChange, values, uniqueIdentifier } = this.props;
    const { selectedLeft, selectedRight } = this.state;
    if (to === 'right') {
      onChange([...values, ...selectedLeft]);
      this.setState({ selectedLeft: [] });
      return;
    }

    onChange(values.filter((v) => !selectedRight.find((sr) => uniqueIdentifier(sr) === uniqueIdentifier(v))));
    this.setState({ selectedRight: [] });
  };

  render() {
    const { selectedLeft, selectedRight, data } = this.state;
    return (
      <Card elevation={this.props.elevation} style={{ minWidth: '500px' }}>
        <Row alignItems="center">
          <Col span={10} alignSelf="stretch">
            <CardHeader subtitle={`${data.length} item(s)`} />
            {this.displayList()}
          </Col>
          <Col span={4}>
            <Button
              displayBlock
              flat
              disabled={!selectedLeft.length}
              icon={<MdKeyboardArrowRight />}
              type="primary"
              onClick={() => this.transfer('right')}
            />
            <Button
              displayBlock
              flat
              disabled={!selectedRight.length}
              icon={<MdKeyboardArrowLeft />}
              type="primary"
              onClick={() => this.transfer('left')}
            />
          </Col>
          <Col span={10} alignSelf="stretch">
            <CardHeader subtitle={`${this.props.values.length} item(s)`} />
            {this.displayValue()}
          </Col>
        </Row>
      </Card>
    );
  }
}
