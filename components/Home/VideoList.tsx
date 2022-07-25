import { useState } from 'react';
import clsx from 'clsx';
import { Videos } from 'lib/getVideos';

import VideoCard from './VideoCard';

import style from './videoList.module.css';

interface VideoListProps {
  videos: Array<Videos>;
  categories: Array<string>;
}

const VideoList = ({ videos, categories }: VideoListProps) => {
  const [myVideos, setMyVideos] = useState(videos);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filterHandler = (category: string) => {
    setSelectedCategory(category);
    let keepItSafe = [...videos];

    if (category === 'All') {
      setMyVideos(keepItSafe);
    } else {
      let holdMe = keepItSafe.filter(
        (video) => video.category?.categoryName === category
      );
      setMyVideos(holdMe);
    }
  };

  return (
    <div className={style.videoList}>
      <div className={style.categoryList}>
        {categories?.map((category) => {
          return (
            <div
              className={clsx(
                style.category,
                selectedCategory === category && style.category_active
              )}
              key={category}
              onClick={() => {
                filterHandler(category);
              }}
            >
              {category}
            </div>
          );
        })}
      </div>

      <div className={style.grid}>
        {myVideos.map((video) => {
          return (
            <VideoCard
              key={video?.id}
              id={video?.id}
              title={video?.title}
              channelName={video?.channelName}
              views={video?.views}
              uploadedOn={video?.uploadedOn}
              avatar={video?.avatar}
            />
          );
        })}
      </div>
    </div>
  );
};

export default VideoList;
