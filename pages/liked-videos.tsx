import { getLikes } from 'lib';
import { InferGetServerSidePropsType, NextPage } from 'next';

import Layout from 'components/Layout';

import style from 'styles/Liked.module.css';
import LikedVideo from 'components/LikedVideo';

const LikedVideos: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ likes }) => {
  return (
    <Layout>
      <div className={style.likedVideos_container}>
        {!(likes.length > 0) ? (
          <div className={style.watchLater_empty}>
            <p>you have not liked anything</p>
          </div>
        ) : (
          <div className={style.likedVideos}>
            {likes?.map((like) => (
              <LikedVideo key={like?.id} like={like} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export const getServerSideProps = async ({ req }) => {
  let likes = null;
  if (req?.headers?.cookie) {
    likes = await getLikes(req);
  }
  return {
    props: { likes }
  };
};

export default LikedVideos;
