export const formatDateTime = (dateString: string | undefined, notime = false) => {
  if (!dateString) return '';

  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0-11
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  if (notime) return `${year}-${month}-${day}`;
  else return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
