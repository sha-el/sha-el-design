import { array } from './Iterable';
import { map } from './Map';
import { int } from './Integer';
import { text } from './Text';
import { Validator } from './index';

class Validate {

  props: Validator;

  constructor(props: Validator) {
    this.props = props;
  }

  initialize() {
    return this.props.initialize();
  }

  validate(value: any) {
    return this.props.validate(value);
  }

}

const validate = (v) => new Validate(v);
validate.Text = text;
validate.Integer = int;
validate.Object = map;
validate.Array = array;

export { validate };
