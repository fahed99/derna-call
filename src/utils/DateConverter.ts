export const DateConverter = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based, so add 1
  const day = date.getDate().toString().padStart(2, '0');

  const formattedDateString = `${year}/${month}/${day}`;
  return formattedDateString;
};
