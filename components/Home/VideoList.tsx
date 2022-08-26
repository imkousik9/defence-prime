import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import clsx from 'clsx';
import { Videos } from 'lib/getVideos';
import { WatchLater } from 'lib/getWatchLater';

import VideoCard from './VideoCard';

import style from './VideoList.module.css';

interface VideoListProps {
  videos: Array<Videos>;
  categories: Array<string>;
  watchLater: Array<WatchLater>;
  setModal: Dispatch<SetStateAction<boolean>>;
  setVideoId: Dispatch<SetStateAction<string>>;
}

const VideoList = ({
  videos,
  categories,
  watchLater,
  setModal,
  setVideoId
}: VideoListProps) => {
  const [myVideos, setMyVideos] = useState(() => videos);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    setMyVideos(videos);
  }, [videos]);

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
              watchLater={watchLater}
              setModal={setModal}
              setVideoId={setVideoId}
            />
          );
        })}
      </div>
    </div>
  );
};

export default VideoList;
