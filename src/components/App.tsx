import * as React from 'react';
import { Row, Col } from './Grid';

export class App extends React.Component {

  state = {
    value: true,
  };

  render() {
    return (
      <Row>
        <Col span={6}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
          It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
          and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsu
        </Col>
        <Col offset={6} span={6}>
          hello
        </Col>
      </Row>
    );
  }
}
