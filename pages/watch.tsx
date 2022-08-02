import { getVideo } from 'lib';
import { InferGetServerSidePropsType, NextPage } from 'next';

import Layout from 'components/Layout';
import Video from 'components/Watch/Video';

const Watch: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ video }) => {
  return (
    <Layout>
      <Video video={video} />
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
