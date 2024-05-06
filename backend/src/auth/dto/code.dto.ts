import { IsNumber, Validate } from 'class-validator';
import { IsNumberLengthConstraint } from '../validate';

export class CodeDto {
  @IsNumber()
  @Validate(IsNumberLengthConstraint, {
    message: 'Минимальная и максимальная длина 6 символов',
  })
  code: string;
}
