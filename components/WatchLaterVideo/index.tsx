import NextLink from 'next/link';
import { WatchLater } from 'lib/getWatchLater';

import { TrashIcon } from '@heroicons/react/outline';

import style from './WatchLaterVideo.module.css';

interface watchLaterVideoProps {
  video: WatchLater;
  fetchWatchLaterVideos: () => Promise<void>;
}

const WatchLaterVideo = ({
  video,
  fetchWatchLaterVideos
}: watchLaterVideoProps) => {
  const removeFromWatchLater = async () => {
    await fetch(`/api/watch-later/${video?.videoId}`, {
      method: 'DELETE'
    }).then(() => {
      fetchWatchLaterVideos();
    });
  };

  return (
    <div className={style.watchLaterVideo}>
      <NextLink href={`/watch?v=${video?.videoId}`}>
        <a className={style.watchLaterVideo_left}>
          <img
            className={style.watchLaterVideo_img}
            src={`https://img.youtube.com/vi/${video?.videoId}/maxresdefault.jpg`}
            alt=""
          />

          <div className={style.watchLaterVideo_info}>
            <h4>{video.video?.title}</h4>
            <p>{video.video?.channelName}</p>
          </div>
        </a>
      </NextLink>

      <div
        onClick={removeFromWatchLater}
        className={style.watchLaterVideo_icon_btn}
      >
        <TrashIcon className={style.watchLaterVideo_icon} />
      </div>
    </div>
  );
};

export default WatchLaterVideo;
