import { useState } from 'react';
import { useRouter } from 'next/router';
import { getPlaylist, useAuth } from 'lib';
import type { InferGetServerSidePropsType, NextPage } from 'next';

import PlaylistVideoCard from 'components/Playlist/PlaylistVideoCard';

import style from 'styles/Playlist.module.css';

const PlaylistVideos: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ playlist }) => {
  const [myPlaylist, setMyPlaylist] = useState(() => playlist);

  const { user } = useAuth();
  const router = useRouter();

  const removeFromPlaylist = async (playlistId: string, videoId: string) => {
    if (user) {
      await fetch(`/api/playlists/${playlistId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({ videoId })
      });

      const newPlaylist = await getPlaylist(playlistId);
      setMyPlaylist(newPlaylist);
    } else {
      router.push('/login');
    }
  };

  return (
    <>
      <div className={style.playlist}>
        {!(myPlaylist?.videos?.length > 0) ? (
          <div className={style.playlist_empty}>
            <p>you have not added any video to the list.</p>
          </div>
        ) : (
          <>
            <div className={style.playlist_video_info}>
              <h3>{myPlaylist?.name}</h3>
              <p>({myPlaylist?.videos?.length} videos)</p>
            </div>

            <div className={style.playlist_videos}>
              <div className="grid">
                {myPlaylist?.videos?.map((video) => (
                  <PlaylistVideoCard
                    key={video?.id}
                    id={video?.id}
                    playlistId={playlist?.id}
                    title={video?.title}
                    channelName={video?.channelName}
                    views={video?.views}
                    uploadedOn={video?.uploadedOn}
                    avatar={video?.avatar}
                    removeFromPlaylist={removeFromPlaylist}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export const getServerSideProps = async ({ req, query }) => {
  const id = query?.playlistId;

  const playlist = await getPlaylist(id, req);

  return {
    props: { playlist }
  };
};

export default PlaylistVideos;
