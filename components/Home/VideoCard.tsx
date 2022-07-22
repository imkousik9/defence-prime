import NextLink from 'next/link';
import { trimExtraChars, viewsFormatter } from 'utils';
import { formatDistanceToNow } from 'date-fns';

import { DotsVerticalIcon } from '@heroicons/react/solid';
import style from './videoCard.module.css';

const VideoCard = ({ id, title, channelName, views, uploadedOn, avatar }) => {
  return (
    <NextLink href={`/watch/${id}`}>
      <a className={style.videoCard}>
        <img
          className={style.videoCard_img}
          src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
          alt=""
        />

        <div className={style.videoCard_info}>
          <div className={style.videoCard_left}>
            <img src={avatar} alt={channelName} />
            <div className={style.videoCard_title}>
              <h3>{trimExtraChars(title)}</h3>
              <div>
                <p>{channelName}</p>
                <p>
                  {viewsFormatter(views)} views •{' '}
                  {formatDistanceToNow(new Date(uploadedOn), {
                    addSuffix: true
                  })}
                </p>
              </div>
            </div>
          </div>
          <div>
            <DotsVerticalIcon className={style.videoCard_icon} />
          </div>
        </div>
      </a>
    </NextLink>
  );
};

export default VideoCard;
