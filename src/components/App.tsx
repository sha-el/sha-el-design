import * as React from 'react';
import { ThemeService } from '../helpers/theme';
import { cssRule } from 'typestyle';
import { Pagination } from './Pagination';
import { Col, Row } from './Grid';

export class App extends React.Component {

  state = {
    currentPage: 1,
  };

  render() {
    new ThemeService();
    cssRule('span, div, input, button', {
      fontSize: '14px',
    });
    return (
      <div>
        <Row>
          <Col span={10}>
            <Pagination
              totalCount={500}
              batchSize={50}
              currentPage={this.state.currentPage}
              onChange={(page, size) => this.setState({currentPage: page})}
              cursorBasedPagination
            />
          </Col>
        </Row>
      </div>
    );
  }
}