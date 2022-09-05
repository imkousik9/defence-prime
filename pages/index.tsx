import { useEffect, useState } from 'react';
import { getVideos, getWatchLater, parseAuthCookie, useVideos } from 'lib';
import { getCategories } from 'utils';
import clsx from 'clsx';
import type { InferGetServerSidePropsType, NextPage } from 'next';

import Layout from 'components/Layout';
import VideoCard from 'components/Home/VideoCard';

import style from 'styles/Home.module.css';
import PlaylistModal from 'components/PlaylistModal';

const Home: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ categories, watchLater }) => {
  const [modal, setModal] = useState(false);
  const [videoId, setVideoId] = useState('');

  const { videos } = useVideos();

  const [myVideos, setMyVideos] = useState(() => videos);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    setMyVideos(videos);
  }, [videos]);

  const filterHandler = (category: string) => {
    setSelectedCategory(category);
    let keepItSafe = [...videos];

    if (category === 'All') {
      setMyVideos(keepItSafe);
    } else {
      let holdMe = keepItSafe.filter(
        (video) => video.category?.categoryName === category
      );
      setMyVideos(holdMe);
    }
  };

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
        <div className={style.categoryList}>
          {categories?.map((category) => {
            return (
              <div
                className={clsx(
                  style.category,
                  selectedCategory === category && style.category_active
                )}
                key={category}
                onClick={() => {
                  filterHandler(category);
                }}
              >
                {category}
              </div>
            );
          })}
        </div>
        <div className={style.videoList}>
          <div className="grid">
            {myVideos.map((video) => {
              return (
                <VideoCard
                  key={video?.id}
                  id={video?.id}
                  title={video?.title}
                  channelName={video?.channelName}
                  views={video?.views}
                  uploadedOn={video?.uploadedOn}
                  avatar={video?.avatar}
                  watchLater={watchLater}
                  setModal={setModal}
                  setVideoId={setVideoId}
                />
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps = async ({ req }) => {
  const authUser = parseAuthCookie(req);

  const videos = await getVideos();
  const categories = getCategories(videos);

  let watchLater = null;
  if (authUser) {
    watchLater = await getWatchLater(req);
  }
  return {
    props: { videos: videos, categories: categories, watchLater: watchLater }
  };
};

export default Home;
