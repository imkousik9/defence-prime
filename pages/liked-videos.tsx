import { getLikes } from 'lib';
import { InferGetServerSidePropsType, NextPage } from 'next';

import CommonVideoCard from 'components/Common/CommonVideoCard';

import style from 'styles/Liked.module.css';

const LikedVideos: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ likes }) => {
  return (
    <>
      <div className={style.likedVideos_container}>
        {!(likes.length > 0) ? (
          <div className={style.likedVideos_empty}>
            <p>you have not liked anything</p>
          </div>
        ) : (
          <div className={style.likedVideos}>
            {likes?.map((video) => (
              <CommonVideoCard key={video?.id} video={video} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export const getServerSideProps = async ({ req }) => {
  const likes = await getLikes(req);

  return {
    props: { likes }
  };
};

export default LikedVideos;
