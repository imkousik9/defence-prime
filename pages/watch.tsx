import { getVideo } from 'lib';
import { InferGetServerSidePropsType, NextPage } from 'next';

import Layout from 'components/Layout';
import Video from 'components/Watch/Video';
import CommentList from 'components/Watch/CommentList';

import style from 'styles/Watch.module.css';

const Watch: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ video }) => {
  return (
    <Layout>
      <div className={style.watch}>
        <Video video={video} />
        <CommentList video={video} />
      </div>
    </Layout>
  );
};

export const getServerSideProps = async ({ query }) => {
  const id = query?.v;

  const video = await getVideo(id);

  return {
    props: { video }
  };
};

export default Watch;
