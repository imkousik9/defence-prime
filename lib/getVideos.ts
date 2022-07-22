export type Videos = {
  id: string;
  title: string;
  channelName: string;
  views: number;
  uploadedOn: string;
  avatar: string;
  description?: string | null;
  categoriesId?: number;
};

export const getVideos = async () => {
  const res = await fetch('http://localhost:3000/api/videos');

  const videos = (await res.json()) as Videos[];

  return videos;
};
