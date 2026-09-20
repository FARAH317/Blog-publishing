export const getReadingTime=(text)=> {
  const wordCount=text.trim().split(/\s+/).filter(Boolean).length;
  const minutes=Math.max(1, Math.round(wordCount / 200));
  return `${minutes} min read`;
};
