export type Playlist = {
  id: string;
  name: string;
  userId: string;
  videos?: {
    id: string;
    title: string;
    channelName: string;
    views: number;
    uploadedOn: string;
    avatar: string;
  }[];
};

const URL = process.env.NEXT_PUBLIC_URL;

export const getPlaylist = async (id, req?) => {
  const options = req ? { headers: { cookie: req.headers.cookie } } : {};

  const res = await fetch(`${URL}/api/playlists/${id}`, options);

  const playlist = (await res.json()) as Playlist;

  return playlist;
};
