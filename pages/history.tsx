import { fetchHistory } from 'lib';
import type { InferGetServerSidePropsType, NextPage } from 'next';

import CommonVideoCard from 'components/Common/CommonVideoCard';

import style from 'styles/Liked.module.css';

const History: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ history }) => {
  return (
    <>
      <div className={style.likedVideos_container}>
        {!(history.length > 0) ? (
          <div className={style.likedVideos_empty}>
            <p>you have not watched anything</p>
          </div>
        ) : (
          <div className={style.likedVideos}>
            {history?.map((video) => (
              <CommonVideoCard key={video?.id} video={video} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export const getServerSideProps = async ({ req }) => {
  const history = await fetchHistory(req);

  return {
    props: { history }
  };
};

export default History;
