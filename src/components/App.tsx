import * as React from 'react';
import { Row, Col } from './Grid';
import { Input, Popover } from '../';
import { MdSearch, MdPermIdentity, MdShoppingCart } from 'react-icons/md';

export class App extends React.Component {

  state = {
    value: true,
  };

  render() {
    return (
      <Row justifyContent='flex-end' alignItems='flex-end'>
        <Col span={2} alignSelf='flex-end'>
          LOGO
        </Col>
        <Col span={2}>
          MEN
        </Col>
        <Col span={3}>
          WOMEN
        </Col>
        <Col span={2}>
          KIDS
        </Col>
        <Col span={11}>
          <Input
            before={<MdSearch />}
            placeholder='Search for Products'
            style={{ marginBottom: 0 }}
          />
        </Col>
        <Col offset={1} span={1}>
          <Popover
            trigger='onClick'
            title='Profile'
            content='hello'
            style={{ container: { width: '300px' } }}
          >
            <span>
              <MdPermIdentity className='icons-big' />
            </span>
          </Popover>
        </Col>
        <Col offset={1} span={1}>
          <MdShoppingCart className='icons-big' />
        </Col>
      </Row>
    );
  }
}
