import React from 'react';
import { useLocation } from 'react-router-dom';

const SearchResults: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q');

  // 検索クエリを使用して結果を取得し、表示するロジックを実装

  return (
    <div>
      <h2>検索結果: {query}</h2>
      {/* 検索結果の表示 */}
    </div>
  );
};

export default SearchResults;