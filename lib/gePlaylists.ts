export type Playlists = {
  id: string;
  name: string;
  userId: string;
  videos?: {
    id: string;
  }[];
};

const URL = process.env.NEXT_PUBLIC_URL;

export const getPlaylists = async (req?) => {
  const options = req ? { headers: { cookie: req.headers.cookie } } : {};

  const res = await fetch(`${URL}/api/playlists`, options);

  const playlists = (await res.json()) as Playlists[];

  return playlists;
};
