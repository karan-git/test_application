export const MOBILE_REGEX = /^[6-9]\d{9}$|^[6-9]\d{9}$/g;
export const ALPHABET_REGEX = /^[a-zA-Z ]*$/g;
export const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const validate = (_text, _type) => {
  if (!_text) return false;
  return new RegExp(_type).test(_text);
};
