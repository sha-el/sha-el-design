import React from 'react';
import { MenuItem, MenuItemGroup, Button } from 'sha-el-design';
import { MdMoreVert } from 'react-icons/md';

export const CardDropDown: React.FC<{}> = (props) => {
  return (
    <MenuItemGroup
      anchor={
        <span>
          <Button icon={<MdMoreVert />} flat type="secondary" shape="circle" />
        </span>
      }
      inline={false}
      offset={[0, -40]}
      position="bottom"
      title="Options"
    >
      <MenuItem name="1">Option 1</MenuItem>
      <MenuItem name="2">Option 2</MenuItem>
      <MenuItem name="2">Option 3</MenuItem>
    </MenuItemGroup>
  );
};
