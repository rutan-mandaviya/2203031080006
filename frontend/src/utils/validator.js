export const isValidURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
};

export const isValidShortcode = (code) => /^[a-zA-Z0-9]{3,10}$/.test(code);
export const isValidValidity = (val) => Number.isInteger(Number(val)) && val > 0;
