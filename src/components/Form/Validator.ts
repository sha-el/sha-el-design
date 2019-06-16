import { booleanSchema } from './boolean';
import { array } from './Iterable';
import { map } from './Map';
import { int } from './Integer';
import { text } from './Text';
import { Validator } from './index';

class Validate<T> {

  props: Validator<T>;

  constructor(props: Validator<T>) {
    this.props = props;
  }

  initialize(): T {
    return this.props.initialize();
  }

  validate(value: any): any {
    return this.props.validate(value);
  }

}

const validate = <T>(v) => new Validate<T>(v);
validate.Text = text;
validate.Integer = int;
validate.Object = map;
validate.Array = array;
validate.Boolean = booleanSchema;

export { validate };
