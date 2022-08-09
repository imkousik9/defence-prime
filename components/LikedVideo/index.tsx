import NextLink from 'next/link';
import { Like } from 'lib/getLikes';

import style from './LikedVideo.module.css';

interface LikedVideoProps {
  like: Like;
}

const LikedVideo = ({ like }: LikedVideoProps) => {
  return (
    <>
      <NextLink href={`/watch?v=${like?.videoId}`}>
        <a className={style.likedVideo}>
          <img
            className={style.likedVideo_img}
            src={`https://img.youtube.com/vi/${like?.videoId}/maxresdefault.jpg`}
            alt=""
          />

          <div className={style.likedVideo_info}>
            <h4>{like.video?.title}</h4>
            <p>{like.video?.channelName}</p>
          </div>
        </a>
      </NextLink>
    </>
  );
};

export default LikedVideo;
