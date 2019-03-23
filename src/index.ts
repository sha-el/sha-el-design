import { ThemeService } from './helpers/theme';
import { cssRule, cssRaw } from 'typestyle';

new ThemeService();

cssRule('span, div, input, button', {
    fontSize: '14px',
});

cssRaw(`
    @import url('https://fonts.googleapis.com/css?family=Comfortaa');
    * {
    font-family: 'Comfortaa', cursive;
    }
`);

export { AutoComplete } from './components/AutoComplete';
export { Button } from './components/Button';
export { Card } from './components/Card';
export { Row, Col } from './components/Grid';
export { Input } from './components/Input';
export { SidePanel, Container, Content } from './components/Layout';
export { Loading } from './components/Loading';
export { Menu, MenuItem, MenuItemGroup } from './components/Menu';
export { Modal } from './components/Modal';
export { Pagination } from './components/Pagination';
export { Popover } from './components/Popover';
export { Table } from './components/Table';
export { TabPanel, Tabs } from './components/Tabs';
export { validate } from './components/Form';