/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ name: 'jsonArrayStructure', async: false })
export class JsonArrayStructureConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    if (!value || !Array.isArray(value)) {
      return false;
    }

    return value.every((item: any) => {
      if (typeof item !== 'object') return false;
      if (typeof item.text !== 'string') return false;
      if (typeof item.is_readonly !== 'boolean') return false;
      if (typeof item.is_significant !== 'boolean') return false;
      if (item.is_readonly && !item.is_significant) return false;
      return true;
    });
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be an array of objects with the correct structure, and if is_readonly is true, is_significant must also be true`;
  }
}

export function IsValidJsonArrayStructure(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidJsonArrayStructure',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: JsonArrayStructureConstraint,
    });
  };
}
