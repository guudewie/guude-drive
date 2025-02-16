const formatBytes = (size, decimals = 1) => {
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  let i = 0;

  while (size >= k && i < sizes.length - 1) {
    size /= k;
    i++;
  }

  return `${size.toFixed(decimals)} ${sizes[i]}`;
};

module.exports = formatBytes;
