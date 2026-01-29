export const calculateReadTime = (content: string) => {
  if (!content) return "0 min read";

  const text = content.replace(/<[^>]+>/g, "");

  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);

  return `${minutes} min read`;
};
