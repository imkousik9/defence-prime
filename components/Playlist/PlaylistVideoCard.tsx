import { useState } from 'react';
import NextLink from 'next/link';
import { trimExtraChars, viewsFormatter } from 'utils';
import { formatDistanceToNow } from 'date-fns';
import clsx from 'clsx';

import { TrashIcon, DotsVerticalIcon } from '@heroicons/react/solid';

import pcs from './PlaylistCard.module.css';
import style from 'components/Home/VideoCard.module.css';

const PlaylistVideoCard = ({
  id,
  playlistId,
  title,
  channelName,
  views,
  uploadedOn,
  avatar,
  removeFromPlaylist
}) => {
  const [show, setShow] = useState(false);

  return (
    <div className={style.videoCard}>
      <NextLink href={`/watch?v=${id}`}>
        <a>
          <img
            className={style.videoCard_img}
            src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
            alt=""
          />
        </a>
      </NextLink>

      <div className={style.videoCard_info}>
        <NextLink href={`/watch?v=${id}`}>
          <a className={style.videoCard_left}>
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
          </a>
        </NextLink>

        <div
          className={style.videoCard_option_list}
          onClick={() => setShow(!show)}
        >
          <DotsVerticalIcon className={style.videoCard_icon} />

          <div
            className={clsx(
              style.videoCard_options,
              show && style.videoCard_options_open
            )}
          >
            <span
              className={pcs.playlistCard_option_delete}
              onClick={() => {
                removeFromPlaylist(playlistId, id);
              }}
            >
              <TrashIcon className={style.videoCard_option_icon} /> Remove from
              Playlist
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistVideoCard;
