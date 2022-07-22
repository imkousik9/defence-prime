export const trimExtraChars = (text) => {
  return text.length < 50 ? text : text.substr(0, 48) + '...';
};
