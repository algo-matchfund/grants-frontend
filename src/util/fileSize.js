const getFileSize = (bytes) => {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  let output;
  const multipliers = ['KB', 'MB'];
  for (let mlIdx = 0, approx = bytes / 1024; approx > 1 && mlIdx < multipliers.length; approx /= 1024, mlIdx++) {
    output = `${approx.toFixed(2)} ${multipliers[mlIdx]}`;
  }

  return output;
};

export default getFileSize;
