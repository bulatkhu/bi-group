export const TextAbstract = (text, length) => {
  if (!text) {
    return ""
  }
  if (text.length <= length) {
    return text
  }
  const newText = text.substring(0, length);
  // const last = newText.lastIndexOf(" ");
  // text = text.substring(0, last);
  return newText + "...";
}


