export const trimExtraChars = (text: string, textMaxLength = 50) => {
  return text.length < textMaxLength
    ? text
    : text.substr(0, textMaxLength - 3) + '...';
};
