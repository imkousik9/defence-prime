import { useState } from 'react';
import { getVideos, getWatchLater } from 'lib';
import { getCategories } from 'utils';
import type { InferGetServerSidePropsType, NextPage } from 'next';

import Layout from 'components/Layout';
import VideoList from 'components/Home/VideoList';

import style from 'styles/Home.module.css';
import PlaylistModal from 'components/PlaylistModal';

const Home: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ videos, categories, watchLater }) => {
  const [modal, setModal] = useState(false);
  const [videoId, setVideoId] = useState('');

  return (
    <Layout>
      {modal && (
        <PlaylistModal
          modal={modal}
          setModal={setModal}
          videoId={videoId}
          setVideoId={setVideoId}
        />
      )}
      <div className={style.home}>
        <VideoList
          videos={videos}
          categories={categories}
          watchLater={watchLater}
          setModal={setModal}
          setVideoId={setVideoId}
        />
      </div>
    </Layout>
  );
};

export const getServerSideProps = async ({ req }) => {
  const videos = await getVideos();
  const categories = getCategories(videos);

  let watchLater = null;
  if (req?.headers?.cookie) {
    watchLater = await getWatchLater(req);
  }
  return {
    props: { videos: videos, categories: categories, watchLater: watchLater }
  };
};

export default Home;
