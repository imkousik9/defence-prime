import { getLikes, getVideo, getWatchLater, parseAuthCookie } from 'lib';
import { InferGetServerSidePropsType, NextPage } from 'next';

import Layout from 'components/Layout';
import Video from 'components/Watch/Video';
import CommentList from 'components/Watch/CommentList';

import style from 'styles/Watch.module.css';

const Watch: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ video, likes, watchLater }) => {
  return (
    <Layout>
      <div className={style.watch}>
        <Video video={video} likes={likes} watchLater={watchLater} />
        <CommentList video={video} />
      </div>
    </Layout>
  );
};

export const getServerSideProps = async ({ req, query }) => {
  const id = query?.v;

  const authUser = parseAuthCookie(req);
  const video = await getVideo(id);

  let likesAndWatchLater = [null, null];
  if (authUser) {
    likesAndWatchLater = await Promise.all([getLikes(req), getWatchLater(req)]);
  }

  return {
    props: {
      video,
      likes: likesAndWatchLater[0],
      watchLater: likesAndWatchLater[1]
    }
  };
};

export default Watch;
