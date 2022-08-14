import { useState } from 'react';
import NextLink from 'next/link';
import clsx from 'clsx';

import {
  DotsVerticalIcon,
  PlayIcon,
  TrashIcon
} from '@heroicons/react/outline';

import style from './PlaylistCard.module.css';

const PlaylistCard = ({
  id,
  name,
  numberOfVideos,
  firstVideoId,
  deletePlaylist
}) => {
  const [show, setShow] = useState(false);

  return (
    <div className={style.playlistCard}>
      <NextLink href={`/playlist/${id}`}>
        <a>
          <div className={style.playlistCard_img_highlight}>
            {numberOfVideos > 0 ? (
              <>
                <img
                  className={style.playlistCard_img}
                  src={`https://img.youtube.com/vi/${firstVideoId}/maxresdefault.jpg`}
                  alt={name}
                />
                <div className={style.playlistCard_highlight}>
                  <PlayIcon className={style.playlistCard_icon} />
                  <p>{numberOfVideos}+</p>
                </div>
              </>
            ) : (
              <div className={style.playlistCard_empty}>
                <h1>{name} is Empty !</h1>
              </div>
            )}
          </div>
        </a>
      </NextLink>

      <div className={style.playlistCard_footer}>
        <h4>{name}</h4>
        <div
          className={style.playlistCard_options}
          onClick={() => setShow(!show)}
        >
          <DotsVerticalIcon className={style.playlistCard_options_icon} />

          <div
            className={clsx(
              style.playlistCard_option,
              show && style.playlistCard_open
            )}
          >
            <span
              className={style.playlistCard_option_delete}
              onClick={() => {
                deletePlaylist(id);
              }}
            >
              <TrashIcon className={style.playlistCard_option_icon} /> Delete
              Playlist
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistCard;
