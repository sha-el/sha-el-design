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

  validate(value: any) {
    const error = this.props.validate(value);
    return error;
  }

  findObjectByKeyVal(obj, key, val) {
    if (!obj || (typeof obj === 'string')) {
      return null;
    }
    if (obj[key] === val) {
      return obj;
    }
    for (const i in obj) {
      if (obj.hasOwnProperty(i)) {
        const found = this.findObjectByKeyVal(obj[i], key, val);
        if (found) {
          return found;
        }
      }
    }
    return null;
  }
}

const validate = (v) => new Validate(v) as any;
validate.Text = text;
validate.Integer = int;
validate.Object = map;
validate.Array = array;

export { validate };