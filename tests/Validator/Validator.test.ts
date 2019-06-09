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

test('validates a object using regex values', () => {
  const schema = validate(
    validate.Object({
      serials: validate.Array(
        validate.Object({
          pan: validate.Text().match(/^[A-Z]{5}[0-9]{4}[A-Z]{1}/gm, 'Pan is invalid'),
          aadhaar: validate.Text().match(/^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}/gm, 'Aadhaar is invalid'),
        }),
      ),
    }),
  );

  const check = () => expect(schema.validate({
    serials: [{
        pan: 'AWIPN1234R',
        aadhaar: '1234-123-123-1234',
      }, {
        pan: 'AW',
        aadhaar: '1234-1234-1234-1234',
      },
    ],
  })).toEqual({
    serials: [{
      aadhaar: 'Aadhaar is invalid',
      pan: undefined,
    }, {
      pan: 'Pan is invalid',
      aadhaar: undefined,
    }],
  });
  check();
  check();
  check();
});