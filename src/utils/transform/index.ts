//remove space
export const removeSpaces = (value: any) => value?.replace(/\s+/g, '');

export const cleanString = (value: any) => {
  return value
    .toLowerCase() // Convert to lowercase
    .replace(/\s+/g, '') // Remove all spaces
    .replace(/[^\w]/g, ''); // Remove all symbols, keeping only alphanumeric characters
};
