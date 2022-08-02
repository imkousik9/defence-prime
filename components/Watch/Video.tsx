import NextLink from 'next/link';
import { viewsFormatter } from 'utils';
import { formatDistanceToNow } from 'date-fns';
import { Video } from 'lib/getVideo';

import { ThumbUpIcon, ClockIcon } from '@heroicons/react/outline';

import style from './Video.module.css';

interface VideoProps {
  video: Video;
}

const Video = ({ video }: VideoProps) => {
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
              <span>
                <ThumbUpIcon className={style.video_icon} /> Like
              </span>
              <span>
                <ClockIcon className={style.video_icon} /> Save to Watch later
              </span>
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
      </div>
    </div>
  );
};

export default Video;
