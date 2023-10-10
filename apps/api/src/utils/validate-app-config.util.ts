import { AppConfigDto } from '../dtos/app-config.dto';
import { validateObject } from './validate-object.util';

export const validateAppConfig = (config: Record<string, unknown>) => {
  return validateObject(config, AppConfigDto);
};
