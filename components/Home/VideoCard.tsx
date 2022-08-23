import { useEffect, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { trimExtraChars, viewsFormatter } from 'utils';
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
  watchLater,
  setModal,
  setVideoId
}) => {
  const [showList, setShowList] = useState(false);
  const [myWatchLater, setMyWatchLater] = useState(false);

  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const isPresent = watchLater?.some((watch) => watch?.video?.id === id);
    if (isPresent) setMyWatchLater(true);
  }, [id, watchLater]);

  const addToPlaylist = () => {
    if (user) {
      setModal(true);
      setVideoId(id);
    } else {
      router.push('/login');
    }
  };

  const addRemoveWatchLater = async (videoId: string) => {
    if (user) {
      if (myWatchLater) {
        return fetch(`/api/watch-later/${videoId}`, {
          method: 'DELETE'
        })
          .then((res) => res.json())
          .then((data) => {
            if (user?.id === data?.userId && videoId === data?.videoId) {
              setMyWatchLater(false);
            }
          });
      }

      fetch(`/api/watch-later/${videoId}`, {
        method: 'POST'
      })
        .then((res) => res.json())
        .then((data) => {
          if (user?.id === data?.userId && videoId === data?.videoId) {
            setMyWatchLater(true);
          }
        });
    } else {
      router.push('/login');
    }
  };

  const addHistory = async (id: string, title: string, channelName: string) => {
    await fetch(`/api/history`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({ id, title, channelName })
    });
  };

  return (
    <div className={style.videoCard}>
      <NextLink href={`/watch?v=${id}`}>
        <a
          onClick={() => {
            addHistory(id, title, channelName);
          }}
        >
          <img
            className={style.videoCard_img}
            src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
            alt=""
          />
        </a>
      </NextLink>

      <div className={style.videoCard_info}>
        <NextLink href={`/watch?v=${id}`}>
          <a
            className={style.videoCard_left}
            onClick={() => {
              addHistory(id, title, channelName);
            }}
          >
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
              {myWatchLater ? (
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
