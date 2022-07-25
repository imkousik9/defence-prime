export type Videos = {
  id: string;
  title: string;
  channelName: string;
  views: number;
  uploadedOn: string;
  avatar: string;
  description?: string | null;
  categoryId?: string;
  category?: { id: string; categoryName: string };
};

const URL = process.env.NEXT_PUBLIC_URL;

export const getVideos = async () => {
  const res = await fetch(`${URL}/api/videos`);

  const videos = (await res.json()) as Videos[];

  return videos;
};
