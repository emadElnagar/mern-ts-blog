export const generateExcerpt = (content: string, length = 140) => {
  if (!content) return "";
  return content.replace(/<[^>]+>/g, "").slice(0, length) + "...";
};
