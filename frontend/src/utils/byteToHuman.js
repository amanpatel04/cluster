const byteToHuman = (bytes) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
  if (bytes === 0) return '0 KB';

  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const value = bytes / Math.pow(1024, i);

  // const formatted = Math.ceil(value);

  return `${value.toFixed(1)} ${sizes[i]}`;
};

export default byteToHuman;
