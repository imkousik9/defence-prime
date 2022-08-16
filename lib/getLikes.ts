export type Like = {
  id: string;
  title: string;
  channelName: string;
};

const URL = process.env.NEXT_PUBLIC_URL;

export const getLikes = async (req) => {
  const res = await fetch(`${URL}/api/likes`, {
    headers: { cookie: req.headers.cookie }
  });

  const likes = await res.json();

  return likes?.likes as Like[];
};
