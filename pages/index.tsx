import type { InferGetServerSidePropsType, NextPage } from 'next';
import { getVideos } from 'lib';
import { getCategories } from 'utils';

import Layout from 'components/Layout';
import VideoList from 'components/Home/VideoList';

const Home: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ videos, categories }) => {
  return (
    <Layout>
      <VideoList videos={videos} categories={categories} />
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const videos = await getVideos();
  const categories = getCategories(videos);

  return {
    props: { videos: videos, categories: categories }
  };
};

export default Home;
