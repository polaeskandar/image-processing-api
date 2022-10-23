export const validateFileName = (filename: string): boolean => {
  return !!filename && filename.includes(".");
};
