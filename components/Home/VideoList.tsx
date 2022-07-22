import clsx from 'clsx';

import VideoCard from './VideoCard';
import { Videos } from 'lib/getVideos';

import style from './videoList.module.css';

interface VideoListProps {
  videos: Array<Videos>;
}

const VideoList = ({ videos }: VideoListProps) => {
  return (
    <div className={style.videoList}>
      <div className={style.categoryList}>
        <div className={clsx(style.category, style.category_active)}>All</div>
        <div className={style.category}>Aircraft</div>
        <div className={style.category}>Rockets</div>
        <div className={style.category}>Missiles</div>
      </div>

      <div className={style.grid}>
        {videos.map((video) => {
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
