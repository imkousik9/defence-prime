export const findVideo = (videos, user: string) => {
  const like = videos?.find((video) => user === video?.userId);

  if (like) return true;

  return false;
};
