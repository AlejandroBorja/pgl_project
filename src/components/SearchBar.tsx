
import React, { useState } from 'react';
import { IonSearchbar } from '@ionic/react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery.trim());
  };

  return (
    <IonSearchbar
      value={searchQuery}
      onIonChange={(e) => setSearchQuery(e.detail.value!)}
      onIonClear={() => onSearch('')}
      onIonInput={handleSearch}
    />
  );
};

export default SearchBar;