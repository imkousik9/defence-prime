import { useState, useMemo, createContext, useContext } from 'react';
import { Videos } from './getVideos';

const useVideoController = (videos: Videos[]) => {
  const [filter, setFilter] = useState('');

  const filteredVideos = useMemo(
    () =>
      videos?.filter((video) =>
        video.title.toLowerCase().includes(filter.toLowerCase())
      ),
    [filter, videos]
  );

  return {
    filter,
    setFilter,
    videos: filteredVideos
  };
};

const VideosContext = createContext<ReturnType<typeof useVideoController>>({
  filter: '',
  setFilter: () => {},
  videos: []
});

export const VideosProvider = ({ pageProps, children }) => (
  <VideosContext.Provider value={useVideoController(pageProps?.videos)}>
    {children}
  </VideosContext.Provider>
);

export const useVideos = () => useContext(VideosContext);
