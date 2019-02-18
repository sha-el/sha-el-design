import * as React from 'react';
import { ThemeService } from '../helpers/theme';
import { cssRule } from 'typestyle';
import { Menu } from './Menu';
import { MenuItem } from './Menu/MenuItem';
import { MenuItemGroup } from './Menu/MenuItemGroup';
import { Button } from './Button';
import { Fa500px, FaAbacus } from 'react-icons/fa';

export const App: React.StatelessComponent = () => {
  new ThemeService();
  cssRule('span, div, input, button', {
    fontSize: '14px',
  });

  return (
    <div>
      <Menu
        showCollapsIcon
      >
        <MenuItem name='1'>
          Hello
        </MenuItem>
        <MenuItemGroup title='Options'>
          <MenuItem name='2'>
            World
          </MenuItem>
          <MenuItem
            name='3'
            icon={<FaAbacus />}
          >
            OLa
          </MenuItem>
        </MenuItemGroup>
        <MenuItem name='3'>
          OLa
        </MenuItem>
      </Menu>
    </div>
  );
};