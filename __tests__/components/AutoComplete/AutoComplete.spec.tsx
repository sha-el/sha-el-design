import React from 'react';
import { render } from '@testing-library/react';
import { AutoComplete } from '../../../src';

const SingleAutoComplete: React.FC<unknown> = () => {
  const [value, update] = React.useState('Clark');

  return (
    <AutoComplete
      mode="single"
      data={() => ['Bruce', 'Clark', 'Arthur', 'Diana']}
      uniqueIdentifier={(e) => e}
      listDisplayProp={(e) => e}
      label="Select Alter Ego"
      value={value}
      displayValue={(e) => e as string}
      onChange={(e: string) => update(e)}
      hint="Select an alter ego"
    />
  );
};

// const MultiAutoComplete: React.FC<unknown> = () => {
//   const [value, update] = React.useState({
//     avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg',
//     email: 'george.bluth@reqres.in',
//     first_name: 'George',
//     id: 1,
//     last_name: 'Bluth',
//   });

//   return (
//     <AutoComplete<typeof value>
//       value={value}
//       data={() =>
//         fetch('https://reqres.in/api/users')
//           .then((r) => r.json())
//           .then((r) => r.data)
//       }
//       uniqueIdentifier={(e) => String(e.id)}
//       listDisplayProp={(e) => (
//         <Row gutter={[0, '0 10px']}>
//           <Col flex="0 1 50px">
//             <img width="100%" src={e.avatar} />
//           </Col>
//           <Col alignSelf="center" flex="1 0 calc(50% - 100px)">
//             {e.first_name} {e.last_name}
//           </Col>
//         </Row>
//       )}
//       label="Select User"
//       onChange={(e) => update(e)}
//       displayValue={(e) => e && e.first_name}
//       searchValue={(e) => e.first_name}
//     />
//   );
// };

describe('AutoComplete', () => {
  it('should render a single autocomplete', () => {
    render(<SingleAutoComplete />);

    const label = document.querySelector('span');
    expect(label.innerHTML).toBe('Select Alter Ego ');

    const hint = document.querySelector('label');
    expect(hint.innerHTML).toBe('Select an alter ego');

    const input = document.querySelector('input');
    expect(input.value).toBe('Clark');

    const buttons = document.querySelectorAll('button');
    expect(buttons.length).toBe(2);
  });

  it('should remove clear button & selected text', () => {
    render(<SingleAutoComplete />);

    let buttons = document.querySelectorAll('button');
    buttons[0].click();

    const input = document.querySelector('input');
    expect(input.value).toBe('');

    buttons = document.querySelectorAll('button');
    expect(buttons.length).toBe(1);
  });

  it('should render a list drop down', () => {
    render(<SingleAutoComplete />);

    const input = document.querySelector('input');
    input.click();

    const ListItems = document.querySelectorAll('li');
    expect(ListItems.length).toBe(4);
  });
});
