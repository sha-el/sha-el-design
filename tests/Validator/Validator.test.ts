import { validate } from '../../src/components/Form/Validator';

test('Validates a simple object', () => {
  const schema = validate(
    validate.Object({
      name: validate.Text().min(2, 'too small'),
      age: validate.Integer().max(25, 'too old'),
      type: validate.Array(
        validate.Object({
          class: validate.Text().required('Class is Required'),
        }),
      ),
    }),
  );

  const x = schema.validate({
    name: 'anit',
    age: 20,
    type: [{
      class: '20',
    }, {
      class: '',
    }],
  });

  expect(x).toEqual({
    name: undefined,
    age: undefined,
    type: [{
      class: undefined,
    }, {
      class: 'Class is Required',
    }],
  });
});