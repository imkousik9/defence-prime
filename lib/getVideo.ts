export type Video = {
  id: string;
  title: string;
  channelName: string;
  views: number;
  uploadedOn: string;
  avatar: string;
  description?: string | null;
  categoryId?: string | null;
};

const URL = process.env.NEXT_PUBLIC_URL;

export const getVideo = async (id: string) => {
  const res = await fetch(`${URL}/api/videos/${id}`);

  const video = (await res.json()) as Video;

  return video;
};
