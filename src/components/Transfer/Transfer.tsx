import React, { useState, useEffect } from 'react';
import { Row, Col } from '../Grid';
import { List, ListItem } from '../List';
import { Button } from '../Button';
import { CardHeader, Card } from '../Card';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import { SurfaceProps } from '../../typings/surface';

export interface TransferProps<T> extends SurfaceProps {
  listDisplayProp: (arg: T) => React.ReactNode;
  uniqueIdentifier: (arg: T) => string;
  data?: T[];
  onChange?: (values: T[]) => void;
  values?: T[];
}

export function Transfer<T>(props: TransferProps<T>) {
  const { listDisplayProp, uniqueIdentifier, onChange, values } = props;

  const [data, updateData] = useState<T[]>([]);
  const [selectedLeft, updateSelectedLeft] = useState<T[]>([]);
  const [selectedRight, updateSelectedRight] = useState<T[]>([]);

  useEffect(() => {
    updateData(props.data);
  });

  const isItemMoved = (current: T) => {
    if (!values) {
      return false;
    }
    return !!values.find((v) => uniqueIdentifier(v) === uniqueIdentifier(current));
  };

  const isItemSelected = (current: T, selections: T[]) => {
    if (!selections) {
      return false;
    }
    return !!selections.find((v) => uniqueIdentifier(v) === uniqueIdentifier(current));
  };

  const makeSelection = (current: T, key: 'selectedRight' | 'selectedLeft') => {
    let selections: T[] = key === 'selectedLeft' ? selectedLeft : selectedRight;
    if (isItemSelected(current, selections)) {
      selections = selections.filter((v) => uniqueIdentifier(v) !== uniqueIdentifier(current));
    } else {
      selections.push(current);
    }
    key === 'selectedLeft' ? updateSelectedLeft([...selections]) : updateSelectedRight([...selections]);
  };

  const displayList = () => {
    return (
      <List style={{ maxHeight: '300px', overflowY: 'auto' }} border={props.border}>
        {data?.map(
          (v) =>
            !isItemMoved(v) && (
              <ListItem
                key={uniqueIdentifier(v)}
                selected={isItemSelected(v, selectedLeft)}
                onClick={() => makeSelection(v, 'selectedLeft')}
              >
                {listDisplayProp(v)}
              </ListItem>
            ),
        )}
      </List>
    );
  };

  const displayValue = () => {
    return (
      <List style={{ maxHeight: '300px', overflowY: 'auto' }} border={props.border}>
        {values?.map((v) => (
          <ListItem
            key={uniqueIdentifier(v)}
            selected={isItemSelected(v, selectedRight)}
            onClick={() => makeSelection(v, 'selectedRight')}
          >
            {listDisplayProp(v)}
          </ListItem>
        ))}
      </List>
    );
  };

  const transfer = (to: 'right' | 'left') => {
    if (to === 'right') {
      onChange([...values, ...selectedLeft]);
      updateSelectedLeft([]);
      console.log(values);
      return;
    }
    onChange(values.filter((v) => !selectedRight.find((sr) => uniqueIdentifier(sr) === uniqueIdentifier(v))));
    updateSelectedRight([]);
  };

  const { padding = { xs: 10, sm: 15, md: 24 }, margin, border, elevation } = props;
  return (
    <Card elevation={elevation} margin={margin} padding={padding} border={border} style={{ minWidth: '500px' }}>
      <Row alignItems="center">
        <Col span={10} alignSelf="stretch">
          <CardHeader subtitle={`${data?.length} item(s)`} />
          {displayList()}
        </Col>
        <Col span={4}>
          <Button
            displayBlock
            flat
            disabled={!selectedLeft.length}
            icon={<MdKeyboardArrowRight />}
            type="primary"
            onClick={() => transfer('right')}
          />
          <Button
            displayBlock
            flat
            disabled={!selectedRight.length}
            icon={<MdKeyboardArrowLeft />}
            type="primary"
            onClick={() => transfer('left')}
          />
        </Col>
        <Col span={10} alignSelf="stretch">
          <CardHeader subtitle={`${values?.length} item(s)`} />
          {displayValue()}
        </Col>
      </Row>
    </Card>
  );
}

Transfer.defaultProps = {
  elevation: 0,
};
