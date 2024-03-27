import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isNumberLength', async: false })
export class IsNumberLengthConstraint implements ValidatorConstraintInterface {
  validate(number: any) {
    const strNumber = String(number);
    return strNumber.length === 6;
  }

  defaultMessage() {
    return 'Минимальная и максимальная длина 6 символов';
  }
}
