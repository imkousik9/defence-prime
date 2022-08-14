import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Playlists, getPlaylists } from 'lib/gePlaylists';

import { XIcon } from '@heroicons/react/solid';

import style from './PlaylistModal.module.css';

const PlaylistModal = ({ modal, setModal, videoId, setVideoId }) => {
  const [playlistName, setPlaylistName] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [playlists, setPlaylists] = useState<Playlists[]>([]);

  useEffect(() => {
    (async () => {
      const playlists = await getPlaylists();
      setPlaylists(playlists);
    })();
  }, []);

  const createHandler = async () => {
    setShowInput(true);

    if (showInput && playlistName) {
      await fetch('/api/playlists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({ playlistName })
      })
        .then((res) => res.json())
        .then((data) => {
          setPlaylists((prevPlaylists) => [data, ...prevPlaylists]);
          setShowInput(false);
        });
    }
  };

  const addVideoToPlaylist = async (playlistId) => {
    if (playlists) {
      await fetch(`/api/playlists/${playlistId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({ videoId })
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    }

    const newPlaylists = await getPlaylists();
    setPlaylists(newPlaylists);
  };

  const removeVideoFromPlaylist = async (playlistId) => {
    if (playlists) {
      await fetch(`/api/playlists/${playlistId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({ videoId })
      }).then(() => {});
    }

    const newPlaylists = await getPlaylists();
    setPlaylists(newPlaylists);
  };

  return (
    <div
      className={clsx(
        style.playlistModal_container,
        modal && style.playlistModal_show
      )}
    >
      <div className={style.playlistModal}>
        <div className={style.playlistModal_header}>
          <h4>Save to</h4>
          <XIcon
            className={style.playlistModal_icon}
            aria-hidden="true"
            onClick={() => {
              setModal(!modal);
              setShowInput(false);
              setVideoId('');
            }}
          />
        </div>

        {playlists.length > 0 &&
          playlists?.map((playlist) => {
            const isInPlaylist = playlist.videos?.some(
              (list) => list.id === videoId
            );
            return (
              <div key={playlist?.id} className={style.playlistModal_list}>
                <label className={style.playlistModal_selectInput}>
                  <input
                    type="checkbox"
                    name="light"
                    checked={isInPlaylist}
                    onChange={(e) => {
                      e.target.checked
                        ? addVideoToPlaylist(playlist?.id)
                        : removeVideoFromPlaylist(playlist?.id);
                    }}
                  />
                  <span>{playlist?.name}</span>
                </label>
              </div>
            );
          })}

        <div
          className={clsx(
            style.playlistModal_input,
            showInput && style.playlistModal_input_show
          )}
        >
          <label htmlFor="mail">Name :</label>
          <input
            className={style.playlistModal_text_input}
            type="text"
            value={playlistName}
            onChange={(e) => {
              setPlaylistName(e.target.value);
            }}
          />
        </div>

        <button className={style.playlistModal_btn} onClick={createHandler}>
          Create New Playlist
        </button>
      </div>
    </div>
  );
};

export default PlaylistModal;
