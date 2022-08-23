import { fetchHistory } from 'lib';
import type { InferGetServerSidePropsType, NextPage } from 'next';

import Layout from 'components/Layout';
import LikedVideo from 'components/LikedVideo';

import style from 'styles/Liked.module.css';

const History: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ history }) => {
  return (
    <Layout>
      <div className={style.likedVideos_container}>
        {!(history.length > 0) ? (
          <div className={style.likedVideos_empty}>
            <p>you have not watched anything</p>
          </div>
        ) : (
          <div className={style.likedVideos}>
            {history?.map((item) => (
              <LikedVideo key={item?.id} like={item} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export const getServerSideProps = async ({ req }) => {
  const history = await fetchHistory(req);

  return {
    props: { history }
  };
};

export default History;
