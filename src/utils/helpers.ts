export const validateImageFile = (file: File): boolean => {
  const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
  return validTypes.includes(file.type);
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};


/**
 * Merge multiple className strings into one, filtering out falsy values
 * @param classNames - Array of className strings (can include undefined)
 * @returns Single merged className string
 */
export const cx = (...classNames: (string | undefined)[]): string => {
  // Step 1: Filter out falsy values
  const validClassNames = classNames.filter(Boolean);
  // Step 2: Join the class names with a space
  const result = validClassNames.join(' ');
  return result;
};