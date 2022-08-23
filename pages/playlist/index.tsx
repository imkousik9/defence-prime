import { useState } from 'react';
import { getPlaylists, useAuth } from 'lib';
import { useRouter } from 'next/router';
import type { InferGetServerSidePropsType, NextPage } from 'next';
import { Playlists } from 'lib/gePlaylists';

import Layout from 'components/Layout';
import PlaylistCard from 'components/Playlist';

import style from 'styles/Playlist.module.css';

const Playlists: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ playlists }) => {
  const [myPlaylists, setMyPlaylists] = useState<Playlists[]>(playlists);

  const { user } = useAuth();
  const router = useRouter();

  const deletePlaylist = async (playlistId: string) => {
    if (user) {
      await fetch(`/api/playlists/${playlistId}`, {
        method: 'DELETE'
      });

      const newPlaylists = await getPlaylists();
      setMyPlaylists(newPlaylists);
    } else {
      router.push('/login');
    }
  };

  return (
    <Layout>
      <div className={style.playlist}>
        {!(myPlaylists.length > 0) ? (
          <div className={style.playlist_empty}>
            <p>you have not created any playlist.</p>
          </div>
        ) : (
          <>
            <div className={style.playlist_video_info}>
              <h3>Your Playlist</h3>
              <p>({myPlaylists?.length} playlists)</p>
            </div>

            <div className={style.grid}>
              {myPlaylists?.map((list) => {
                return (
                  <PlaylistCard
                    key={list?.id}
                    id={list?.id}
                    name={list?.name}
                    numberOfVideos={list?.videos?.length}
                    firstVideoId={list?.videos[0]?.id}
                    deletePlaylist={deletePlaylist}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export const getServerSideProps = async ({ req }) => {
  const playlists = await getPlaylists(req);

  return {
    props: { playlists }
  };
};

export default Playlists;
