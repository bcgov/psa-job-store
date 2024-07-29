import { validate, version } from 'uuid';

export const uuidToGuid = (uuid: string) => {
  return version(uuid) === 4 && validate(uuid) === true ? uuid.replaceAll('-', '') : uuid;
};
