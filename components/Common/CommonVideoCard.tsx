import NextLink from 'next/link';
import clsx from 'clsx';

import { TrashIcon } from '@heroicons/react/outline';

import style from './CommonVideoCard.module.css';

type Video = {
  id: string;
  title: string;
  channelName: string;
};

interface commonVideoCardProps {
  video: Video;
  isWatchLater?: boolean;
  fetchWatchLaterVideos?: () => Promise<void>;
}

const CommonVideoCard = ({
  video,
  isWatchLater,
  fetchWatchLaterVideos
}: commonVideoCardProps) => {
  const removeFromWatchLater = async () => {
    if (isWatchLater) {
      await fetch(`/api/watch-later/${video?.id}`, {
        method: 'DELETE'
      }).then(() => {
        fetchWatchLaterVideos();
      });
    }
  };

  return (
    <div className={style.commonVideoCard}>
      <NextLink href={`/watch?v=${video?.id}`}>
        <a className={style.commonVideoCard_left}>
          <img
            className={style.commonVideoCard_img}
            src={`https://img.youtube.com/vi/${video?.id}/maxresdefault.jpg`}
            alt=""
          />

          <div className={style.commonVideoCard_info}>
            <h4>{video?.title}</h4>
            <p>{video?.channelName}</p>
          </div>
        </a>
      </NextLink>

      <div
        onClick={removeFromWatchLater}
        className={clsx(
          style.commonVideoCard_icon_btn,
          isWatchLater && style.commonVideoCard_icon_btn_visible
        )}
      >
        <TrashIcon className={style.commonVideoCard_icon} />
      </div>
    </div>
  );
};

export default CommonVideoCard;
