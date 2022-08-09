import type { InferGetServerSidePropsType, NextPage } from 'next';
import { getVideos } from 'lib';
import { getCategories } from 'utils';

import Layout from 'components/Layout';
import VideoList from 'components/Home/VideoList';

import style from 'styles/Home.module.css';

const Home: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ videos, categories }) => {
  return (
    <Layout>
      <div className={style.home}>
        <VideoList videos={videos} categories={categories} />
      </div>
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
