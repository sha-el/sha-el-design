import React from 'react';
import { List } from '../List';

export interface UploadProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  children: React.ReactElement;
  fileList?: (file: File) => React.ReactElement;
}

export const Upload: React.FC<UploadProps> = (props) => {
  const { children, fileList, ...inputProps } = props;
  const [files, updateFiles] = React.useState<FileList>(null);
  const inputEl = React.useRef<HTMLInputElement>();
  return (
    <div>
      <input
        ref={inputEl}
        hidden
        type="file"
        {...inputProps}
        onChange={(e) => {
          updateFiles(e.target.files);
          props.onChange && props.onChange(e);
        }}
      />
      {React.cloneElement(children, {
        onClick: (e: React.MouseEvent) => {
          e.preventDefault();
          inputEl.current.click();
        },
        onDrop: (e: React.DragEvent) => {
          e.preventDefault();
          inputEl.current.files = e.dataTransfer.files;
          updateFiles(e.dataTransfer.files);
          props.onChange?.(e as unknown as React.ChangeEvent<HTMLInputElement>);
        },
        onDragOver: (e: React.DragEvent) => {
          e.preventDefault();
        },
      })}
      {fileList && files && <List>{Array.prototype.map.call(files, fileList)}</List>}
    </div>
  );
};
