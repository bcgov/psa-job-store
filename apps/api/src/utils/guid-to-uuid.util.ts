export const guidToUuid = (guid: string) => {
  const pattern = /^([a-f0-9]{8})([a-f0-9]{4})([a-f0-9]{4})([a-f0-9]{4})([a-f0-9]{12})$/i;

  return pattern.test(guid) ? guid.replace(pattern, '$1-$2-$3-$4-$5').toLowerCase() : guid;
};
