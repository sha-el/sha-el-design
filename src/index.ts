import { Tabs } from './components/Tabs/Tabs';
import { Popover } from './components/Popover/Popover';
import { Pagination } from './components/Pagination/Pagination';
import { Menu } from './components/Menu/Menu';
import { Input } from './components/Input/Input';
import { Row } from './components/Grid/Row';
import { Col } from './components/Grid/Col';
import { Button } from './components/Button/Button';
import { AutoComplete } from './components/AutoComplete/AutoComplete';
import { ThemeService } from './helpers/theme';
import { cssRule } from 'typestyle';

new ThemeService();

cssRule('span, div, input, button', {
    fontSize: '14px',
});

export {
  AutoComplete,
  Button,
  Row,
  Col,
  Input,
  Menu,
  Pagination,
  Popover,
  Tabs,
  ThemeService,
};
