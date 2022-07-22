import type { InferGetServerSidePropsType, NextPage } from 'next';
import { getVideos } from 'lib/getVideos';

import Layout from 'components/Layout';
import VideoList from 'components/Home/VideoList';

import styles from '../styles/Home.module.css';

const Home: NextPage = ({
  videos
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Layout>
      <VideoList videos={videos} />
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const videos = await getVideos();
  return {
    props: { videos: videos }
  };
};

export default Home;
