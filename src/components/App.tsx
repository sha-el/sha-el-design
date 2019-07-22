import * as React from 'react';
import { Button } from './Button';
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
        <Button>HEllo</Button>
        <Button type='primary' href='/'>GO TO</Button>
      </div>
    );
  }
}
