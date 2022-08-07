import { Video } from 'lib/getVideo';

export const findLikedOrNot = (video: Video, user: string) => {
  const like = video.likes?.find((like) => user === like?.userId);

  if (like) return true;

  return false;
};
