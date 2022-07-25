import { Videos } from 'lib/getVideos';

export const getCategories = (videos: Videos[]) => {
  let holdVideos = videos?.map((video) => {
    return video?.category?.categoryName;
  });

  let holdCategory = new Set(holdVideos);
  let categories = Array.from(holdCategory);

  categories = ['All', ...categories];

  return categories;
};
