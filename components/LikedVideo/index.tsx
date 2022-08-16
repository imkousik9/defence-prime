import NextLink from 'next/link';
import { Like } from 'lib/getLikes';

import style from './LikedVideo.module.css';

interface LikedVideoProps {
  like: Like;
}

const LikedVideo = ({ like }: LikedVideoProps) => {
  return (
    <>
      <NextLink href={`/watch?v=${like?.id}`}>
        <a className={style.likedVideo}>
          <img
            className={style.likedVideo_img}
            src={`https://img.youtube.com/vi/${like?.id}/maxresdefault.jpg`}
            alt=""
          />

          <div className={style.likedVideo_info}>
            <h4>{like?.title}</h4>
            <p>{like?.channelName}</p>
          </div>
        </a>
      </NextLink>
    </>
  );
};

export default LikedVideo;
