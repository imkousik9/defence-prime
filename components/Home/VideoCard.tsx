import { useEffect, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { findVideo, trimExtraChars, viewsFormatter } from 'utils';
import { formatDistanceToNow } from 'date-fns';
import clsx from 'clsx';
import { useAuth } from 'lib';

import { DotsVerticalIcon } from '@heroicons/react/solid';
import { TrashIcon, PlayIcon, ClockIcon } from '@heroicons/react/outline';
import style from './VideoCard.module.css';

const VideoCard = ({
  id,
  title,
  channelName,
  views,
  uploadedOn,
  avatar,
  setModal,
  setVideoId
}) => {
  const [showList, setShowList] = useState(false);
  const [watchLater, setWatchLater] = useState(false);

  const { user } = useAuth();
  const router = useRouter();

  // useEffect(() => {
  //   setWatchLater(findVideo(video?.watchLater, user?.id));
  // }, [video, user?.id]);

  const addToPlaylist = () => {
    if (user) {
      setModal(true);
      setVideoId(id);
    } else {
      router.push('/login');
    }
  };

  const addRemoveWatchLater = async (videoId) => {
    if (user) {
      if (watchLater) {
        return fetch(`/api/watch-later/${videoId}`, {
          method: 'DELETE'
        }).then(() => {
          setWatchLater(false);
        });
      }

      fetch(`/api/watch-later/${videoId}`, {
        method: 'POST'
      })
        .then((res) => res.json())
        .then((data) => {
          if (user?.id === data?.userId && videoId === data?.videoId) {
            setWatchLater(true);
          }
        });
    } else {
      router.push('/login');
    }
  };

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
          onClick={() => setShowList(!showList)}
        >
          <DotsVerticalIcon className={style.videoCard_icon} />

          <div
            className={clsx(
              style.videoCard_options,
              showList && style.videoCard_options_open
            )}
          >
            <div
              onClick={() => {
                addRemoveWatchLater(id);
              }}
            >
              {watchLater ? (
                <span
                  className={clsx(
                    style.videoCard_option,
                    style.videoCard_option_red
                  )}
                >
                  <TrashIcon className={style.videoCard_option_icon} /> Remove
                  from Watch later
                </span>
              ) : (
                <span className={style.videoCard_option}>
                  <ClockIcon className={style.videoCard_option_icon} /> Add to
                  Watch Later
                </span>
              )}
            </div>
            <div
              className={style.videoCard_option}
              onClick={() => {
                addToPlaylist();
              }}
            >
              <PlayIcon className={style.videoCard_option_icon} /> Add to
              Playlist
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
