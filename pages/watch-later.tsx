import { useState } from 'react';
import { getWatchLater } from 'lib';
import { InferGetServerSidePropsType, NextPage } from 'next';

import Layout from 'components/Layout';
import WatchLaterVideo from 'components/WatchLaterVideo';

import style from 'styles/WatchLater.module.css';

const WatchLater: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ watchLater }) => {
  const [videos, setVideos] = useState(watchLater);

  const fetchWatchLaterVideos = async () => {
    const res = await fetch('/api/watch-later');
    const videos = await res.json();
    setVideos(videos);
  };

  return (
    <Layout>
      <div className={style.watchLater_container}>
        {!(videos.length > 0) ? (
          <div className={style.watchLater_empty}>
            <p>you have not added anything yet for later.</p>
          </div>
        ) : (
          <div className={style.watchLater}>
            {videos?.map((video) => (
              <WatchLaterVideo
                key={video?.video.id}
                video={video}
                fetchWatchLaterVideos={fetchWatchLaterVideos}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export const getServerSideProps = async ({ req }) => {
  const watchLater = await getWatchLater(req);

  return {
    props: { watchLater }
  };
};

export default WatchLater;
