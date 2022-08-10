export type WatchLater = {
  id: string;
  userId?: string;
  videoId?: string;
  video?: { title: string; channelName: string };
};

const URL = process.env.NEXT_PUBLIC_URL;

export const getWatchLater = async (req) => {
  const res = await fetch(`${URL}/api/watch-later`, {
    headers: { cookie: req.headers.cookie }
  });

  const videos = (await res.json()) as WatchLater[];

  return videos;
};
