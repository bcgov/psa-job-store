import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

export const validateObject = (data: Record<string, any>, dto: ClassConstructor<any>) => {
  const validated = plainToInstance(dto, data, { enableImplicitConversion: true });
  const errors = validateSync(validated, { skipMissingProperties: false });
  if (errors.length > 0) throw new Error(errors.toString());

  return validated;
};
