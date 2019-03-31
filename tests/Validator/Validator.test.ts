import { validate } from '../../src/components/Form/Validator';

test('Validates a simple object', () => {
  const schema = validate(
    validate.Object({
      name: validate.Text().min(2, 'too small'),
      age: validate.Integer().max(25, 'too old'),
      type: validate.Array(
        validate.Object({
          class: validate.Text().required('Class is Required'),
          isClosed: validate.Boolean().required('is Closed is Required'),
        }),
      ),
    }),
  );

  expect(
    schema.validate({
      name: 'anit',
      age: 20,
      type: [{
        class: '20',
      }, {
        class: '',
        isClosed: true,
      }],
    }),
  ).toEqual({
    name: undefined,
    age: undefined,
    type: [{
      class: undefined,
      isClosed: 'is Closed is Required',
    }, {
      class: 'Class is Required',
    }],
  });
});

test('returns a skeleton of given schema with null or blank values', () => {
  const schema = validate(
    validate.Object({
      name: validate.Text().min(2, 'too small').default('Anit'),
      age: validate.Integer().max(25, 'too old').default(20),
      type: validate.Array(
        validate.Object({
          class: validate.Text().required('Class is Required'),
          isClosed: validate.Boolean().required('is Closed is Required'),
        }),
      ),
    }),
  );

  expect(schema.initialize()).toEqual({
    name: 'Anit',
    age: 20,
    type: [{
      class: '',
    }],
  });
});