import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Upload } from '.';
import { UploadProps } from './Upload';
import { Button } from '../Button';
import { MdFileUpload } from 'react-icons/md';
import { ListItem } from '../List';

export default {
  title: 'Inputs/Upload',
  component: Upload,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as Meta;

export const Basic: Story<UploadProps> = (args) => {
  return (
    <Upload {...args}>
      <Button displayBlock filled icon={<MdFileUpload />}>
        Upload
      </Button>
    </Upload>
  );
};

export const WithFileList = Basic.bind({});

WithFileList.args = {
  fileList: (file: File) => (
    <ListItem avatar={<img width="100px" src={URL.createObjectURL(file)} />} key={file.name}>
      {file.name}
    </ListItem>
  ),
  multiple: true,
};
