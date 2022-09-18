import { useEffect, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { viewsFormatter } from 'utils';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from 'lib';
import { Video } from 'lib/getVideo';
import { Like } from 'lib/getLikes';
import { WatchLater } from 'lib/getWatchLater';

import { ThumbUpIcon, ClockIcon } from '@heroicons/react/outline';
import {
  ThumbUpIcon as ThumbUpSolidIcon,
  ClockIcon as ClockSolidIcon
} from '@heroicons/react/solid';

import style from './Video.module.css';

interface VideoProps {
  video: Video;
  likes: Like[];
  watchLater: WatchLater[];
}

const Video = ({ video, likes, watchLater }: VideoProps) => {
  const [like, setLike] = useState(false);
  const [myWatchLater, setMyWatchLater] = useState(false);

  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const isLiked = likes?.some((like) => like?.id === video?.id);
    if (isLiked) setLike(true);

    const isPresent = watchLater?.some(
      (watch) => watch?.video?.id === video?.id
    );
    if (isPresent) setMyWatchLater(true);
  }, [video, watchLater, user?.id, likes]);

  const likeUnlike = async (videoId: string, userId: string) => {
    if (user) {
      fetch(`/api/likes/${videoId}`, {
        method: 'PUT'
      })
        .then((res) => res.json())
        .then((data) => {
          const isLiked = data?.likes?.some((like) => like?.id === userId);
          setLike(isLiked);
        });
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

  return (
    <div className={style.video_container}>
      <div className={style.video_iframe}>
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${video.id}?amp;autoplay=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <div className={style.video_info}>
        <div>
          <h3 className={style.video_title}>{video?.title}</h3>
          <div className={style.video_info_states_icons}>
            <span className={style.video_info_views}>
              {viewsFormatter(video?.views)} views •{' '}
              {formatDistanceToNow(new Date(video?.uploadedOn), {
                addSuffix: true
              })}
            </span>

            <div className={style.video_icons}>
              {like ? (
                <span
                  onClick={() => {
                    likeUnlike(video?.id, user?.id);
                  }}
                >
                  <ThumbUpSolidIcon className={style.video_icon} /> Liked
                </span>
              ) : (
                <span
                  onClick={() => {
                    likeUnlike(video?.id, user?.id);
                  }}
                >
                  <ThumbUpIcon className={style.video_icon} /> Like
                </span>
              )}

              {myWatchLater ? (
                <span
                  onClick={() => {
                    addRemoveWatchLater(video?.id);
                  }}
                >
                  <ClockSolidIcon className={style.video_icon} /> Remove from
                  Watch later
                </span>
              ) : (
                <span
                  onClick={() => {
                    addRemoveWatchLater(video?.id);
                  }}
                >
                  <ClockIcon className={style.video_icon} /> Save to Watch later
                </span>
              )}
            </div>
          </div>
        </div>

        <div className={style.video_divider} />

        <div>
          <div className={style.video_channelInfo}>
            <div className={style.video_channelName}>
              <img src={video?.avatar} alt={video?.channelName} />
              <p>{video?.channelName}</p>
            </div>
            <NextLink href={`https://www.youtube.com/${video?.channelName}`}>
              <a className={style.video_channelLink} target="_blank">
                Visit Channel
              </a>
            </NextLink>
          </div>
          <p className={style.video_description}>{video?.description}</p>
        </div>

        <div className={style.video_divider} />
      </div>
    </div>
  );
};

export default Video;
