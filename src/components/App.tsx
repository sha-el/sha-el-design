import * as React from 'react';
import { Row, Col } from './Grid';
import { Input, Popover } from '../';
import { MdSearch, MdPermIdentity, MdShoppingCart } from 'react-icons/md';
import { Carousel } from './Carousel';

export class App extends React.Component {

  state = {
    value: true,
  };

  render() {
    return (
      <div>
        <Carousel
          width='300px'
          autoScroll={true}
        >
          <div style={{ height: '300px', background: '#efe' }}>jello</div>
          <div style={{ height: '300px', background: '#efe' }}>xyz</div>
          <div style={{ height: '300px', background: '#efe' }}>abc</div>
        </Carousel>
      </div>
    );
  }
}
