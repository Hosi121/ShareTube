import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { searchVideos } from '../../services/videoService';
import { Video } from '../../types/video';

const SearchResults: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q');

  const [results, setResults] = useState<Video[]>([]);

  useEffect(() => {
    if (!query) return;
    searchVideos(query).then(setResults).catch(() => setResults([]));
  }, [query]);

  return (
    <div>
      <h2>検索結果: {query}</h2>
      <ul>
        {results.map((v) => (
          <li key={v.id}>{v.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
