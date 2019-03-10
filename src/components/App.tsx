import * as React from 'react';
import { ThemeService } from '../helpers/theme';
import { cssRule } from 'typestyle';
import { Card } from './Card';
import { Button, Input, Menu } from '../index';
import { MenuItem, MenuItemGroup } from './Menu';
import { FaUser, FaPassport } from 'react-icons/fa';
import { Container, SidePanel, Content } from './Layout';

export class App extends React.Component {

  state = {
    isLoading: true,
  };

  componentDidMount() {
    // setInterval(() => this.setState({ isLoading: !this.state.isLoading }), 2000);
  }

  render() {
    new ThemeService();
    cssRule('span, div, input, button', {
      fontSize: '14px',
    });

    return (
      <Container>
        <SidePanel>
          <Menu>
            <MenuItem
              name='HELLO'
              icon={<FaUser />}
            >
              HELLO
            </MenuItem>
            <MenuItemGroup
              title='HELLO AGAIN'
            >
              <MenuItem
                name='HELLO'
                icon={<FaUser />}
              >
                HELLO
              </MenuItem>
            </MenuItemGroup>
          </Menu>
        </SidePanel>
        <Content>
          <Card
            title='Welcome'
          >
            <Input
              placeholder='Username'
              before={<FaUser />}
            />
            <Input
              placeholder='Password'
              before={<FaPassport />}
            />
            <Button>SUBMIT</Button>
            <Button onClick={() => this.setState({ isLoading: !this.state.isLoading })}>OPEN</Button>
          </Card>
        </Content>
      </Container>
    );
  }
}
